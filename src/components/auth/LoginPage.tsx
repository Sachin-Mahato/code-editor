import { LoginForm } from "./LoginForm";

export default function LoginPage() {
    return (
        <div
            data-testid="loginPage"
            role="loginPage"
            className="flex justify-center items-center min-h-screen bg-muted px-4">
            <div className="w-full max-w-md">
                <LoginForm />
            </div>
        </div>
    )
}