import HomeTypingTitle from '@/components/HomeTypingTitle'
import { Locale } from '@/lib/dictionaries'

type Props = {
    params: Promise<{
        locale: Locale
    }>
}

export default async function HomePage({ params }: Props) {
    const { locale } = await params

    return (
        <main>
            <HomeTypingTitle locale={locale} />
        </main>
    )
}