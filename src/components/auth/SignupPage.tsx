import SignupForm from "@/components/auth/SignupForm";

export default function SignupPage() {
    return (
        <div
            data-testid="signupPage"
            role="region"
            aria-label="Sign Up Page"
            className="flex justify-center items-center min-h-screen bg-muted px-4">
            <div className="w-full max-w-md">
                <SignupForm />
            </div>
        </div>
    )
}
