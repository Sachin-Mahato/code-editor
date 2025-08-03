import Config from "@/config/config";

interface ApiFile {
    id: string;
    fileName: string;
    language: string;
    sourceCode: string;
}

type ApiFileResp = Record<string, ApiFile>;

export default async function filesService(
    token: string,
): Promise<ApiFileResp> {
    const request = new Request(Config.files, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    const response = await fetch(request);

    if (!response.ok) {
        throw new Error("failed to fetch files " + response.status);
    }
    return await response.json();
}
