import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowDownRight } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';

// Categories Data - Updated with new requests
const categories = [
    { id: '1', name: 'Hoodies', image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800', slug: 'hoodies' },
    { id: '2', name: 'T-Shirts', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800', slug: 'tshirts' },
    { id: '3', name: 'Pants', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800', slug: 'pants' },
    { id: '4', name: 'Shorts', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=800', slug: 'shorts' },
    { id: '5', name: 'Shirts', image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?w=800', slug: 'shirts' },
    { id: '6', name: 'Accs', image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=800', slug: 'accessories' },
];

function Home() {
    const scrollContainerRef = useRef(null);
    const displayedProducts = products.slice(0, 4); // Standard grid of 4

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const handleWheel = (e) => {
            if (e.deltaY !== 0) {
                e.preventDefault();
                container.scrollLeft += e.deltaY;
            }
        };

        container.addEventListener('wheel', handleWheel);
        return () => container.removeEventListener('wheel', handleWheel);
    }, []);

    return (
        <div className="bg-void min-h-screen text-star overflow-hidden">

            {/* 1. Hero Section - Misty Landscape */}
            <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-gray-900">
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src="/hero-mist.png"
                        alt="Background"
                        className="w-full h-full object-cover"
                    />
                    {/* Subtle overlay to ensure text readability */}
                    <div className="absolute inset-0 bg-black/20" />
                </div>

                {/* Content - White Text */}
                <div className="relative z-10 text-center px-4">
                    <p className="font-tech text-xs md:text-sm uppercase tracking-[0.5em] text-gray-200 mb-6 animate-fade-in-up">
                        Season 2026
                    </p>
                    <h1 className="font-display text-5xl md:text-8xl lg:text-9xl font-bold uppercase leading-[0.85] mb-8 text-white drop-shadow-2xl">
                        New<br />
                        <span className="text-transparent stroke-white" style={{ WebkitTextStroke: '1px white' }}>Collection</span>
                    </h1>

                    <Link
                        to="/shop/new"
                        className="group relative inline-flex items-center gap-4 px-8 py-4 overflow-hidden rounded-full bg-white text-black font-tech font-bold uppercase tracking-widest hover:pl-10 transition-all duration-300 shadow-xl"
                    >
                        <span className="relative z-10">Shop Now</span>
                        <ArrowDownRight className="w-5 h-5 relative z-10 group-hover:rotate-[-45deg] transition-transform" />
                    </Link>
                </div>

                {/* Bottom Fade Gradient - Flawless Transition to White */}
                <div className="absolute bottom-0 w-full h-96 bg-gradient-to-t from-void via-void/60 to-transparent pointer-events-none z-20" />
            </section>

            {/* 2. Categories - "Shop By Category" */}
            <section className="py-24 relative z-10">
                <div className="px-6 mb-12 flex items-end justify-between">
                    <h2 className="font-display text-3xl md:text-4xl">
                        Shop By<br /><span className="text-dust">Category</span>
                    </h2>
                    <span className="font-tech text-xs text-dust hidden md:block">SCROLL TO EXPLORE →</span>
                </div>

                <div
                    ref={scrollContainerRef}
                    className="flex gap-8 overflow-x-auto px-6 pb-12 no-scrollbar cursor-grab active:cursor-grabbing"
                >
                    {categories.map((cat, index) => (
                        <Link
                            key={cat.id}
                            to={`/shop/${cat.slug}`}
                            className="flex-shrink-0 group relative w-[280px] h-[400px] overflow-hidden rounded-none shadow-lg hover:shadow-2xl transition-all duration-500"
                        >
                            <img
                                src={cat.image}
                                alt={cat.name}
                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                            />

                            <div className="absolute bottom-0 left-0 p-6 z-10">
                                <span className="font-display text-4xl text-transparent stroke-star text-outline group-hover:text-star transition-all duration-300">
                                    0{index + 1}
                                </span>
                                <h3 className="font-display text-2xl uppercase mt-2 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 text-star drop-shadow-md bg-white/80 px-2 backdrop-blur-sm">
                                    {cat.name}
                                </h3>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* 3. Product Grid - "New Arrivals" */}
            <section className="px-6 pb-32 max-w-[1920px] mx-auto">
                <div className="flex justify-between items-center mb-12 border-b border-star/10 pb-6">
                    <h2 className="font-display text-3xl uppercase">New Arrivals</h2>
                    <Link to="/shop/all" className="font-tech text-sm text-accent hover:text-star transition-colors">
                        VIEW ALL
                    </Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                    {displayedProducts.map((product) => (
                        <div key={product.id}>
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </section>

        </div>
    );
}

export default Home;
