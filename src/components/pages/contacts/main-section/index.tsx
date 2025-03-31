"use client"
import Image from "next/image";
import ContactMap from "../map";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {useServicos} from "@/components/contexts/servicos";
import {imageURLServer} from "@/lib/utils";
import {useHookMessage} from "@/components/hooks/message";
import {useRef} from "react";
import {Message} from "postcss";
export default function MainSection() {
  const {ministerio, contato} = useServicos();
  const urlPhotoContact = (contato.photos?.[0]?.formats?.medium || contato.photos?.[0] || {}).url;
  const {send, message, setMessage} = useHookMessage();

  const refs = useRef<Record<keyof Message, HTMLInputElement | HTMLTextAreaElement | null>>(
      {} as Record<keyof Message, HTMLInputElement | HTMLTextAreaElement>
  );

  return (
    <section className="w-full flex flex-col gap-28 py-32">
      <div className="w-full flex flex-col lg:flex-row gap-20 lg:gap-6">
        <div className="w-full">
          <h6 className="text-sm text-primary-blue font-medium">
            Contacte-nos
          </h6>
          <h2 className="text-xl font-semibold my-3 text-zinc-800">
            Envie-nos uma mensagem
          </h2>
          <form className="w-full space-y-6 pt-5 ">
            <div className="w-full flex flex-col lg:flex-row gap-6">
              <div className="w-full flex flex-col gap-2">
                <Label className="block text-sm mb-2 text-zinc-700">
                  Primeiro Nome
                </Label>
                <Input
                  type="text"
                  className="w-full border border-[#D9D7D7] rounded-lg p-2"
                  placeholder="Seu Nome"
                  value={message.name}
                  ref={(el) => {
                      refs.current.name = el
                  }}
                  onChange={(event) => {
                    setMessage(prevState => ({...prevState, "name": event.target.value}))
                  }}
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Label className="block text-sm mb-2 text-zinc-700">
                  Último Nome
                </Label>
                <Input
                  type="text"
                  className="w-full border border-[#D9D7D7] rounded-lg p-2"
                  placeholder="Seu último Nome"
                  value={message.surname}
                  ref={(el) => {
                    refs.current.surname = el
                  }}
                  onChange={(event) => {
                    setMessage(prevState => ({...prevState, "surname": event.target.value}))
                  }}
                />
              </div>
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-6">
              <div className="w-full flex flex-col gap-2">
                <Label className="block text-sm text-zinc-700">Email</Label>
                <Input
                  type="email"
                  className="w-full border border-[#D9D7D7] rounded-lg p-2"
                  placeholder="Seu Email"
                  value={message.mail}
                  ref={(el) => {
                    refs.current.mail = el
                  }}
                  onChange={(event) => {
                    setMessage(prevState => ({...prevState, "mail": event.target.value}))
                  }}
                />
              </div>
              <div className="w-full flex flex-col gap-2">
                <Label className="block text-sm text-zinc-700">Telemóvel</Label>
                <Input
                  type="number"
                  className="w-full border border-[#D9D7D7] rounded-lg p-2"
                  placeholder="+239"
                  value={message.phone}
                  ref={(el) => {
                    refs.current.phone = el
                  }}
                  onChange={(event) => {
                    setMessage(prevState => ({...prevState, "phone": event.target.value}))
                  }}
                />
              </div>
            </div>
            <div className="w-full flex flex-col gap-2">
              <label className="block text-sm text-zinc-700">Mensagem</label>
              <textarea
                className="w-full border border-[#D9D7D7] rounded-lg p-2"
                rows={4}
                placeholder="Escreva sua mensagem aqui..."
                value={message.message}
                ref={(el) => {
                  refs.current.message = el
                }}
                onChange={(event) => {
                  setMessage(prevState => ({...prevState, "message": event.target.value}))
                }}
              />
            </div>
            <button className="bg-primary-blue text-white rounded-lg px-6 py-2"
                    onClick={(e) => {
                      e.preventDefault()
                      let valid = true;
                      Object.keys(message).reverse().forEach((key) => {
                        if(!message[key as never]){
                          valid = false;
                          if( refs.current[key] ){
                          refs.current[key].focus();
                          }
                        }
                      })

                      if (valid) {
                        send(message)
                      }
                    }}
            >
              Enviar Mensagem
            </button>
          </form>
        </div>

        <div className=" bg-light-gray rounded-lg p-6 space-y-4">
          <Image
            width={300}
            height={300}
            src={(urlPhotoContact) ? imageURLServer+""+urlPhotoContact :  "/images/contacts/ministerio.jpg"}
            alt="Ministério"
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <div className="space-y-4">
            <p className="text-sm font-semibold">
              {ministerio.name}
            </p>
            <p className="text-sm font-light mt-2">
              <strong className="font-semibold">Endereço:</strong>
              {contato.location}
            </p>
            <p className="text-sm font-light mt-2">
              <strong className="font-semibold">Telefone:</strong>
              {contato.tel} / {contato.phone}
            </p>
            <p className="text-sm font-light mt-2">
              <strong className="font-semibold">Email:</strong>{" "}
              {contato.mail}
            </p>
            <p className="text-sm font-light mt-2">
              <strong className="font-semibold">Website:</strong>{" "}
              <a href="#">{contato.webpage}</a>
            </p>
          </div>
        </div>
      </div>
      <ContactMap />
    </section>
  );
}
