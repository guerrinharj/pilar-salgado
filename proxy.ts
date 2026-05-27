import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    const hasLocale =
        pathname.startsWith('/pt') ||
        pathname.startsWith('/en')

    const isPublicFile = /\.(.*)$/.test(pathname)

    if (
        hasLocale ||
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        isPublicFile
    ) {
        return NextResponse.next()
    }

    return NextResponse.redirect(
        new URL(`/pt${pathname}`, request.url)
    )
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}