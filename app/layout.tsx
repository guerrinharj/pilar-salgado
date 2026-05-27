import './globals.css'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR ">
            <body style={{ fontFamily: 'OCRF, sans-serif', backgroundColor: '#f6f3ec'}}>
                {children}
            </body>
        </html>
    )
}