import React from 'react';
import Ministerio from '@/assets/ministerio.jpg';
import Image from 'next/image';

const ContactUs = () => {
  return (
    <div className="container mx-auto">
      {/* Mapa */}
      <div className="mb-10 rounded-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2349.588051853534!2d6.736514240191031!3d0.345920935954208!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x10766a6fbef2d5f7%3A0x7ebb49dc3a9f0b5c!2sMinist%C3%A9rio%20das%20Finan%C3%A7as%20e%20do%20Plano!5e0!3m2!1spt-PT!2sst!4v1732276734662!5m2!1spt-PT!2sst"
          width="100%"
          height="312"
          style={{ border: 0 }}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      {/* Formulário e informações */}
      <div className="grid grid-cols-3 gap-6 pt-10">
        {/* Formulário */}
        <div className="col-span-2">
          <p className='text-sm'>Contacte-nos</p>
          <h2 className="text-2xl font-semibold my-3">Envie-nos uma mensagem</h2>
          <form className="space-y-6 pt-5">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-2">Primeiro Nome</label>
                <input
                  type="text"
                  className="w-full border border-[#D9D7D7] rounded-lg p-2"
                  placeholder="Your"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Último Nome</label>
                <input
                  type="text"
                  className="w-full border border-[#D9D7D7] rounded-lg p-2"
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm mb-2">Email</label>
                <input
                  type="email"
                  className="w-full border border-[#D9D7D7] rounded-lg p-2"
                  placeholder="Your Email"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Telemóvel</label>
                <input
                  type="tel"
                  className="w-full border border-[#D9D7D7] rounded-lg p-2"
                  placeholder="+880"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm mb-2">Mensagem</label>
              <textarea
                className="w-full border border-[#D9D7D7] rounded-lg p-2"
                rows="4"
                placeholder="Type Your Message Here..."
              ></textarea>
            </div>
            <button className="bg-primary-blue text-white rounded-lg px-6 py-2">
              Enviar Mensagem
            </button>
          </form>
        </div>

        {/* Informações */}
        <div className="bg-light-gray rounded-lg p-6 space-y-4">
          <Image
            src={Ministerio}
            alt="Ministério"
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
          <div className='space-y-4'>
            <p className="text-sm font-semibold">Ministério da Economia e Finanças</p>
            <p className="text-sm font-light mt-2">
              <strong className='font-semibold'>Endereço:</strong> Largo das Alfândegas, Água Grande, São Tomé, Caixa Postal nº
              168, São Tomé e Príncipe
            </p>
            <p className="text-sm font-light mt-2">
              <strong className='font-semibold'>Telefone:</strong> +239 2221083 / 2224172
            </p>
            <p className="text-sm font-light mt-2">
              <strong className='font-semibold'>Email:</strong> mfcea@financas.gov.st
            </p>
            <p className="text-sm font-light mt-2">
              <strong className='font-semibold'>Website:</strong> <a href="#">financas.gov.st</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
