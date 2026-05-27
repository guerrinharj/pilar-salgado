'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import pt from '@/dictionaries/pt.json'
import en from '@/dictionaries/en.json'
import { supabase } from '@/lib/supabase/client'
import { signOut } from '@/lib/supabase/auth'

export default function Navbar() {
    const pathname = usePathname()
    const router = useRouter()

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

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        async function checkUser() {
            const { data } = await supabase.auth.getUser()
            setIsLoggedIn(!!data.user)
        }

        checkUser()

        const { data: listener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setIsLoggedIn(!!session?.user)
            }
        )

        return () => {
            listener.subscription.unsubscribe()
        }
    }, [])

    async function handleLogout() {
        await signOut()
        setIsLoggedIn(false)
        router.push(`/${currentLocale}/login`)
    }

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
            <nav className="fixed top-0 left-0 w-full flex items-center justify-between p-6 z-50 uppercase">
                <div className="flex gap-6">
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

                    {isLoggedIn && (
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="text-red-400 pb-1 border-b border-transparent hover:border-black transition cursor-pointer"
                        >
                            LOGOUT
                        </button>
                    )}
                </div>

                <Link
                    href={`/${currentLocale}`}
                    className="uppercase"
                >
                    Pilar Salgado
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