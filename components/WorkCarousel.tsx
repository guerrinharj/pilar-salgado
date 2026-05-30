'use client'

import Image from 'next/image'
import { useState } from 'react'

type MediaItem = {
    type: 'image' | 'video'
    src: string
}

type Props = {
    items: MediaItem[]
    title: string
}

export default function WorkCarousel({
    items,
    title,
}: Props) {
    const [currentIndex, setCurrentIndex] = useState(0)

    if (items.length === 0) {
        return null
    }

    const currentItem = items[currentIndex]

    function goToPrevious() {
        setCurrentIndex((previousIndex) =>
            previousIndex === 0
                ? items.length - 1
                : previousIndex - 1
        )
    }

    function goToNext() {
        setCurrentIndex((previousIndex) =>
            previousIndex === items.length - 1
                ? 0
                : previousIndex + 1
        )
    }

    return (
        <div className="relative w-full">
            <div
                className="
                    relative
                    w-full
                    max-w-full
                    border
                    border-black
                    bg-neutral-100
                    overflow-hidden
                "
            >
                {currentItem.type === 'image' && (
                    <Image
                        src={currentItem.src}
                        alt={title}
                        width={1600}
                        height={1200}
                        className="
                            w-full
                            h-auto
                            object-contain
                            block
                        "
                    />
                )}

                {currentItem.type === 'video' && (
                    <video
                        src={currentItem.src}
                        controls
                        className="
                            w-full
                            h-auto
                            object-contain
                            block
                        "
                    />
                )}

                {items.length > 1 && (
                    <>
                        <button
                            type="button"
                            onClick={goToPrevious}
                            className="
                                absolute
                                left-4
                                top-1/2
                                -translate-y-1/2
                                w-10
                                h-10
                                rounded-full
                                border
                                border-black
                                bg-white
                                flex
                                items-center
                                justify-center
                                hover:bg-black
                                hover:text-white
                                transition
                                z-10
                            "
                        >
                            ←
                        </button>

                        <button
                            type="button"
                            onClick={goToNext}
                            className="
                                absolute
                                right-4
                                top-1/2
                                -translate-y-1/2
                                w-10
                                h-10
                                rounded-full
                                border
                                border-black
                                bg-white
                                flex
                                items-center
                                justify-center
                                hover:bg-black
                                hover:text-white
                                transition
                                z-10
                            "
                        >
                            →
                        </button>
                    </>
                )}
            </div>

            {items.length > 1 && (
                <p className="pt-3 text-sm text-right">
                    {currentIndex + 1} / {items.length}
                </p>
            )}
        </div>
    )
}  