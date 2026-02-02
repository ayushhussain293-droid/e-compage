import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { products } from '../data/products';

function ProductDetail() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    const [selectedImage, setSelectedImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState('');
    const [isWishlisted, setIsWishlisted] = useState(false);

    useEffect(() => {
        // Simulate lookup
        const found = products.find(p => p.slug === slug);
        setProduct(found);
        setLoading(false);
    }, [slug]);

    if (loading) return <div className="min-h-screen bg-void flex items-center justify-center text-star font-tech">LOADING...</div>;

    if (!product) return (
        <div className="min-h-screen bg-void flex items-center justify-center flex-col gap-4 text-star">
            <h1 className="font-display text-4xl">PRODUCT NOT FOUND</h1>
            <Link to="/shop/all" className="text-accent underline font-tech">RETURN TO SHOP</Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-void pt-20 text-star">
            <div className="grid lg:grid-cols-2 min-h-screen">

                {/* Gallery */}
                <div className="lg:h-screen lg:sticky lg:top-0 overflow-hidden bg-void relative group">
                    <div className="relative h-[60vh] lg:h-full w-full">
                        <img
                            src={selectedImage === 0 ? product.image : product.hoverImage}
                            alt={product.name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                        {/* Gallery Controls */}
                        <div className="absolute bottom-8 left-8 flex gap-4">
                            <button
                                onClick={() => setSelectedImage(0)}
                                className={`w-12 h-1 rounded-full transition-all ${selectedImage === 0 ? 'bg-star' : 'bg-black/30'}`}
                            />
                            <button
                                onClick={() => setSelectedImage(1)}
                                className={`w-12 h-1 rounded-full transition-all ${selectedImage === 1 ? 'bg-star' : 'bg-black/30'}`}
                            />
                        </div>
                    </div>
                </div>

                {/* Product Info */}
                <div className="px-6 py-12 lg:px-20 lg:py-32 flex flex-col justify-center bg-void">
                    <div className="max-w-xl">
                        <nav className="mb-12 flex items-center gap-2 text-xs font-tech text-dust tracking-widest uppercase">
                            <Link to="/" className="hover:text-star transition-colors">Home</Link> /
                            <Link to="/shop/all" className="hover:text-star transition-colors">Shop</Link> /
                            <span className="text-star">{product.name}</span>
                        </nav>

                        <h1 className="font-display text-4xl md:text-6xl font-bold uppercase leading-[0.9] mb-4">
                            {product.name}
                        </h1>

                        <p className="text-2xl font-tech text-accent mb-8">₹{product.price.toLocaleString()}</p>

                        <p className="text-dust leading-relaxed mb-12 border-l-2 border-star/10 pl-6">
                            {product.description}
                        </p>

                        <div className="space-y-8 mb-12">
                            <div>
                                <div className="flex justify-between mb-4">
                                    <span className="font-tech text-xs uppercase tracking-widest">Select Size</span>
                                    <button className="font-tech text-xs uppercase tracking-widest underline decoration-dust text-dust hover:text-star">Size Guide</button>
                                </div>
                                <div className="grid grid-cols-6 gap-2">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`aspect-square flex items-center justify-center font-tech text-sm border transition-all ${selectedSize === size
                                                    ? 'border-star bg-star text-void'
                                                    : 'border-star/20 text-dust hover:border-star/50'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-4">
                            <button className="flex-1 bg-accent text-white h-14 font-tech uppercase tracking-widest text-sm font-bold hover:bg-star hover:text-void transition-colors duration-300">
                                Add to Cart
                            </button>
                            <button
                                onClick={() => setIsWishlisted(!isWishlisted)}
                                className="w-14 h-14 border border-star/20 flex items-center justify-center hover:border-star transition-colors"
                            >
                                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-star'}`} />
                            </button>
                        </div>

                        <div className="mt-12 pt-12 border-t border-star/10 grid grid-cols-2 gap-8">
                            <div>
                                <h4 className="font-tech text-xs uppercase tracking-widest text-dust mb-2">Details</h4>
                                <ul className="text-sm text-star space-y-1">
                                    <li>100% Premium Material</li>
                                    <li>High quality construction</li>
                                    <li>Designed for comfort</li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="font-tech text-xs uppercase tracking-widest text-dust mb-2">Shipping</h4>
                                <p className="text-sm text-star">Free shipping on orders over ₹1500. Returns accepted within 15 days.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
