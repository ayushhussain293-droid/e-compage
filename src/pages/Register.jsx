import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Register() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false); // New success state
    const [loading, setLoading] = useState(false);

    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { error: authError, data } = await signUp(formData.email, formData.password, {
                full_name: formData.name
            });
            if (authError) throw authError;

            // Check if session was created immediately (meaning email confirmation is OFF)
            if (data?.session) {
                navigate('/');
            } else {
                // Email confirmation is ON (default)
                setSuccess(true);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen bg-void flex items-center justify-center px-6 py-20">
                <div className="w-full max-w-md text-center">
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
                    <h2 className="font-display text-3xl uppercase mb-4">Check Signal</h2>
                    <p className="font-tech text-dust mb-8">
                        We have sent a confirmation link to video <strong>{formData.email}</strong>.<br />
                        Please verify your frequency to access the orbit.
                    </p>
                    <Link
                        to="/login"
                        className="inline-block px-8 py-4 bg-star text-white font-tech uppercase tracking-widest hover:bg-accent transition-colors"
                    >
                        Proceed to Login
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-void flex items-center justify-center px-6 py-20">
            <div className="w-full max-w-md">

                <div className="text-center mb-12">
                    <Link to="/" className="font-display text-4xl text-star">NEXVEL</Link>
                    <p className="font-tech text-dust text-sm tracking-widest mt-2 uppercase">Create Account</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 font-tech text-sm flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block font-tech text-xs text-dust uppercase tracking-widest mb-2">Full Name</label>
                        <input
                            type="text"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-200 p-4 text-star font-tech focus:border-accent focus:outline-none transition-colors"
                            placeholder="John Doe"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-tech text-xs text-dust uppercase tracking-widest mb-2">Email Address</label>
                        <input
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-200 p-4 text-star font-tech focus:border-accent focus:outline-none transition-colors"
                            placeholder="name@example.com"
                            required
                        />
                    </div>

                    <div>
                        <label className="block font-tech text-xs text-dust uppercase tracking-widest mb-2">Password</label>
                        <input
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full bg-gray-50 border border-gray-200 p-4 text-star font-tech focus:border-accent focus:outline-none transition-colors"
                            placeholder="••••••••"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-star text-void py-4 font-display uppercase tracking-wider hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Creating Account...' : 'Sign Up'} <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="font-tech text-sm text-dust">
                        Already have an account?{' '}
                        <Link to="/login" className="text-star hover:text-accent underline decoration-1 underline-offset-4">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Register;
