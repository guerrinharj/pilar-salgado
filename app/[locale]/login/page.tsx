import { getDictionary, Locale } from '@/lib/dictionaries'

type Props = {
    params: Promise<{
        locale: Locale
    }>
}

export default async function LoginPage({ params }: Props) {
    const { locale } = await params

    const dict = getDictionary(locale)

    return (
        <main className="min-h-screen flex items-center justify-center px-6">
            <form
                className="
                    w-full
                    max-w-md
                    flex
                    flex-col
                    gap-6
                "
            >
                <div className="flex flex-col gap-2">
                    <label className="text-sm">
                        {dict.login.email}
                    </label>

                    <input
                        type="email"
                        placeholder="email@email.com"
                        className="
                            border
                            border-black
                            px-4
                            py-3
                            outline-none
                            bg-transparent
                        "
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-sm">
                        {dict.login.password}
                    </label>

                    <input
                        type="password"
                        placeholder="••••••••"
                        className="
                            border
                            border-black
                            px-4
                            py-3
                            outline-none
                            bg-transparent
                        "
                    />
                </div>

                <button
                    type="submit"
                    className="
                        border
                        border-black
                        px-4
                        py-3
                        hover:bg-black
                        hover:text-white
                        transition
                        cursor-pointer
                    "
                >
                    {dict.login.submit}
                </button>
            </form>
        </main>
    )
}