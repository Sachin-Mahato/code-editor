import { Button } from "@/components/ui/button"
import { Code2 } from "lucide-react"
import { Link } from "react-router"

interface HeaderProps {
    token: string | null
    username?: string | null
    logout: () => void
}

export default function Header({ token, username, logout }: HeaderProps) {
    return (
        <header
            aria-label="header"
            className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                    <Code2 className="h-8 w-8 text-blue-600" />
                    <span className="text-xl font-bold text-gray-900">CodeEditor</span>
                </div>
                <nav className="hidden md:flex items-center space-x-6">
                    <Link to="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                        Features
                    </Link>
                    <Link to="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                        Pricing
                    </Link>
                    <Link to="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                        About
                    </Link>
                </nav>
                <div className="flex items-center space-x-3">
                    {token ? (
                        <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-600">Welcome, {username}</span>
                            <Button
                                variant="outline"
                                className="cursor-pointer"
                                onClick={logout}
                                data-testid="logout"
                            >
                                Logout
                            </Button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2">
                            <Button variant="ghost">
                                <Link
                                    to="/login"
                                    data-testid="login">
                                    Login
                                </Link>
                            </Button>
                            <Button >
                                <Link
                                    to="/signup"
                                    data-testid="signup"
                                >Sign Up</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}