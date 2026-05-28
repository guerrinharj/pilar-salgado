import { getDictionary, Locale } from '@/lib/dictionaries'

type Props = {
    params: Promise<{
        locale: Locale
    }>
}

export default async function TrabalhosPage({ params }: Props) {
    const { locale } = await params

    const dict = getDictionary(locale)

    return (
        <main className="p-24">
        </main>
    )
}