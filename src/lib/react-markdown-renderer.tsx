// import { clsx, type ClassValue } from "clsx"
// import { twMerge } from "tailwind-merge"
// // import Image from "next/image";

// import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";
// import rehypeRaw from "rehype-raw";
// import remarkGfm from 'remark-gfm';
// import remarkBreaks from 'remark-breaks';
// import ReactMarkdown from "react-markdown";

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

// interface ContentRendererProps {
//   content: BlocksContent | string;
//   type: "blocks" | "markdown";
// }

// const ContentRenderer: React.FC<ContentRendererProps> = ({ content, type }) => {
//   if (type === "blocks" && Array.isArray(content)) {
//     return <BlocksRenderer content={content} />;
//   } else if (type === "markdown" && typeof content === "string") {
//     const decodedContent = decodeURIComponent(content);
//     console.log(decodedContent)
//     return <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeRaw]}>{decodedContent}</ReactMarkdown>;
//   } else {
//     return <></>;
//   }
// };

// export default ContentRenderer;
"use client";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  BlocksRenderer,
  type BlocksContent,
} from "@strapi/blocks-react-renderer";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import ReactMarkdown from "react-markdown";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ContentRendererProps {
  content: BlocksContent | string;
  type: "blocks" | "markdown";
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ content, type }) => {
  if (type === "blocks" && Array.isArray(content)) {
    return <BlocksRenderer content={content} />;
  } else if (type === "markdown" && typeof content === "string") {
    const decodedContent = decodeURIComponent(content);

    return (
      <div className="prose prose-invert max-w-none text-gray-200">
        <ReactMarkdown
          remarkPlugins={[remarkGfm, remarkBreaks]}
          rehypePlugins={[rehypeRaw]}
          components={{
            h1: ({ children }) => (
              <h1 className="text-3xl font-bold text-pink-400">{children}</h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xl font-semibold text-blue-400">
                {children}
              </h2>
            ),
            p: ({ children }) => (
              <p className="text-gray-300 leading-relaxed">{children}</p>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                className="text-blue-400 underline hover:text-blue-300"
              >
                {children}
              </a>
            ),
            ul: ({ children }) => (
              <ul className="list-disc list-inside space-y-2">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="list-decimal list-inside space-y-2">{children}</ol>
            ),
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-gray-500 pl-4 italic text-gray-400">
                {children}
              </blockquote>
            ),
            code: ({ children }) => (
              <code className="bg-gray-800 text-orange-400 px-1 py-0.5 rounded">
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre className="bg-gray-900 text-gray-300 p-4 rounded-md overflow-x-auto">
                {children}
              </pre>
            ),
          }}
        >
          {decodedContent}
        </ReactMarkdown>
      </div>
    );
  } else {
    return null;
  }
};

export default ContentRenderer;
