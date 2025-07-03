


import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Code2, Zap, Eye, Palette, Save, Users, Star, ArrowRight, Play, Lock } from "lucide-react"

// // Mock authentication state - replace with your actual auth logic
// const useAuth = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [user, setUser] = useState<{ name: string; email: string } | null>(null)

//   const login = () => {
//     setIsAuthenticated(true)
//     setUser({ name: "John Doe", email: "john@example.com" })
//   }

//   const logout = () => {
//     setIsAuthenticated(false)
//     setUser(null)
//   }

//   return { isAuthenticated, user, login, logout }
// }

export default function LandingPage() {
    const { isAuthenticated, user, login, logout } = useAuth()
    const [showTryModal, setShowTryModal] = useState(false)

    const features = [
        {
            icon: <Code2 className="h-6 w-6" />,
            title: "Syntax Highlighting",
            description: "Beautiful syntax highlighting for HTML and CSS with theme support",
        },
        {
            icon: <Zap className="h-6 w-6" />,
            title: "Smart Autocomplete",
            description: "Intelligent code completion that speeds up your development workflow",
        },
        {
            icon: <Eye className="h-6 w-6" />,
            title: "Live Preview",
            description: "See your changes instantly with real-time preview functionality",
        },
        {
            icon: <Palette className="h-6 w-6" />,
            title: "Multi-Language Support",
            description: "Currently supporting HTML and CSS with more languages coming soon",
        },
    ]

    const benefits = [
        {
            icon: <Save className="h-5 w-5" />,
            title: "Cloud Storage",
            description: "Save your projects securely in the cloud and access them anywhere",
        },
        {
            icon: <Users className="h-5 w-5" />,
            title: "Collaboration",
            description: "Share your projects with team members and collaborate in real-time",
        },
        {
            icon: <Star className="h-5 w-5" />,
            title: "Premium Features",
            description: "Access advanced features like custom themes and export options",
        },
    ]

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
                        <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Features
                        </a>
                        <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
                            Pricing
                        </a>
                        <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
                            About
                        </a>
                    </nav>

                    <div className="flex items-center space-x-3">
                        {isAuthenticated ? (
                            <div className="flex items-center space-x-3">
                                <span className="text-sm text-gray-600">Welcome, {user?.name}</span>
                                <Button variant="outline" onClick={logout}>
                                    Logout
                                </Button>
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Button variant="ghost" onClick={login}>
                                    Login
                                </Button>
                                <Button onClick={login}>Sign Up</Button>
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
                                <Button size="lg" className="text-lg px-8 py-3" onClick={login}>
                                    Get Started Free <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                                <Button
                                    variant="outline"
                                    size="lg"
                                    className="text-lg px-8 py-3 bg-transparent"
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
                            <Button size="lg" variant="secondary" onClick={login}>
                                Create Free Account
                            </Button>
                            <Button
                                size="lg"
                                variant="outline"
                                className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                                onClick={login}
                            >
                                Sign In
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
                            <a href="#" className="hover:text-white transition-colors">
                                Privacy Policy
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                Terms of Service
                            </a>
                            <a href="#" className="hover:text-white transition-colors">
                                Contact
                            </a>
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
                        <Button onClick={login} className="w-full">
                            Create Free Account
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
function useAuth(): { isAuthenticated: any; user: any; login: any; logout: any } {
    return {
        isAuthenticated: true,
        user: 1,
        login: false,
        logout: false
    }
}

