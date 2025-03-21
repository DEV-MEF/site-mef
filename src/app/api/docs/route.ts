import {NextRequest} from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
    const pdfUrl =  new URL(request.url).searchParams.get("file")?.toString() || "";
    const response = await axios.get(process.env.BASE_SERVER+pdfUrl, {
        responseType: "stream",
    });

    const stream = new ReadableStream({
        start(controller) {
            response.data.on("data", (chunk: never) => controller.enqueue(chunk));
            response.data.on("end", () => controller.close());
            response.data.on("error", (err: never) => controller.error(err));
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": "application/pdf",
            "Content-Disposition": 'inline; filename="file.pdf"',
        },
    });
}
