"use client";

import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css"; // Import the CSS styles

// This component receives the same props as a normal textarea would need
interface RichEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function RichEditor({ value, onChange }: RichEditorProps) {
  return (
    <div className="prose-editor">
      <SimpleMDE
        value={value}
        onChange={onChange}
        options={{
          autofocus: true,
          spellChecker: false,
          placeholder: "Write something amazing...",
          status: false, // Hide the status bar (word count etc) for a cleaner look
        }}
      />
    </div>
  );
}
