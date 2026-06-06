"use client"

import { useMemo, useState, useRef, useCallback } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import Grainient from "@/components/Grainient"
import SplitText from "@/components/SplitText"
import SideRays from "../SideRays"

interface InvitationStepProps {
  onAccept: () => void
  onReject: () => void
}

export function InvitationStep({ onAccept, onReject }: InvitationStepProps) {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 })
  const [hoverCount, setHoverCount] = useState(0)
  const [attemptCount, setAttemptCount] = useState(0)
  const [isGradientLoaded, setIsGradientLoaded] = useState(false)
  const [animationKey, setAnimationKey] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const noButtonRef = useRef<HTMLButtonElement>(null)

  const messages = [
    "?Want to go on a date with me",
    "الان مطمئنی؟ دیگه؟",
    "مطمئنی؟",
    "کاملا مطمئنی؟",
    "چقد سختی اه",
    "بزن آره دیگه",
    "فکر کنم دیگه باید قبول کنی",
  ]

  const hearts = useMemo(
    () =>
      Array.from({ length: 20 }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 2}s`,
        scale: 0.5 + Math.random() * 1.5,
      })),
    []
  )

  const moveButton = useCallback(() => {
    if (!containerRef.current || !noButtonRef.current) return

    const container = containerRef.current.getBoundingClientRect()
    const button = noButtonRef.current.getBoundingClientRect()

    const maxX = container.width - button.width - 20
    const maxY = container.height - button.height - 20

    const newX = Math.random() * maxX - maxX / 2
    const newY = Math.random() * maxY - maxY / 2

    setNoButtonPosition({ x: newX, y: newY })
    setHoverCount((prev) => Math.min(prev + 1, messages.length - 1))
    setAttemptCount((prev) => prev + 1)
  }, [messages.length])

  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0">
        <Grainient
          className="w-full h-full"
          color1="#5d2eb9"
          color2="#ff2757"
          color3="#c41a7d"
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
          onLoad={() => setIsGradientLoaded(true)}
        />
      </div>

      {/* Side rays overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <SideRays
          speed={2.5}
          rayColor1="#EAB308"
          rayColor2="#ffb900"
          intensity={2.4}
          spread={2}
          origin="top-right"
          tilt={10}
          saturation={1.4}
          blend={0.75}
          falloff={1.8}
          opacity={0.9}
        />
      </div>

      {/* Floating hearts background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-15">
        {hearts.map((heart) => (
          <Heart
            key={heart.id}
            className="absolute animate-pulse text-primary/20 "
            style={{
              left: heart.left,
              top: heart.top,
              animationDelay: heart.delay,
              transform: `scale(${heart.scale})`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 flex flex-col items-center gap-8">
        <div className="animate-bounce">
          <Heart className="h-20 w-20 fill-rose-800 text-rose-800" />
        </div>

        <h1 className="text-center text-3xl font-bold text-white md:text-5xl">
          {messages[hoverCount]}
        </h1>

        <SplitText
          key={animationKey}
          text="A simple question, but an important one ✨"
          className="max-w-md text-center text-white"
          tag="p"
          splitType="words"
          from={{ opacity: 0, y: 40 }}
          to={{ opacity: 1, y: 0 }}
          ease="power3.out"
          textAlign="center"
          duration={0.8}
          delay={50}
          onLetterAnimationComplete={() => {
            setTimeout(() => setAnimationKey(prev => prev + 1), 5000)
          }}
        />


        <div className="flex flex-col items-center gap-6 sm:flex-row">
          <Button
            onClick={onAccept}
            size="lg"
            className="min-w-35 bg-primary text-lg text-primary-foreground shadow-lg transition-all hover:scale-105 hover:bg-primary/90 hover:shadow-xl"
          >
            YES
          </Button>

          <Button
            ref={noButtonRef}
            variant="outline"
            size="lg"
            className="min-w-35 border-2 border-border text-lg transition-all duration-300"
            style={{
              transform: `translate(${noButtonPosition.x}px, ${noButtonPosition.y}px)`,
            }}
            onMouseEnter={moveButton}
            onTouchStart={moveButton}
            onClick={() => {
              setAttemptCount((prev) => {
                const nextCount = prev + 1
                // if (nextCount >= 2) {
                //   onReject()
                // }
                return nextCount
              })
            }}
          >
            NO
          </Button>
        </div>
      </div>

      {!isGradientLoaded && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-black/70 text-white">
          <Spinner className="size-8" />
          <div className="text-center text-lg font-medium">
            هلیا یکم صبر کن
          </div>
        </div>
      )}
    </div>
  )
}