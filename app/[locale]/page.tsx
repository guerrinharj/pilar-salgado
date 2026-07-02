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
                        src="/pilar-salgado.jpeg"
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
                                    Pilar Salgado, desde pequena, intercalou estadias fora do Brasil,
                                    convivendo com diferentes culturas. Aos 20 anos morou em Londres,
                                    onde desenvolveu seu interesse pela moda e pelas artes.

                                    <br />
                                    <br />

                                    De volta ao Brasil, iniciou sua trajetória no cinema integrando a
                                    equipe de figurino do filme <em>Cidade de Deus</em>, ao lado de Bia
                                    Salgado.

                                    <br />
                                    <br />

                                    Ao longo de mais de 25 anos de carreira, consolidou-se como uma
                                    figurinista de olhar singular, capaz de compreender profundamente os
                                    personagens e traduzi-los para a tela com autenticidade. Seu trabalho
                                    contribui para estabelecer o acordo tácito entre espectador e filme,
                                    elemento essencial para a imersão e a experiência cinematográfica.

                                    <br />
                                    <br />

                                    Além do cinema, assina campanhas publicitárias nacionais e
                                    internacionais, alternando constantemente entre ficção e publicidade.
                                    Com a expansão das plataformas de streaming, passou também a atuar em
                                    diversas séries e longas-metragens.

                                    <br />
                                    <br />

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
                                    Since childhood, Pilar Salgado has spent periods living outside
                                    Brazil, experiencing different cultures. At the age of 20, she moved
                                    to London, where she developed her passion for fashion and the arts.

                                    <br />
                                    <br />

                                    After returning to Brazil, she began her career in film as part of
                                    the costume department for <em>City of God</em>, working alongside
                                    Bia Salgado.

                                    <br />
                                    <br />

                                    Over more than 25 years, she has established herself as a costume
                                    designer with a distinctive perspective, bringing a deep understanding
                                    of character to every project. Her work helps create authentic,
                                    believable figures on screen, strengthening the unspoken bond between
                                    audience and film that is essential to the cinematic experience.

                                    <br />
                                    <br />

                                    Alongside her work in feature films, she has designed costumes for
                                    both Brazilian and international advertising campaigns, continuously
                                    balancing fiction and commercial productions. With the rise of
                                    streaming platforms, her work has expanded to include numerous series
                                    and feature-length productions.

                                    <br />
                                    <br />

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