import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';

function ProductCard({ product, variant = 'default', className = '' }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className={`group relative ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <Link to={`/product/${product.slug}`} className="block relative overflow-hidden bg-white">
                {/* Minimal Badge */}
                {product.badge && (
                    <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${product.badge === 'SALE' ? 'bg-red-500 shadow-sm' : 'bg-accent shadow-sm'}`} />
                        <span className="text-[10px] font-tech uppercase tracking-widest text-black opacity-80 bg-white/50 backdrop-blur-sm px-2 py-0.5 rounded-full">
                            {product.badge}
                        </span>
                    </div>
                )}

                {/* Image - Full Bleed, Clean */}
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                    <img
                        src={isHovered && product.hoverImage ? product.hoverImage : product.image}
                        alt={product.name}
                        className={`w-full h-full object-cover transition-all duration-700 ease-out ${isHovered ? 'scale-105' : 'scale-100'
                            }`}
                    />
                    {/* No Gradient Overlay */}
                </div>

                {/* Floating Action Button (Appears on Hover) */}
                <button
                    className={`absolute bottom-4 right-4 z-20 bg-black text-white p-3 rounded-full transform transition-all duration-500 cubic-bezier(0.19, 1, 0.22, 1) shadow-xl ${isHovered ? 'translate-y-0 opacity-100 rotate-0' : 'translate-y-8 opacity-0 rotate-90'
                        }`}
                >
                    <Plus className="w-5 h-5" />
                </button>
            </Link>

            {/* Info - Minimal Ghost Style */}
            <div className="mt-4 flex flex-col items-start gap-1">
                <Link
                    to={`/product/${product.slug}`}
                    className="font-display text-lg text-black leading-tight hover:text-accent transition-colors duration-300"
                >
                    {product.name}
                </Link>

                <div className="flex items-center gap-3 font-tech text-xs tracking-widest text-gray-500">
                    <span>{product.subtitle || 'UNISEX'}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span className={product.originalPrice ? 'text-red-500 font-bold' : 'text-black font-medium'}>
                        ₹{product.price.toLocaleString()}
                    </span>
                </div>
            </div>
        </div>
    );
}

export default ProductCard;
