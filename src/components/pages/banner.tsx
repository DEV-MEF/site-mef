import { ChevronRight } from "lucide-react";
import Link from "next/link";

type BreadcrumbBannerProps = {
  text_1?: string;
  text_2?: string;
  text_3?: string;
  text_4?: string;
  link_1: string;
  link_2?: string;
  link_3?: string;
};
export default function Banner({
  text_1,
  text_2,
  text_3,
  text_4,
  link_1,
  link_2,
  link_3,
}: BreadcrumbBannerProps) {
  return (
    <div className="w-full h-[250px] md:h-[300px] banner-page flex items-center justify-center">
      <div className="w-full h-full max-w-[88rem] px-4 container flex items-end justify-start pb-10">
        {text_1 && text_2 && !text_3 && !text_4 && (
          <div className="text-white text-md font-semibold flex items-center gap-2">
            <Link className="hover:underline" href={link_1}>
              {text_1}
            </Link>
            <ChevronRight className="w-4 md:w-5" />
            <small className="font-light">{text_2}</small>
          </div>
        )}
        {text_1 && text_2 && text_3 && (
          <div className="w-full text-white text-md font-bold flex items-center justify-start gap-2">
            <Link className="hover:underline" href={link_1}>
              {text_1}
            </Link>
            <ChevronRight className="w-4 md:w-5" />
            <Link className="hover:underline font-semibold" href={link_2 || ""}>
              {text_2}
            </Link>
            <ChevronRight className="w-4 md:w-5" />
            {/* <small className="font-light w-[110px] md:w-auto line-clamp-1">{text_3}</small> */}
            <small className="font-light line-clamp-1">
              {text_3}
            </small>
          </div>
        )}
        {text_1 && text_2 && text_3 && text_4 && (
          <div className="w-full text-white text-md font-bold flex items-center justify-start gap-2">
            <Link className="hover:underline" href={link_1}>
              {text_1}
            </Link>
            <ChevronRight className="w-4 md:w-5" />
            <Link className="hover:underline font-semibold" href={link_2 || ""}>
              {text_2}
            </Link>
            <ChevronRight className="w-4 md:w-5" />
            <Link className="hover:underline font-semibold" href={link_3 || ""}>
              {text_3}
            </Link>
            <ChevronRight className="w-4 md:w-5" />
            {/* <small className="font-light w-[110px] md:w-auto line-clamp-1">{text_3}</small> */}
            <small className="font-light line-clamp-1">
              {text_4}
            </small>
          </div>
        )}
        {text_1 && !text_2 && (
          <h1 className="text-white text-lg font-bold">{text_1}</h1>
        )}
        {text_2 && !text_1 && (
          <h1 className="text-white text-lg font-bold">{text_2}</h1>
        )}
      </div>
    </div>
  );
}
