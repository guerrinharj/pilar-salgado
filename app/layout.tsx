import './globals.css'

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="pt-BR ">
            <body style={{ fontFamily: 'Switzer, sans-serif', color: '#f6f3ec', backgroundColor: 'black'}}>
                {children}
            </body>
        </html>
    )
}