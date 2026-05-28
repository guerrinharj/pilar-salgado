import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'
import { Locale } from '@/lib/dictionaries'
import EditWorkForm from '@/components/EditWorkForm'

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

export default async function EditWorkPage({
    params,
}: Props) {
    const { locale, slug } = await params

    const { data: work, error } = await supabase
        .from('works')
        .select('*')
        .eq('slug', slug)
        .single<Work>()

    if (error || !work) {
        notFound()
    }

    return (
        <main className="min-h-screen px-6 pt-32 pb-24">
            <EditWorkForm
                locale={locale}
                work={work}
            />
        </main>
    )
}