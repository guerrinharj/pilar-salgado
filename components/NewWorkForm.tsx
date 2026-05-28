'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Locale } from '@/lib/dictionaries'

type Props = {
    locale: Locale
}

export default function NewWorkForm({ locale }: Props) {
    const router = useRouter()

    const [nomePt, setNomePt] = useState('')
    const [nomeEn, setNomeEn] = useState('')
    const [ano, setAno] = useState('')
    const [link, setLink] = useState('')
    const [thumbnail, setThumbnail] = useState('')
    const [images, setImages] = useState('')
    const [creditosPt, setCreditosPt] = useState('')
    const [creditosEn, setCreditosEn] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    function generateSlug(value: string) {
        return value
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)+/g, '')
    }

    function parseCredits(value: string) {
        if (!value.trim()) {
            return []
        }

        return value
            .split('\n')
            .map((line) => {
                const [role, name] = line.split(':')

                return {
                    role: role?.trim(),
                    name: name?.trim(),
                }
            })
            .filter((credit) => credit.role && credit.name)
    }

    function parseImages(value: string) {
        if (!value.trim()) {
            return []
        }

        return value
            .split('\n')
            .map((url) => url.trim())
            .filter(Boolean)
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()
        setErrorMessage('')

        const slug = generateSlug(nomePt)

        const { error } = await supabase
            .from('works')
            .insert({
                nome_pt: nomePt,
                slug,
                ano,
                link,
                thumbnail,
                images: parseImages(images),
                creditos_pt: parseCredits(creditosPt),
                creditos_en: parseCredits(creditosEn),
            })

        if (error) {
            setErrorMessage(error.message)
            return
        }

        router.push(`/${locale}/trabalhos/${slug}`)
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-3xl flex flex-col gap-6"
        >
            <h1 className="text-4xl uppercase">
                {locale === 'pt' ? 'Novo trabalho' : 'New work'}
            </h1>

            <input
                value={nomePt}
                onChange={(event) => setNomePt(event.target.value)}
                placeholder="Nome"
                className="border border-black px-4 py-3 bg-transparent"
                required
            />


            <input
                value={ano}
                onChange={(event) => setAno(event.target.value)}
                placeholder="Ano"
                className="border border-black px-4 py-3 bg-transparent"
            />

            <input
                value={link}
                onChange={(event) => setLink(event.target.value)}
                placeholder="Link"
                className="border border-black px-4 py-3 bg-transparent"
            />

            <input
                value={thumbnail}
                onChange={(event) => setThumbnail(event.target.value)}
                placeholder="Thumbnail URL"
                className="border border-black px-4 py-3 bg-transparent"
            />

            <textarea
                value={images}
                onChange={(event) => setImages(event.target.value)}
                placeholder="Images URLs, uma por linha"
                className="border border-black px-4 py-3 bg-transparent min-h-32"
            />

            <textarea
                value={creditosPt}
                onChange={(event) => setCreditosPt(event.target.value)}
                placeholder="Créditos PT. Ex: Direção: Nome"
                className="border border-black px-4 py-3 bg-transparent min-h-32"
            />

            <textarea
                value={creditosEn}
                onChange={(event) => setCreditosEn(event.target.value)}
                placeholder="Credits EN. Ex: Director: Name"
                className="border border-black px-4 py-3 bg-transparent min-h-32"
            />

            {errorMessage && (
                <p className="text-red-500">
                    {errorMessage}
                </p>
            )}

            <button
                type="submit"
                className="border border-black px-4 py-3 hover:bg-black hover:text-white transition"
            >
                {locale === 'pt' ? 'Criar trabalho' : 'Create work'}
            </button>
        </form>
    )
}