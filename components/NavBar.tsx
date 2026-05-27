import Link from 'next/link'

export default function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full flex gap-6 p-6 z-50 bg-white">
            <Link href="/pt/trabalhos">
                Trabalhos
            </Link>

            <Link href="/pt/sobre">
                Sobre
            </Link>
        </nav>
    )
}