import { api } from "@/api/client";

export async function getSharedClipboard(
    shareCode: string,
) {
    const response = await api.get(
        `/clip/${shareCode}`,
    );

    return response.data;
}