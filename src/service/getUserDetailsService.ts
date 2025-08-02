import Config from "@/config/config";
import { ApiUserDetails } from "@/types/types";

const { me } = Config;

const getUserDetails = async (
    token: string | null,
): Promise<ApiUserDetails> => {
    const request = new Request(me, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });
    const response = await fetch(request);
    if (!response.ok) {
        throw new Error("Failed to fetch user details");
    }
    const userData = await response.json();

    if (!userData.id || !userData.username) {
        throw new Error("Invalid user data received from server");
    }

    return userData;
};

export default getUserDetails;
