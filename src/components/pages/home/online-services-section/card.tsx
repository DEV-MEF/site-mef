// "use client";
// import { ChevronRight } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";

// type CardProps = {
//   imagePath: string;
//   title: string;
//   href: string;
// };
// export default function Card({ imagePath, title, href }: CardProps) {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       className={`relative flex flex-col items-center justify-center
//         bg-light-gray rounded-xl
//         transition-all duration-300 ease-in-out
//         ${isHovered ? "shadow-lg shadow-zinc-300 -translate-y-2" : "shadow-sm"}
//         overflow-hidden
//       `}
//     >
//       {/* Imagem principal */}
//       <div className="w-full h-[200px] relative z-10 transition-transform duration-300 ease-in-out flex items-center justify-center">
//         <Image
//           width={500}
//           height={500}
//           src={imagePath}
//           alt={title}
//           unoptimized
//           className={`
//              w-full h-full
//             transition-all duration-300
//           `}
//         />
//       </div>
//       {/*   ${isHovered ? "scale-95 opacity-90" : "scale-100 opacity-100"} */}
//       {/* Overlay com gradiente */}
//       <div
//         className={`
//           w-full z-20 absolute inset-0 rounded-xl
//           bg-gradient-to-t from-primary-blue/60 md:from-primary-blue/80 to-transparent
//           transition-opacity duration-300 ease-in-out
//           ${isHovered ? "md:opacity-100" : "md:opacity-0"}
//         `}
//       />

//       {/* Botão de acesso */}
//       <div
//         className={`
//         absolute bottom-0 left-0 right-0
//         flex justify-center items-center
//         p-4 transition-all duration-300 ease-in-out z-20
//         transform ${isHovered ? "md:translate-y-0" : "md:translate-y-full"}
//       `}
//       >
//         <Link
//           href={href}
//           className={`
//             bg-white h-full text-primary-blue font-semibold
//             px-4 py-1 rounded-full text-sm
//             transition-all hover:bg-primary-blue/90 hover:text-white
//             flex items-center justify-center z-30 shadow-md
//           `}
//           target="_blank"
//         >
//           Acessar
//           <ChevronRight size={16} />
//         </Link>
//       </div>
//     </div>
//   );
// }

"use client";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

type CardProps = {
  imagePath: string;
  title: string;
  href: string;
};

export default function Card({ imagePath, title, href }: CardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative flex flex-col items-center justify-center
        bg-light-gray rounded-xl
        transition-all duration-300 ease-in-out
        ${isHovered ? "-translate-y-1" : "shadow-lg"}
        overflow-hidden
      `}
    >
      {/* Main Image - Now stationary */}
      <div className="w-full h-[200px] relative z-10 flex items-center justify-center">
        <Image
          width={500}
          height={500}
          src={imagePath}
          alt={title}
          unoptimized
          className="w-full h-full object-cover bg-primary-blue/5"
        />
      </div>

      {/* Overlay with gradient - Now moves with hover */}
      <div
        className={`
          w-full z-20 h-[230px] absolute inset-0 rounded-xl
          bg-gradient-to-t from-primary-blue/60 md:from-primary-blue/80 to-transparent
          transition-all duration-300 ease-in-out
          ${isHovered ? "md:opacity-100 -translate-y-2" : "md:opacity-0"}
        `}
      />

      {/* Access Button - Moves on hover */}
      <div
        className={`
          absolute bottom-0 left-0 right-0
          flex justify-center items-center
          p-4 transition-all duration-300 ease-in-out z-20
          transform ${isHovered ? "md:translate-y-0" : "md:translate-y-full"}
        `}
      >
        <Link
          href={href}
          className={`
            bg-white h-full text-primary-blue font-semibold
            px-4 py-1 rounded-full text-sm
            transition-all hover:bg-primary-blue/90 hover:text-white
            flex items-center justify-center z-30 shadow-md
          `}
          target="_blank"
        >
          Acessar
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}
