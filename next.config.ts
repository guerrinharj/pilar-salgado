import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'pzkrdtzdxqvxhmvyobey.supabase.co',
            },
        ],
    },
}

export default nextConfig