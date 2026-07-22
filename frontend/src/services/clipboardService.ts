import { api } from "@/api/client";

export async function getClipboards() {

    const response = await api.get(
        "/clipboards",
    );

    return response.data;

}

export async function createClipboard(
    title: string,
    content: string,
) {

    const response = await api.post(
        "/clipboards",
        {
            title,
            content,
        },
    );

    return response.data;

}

export async function deleteClipboard(
    id: string,
) {

    await api.delete(
        `/clipboards/${id}`,
    );

}

export async function updateClipboard(
    id: string,
    title: string,
    content: string,
) {

    const response = await api.put(
        `/clipboards/${id}`,
        {
            title,
            content,
        },
    );

    return response.data;

}

export async function shareClipboard(
    clipboardId: string,
) {

    const response =
        await api.post(
            `/clipboards/${clipboardId}/share`
        );

    return response.data;

}