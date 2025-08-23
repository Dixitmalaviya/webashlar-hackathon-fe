import React, { useEffect } from 'react';

// You may want to move these to a separate CSS/SCSS file or use Tailwind config for production
const style = `
:root {
    --primary: rgb(96, 165, 250);
    --dark: rgb(31, 41, 55);
    --light: rgb(209, 213, 219);
    --primary-hex: #60a5fa;
    --dark-hex: #1f2937;
    --light-hex: #d1d5db;
}
body {
    font-family: 'Inter', sans-serif;
    background-color: var(--dark);
    overflow-x: hidden;
}
.heading-font {
    font-family: 'Space Grotesk', sans-serif;
}
/* Custom Glassmorphism */
.glass {
    background: rgba(96, 165, 250, 0.1);
    backdrop-filter: blur(20px);
    border: 1px solid rgba(96, 165, 250, 0.2);
}
.glass-dark {
    background: rgba(31, 41, 55, 0.8);
    backdrop-filter: blur(20px);
}
/* Transparent Nav with Scroll Effect */
.nav-transparent {
    background: transparent;
    backdrop-filter: none;
    border: none;
    transition: all 0.3s ease;
}
.nav-scrolled {
    background: rgba(31, 41, 55, 0.95);
    backdrop-filter: blur(20px);
}
/* Hero gradient with animation */
.hero-gradient {
    background: linear-gradient(135deg, var(--dark) 0%, #111827 50%, var(--dark) 100%);
    position: relative;
}
.hero-gradient::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(circle at 30% 20%, rgba(96, 165, 250, 0.3) 0%, transparent 50%),
                radial-gradient(circle at 70% 80%, rgba(96, 165, 250, 0.2) 0%, transparent 50%);
    animation: pulseGlow 8s ease-in-out infinite alternate;
}
@keyframes pulseGlow {
    0% { opacity: 0.5; }
    100% { opacity: 1; }
}
@keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(1deg); }
}
@keyframes floatReverse {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(20px) rotate(-1deg); }
}
.floating { animation: float 6s ease-in-out infinite; }
.floating-reverse { animation: floatReverse 8s ease-in-out infinite; }
.hover-lift {
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
.hover-lift:hover {
    transform: translateY(-10px) scale(1.02);
    box-shadow: 0 25px 50px -12px rgba(96, 165, 250, 0.4);
}
.magnetic-btn {
    transition: all 0.3s cubic-bezier(0.23, 1, 0.32, 1);
    position: relative;
    overflow: hidden;
}
.magnetic-btn::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: all 0.6s ease;
}
.magnetic-btn:hover::before {
    width: 300px;
    height: 300px;
}
.magnetic-btn:hover {
    transform: scale(1.05);
    box-shadow: 0 20px 40px rgba(96, 165, 250, 0.4);
}
.nav-item {
    position: relative;
    transition: all 0.3s ease;
}
.nav-item::after {
    content: '';
    position: absolute;
    bottom: -8px;
    left: 50%;
    width: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--primary), rgba(96, 165, 250, 0.5));
    transform: translateX(-50%);
    transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.nav-item:hover::after {
    width: 100%;
}
.reveal {
    opacity: 0;
    transform: translateY(60px);
    transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}
.reveal.active {
    opacity: 1;
    transform: translateY(0);
}
::-webkit-scrollbar {
    width: 8px;
}
::-webkit-scrollbar-track {
    background: var(--dark);
}
::-webkit-scrollbar-thumb {
    background: var(--primary);
    border-radius: 4px;
}
.particle {
    position: absolute;
    width: 4px;
    height: 4px;
    background: var(--primary);
    border-radius: 50%;
    animation: particle-float 8s infinite linear;
    opacity: 0.6;
}
@keyframes particle-float {
    0% {
        transform: translateY(100vh) rotate(0deg);
        opacity: 0;
    }
    10% {
        opacity: 0.6;
    }
    90% {
        opacity: 0.6;
    }
    100% {
        transform: translateY(-100vh) rotate(360deg);
        opacity: 0;
    }
}
.modern-card {
    background: linear-gradient(145deg, rgba(31, 41, 55, 0.8), rgba(31, 41, 55, 0.4));
    backdrop-filter: blur(20px);
    border: 1px solid rgba(96, 165, 250, 0.1);
    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    position: relative;
    overflow: hidden;
}
.modern-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.1), transparent);
    transition: left 0.8s ease;
}
.modern-card:hover::before {
    left: 100%;
}
.modern-card:hover {
    transform: translateY(-8px);
    border-color: var(--primary);
    box-shadow: 0 25px 50px -12px rgba(96, 165, 250, 0.3);
}
.glow {
    box-shadow: 0 0 20px rgba(96, 165, 250, 0.3);
}
.glow:hover {
    box-shadow: 0 0 40px rgba(96, 165, 250, 0.6);
}
.gradient-text {
    background: linear-gradient(135deg, var(--primary), #3b82f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
}
`;

const LandingPage: React.FC = () => {
    useEffect(() => {
        // Animate On Scroll (AOS) init
        // @ts-ignore
        if (window.AOS) window.AOS.init({ duration: 800, once: true });

        // Mobile menu toggle
        const mobileMenuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.onclick = () => {
                mobileMenu.classList.toggle('hidden');
            };
        }

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector((this as HTMLAnchorElement).getAttribute('href')!);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Scroll reveal animations
        const revealElements = document.querySelectorAll('.reveal');
        const handleScroll = () => {
            revealElements.forEach(element => {
                const rect = element.getBoundingClientRect();
                const isVisible = rect.top <= window.innerHeight * 0.8 && rect.bottom >= 0;
                if (isVisible) {
                    element.classList.add('active');
                }
            });
        };
        // Navbar scroll effect
        const header = document.getElementById('header');
        const handleNavbarScroll = () => {
            if (window.scrollY > 50) {
                header?.classList.add('nav-scrolled');
                header?.classList.remove('nav-transparent');
            } else {
                header?.classList.add('nav-transparent');
                header?.classList.remove('nav-scrolled');
            }
        };
        handleScroll();
        handleNavbarScroll();
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('scroll', handleNavbarScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', handleNavbarScroll);
        };
    }, []);

    useEffect(() => {
        // Particle animation
        const particlesContainer = document.getElementById('particles-container');
        if (!particlesContainer) return;
    let interval: number;
        const createParticle = () => {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            particle.style.left = `${Math.random() * 100}vw`;
            particle.style.animationDuration = `${Math.random() * 5 + 5}s`;
            particle.style.animationDelay = `${Math.random() * 2}s`;
            particlesContainer.appendChild(particle);
            setTimeout(() => particle.remove(), 10000);
        };
        interval = setInterval(createParticle, 300);
        return () => clearInterval(interval);
    }, []);

    return (
        <div>
            <style>{style}</style>
            {/* Particles Background */}
            <div id="particles-container" className="fixed inset-0 pointer-events-none z-0"></div>
            {/* Header */}
            <header className="nav-transparent fixed top-0 left-0 right-0 z-50 transition-all duration-300" id="header">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <a href="#" className="flex items-center space-x-3 group">
                        <div className="relative">
                            {/* Replace with your logo path or import */}
                            <img src="/vite.svg" alt="HealthSync Logo" className="logo-img h-10 w-10 object-contain" />
                            <div className="absolute inset-0 bg-blue-400 rounded-full blur-lg opacity-30 group-hover:opacity-60 transition-opacity duration-300"></div>
                        </div>
                        <span className="text-2xl font-bold heading-font gradient-text">HealthSync</span>
                    </a>
                    <nav className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="nav-item text-gray-300 hover:text-blue-400 font-medium">Features</a>
                        <a href="#audience" className="nav-item text-gray-300 hover:text-blue-400 font-medium">Benefits</a>
                        <a href="#solution" className="nav-item text-gray-300 hover:text-blue-400 font-medium">Solution</a>
                        <a href="#contact" className="nav-item text-gray-300 hover:text-blue-400 font-medium">Contact</a>
                    </nav>
                    <a href="#demo" className="hidden md:inline-block magnetic-btn bg-blue-400 text-gray-900 font-semibold px-6 py-3 rounded-full shadow-lg relative z-10">
                        Get Started
                    </a>
                    <button id="mobile-menu-btn" className="md:hidden text-gray-300 hover:text-blue-400 transition-colors duration-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
                {/* Mobile Menu */}
                <div id="mobile-menu" className="hidden md:hidden px-6 pb-4 glass">
                    <a href="#features" className="block py-3 text-gray-300 hover:text-blue-400 font-medium transition-colors duration-300">Features</a>
                    <a href="#audience" className="block py-3 text-gray-300 hover:text-blue-400 font-medium transition-colors duration-300">Benefits</a>
                    <a href="#solution" className="block py-3 text-gray-300 hover:text-blue-400 font-medium transition-colors duration-300">Solution</a>
                    <a href="#technology" className="block py-3 text-gray-300 hover:text-blue-400 font-medium transition-colors duration-300">Technology</a>
                    <a href="#contact" className="block py-3 text-gray-300 hover:text-blue-400 font-medium transition-colors duration-300">Contact</a>
                    <a href="#demo" className="block mt-4 magnetic-btn bg-blue-400 text-gray-900 text-center font-semibold px-6 py-3 rounded-full">Get Started</a>
                </div>
            </header>
            {/* Hero Section */}
            <section className="hero-gradient min-h-screen flex items-center relative">
                <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center relative z-10">
                    <div className="text-center lg:text-left reveal" data-aos="fade-left">
                        <h1 className="text-5xl lg:text-7xl font-black heading-font leading-tight mb-6">
                            Smart Health Card with
                            <span className="gradient-text">AI Assistant</span>
                        </h1>
                        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                            Revolutionary blockchain-secured healthcare identity with AI-powered insights. 
                            Consolidating medical records, prescriptions, and diagnostics in one intelligent platform.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <a href="#demo" className="magnetic-btn bg-blue-400 text-gray-900 font-bold px-8 py-4 rounded-full shadow-2xl relative z-10 text-center">
                                Start Your Health Journey
                            </a>
                            <a href="#features" className="magnetic-btn glass text-blue-400 font-bold px-8 py-4 rounded-full relative z-10 text-center">
                                Explore Features
                            </a>
                        </div>
                    </div>
                    <div className="reveal lg:block hidden" data-aos="fade-right" data-aos-delay="200">
                        <div className="relative">
                            {/* Main floating card */}
                            <div className="modern-card p-8 rounded-3xl floating glow">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-bold heading-font gradient-text">Smart Health Identity</h3>
                                    <span className="bg-blue-400 text-gray-900 px-3 py-1 rounded-full text-sm font-semibold">Blockchain Secured</span>
                                </div>
                                <div className="grid grid-cols-3 gap-4 mb-6">
                                    <div className="bg-gradient-to-br from-blue-400 to-blue-500 p-4 rounded-xl text-center text-gray-900">
                                        <div className="text-2xl font-bold">100%</div>
                                        <div className="text-sm opacity-80">Secure</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-blue-400 to-blue-500 p-4 rounded-xl text-center text-gray-900">
                                        <div className="text-2xl font-bold">AI</div>
                                        <div className="text-sm opacity-80">Powered</div>
                                    </div>
                                    <div className="bg-gradient-to-br from-blue-400 to-blue-500 p-4 rounded-xl text-center text-gray-900">
                                        <div className="text-2xl font-bold">24/7</div>
                                        <div className="text-sm opacity-80">Support</div>
                                    </div>
                                </div>
                                <div className="glass p-4 rounded-xl text-center">
                                    <div className="font-semibold mb-2 gradient-text">Unified Healthcare</div>
                                    <div className="text-sm text-gray-400">All records, one secure identity</div>
                                </div>
                            </div>
                            {/* Floating elements */}
                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-blue-400 rounded-full opacity-20 floating-reverse"></div>
                            <div className="absolute -bottom-6 -left-6 w-16 h-16 bg-blue-400 rounded-full opacity-30 floating"></div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Features Section */}
            <section id="features" className="py-24 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 reveal" data-aos="fade-up">
                        <h2 className="text-5xl font-bold heading-font mb-4 gradient-text">Revolutionary Features</h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Advanced AI and blockchain technology transforming healthcare delivery
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Feature 1 */}
                        <div className="modern-card p-8 rounded-2xl hover-lift reveal" data-aos="fade-up" data-aos-delay="100">
                            <div className="bg-blue-400 bg-opacity-20 text-blue-400 rounded-full h-16 w-16 flex items-center justify-center mb-6 glow">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3 heading-font">Unified Health Identity</h3>
                            <p className="text-gray-400">Blockchain-secured consolidation of all medical records, prescriptions, diagnostic reports, and hospital visits in one intelligent platform.</p>
                        </div>
                        {/* Feature 2 */}
                        <div className="modern-card p-8 rounded-2xl hover-lift reveal" data-aos="fade-up" data-aos-delay="200">
                            <div className="bg-blue-400 bg-opacity-20 text-blue-400 rounded-full h-16 w-16 flex items-center justify-center mb-6 glow">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3 heading-font">AI Health Bot for Patients</h3>
                            <p className="text-gray-400">Analyzes medical records to detect anomalies, suggests preventive care, optimizes healthcare costs, and provides personalized lifestyle recommendations.</p>
                        </div>
                        {/* Feature 3 */}
                        <div className="modern-card p-8 rounded-2xl hover-lift reveal" data-aos="fade-up" data-aos-delay="300">
                            <div className="bg-blue-400 bg-opacity-20 text-blue-400 rounded-full h-16 w-16 flex items-center justify-center mb-6 glow">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3 heading-font">Doctor AI Assistance</h3>
                            <p className="text-gray-400">AI-powered patient summaries, clinical decision support, risk prediction, drug interaction alerts, and enhanced data visualization for healthcare providers.</p>
                        </div>
                        {/* Feature 4 */}
                        <div className="modern-card p-8 rounded-2xl hover-lift reveal" data-aos="fade-up" data-aos-delay="400">
                            <div className="bg-blue-400 bg-opacity-20 text-blue-400 rounded-full h-16 w-16 flex items-center justify-center mb-6 glow">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold mb-3 heading-font">Smart Patient Guidance</h3>
                            <p className="text-gray-400">Health reminder system for routine checkups, preventive screenings, and proactive health monitoring for optimal wellness.</p>
                        </div>
                    </div>
                </div>
            </section>
            {/* Benefits Section */}
            <section id="audience" className="py-24 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 reveal" data-aos="fade-up">
                        <h2 className="text-5xl font-bold heading-font mb-4 gradient-text">Who Benefits from HealthSync</h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Empowering every stakeholder in the healthcare ecosystem with intelligent solutions
                        </p>
                    </div>
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Patients */}
                        <div className="modern-card p-8 rounded-2xl hover-lift reveal" data-aos="fade-up" data-aos-delay="100">
                            <div className="bg-blue-400 bg-opacity-20 text-blue-400 rounded-full h-12 w-12 flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-6 heading-font gradient-text">For Patients</h3>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex items-center"><span className="text-blue-400 mr-3">▸</span> Unified medical history access across all providers</li>
                                <li className="flex items-center"><span className="text-blue-400 mr-3">▸</span> AI-powered health insights and anomaly detection</li>
                                <li className="flex items-center"><span className="text-blue-400 mr-3">▸</span> Personalized lifestyle recommendations</li>
                                <li className="flex items-center"><span className="text-blue-400 mr-3">▸</span> Healthcare cost optimization and transparency</li>
                                <li className="flex items-center"><span className="text-blue-400 mr-3">▸</span> Blockchain-secured data protection</li>
                            </ul>
                        </div>
                        {/* Doctors */}
                        <div className="modern-card p-8 rounded-2xl hover-lift reveal" data-aos="fade-up" data-aos-delay="200">
                            <div className="bg-blue-400 bg-opacity-20 text-blue-400 rounded-full h-12 w-12 flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-6 heading-font gradient-text">For Doctors</h3>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex items-center"><span className="text-blue-400 mr-3">▸</span> AI-powered instant patient summaries</li>
                                <li className="flex items-center"><span className="text-blue-400 mr-3">▸</span> Clinical decision support system</li>
                                <li className="flex items-center"><span className="text-blue-400 mr-3">▸</span> Advanced risk prediction algorithms</li>
                                <li className="flex items-center"><span className="text-blue-400 mr-3">▸</span> Drug interaction alerts and warnings</li>
                                <li className="flex items-center"><span className="text-blue-400 mr-3">▸</span> Enhanced data visualization tools</li>
                            </ul>
                        </div>
                        {/* Hospitals/Clinics */}
                        <div className="modern-card p-8 rounded-2xl hover-lift reveal" data-aos="fade-up" data-aos-delay="300">
                            <div className="bg-blue-400 bg-opacity-20 text-blue-400 rounded-full h-12 w-12 flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-6 heading-font gradient-text">For Hospitals/Clinics</h3>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex items-center"><span className="text-blue-400 mr-3">▸</span> Secure and streamlined record management</li>
                                <li className="flex items-center"><span className="text-blue-400 mr-3">▸</span> Enhanced patient workflow efficiency</li>
                                <li className="flex items-center"><span className="text-blue-400 mr-3">▸</span> Improved care delivery systems</li>
                                <li className="flex items-center"><span className="text-blue-400 mr-3">▸</span> Reduced operational costs</li>
                                <li className="flex items-center"><span className="text-blue-400 mr-3">▸</span> Better patient outcomes and satisfaction</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            {/* Solution Section */}
            <section id="solution" className="py-24 relative">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16 reveal" data-aos="fade-up">
                        <h2 className="text-5xl font-bold heading-font mb-4 gradient-text">Solving Healthcare Challenges</h2>
                        <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                            Addressing critical pain points in India's rapidly digitalizing healthcare ecosystem
                        </p>
                    </div>
                    <div className="grid lg:grid-cols-2 gap-12">
                        <div className="modern-card p-8 rounded-2xl reveal" data-aos="fade-up" data-aos-delay="100">
                            <h3 className="text-2xl font-bold text-orange-300 mb-6 heading-font">Current Problems</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start"><span className="text-orange-300 mr-3 mt-1">⚠</span><span className="text-gray-300">Fragmented medical records across multiple hospitals and clinics</span></li>
                                <li className="flex items-start"><span className="text-orange-300 mr-3 mt-1">⚠</span><span className="text-gray-300">Repeated diagnostic tests causing unnecessary expenses</span></li>
                                <li className="flex items-start"><span className="text-orange-300 mr-3 mt-1">⚠</span><span className="text-gray-300">Lack of transparency and limited personalized health guidance</span></li>
                                <li className="flex items-start"><span className="text-orange-300 mr-3 mt-1">⚠</span><span className="text-gray-300">High healthcare costs due to inefficiencies in treatment decisions</span></li>
                                <li className="flex items-start"><span className="text-orange-300 mr-3 mt-1">⚠</span><span className="text-gray-300">Limited AI-powered preventive care and lifestyle guidance</span></li>
                            </ul>
                        </div>
                        <div className="modern-card p-8 rounded-2xl reveal" data-aos="fade-up" data-aos-delay="200">
                            <h3 className="text-2xl font-bold text-blue-400 mb-6 heading-font">HealthSync Solutions</h3>
                            <ul className="space-y-4">
                                <li className="flex items-start"><span className="text-blue-400 mr-3 mt-1">✦︎</span><span className="text-gray-300">Unified digital identity with blockchain-based authentication</span></li>
                                <li className="flex items-start"><span className="text-blue-400 mr-3 mt-1">✦︎</span><span className="text-gray-300">AI-powered anomaly detection preventing unnecessary tests</span></li>
                                <li className="flex items-start"><span className="text-blue-400 mr-3 mt-1">✦︎</span><span className="text-gray-300">Complete transparency with personalized AI health guidance</span></li>
                                <li className="flex items-start"><span className="text-blue-400 mr-3 mt-1">✦︎</span><span className="text-gray-300">Cost optimization through intelligent treatment recommendations</span></li>
                                <li className="flex items-start"><span className="text-blue-400 mr-3 mt-1">✦︎</span><span className="text-gray-300">AI Health Bot for preventive care and lifestyle recommendations</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
            {/* CTA Section */}
            <section id="demo" className="py-24 bg-gradient-to-br from-blue-400 to-blue-600 relative">
                <div className="container mx-auto px-6 text-center reveal" data-aos="zoom-in-up">
                    <h2 className="text-5xl font-bold heading-font mb-4 text-white">Join the Healthcare Revolution</h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                        Take control of your health with HealthSync's Smart Health Card. AI-powered insights, blockchain security, unified records - all in one intelligent platform.
                    </p>
                    <a href="#" className="magnetic-btn bg-white text-blue-600 font-bold px-10 py-4 rounded-full shadow-2xl hover:bg-gray-100 transition-transform transform hover:scale-105 duration-300 inline-block">
                        Start Your Health Journey
                    </a>
                </div>
            </section>
            {/* Footer */}
            <footer id="contact" className="bg-gray-900 text-white py-12 relative">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="reveal" data-aos="fade-up">
                            <h3 className="text-2xl font-bold heading-font text-blue-400 mb-4 gradient-text">HealthSync</h3>
                            <p className="text-gray-400">Smart Health Card with AI Health Assistant - revolutionizing healthcare with blockchain security and intelligent insights.</p>
                        </div>
                        <div className="reveal" data-aos="fade-up" data-aos-delay="100">
                            <h4 className="font-semibold text-blue-400 mb-4 heading-font">Quick Links</h4>
                            <ul className="space-y-2">
                                <li><a href="#features" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Features</a></li>
                                <li><a href="#audience" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Benefits</a></li>
                                <li><a href="#solution" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Solution</a></li>
                                <li><a href="#technology" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Technology</a></li>
                                <li><a href="#demo" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">Demo</a></li>
                            </ul>
                        </div>
                        <div className="reveal" data-aos="fade-up" data-aos-delay="200">
                            <h4 className="font-semibold text-blue-400 mb-4 heading-font">Contact</h4>
                            <p className="text-gray-400 mb-4">Get in touch to learn more about our Smart Health Card solution with AI Health Assistant.</p>
                            <a href="mailto:info@healthsync.com" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">info@healthsync.com</a>
                        </div>
                    </div>
                    <div className="mt-12 border-t border-gray-800 pt-8 text-center text-gray-500 reveal" data-aos="fade-up" data-aos-delay="300">
                        <p>&copy; 2025 HealthSync. All rights reserved. | Building the future of healthcare with blockchain and AI.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;
