"use client";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

type BreadcrumbItem = {
    name: string;
    link?: string;
};

type BreadcrumbBannerProps = {
    items?: BreadcrumbItem[];
    onItemClick?: (index: number) => void;
    link_1?: string;
    link_2?: string;
    link_3?: string;
    text_1?: string;
    text_2?: string;
    text_3?: string;
    text_4?: string;
};

export default function Banner({
                                   items,
                                   text_1,
                                   text_2,
                                   text_3,
                                   text_4,
                                   link_1,
                                   link_2,
                                   link_3,
                                   onItemClick,
                               }: BreadcrumbBannerProps) {
    const staticItems = [
        ...(text_1 ? [{ name: text_1, link: link_1 }] : []),
        ...(text_2 ? [{ name: text_2, link: link_2 }] : []),
        ...(text_3 ? [{ name: text_3, link: link_3 }] : []),
        ...(text_4 ? [{ name: text_4 }] : []),
    ];

    const allItems = [...staticItems, ...(items || [])];
    const staticLength = staticItems.length;

    return (
        <div className="w-full h-[180px] md:h-[300px] banner-page flex items-center justify-center">
            <div className="w-full h-full max-w-[88rem] px-4 container flex items-end justify-start pb-6 md:pb-10">
                {allItems.length > 0 && (
                    <div className="text-white text-sm md:text-md font-bold flex flex-wrap md:flex-nowrap items-center gap-2 overflow-x-auto scrollbar-hide">
                        {allItems.map((item, index) => {
                            const isLast = index === allItems.length - 1;
                            const isDynamic = index >= staticLength;

                            const handleClick = () => {
                                if (isDynamic && onItemClick) onItemClick(index - staticLength);
                            };

                            return (
                                <div key={index} className="flex items-center gap-2 min-w-fit">
                                    {item.link && !isLast ? (
                                        <Link
                                            href={item.link}
                                            onClick={handleClick}
                                            className="hover:underline whitespace-nowrap"
                                        >
                                            {item.name}
                                        </Link>
                                    ) : (
                                        <small className="font-light max-w-[100px] md:max-w-[400px] line-clamp-1 whitespace-nowrap">
                                            {item.name}
                                        </small>
                                    )}
                                    {!isLast && <ChevronRight className="w-3 md:w-5 shrink-0" />}
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
