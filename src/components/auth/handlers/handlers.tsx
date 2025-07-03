export async function sendUserHandler(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, url: string, name: string, password: string, naviagation: any): Promise<void> {
    const data = {
        username: name,
        password: password
    }
    e.preventDefault()
    try {
        const responsee = await fetch(url, {
            method: "POST",
            headers: {

                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        })

        if (!responsee.ok) {
            console.log("failed to send login details " + data)
            return;
        }
        naviagation("/")

    } catch (error) {

    }
}