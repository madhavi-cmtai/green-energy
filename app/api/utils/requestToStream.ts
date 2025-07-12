import { Readable } from "stream";

export function requestToStream(req: Request): Readable {
    const reader = req.body?.getReader();

    if (!reader) {
        throw new Error("Request body is empty or not readable");
    }

    return new Readable({
        async read() {
            const { done, value } = await reader.read();
            if (done) {
                this.push(null);
            } else {
                this.push(value);
            }
        },
    });
}
