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
    const [cliente, setCliente] = useState('')
    const [ano, setAno] = useState('')
    const [categoriaPt, setCategoriaPt] = useState('')
    const [categoriaEn, setCategoriaEn] = useState('')
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
    const [imageFiles, setImageFiles] = useState<FileList | null>(null)
    const [videoFiles, setVideoFiles] = useState<FileList | null>(null)
    const [creditosPt, setCreditosPt] = useState('')
    const [creditosEn, setCreditosEn] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

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

    async function uploadFile(file: File, path: string) {
        const { error } = await supabase.storage
            .from('work-images')
            .upload(path, file, {
                upsert: true,
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
            const slug = generateSlug(nomePt)

            let thumbnailUrl = ''

            if (thumbnailFile) {
                const extension = thumbnailFile.name.split('.').pop()
                const path = `trabalhos/${slug}/thumbnail.${extension}`

                thumbnailUrl = await uploadFile(thumbnailFile, path)
            }

            const imageUrls = await uploadFiles(
                imageFiles,
                `trabalhos/${slug}/images`
            )

            const videoUrls = await uploadFiles(
                videoFiles,
                `trabalhos/${slug}/videos`
            )

            const { error } = await supabase
                .from('works')
                .insert({
                    nome_pt: nomePt,
                    nome_en: nomeEn,
                    slug,
                    ano,
                    categoria_pt: categoriaPt,
                    categoria_en: categoriaEn,
                    cliente,
                    thumbnail: thumbnailUrl,
                    images: imageUrls,
                    videos: videoUrls,
                    creditos_pt: parseCredits(creditosPt),
                    creditos_en: parseCredits(creditosEn),
                })

            if (error) {
                throw error
            }

            router.push(`/${locale}/trabalhos/${slug}`)
        } catch (error) {
            if (error instanceof Error) {
                setErrorMessage(error.message)
            } else {
                setErrorMessage('Erro ao criar trabalho.')
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
            <h1 className="text-4xl">
                {locale === 'pt' ? 'Novo trabalho' : 'New work'}
            </h1>

            <input
                value={nomePt}
                onChange={(event) => setNomePt(event.target.value)}
                placeholder="Nome PT"
                className="border border-black px-4 py-3 bg-transparent"
                required
            />

            <input
                value={nomeEn}
                onChange={(event) => setNomeEn(event.target.value)}
                placeholder="Nome EN"
                className="border border-black px-4 py-3 bg-transparent"
            />

            <input
                value={cliente}
                onChange={(event) => setCliente(event.target.value)}
                placeholder={locale === 'pt' ? 'Cliente' : 'Client'}
                className="border border-black px-4 py-3 bg-transparent"
            />

            <input
                value={ano}
                onChange={(event) => setAno(event.target.value)}
                placeholder={locale === 'pt' ? 'Ano' : 'Year'}
                className="border border-black px-4 py-3 bg-transparent"
            />

            <input
                value={categoriaPt}
                onChange={(event) => setCategoriaPt(event.target.value)}
                placeholder="Categoria PT"
                className="border border-black px-4 py-3 bg-transparent"
            />

            <input
                value={categoriaEn}
                onChange={(event) => setCategoriaEn(event.target.value)}
                placeholder="Category EN"
                className="border border-black px-4 py-3 bg-transparent"
            />

            <div className="flex flex-col gap-2">
                <label>
                    Thumbnail
                </label>

                <input
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                        setThumbnailFile(event.target.files?.[0] ?? null)
                    }
                    className="border border-black px-4 py-3 bg-transparent"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label>
                    {locale === 'pt' ? 'Imagens' : 'Images'}
                </label>

                <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(event) =>
                        setImageFiles(event.target.files)
                    }
                    className="border border-black px-4 py-3 bg-transparent"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label>
                    {locale === 'pt' ? 'Vídeos' : 'Videos'}
                </label>

                <input
                    type="file"
                    accept="video/*"
                    multiple
                    onChange={(event) =>
                        setVideoFiles(event.target.files)
                    }
                    className="border border-black px-4 py-3 bg-transparent"
                />
            </div>

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
                disabled={isSubmitting}
                className="border border-black px-4 py-3 hover:bg-black hover:text-white transition disabled:opacity-50"
            >
                {isSubmitting
                    ? locale === 'pt'
                        ? 'Criando...'
                        : 'Creating...'
                    : locale === 'pt'
                        ? 'Criar trabalho'
                        : 'Create work'}
            </button>
        </form>
    )
}