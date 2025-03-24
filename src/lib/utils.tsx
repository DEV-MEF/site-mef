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

export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString('pt-PT', options);
  return formattedDate.replace(/de (\w+)/, (_, month) => `${month.charAt(0).toUpperCase() + month.slice(1)}`); // Capitaliza o mês
}

export default ContentRenderer;

export const imageURLServer = process.env.WEB_BASE_SERVER;
