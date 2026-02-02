import { Link } from 'react-router-dom';

function Shipping() {
    return (
        <div className="min-h-screen bg-void pt-32 pb-20 px-6">
            <div className="max-w-3xl mx-auto text-star">
                <h1 className="font-display text-4xl md:text-6xl uppercase mb-12">Shipping Policy</h1>

                <div className="space-y-12 font-tech text-sm leading-relaxed text-dust">
                    <section>
                        <h2 className="text-white text-lg uppercase tracking-widest mb-4">01. Processing Time</h2>
                        <p>Orders are processed within 24 hours of purchase. You will receive a tracking link via email once your order is shipped.</p>
                    </section>

                    <section>
                        <h2 className="text-white text-lg uppercase tracking-widest mb-4">02. Delivery Times</h2>
                        <ul className="list-disc pl-4 space-y-2">
                            <li>Domestic (India): 3-5 business days.</li>
                            <li>International: 7-14 business days.</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-white text-lg uppercase tracking-widest mb-4">03. Returns</h2>
                        <p>Products can be returned within 15 days of delivery. Items must be unworn and in original condition with tags attached.</p>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default Shipping;
