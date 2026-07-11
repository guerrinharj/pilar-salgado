'use client'

import { ReactNode, useEffect, useState } from 'react'

type Props = {
    children: ReactNode
    delay?: number
}

export default function FadeIn({ children, delay = 0 }: Props) {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), delay)
        return () => clearTimeout(timer)
    }, [delay])

    return (
        <div
            className={`
                transition-all
                duration-700
                ease-out
                ${
                    visible
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-4 opacity-0'
                }
            `}
        >
            {children}
        </div>
    )
}