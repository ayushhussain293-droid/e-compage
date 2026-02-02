import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products as allProducts } from '../data/products';

const categoryNames = {
    all: 'All Collections',
    new: 'New Arrivals',
    tshirts: 'T-Shirts',
    hoodies: 'Hoodies',
    shirts: 'Shirts',
    pants: 'Pants & Trousers',
    shorts: 'Shorts',
    accessories: 'Accessories',
};

function Shop() {
    const { category = 'all' } = useParams();
    const [sortBy, setSortBy] = useState('newest');
    const [isSortOpen, setIsSortOpen] = useState(false);

    // Filter products
    let filteredProducts = allProducts.filter((product) => {
        // Category Filter
        if (category !== 'all' && category !== 'new' && category !== 'bestsellers') {
            if (product.category !== category) return false;
        }

        // Mock filtering for 'new' and 'bestsellers' based on badge or id
        if (category === 'new' && product.badge !== 'NEW') return false;
        if (category === 'bestsellers' && product.badge !== 'BESTSELLER') return false;

        return true;
    });

    // Sort Products
    if (sortBy === 'price-low') {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else {
        // newest - default order
        filteredProducts.sort((a, b) => b.id - a.id);
    }

    return (
        <div className="min-h-screen bg-void pt-24 pb-20">
            {/* Minimal Header */}
            <div className="max-w-[1920px] mx-auto px-6 mb-12">
                <h1 className="font-display text-4xl md:text-6xl font-bold uppercase text-star mb-4">
                    {categoryNames[category] || 'Collection'}
                </h1>
            </div>

            <div className="max-w-[1920px] mx-auto px-6">
                {/* Main Content - Full Width */}
                <div className="w-full">
                    {/* Toolbar */}
                    <div className="flex justify-between items-start mb-8 lg:mb-12 border-b border-dust/20 pb-4">
                        <p className="font-tech text-dust text-sm tracking-widest hidden md:block">
                            {filteredProducts.length} ITEMS DETECTED
                        </p>

                        {/* Sort */}
                        <div className="relative ml-auto">
                            <button
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className="flex items-center gap-2 text-star font-tech text-sm uppercase tracking-widest hover:text-accent transition-colors"
                            >
                                Sort
                                <ChevronDown className={`w-4 h-4 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
                            </button>
                            {isSortOpen && (
                                <div className="absolute top-full right-0 mt-2 w-48 bg-void border border-gray-200 z-20 shadow-xl">
                                    {[
                                        { value: 'newest', label: 'Newest' },
                                        { value: 'price-low', label: 'Price: Low to High' },
                                        { value: 'price-high', label: 'Price: High to Low' },
                                    ].map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => {
                                                setSortBy(option.value);
                                                setIsSortOpen(false);
                                            }}
                                            className="block w-full text-left px-4 py-3 text-sm text-dust hover:text-star hover:bg-gray-50 transition-colors font-tech"
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>

                    {filteredProducts.length === 0 && (
                        <div className="py-20 text-center text-dust font-tech">
                            No items found in this collection.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Shop;
