export const loginUser = async (
    url: string,
    email: string,
    password: string,
): Promise<string> => {
    const request = new Request(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const response = await fetch(request);

    if (!response.ok) {
        throw new Error(
            `Login failed: ${response.status} ${response.statusText}`,
        );
    }

    const { status } = response;
    const { accessToken, refreshToken } = await response.json();

    if (status !== 200 || !refreshToken || !accessToken) {
        throw new Error("Unexpected response or missing token");
    }

    return refreshToken;
};

export const registerUser = async (
    url: string,
    username: string,
    email: string,
    password: string,
): Promise<void> => {
    const request = new Request(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
    });

    const response = await fetch(request);

    if (!response.ok) {
        throw new Error(
            `Signup failed: ${response.status} ${response.statusText}`,
        );
    }
};
