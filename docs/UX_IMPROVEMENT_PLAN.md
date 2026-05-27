# Newsletter Builder — UX Improvement Plan

**Purpose.** This document plans the work to take the Wharton UK newsletter builder from "works but messy for a team" to "obvious for a team member touching it for the first time." It is divided into four phases that can be approved (or declined) independently. Nothing in this plan is implemented yet — this is the proposal.

**Scope.** All changes are to a single file: `complete-original-newsletter.html`. The builder is a self-contained React app loaded via Babel standalone from CDN. There is no build step, no package install required to ship changes — the file is the deliverable.

**Risk profile.** Every change in this plan is localized to the one HTML file. The repo's CI workflow (`.github/workflows/deploy.yml`) runs Prettier and html-validate on push. If any change would break those, it shows up before deploy. Pages auto-redeploys on push to `main`.

---

## Phase 1 — Critical fixes and the side-by-side layout

**Why first.** This is the highest impact-per-hour work and it's all low risk. The three bugs are real correctness issues users have already hit. The layout change is the single visual improvement that most addresses the "messy" feeling.

**Estimated effort.** 1–2 hours of focused work.

### 1.1 Fix duplicate section IDs (root cause of image-reordering ghosts)

**The bug.** Line 1711 generates section IDs via `Date.now().toString()`. Two sections added within the same millisecond — which happens during rapid clicks, programmatic loads, or React batching — share an ID. Once two sections share an ID, React can no longer tell them apart in its keyed reconciliation (line 1576 uses `key={section.id}`), and the `updateSection` function (line 1737) writes the same update to every matching section. That is the underlying cause of "images modified in one section but reappearing in another" and "order looking wrong after editing."

**The fix.** Replace the ID generator with `crypto.randomUUID()` where available, and fall back to a counter-plus-timestamp combination for older browsers. One line change. Add a small migration on load that detects sections with duplicate IDs in existing JSON files and reassigns IDs at import time, so users with already-saved templates get the fix automatically.

**Risk.** Effectively none. The fix is additive — old IDs continue to work because nothing else in the code depends on the specific timestamp format.

### 1.2 Fix JSON save with friendly filenames

**The bug.** Lines 2042 and 2073 sanitize the suggested filename with `[^a-z0-9]/gi` → underscore. Any non-ASCII letter or digit becomes `_`. If the user types a name composed entirely of stripped characters (emoji-only, all spaces, non-Latin script), the sanitized result is the empty string, the suggested filename becomes `.json`, and Chrome's `showSaveFilePicker` throws a validation error. The catch block at line 2062 swallows that error silently, so the user sees nothing — the save just doesn't happen.

**The fix.** Three changes.

1. Loosen the regex to `[^a-zA-Z0-9 _.\-]` so spaces, dashes, periods, and underscores survive.
2. Normalize accented characters with `.normalize('NFKD').replace(/[̀-ͯ]/g, '')` before sanitizing, so "Wharton Élite Newsletter" becomes "Wharton_Elite_Newsletter" instead of "wharton__lite_newsletter".
3. If the sanitized name is empty after step 2, default to `newsletter`.
4. Show the user an actual error message when save fails (replace the silent `console.error` with a visible alert that includes the underlying error message).

**Risk.** Low. The new sanitization is strictly more permissive — it only adds characters that were previously stripped, never removes characters that were previously allowed. The error-display change can't make things worse; users currently get nothing.

### 1.3 Fix missing unsaved-changes flag on move-up

**The bug.** Line 1751's `moveSectionUp` doesn't call `setHasUnsavedChanges(true)`. `moveSectionDown` (line 1762) does. So if a user reorders by moving things up and closes the tab without other edits, the reorder is lost without warning.

**The fix.** One line added to `moveSectionUp`. Same as the existing call in `moveSectionDown`.

**Risk.** Zero.

### 1.4 Side-by-side editor and preview

**The change.** Today the page is editor on top, preview far below. The PDF you sent shows this clearly — pages 1–2 are all editor, page 3 is where preview finally starts. After the change, on desktop (viewport ≥ 1100px) the page becomes a two-column layout: editor on the left with its own scroll, sticky preview on the right showing the live rendered newsletter. On smaller screens, fall back to the current stacked layout but add a "Preview" toggle button that scrolls to the preview section.

**Implementation notes.** The CSS exists for this; the page already has `#editorPanel` and `#preview` as distinct IDs. The change is wrapping them in a flex container with `flex-direction: row` for wide screens, plus a media query for the narrow-screen fallback. The Toggle Editor button stays in place — it still hides the editor panel so a user can see the preview full-width if they want.

**Risk.** Low. The two panels are already structurally independent. The main thing to watch for is the preview's table-based email layout, which has fixed widths — needs to be tested that it still renders correctly inside a half-width column. If the preview ends up cramped at half-width, the fallback is to make the editor narrower (~40%) and let the preview keep its natural width.

**Trade-off.** Users on tablets and narrow laptops (viewport < 1100px) get the same experience as today. The win is for desktop editors, which is most of the team.

---

## Phase 2 — Workflow clarity

**Why second.** Phase 1 makes the page feel modern. Phase 2 makes the workflow obvious to a first-time editor.

**Estimated effort.** 1–2 hours.

### 2.1 Move "Template Section Controls" into a settings gear

**The change.** The four checkboxes labeled "Header & Title / Greeting & Salutation / Community Links / Signature" currently live as a prominent panel at the top of the editor. They are configuration ("which predefined sections does this newsletter include?"), not composition. New editors reading top-to-bottom encounter configuration before they ever see the actual fields to edit, which is confusing.

Move this panel behind a small gear icon in the toolbar. Default state: all four checkboxes ticked (which is what most newsletters use anyway), so the user never has to think about this unless they specifically want a non-standard layout.

**Risk.** Low. Pure UI repositioning; no behavior change.

### 2.2 Expand section accordions by default

**The change.** Today every section accordion is collapsed by default (you can see this on page 2 of the PDF — Basic Information, Join our Communities, and Signature all show right-arrows indicating collapsed state). The intent was reduced density. The cost is discovery: a new editor doesn't know what fields each section contains until they click each one open.

Switch the default to expanded. Users can still collapse individual sections if they want to focus. For sections that are completely empty, show a clear placeholder ("Add an event title here") inside the expanded panel rather than a closed accordion.

**Risk.** Low. The accordion mechanism stays the same; only the default state changes.

### 2.3 Clear save status next to the newsletter title

**The change.** Today "Untitled Newsletter" sits alone in the page (PDF page 1, below the toolbar). There is no clear "unsaved changes" indicator unless you know to look. Replace the title region with a more informative block:

```
[Newsletter Builder logo]  Wharton UK Monthly — March 2026
                            ● Unsaved changes  ·  Last saved 2 minutes ago
```

The bullet turns gray and changes to "Saved" when there are no unsaved changes. The "Last saved" timestamp updates from the existing `lastSaved` state.

**Risk.** Trivial.

### 2.4 Group toolbar buttons

**The change.** Today the toolbar is one row of equal-weight buttons. Group them visually into three clusters: file actions, export, view. Use a subtle vertical separator or a gap to indicate the grouping.

```
[New · Open · Save · Save As]   [Copy HTML for NationBuilder]   [Toggle Editor · Settings ⚙]
```

The Settings gear is where the Template Section Controls go (item 2.1).

**Risk.** Trivial.

---

## Phase 3 — Templates as a first-class feature

**Why third.** This is what you originally asked for in the conversation. Phases 1 and 2 make the existing tool feel cleaner; Phase 3 actually changes the workflow for the team by giving them pre-built starting points so they're never staring at a blank page.

**Estimated effort.** 2–3 hours.

### 3.1 Build a canonical "Wharton UK Monthly" template

Work with you to build one canonical newsletter that represents a typical monthly issue — header, salutation, an Events section with two placeholder events, an Alum of the Month section, a Recent Events section, Community Links, Signature, Footer. Use realistic-looking placeholder text so editors can see exactly where each kind of content goes. Save this as `templates/wuk-monthly.json` in the repo.

This is the most important piece of Phase 3 and the one you can't skip. Without a real starter template, the Templates dropdown has nothing to offer.

### 3.2 Add a Templates dropdown to the toolbar

**The change.** Add a "Templates ▾" button to the toolbar (next to "New Project"). Clicking it shows a small menu:

```
Start from template
─────────────────────
📅 Wharton UK Monthly
🎉 Event Announcement
📣 AGM / Annual Update
─────────────────────
Open from file…
Save current as template…
```

The first section lists built-in templates baked into the page as a JS object. Clicking one populates the newsletter with that template's data. The second section keeps the existing JSON file open/save behavior, just moved into one menu.

**Risk.** Low. The save/load mechanism already exists; this is repackaging plus baking in a default template object.

### 3.3 Empty-state landing

**The change.** When the user opens the page fresh (no template loaded), instead of showing an empty editor, show a small landing card:

```
Welcome to the Wharton UK Newsletter Builder

[ Start from a template ]   [ Start blank ]
```

The first button is the Templates dropdown; the second is the current "blank newsletter" behavior. This eliminates the blank-canvas paralysis that's currently the first-run experience.

**Risk.** Low.

### 3.4 Multiple templates over time

Once the dropdown exists, additional templates (Event Announcement, AGM, etc.) are cheap to add — each is just another JSON object baked in. You can build them in the builder itself, save as JSON, drop the JSON into the templates registry. No code change needed per template.

---

## Phase 4 — Polish (optional)

**Why last.** These are quality-of-life improvements that make the tool feel professional but don't fix any actual problem. Each one is independent — you can do any, all, or none.

**Estimated effort.** Each item is roughly 30–60 minutes.

### 4.1 Drag-and-drop section reordering

Replace the up/down arrows in the content-order panel (and the section-level move-up/down arrows) with drag handles. Use the native HTML5 drag API — no library needed for this scale of complexity. The existing handlers already use `handleDragStart`/`handleDrop`, so most of this is wiring it up to a visible handle and adding hover affordances.

**Risk.** Low. Drag-and-drop on touch devices is fiddly — would need a fallback for tablet/mobile users (keep arrows visible there, or use a long-press to initiate drag).

### 4.2 Card-style section picker

Today "Add Section" is one button that adds a generic section, and there are separate buttons elsewhere for adding events / alumni / etc. Consolidate into a single "Add Section" button that opens a modal with cards for each section type: Event, Alum of the Month, Recent Events, Community Link, Rich Text, etc. Clicking a card adds that type. This is the cleanest path to teaching editors what types of content the builder supports.

**Risk.** Low.

### 4.3 Drag-and-drop image upload

Today images are uploaded via file picker. Add a drop zone in each section's image area so a user can drag a file from their desktop directly. Falls back gracefully — the file picker still works.

**Risk.** Low.

### 4.4 Better image management

Currently each image is base64-embedded into the JSON template. A newsletter with five photos can produce a 5 MB JSON file. Consider whether images should be uploaded to a separate location (the GitHub repo's `assets/` folder, or a CDN) and referenced by URL — keeps templates small and shareable. This is a meatier change because it requires somewhere to host the uploaded images. **Discuss separately if this becomes relevant.**

---

## Summary

| Phase | What it delivers | Effort | Risk |
|-------|------------------|--------|------|
| 1 | Three bug fixes + side-by-side layout. The biggest single visible improvement. | 1–2h | Low |
| 2 | Workflow clarity. Tool stops feeling cluttered and starts feeling intentional. | 1–2h | Low |
| 3 | The "templates" feature you originally asked for. Editors never face a blank page again. | 2–3h | Low |
| 4 | Polish. Drag-and-drop, card pickers, drop-zone uploads. Each is independent. | 30–60m each | Low |

**Recommendation.** Approve Phase 1 today. Use the result for one real newsletter cycle. Decide on Phase 2 and Phase 3 based on what the team says after that cycle. Phase 4 items can be picked off opportunistically over time.

**Out of scope for this plan.** NationBuilder API integration (eliminating the copy-paste step entirely), CNAME custom domain for the builder (so it lives at `builder.whartonclubuk.net`), and broader visual rebrand. These are separate conversations and would each be a meaningful project on their own.
