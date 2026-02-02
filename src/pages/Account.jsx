import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Package, LogOut, User as UserIcon } from 'lucide-react';

function Account() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchData = async () => {
            try {
                // Fetch Profile
                const { data: profileData } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single();

                setProfile(profileData);

                // Fetch Orders
                const { data: ordersData } = await supabase
                    .from('orders')
                    .select('*, order_items(*)')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                setOrders(ordersData || []);
            } catch (error) {
                console.error('Error loading account data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user, navigate]);

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    if (loading) return <div className="min-h-screen bg-void flex items-center justify-center text-star">Loading orbit data...</div>;

    return (
        <div className="min-h-screen bg-void pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 border-b border-dust/20 pb-8">
                    <div>
                        <h1 className="font-display text-4xl uppercase text-star mb-2">My Orbit</h1>
                        <p className="font-tech text-dust tracking-widest text-sm">
                            {user?.email}
                        </p>
                    </div>
                    <button
                        onClick={handleSignOut}
                        className="mt-6 md:mt-0 flex items-center gap-2 px-6 py-3 border border-red-200 text-red-600 font-tech text-xs uppercase tracking-widest hover:bg-red-50 transition-colors"
                    >
                        <LogOut className="w-4 h-4" /> Disconnect
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Sidebar / Profile Info */}
                    <div className="space-y-8">
                        <div className="bg-gray-50 p-8 border border-gray-100">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 bg-black text-white flex items-center justify-center rounded-full font-display text-xl">
                                    {(profile?.full_name?.[0] || user?.email?.[0] || 'U').toUpperCase()}
                                </div>
                                <div>
                                    <h3 className="font-display text-lg uppercase">{profile?.full_name || 'Explorer'}</h3>
                                    <p className="font-tech text-xs text-dust">Member since {new Date(user?.created_at).getFullYear()}</p>
                                </div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-sm text-dust font-tech">
                                    <UserIcon className="w-4 h-4" />
                                    Account Details
                                </div>
                                <div className="flex items-center gap-3 text-sm text-dust font-tech">
                                    <Package className="w-4 h-4" />
                                    Order History
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content / Orders */}
                    <div className="md:col-span-2">
                        <h2 className="font-display text-2xl uppercase text-star mb-8">Recent Transmissions</h2>

                        {orders.length === 0 ? (
                            <div className="text-center py-20 bg-gray-50 border border-dashed border-gray-200">
                                <Package className="w-12 h-12 text-dust mx-auto mb-4 opacity-50" />
                                <p className="font-tech text-dust text-sm tracking-widest uppercase">No orders found</p>
                                <button
                                    onClick={() => navigate('/shop/all')}
                                    className="mt-6 font-tech text-xs uppercase border-b border-star pb-1 hover:text-accent hover:border-accent transition-colors"
                                >
                                    Initiate Supply Run
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {orders.map((order) => (
                                    <div key={order.id} className="border border-gray-200 p-6 hover:shadow-lg transition-shadow bg-white">
                                        <div className="flex justify-between items-start mb-6">
                                            <div>
                                                <p className="font-display text-lg mb-1">Order #{order.id}</p>
                                                <p className="font-tech text-xs text-dust">
                                                    {new Date(order.created_at).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <span className={`px-3 py-1 text-xs font-bold font-tech uppercase tracking-wider ${order.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                                }`}>
                                                {order.status}
                                            </span>
                                        </div>
                                        <div className="border-t border-gray-100 pt-4 flex justify-between items-center">
                                            <p className="font-tech text-xs text-dust">{order.order_items?.length || 0} Items</p>
                                            <p className="font-display text-xl text-star">₹{order.total_amount}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
