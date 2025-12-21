import ReactMarkdown from "react-markdown";

export default function MarkdownView({ content }: { content: string }) {
  return (
    <div className="prose prose-lg prose-gray max-w-none">
      <ReactMarkdown
        components={{
          // 1. OVERRIDE THE BLOCK CODE CONTAINER (<pre>)
          pre: ({ children }) => (
            <pre className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed text-gray-800 shadow-sm mt-6 mb-6">
              {children}
            </pre>
          ),
          // 2. OVERRIDE THE INLINE CODE (single `backticks`)
          code: ({ className, children, ...props }) => {
            // Check if this code is inside a block (does it have a language class?)
            const isBlock = /language-(\w+)/.exec(className || "");

            if (isBlock) {
              // If it's a block, just render plain text (the <pre> above handles the box)
              return (
                <code
                  className={`${className} bg-transparent p-0 text-inherit font-mono`}
                  {...props}
                >
                  {children}
                </code>
              );
            }

            // If it's INLINE code (like `const x = 1`), give it the pink/gray style
            return (
              <code
                className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded-md font-mono text-[0.9em] border border-gray-200 font-normal"
                {...props}
              >
                {children}
              </code>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
