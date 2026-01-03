"use client";

import MarkdownView from "@/components/markdown-view";
import EditorToolbar from "./editor-toolbar";
import { usePostEditor } from "./use-post-editor";

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
  const {
    // State
    title,
    setTitle,
    content,
    setContent,
    isUploading,
    isPreviewMode,
    setIsPreviewMode,
    // Refs
    textareaRef,
    fileInputRef,
    // Actions
    formAction,
    // Handlers
    handleImageUpload,
    handleDrop,
    handlePaste,
    handleFormat,
    handleKeyDown,
    triggerImagePicker,
  } = usePostEditor(post);

  // --- 1. READER PREVIEW MODE ---
  if (isPreviewMode) {
    return (
      <div className="min-h-screen bg-white">
        <div className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-200 p-4 flex justify-between items-center">
          <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">
            👀 Reader Preview
          </span>
          <button
            onClick={() => setIsPreviewMode(false)}
            className="bg-black text-white px-4 py-1 rounded text-sm font-bold"
          >
            Back to Editor
          </button>
        </div>
        <div className="max-w-2xl mx-auto mt-16 px-6 pb-20">
          <h1 className="text-4xl font-bold mb-8 text-gray-900 leading-tight">
            {title || "Untitled Post"}
          </h1>
          <div className="prose prose-lg prose-gray max-w-none">
            {content ? (
              <MarkdownView content={content} />
            ) : (
              <p className="text-gray-400 italic">No content yet...</p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- 2. WRITER MODE ---
  return (
    <div className="max-w-3xl mx-auto">
      <form action={formAction} className="flex flex-col gap-6">
        {/* Hidden File Input (Programmatically clicked) */}
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) handleImageUpload(file);
          }}
        />

        {/* Title Section */}
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

        {/* Editor Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Content
          </label>

          {/* THE NEW CLEAN TOOLBAR */}
          <EditorToolbar
            onFormat={handleFormat}
            onImageClick={triggerImagePicker} // <--- This triggers the hidden input
          />

          <div className="relative">
            <textarea
              ref={textareaRef}
              name="content"
              required
              className={`w-full h-[500px] p-4 border border-gray-300 rounded-b-md font-mono text-sm leading-relaxed resize-none focus:ring-2 focus:ring-black focus:outline-none shadow-sm -mt-2 rounded-t-none ${
                isUploading ? "opacity-50" : ""
              }`}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onKeyDown={handleKeyDown}
              onDrop={handleDrop}
              onPaste={handlePaste}
              placeholder="# Header&#10;Write your content here..."
            />
            {isUploading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10">
                <span className="text-sm font-bold text-blue-600 animate-pulse">
                  Uploading Image...
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t pt-6 mt-2">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_public"
              id="is_public"
              defaultChecked={post?.is_public}
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
            disabled={isUploading}
            className="bg-black text-white py-2 px-8 rounded hover:bg-gray-800 transition font-bold shadow-md disabled:opacity-50"
          >
            {post ? "Update Post" : "Publish"}
          </button>
        </div>
      </form>
    </div>
  );
}
