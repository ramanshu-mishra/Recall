import { NavBar } from "../components/navbar";
import Button from "../components/button";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

export function Landing_One() {
    const navigate = useNavigate();
    return (
        <div className="bg-gradient-to-br from-blue-50 via-white to-purple-100 min-h-screen">
            <NavBar className="" variant="home" size="lg" logo={logo}>
                <div className="relative flex w-[100vw]  -translate-x-[100px] -translate-y-[20px]">
                    <div className="absolute right-0 flex gap-2 ">
                        <Button variant="ghost" onClick={() => { navigate("/login") }}>Login</Button>
                        <Button variant="ghost" onClick={() => { navigate("/signup") }}>Signup</Button>
                    </div>
                </div>
            </NavBar>
            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center py-28 px-4 text-center overflow-hidden">
                {/* Background Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-purple-300/20 to-pink-200/20 pointer-events-none z-0" />
                {/* Decorative Circles */}
                <div className="absolute -top-16 -left-16 w-72 h-72 bg-purple-200 rounded-full opacity-30 blur-2xl z-0" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-100 rounded-full opacity-20 blur-3xl z-0" />
                <div className="relative z-10 flex flex-col items-center">
                    <img src={logo} alt="Recall Logo" className="h-16 mb-6 drop-shadow-lg" />
                    <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 bg-clip-text text-transparent mb-6 drop-shadow">
                        Your Second Brain for the Web
                    </h1>
                    <p className="text-lg md:text-2xl text-gray-700 max-w-2xl mb-8">
                        Effortlessly manage bookmarks, share your knowledge, and query your notes with AI. Recall is your all-in-one productivity companion.
                    </p>
                    <div className="flex gap-4 justify-center mb-10">
                        <Button variant="primary" onClick={() => navigate("/signup")}>Get Started Free</Button>
                        <Button variant="outline" onClick={() => navigate("/login")}>Learn More</Button>
                    </div>
                   
                </div>
            </section>
            {/* Features Section */}
            <section className="py-20 bg-white">
                <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-10 px-4">
                    <div className="rounded-xl shadow-lg p-8 bg-gradient-to-br from-blue-100 to-purple-100 flex flex-col items-center">
                        <svg className="w-12 h-12 mb-4 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M5 5v14h14V5H5zm2 2h10v10H7V7zm2 2v6h6V9H9z" />
                        </svg>
                        <h2 className="text-xl font-bold mb-2 text-blue-700">Bookmark Management</h2>
                        <p className="text-gray-600 text-center">Save, organize, and search all your web bookmarks in one place. Never lose a link again.</p>
                    </div>
                    <div className="rounded-xl shadow-lg p-8 bg-gradient-to-br from-purple-100 to-pink-100 flex flex-col items-center">
                        <svg className="w-12 h-12 mb-4 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M17 20h5v-2a4 4 0 0 0-4-4h-1M9 20H4v-2a4 4 0 0 1 4-4h1m0-4V4a2 2 0 1 1 4 0v6m-4 0h4" />
                        </svg>
                        <h2 className="text-xl font-bold mb-2 text-purple-700">Share Your Second Brain</h2>
                        <p className="text-gray-600 text-center">Collaborate and share curated collections or notes with friends, teams, or the world.</p>
                    </div>
                    <div className="rounded-xl shadow-lg p-8 bg-gradient-to-br from-pink-100 to-blue-100 flex flex-col items-center">
                        <svg className="w-12 h-12 mb-4 text-pink-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path d="M12 20v-6m0 0V4m0 10h4m-4 0H8" />
                        </svg>
                        <h2 className="text-xl font-bold mb-2 text-pink-700">AI Notes Query</h2>
                        <p className="text-gray-600 text-center">Ask questions and instantly find information in your notes using powerful AI search.</p>
                    </div>
                </div>
            </section>
            {/* Testimonials Section */}
            <section className="py-16 bg-gradient-to-r from-blue-50 to-purple-50">
                <div className="max-w-4xl mx-auto px-4">
                    <h3 className="text-3xl font-bold text-center mb-10 text-purple-700">What our users say</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="italic text-gray-700">"Recall is my go-to for saving and finding anything important on the web."</p>
                            <div className="mt-4 font-semibold text-blue-600">— Alex</div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="italic text-gray-700">"Sharing my research notes with my team is effortless now."</p>
                            <div className="mt-4 font-semibold text-purple-600">— Priya</div>
                        </div>
                        <div className="bg-white rounded-lg shadow p-6">
                            <p className="italic text-gray-700">"The AI search is a game changer for finding my notes."</p>
                            <div className="mt-4 font-semibold text-pink-600">— Sam</div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Footer */}
            <footer className="py-8 bg-white border-t mt-12">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                    <img src={logo} alt="Recall Logo" className="h-10 mb-4 md:mb-0" />
                    <div className="text-gray-500 text-sm">
                        © {new Date().getFullYear()} Recall. All rights reserved.
                    </div>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
                        <a href="#" className="text-blue-500 hover:underline">Terms</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}