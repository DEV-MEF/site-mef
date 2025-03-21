"use client";

import {useEffect, useState} from "react";
import {AxiosHttpClient} from "@/settings/axios";

interface TeamSection {
    title: string;
    members: string[];
}

export default function OurteamSection() {
    const [teamSections, setTeamSections] = useState<TeamSection[]>([]);

    useEffect(() => {
        AxiosHttpClient.get("/teams")
            .then((response) => {
                if (response?.data) {
                    setTeamSections(response.data[0].content);
                    console.log(response.data[0].content)
                }
            })
            .catch((error) => {
                console.error("Erro ao buscar dados da equipe:", error);
            });
    }, []);


    const renderData = (data: any[]) => {
        return data.map(item => {
            if (item.type === 'paragraph') {
                return `<p class="text-md text-light mb-6" >${item.children.map(child => {
                    if (child.bold) {
                        return `<b>${child.text}</b>`;
                    }
                    return child.text;
                }).join('')}</p>`;
            }

            if (item.type === 'list') {
                const listItems = item.children.map(listItem => {
                    return `<li class="font-light text-justify mb-4 text-sm pl-5">${listItem.children.map(child => child.text).join('')}</li>`;
                }).join('');
                return `<ul class="font-light text-justify mb-4 text-sm pl-5">${listItems}</ul>`;
            }

            return '';
        }).join('');
    };


    return (
        <section className="w-full">
            <div dangerouslySetInnerHTML={{ __html: renderData(teamSections) }} />
        </section>

    );

}
