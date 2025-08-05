import { Button } from "@/components/ui/button"
import { Lock } from "lucide-react"
import { Link } from "react-router"

interface Benefit {
    icon: React.ReactNode
    title: string
    description: string
}

interface AuthCTASectionProps {
    isAuthenticated: boolean
    benefits: Benefit[]
}

export default function AuthCTASection({ isAuthenticated, benefits }: AuthCTASectionProps) {
    return (
        <section
            data-testid="authCTASection"
            className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="container mx-auto text-center">
                <Lock className="h-16 w-16 mx-auto mb-6 opacity-90" />
                <h2 className="text-4xl font-bold mb-4">Save Your Work, Keep Your Progress</h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                    Create an account to save your projects, access them from anywhere, and unlock premium features like
                    collaboration and advanced themes.
                </p>
                <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                    {benefits.map((benefit, index) => (
                        <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                            <div className="flex items-center justify-center w-10 h-10 bg-white/20 rounded-lg mb-4 mx-auto">
                                {benefit.icon}
                            </div>
                            <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                            <p className="text-sm opacity-90">{benefit.description}</p>
                        </div>
                    ))}
                </div>
                {!isAuthenticated && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Button size="lg" variant="secondary" data-testid="create-free-account" asChild>
                            <Link to="/signup">
                                Create Free Account
                            </Link>
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                            asChild
                            data-test-id="login"
                        >
                            <Link to="/login">
                                Sign In
                            </Link>
                        </Button>
                    </div>
                )}
            </div>
        </section>
    )
}