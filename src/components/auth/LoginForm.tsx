import { Card, CardTitle, CardDescription, CardHeader, CardContent } from "../ui/card"
import { Label } from "../ui/label"
import { Input } from "../ui/input"
import { cn } from "@/lib/utils"
import { Button } from "../ui/button"
import { Link, useNavigate } from "react-router"
import { useState } from "react"
export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const url = "http://localhost:8080/sign-in";
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()

        const data = {
            email: email,
            password: password
        }
        try {
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            if (!response.ok) {
                console.log("Failed to send login details " + response.status + " " + response.statusText)
            }

            const { status } = response;
            const body = await response.json();
            console.log("backend response: ", body)
            if (status === 200) {
                navigate("/")
            }


        } catch (error) {

        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={cn("flex flex-col gap-6", className)}
            {...props}
        >
            <Card>
                <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-6">
                    <div className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="grid gap-3">
                        <div className="flex items-center">
                            <Label htmlFor="password">Password</Label>
                            <Link
                                to="#"
                                className="ml-auto text-sm underline hover:underline-offset-4"
                            >
                                Forgot?
                            </Link>
                        </div>
                        <Input
                            id="password"
                            name="password"
                            type="password" required
                            onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="flex flex-col gap-3">
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                        <Button type="button" variant="outline" className="w-full">
                            Login with Google
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to={"/signup"} className="underline underline-offset-4">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}
