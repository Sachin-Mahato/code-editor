import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Code2, ArrowRight, Play, Lock } from "lucide-react"
import { Link } from "react-router"
import useAuth from "@/hooks/useAuth"
import { useFeatures } from "@/hooks/useFeatures"
import useStorage from "@/hooks/useStorage"
import useUserDetails from "@/hooks/useUserDetails"

export default function LandingPage() {
    const [showTryModal, setShowTryModal] = useState(false)
    const { isAuthenticated, setIsAuthenticated } = useAuth()
    const { features, benefits } = useFeatures()
    const { token } = useStorage()
    const { userDetails } = useUserDetails(token, setIsAuthenticated)
    const username: string | undefined = userDetails?.username

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
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
                                <Button variant="outline" className="cursor-pointer">
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Button variant="ghost" >
                                    <Link to="/login">
                                        Login
                                    </Link>
                                </Button>
                                <Button ><Link to="/signup">Sign Up</Link></Button>
                            </div>
                        )}
                    </div>
                </div>
            </header>

            {/* Hero Section */}
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
                            <Button size="lg" className="text-lg px-8 py-3">
                                Open Editor <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>
                        ) : (
                            <>
                                <Button size="lg" className="text-lg px-8 py-3 cursor-pointer" >
                                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="text-lg px-8 py-3 bg-transparent cursor-pointer"
                                    onClick={() => setShowTryModal(true)}
                                >
                                    <Play className="mr-2 h-5 w-5" />
                                    Try Without Login
                                </Button>
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

            {/* Features Section */}
            <section id="features" className="py-20 px-4 bg-white">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 mb-4">Everything You Need to Code</h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Powerful features designed to make web development faster and more enjoyable
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="mx-auto w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 mb-4">
                                        {feature.icon}
                                    </div>
                                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <CardDescription className="text-gray-600">{feature.description}</CardDescription>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Authentication CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
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
                            <Button size="lg" variant="secondary" >
                                <Link to="/signup">

                                    Create Free Account
                                </Link>
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                            >
                                <Link to="/login">
                                    Sign In
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-900 text-white py-12 px-4">
                <div className="container mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="flex items-center space-x-2 mb-4 md:mb-0">
                            <Code2 className="h-6 w-6" />
                            <span className="text-lg font-semibold">CodeEditor</span>
                        </div>

                        <div className="flex space-x-6 text-sm text-gray-400">
                            <Link to="#" className="hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                            <Link to="#" className="hover:text-white transition-colors">
                                Terms of Service
                            </Link>
                            <Link to="#" className="hover:text-white transition-colors">
                                Contact
                            </Link>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400 text-sm">
                        © 2025 CodeEditor. All rights reserved.
                    </div>
                </div>
            </footer>

            {/* Try Without Login Modal */}
            <Dialog open={showTryModal} onOpenChange={setShowTryModal}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Lock className="h-5 w-5 text-blue-600" />
                            Storage Requires Account
                        </DialogTitle>
                        <DialogDescription className="text-left space-y-3">
                            <p>You can try the code editor without logging in, but your work won't be saved.</p>
                            <p className="font-medium text-gray-900">
                                To save your projects and access them later, please create a free account.
                            </p>
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-3 mt-4">
                        <Button className="w-full">
                            <Link to="/signup">

                                Create Free Account
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => {
                                setShowTryModal(false)
                                // Here you would redirect to the editor
                                console.log("Redirecting to editor without login...")
                            }}
                            className="w-full"
                        >
                            Continue Without Saving
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}


