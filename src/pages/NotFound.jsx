import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

function NotFound() {
    return (
        <div className="min-h-screen bg-void text-star flex flex-col items-center justify-center px-4">
            <h1 className="font-display text-[12rem] md:text-[16rem] font-bold leading-none text-outline opacity-20 select-none">
                404
            </h1>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="font-tech text-xl md:text-2xl text-accent uppercase tracking-[0.5em] mb-4 animate-pulse">
                    Signal Lost
                </p>
                <p className="text-dust font-tech mb-12 text-center max-w-md">
                    The page you are looking for has drifted into deep space.
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 bg-star text-void px-8 py-4 font-display uppercase tracking-wider hover:bg-accent hover:text-white transition-all duration-300"
                    >
                        <Home className="w-5 h-5" />
                        Return to Base
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;
