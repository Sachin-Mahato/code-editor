import { Link } from "react-router"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function MinimalNotFound() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            <div className="text-center max-w-md mx-auto">
                {/* Simple 404 */}
                <div className="mb-8">
                    <h1 className="text-6xl font-light text-gray-900 mb-2">404</h1>
                    <div className="w-16 h-px bg-gray-300 mx-auto"></div>
                </div>

                {/* Clean Content */}
                <h2 className="text-2xl font-medium text-gray-900 mb-4">Page not found</h2>

                <p className="text-gray-600 mb-8 leading-relaxed">
                    The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
                </p>

                {/* Simple Actions */}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Button asChild variant="default" className="bg-gray-900 hover:bg-gray-800">
                        <Link to="/">
                            <Home className="mr-2 h-4 w-4" />
                            Go home
                        </Link>
                    </Button>

                    <Button asChild variant="ghost" onClick={() => window.history.back()}>
                        <Link to="/">
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Go back
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}
