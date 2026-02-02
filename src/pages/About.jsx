import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Sparkles, Heart } from 'lucide-react';

function About() {
    return (
        <div className="min-h-screen bg-void text-star pt-20">
            {/* Hero */}
            <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center opacity-40 blur-sm"
                    style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1558171813-4c088753af8f?w=1920)' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-void via-void/50 to-void/20" />

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h1 className="font-display text-6xl md:text-8xl font-bold uppercase tracking-tight mb-8 animate-fade-in-up">
                        Our Story
                    </h1>
                    <p className="text-xl md:text-2xl font-tech text-dust max-w-2xl mx-auto border-l-2 border-accent pl-6">
                        Born from the void. Designed for the streets.
                        <br /> Defining the new orbit of luxury.
                    </p>
                </div>
            </section>

            {/* Mission */}
            <section className="py-24">
                <div className="max-w-[1920px] mx-auto px-6 lg:px-12">
                    <div className="grid md:grid-cols-2 gap-20 items-center">
                        <div className="order-2 md:order-1">
                            <h2 className="font-display text-4xl md:text-5xl uppercase mb-8 leading-[0.9]">
                                Style Has <br /><span className="text-outline stroke-start">No Labels</span>
                            </h2>
                            <div className="space-y-6 text-dust text-lg font-tech leading-relaxed">
                                <p>
                                    At Nexvel, we reject the binary. Great fashion is universal.
                                    Our unisex collection is engineered for those who define their own gravity.
                                </p>
                                <p>
                                    We are not just a brand. We are a collective of forward-thinkers.
                                    Every piece is a statement — accessible, inclusive, and unapologetically bold.
                                </p>
                            </div>
                        </div>

                        <div className="order-1 md:order-2 relative aspect-square">
                            <div className="absolute inset-4 border border-star/20 z-0" />
                            <img
                                src="https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800"
                                alt="Nexvel lifestyle"
                                className="relative z-10 w-full h-full object-cover transition-all duration-700"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Values */}
            <section className="py-32 border-y border-star/5 bg-black/5">
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="font-display text-3xl md:text-5xl uppercase text-center mb-20 text-star">
                        The Code
                    </h2>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { icon: Sparkles, title: "Quality First", desc: "Premium 240 GSM+ fabrics. Meticulous engineering. No shortcuts." },
                            { icon: Heart, title: "Universal Fit", desc: "Designed for all bodies. Oversized silhouettes that drape perfectly on everyone." },
                            { icon: MapPin, title: "Made in India", desc: "Proudly designed and crafted locally. Supporting the new wave of Indian streetwear." }
                        ].map((item, i) => (
                            <div key={i} className="text-center group">
                                <div className="w-20 h-20 mx-auto mb-8 flex items-center justify-center border border-star/20 rounded-full group-hover:border-accent group-hover:scale-110 transition-all duration-500">
                                    <item.icon className="w-8 h-8 text-dust group-hover:text-accent transition-colors" />
                                </div>
                                <h3 className="font-display text-2xl uppercase mb-4 text-star">
                                    {item.title}
                                </h3>
                                <p className="font-tech text-dust/80 leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="py-32">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
                        {[
                            { val: "10K+", label: "Citizens" },
                            { val: "50+", label: "Artifacts" },
                            { val: "100%", label: "Homegrown" },
                            { val: "4.9★", label: "Rating" },
                        ].map((stat, i) => (
                            <div key={i}>
                                <p className="font-display text-5xl md:text-6xl font-bold text-star mb-2">{stat.val}</p>
                                <p className="font-tech text-sm uppercase tracking-widest text-dust">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 relative overflow-hidden">
                {/* Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-purple-500/10 blur-3xl opacity-30" />

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h2 className="font-display text-4xl md:text-6xl font-bold uppercase mb-8">
                        Enter The Orbit
                    </h2>
                    <p className="font-tech text-dust text-lg mb-12 max-w-xl mx-auto">
                        Join the new wave of streetwear enthusiasts.
                        Elevate your everyday.
                    </p>
                    <Link
                        to="/shop/all"
                        className="inline-flex items-center gap-4 bg-star text-void px-12 py-5 font-display text-lg uppercase tracking-wider hover:bg-accent hover:text-white transition-all duration-300"
                    >
                        Start Shopping
                        <ArrowRight className="w-6 h-6" />
                    </Link>
                </div>
            </section>
        </div>
    );
}

export default About;
