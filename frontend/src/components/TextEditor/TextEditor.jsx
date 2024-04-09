import {FaBold, FaItalic, FaStrikethrough, FaUnderline, FaParagraph} from "react-icons/fa";
import {LuHeading1, LuHeading2, LuHeading3, LuHeading4, LuHeading5, LuHeading6} from "react-icons/lu";

import {useState, useEffect} from "react";
import {EditorProvider, useCurrentEditor} from '@tiptap/react'
import Underline from '@tiptap/extension-underline'
import {Color} from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import StarterKit from '@tiptap/starter-kit'
import Bold from "@tiptap/extension-bold";
import Paragraph from "@tiptap/extension-paragraph";
import {Heading} from "@tiptap/extension-heading";
import {Placeholder} from "@tiptap/extension-placeholder";
import {Code} from "@tiptap/extension-code";
import {FaCode} from "react-icons/fa6";
import {Document} from "@tiptap/extension-document";
import {Text} from "@tiptap/extension-text";
import {Italic} from "@tiptap/extension-italic";
import {Strike} from "@tiptap/extension-strike";

const MenuBar = ({type}) => {
    const {editor} = useCurrentEditor()

    if (!editor) {
        return null
    }

    return (
        <div className="text-editor-menu">
            <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={!editor.can().chain().focus().toggleBold().run()}
                className={`${editor.isActive('bold') ? 'is-active' : ''}`}
            >
                <FaBold/>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={!editor.can().chain().focus().toggleItalic().run()}
                className={`${editor.isActive('italic') ? 'is-active' : ''}`}
            >
                <FaItalic/>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={!editor.can().chain().focus().toggleStrike().run()}
                className={`${editor.isActive('strike') ? 'is-active' : ''}`}
            >
                <FaStrikethrough/>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleUnderline().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus().toggleUnderline().run()
                }
                className={editor.isActive('underline') ? 'is-active' : ''}
            >
                <FaUnderline/>
            </button>

            <span className="vertical-line">Стили</span>
            {/*<button*/}
            {/*    onClick={() => editor.chain().focus().toggleCode().run()}*/}
            {/*    disabled={*/}
            {/*        !editor.can()*/}
            {/*            .chain()*/}
            {/*            .focus()*/}
            {/*            .toggleCode()*/}
            {/*            .run()*/}
            {/*    }*/}
            {/*    className={editor.isActive('code') ? 'is-active' : ''}*/}
            {/*>*/}
            {/*    code*/}
            {/*</button>*/}
            {/*<button onClick={() => editor.chain().focus().unsetAllMarks().run()}>*/}
            {/*    clear marks*/}
            {/*</button>*/}
            {/*<button onClick={() => editor.chain().focus().clearNodes().run()}>*/}
            {/*    clear nodes*/}
            {/*</button>*/}
            {/*<button*/}
            {/*    onClick={() => editor.chain().focus().setParagraph().run()}*/}
            {/*    className={editor.isActive('paragraph') ? 'is-active' : ''}*/}
            {/*>*/}
            {/*    paragraph*/}
            {/*</button>*/}
            <button
                onClick={() => editor.chain().focus().toggleHeading({level: 1}).run()}
                className={editor.isActive('heading', {level: 1}) ? 'is-active' : ''}
            >
                <LuHeading1/>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                className={editor.isActive('heading', {level: 2}) ? 'is-active' : ''}
            >
                <LuHeading2/>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({level: 3}).run()}
                className={editor.isActive('heading', {level: 3}) ? 'is-active' : ''}
            >
                <LuHeading3/>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({level: 4}).run()}
                className={editor.isActive('heading', {level: 4}) ? 'is-active' : ''}
            >
                <LuHeading4/>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({level: 5}).run()}
                className={editor.isActive('heading', {level: 5}) ? 'is-active' : ''}
            >
                <LuHeading5/>
            </button>
            <button
                onClick={() => editor.chain().focus().toggleHeading({level: 6}).run()}
                className={editor.isActive('heading', {level: 6}) ? 'is-active' : ''}
            >
                <LuHeading6/>
            </button>
            <button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive('paragraph') ? 'is-active' : ''}
            >
                <FaParagraph/>
            </button>

            <span className="vertical-line">Код</span>
            {type === 'input-data' ?
                <button
                    onClick={() => editor.chain().focus().toggleCode().run()}
                    disabled={!editor.can().chain().focus().toggleCode().run()}
                    className={editor.isActive('code') ? 'is-active' : ''}
                >
                    <FaCode/>
                </button> :
                <></>
            }

            {/*<button*/}
            {/*    onClick={() => editor.chain().focus().toggleBulletList().run()}*/}
            {/*    className={editor.isActive('bulletList') ? 'is-active' : ''}*/}
            {/*>*/}
            {/*    bullet list*/}
            {/*</button>*/}
            {/*<button*/}
            {/*    onClick={() => editor.chain().focus().toggleOrderedList().run()}*/}
            {/*    className={editor.isActive('orderedList') ? 'is-active' : ''}*/}
            {/*>*/}
            {/*    ordered list*/}
            {/*</button>*/}
            {/*<button*/}
            {/*    onClick={() => editor.chain().focus().toggleCodeBlock().run()}*/}
            {/*    className={editor.isActive('codeBlock') ? 'is-active' : ''}*/}
            {/*>*/}
            {/*    code block*/}
            {/*</button>*/}
            {/*<button*/}
            {/*    onClick={() => editor.chain().focus().toggleBlockquote().run()}*/}
            {/*    className={editor.isActive('blockquote') ? 'is-active' : ''}*/}
            {/*>*/}
            {/*    blockquote*/}
            {/*</button>*/}
            {/*<button onClick={() => editor.chain().focus().setHorizontalRule().run()}>*/}
            {/*    horizontal rule*/}
            {/*</button>*/}
            {/*<button onClick={() => editor.chain().focus().setHardBreak().run()}>*/}
            {/*    hard break*/}
            {/*</button>*/}
            {/*<button*/}
            {/*    onClick={() => editor.chain().focus().undo().run()}*/}
            {/*    disabled={*/}
            {/*        !editor.can()*/}
            {/*            .chain()*/}
            {/*            .focus()*/}
            {/*            .undo()*/}
            {/*            .run()*/}
            {/*    }*/}
            {/*>*/}
            {/*    undo*/}
            {/*</button>*/}
            {/*<button*/}
            {/*    onClick={() => editor.chain().focus().redo().run()}*/}
            {/*    disabled={*/}
            {/*        !editor.can()*/}
            {/*            .chain()*/}
            {/*            .focus()*/}
            {/*            .redo()*/}
            {/*            .run()*/}
            {/*    }*/}
            {/*>*/}
            {/*    redo*/}
            {/*</button>*/}
            {/*<button*/}
            {/*    onClick={() => editor.chain().focus().setColor('#958DF1').run()}*/}
            {/*    className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}*/}
            {/*>*/}
            {/*    purple*/}
            {/*</button>*/}
        </div>
    )
}

const CustomParagraph = Paragraph.extend({
    addAttributes() {
        return {
            class: {
                default: null,
                renderHTML: (attributes) => {
                    return {
                        class: "markdown-p"
                    }
                }
            }
        }
    }
});
const CustomHeading = Heading.extend({
    addAttributes() {
        return {
            class: {
                default: null,
                renderHTML: (attributes) => {
                    switch (attributes.level) {
                        case 1:
                            return {
                                class: "markdown-h1"
                            };
                        case 2:
                            return {
                                class: "markdown-h2"
                            };
                        case 3:
                            return {
                                class: "markdown-h3"
                            }
                        case 4:
                            return {
                                class: "markdown-h4"
                            }
                        case 5:
                            return {
                                class: "markdown-h5"
                            }
                        case 6:
                            return {
                                class: "markdown-h6"
                            }
                        default:
                            return {
                                class: null
                            }
                    }
                }
            }
        }
    }
});
const CustomBold = Bold.extend();
const CustomUnderline = Underline.extend();
const CustomCode = Code.extend({
    addAttributes() {
        return {
            class: {
                default: null,
                renderHTML: (attributes) => {
                    return {
                        class: "markdown-inline-block-code"
                    }
                }
            }
        }
    }
});

const extensions = [
    Color.configure({types: [TextStyle.name, ListItem.name]}),
    TextStyle.configure({types: [ListItem.name]}),
    Underline,
    Bold,
    // Italic,
    // Strike,
    CustomParagraph,
    CustomHeading,
    CustomCode,
    Placeholder.configure({
        emptyEditorClass: 'is-editor-empty',
        placeholder: 'Контентная часть',
    }),
    // Document,
    // Text
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
    }),
]

const editorProps = {
    attributes: {
        // class: ''
    }
}

const testContent = `
<h2>
  Hi there,
</h2>
<p>
  this is a <em>basic</em> example of <strong>tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
</p>
<ul>
  <li>
    That’s a bullet list with one …
  </li>
  <li>
    … or two list items.
  </li>
</ul>
<p>
  Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
</p>
<pre><code class="language-css">body {
display: none;
}</code></pre>
<p>
  I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
</p>
<blockquote>
  Wow, that’s amazing. Good work, boy! 👏
  <br />
  — Mom
</blockquote>
`

const TextEditor = ({setHTML, type, content}) => {

    useEffect(() => {
        console.log(content);
    }, [content])

    return (
        <div className="text-editor">
            <EditorProvider onUpdate={({editor}) => setHTML(editor.getHTML())} slotBefore={<MenuBar type={type}/>}
                            editorProps={editorProps} extensions={extensions} content={content} children={""}></EditorProvider>
        </div>
    )
}

export default TextEditor;