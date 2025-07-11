import { Code2 } from "lucide-react"
import { Link } from "react-router"

export default function Footer() {
    return (
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
    )
}