import Link from 'next/link'
import { Locale } from '@/lib/dictionaries'
import { supabase } from '@/lib/supabase/client'
import AddWorkButton from '@/components/AddWorkButton'
import WorkReveal from '@/components/WorkReveal'

type Work = {
    id: string
    nome_pt: string
    nome_en: string | null
    categoria_pt: string | null
    categoria_en: string | null
    slug: string
    ranking: number
    ano: string | null
    cliente: string | null
}

type Props = {
    params: Promise<{
        locale: Locale
    }>
}

export default async function TrabalhosPage({ params }: Props) {
    const { locale } = await params

    const { data: works, error } = await supabase
        .from('works')
        .select(
            'id, nome_pt, nome_en, slug, ano, cliente, categoria_pt, categoria_en, ranking'
        )
        .order('ranking', { ascending: false })
        .returns<Work[]>()

    if (error) {
        console.error(error)
    }

    return (
        <main className="min-h-screen px-6 pt-32 pb-24">
            <section className="flex flex-col">
                {(works || []).map((work) => {
                    const title =
                        locale === 'pt'
                            ? work.nome_pt
                            : work.nome_en || work.nome_pt

                    const category =
                        locale === 'pt'
                            ? work.categoria_pt
                            : work.categoria_en || work.categoria_pt

                    return (
                        <WorkReveal key={work.id}>
                            <Link
                                href={`/${locale}/trabalhos/${work.slug}`}
                                className="
                                    group
                                    flex
                                    flex-col
                                    gap-6
                                    border-b
                                    border-black
                                    py-8
                                    transition-colors
                                    duration-300
                                    md:flex-row
                                    md:items-end
                                    md:justify-between
                                "
                            >
                                <h2
                                    className="
                                        flex
                                        items-center
                                        gap-4
                                        max-w-5xl
                                        text-5xl
                                        leading-[0.9]
                                        uppercase
                                        sm:text-6xl
                                        md:text-7xl
                                        lg:text-8xl
                                    "
                                >
                                    <span
                                        className="
                                            -translate-x-6
                                            opacity-0
                                            transition-all
                                            duration-500
                                            ease-out
                                            group-hover:translate-x-0
                                            group-hover:opacity-100
                                        "
                                    >
                                        →
                                    </span>

                                    <span
                                        className="
                                            transition-all
                                            duration-500
                                            ease-out
                                            group-hover:translate-x-4
                                            group-hover:text-orange-500
                                        "
                                    >
                                        {title}
                                    </span>
                                </h2>

                                <div
                                    className="
                                        flex
                                        shrink-0
                                        flex-col
                                        items-start
                                        text-left
                                        md:items-end
                                        md:text-right
                                    "
                                >
                                    {work.cliente && (
                                        <span className="text-base uppercase">
                                            {work.cliente}
                                        </span>
                                    )}

                                    {category && (
                                        <span className="text-sm text-orange-500">
                                            {category}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        </WorkReveal>
                    )
                })}
            </section>

            <AddWorkButton />
        </main>
    )
}