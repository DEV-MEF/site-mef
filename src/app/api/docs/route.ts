import {NextRequest} from "next/server";
import axios from "axios";

export async function GET(request: NextRequest) {
    const fileUrl =  new URL(request.url).searchParams.get("file")?.toString() || "";
    const fileName =  new URL(request.url).searchParams.get("name")?.toString() || "";
    console.log({fileUrl})
    const response = await axios.get(process.env.BASE_SERVER+fileUrl, {
        responseType: "stream",
    });

    const mimeTypes: Record<string, string> = {
        "pdf": "application/pdf",
        "png": "image/png",
        "jpg": "image/jpeg",
        "jpeg": "image/jpeg",
        "gif": "image/gif",
        "txt": "text/plain",
        "json": "application/json",
        "csv": "text/csv",
        "zip": "application/zip",
        "mp4": "video/mp4"
    };

    const ext = fileUrl.split('.').pop()?.toLowerCase() || "";
    const contentType = mimeTypes[ext] || "application/octet-stream";

    const stream = new ReadableStream({
        start(controller) {
            response.data.on("data", (chunk: never) => controller.enqueue(chunk));
            response.data.on("end", () => controller.close());
            response.data.on("error", (err: never) => controller.error(err));
        },
    });

    return new Response(stream, {
        headers: {
            "Content-Type": contentType,
            "Content-Disposition": `inline; filename="${fileName}.pdf"`,
        },
    });
}
