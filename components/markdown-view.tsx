import ReactMarkdown from "react-markdown";

export default function MarkdownView({ content }: { content: string }) {
  return (
    <div className="prose prose-lg prose-gray max-w-none text-gray-800">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mt-8 mb-4 text-gray-900">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-900">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold mt-4 mb-2 text-gray-900">
              {children}
            </h3>
          ),
          pre: ({ children }) => (
            <pre className="not-prose bg-gray-50 border border-gray-200 rounded-lg p-4 overflow-x-auto text-sm leading-relaxed text-gray-800 shadow-sm mt-6 mb-6">
              {children}
            </pre>
          ),
          code: ({ className, children, ...props }) => {
            const isBlock =
              /language-(\w+)/.exec(className || "") ||
              children?.toString().startsWith("block code");
            if (isBlock) {
              return (
                <code
                  className={`${className} bg-transparent p-0 text-inherit font-mono`}
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code
                className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded-md font-mono text-[0.9em] border border-gray-200 font-normal"
                {...props}
              >
                {children}
              </code>
            );
          },

          // 1. Unordered Lists (Bullets)
          ul: ({ children }) => (
            <ul className="list-disc pl-6 my-4 space-y-2 marker:text-gray-400">
              {children}
            </ul>
          ),
          // 2. Ordered Lists (Numbers)
          ol: ({ children }) => (
            <ol className="list-decimal pl-6 my-4 space-y-2 marker:text-gray-500">
              {children}
            </ol>
          ),
          // 3. List Items
          li: ({ children }) => <li className="pl-1">{children}</li>,

          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-300 pl-4 text-gray-600 italic my-6">
              {children}
            </blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
