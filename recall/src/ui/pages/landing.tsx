import { NavBar } from "../components/navbar";
import Button from "../components/button";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export function Landing_One() {
    const navigate = useNavigate();
    return (
        <div className="bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen">
            <NavBar className="" variant="home" size="lg" logo={logo}>
                <div className="relative flex w-[100vw]  -translate-x-[100px] -translate-y-[20px]">
                    <div className="absolute right-0 flex gap-2 ">
                        <Button variant="ghost" onClick={() => { navigate("/login") }}>Login</Button>
                        <Button variant="ghost" onClick={() => { navigate("/signup") }}>Signup</Button>
                    </div>
                </div>
            </NavBar>
            {/* Hero Section */}
            <section className="relative flex flex-col items-center justify-center py-32 px-4 text-center overflow-hidden">
                {/* Background Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-slate-900/5 via-blue-900/10 to-indigo-900/5 pointer-events-none z-0" />
                {/* Decorative Circles */}
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-indigo-400/20 rounded-full opacity-60 blur-3xl z-0" />
                <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-gradient-to-br from-indigo-400/15 to-purple-400/15 rounded-full opacity-50 blur-3xl z-0" />
                <div className="relative z-10 flex flex-col items-center">
                    <motion.img 
                        src={logo} 
                        alt="Recall Logo" 
                        className="h-20 mb-8 drop-shadow-xl"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <motion.h1 
                        className="text-6xl md:text-7xl font-black bg-gradient-to-r from-slate-800 via-blue-700 to-indigo-700 bg-clip-text text-transparent mb-8 leading-tight"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    >
                        Your Second Brain for the Web
                    </motion.h1>
                    <motion.p 
                        className="text-xl md:text-2xl text-slate-600 max-w-3xl mb-12 font-medium leading-relaxed"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                    >
                        Arrange all your bookmarks at one place
                    </motion.p>
                    <motion.div 
                        className="flex gap-6 justify-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                    >
                        <Button variant="primary" onClick={() => navigate("/signup")}>Get Started Free</Button>
                        <Button variant="outline" onClick={() => navigate("/login")}>Learn More</Button>
                    </motion.div>
                   
                </div>
            </section>
            {/* Features Section */}
            <section className="py-24 bg-gradient-to-b from-slate-50 to-white">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div 
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4">
                            Everything you need to organize your digital life
                        </h2>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Powerful features designed to help you capture, organize, and retrieve information effortlessly
                        </p>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <motion.div 
                            className="group relative bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:border-blue-200 transition-all duration-300"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                        >
                            <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors duration-300">
                                <svg className="w-7 h-7 text-blue-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M19 11H5m14 0a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6a2 2 0 0 1 2-2m14 0V9a2 2 0 0 0-2-2M5 11V9a2 2 0 0 1 2-2m0 0V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2M7 7h10" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-3">Smart Bookmark Management</h3>
                            <p className="text-slate-600 leading-relaxed">Save, organize, and search all your web bookmarks with intelligent categorization. Never lose an important link again.</p>
                        </motion.div>
                        <motion.div 
                            className="group relative bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:border-indigo-200 transition-all duration-300"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                        >
                            <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-indigo-200 transition-colors duration-300">
                                <svg className="w-7 h-7 text-indigo-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-3">Collaborative Sharing</h3>
                            <p className="text-slate-600 leading-relaxed">Share curated collections and knowledge bases with your team or the world. Collaborate seamlessly on research projects.</p>
                        </motion.div>
                        <motion.div 
                            className="group relative bg-white rounded-2xl p-8 shadow-sm border border-slate-200 hover:shadow-xl hover:border-purple-200 transition-all duration-300"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.5 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8, transition: { duration: 0.2 } }}
                        >
                            <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors duration-300">
                                <svg className="w-7 h-7 text-purple-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-slate-800 mb-3">AI-Powered Search</h3>
                            <p className="text-slate-600 leading-relaxed">Ask questions and instantly find information across all your saved content using advanced AI search capabilities.</p>
                        </motion.div>
                    </div>
                </div>
            </section>
            {/* Footer */}
            <footer className="py-8 bg-white border-t mt-12">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                    <img src={logo} alt="Recall Logo" className="h-10 mb-4 md:mb-0" />
                    <div className="text-gray-500 text-sm">
                        Ramanshu Sharan Mishra production
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