import './globals.css'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR ">
            <body style={{ fontFamily: 'SansSerifFLF, sans-serif' }}>
                {children}
            </body>
        </html>
    )
}