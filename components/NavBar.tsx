'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import pt from '@/dictionaries/pt.json'
import en from '@/dictionaries/en.json'

export default function Navbar() {
    const pathname = usePathname()
    const currentLocale = pathname.split('/')[1] === 'en' ? 'en' : 'pt'

    const dict = currentLocale === 'pt' ? pt : en

    const newLocale = currentLocale === 'pt' ? 'en' : 'pt'
    const switchedPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`)

    return (
        <>
            <nav className="fixed top-0 left-0 w-full flex gap-6 p-6 z-50 bg-white">
                <Link href={`/${currentLocale}/trabalhos`}>
                    {dict.nav.works}
                </Link>

                <Link href={`/${currentLocale}/sobre`}>
                    {dict.nav.about}
                </Link>
            </nav>

            <Link
                href={switchedPath}
                className="fixed bottom-6 right-6 z-50 border border-black px-4 py-2 bg-white hover:bg-black hover:text-white transition"
            >
                {currentLocale === 'pt' ? 'EN' : 'PT'}
            </Link>
        </>
    )
}