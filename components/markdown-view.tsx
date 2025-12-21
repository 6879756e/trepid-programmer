import ReactMarkdown from "react-markdown";

export default function MarkdownView({ content }: { content: string }) {
  return (
    <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-blue-600">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}
