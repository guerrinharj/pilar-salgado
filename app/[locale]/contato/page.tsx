import { Locale } from '@/lib/dictionaries'

type Props = {
    params: Promise<{
        locale: Locale
    }>
}

export default async function ContatoPage({
    params,
}: Props) {
    const { locale } = await params

    return (
        <main className="min-h-screen flex items-center justify-center px-6">
            <section className="flex flex-col text-left gap-8">
                <div className="flex flex-col gap-2">
                    <p className="text-orange-500 text-sm">
                        {locale === 'pt'
                            ? 'Telefone'
                            : 'Phone'}
                    </p>

                    <a
                        href="tel:+5521980678428"
                        className="text-3xl md:text-5xl hover:text-orange-500 transition"
                    >
                        +55 21 98067-8428
                    </a>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-orange-500 text-sm">
                        Email
                    </p>

                    <a
                        href="mailto:pilarsalgado@teste.com"
                        className="text-3xl md:text-5xl hover:text-orange-500 transition"
                    >
                        pilarsalgado@teste.com
                    </a>
                </div>
            </section>
        </main>
    )
}