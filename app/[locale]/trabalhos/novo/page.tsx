import { Locale } from '@/lib/dictionaries'
import NewWorkForm from '../../../../components/NewWorkForm'

type Props = {
    params: Promise<{
        locale: Locale
    }>
}

export default async function NewWorkPage({ params }: Props) {
    const { locale } = await params

    return (
        <main className="min-h-screen px-6 pt-32 pb-24">
            <NewWorkForm locale={locale} />
        </main>
    )
}