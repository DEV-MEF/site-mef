// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import Card from "./card";
// export default function CardsList() {
//   return (
//     <Carousel className="md:px-14 w-full">
//       <CarouselContent className="w-full flex flex-row gap-8 ">
//         {Array.from({ length: 4 }).map((_, index) => (
//           <CarouselItem
//             className="pl-1 basis-1/2 md:basis-2/4 lg:basis-2/8 xl:basis-1/5"
//             key={index}
//           >
//             <Card
//               imagePath="/images/online-services/efactura.png"
//               title="Serviço Online"
//               href="/ministerio/servicos-online"
//             />
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious className="hidden md:flex items-center justify-center text-white  bg-primary-blue  cursor-pointer hover:bg-primary-blue/90 w-10 h-10 rounded-full absolute left-0 z-10" />
//       <CarouselNext className="hidden md:flex items-center justify-center text-white bg-primary-blue cursor-pointer hover:bg-primary-blue/90 w-10 h-10 rounded-full absolute right-0 z-10" />
//     </Carousel>
//   );
// }
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Card from "./card";

export default function CardsList() {
  return (
    <Carousel className="md:pr-14 w-full relative">
      {/* Controles de navegação agrupados no canto superior direito */}
      <div className="flex justify-end mb-4">
        <div className="flex items-center -space-x-16">
          <CarouselPrevious className="relative hidden md:flex items-center justify-center text-white bg-primary-blue cursor-pointer hover:bg-primary-blue/90 w-8 h-8 rounded-full" />
          <CarouselNext className="relative hidden md:flex items-center justify-center text-white bg-primary-blue cursor-pointer hover:bg-primary-blue/90 w-8 h-8 rounded-full" />
        </div>
      </div>

      <CarouselContent className="w-full flex flex-row gap-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <CarouselItem
            className="pl-1 basis-1/2 md:basis-2/4 lg:basis-2/8 xl:basis-1/5"
            key={index}
          >
            <Card
              imagePath="/images/online-services/efactura.png"
              title="Serviço Online"
              href="/ministerio/servicos-online"
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
