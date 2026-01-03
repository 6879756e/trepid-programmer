"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { createPost, updatePost } from "@/app/posts/actions";
import MarkdownView from "@/components/markdown-view";
import { applyFormat, FormatType } from "./text-utils";

// 1. DEFINE THE PROP TYPE
interface PostEditorProps {
  post?: {
    id: string;
    title: string;
    content: string;
    is_public: boolean;
    slug: string; // Added slug just in case
  } | null;
}

export default function PostEditor({ post }: PostEditorProps) {
  console.log(`post-editor post.id ${post?.id}`);
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const updatePostWithId = post?.id ? updatePost.bind(null, post.id) : () => {};

  const isEditing = !!post;
  const formAction = isEditing ? updatePostWithId : createPost;

  const handleFormat = (type: FormatType) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const { newText, newStart, newEnd } = applyFormat(
      content,
      start,
      end,
      type
    );
    setContent(newText);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(newStart, newEnd);
    }, 0);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.metaKey || e.ctrlKey) {
      switch (e.key.toLowerCase()) {
        case "b":
          e.preventDefault();
          handleFormat("bold");
          break;
        case "i":
          e.preventDefault();
          handleFormat("italic");
          break;
        case "e":
          e.preventDefault();
          handleFormat("code");
          break;
        case "1":
          e.preventDefault();
          handleFormat("h1");
          break;
        case "2":
          e.preventDefault();
          handleFormat("h2");
          break;
        case "3":
          e.preventDefault();
          handleFormat("h3");
          break;
      }
    }
  };

  // --- PREVIEW MODE (Reader View) ---
  if (isPreviewMode) {
    return (
      <div className="min-h-screen bg-white">
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200 p-4 flex justify-between items-center">
          <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
            👀 Reader Preview
          </span>
          <div className="flex gap-4">
            <button
              onClick={() => setIsPreviewMode(false)}
              className="bg-black text-white px-4 py-1 rounded text-sm font-bold"
            >
              Back to Editor
            </button>
          </div>
        </div>

        <div className="max-w-2xl mx-auto mt-16 px-6 pb-20">
          <h1 className="text-4xl font-bold mb-8 text-gray-900 leading-tight">
            {title || "Untitled Post"}
          </h1>
          <div className="prose prose-lg prose-gray max-w-none">
            {content ? (
              <MarkdownView content={content} />
            ) : (
              <p className="text-gray-400 italic">No content written yet...</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- EDITOR MODE (Writer View) ---
  return (
    <div className="max-w-3xl mx-auto">
      <form action={formAction} className="flex flex-col gap-6">
        {/* Top Bar: Title & Preview Button */}
        <div className="flex justify-between items-end gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              name="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-black focus:outline-none font-medium text-lg"
              placeholder="Day 42: The discovery..."
            />
          </div>
          <button
            type="button"
            onClick={() => setIsPreviewMode(true)}
            className="mb-1 px-4 py-2 bg-white hover:bg-gray-50 text-gray-700 text-sm font-bold rounded border border-gray-300 shadow-sm transition"
          >
            Preview
          </button>
        </div>

        {/* Editor Area */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>

          {/* Toolbar */}
          <div className="flex flex-wrap gap-1 mb-2 border border-gray-200 bg-gray-50 p-1 rounded-t-md">
            {/* Headers */}
            <ToolbarButton
              label="h1"
              onClick={() => handleFormat("h1")}
              title="Big Header"
            />
            <ToolbarButton
              label="h2"
              onClick={() => handleFormat("h2")}
              title="Medium Header"
            />
            <ToolbarButton
              label="h3"
              onClick={() => handleFormat("h3")}
              title="Small header"
            />

            {/* Text Style */}
            <ToolbarButton
              label="B"
              title="Bold (Cmd+B)"
              onClick={() => handleFormat("bold")}
            />
            <ToolbarButton
              label="I"
              onClick={() => handleFormat("italic")}
              title="Italic (Cmd+I)"
            />

            <div className="w-px bg-gray-300 mx-1 my-1"></div>

            {/* Structure */}
            <ToolbarButton
              label="“ ”"
              onClick={() => handleFormat("quote")}
              title="Quote"
            />

            <ToolbarButton
              label="{ }"
              onClick={() => handleFormat("code")}
              title="Code Block"
            />

            <div className="w-px bg-gray-300 mx-1 my-1"></div>

            <ToolbarButton
              label="• —"
              onClick={() => handleFormat("list")}
              title="Bullet List"
            />
            <ToolbarButton
              label="1. —"
              onClick={() => handleFormat("ordered-list")}
              title="Numbered List"
            />

            <div className="w-px bg-gray-300 mx-1 my-1"></div>

            {/* Media */}
            <ToolbarButton
              label="🖼️ Image"
              onClick={() => handleFormat("image")}
              title="Insert Image"
            />
          </div>

          <textarea
            ref={textareaRef}
            name="content"
            required
            // FIXED HEIGHT HERE (h-[500px])
            className="w-full h-[500px] p-4 border border-gray-300 rounded font-mono text-sm leading-relaxed resize-none focus:ring-2 focus:ring-black focus:outline-none shadow-sm"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="# Header&#10;Write your content here..."
          />
        </div>

        {/* Footer: Public Toggle & Publish */}
        <div className="flex items-center justify-between border-t pt-6 mt-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_public"
              id="is_public"
              className="w-4 h-4 text-black rounded border-gray-300 focus:ring-black"
            />
            <label
              htmlFor="is_public"
              className="text-sm font-medium text-gray-700"
            >
              Make Public
            </label>
          </div>

          <button
            type="submit"
            className="bg-black text-white py-2 px-8 rounded hover:bg-gray-800 transition font-bold shadow-md"
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
}

function ToolbarButton({
  label,
  title,
  onClick,
}: {
  label: string;
  title: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="px-3 py-1.5 text-xs font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded transition"
    >
      {label}
    </button>
  );
}
