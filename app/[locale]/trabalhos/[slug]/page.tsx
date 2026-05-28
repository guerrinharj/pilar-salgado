import WorkCarousel from '@/components/WorkCarousel'
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

    const mediaItems = [
        ...(work.thumbnail
            ? [
                {
                    type: 'image' as const,
                    src: work.thumbnail,
                },
            ]
            : []),

        ...(work.images || []).map((image) => ({
            type: 'image' as const,
            src: image,
        })),

        ...(work.videos || []).map((video) => ({
            type: 'video' as const,
            src: video,
        })),
    ]

    return (
        <main className="min-h-screen px-6 pt-32 pb-24">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="flex flex-col gap-4">
                    <h1 className="text-5xl">
                        {title}
                    </h1>

                    {work.cliente && (
                        <p className="text-3xl">
                            {work.cliente}
                        </p>
                    )}

                    {work.ano && (
                        <p>
                            {work.ano}
                        </p>
                    )}

                    {credits && credits.length > 0 && (
                        <div className="flex flex-col gap-2 pt-6">
                            {credits.map((credit, index) => (
                                <p key={index}>
                                    <span className="font-queens-italic">
                                        {credit.role}
                                    </span>
                                    {': '}
                                    {credit.name}
                                </p>
                            ))}
                        </div>
                    )}
                </div>

                <div>
                    <WorkCarousel
                        items={mediaItems}
                        title={title}
                    />
                </div>
            </section>
        </main>
    )
}