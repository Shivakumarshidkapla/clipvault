import { api } from "../api/client";

export async function createPublicClipboard(
    content: string,
) {
    const response = await api.post(
        "/public/share",
        {
            content,
        },
    );

    return response.data;
}

export async function getPublicClipboard(
    code: string,
) {
    const response = await api.get(
        `/public/${code}`,
    );

    return response.data;
}