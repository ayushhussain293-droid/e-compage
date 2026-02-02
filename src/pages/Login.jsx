import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const { error } = await signIn(email, password);
            if (error) throw error;
            navigate('/'); // Redirect to home on success
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-void flex items-center justify-center px-6">
            <div className="w-full max-w-md">

                <div className="text-center mb-12">
                    <Link to="/" className="font-display text-4xl text-star">NEXVEL</Link>
                    <p className="font-tech text-dust text-sm tracking-widest mt-2 uppercase">Welcome Back</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 font-tech text-sm flex items-center gap-2">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block font-tech text-xs text-dust uppercase tracking-widest mb-2">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-gray-50 border border-gray-200 p-4 text-star font-tech focus:border-accent focus:outline-none transition-colors"
                            placeholder="name@example.com"
                            required
                        />
                    </div>

                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label className="font-tech text-xs text-dust uppercase tracking-widest">Password</label>
                            <Link to="#" className="text-xs text-dust hover:text-black transition-colors">Forgot Password?</Link>
                        </div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                        {loading ? 'Signing In...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
                    </button>
                </form>

                <div className="mt-8 text-center">
                    <p className="font-tech text-sm text-dust">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-star hover:text-accent underline decoration-1 underline-offset-4">
                            Create Account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
