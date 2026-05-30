'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Locale } from '@/lib/dictionaries'

type Credit = {
    role: string
    name: string
}

type Work = {
    id: string
    nome_pt: string
    nome_en: string | null
    slug: string
    ano: string | null
    cliente: string | null
    categoria_pt: string | null
    categoria_en: string | null
    thumbnail: string | null
    images: string[] | null
    videos: string[] | null
    creditos_pt: Credit[] | null
    creditos_en: Credit[] | null
    ranking: number | null
}

type Props = {
    locale: Locale
    work: Work
}

export default function EditWorkForm({ locale, work }: Props) {
    const router = useRouter()

    const [nomePt, setNomePt] = useState(work.nome_pt)
    const [nomeEn, setNomeEn] = useState(work.nome_en || '')
    const [cliente, setCliente] = useState(work.cliente || '')
    const [categoriaPt, setCategoriaPt] = useState(work.categoria_pt || '')
    const [categoriaEn, setCategoriaEn] = useState(work.categoria_en || '')
    const [ano, setAno] = useState(work.ano || '')
    const [creditosPt, setCreditosPt] = useState(formatCredits(work.creditos_pt))
    const [creditosEn, setCreditosEn] = useState(formatCredits(work.creditos_en))
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
    const [imageFiles, setImageFiles] = useState<FileList | null>(null)
    const [videoFiles, setVideoFiles] = useState<FileList | null>(null)
    const [errorMessage, setErrorMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [ranking, setRanking] = useState(work.ranking?.toString() || '')

    function formatCredits(credits: Credit[] | null) {
        if (!credits) {
            return ''
        }

        return credits
            .map((credit) => `${credit.role}: ${credit.name}`)
            .join('\n')
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

    async function uploadFile(file: File, path: string) {
        const { error } = await supabase.storage
            .from('work-images')
            .upload(path, file, {
                upsert: true,
                contentType: file.type,
            })

        if (error) {
            throw error
        }

        const { data } = supabase.storage
            .from('work-images')
            .getPublicUrl(path)

        return data.publicUrl
    }

    async function uploadFiles(files: FileList | null, folder: string) {
        if (!files) {
            return []
        }

        const urls: string[] = []

        for (const file of Array.from(files)) {
            const extension = file.name.split('.').pop()
            const fileName = `${crypto.randomUUID()}.${extension}`
            const path = `${folder}/${fileName}`
            const publicUrl = await uploadFile(file, path)

            urls.push(publicUrl)
        }

        return urls
    }

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault()

        setErrorMessage('')
        setIsSubmitting(true)

        try {
            let thumbnailUrl = work.thumbnail || ''

            if (thumbnailFile) {
                const extension = thumbnailFile.name.split('.').pop()
                const path = `trabalhos/${work.slug}/thumbnail.${extension}`

                thumbnailUrl = await uploadFile(thumbnailFile, path)
            }

            const newImageUrls = await uploadFiles(
                imageFiles,
                `trabalhos/${work.slug}/images`
            )

            const newVideoUrls = await uploadFiles(
                videoFiles,
                `trabalhos/${work.slug}/videos`
            )

            const { error } = await supabase
                .from('works')
                .update({
                    nome_pt: nomePt,
                    nome_en: nomeEn,
                    cliente,
                    categoria_pt: categoriaPt,
                    categoria_en: categoriaEn,
                    ranking: ranking ? Number(ranking) : null,
                    ano,
                    thumbnail: thumbnailUrl,
                    images: [
                        ...(work.images || []),
                        ...newImageUrls,
                    ],
                    videos: [
                        ...(work.videos || []),
                        ...newVideoUrls,
                    ],
                    creditos_pt: parseCredits(creditosPt),
                    creditos_en: parseCredits(creditosEn),
                    updated_at: new Date().toISOString(),
                })
                .eq('id', work.id)

            if (error) {
                throw error
            }

            router.push(`/${locale}/trabalhos/${work.slug}`)
            router.refresh()
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message)
            } else {
                setErrorMessage('Erro ao editar trabalho.')
            }
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-3xl flex flex-col gap-6"
        >
            <h1 className="text-4xl uppercase">
                {locale === 'pt' ? 'Editar trabalho' : 'Edit work'}
            </h1>

            <input
                value={nomePt}
                onChange={(event) => setNomePt(event.target.value)}
                placeholder="Nome PT"
                className="border border-white px-4 py-3 bg-transparent"
                required
            />

            <input
                value={nomeEn}
                onChange={(event) => setNomeEn(event.target.value)}
                placeholder="Nome EN"
                className="border border-white px-4 py-3 bg-transparent"
            />

            <input
                value={cliente}
                onChange={(event) => setCliente(event.target.value)}
                placeholder={locale === 'pt' ? 'Cliente' : 'Client'}
                className="border border-white px-4 py-3 bg-transparent"
            />

            <input
                value={categoriaPt}
                onChange={(event) => setCategoriaPt(event.target.value)}
                placeholder="Categoria PT"
                className="border border-white px-4 py-3 bg-transparent"
            />

            <input
                value={categoriaEn}
                onChange={(event) => setCategoriaEn(event.target.value)}
                placeholder="Category EN"
                className="border border-white px-4 py-3 bg-transparent"
            />

            <input
                value={ano}
                onChange={(event) => setAno(event.target.value)}
                placeholder={locale === 'pt' ? 'Ano' : 'Year'}
                className="border border-white px-4 py-3 bg-transparent"
            />

            <textarea
                value={creditosPt}
                onChange={(event) => setCreditosPt(event.target.value)}
                placeholder="Créditos PT. Ex: Direção: Nome"
                className="border border-white px-4 py-3 bg-transparent min-h-32"
            />

            <textarea
                value={creditosEn}
                onChange={(event) => setCreditosEn(event.target.value)}
                placeholder="Credits EN. Ex: Director: Name"
                className="border border-white px-4 py-3 bg-transparent min-h-32"
            />

            <input
                type="number"
                value={ranking}
                onChange={(event) => setRanking(event.target.value)}
                placeholder={locale === 'pt' ? 'Ranking' : 'Ranking'}
                className="border border-white px-4 py-3 bg-transparent"
            />

            <div className="flex flex-col gap-2">
                <label>
                    {locale === 'pt' ? 'Substituir thumbnail' : 'Replace thumbnail'}
                </label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                        setThumbnailFile(event.target.files?.[0] ?? null)
                    }
                    className="border border-white px-4 py-3 bg-transparent"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label>
                    {locale === 'pt' ? 'Adicionar imagens' : 'Add images'}
                </label>

                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(event) => setImageFiles(event.target.files)}
                    className="border border-white px-4 py-3 bg-transparent"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label>
                    {locale === 'pt' ? 'Adicionar vídeos' : 'Add videos'}
                </label>

                <input
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={(event) => setVideoFiles(event.target.files)}
                    className="border border-white px-4 py-3 bg-transparent"
                />
            </div>

            {errorMessage && (
                <p className="text-red-500">
                    {errorMessage}
                </p>
            )}

            <button
                type="submit"
                disabled={isSubmitting}
                className="border border-white px-4 py-3 hover:bg-black hover:text-white transition disabled:opacity-50"
            >
                {isSubmitting
                    ? locale === 'pt'
                        ? 'Salvando...'
                        : 'Saving...'
                    : locale === 'pt'
                        ? 'Salvar alterações'
                        : 'Save changes'}
            </button>
        </form>
    )
}