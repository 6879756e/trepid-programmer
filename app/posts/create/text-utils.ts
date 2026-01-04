// 1. Add 'image', 'quote', and 'list' to the types
export type FormatType =
  | "bold"
  | "italic"
  | "code"
  | "h1"
  | "h2"
  | "h3"
  | "image"
  | "quote"
  | "list"
  | "ordered-list";

export function applyFormat(
  text: string,
  start: number,
  end: number,
  type: FormatType
) {
  const selectedText = text.slice(start, end);
  let prefix = "";
  let suffix = "";
  let replacement = ""; // New: For when we replace text entirely

  switch (type) {
    case "bold":
      prefix = "**";
      suffix = "**";
      break;
    case "italic":
      prefix = "_";
      suffix = "_";
      break;
    case "code":
      if (selectedText.includes("\n")) {
        prefix = "\n```\n";
        suffix = "\n```\n";
      } else {
        prefix = "`";
        suffix = "`";
      }
      break;
    case "h1":
      prefix = "# ";
      break;
    case "h2":
      prefix = "## ";
      break;
    case "h3":
      prefix = "### ";
      break;

    case "quote":
      prefix = "> ";
      break;
    case "list":
    case "ordered-list":
      if (selectedText.length > 0) {
        replacement = selectedText
          .split("\n")
          .map((line, index) => {
            if (type === "list") return `- ${line}`;
            if (type === "ordered-list") return `${index + 1}. ${line}`;
            return line;
          })
          .join("\n");
      } else {
        replacement = type === "list" ? "- " : "1. ";
      }
      break;
    case "image":
      replacement = `![${
        selectedText || "Image Description"
      }](https://placehold.co/600x400)`;
      break;
  }

  // If we have a specific replacement (like Image), use it.
  // Otherwise use the standard prefix/suffix logic.
  if (replacement) {
    const newText = text.slice(0, start) + replacement + text.slice(end);
    return {
      newText,
      newStart: start + 2,
      newEnd: start + 2 + (selectedText.length || 17),
    };
    // ^ Selection focuses on the 'Description' part so you can type immediately
  } else {
    const newText =
      text.slice(0, start) + prefix + selectedText + suffix + text.slice(end);
    return {
      newText,
      newStart: start + prefix.length,
      newEnd: end + prefix.length,
    };
  }
}
