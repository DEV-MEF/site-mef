"use client";
import Image from "next/image";
import ContactMap from "../map";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useServicos } from "@/components/contexts/servicos";
import { imageURLServer } from "@/lib/utils";
import { useHookMessage } from "@/components/hooks/message";
import { useRef } from "react";
import { Message } from "postcss";
import { Button } from "@/components/ui/button";
import { Clock, Globe, Mail, MapPin, Phone } from "lucide-react";
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

  const refs = useRef<
    Record<keyof Message, HTMLInputElement | HTMLTextAreaElement | null>
  >({} as Record<keyof Message, HTMLInputElement | HTMLTextAreaElement>);

  return (
    <section className="w-full flex flex-col gap-28 py-32">
      <div className="w-full flex flex-col lg:flex-row gap-20 lg:gap-6">
        <div className="w-full">
          <h6 className="text-md text-primary-blue font-semibold">
            Contacte-nos
          </h6>
          <h2 className="text-xl font-semibold my-3 text-zinc-800">
            Envie-nos uma mensagem
          </h2>
          <form className="w-full space-y-6 pt-5 mt-10">
            <div className="w-full flex flex-col lg:flex-row gap-6">
              <div className="w-full flex flex-col gap-2">
                <Label className="text-sm text-[#666666] font-medium">
                  Primeiro Nome
                </Label>
                <Input
                  type="text"
                  className="w-full border rounded-md pl-4 h-12 placeholder:text-zinc-100 outline-none border-zinc-300 focus:border-primary-blue focus-visible:ring-0 placeholder:text-sm"
                  placeholder="Seu Nome"
                  value={message.name}
                  ref={(el) => {
                    refs.current.name = el;
                  }}
                  onChange={(event) => {
                    setMessage((prevState) => ({
                      ...prevState,
                      name: event.target.value,
                    }));
                  }}
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Label className="text-sm text-[#666666]">Último Nome</Label>
                <Input
                  type="text"
                  className="w-full border rounded-md pl-4 h-12 placeholder:text-zinc-100 outline-none border-zinc-300 focus:border-primary-blue focus-visible:ring-0"
                  placeholder="Seu último Nome"
                  value={message.surname}
                  ref={(el) => {
                    refs.current.surname = el;
                  }}
                  onChange={(event) => {
                    setMessage((prevState) => ({
                      ...prevState,
                      surname: event.target.value,
                    }));
                  }}
                />
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-6">
              <div className="w-full flex flex-col gap-2">
                <Label className="text-sm text-[#666666]">Email</Label>
                <Input
                  type="email"
                  className="w-full border rounded-md pl-4 h-12 placeholder:text-zinc-100 outline-none border-zinc-300 focus:border-primary-blue focus-visible:ring-0"
                  placeholder="Seu Email"
                  value={message.mail}
                  ref={(el) => {
                    refs.current.mail = el;
                  }}
                  onChange={(event) => {
                    setMessage((prevState) => ({
                      ...prevState,
                      mail: event.target.value,
                    }));
                  }}
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Label className="text-sm text-[#666666]">Telemóvel</Label>
                <Input
                  type="number"
                  className="w-full border rounded-md pl-4 h-12 placeholder:text-zinc-100 outline-none border-zinc-300 focus:border-primary-blue focus-visible:ring-0"
                  placeholder="+239"
                  value={message.phone}
                  ref={(el) => {
                    refs.current.phone = el;
                  }}
                  onChange={(event) => {
                    setMessage((prevState) => ({
                      ...prevState,
                      phone: event.target.value,
                    }));
                  }}
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="text-sm text-[#666666]">Mensagem</label>
              <textarea
                className="w-full placeholder:text-sm border resize-none rounded-md pl-4 pt-4 h-40 placeholder:text-zinc-100 outline-none border-zinc-300 focus:border-primary-blue focus-visible:ring-0"
                rows={4}
                placeholder="Escreva sua mensagem aqui..."
                value={message.message}
                ref={(el) => {
                  refs.current.message = el;
                }}
                onChange={(event) => {
                  setMessage((prevState) => ({
                    ...prevState,
                    message: event.target.value,
                  }));
                }}
              />
            </div>
            <Button
              className="bg-primary-blue hover:bg-primary-blue/95 text-white rounded-md px-8 py-6 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                let valid = true;
                Object.keys(message)
                  .reverse()
                  .forEach((key) => {
                    if (!message[key as never]) {
                      valid = false;
                      if (refs.current[key]) {
                        refs.current[key].focus();
                      }
                    }
                  });

                if (valid) {
                  send(message);
                }
              }}
            >
              Enviar Mensagem
            </Button>
          </form>
        </div>

        {/* <div className=" bg-light-gray rounded-lg p-6 space-y-4">
          <Image
            width={300}
            height={300}
            src={
              urlPhotoContact
                ? imageURLServer + "" + urlPhotoContact
                : "/images/contacts/ministerio.jpg"
            }
            alt="Ministério"
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <div className="space-y-4">
            <p className="text-sm font-semibold">{ministerio.name}</p>
            <p className="text-sm font-light mt-2">
              <strong className="font-semibold">Endereço:</strong>
              {contato.location}
            </p>
            <p className="text-sm font-light mt-2">
              <strong className="font-semibold">Telefone:</strong>
              {contato.tel} / {contato.phone}
            </p>
            <p className="text-sm font-light mt-2">
              <strong className="font-semibold">Email:</strong> {contato.mail}
            </p>
            <p className="text-sm font-light mt-2">
              <strong className="font-semibold">Website:</strong>{" "}
              <a href="#">{contato.webpage}</a>
            </p>
          </div>
        </div> */}

        {/* Informações de Contato - Componente Melhorado */}
        <div className="w-auto">
          <Card className="h-full border-none">
            <div className="relative w-full">
              <Image
                width={1000}
                height={1000}
                unoptimized
                src={
                  urlPhotoContact
                    ? imageURLServer + "" + urlPhotoContact
                    : "/images/contacts/ministerio.jpg"
                }
                alt="Ministério"
                className="w-full h-[160px] object-cover rounded-t-lg"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                <div className="p-4 text-white">
                  <h3 className="font-bold text-xl">
                    Ministério da Economia e Finanças
                  </h3>
                </div>
              </div> */}
            </div>
            <CardContent className="space-y-6 pt-4">
              <div className="space-y-4">
                <div className="flex items-start justify-center gap-1">
                  <MapPin className="h-8 w-8 text-primary-blue" />
                  <p className="text-sm text-zinc-600">
                    Largo das Alfândegas, Água Grande, São Tomé, Caixa Postal nº
                    168, São Tomé e Príncipe
                  </p>
                </div>

                <div className="flex items-start gap-1">
                  <Phone className="h-5 w-5 text-primary-blue" />
                  <p className="text-sm text-zinc-600">
                    +239 2224172 / +239 2221053
                  </p>
                </div>

                <div className="flex items-start gap-1">
                  <Mail className="h-5 w-5 text-primary-blue" />
                  <Link
                    href="mailto:mfcea@financas.gov.st"
                    className="text-sm text-zinc-600 hover:text-primary-blue hover:underline"
                  >
                    mfcea@financas.gov.st
                  </Link>
                </div>

                <div className="flex items-start gap-1">
                  <Globe className="h-5 w-5 text-primary-blue" />
                  <Link
                    href="https://financas.gov.st"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-zinc-600 hover:text-primary-blue hover:underline"
                  >
                    financas.gov.st
                  </Link>
                </div>
                <div className="flex items-start gap-1">
                  <Clock className="h-5 w-5 text-primary-blue" />
                  <p className="text-sm text-zinc-600">
                    Segunda à Sexta: 7:30 - 15:30
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <ContactMap />
    </section>
  );
}
