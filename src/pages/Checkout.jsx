import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { ArrowRight, Lock } from 'lucide-react';

function Checkout() {
    const { cartItems, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        fullName: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        phone: ''
    });

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 1500 ? 0 : 150; // Mock logic
    const total = subtotal + shipping;

    useEffect(() => {
        if (cartItems.length === 0) {
            navigate('/cart');
        }
    }, [cartItems, navigate]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            alert('Please login to place an order');
            navigate('/login');
            return;
        }

        setLoading(true);

        try {
            // 1. Create Order
            const { data: order, error: orderError } = await supabase
                .from('orders')
                .insert([
                    {
                        user_id: user.id,
                        total_amount: total,
                        status: 'paid', // Assuming payment successful
                        shipping_info: formData // Storing JSON address
                    }
                ])
                .select()
                .single();

            if (orderError) throw orderError;

            // 2. Create Order Items
            const orderItems = cartItems.map(item => ({
                order_id: order.id,
                product_id: item.id,
                quantity: item.quantity,
                price_at_purchase: item.price,
                size: item.size
            }));

            const { error: itemsError } = await supabase
                .from('order_items')
                .insert(orderItems);

            if (itemsError) throw itemsError;

            // 3. Success
            clearCart();
            alert('Order placed successfully! Welcome to the family.');
            navigate('/account'); // Go to order history

        } catch (error) {
            console.error('Checkout error:', error);
            alert('Failed to place order: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-void pt-32 pb-20 px-6">
            <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16">

                {/* Form Section */}
                <div>
                    <h1 className="font-display text-4xl mb-8 uppercase">Secure Checkout</h1>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block font-tech text-xs text-dust uppercase tracking-widest mb-2">Full Name</label>
                            <input
                                required
                                value={formData.fullName}
                                onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                type="text"
                                className="w-full bg-gray-50 border border-gray-200 p-4 text-star font-tech focus:border-accent focus:outline-none"
                            />
                        </div>

                        <div>
                            <label className="block font-tech text-xs text-dust uppercase tracking-widest mb-2">Delivery Address</label>
                            <textarea
                                required
                                value={formData.address}
                                onChange={e => setFormData({ ...formData, address: e.target.value })}
                                rows="3"
                                className="w-full bg-gray-50 border border-gray-200 p-4 text-star font-tech focus:border-accent focus:outline-none"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <label className="block font-tech text-xs text-dust uppercase tracking-widest mb-2">City</label>
                                <input
                                    required
                                    value={formData.city}
                                    onChange={e => setFormData({ ...formData, city: e.target.value })}
                                    type="text"
                                    className="w-full bg-gray-50 border border-gray-200 p-4 text-star font-tech focus:border-accent focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block font-tech text-xs text-dust uppercase tracking-widest mb-2">Postal Code</label>
                                <input
                                    required
                                    value={formData.zipCode}
                                    onChange={e => setFormData({ ...formData, zipCode: e.target.value })}
                                    type="text"
                                    className="w-full bg-gray-50 border border-gray-200 p-4 text-star font-tech focus:border-accent focus:outline-none"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block font-tech text-xs text-dust uppercase tracking-widest mb-2">Phone Number</label>
                            <input
                                required
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                type="tel"
                                className="w-full bg-gray-50 border border-gray-200 p-4 text-star font-tech focus:border-accent focus:outline-none"
                            />
                        </div>

                        <div className="pt-8 border-t border-gray-100">
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-star text-void py-5 font-display text-xl uppercase tracking-widest hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-50"
                            >
                                {loading ? 'Processing...' : 'Confirm Order'} <ArrowRight className="w-5 h-5" />
                            </button>
                            <p className="text-center mt-4 text-xs font-tech text-dust flex items-center justify-center gap-2">
                                <Lock className="w-3 h-3" /> Encrypted Transaction. Payment Assumed Complete.
                            </p>
                        </div>
                    </form>
                </div>

                {/* Order Summary */}
                <div className="bg-gray-50 p-8 h-fit sticky top-32 border border-gray-200">
                    <h2 className="font-display text-xl uppercase mb-8">Order Summary</h2>
                    <div className="space-y-6 mb-8">
                        {cartItems.map(item => (
                            <div key={`${item.id}-${item.size}`} className="flex gap-4">
                                <img src={item.image} alt={item.name} className="w-16 h-20 object-cover bg-gray-200" />
                                <div>
                                    <p className="font-display text-sm uppercase">{item.name}</p>
                                    <p className="font-tech text-xs text-dust">Qty: {item.quantity} | {item.size}</p>
                                    <p className="font-tech text-sm">₹{item.price.toLocaleString()}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t border-gray-200 pt-6 space-y-3 font-tech text-sm">
                        <div className="flex justify-between">
                            <span className="text-dust">Subtotal</span>
                            <span>₹{subtotal.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-dust">Shipping</span>
                            <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                        </div>
                        <div className="flex justify-between font-display text-xl pt-4 border-t border-gray-200">
                            <span>Total</span>
                            <span>₹{total.toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Checkout;
