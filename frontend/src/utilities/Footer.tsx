import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="hidden lg:flex flex-row justify-evenly py-16 px-8 bg-palette-neutral text-palette-accent">
            <div className="flex flex-col gap-y-8">
                <div className="grid grid-cols-3 gap-x-8">
                    <Link to="#">Contact</Link>
                    <Link to="#">Affiliate Program</Link>
                    <Link to="#">FAQ</Link>
                    <Link to="#">Terms of Use</Link>
                    <Link to="#">Privacy Policy</Link>
                    <Link to="#">Return Policy</Link>
                </div>
                <p>©2024 FRAGNIFIQUE. All rights reserved.</p>
            </div>
            <div className="flex flex-col gap-y-8">
                <div className="newsletter">
                    <Link to="#">NEWSLETTER SIGN UP <span className="p-8">&#8594;</span></Link>
                </div>
                <hr />
                <div className="flex flex-row justify-between gap-x-8">
                    <Link to="#">Instagram</Link>
                    <Link to="#">Facebook</Link>
                    <Link to="#">Twitter</Link>
                </div>
            </div>
        </footer>
    )
}
