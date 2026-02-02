import { Link } from 'react-router-dom';

function Legal() {
    return (
        <div className="min-h-screen bg-void pt-32 pb-20 px-6">
            <div className="max-w-3xl mx-auto text-star">
                <h1 className="font-display text-4xl md:text-6xl uppercase mb-12">Terms & Privacy</h1>

                <div className="space-y-8 font-tech text-sm leading-relaxed text-dust">
                    <p>By using this website, you agree to the following terms and conditions.</p>

                    <h2 className="text-white text-lg uppercase tracking-widest mt-8 mb-4">01. Intellectual Property</h2>
                    <p>All content on this site is the property of Nexvel Studios. Unauthorized use is prohibited.</p>

                    <h2 className="text-white text-lg uppercase tracking-widest mt-8 mb-4">02. User Conduct</h2>
                    <p>You agree to use this site responsibly and not to disrupt its operation.</p>

                    <div className="h-px bg-white/10 my-12" />

                    <h1 className="font-display text-4xl md:text-6xl uppercase mb-12">Privacy Policy</h1>
                    <p>We respect your privacy. Your personal information is secure and will never be shared with third parties without your consent.</p>
                </div>
            </div>
        </div>
    );
}

export default Legal;
