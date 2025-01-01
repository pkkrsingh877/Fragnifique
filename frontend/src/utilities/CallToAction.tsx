import { Link } from "react-router-dom";

export default function CallToAction() {
    return (
        <div>
            {/* CTA Banner Section */}
            <div className="relative w-full h-80 bg-gradient-to-r from-blue-500 to-purple-500 text-white flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
                <div className="relative z-10 text-center p-4">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">Discover the Latest Perfume Collection</h2>
                    <p className="text-lg mb-6">Find your signature scent from our exclusive collection. Limited time offer!</p>
                    <Link
                        to="/products"
                        className="bg-yellow-500 text-black px-6 py-3 text-lg font-semibold rounded-lg shadow-lg hover:bg-yellow-400 transition-all duration-300"
                    >
                        Shop Now
                    </Link>
                </div>
            </div>
        </div >
    );
}
