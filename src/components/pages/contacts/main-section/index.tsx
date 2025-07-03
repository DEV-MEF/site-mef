// "use client";
// import Image from "next/image";
// import ContactMap from "../map";
// import { Label } from "@/components/ui/label";
// import { Input } from "@/components/ui/input";
// import { useServicos } from "@/components/contexts/servicos";
// import { imageURLServer } from "@/lib/utils";
// import { useHookMessage } from "@/components/hooks/message";
// import { useRef } from "react";
// import { Message } from "postcss";
// import { Button } from "@/components/ui/button";
// import { Clock, Globe, Mail, MapPin, Phone } from "lucide-react";
// import { Card, CardContent } from "@/components/ui/card";
// import Link from "next/link";

// export default function ContactMainSection() {
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const { ministerio, contato } = useServicos();
//   const urlPhotoContact = (
//     contato.photos?.[0]?.formats?.medium ||
//     contato.photos?.[0] ||
//     {}
//   ).url;
//   const { send, message, setMessage } = useHookMessage();

//   const refs = useRef<
//     Record<keyof Message, HTMLInputElement | HTMLTextAreaElement | null>
//   >({} as Record<keyof Message, HTMLInputElement | HTMLTextAreaElement>);

//   return (
//     <section className="w-full flex flex-col gap-28 py-32">
//       <div className="w-full container px-4 max-w-[88rem] flex flex-col lg:flex-row gap-20 lg:gap-6 mx-auto">
//         <div className="w-full">
//           <h6 className="text-md text-primary-blue font-semibold">
//             Contacte-nos
//           </h6>
//           <h2 className="text-xl font-semibold my-3 text-zinc-800">
//             Envie-nos uma mensagem
//           </h2>
//           <form className="w-full space-y-6 pt-5 mt-10">
//             <div className="w-full flex flex-col lg:flex-row gap-6">
//               <div className="w-full flex flex-col gap-2">
//                 <Label className="text-sm text-[#666666] font-medium">
//                   Primeiro Nome
//                 </Label>
//                 <Input
//                   type="text"
//                   className="w-full border rounded-md pl-4 h-12 placeholder:text-zinc-100 outline-none border-zinc-300 focus:border-primary-blue focus-visible:ring-0 placeholder:text-sm"
//                   placeholder="Seu Nome"
//                   value={message.name}
//                   ref={(el) => {
//                     refs.current.name = el;
//                   }}
//                   onChange={(event) => {
//                     setMessage((prevState) => ({
//                       ...prevState,
//                       name: event.target.value,
//                     }));
//                   }}
//                 />
//               </div>
//               <div className="w-full flex flex-col gap-2">
//                 <Label className="text-sm text-[#666666]">Último Nome</Label>
//                 <Input
//                   type="text"
//                   className="w-full border rounded-md pl-4 h-12 placeholder:text-zinc-100 outline-none border-zinc-300 focus:border-primary-blue focus-visible:ring-0"
//                   placeholder="Seu último Nome"
//                   value={message.surname}
//                   ref={(el) => {
//                     refs.current.surname = el;
//                   }}
//                   onChange={(event) => {
//                     setMessage((prevState) => ({
//                       ...prevState,
//                       surname: event.target.value,
//                     }));
//                   }}
//                 />
//               </div>
//             </div>
//             <div className="w-full flex flex-col lg:flex-row gap-6">
//               <div className="w-full flex flex-col gap-2">
//                 <Label className="text-sm text-[#666666]">Email</Label>
//                 <Input
//                   type="email"
//                   className="w-full border rounded-md pl-4 h-12 placeholder:text-zinc-100 outline-none border-zinc-300 focus:border-primary-blue focus-visible:ring-0"
//                   placeholder="Seu Email"
//                   value={message.mail}
//                   ref={(el) => {
//                     refs.current.mail = el;
//                   }}
//                   onChange={(event) => {
//                     setMessage((prevState) => ({
//                       ...prevState,
//                       mail: event.target.value,
//                     }));
//                   }}
//                 />
//               </div>
//               <div className="w-full flex flex-col gap-2">
//                 <Label className="text-sm text-[#666666]">Telemóvel</Label>
//                 <Input
//                   type="number"
//                   className="w-full border rounded-md pl-4 h-12 placeholder:text-zinc-100 outline-none border-zinc-300 focus:border-primary-blue focus-visible:ring-0"
//                   placeholder="+239"
//                   value={message.phone}
//                   ref={(el) => {
//                     refs.current.phone = el;
//                   }}
//                   onChange={(event) => {
//                     setMessage((prevState) => ({
//                       ...prevState,
//                       phone: event.target.value,
//                     }));
//                   }}
//                 />
//               </div>
//             </div>
//             <div className="w-full flex flex-col gap-2">
//               <label className="text-sm text-[#666666]">Mensagem</label>
//               <textarea
//                 className="w-full placeholder:text-sm border resize-none rounded-md pl-4 pt-4 h-40 placeholder:text-zinc-100 outline-none border-zinc-300 focus:border-primary-blue focus-visible:ring-0"
//                 rows={4}
//                 placeholder="Escreva sua mensagem aqui..."
//                 value={message.message}
//                 ref={(el) => {
//                   refs.current.message = el;
//                 }}
//                 onChange={(event) => {
//                   setMessage((prevState) => ({
//                     ...prevState,
//                     message: event.target.value,
//                   }));
//                 }}
//               />
//             </div>
//             <Button
//               className="bg-primary-blue hover:bg-primary-blue/95 text-white rounded-md px-8 py-6 cursor-pointer"
//               onClick={(e) => {
//                 e.preventDefault();
//                 let valid = true;
//                 Object.keys(message)
//                   .reverse()
//                   .forEach((key) => {
//                     if (!message[key as never]) {
//                       valid = false;
//                       if (refs.current[key]) {
//                         refs.current[key].focus();
//                       }
//                     }
//                   });

//                 if (valid) {
//                   send(message);
//                 }
//               }}
//             >
//               Enviar Mensagem
//             </Button>
//           </form>
//         </div>
//         <div className="w-auto">
//           <Card className="h-full border-none">
//             <div className="relative w-full">
//               <Image
//                 width={1000}
//                 height={1000}
//                 unoptimized
//                 src={
//                   urlPhotoContact
//                     ? imageURLServer + "" + urlPhotoContact
//                     : "/images/contacts/ministerio.jpg"
//                 }
//                 alt="Ministério"
//                 className="w-full h-[160px] object-cover rounded-t-lg"
//               />
//             </div>
//             <CardContent className="space-y-6 pt-4">
//               <div className="space-y-4">
//                 <div className="flex items-start justify-center gap-1">
//                   <MapPin className="h-8 w-8 text-primary-blue" />
//                   <p className="text-sm text-zinc-600">
//                     Largo das Alfândegas, Água Grande, São Tomé, Caixa Postal nº
//                     168, São Tomé e Príncipe
//                   </p>
//                 </div>

//                 <div className="flex items-start gap-1">
//                   <Phone className="h-5 w-5 text-primary-blue" />
//                   <p className="text-sm text-zinc-600">
//                     +239 2224172 / +239 2221053
//                   </p>
//                 </div>

//                 <div className="flex items-start gap-1">
//                   <Mail className="h-5 w-5 text-primary-blue" />
//                   <Link
//                     href="mailto:mfcea@financas.gov.st"
//                     className="text-sm text-zinc-600 hover:text-primary-blue hover:underline"
//                   >
//                     mfcea@financas.gov.st
//                   </Link>
//                 </div>

//                 <div className="flex items-start gap-1">
//                   <Globe className="h-5 w-5 text-primary-blue" />
//                   <Link
//                     href="https://financas.gov.st"
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="text-sm text-zinc-600 hover:text-primary-blue hover:underline"
//                   >
//                     financas.gov.st
//                   </Link>
//                 </div>
//                 <div className="flex items-start gap-1">
//                   <Clock className="h-5 w-5 text-primary-blue" />
//                   <p className="text-sm text-zinc-600">
//                     Segunda à Sexta: 7:30 - 15:30
//                   </p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//       <ContactMap />
//     </section>
//   );
// }

"use client";
import Image from "next/image";
import ContactMap from "../map";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useServicos } from "@/components/contexts/servicos";
import { imageURLServer } from "@/lib/utils";
import { useHookMessage } from "@/components/hooks/message";
import { useRef, useState } from "react";
import { Message } from "postcss";
import { Button } from "@/components/ui/button";
import { Clock, Globe, Mail, MapPin, Phone, Loader2, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function ContactMainSection() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ministerio, contato } = useServicos();
  const urlPhotoContact = (
    contato.photos?.[0]?.formats?.medium ||
    contato.photos?.[0] ||
    {}
  ).url;
  const { send, message, setMessage } = useHookMessage();
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const refs = useRef<
    Record<keyof Message, HTMLInputElement | HTMLTextAreaElement | null>
  >({} as Record<keyof Message, HTMLInputElement | HTMLTextAreaElement>);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Reset error classes
    Object.values(refs.current).forEach((ref) => {
      ref?.classList.remove("border-red-500");
    });

    let valid = true;
    Object.keys(message).forEach((key) => {
      if (!message[key as never]) {
        valid = false;
        if (refs.current[key]) {
          refs.current[key]?.focus();
          refs.current[key]?.classList.add("border-red-500");
        }
      }
    });

    if (valid) {
      try {
        await send(message);
        setIsSent(true);
        // Reset form after successful send
        setTimeout(() => {
          setMessage({
            name: "",
            surname: "",
            mail: "",
            phone: "",
            message: "",
          });
          setIsSent(false);
        }, 3000);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full flex flex-col gap-20 py-20 md:py-28">
      <div className="w-full container px-4 max-w-[88rem] flex flex-col lg:flex-row gap-12 lg:gap-8 mx-auto">
        <div className="w-full lg:w-2/3">
          <h6 className="text-md text-primary-blue font-semibold">
            Contacte-nos
          </h6>
          <h2 className="text-2xl md:text-3xl font-semibold my-3 text-zinc-800">
            Envie-nos uma mensagem
          </h2>

          <form className="w-full space-y-6 pt-5 mt-6" onSubmit={handleSubmit}>
            <div className="w-full flex flex-col md:flex-row gap-6">
              <div className="w-full flex flex-col gap-2">
                <Label className="text-sm text-zinc-600 font-medium">
                  Primeiro Nome <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  className="w-full border rounded-md pl-4 h-12 placeholder:text-zinc-400 outline-none border-zinc-300 focus:border-primary-blue focus-visible:ring-0 placeholder:text-sm"
                  placeholder="Seu Nome"
                  value={message.name || ""}
                  ref={(el) => {
                    refs.current.name = el;
                  }}
                  onChange={(event) => {
                    setMessage((prevState) => ({
                      ...prevState,
                      name: event.target.value,
                    }));
                  }}
                  required
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Label className="text-sm text-zinc-600 font-medium">
                  Último Nome <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  className="w-full border rounded-md pl-4 h-12 placeholder:text-zinc-400 outline-none border-zinc-300 focus:border-primary-blue focus-visible:ring-0 placeholder:text-sm"
                  placeholder="Seu último Nome"
                  value={message.surname || ""}
                  ref={(el) => {
                    refs.current.surname = el;
                  }}
                  onChange={(event) => {
                    setMessage((prevState) => ({
                      ...prevState,
                      surname: event.target.value,
                    }));
                  }}
                  required
                />
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row gap-6">
              <div className="w-full flex flex-col gap-2">
                <Label className="text-sm text-zinc-600 font-medium">
                  Email <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="email"
                  className="w-full border rounded-md pl-4 h-12 placeholder:text-zinc-400 outline-none border-zinc-300 focus:border-primary-blue focus-visible:ring-0 placeholder:text-sm"
                  placeholder="Seu Email"
                  value={message.mail || ""}
                  ref={(el) => {
                    refs.current.mail = el;
                  }}
                  onChange={(event) => {
                    setMessage((prevState) => ({
                      ...prevState,
                      mail: event.target.value,
                    }));
                  }}
                  required
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Label className="text-sm text-zinc-600 font-medium">
                  Telemóvel
                </Label>
                <Input
                  type="tel"
                  className="w-full border rounded-md pl-4 h-12 placeholder:text-zinc-400 outline-none border-zinc-300 focus:border-primary-blue focus-visible:ring-0 placeholder:text-sm"
                  placeholder="+239 999 9999"
                  value={message.phone || ""}
                  ref={(el) => {
                    refs.current.phone = el;
                  }}
                  onChange={(event) => {
                    const value = event.target.value.replace(/\D/g, "");
                    const formattedValue =
                      value.length > 0
                        ? `+239 ${value.slice(0, 3)} ${value.slice(3, 7)}`
                        : "";

                    setMessage((prevState) => ({
                      ...prevState,
                      phone: formattedValue,
                    }));
                  }}
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <Label className="text-sm text-zinc-600 font-medium">
                Mensagem <span className="text-red-500">*</span>
              </Label>
              <textarea
                className="w-full placeholder:text-sm border resize-y rounded-md pl-4 pt-4 h-40 placeholder:text-zinc-400 outline-none border-zinc-300 focus:border-primary-blue focus-visible:ring-0"
                rows={4}
                placeholder="Escreva sua mensagem aqui... "
                value={message.message || ""}
                ref={(el) => {
                  refs.current.message = el;
                }}
                onChange={(event) => {
                  setMessage((prevState) => ({
                    ...prevState,
                    message: event.target.value,
                  }));
                }}
                required
              />
            </div>
            <Button
              type="submit"
              className="bg-primary-blue hover:bg-primary-blue/90 text-white rounded-md px-6 py-6 cursor-pointer disabled:opacity-70 transition-colors duration-200"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Enviando...
                </span>
              ) : isSent ? (
                "✓ Mensagem Enviada!"
              ) : (
                <span className="flex items-center gap-2">
                  <Send className="h-4 w-4" />
                  Enviar Mensagem
                </span>
              )}
            </Button>
          </form>
        </div>

        <div className="w-full lg:w-1/3">
          <Card className="h-full border-none shadow-sm">
            <div className="relative w-full">
              <Image
                width={500}
                height={300}
                unoptimized
                src={
                  urlPhotoContact
                    ? imageURLServer + "" + urlPhotoContact
                    : "/images/contacts/ministerio.jpg"
                }
                alt="Ministério"
                className="w-full h-[180px] object-cover rounded-t-lg"
                priority
              />
            </div>
            <CardContent className="space-y-6 pt-6 px-6 pb-8">
              <h3 className="text-lg font-semibold text-zinc-800">
                Informações de Contato
              </h3>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="bg-blue-100 rounded-full flex-shrink-0 p-2">
                    <MapPin
                      className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-sm text-zinc-600">
                    Largo das Alfândegas, Água Grande, São Tomé, Caixa Postal nº
                    168, São Tomé e Príncipe
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 rounded-full flex-shrink-0 p-2">
                    <Phone
                      className="h-4 w-4 text-blue-600 flex-shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                  <span className="text-sm text-zinc-600 hover:text-primary-blue hover:underline">
                    +239 2224172 / +239 2221053
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 rounded-full flex-shrink-0 p-2">
                    <Mail
                      className="h-4 w-4 text-blue-600 flex-shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                  <Link
                    href="mailto:mfcea@financas.gov.st"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    mfcea@financas.gov.st
                  </Link>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 rounded-full flex-shrink-0 p-2">
                    <Globe
                      className="h-4 w-4 text-blue-600 flex-shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                  <Link
                    href="https://financas.gov.st"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    financas.gov.st
                  </Link>
                </div>

                <div className="flex items-center gap-3">
                  <div className="bg-blue-100 rounded-full flex-shrink-0 p-2">
                    <Clock
                      className="h-4 w-4 text-blue-600 flex-shrink-0"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-sm text-zinc-600">
                    Segunda à Sexta: 7:30 - 15:30
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="w-full">
        <ContactMap />
      </div>
    </section>
  );
}
