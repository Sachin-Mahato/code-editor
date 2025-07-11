import { Card, CardTitle, CardDescription, CardHeader, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Link } from "react-router"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import useLogin from "@/hooks/useLogin"

export function LoginForm({
    className,
    ...props
}: React.ComponentProps<"form">) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { handleSubmit, setPending, validateEmail, isSubmit, pending } = useLogin();

    const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEmail(value);
        setPending(validateEmail(value));
    };

    return (
        <form
            onSubmit={(e) => handleSubmit(e, email, password)}
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
                    <p className="grid gap-3">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            onChange={handleEmail}
                        />
                        {!pending && email.length > 0 && (
                            <span className="text-red-600 text-sm">Please enter a valid email address.</span>
                        )}
                    </p>
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
                        <Button type="submit"
                            className="w-full cursor-pointer"
                            disabled={isSubmit}
                        >
                            {
                                isSubmit ? (<>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                                    Please Wait...

                                </>) : "Login"
                            }

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
