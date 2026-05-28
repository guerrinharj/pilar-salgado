'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'

type Props = {
    locale: 'pt' | 'en'
    slug: string
}

export default function EditWorkButton({
    locale,
    slug,
}: Props) {
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

    if (!isLoggedIn) {
        return null
    }

    return (
        <Link
            href={`/${locale}/trabalhos/${slug}/editar`}
            className="
                text-blue-500
                underline
                hover:text-orange-500
                transition
                w-fit
            "
        >
            {locale === 'pt'
                ? 'Editar'
                : 'Edit'}
        </Link>
    )
}