import Navbar from '../../components/NavBar'

export default function LocaleLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <> 
            <Navbar />
            {children}
        </>
    )
}