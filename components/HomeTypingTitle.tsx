'use client'

import { useEffect, useState } from 'react'
import { Locale } from '@/lib/dictionaries'

type Props = {
    locale: Locale
}

export default function HomeTypingTitle({ locale }: Props) {
    const fullText =
        locale === 'pt'
            ? 'Pilar Salgado,\nFigurinista.'
            : 'Pilar Salgado,\nCostume Designer.'

    const [text, setText] = useState('')

    useEffect(() => {
        setText('')

        let index = 0

        const interval = window.setInterval(() => {
            setText(fullText.slice(0, index + 1))

            index += 1

            if (index === fullText.length) {
                window.clearInterval(interval)
            }
        }, 70)

        return () => {
            window.clearInterval(interval)
        }
    }, [fullText])

    const [firstLine, secondLine = ''] = text.split('\n')

    return (
        <section className="min-h-screen flex items-center justify-center px-6">
            <h1 className="text-center text-6xl md:text-8xl leading-none">
                <span>
                    {firstLine}
                </span>

                <br />

                <span className="text-orange-500">
                    {secondLine}
                </span>

                <span className="animate-pulse">
                    |
                </span>
            </h1>
        </section>
    )
}