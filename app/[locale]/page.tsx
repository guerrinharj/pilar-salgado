import Image from 'next/image'
import HomeTypingTitle from '../../components/HomeTypingTitle'
import { Locale } from '@/lib/dictionaries'
import { FaImdb } from 'react-icons/fa'

type Props = {
    params: Promise<{
        locale: Locale
    }>
}

export default async function HomePage({ params }: Props) {
    const { locale } = await params

    return (
        <main>

            <HomeTypingTitle locale={locale} />

            <section
                className="
                    min-h-screen
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    items-center
                    gap-12
                    px-6
                    md:px-16
                    py-16
                "
            >
                <div className="w-full">
                    <Image
                        src="/pilarsalgado.jpeg"
                        alt="Pilar Salgado"
                        width={1200}
                        height={1600}
                        className="w-full h-auto object-cover"
                    />
                </div>

                <div className="text-white">
                    <p className="text-lg md:text-2xl leading-relaxed">
                        {locale === 'pt'
                            ? (
                                <>
                                    Pilar Salgado é uma figurinista com atuação em projetos que atravessam imagem,
                                    identidade, narrativa e linguagem visual. Seu trabalho parte da construção de
                                    personagens e universos visuais, explorando o figurino como ferramenta de
                                    expressão, storytelling e direção estética.

                                    <br />
                                    <br />

                                    Ao longo de sua trajetória, desenvolveu projetos para cinema, televisão,
                                    publicidade, moda e produções independentes, colaborando com diretores,
                                    fotógrafos, artistas e marcas na criação de imagens marcantes e coerentes com
                                    cada narrativa.

                                    <br />
                                    <br />

                                    Seu processo combina pesquisa, sensibilidade visual e atenção aos detalhes,
                                    buscando traduzir conceitos, emoções e contextos através da roupa, da textura,
                                    da cor e da composição. Cada projeto é encarado como uma oportunidade de criar
                                    identidades únicas e fortalecer a relação entre personagem, imagem e história.{' '}
                                    <a
                                        href="mailto:pilarsalgado@gmail.com"
                                        className="text-orange-600 hover:underline transition"
                                    >
                                        pilarsalgado@gmail.com
                                    </a>
                                    .
                                </>
                            )
                            : (
                                <>
                                    Pilar Salgado is a costume designer whose work spans image-making,
                                    identity, narrative, and visual language. Her practice is rooted in the
                                    creation of characters and visual worlds, exploring costume as a tool for
                                    expression, storytelling, and art direction.

                                    <br />
                                    <br />

                                    Throughout her career, she has developed projects for film, television,
                                    advertising, fashion, and independent productions, collaborating with
                                    directors, photographers, artists, and brands to create distinctive and
                                    coherent visual narratives.

                                    <br />
                                    <br />

                                    Her process combines research, visual sensitivity, and close attention to
                                    detail, translating concepts, emotions, and contexts through clothing,
                                    texture, color, and composition. Each project is approached as an opportunity
                                    to build unique identities and strengthen the relationship between character,
                                    image, and story.{' '}
                                    <a
                                        href="mailto:pilarsalgado@gmail.com"
                                        className="text-orange-600 hover:underline transition"
                                    >
                                        pilarsalgado@gmail.com
                                    </a>
                                    .
                                </>
                            )}
                    </p>

                    <a
                        href="https://www.imdb.com/name/nm7354045/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="IMDb"
                        className="text-orange-600 hover:text-white transition mt-8 inline-block"
                    >
                        <FaImdb size={48} />
                    </a>
                </div>
            </section>
        </main>
    )
}