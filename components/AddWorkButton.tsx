'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export default function AddWorkButton() {
    const pathname = usePathname()
    const locale = pathname.split('/')[1] === 'en' ? 'en' : 'pt'

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

    if (!isLoggedIn) {
        return null
    }

    return (
        <Link
            href={`/${locale}/trabalhos/novo`}
            className="
                fixed
                bottom-6
                left-6
                z-50
                w-12
                h-12
                rounded-full
                border
                border-black
                bg-black
                text-orange-600
                flex
                items-center
                justify-center
                text-3xl
                leading-none
                hover:bg-white
                transition
            "
        >
            +
        </Link>
    )
}