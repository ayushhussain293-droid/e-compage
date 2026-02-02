import { Link } from 'react-router-dom';
import { Instagram, Twitter } from 'lucide-react';

function Footer() {
    return (
        <footer className="bg-void text-dust border-t border-star/5">
            <div className="max-w-[1920px] mx-auto px-6 py-20">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
                    {/* Brand Column */}
                    <div className="col-span-2 md:col-span-1">
                        <Link to="/" className="font-display text-2xl text-star font-bold tracking-tighter block mb-6">
                            NEXVEL
                        </Link>
                        <p className="text-sm font-tech leading-relaxed max-w-xs text-dust">
                            Premium streetwear defined by modern aesthetics. Quality without compromise.
                        </p>
                    </div>

                    {[
                        {
                            title: "Shop",
                            links: [
                                { label: "New Arrivals", to: "/shop/new" },
                                { label: "All Products", to: "/shop/all" },
                                { label: "Bestsellers", to: "/shop/bestsellers" },
                            ]
                        },
                        {
                            title: "Support",
                            links: [
                                { label: "My Account", to: "/login" },
                                { label: "Shipping", to: "/shipping" },
                                { label: "Size Guide", to: "/size-guide" },
                            ]
                        },
                        {
                            title: "Social",
                            links: [
                                { label: "Instagram", to: "#" },
                                { label: "Twitter", to: "#" },
                                { label: "Newsletter", to: "#" },
                            ]
                        }
                    ].map((section) => (
                        <div key={section.title}>
                            <h3 className="font-tech text-xs md:text-sm uppercase tracking-[0.2em] text-star mb-6">
                                {section.title}
                            </h3>
                            <ul className="space-y-4">
                                {section.links.map((link) => (
                                    <li key={link.label}>
                                        <Link
                                            to={link.to}
                                            className="text-sm hover:text-star hover:translate-x-1 transition-all inline-block duration-300"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-star/5 font-tech text-xs tracking-wider uppercase">
                    <p>© 2026 NEXVEL STUDIOS.</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <Link to="/legal" className="hover:text-star transition-colors">Terms</Link>
                        <Link to="/legal" className="hover:text-star transition-colors">Privacy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
