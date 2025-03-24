import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// import Image from "next/image";

import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";
import rehypeRaw from "rehype-raw";
import remarkGfm from 'remark-gfm';
import remarkBreaks from 'remark-breaks';
import ReactMarkdown from "react-markdown";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

interface ContentRendererProps {
  content: BlocksContent | string;
  type: "blocks" | "markdown";
}

const ContentRenderer: React.FC<ContentRendererProps> = ({ content, type }) => {
  if (type === "blocks" && Array.isArray(content)) {
    return <BlocksRenderer content={content} />;
  } else if (type === "markdown" && typeof content === "string") {
    return <ReactMarkdown remarkPlugins={[remarkGfm, remarkBreaks]} rehypePlugins={[rehypeRaw]}>{content}</ReactMarkdown>;
  } else {
    return <></>;
  }
};

export default ContentRenderer;

export const imageURLServer = process.env.WEB_BASE_SERVER;
