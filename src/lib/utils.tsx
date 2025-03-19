import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
// import Image from "next/image";

import { BlocksRenderer, type BlocksContent } from "@strapi/blocks-react-renderer";
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
    return <ReactMarkdown skipHtml={false}>{content}</ReactMarkdown>;
  } else {
    return <></>;
  }
};

export default ContentRenderer;
