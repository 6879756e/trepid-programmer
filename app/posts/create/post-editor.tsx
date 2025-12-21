"use client";

import { useState } from "react";
import { createPost } from "../actions";
import MarkdownView from "@/components/markdown-view";

export default function PostEditor() {
  const [content, setContent] = useState("");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* LEFT: The Editor */}
      <form action={createPost} className="flex flex-col gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            name="title"
            type="text"
            required
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="My Great Post"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Content (Markdown Supported)
          </label>
          <textarea
            name="content"
            required
            rows={15}
            className="w-full p-4 border border-gray-300 rounded font-mono text-sm"
            placeholder="# Header&#10;Write your content here...&#10;- List item"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_public"
            id="is_public"
            className="w-4 h-4"
          />
          <label htmlFor="is_public">Make Public</label>
        </div>

        <button
          type="submit"
          className="bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Publish
        </button>
      </form>

      {/* RIGHT: The Live Preview */}
      <div className="border border-gray-200 rounded p-6 bg-gray-50 overflow-auto h-[600px]">
        <h3 className="text-xs font-bold text-gray-400 uppercase mb-4 tracking-wider">
          Live Preview
        </h3>
        {content ? (
          <MarkdownView content={content} />
        ) : (
          <p className="text-gray-400 text-sm italic">
            Start typing to see how your post will look...
          </p>
        )}
      </div>
    </div>
  );
}
