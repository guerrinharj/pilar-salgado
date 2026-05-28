'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

type Props = {
    locale: 'pt' | 'en'
    workId: string
}

export default function DeleteWorkButton({
    locale,
    workId,
}: Props) {
    const router = useRouter()
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        async function checkUser() {
            const { data } = await supabase.auth.getUser()
            setIsLoggedIn(!!data.user)
        }

        checkUser()

        const { data: listener } =
            supabase.auth.onAuthStateChange((_event, session) => {
                setIsLoggedIn(!!session?.user)
            })

        return () => {
            listener.subscription.unsubscribe()
        }
    }, [])

    async function handleDelete() {
        const confirmed = window.confirm(
            locale === 'pt'
                ? 'Tem certeza que deseja deletar este trabalho?'
                : 'Are you sure you want to delete this work?'
        )

        if (!confirmed) {
            return
        }

        setIsDeleting(true)

        const { error } = await supabase
            .from('works')
            .delete()
            .eq('id', workId)

        if (error) {
            alert(error.message)
            setIsDeleting(false)
            return
        }

        router.push(`/${locale}/trabalhos`)
        router.refresh()
    }

    if (!isLoggedIn) {
        return null
    }

    return (
        <button
            type="button"
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-red-500 underline hover:text-orange-500 transition disabled:opacity-50"
        >
            {isDeleting
                ? locale === 'pt'
                    ? 'Deletando...'
                    : 'Deleting...'
                : locale === 'pt'
                    ? 'Deletar'
                    : 'Delete'}
        </button>
    )
}