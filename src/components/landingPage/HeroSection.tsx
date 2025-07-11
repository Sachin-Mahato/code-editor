import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowRight, Play } from "lucide-react"
import { Link } from "react-router"

interface HeroSectionProps {
    isAuthenticated: boolean
    setShowTryModal: (open: boolean) => void
}

export default function HeroSection({ isAuthenticated, setShowTryModal }: HeroSectionProps) {
    return (
        <section className="py-20 px-4">
            <div className="container mx-auto text-center max-w-4xl">
                <Badge variant="secondary" className="mb-4">
                    🚀 Now supporting HTML & CSS
                </Badge>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                    Code in the Browser,
                    <span className="text-blue-600"> Create Anywhere</span>
                </h1>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                    A powerful web-based code editor with syntax highlighting, smart autocomplete, and live preview. Start
                    coding instantly without any setup.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                    {isAuthenticated ? (
                        <Link to={"/code"}>
                            <Button size="lg" className="text-lg px-8 py-3 cursor-pointer">
                                Open Editor <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        </Link>
                    ) : (
                        <>
                            <Link to="/signup" data-testid="get-started">
                                <Button size="lg" className="text-lg px-8 py-3 cursor-pointer" >
                                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link to="" data-testid="demo">
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="text-lg px-8 py-3 bg-transparent cursor-pointer"
                                    onClick={() => setShowTryModal(true)}
                                >
                                    <Play className="mr-2 h-5 w-5" />
                                    Try Without Login
                                </Button>
                            </Link>
                        </>
                    )}
                </div>
                {/* Live Preview Demo */}
                <div className="bg-white rounded-lg shadow-2xl p-6 max-w-3xl mx-auto">
                    <div className="flex items-center space-x-2 mb-4">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-500 ml-4">index.html</span>
                    </div>
                    <div className="bg-gray-900 rounded p-4 text-left">
                        <code className="text-green-400 text-sm">
                            {'<div class="hero">'}
                            <br />
                            {"  <h1>Hello World!</h1>"}
                            <br />
                            {"  <p>Welcome to CodeEditor</p>"}
                            <br />
                            {"</div>"}
                        </code>
                    </div>
                </div>
            </div>
        </section>
    )
}