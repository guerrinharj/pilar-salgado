'use client'

import { useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { signIn } from '@/lib/supabase/auth'

export default function LoginPage() {
    const router = useRouter()
    const params = useParams()

    const locale = params.locale === 'en'
        ? 'en'
        : 'pt'

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setErrorMessage('')

        const { error } = await signIn(email, password)

        if (error) {
            setErrorMessage('E-mail ou senha inválidos.')
            return
        }

        router.push(`/${locale}/trabalhos`)
    }

    return (
        <main className="min-h-screen flex items-center justify-center px-6">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md flex flex-col gap-6"
            >
                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="border border-black px-4 py-3 bg-transparent outline-none"
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="border border-black px-4 py-3 bg-transparent outline-none"
                />

                {errorMessage && (
                    <p className="text-sm">
                        {errorMessage}
                    </p>
                )}

                <button
                    type="submit"
                    className="border border-black px-4 py-3 hover:bg-black hover:text-white transition"
                >
                    Entrar
                </button>
            </form>
        </main>
    )
}