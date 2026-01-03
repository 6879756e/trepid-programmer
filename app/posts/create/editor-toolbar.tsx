import React from "react";
import { FormatType } from "./text-utils";

interface ToolbarProps {
  onFormat: (type: FormatType) => void;
  onImageClick: () => void;
}

export default function EditorToolbar({
  onFormat,
  onImageClick,
}: ToolbarProps) {
  return (
    <div className="flex flex-wrap gap-1 mb-2 border border-gray-200 bg-gray-50 p-1 rounded-t-md">
      {/* Headers */}
      <ToolbarButton
        label="h1"
        onClick={() => onFormat("h1")}
        title="Big Header"
      />
      <ToolbarButton
        label="h2"
        onClick={() => onFormat("h2")}
        title="Medium Header"
      />
      <ToolbarButton
        label="h3"
        onClick={() => onFormat("h3")}
        title="Small Header"
      />

      <Divider />

      {/* Styles */}
      <ToolbarButton
        label="B"
        onClick={() => onFormat("bold")}
        title="Bold (Cmd+B)"
      />
      <ToolbarButton
        label="I"
        onClick={() => onFormat("italic")}
        title="Italic (Cmd+I)"
      />

      <Divider />

      {/* Structure */}
      <ToolbarButton
        label="“ ”"
        onClick={() => onFormat("quote")}
        title="Quote"
      />
      <ToolbarButton
        label="{ }"
        onClick={() => onFormat("code")}
        title="Code Block"
      />

      <Divider />

      {/* Lists */}
      <ToolbarButton
        label="• —"
        onClick={() => onFormat("list")}
        title="Bullet List"
      />
      <ToolbarButton
        label="1. —"
        onClick={() => onFormat("ordered-list")}
        title="Numbered List"
      />

      <Divider />

      {/* Image - Now uses the same button style! */}
      <ToolbarButton
        label="🖼️ Image"
        onClick={onImageClick}
        title="Insert Image"
      />
    </div>
  );
}

// Small helpers for this file
function Divider() {
  return <div className="w-px bg-gray-300 mx-1 my-1"></div>;
}

function ToolbarButton({
  label,
  onClick,
  title,
}: {
  label: string;
  onClick: () => void;
  title: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className="px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-white hover:text-black hover:shadow-sm rounded transition-all min-w-[32px]"
    >
      {label}
    </button>
  );
}
