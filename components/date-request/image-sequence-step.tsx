"use client"

import { useRef, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperClass } from "swiper/types"
import { Button } from "@/components/ui/button"
import Grainient from "@/components/Grainient"
import { Pagination } from "../ui/pagination"

interface ImageSequenceStepProps {
    onFinish: () => void
}

const images = [
    {
        src: "/1.jpg",
        alt: "عکس شماره ۱",
    },
    {
        src: "/2.jpg",
        alt: "عکس شماره ۲",
    },
    {
        src: "/3.jpg",
        alt: "عکس شماره ۳",
    },
    {
        src: "/4.jpg",
        alt: "عکس شماره ۴",
    },
    {
        src: "/5.jpg",
        alt: "عکس شماره ۵",
    },
    {
        src: "/6.jpg",
        alt: "عکس شماره ۶",
    },
    {
        src: "/7.jpg",
        alt: "عکس شماره ۷",
    },
    {
        src: "/8.jpg",
        alt: "عکس شماره ۸",
    },
]

export function ImageSequenceStep({ onFinish }: ImageSequenceStepProps) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const swiperRef = useRef<SwiperClass | null>(null)

    const handleImageClick = () => {
        if (currentIndex === images.length - 1) {
            onFinish()
            return
        }

        swiperRef.current?.slideNext()
    }

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-8">
            <div className="absolute inset-0 z-0">
                <Grainient
                    className="w-full h-full"
                    color1="#ffffff"
                    color2="#ff2757"
                    color3="#B497CF"
                    timeSpeed={0.25}
                    colorBalance={-0.13}
                    warpStrength={1}
                    warpFrequency={10.5}
                    warpSpeed={2}
                    warpAmplitude={50}
                    blendAngle={0}
                    blendSoftness={0.65}
                    rotationAmount={460}
                    noiseScale={2}
                    grainAmount={0.1}
                    grainScale={2}
                    grainAnimated={false}
                    contrast={1.5}
                    gamma={1}
                    saturation={1}
                    centerX={0}
                    centerY={0}
                    zoom={0.9}
                />
            </div>

            <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-6 text-center">
             

                    <Swiper
                        dir="ltr"
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper
                        }}
                        onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
                        navigation
                        pagination={{ clickable: true }}
                        grabCursor
                        slidesPerView={1}
                        spaceBetween={24}
                        className="rounded-4xl overflow-hidden w-125"

                    >
                        {images.map((image) => (
                            <SwiperSlide key={image.src}>
                                <button
                                    type="button"
                                    onClick={handleImageClick}
                                    className="group relative flex h-[60vh] min-h-80 w-full items-center justify-center overflow-hidden rounded-4xl bg-black"
                                >
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className="h-full w-full object-contain"
                                    />
                                    <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-black/60 p-4 text-left text-white">


                                    </div>
                                </button>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* <p className="mt-4 text-sm text-muted-foreground">
                        {currentIndex === images.length - 1
                            ? "آخرین عکس. کلیک کن تا برگردیم به شروع."
                            : "با کلیک روی تصویر به عکس بعدی می‌رسی."}
                    </p> */}
                </div>


            
        </div>
    )
}
