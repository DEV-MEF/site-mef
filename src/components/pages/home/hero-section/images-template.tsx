import Image from "next/image";

type ImageTemplateProps = {
  src: string;
  title: string;
  subtitle: string;
};

export default function ImagesTemplate({
  title,
  subtitle,
  src,
}: ImageTemplateProps) {
  return (
    <div className="relative w-full h-[500px]">
      <Image
        src={src}
        alt={title}
        fill
        className="w-full h-full object-cover"
      />
      {/* Gradient Overlay */}
      <div className="absolute inset-0 gradient"></div>
      {/* Text Content */}
      <div className="w-full container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bottom-14 md:bottom-16 lg:bottom-8 text-white z-10  px-4 lg:px-8  py-8 md:py-16 lg:py-20">
        <h2 className="text-3xl md:text-[4xl] md:text-[37px] lg:text-[44px] font-semibold mb-2 md:mb-4 lg:leading-tight">
          {title}
        </h2>
        <p className="mt-2 mb-8 font-light lg:text-2xl">{subtitle}</p>
        <button className="bg-transparent text-white border border-white py-2 px-4 rounded hover:bg-primary-blue hover:border-primary-blue transition">
          Ler Mais
        </button>
      </div>
    </div>
  );
}
