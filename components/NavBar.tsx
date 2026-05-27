'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import pt from '@/dictionaries/pt.json'
import en from '@/dictionaries/en.json'

export default function Navbar() {
    const pathname = usePathname()

    const currentLocale =
        pathname.split('/')[1] === 'en'
            ? 'en'
            : 'pt'

    const dict =
        currentLocale === 'pt'
            ? pt
            : en

    const newLocale =
        currentLocale === 'pt'
            ? 'en'
            : 'pt'

    const switchedPath = pathname.replace(
        `/${currentLocale}`,
        `/${newLocale}`
    )

    const isActive = (path: string) => {
        return pathname === path
    }

    const linkClass = (path: string) => `
        pb-1
        border-b
        transition
        ${
            isActive(path)
                ? 'border-black'
                : 'border-transparent hover:border-black'
        }
    `

    return (
        <>
            <nav className="text-xl fixed top-0 left-0 w-full flex gap-6 p-6 z-50 bg-white uppercase">
                <Link
                    href={`/${currentLocale}/trabalhos`}
                    className={linkClass(`/${currentLocale}/trabalhos`)}
                >
                    {dict.nav.works}
                </Link>

                <Link
                    href={`/${currentLocale}/sobre`}
                    className={linkClass(`/${currentLocale}/sobre`)}
                >
                    {dict.nav.about}
                </Link>
            </nav>

            <Link
                href={switchedPath}
                className="
                    fixed
                    bottom-6
                    right-6
                    z-50
                    border
                    border-black
                    px-4
                    py-2
                    bg-white
                    hover:bg-black
                    hover:text-white
                    transition
                "
            >
                {currentLocale === 'pt'
                    ? 'EN'
                    : 'PT'}
            </Link>
        </>
    )
}