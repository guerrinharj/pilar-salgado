import Image from 'next/image'
import Link from 'next/link'
import { getDictionary, Locale } from '@/lib/dictionaries'
import { supabase } from '@/lib/supabase/client'
import AddWorkButton from '@/components/AddWorkButton'

type Work = {
    id: string
    nome_pt: string
    nome_en: string | null
    categoria_pt: string | null
    categoria_en: string | null
    slug: string
    ano: string | null
    cliente: string | null
    thumbnail: string | null
}

type Props = {
    params: Promise<{
        locale: Locale
    }>
}

export default async function TrabalhosPage({ params }: Props) {
    const { locale } = await params

    const dict = getDictionary(locale)

    const { data: works, error } = await supabase
        .from('works')
        .select('id, nome_pt, nome_en, slug, ano, cliente, thumbnail, categoria_pt, categoria_en')
        .order('created_at', { ascending: false })
        .returns<Work[]>()

    if (error) {
        console.error(error)
    }


    return (
        <main className="min-h-screen px-6 pt-32 pb-24">
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                        <Link
                            key={work.id}
                            href={`/${locale}/trabalhos/${work.slug}`}
                            className="group flex flex-col gap-3"
                        >
                            <div className="relative aspect-[4/3] border border-black overflow-hidden bg-neutral-100">
                                {work.thumbnail && (
                                    <Image
                                        src={work.thumbnail}
                                        alt={title}
                                        fill
                                        className="object-cover group-hover:scale-105 transition duration-500"
                                    />
                                )}
                            </div>

                            <div className="flex flex-col">
                                <h2 className="uppercase">
                                    {title}
                                </h2>

                                <div className="flex gap-2 text-md opacity-70">
                                    {work.cliente && (
                                        <span>
                                            {work.cliente}
                                        </span>
                                    )}                                
                                </div>

                                {category && (
                                    <p className="text-orange-500 text-xs">
                                        {category}
                                    </p>
                                )}  
                            </div>
                        </Link>
                    )
                })}
            </section>

            <AddWorkButton />
        </main>
    )
}