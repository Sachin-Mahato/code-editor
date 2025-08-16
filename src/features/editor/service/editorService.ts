import Config from "@/core/config/config";

export default async function editorService(
    token: string,
    id: string,
    sourceCode: string,
) {
    const request = new Request(Config.getUpdateFileUrl(id), {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id: id, sourceCode: sourceCode }),
    });

    const response = await fetch(request);

    if (!response.ok) {
        throw new Error("failed to send editor files data");
    }

    return await response.json();
}
