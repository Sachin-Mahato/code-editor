import SignupForm from "./SignupForm";

export default function SignupPage() {
    return (
        <div data-testid="signupPage" className="flex justify-center items-center min-h-screen bg-muted px-4">
            <div className="w-full max-w-md">
                <SignupForm />
            </div>
        </div>
    )
}
