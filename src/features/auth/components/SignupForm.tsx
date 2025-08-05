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
import { Link } from "react-router"
import React, { useState } from "react"
import { Loader2 } from "lucide-react"
import useSignup from "@/features/auth/hooks/useSignup"

export default function SignupForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { handleSubmit, validationErrors, isLoading, validateEmail, validateName } = useSignup()

    const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (validateName(value)) {
            setUsername(value);
        }
    };

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (validateEmail(value)) {

            setEmail(value);
        }
    };

    const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setPassword(value);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        handleSubmit(e, username, email, password);
    };

    return (
        <form
            onSubmit={onSubmit}
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
                            <div className="grid gap-3">
                                <Label htmlFor="username">Name</Label>
                                <Input
                                    id="username"
                                    name="username"
                                    type="text"
                                    placeholder="Your name"
                                    value={username}
                                    onChange={handleUsername}
                                    required
                                />
                                {validationErrors.name && username.length > 0 && (
                                    <span className="text-red-600 text-sm">Name can't be blank or contain numbers or special characters.</span>
                                )}
                            </div>
                            <div className="grid gap-3">
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
                                {validationErrors.email && email.length > 0 && (
                                    <p className="text-red-600 text-sm">Please enter a valid email address.</p>
                                )}
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    onChange={handlePassword}
                                    value={password}
                                    required
                                />
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button
                                    type="submit"
                                    className="w-full"
                                    disabled={isLoading || validationErrors.name || validationErrors.email}
                                >
                                    {isLoading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Please Wait...
                                        </>
                                    ) : "Sign Up"}
                                </Button>
                                <Button type="button" variant="outline" className="w-full">
                                    Sign up with Google
                                </Button>
                            </div>
                        </div>
                        <div className="mt-4 text-center text-sm">
                            Already have an account?{" "}
                            <Link to="/login" className="underline underline-offset-4">
                                Login
                            </Link>
                        </div>
                    </section>
                </CardContent>
            </Card>
        </form>
    )
}