import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { user } = useAuth(); // Get auth state

    // Check if we are on the homepage
    const isHome = location.pathname === '/';

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Prevent scrolling when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
    }, [isMenuOpen]);

    // Determine text colors based on route and scroll state
    // On Home + Not Scrolled = White text (for dark hero)
    // Otherwise = Black/Dark text
    const isDarkHeader = isHome && !isScrolled;

    // If menu is open, force controls to be visible (white on black menu)
    const effectiveTextColor = isMenuOpen ? 'text-white' : (isDarkHeader ? 'text-white' : 'text-star');
    const effectiveDustColor = isMenuOpen ? 'text-white/60' : (isDarkHeader ? 'text-white/70' : 'text-dust');
    const effectiveBgColor = isMenuOpen ? 'bg-white' : (isDarkHeader ? 'bg-white' : 'bg-star');

    const navLinks = [
        { name: 'Shop', path: '/shop/all' },
        { name: 'New', path: '/shop/new' },
        { name: 'Collections', path: '/shop/all' },
        { name: 'About', path: '/about' },
    ];

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled && !isMenuOpen ? 'py-4 bg-void/90 backdrop-blur-md shadow-sm' : 'py-6 md:py-8 bg-transparent'
                }`}>
                <div className="max-w-[1920px] mx-auto px-6 md:px-12 flex justify-between items-center">

                    {/* Logo */}
                    <Link to="/" className="relative z-50 group" onClick={() => setIsMenuOpen(false)}>
                        <h1 className={`font-display text-2xl md:text-3xl font-bold tracking-tighter transition-colors ${effectiveTextColor}`}>
                            NEXVEL
                            <span className="text-accent opacity-0 group-hover:opacity-100 transition-opacity">.</span>
                        </h1>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex gap-8 items-center">
                        {navLinks.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`font-tech text-sm uppercase tracking-widest transition-colors relative group ${effectiveDustColor} hover:text-accent`}
                            >
                                {item.name}
                                <span className={`absolute -bottom-1 left-0 w-0 h-[1px] group-hover:w-full transition-all duration-300 ${effectiveBgColor}`} />
                            </Link>
                        ))}
                    </nav>

                    {/* Right Controls */}
                    <div className="flex items-center gap-6 relative z-50">
                        <button className={`transition-colors ${effectiveTextColor} hover:text-accent`}>
                            <Search className="w-5 h-5" />
                        </button>

                        <div className="hidden md:flex items-center gap-4">
                            {/* Profile Link: Goes to Account if logged in, Login otherwise */}
                            <Link
                                to={user ? "/account" : "/login"}
                                className={`transition-colors ${effectiveTextColor} hover:text-accent`}
                            >
                                <User className="w-5 h-5" />
                            </Link>

                            {!user && (
                                <Link to="/register" className={`font-tech text-xs uppercase tracking-widest transition-colors ${effectiveDustColor} hover:text-accent`}>
                                    Sign Up
                                </Link>
                            )}
                        </div>

                        <Link to="/cart" className={`relative transition-colors ${effectiveTextColor} hover:text-accent`} onClick={() => setIsMenuOpen(false)}>
                            <ShoppingBag className="w-5 h-5" />
                            <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full animate-pulse" />
                        </Link>

                        <button
                            className={`md:hidden ${effectiveTextColor}`}
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                        >
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <div className={`fixed inset-0 bg-black z-40 transition-all duration-500 ease-[cubic-bezier(0.19,1,0.22,1)] ${isMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
                }`}>

                {/* Background Decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-accent/20 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] bg-purple-500/10 rounded-full blur-[100px]" />
                </div>

                <nav className="relative z-10 h-full flex flex-col justify-center items-center px-6">
                    <div className="flex flex-col items-center gap-8 mb-12">
                        {navLinks.map((item, index) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`font-display text-4xl md:text-6xl text-white hover:text-accent hover:italic transition-all duration-300 transform ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
                                style={{ transitionDelay: `${index * 100}ms` }}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    <div className={`flex flex-col items-center gap-6 w-full max-w-xs transition-all duration-500 delay-300 ${isMenuOpen ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                        {user ? (
                            <Link
                                to="/account"
                                className="w-full py-4 border border-white/20 text-white font-tech uppercase tracking-widest text-center hover:bg-white hover:text-black transition-all"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                My Account
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="w-full py-4 border border-white/20 text-white font-tech uppercase tracking-widest text-center hover:bg-white hover:text-black transition-all"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="w-full py-4 bg-white text-black font-tech uppercase tracking-widest text-center hover:bg-accent hover:text-white transition-all flex items-center justify-center gap-2"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Sign Up <ArrowRight className="w-4 h-4" />
                                </Link>
                            </>
                        )}
                    </div>
                </nav>
            </div>
        </>
    );
}

export default Header;
