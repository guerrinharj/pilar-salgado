import { getDictionary, Locale } from '@/lib/dictionaries'
import AddWorkButton from '@/components/AddWorkButton'

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
            <AddWorkButton />
        </main>
    )
}