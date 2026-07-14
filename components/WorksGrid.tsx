import Image from 'next/image'
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
    thumbnail: string | null
}

type WorkType = 'streaming' | 'publicidade' | 'todos'

type Props = {
    locale: Locale
    type?: WorkType
}

export default async function WorksGrid({
    locale,
    type = 'todos',
}: Props) {
    let query = supabase
        .from('works')
        .select(
            `
                id,
                nome_pt,
                nome_en,
                slug,
                ano,
                cliente,
                thumbnail,
                categoria_pt,
                categoria_en,
                ranking
            `
        )
        .order('ranking', { ascending: false })

    if (type === 'publicidade') {
        query = query.ilike('categoria_en', 'Ad')
    }

    if (type === 'streaming') {
        /*
         * O .neq() sozinho não inclui valores null.
         * Por isso usamos .or() para trazer:
         *
         * categoria_en diferente de Ad
         * OU
         * categoria_en nula
         */
        query = query.or(
            'categoria_en.neq.Ad,categoria_en.is.null'
        )
    }

    const { data: works, error } = await query.returns<Work[]>()

    if (error) {
        console.error('Erro ao carregar trabalhos:', error)
    }

    return (
        <main className="min-h-screen px-6 pt-32 pb-24">
            <section className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 xl:grid-cols-4">
                {(works || []).map((work) => {
                    const title =
                        locale === 'pt'
                            ? work.nome_pt
                            : work.nome_en || work.nome_pt

                    const category =
                        locale === 'pt'
                            ? work.categoria_pt
                            : work.categoria_en ||
                              work.categoria_pt

                    return (
                        <WorkReveal key={work.id}>
                            <Link
                                href={`/${locale}/trabalhos/${work.slug}`}
                                className="group flex flex-col gap-4"
                            >
                                <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100">
                                    {work.thumbnail && (
                                        <Image
                                            src={work.thumbnail}
                                            alt={title}
                                            fill
                                            sizes="
                                                (max-width:640px) 100vw,
                                                (max-width:1280px) 50vw,
                                                25vw
                                            "
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                                        />
                                    )}
                                </div>

                                <div className="flex items-start justify-between gap-6">
                                    <div className="flex min-w-0 flex-col">
                                        <h2 className="text-xl leading-tight uppercase transition-colors duration-300 group-hover:text-orange-500">
                                            {title}
                                        </h2>

                                        {work.cliente && (
                                            <span className="text-sm uppercase">
                                                {work.cliente}
                                            </span>
                                        )}
                                    </div>

                                    {category && (
                                        <span className="shrink-0 text-right text-xs text-orange-500">
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