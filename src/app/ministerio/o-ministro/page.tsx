import Banner from "@/components/pages/banner";
import MinistrySidebar from "@/components/pages/ministry/sidebar";
import MinisterSection from "@/components/pages/ministry/minister-section";
import "@/styles/react-markdown-rerender.css"

export default function Minister() {
    return (
        <main className="w-full">
            <div className="w-full mb-20">
                <Banner text_1="Ministério" text_2="Mensagem do Ministro" />
                <div className="w-full max-w-[88rem] container mx-auto px-4 py-20 flex flex-col lg:flex-row gap-12">
                    <MinisterSection />
                    <MinistrySidebar />
                </div>
            </div>
        </main>
    );
}
