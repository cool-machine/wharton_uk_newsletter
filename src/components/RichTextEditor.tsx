import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import FontFamily from '@tiptap/extension-font-family';
import Color from '@tiptap/extension-color';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import React, { useState } from 'react';
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  List,
  ListOrdered,
  Strikethrough,
  Type,
  Palette,
  HighlighterIcon,
  Unlink,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  ChevronDown,
} from 'lucide-react';

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const fontFamilies = [
  { name: 'Arial', value: 'Arial, sans-serif' },
  { name: 'Times New Roman', value: 'Times New Roman, serif' },
  { name: 'Georgia', value: 'Georgia, serif' },
  { name: 'Helvetica', value: 'Helvetica, sans-serif' },
  { name: 'Verdana', value: 'Verdana, sans-serif' },
];

const fontSizes = [
  { name: '12px', value: '12px' },
  { name: '14px', value: '14px' },
  { name: '16px', value: '16px' },
  { name: '18px', value: '18px' },
  { name: '20px', value: '20px' },
  { name: '24px', value: '24px' },
  { name: '28px', value: '28px' },
  { name: '32px', value: '32px' }
];

const colors = [
  '#000000', '#434343', '#666666', '#999999', '#b7b7b7', '#cccccc', '#d9d9d9', '#efefef', '#f3f3f3', '#ffffff',
  '#980000', '#ff0000', '#ff9900', '#ffff00', '#00ff00', '#00ffff', '#4a86e8', '#0000ff', '#9900ff', '#ff00ff',
];

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange }) => {
  const [showFontMenu, setShowFontMenu] = useState(false);
  const [showSizeMenu, setShowSizeMenu] = useState(false);
  const [showColorMenu, setShowColorMenu] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: 'text-blue-500 underline',
        },
      }),
      TextStyle.configure({
        HTMLAttributes: {
          class: 'custom-text-style',
        },
      }),
      FontFamily.configure({
        types: ['textStyle'],
      }),
      Color.configure({
        types: ['textStyle'],
      }),
      Highlight.configure({ multicolor: true }),
      Typography,
      Underline,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });
  
  if (!editor) {
    return null;
  }

  const addLink = () => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('Enter URL', previousUrl);
    
    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().unsetLink().run();
      return;
    }

    editor.chain().focus().setLink({ href: url }).run();
  };

  const removeLink = () => {
    editor.chain().focus().unsetLink().run();
  };

  const applyFontSize = (size: string) => {
    if (!editor) return;
    
    // Apply using TipTap's command
    editor.chain().focus().setMark('textStyle', { 'font-size': size }).run();
    
    const { from, to } = editor.state.selection;
    if (from === to) {
      // No selection, just set for future typing
      editor.chain().focus().setMark('textStyle', { fontSize: size }).run();
    } else {
      // Apply to selected text using direct DOM manipulation as fallback
      const selectedText = editor.state.doc.textBetween(from, to);
      const currentHtml = editor.getHTML();
        // More precise replacement
        const regex = new RegExp(`<span[^>]*>${selectedText}</span>|${selectedText}`, 'g');
        const newHtml = currentHtml.replace(regex, `<span style="font-size: ${size}">${selectedText}</span>`);
        
        // Fallback: Direct HTML manipulation
        setTimeout(() => {
          const html = editor.getHTML();
          const updatedHtml = html.replace(
            new RegExp(`>${selectedText}<`, 'g'),
            `><span style="font-size: ${size}">${selectedText}</span><`
          );
          if (html !== updatedHtml) {
            editor.commands.setContent(updatedHtml);
          }
        }, 100);
      }
    
    setShowSizeMenu(false);
  };

  return (
    <div className="border rounded-lg overflow-hidden">
      <div className="bg-gray-50 border-b p-2 flex flex-wrap gap-2">
        {/* Text Style Controls */}
        <div className="flex items-center gap-1 border-r pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive('bold') ? 'bg-gray-200' : ''
            }`}
            title="Bold"
          >
            <Bold size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive('italic') ? 'bg-gray-200' : ''
            }`}
            title="Italic"
          >
            <Italic size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive('underline') ? 'bg-gray-200' : ''
            }`}
            title="Underline"
          >
            <UnderlineIcon size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive('strike') ? 'bg-gray-200' : ''
            }`}
            title="Strikethrough"
          >
            <Strikethrough size={16} />
          </button>
        </div>

        {/* Font Controls */}
        <div className="flex items-center gap-1 border-r pr-2">
          <div className="relative">
            <button
              onClick={() => setShowFontMenu(!showFontMenu)}
              className="flex items-center gap-1 p-2 rounded hover:bg-gray-200"
              title="Font Family"
            >
              <Type size={16} />
              <ChevronDown size={12} />
            </button>
            {showFontMenu && (
              <div className="absolute z-10 top-full left-0 mt-1 w-48 bg-white border rounded-lg shadow-lg">
                {fontFamilies.map((font) => (
                  <button
                    key={font.value}
                    onClick={() => {
                      editor.chain().focus().setFontFamily(font.value).run();
                      setShowFontMenu(false);
                    }}
                    className="w-full px-4 py-2 text-left hover:bg-gray-100"
                    style={{ fontFamily: font.value }}
                  >
                    {font.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => setShowSizeMenu(!showSizeMenu)}
              className="flex items-center gap-1 p-2 rounded hover:bg-gray-200"
              title="Font Size"
            >
              <span className="text-sm">Size</span>
              <ChevronDown size={12} />
            </button>
            {showSizeMenu && (
              <div className="absolute z-10 top-full left-0 mt-1 w-20 bg-white border rounded-lg shadow-lg">
                {fontSizes.map((size) => (
                  <button
                    key={size.value}
                    onClick={() => applyFontSize(size.value)}
                    className="w-full px-3 py-2 text-left hover:bg-gray-100"
                    style={{ fontSize: size.value }}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Color Controls */}
        <div className="flex items-center gap-1 border-r pr-2">
          <div className="relative">
            <button
              onClick={() => setShowColorMenu(!showColorMenu)}
              className="flex items-center gap-1 p-2 rounded hover:bg-gray-200"
              title="Text Color"
            >
              <Palette size={16} />
              <ChevronDown size={12} />
            </button>
            {showColorMenu && (
              <div className="absolute z-10 top-full left-0 mt-1 w-48 bg-white border rounded-lg shadow-lg p-2">
                <div className="mb-2 text-xs text-gray-600 font-medium">Text Color</div>
                <div className="grid grid-cols-10 gap-1">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => {
                        editor.chain().focus().setColor(color).run();
                        setShowColorMenu(false);
                      }}
                      className="w-4 h-4 rounded hover:opacity-80 border border-gray-300"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t">
                  <button
                    onClick={() => {
                      editor.chain().focus().unsetColor().run();
                      setShowColorMenu(false);
                    }}
                    className="text-xs text-gray-600 hover:text-gray-800"
                  >
                    Remove Color
                  </button>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => editor.chain().focus().toggleHighlight().run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive('highlight') ? 'bg-gray-200' : ''
            }`}
            title="Highlight"
          >
            <HighlighterIcon size={16} />
          </button>
        </div>

        {/* List Controls */}
        <div className="flex items-center gap-1 border-r pr-2">
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive('bulletList') ? 'bg-gray-200' : ''
            }`}
            title="Bullet List"
          >
            <List size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive('orderedList') ? 'bg-gray-200' : ''
            }`}
            title="Numbered List"
          >
            <ListOrdered size={16} />
          </button>
        </div>

        {/* Alignment Controls */}
        <div className="flex items-center gap-1 border-r pr-2">
          <button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200' : ''
            }`}
            title="Align Left"
          >
            <AlignLeft size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200' : ''
            }`}
            title="Align Center"
          >
            <AlignCenter size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200' : ''
            }`}
            title="Align Right"
          >
            <AlignRight size={16} />
          </button>
          <button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive({ textAlign: 'justify' }) ? 'bg-gray-200' : ''
            }`}
            title="Align Justify"
          >
            <AlignJustify size={16} />
          </button>
        </div>

        {/* Link Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={addLink}
            className={`p-2 rounded hover:bg-gray-200 ${
              editor.isActive('link') ? 'bg-gray-200' : ''
            }`}
            title="Add Link"
          >
            <LinkIcon size={16} />
          </button>
          <button
            onClick={removeLink}
            className="p-2 rounded hover:bg-gray-200"
            title="Remove Link"
          >
            <Unlink size={16} />
          </button>
        </div>
      </div>

      <EditorContent
        editor={editor}
        className="prose max-w-none p-4 min-h-[200px] focus:outline-none"
      />
    </div>
  );
};

export default RichTextEditor;