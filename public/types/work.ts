export type Credit = {
    role: string
    name: string
}

export type Work = {
    id: string
    nome: string
    slug: string
    ano: string
    creditos: Credit[]
    images: string[]
    link: string
    thumbnail: string
}