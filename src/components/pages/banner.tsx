import { ChevronRight } from "lucide-react";
import Link from "next/link";

type BreadcrumbBannerProps = {
  text_1?: string;
  text_2?: string;
};
export default function Banner({ text_1, text_2 }: BreadcrumbBannerProps) {
  return (
    <div className="w-full h-[300px] banner-page flex items-center justify-center">
      <div className="w-full h-full px-4 container flex items-end justify-start pb-10">
        {text_1 && text_2 && (
          <h1 className="text-white text-2xl font-bold flex items-center gap-3">
            <Link className="hover:underline" href="/ministerio/sobre-nos">
              {text_1}
            </Link>
            <ChevronRight />
            <small className="font-light">{text_2}</small>
          </h1>
        )}
        {text_1 && !text_2 && (
          <h1 className="text-white text-2xl font-bold">{text_1}</h1>
        )}
        {text_2 && !text_1 && (
          <h1 className="text-white text-2xl font-bold">{text_2}</h1>
        )}
      </div>
    </div>
  );
}
