import { HiArrowLeft } from 'react-icons/hi'
import Link from 'next/link'
import EditWorkButton from '@/components/EditWorkButton'
import DeleteWorkButton from '@/components/DeleteWorkButton'
import FadeIn from '@/components/FadeIn'
import { notFound } from 'next/navigation'
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
    categoria_pt: string | null
    categoria_en: string | null
    ano: string | null
    cliente: string | null
    thumbnail: string | null
    images: string[] | null
    videos: string[] | null
    creditos_pt: Credit[] | null
    creditos_en: Credit[] | null
}

type Props = {
    params: Promise<{
        locale: Locale
        slug: string
    }>
}

export default async function WorkPage({ params }: Props) {
    const { locale, slug } = await params

    const { data: work, error } = await supabase
        .from('works')
        .select('*')
        .eq('slug', slug)
        .single<Work>()

    if (error || !work) {
        notFound()
    }

    const title =
        locale === 'pt'
            ? work.nome_pt
            : work.nome_en || work.nome_pt

    const credits =
        locale === 'pt'
            ? work.creditos_pt
            : work.creditos_en || work.creditos_pt

    const category =
        locale === 'pt'
            ? work.categoria_pt
            : work.categoria_en || work.categoria_pt

    const video = work.videos?.[0]

    return (
        <main className="min-h-screen px-6 pt-32 pb-24">
            <section className="grid grid-cols-1 gap-12 md:grid-cols-2">
                <FadeIn>
                    <div className="flex flex-col gap-4">
                        {category && (
                            <FadeIn delay={100}>
                                <span className="text-orange-500">
                                    {category}
                                </span>
                            </FadeIn>
                        )}

                        <FadeIn delay={200}>
                            <h1 className="text-5xl uppercase underline">
                                {title}
                            </h1>
                        </FadeIn>

                        {work.cliente && (
                            <FadeIn delay={300}>
                                <p className="text-3xl">
                                    {work.cliente}

                                    {work.ano && (
                                        <span className="text-orange-500">
                                            {' '}
                                            {work.ano}
                                        </span>
                                    )}
                                </p>
                            </FadeIn>
                        )}

                        {credits && credits.length > 0 && (
                            <FadeIn delay={400}>
                                <div className="flex flex-col gap-2 pt-6">
                                    {credits.map((credit, index) => (
                                        <p
                                            key={`${credit.role}-${credit.name}-${index}`}
                                        >
                                            <span className="uppercase text-orange-500">
                                                {credit.role}
                                            </span>

                                            {': '}
                                            {credit.name}
                                        </p>
                                    ))}
                                </div>
                            </FadeIn>
                        )}

                        <FadeIn delay={500}>
                            <div className="flex gap-4">
                                <EditWorkButton
                                    locale={locale}
                                    slug={work.slug}
                                />

                                <DeleteWorkButton
                                    locale={locale}
                                    workId={work.id}
                                />
                            </div>
                        </FadeIn>
                    </div>
                </FadeIn>

                <FadeIn delay={250}>
                    <div className="w-full max-w-[700px] mx-auto bg-black flex items-center justify-center">
                        {video ? (
                            <video
                                src={video}
                                poster={work.thumbnail || undefined}
                                controls
                                playsInline
                                preload="metadata"
                                className="
                                    w-full
                                    max-w-[700px]
                                    aspect-video
                                    object-cover
                                "
                            >
                                Seu navegador não suporta a reprodução de vídeos.
                            </video>
                        ) : (
                            <div className="flex aspect-video w-full items-center justify-center bg-neutral-100">
                                <p className="text-sm text-neutral-500">
                                    {locale === 'pt'
                                        ? 'Nenhum vídeo cadastrado.'
                                        : 'No video available.'}
                                </p>
                            </div>
                        )}
                    </div>
                </FadeIn>
            </section>

            <Link
                href={`/${locale}/trabalhos`}
                aria-label={
                    locale === 'pt'
                        ? 'Voltar para trabalhos'
                        : 'Back to works'
                }
                className="
                    fixed
                    bottom-8
                    left-8
                    z-50
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    border
                    border-black
                    bg-black/80
                    text-white
                    backdrop-blur-sm
                    transition-all
                    duration-300
                    hover:border-orange-500
                    hover:text-orange-500
                "
            >
                <HiArrowLeft className="h-6 w-6" />
            </Link>
        </main>
    )
}