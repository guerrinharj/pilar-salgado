'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

export default function WorkReveal({ children }: Props) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{
                once: false,
                amount: 0.2,
            }}
            transition={{
                duration: 0.8,
                ease: [0.25, 0.1, 0.25, 1],
            }}
        >
            {children}
        </motion.div>
    )
}