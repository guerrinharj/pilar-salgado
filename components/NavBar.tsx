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
        pathname.split('/')[1] === 'en' ? 'en' : 'pt'

    const dict = currentLocale === 'pt' ? pt : en

    const newLocale =
        currentLocale === 'pt' ? 'en' : 'pt'

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

        const { data: listener } =
            supabase.auth.onAuthStateChange(
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

    const isActive = (path: string) => pathname === path

    const isWorksActive = pathname.startsWith(
        `/${currentLocale}/trabalhos`
    )

    const submenuLinkClass = (path: string) => `
        block
        whitespace-nowrap
        px-4
        py-3
        text-sm
        uppercase
        transition-colors
        ${
            isActive(path)
                ? 'text-orange-500'
                : 'text-black hover:text-orange-500'
        }
    `

    return (
        <>
            <nav className="fixed top-0 left-0 z-50 flex w-full items-center justify-between p-6">
                <div className="flex items-start gap-6">
                    <div className="group relative">
                        <Link
                            href={`/${currentLocale}/trabalhos`}
                            className={`
                                block
                                border-b
                                pb-1
                                transition
                                ${
                                    isWorksActive
                                        ? 'border-orange-500 text-orange-500'
                                        : 'border-transparent hover:border-orange-500 hover:text-orange-500'
                                }
                            `}
                        >
                            {dict.nav.works}
                        </Link>

                        <div
                            className="
                                invisible
                                absolute
                                top-full
                                left-0
                                pt-2
                                opacity-0
                                transition-all
                                duration-200
                                group-hover:visible
                                group-hover:opacity-100
                                group-focus-within:visible
                                group-focus-within:opacity-100
                            "
                        >
                            <div className="flex items-center gap-4 text-sm whitespace-nowrap">
                                <Link
                                    href={`/${currentLocale}/trabalhos/streaming`}
                                    className="transition-colors hover:text-orange-500"
                                >
                                    {dict.nav.streaming}
                                </Link>

                                <span className="text-neutral-400">|</span>

                                <Link
                                    href={`/${currentLocale}/trabalhos/publicidade`}
                                    className="transition-colors hover:text-orange-500"
                                >
                                    {dict.nav.advertising}
                                </Link>
                            </div>
                        </div>
                    </div>

                    {isLoggedIn && (
                        <button
                            type="button"
                            onClick={handleLogout}
                            className="cursor-pointer border-b border-transparent pb-1 text-red-400 transition hover:border-black"
                        >
                            LOGOUT
                        </button>
                    )}
                </div>

                <Link
                    href={`/${currentLocale}`}
                    className="text-2xl uppercase transition hover:border-b hover:text-orange-600"
                >
                    Pilar Salgado
                </Link>
            </nav>

            <Link
                href={switchedPath}
                className="fixed right-6 bottom-6 z-50 border border-white bg-black px-4 py-2 text-white transition hover:bg-orange-500"
            >
                {currentLocale === 'pt' ? 'EN' : 'PT'}
            </Link>
        </>
    )
}