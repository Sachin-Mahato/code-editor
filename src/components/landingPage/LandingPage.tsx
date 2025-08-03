import { useState } from "react"
import { useNavigate } from "react-router"
import useAuth from "@/contexts/auth/useAuth"
import { useFeatures } from "@/hooks/useFeatures"
import useStorage from "@/hooks/useStorage"
import useUserDetails from "@/hooks/useUserDetails"
import Header from "@/components/landingPage/Header"
import HeroSection from "@/components/landingPage/HeroSection"
import FeaturesSection from "@/components/landingPage/FeatureSection"
import AuthCTASection from "@/components/landingPage/AuthCTASection"
import Footer from "@/components/landingPage/Footer"
import TryWithoutLoginDialog from "@/components/landingPage/TryWithoutLoginDialog"

export default function LandingPage() {
    const [showTryModal, setShowTryModal] = useState(false)
    const { isAuthenticated, setIsAuthenticated } = useAuth()
    const { features, benefits } = useFeatures()
    const { token } = useStorage()
    const { data } = useUserDetails(token, setIsAuthenticated)
    const username: string | undefined = data?.username
    const navigate = useNavigate();

    function logout() {
        localStorage.clear();
        window.location.reload();
        navigate("/");
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            <Header
                token={token}
                username={username}
                logout={logout}
            />
            <HeroSection
                isAuthenticated={isAuthenticated}
                setShowTryModal={setShowTryModal}
            />
            <FeaturesSection features={features} />
            <AuthCTASection
                isAuthenticated={isAuthenticated}
                benefits={benefits}
            />
            <Footer />
            <TryWithoutLoginDialog
                open={showTryModal}
                onOpenChange={setShowTryModal}
            />
        </div>
    )
}

