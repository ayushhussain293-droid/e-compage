import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

function Cart() {
    const { cartItems, updateQuantity, removeFromCart, cartCount } = useCart();
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="min-h-screen bg-void pt-32 pb-20 text-star">
            <div className="max-w-6xl mx-auto px-6">
                <h1 className="font-display text-4xl mb-12 uppercase">Your Selection ({cartCount})</h1>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20 border border-dashed border-gray-200">
                        <p className="font-tech text-dust tracking-widest uppercase mb-6">Orbit is empty</p>
                        <Link to="/shop/all" className="inline-block border-b border-star pb-1 hover:text-accent font-tech uppercase text-sm">
                            Initialize Supply Run
                        </Link>
                    </div>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-16">
                        {/* Items */}
                        <div className="lg:col-span-2 space-y-8">
                            {cartItems.map((item) => (
                                <div key={`${item.id}-${item.size}`} className="flex gap-6 pb-8 border-b border-gray-200 group">
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
                                                <button
                                                    onClick={() => {
                                                        if (item.quantity === 1) removeFromCart(item.id, item.size);
                                                        else updateQuantity(item.id, item.size, -1);
                                                    }}
                                                    className="p-2 hover:bg-gray-100"
                                                >
                                                    <Minus className="w-3 h-3" />
                                                </button>
                                                <span className="font-tech text-sm min-w-[1rem] text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.size, 1)}
                                                    className="p-2 hover:bg-gray-100"
                                                >
                                                    <Plus className="w-3 h-3" />
                                                </button>
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

                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="w-full bg-star text-void py-4 font-tech uppercase tracking-widest font-bold hover:bg-accent hover:text-white transition-colors duration-300"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Cart;
