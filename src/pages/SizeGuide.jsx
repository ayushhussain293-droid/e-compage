import { Link } from 'react-router-dom';

function SizeGuide() {
    return (
        <div className="min-h-screen bg-void pt-32 pb-20 px-6">
            <div className="max-w-4xl mx-auto text-star">
                <h1 className="font-display text-4xl md:text-6xl uppercase mb-12">Size Guide</h1>

                <div className="space-y-16">
                    {/* Tops Table */}
                    <section>
                        <h2 className="font-tech text-accent text-sm uppercase tracking-widest mb-8">Tops (Inches)</h2>
                        <div className="overflow-x-auto border border-white/10">
                            <table className="w-full text-left font-tech text-sm">
                                <thead>
                                    <tr className="bg-white/5 border-b border-white/10 text-dust uppercase tracking-widest text-xs">
                                        <th className="p-4">Size</th>
                                        <th className="p-4">Chest</th>
                                        <th className="p-4">Length</th>
                                        <th className="p-4">Shoulder</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10 text-star">
                                    <tr><td className="p-4">S</td><td className="p-4">44</td><td className="p-4">28</td><td className="p-4">22</td></tr>
                                    <tr><td className="p-4">M</td><td className="p-4">46</td><td className="p-4">29</td><td className="p-4">23</td></tr>
                                    <tr><td className="p-4">L</td><td className="p-4">48</td><td className="p-4">30</td><td className="p-4">24</td></tr>
                                    <tr><td className="p-4">XL</td><td className="p-4">50</td><td className="p-4">31</td><td className="p-4">25</td></tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="mt-4 text-dust font-tech text-xs">* Oversized fit. Size down for standard fit.</p>
                    </section>

                    {/* Bottoms Table */}
                    <section>
                        <h2 className="font-tech text-accent text-sm uppercase tracking-widest mb-8">Bottoms (Inches)</h2>
                        <div className="overflow-x-auto border border-white/10">
                            <table className="w-full text-left font-tech text-sm">
                                <thead>
                                    <tr className="bg-white/5 border-b border-white/10 text-dust uppercase tracking-widest text-xs">
                                        <th className="p-4">Size</th>
                                        <th className="p-4">Waist</th>
                                        <th className="p-4">Length</th>
                                        <th className="p-4">Thigh</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-white/10 text-star">
                                    <tr><td className="p-4">30</td><td className="p-4">30</td><td className="p-4">40</td><td className="p-4">24</td></tr>
                                    <tr><td className="p-4">32</td><td className="p-4">32</td><td className="p-4">41</td><td className="p-4">25</td></tr>
                                    <tr><td className="p-4">34</td><td className="p-4">34</td><td className="p-4">42</td><td className="p-4">26</td></tr>
                                    <tr><td className="p-4">36</td><td className="p-4">36</td><td className="p-4">42</td><td className="p-4">27</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
}

export default SizeGuide;
