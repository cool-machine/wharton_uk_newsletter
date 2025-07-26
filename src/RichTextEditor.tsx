import React from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import TextStyle from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import Underline from '@tiptap/extension-underline';
import { Extension } from '@tiptap/core';

// Custom FontSize extension
const FontSize = Extension.create({
  name: 'fontSize',

  addOptions() {
    return {
      types: ['textStyle'],
    }
  },

  addGlobalAttributes() {
    return [
      {
        types: this.options.types,
        attributes: {
          fontSize: {
            default: null,
            parseHTML: element => element.style.fontSize.replace(/['"]+/g, ''),
            renderHTML: attributes => {
              if (!attributes.fontSize) {
                return {}
              }
              return {
                style: `font-size: ${attributes.fontSize}`,
              }
            },
          },
        },
      },
    ]
  },

  addCommands() {
    return {
      setFontSize: (fontSize: string) => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontSize })
          .run()
      },
      unsetFontSize: () => ({ chain }) => {
        return chain()
          .setMark('textStyle', { fontSize: null })
          .removeEmptyTextStyle()
          .run()
      },
    }
  },
});

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ content, onChange, placeholder }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        paragraph: {
          HTMLAttributes: {
            style: 'margin-bottom: 16px;',
          },
        },
        history: {
          depth: 100,
        },
      }),
      Link.configure({
        openOnClick: false,
      }),
      TextStyle,
      Color,
      Underline,
      FontSize,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editable: true,
    enableInputRules: true,
    enablePasteRules: true,
    editorProps: {
      attributes: {
        style: 'outline: none; min-height: 100px; padding: 8px;',
        spellcheck: 'true',
        'data-gramm': 'false', // Disable Grammarly interference
        contenteditable: 'true',
      },
      handleKeyDown: () => {
        // Allow all normal typing and keyboard shortcuts
        return false; // Let the editor handle all keydown events normally
      },
      handleTextInput: () => {
        // Allow all text input
        return false; // Let the editor handle text input normally
      },
    },
  });

  const buttonStyle = {
    padding: '6px 12px',
    margin: '2px',
    border: '1px solid #ddd',
    backgroundColor: '#f8f9fa',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  };

  const activeButtonStyle = {
    ...buttonStyle,
    backgroundColor: '#990000',
    color: 'white',
    borderColor: '#990000',
  };

  if (!editor) {
    return null;
  }

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '4px', overflow: 'hidden' }}>
      {/* Toolbar */}
      <div style={{ 
        padding: '8px', 
        backgroundColor: '#f8f9fa', 
        borderBottom: '1px solid #ddd',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px'
      }}>
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          style={editor.isActive('bold') ? activeButtonStyle : buttonStyle}
        >
          Bold
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          style={editor.isActive('italic') ? activeButtonStyle : buttonStyle}
        >
          Italic
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          style={editor.isActive('underline') ? activeButtonStyle : buttonStyle}
        >
          Underline
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          style={editor.isActive('bulletList') ? activeButtonStyle : buttonStyle}
        >
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          style={editor.isActive('orderedList') ? activeButtonStyle : buttonStyle}
        >
          1. List
        </button>
        <button
          onClick={() => {
            const url = window.prompt('Enter URL:');
            if (url) {
              editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
            }
          }}
          style={editor.isActive('link') ? activeButtonStyle : buttonStyle}
        >
          Link
        </button>
        <button
          onClick={() => editor.chain().focus().unsetLink().run()}
          style={buttonStyle}
        >
          Remove Link
        </button>
        <button
          onClick={() => editor.chain().focus().splitBlock().run()}
          style={buttonStyle}
          title="Create new paragraph (or press Shift+Enter)"
        >
          ¶ New Line
        </button>
        <button
          onClick={() => editor.chain().focus().setHardBreak().run()}
          style={buttonStyle}
          title="Insert line break"
        >
          ↵ Break
        </button>
        
        {/* Font Size Controls */}
        <select
          value={editor.getAttributes('textStyle').fontSize || ''}
          onChange={(e) => {
            if (e.target.value) {
              editor.chain().focus().setFontSize(e.target.value).run();
            } else {
              editor.chain().focus().unsetFontSize().run();
            }
          }}
          style={{
            ...buttonStyle,
            width: 'auto',
            minWidth: '80px',
            cursor: 'pointer'
          }}
          title="Select font size"
        >
          <option value="">Default</option>
          <option value="12px">12px</option>
          <option value="14px">14px</option>
          <option value="16px">16px</option>
          <option value="18px">18px</option>
          <option value="20px">20px</option>
          <option value="24px">24px</option>
          <option value="28px">28px</option>
          <option value="32px">32px</option>
        </select>
        
        <div style={{
          fontSize: '12px',
          color: '#666',
          marginLeft: '8px',
          display: 'flex',
          alignItems: 'center'
        }}>
          💡 Press <strong>Enter</strong> for new paragraph, <strong>Shift+Enter</strong> for line break
        </div>
      </div>

      {/* Editor Content */}
      <div style={{ 
        minHeight: '150px', 
        padding: '12px',
        fontSize: '16px',
        lineHeight: '1.6',
        cursor: 'text',
        overflow: 'auto',
        wordBreak: 'keep-all',
        overflowWrap: 'break-word'
      }}>
        <EditorContent 
          editor={editor} 
          placeholder={placeholder}
          style={{
            minHeight: '120px',
            outline: 'none'
          }}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;