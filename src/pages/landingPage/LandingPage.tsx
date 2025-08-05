import { useState } from "react"
import { useNavigate } from "react-router"
import useAuth from "@/core/store/auth/useAuth"
import { useFeatures } from "@/core/utils/useFeatures"
import useStorage from "@/core/utils/useStorage"
import useUserDetails from "@/features/auth/hooks/useUserDetails"
import Header from "@/pages/landingPage/Header"
import HeroSection from "@/pages/landingPage/HeroSection"
import FeaturesSection from "@/pages/landingPage/FeatureSection"
import AuthCTASection from "@/pages/landingPage/AuthCTASection"
import Footer from "@/pages/landingPage/Footer"
import TryWithoutLoginDialog from "@/pages/landingPage/TryWithoutLoginDialog"

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

