import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Link, useNavigate } from "react-router"
import React, { useState } from "react"
import { Loader2 } from "lucide-react"

export default function SignupForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [pending, setPending] = useState({
        isNameValid: false,
        isEmailValid: false,
    });
    const [isSubmit, setIsSubmit] = useState(false);
    const url = "http://localhost:8080/register";
    const navigation = useNavigate()

    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        const nameReg = /^[A-Za-z][A-Za-z\s]*$/;
        setUsername(e.target.value)
        if (nameReg.test(val)) {
            setPending(prev => ({ ...prev, isNameValid: nameReg.test(val) }))
        }
    }
    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        const emailReg = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        setEmail(e.target.value)

        if (emailReg.test(value)) {
            setPending(prev => ({ ...prev, isEmailValid: emailReg.test(value) }))
        }
    }

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault()
        const { isNameValid, isEmailValid } = pending;

        if (isEmailValid && isNameValid) {
            setIsSubmit(true)
        }

        try {
            const data = {
                username: username,
                email: email,
                password: password
            }
            const response = await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            if (!response.ok) {
                console.log("Failed to send user sign up details " + response.status + response.statusText)
                setIsSubmit(false)
                return;
            }
            navigation("/login")
        } catch (error) {
            setIsSubmit(false)
            console.error("Failed to sign up " + error);

        }
    }
    return (
        <form
            onSubmit={handleSubmit}
            className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                        Enter your details below to create your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <section>
                        <div className="flex flex-col gap-6">
                            <p className="grid gap-3">
                                <Label htmlFor="username">Name</Label>
                                <Input id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Your name"
                                    value={username}
                                    onChange={handleUsername}
                                    required />
                                {
                                    !pending.isNameValid && username.length > 0 && (
                                        <p className="text-red-600 text-sm">Name can’t be blank.</p>
                                    )}
                            </p>
                            <p className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleEmail}
                                    placeholder="m@example.com"
                                    required
                                />
                                {!pending.isEmailValid && email.length > 0 && (
                                    <p className="text-red-600 text-sm">Please enter a valid email address.</p>
                                )}


                            </p>
                            <p className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={handlePassword}
                                    value={password}
                                    required />
                            </p>
                            <p className="flex flex-col gap-3">
                                <Button
                                    type="submit"
                                    className={`w-full ${isSubmit ? "cursor-pointer" : ""}`}
                                    disabled={isSubmit}
                                >
                                    {
                                        isSubmit ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                                                Please Wait...
                                            </>
                                        ) : "Sign Up"
                                    }
                                </Button>
                                <Button variant="outline" className="w-full">
                                    Sign up with Google
                                </Button>
                            </p>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link to={"/login"} className="underline underline-offset-4">
                                Login
                            </Link>
                        </div>
                    </section>
                </CardContent>
            </Card>
        </form>
    )
}
