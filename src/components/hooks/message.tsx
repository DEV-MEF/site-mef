"use client"
import {AxiosHttpClient} from "@/settings/axios";
import {useState} from "react";

type Message = {
    name: string
    surname: string
    mail: string
    phone: string
    message: string
}

const messageInit = {
    name: "",
    surname: "",
    mail: "",
    phone: "",
    message: "",
}

export const useHookMessage = () => {
    const [message, setMessage] = useState<Message>(messageInit);
    const send = (message: Message) => {
        AxiosHttpClient.post("/mail-messages", {data: message})
            .then(({data: {data}}) => {
                if(data) {
                    setMessage({...messageInit});
                }
            })
    }

    return {
        send,
        message,
        setMessage
    }
}
