import { useState, useRef, useEffect } from "react";
import { createPost, updatePost, uploadImage } from "@/app/posts/actions";
import { applyFormat, FormatType } from "./text-utils";

export function usePostEditor(post: any) {
  // --- State ---
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [isUploading, setIsUploading] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  // --- Refs ---
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- Form Action Logic ---
  // Create a bound version of updatePost if we have an ID
  const updatePostWithId = post?.id ? updatePost.bind(null, post.id) : () => {};
  const formAction = post?.id ? updatePostWithId : createPost;

  // --- Image Upload Logic ---
  async function handleImageUpload(file: File) {
    if (!file.type.startsWith("image/")) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const { url, error } = await uploadImage(formData);
    setIsUploading(false);

    if (error || !url) {
      alert("Failed to upload image");
      return;
    }

    insertTextAtCursor(`![Image](${url})`);
  }

  // --- Text Insertion Helper ---
  function insertTextAtCursor(text: string) {
    if (!textareaRef.current) return;
    const start = textareaRef.current.selectionStart;
    const end = textareaRef.current.selectionEnd;

    const newText = content.substring(0, start) + text + content.substring(end);
    setContent(newText);

    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(
        start + text.length,
        start + text.length
      );
    }, 0);
  }

  // --- Event Handlers ---
  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleImageUpload(file);
  }

  function handlePaste(e: React.ClipboardEvent) {
    const file = e.clipboardData.files[0];
    if (file) {
      e.preventDefault();
      handleImageUpload(file);
    }
  }

  function handleFormat(type: FormatType) {
    if (!textareaRef.current) return;
    const { newText, newStart, newEnd } = applyFormat(
      content,
      textareaRef.current.selectionStart,
      textareaRef.current.selectionEnd,
      type
    );
    setContent(newText);
    setTimeout(() => {
      textareaRef.current?.focus();
      textareaRef.current?.setSelectionRange(newStart, newEnd);
    }, 0);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.metaKey || e.ctrlKey) {
      const key = e.key.toLowerCase();
      // Prevent default for handled keys
      if (["b", "i", "e", "1", "2", "3"].includes(key)) e.preventDefault();

      switch (key) {
        case "b":
          handleFormat("bold");
          break;
        case "i":
          handleFormat("italic");
          break;
        case "e":
          handleFormat("code");
          break;
        case "1":
          handleFormat("h1");
          break;
        case "2":
          handleFormat("h2");
          break;
        case "3":
          handleFormat("h3");
          break;
      }
    }
  }

  // Trigger the hidden file input click
  function triggerImagePicker() {
    fileInputRef.current?.click();
  }

  return {
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
  };
}
