import WorksGrid from '@/components/WorksGrid'
import { Locale } from '@/lib/dictionaries'

type Props = {
    params: Promise<{
        locale: Locale
    }>
}

export default async function PublicidadePage({
    params,
}: Props) {
    const { locale } = await params

    return <WorksGrid locale={locale} type="publicidade" />
}