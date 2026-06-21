"use client"
import { useEffect } from "react"
import { useMemo, useState, useRef, useCallback } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import Grainient from "@/components/Grainient"
import SplitText from "@/components/SplitText"
import SideRays from "../SideRays"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
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
  const searchParams = useSearchParams()
  const startTime = useRef(Date.now()).current
  const [clickCount, setClickCount] = useState({
    yes: 0,
    no: 0,
  })
  const [firstInteraction, setFirstInteraction] = useState<string | null>(null)
  const id = searchParams.get("id")
  const sendFinalData = (type: "yes" | "no", updatedClickCount?: { yes: number; no: number }) => {
    const now = Date.now()

    const payload = {
      event: type === "yes" ? "accept_click" : "reject_click",
      personName,
      id,

      entry_time: startTime,
      decision_time: now,
      time_on_page: now - startTime,
      time_to_decision: now - startTime,

      click_count: updatedClickCount ?? clickCount,
      first_interaction: firstInteraction,

      hoverCount,
      attemptCount,

      page: window.location.href,
    }

    console.log("📤 FINAL PAYLOAD:", payload)

    fetch("/api/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
  }
  const people: Record<string, string> = {
    h7k2: "Helia",
    s9p4: "Roya",
    n3x8: "Mania",
    p5v6: "Parmida",
    p1f1: "Paniz",
  }
  const peopleImages: Record<string, string> = {
    h7k2: "/Mavis.jpg",
    s9p4: "/screen3.png",
    n3x8: "/screen2.png",
    p5v6: "parmidascreen.png",
    p1f1: "panizscreen.png",
  }
  // const personName = people[id || ""] || "Unknown"
  // useEffect(() => {
  //   document.title = personName
  // }, [personName])
  const personName = people[id || ""] || "Unknown"
  const personImage = peopleImages[id || ""] || "/default.jpg"
  const isMobile =
    /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent)

  const device = isMobile ? "Mobile" : "Desktop"
  const [timeOnPage, setTimeOnPage] = useState(0)
  const hasSentRef = useRef(false)
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOnPage(Date.now() - startTime)
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (hasSentRef.current) return
    hasSentRef.current = true

    const payload = {
      event: "site_opened",
      personName,
      id,

      device: {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screen: `${window.screen.width}x${window.screen.height}`,
        mobile: /Android|iPhone|iPad|iPod|Mobile/i.test(navigator.userAgent),
      },

      entry_time: startTime,
      time_on_page: 0,
      click_count: clickCount,
      first_interaction: firstInteraction,
      page: window.location.href,
    }

    fetch("/api/submit-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
      .then(res => {
        console.log("✅ SENT OK", res.status)
      })
      .catch(err => {
        console.log("❌ SEND FAILED", err)
      })
  }, [])
  useEffect(() => {
    document.title = personName
  }, [personName])

  useEffect(() => {
    document.title = personName

    let favicon =
      document.querySelector("link[rel='icon']") as HTMLLinkElement | null

    if (!favicon) {
      favicon = document.createElement("link")
      favicon.rel = "icon"
      document.head.appendChild(favicon)
    }

    const icons: Record<string, string> = {
      h7k2: "/helia.jpg",
      s9p4: "/icon-dark-32x32.png",
      n3x8: "/icon-dark-32x32.png",
      p5v6: "/parmida.jpeg",
      p1f1: "/paniz.jpeg",

    }

    favicon.href = icons[id || ""] || "/favicon.ico"
  }, [personName, id])
  const messages = [
    `?${personName}, Want to go on a date with me `,
    ` الان مطمئنی؟`,
    "مطمئنی؟",
    "کاملا مطمئنی؟",
    "چقد سختی اه",
    "بزن آره دیگه",
    "فکر کنم دیگه باید قبول کنی",
    "وا",
    "واا",
    "وااا",
    "وااااااااااا"
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
    if (!firstInteraction) {
      setFirstInteraction("hover_no_button")
    }

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
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setShowIntro(false)
    }, 2500)

    return () => clearTimeout(t)
  }, [])
  return (
    <div
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 z-0">
        <Grainient
          className="w-full h-full"
          color1="#ff0077"
          color2="#8b4e7d"
          color3="#9000b9"
          timeSpeed={0.25}
          colorBalance={0}
          warpStrength={1}
          warpFrequency={5}
          warpSpeed={2}
          warpAmplitude={50}
          blendAngle={0}
          blendSoftness={0.05}
          rotationAmount={0}
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
          rayColor1="#96c8ff"
          rayColor2="#96c8ff"
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
            onClick={() => {
              const updated = { ...clickCount, yes: clickCount.yes + 1 }

              setClickCount(updated)

              sendFinalData("yes", updated)

              onAccept()
            }}
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
              const updated = { ...clickCount, no: clickCount.no + 1 }

              setClickCount(updated)

              sendFinalData("no", updated)
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
            {personName} یکم صبر کن
          </div>
        </div>
      )}
      {showIntro && (
        <div className="absolute inset-0 z-50 flex flex-col gap-5 items-center justify-center bg-black/90 text-white text-2xl font-bold">
          تب مرورگرو چک کردی؟ 👀
          <Image
            src={personImage}
            alt={personName}
            width={250}
            height={250}
            className="rounded-xl object-cover"
          />
        </div>

      )}
    </div>
  )
}