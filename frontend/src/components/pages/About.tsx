export default function About() {
    return (
        <div className="min-h-screen bg-palette-background text-palette-neutral py-12 px-4">
            <div className="max-w-3xl mx-auto bg-palette-secondary rounded-2xl shadow-xl p-8 space-y-6">
                <h1 className="text-3xl md:text-4xl font-bold text-center font-heading">
                    🌸 About Fragnifique
                </h1>
                <p className="text-lg leading-relaxed text-center">
                    <strong>Fragnifique</strong> is your one-stop destination for discovering and purchasing premium perfumes. Whether you're a passionate buyer seeking your signature scent or a seller looking to showcase exclusive fragrances, Fragnifique makes it seamless and beautiful.
                </p>
                <div className="border-t border-palette-highlight pt-4 space-y-4">
                    <h2 className="text-2xl font-semibold">💎 Why Fragnifique?</h2>
                    <ul className="list-disc list-inside text-base space-y-2">
                        <li>🚀 Fast and secure perfume marketplace</li>
                        <li>🎨 Sleek and responsive UI for buyers and sellers</li>
                        <li>🧠 Smart filtering and personalized recommendations</li>
                        <li>🛍️ Easy product management for sellers</li>
                        <li>📦 Smooth order tracking & PDF invoices</li>
                    </ul>
                </div>
                <div className="text-center mt-6">
                    <p className="text-sm text-palette-accent italic">
                        Built with passion, elegance, and a hint of sandalwood. 🌿
                    </p>
                </div>
            </div>
        </div>
    );
}

