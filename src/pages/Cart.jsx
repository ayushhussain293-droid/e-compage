import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ArrowRight } from 'lucide-react';

// Mock cart data
const initialCartItems = [
    { id: 1, name: 'Oversized Street Tee', price: 1499, image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400', size: 'L', color: 'Black', quantity: 2, slug: 'oversized-street-tee' },
    { id: 2, name: 'Classic Black Hoodie', price: 2499, image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400', size: 'M', color: 'Black', quantity: 1, slug: 'classic-black-hoodie' },
];

function Cart() {
    const [cartItems, setCartItems] = useState(initialCartItems);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="min-h-screen bg-void pt-32 pb-20 text-star">
            <div className="max-w-6xl mx-auto px-6">
                <h1 className="font-display text-4xl mb-12 uppercase">Your Selection</h1>

                <div className="grid lg:grid-cols-3 gap-16">
                    {/* Items */}
                    <div className="lg:col-span-2 space-y-8">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-6 pb-8 border-b border-gray-200 group">
                                <Link to={`/product/${item.slug}`} className="w-32 aspect-[3/4] bg-gray-100 flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="w-full h-full object-cover transition-all duration-500" />
                                </Link>

                                <div className="flex-1 flex flex-col justify-between py-2">
                                    <div>
                                        <Link to={`/product/${item.slug}`} className="font-display text-xl uppercase mb-2 block hover:text-accent transition-colors">{item.name}</Link>
                                        <p className="font-tech text-sm text-dust">Size: {item.size} / {item.color}</p>
                                    </div>

                                    <div className="flex justify-between items-end">
                                        <div className="flex items-center gap-4 border border-gray-200 p-1">
                                            <button className="p-2 hover:bg-gray-100"><Minus className="w-3 h-3" /></button>
                                            <span className="font-tech text-sm min-w-[1rem] text-center">{item.quantity}</span>
                                            <button className="p-2 hover:bg-gray-100"><Plus className="w-3 h-3" /></button>
                                        </div>
                                        <p className="font-tech text-lg">₹{(item.price * item.quantity).toLocaleString()}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-50 p-8 border border-gray-200 sticky top-32">
                            <h2 className="font-display text-xl uppercase mb-8">Summary</h2>

                            <div className="space-y-4 mb-8 font-tech text-sm">
                                <div className="flex justify-between text-dust">
                                    <span>Subtotal</span>
                                    <span className="text-star">₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between text-dust">
                                    <span>Shipping</span>
                                    <span className="text-star">Calculated at checkout</span>
                                </div>
                            </div>

                            <div className="flex justify-between font-display text-xl border-t border-gray-200 pt-6 mb-8">
                                <span>Total</span>
                                <span>₹{subtotal.toLocaleString()}</span>
                            </div>

                            <button className="w-full bg-star text-void py-4 font-tech uppercase tracking-widest font-bold hover:bg-accent hover:text-white transition-colors duration-300">
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
