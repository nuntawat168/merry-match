import Navbar from "../components/Navbar";
import Hero from "../sections/Hero";
import WhyMerryMatch from "../sections/WhyMerryMatch";
import HowToMerry from "../sections/HowToMerry";
import CTA from "../sections/CTA";
import Footer from "../components/Footer";

function LandingPage() {
    return (
    <>
        <Navbar />
        <Hero />
        <WhyMerryMatch />
        <HowToMerry />
        <CTA />
        <Footer />
    </>
)
}

export default LandingPage;