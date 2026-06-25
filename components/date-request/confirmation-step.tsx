"use client"

import { useState } from "react"
import { Calendar, Clock, Sparkles, PartyPopper } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Grainient from "@/components/Grainient"
import SideRays from "../SideRays"
import { useEffect, useRef } from "react"
import emailjs from "@emailjs/browser"
import { gregorianToJalali } from "@/lib/utils"
import BorderGlow from "../BorderGlow"
import SplitText from "@/components/SplitText"
import { getScene, SurpriseScene } from "@/lib/surprise"
import Image from "next/image"
interface DateDetails {
  date: Date | null
  time: string | null
  activity: string | null
  anythingElse: string
}

interface ConfirmationStepProps {
  details: DateDetails
  onReset: () => void
  userName: string
}

const activityLabels: Record<string, { label: string; icon: string }> = {
  restaurant: { label: "رستوران", icon: "🍽️" },
  cafe: { label: "کافه", icon: "☕" },
  movie: { label: "سینما", icon: "🎬" }, // ✅ درستش اینه
  park: { label: "پارک", icon: "🌳" },
  museum: { label: "موزه", icon: "🎨" },
  shopping: { label: "خرید", icon: "🛍️" },
  bowling: { label: "بولینگ", icon: "🎳" },
  arcade: { label: "گیم‌نت", icon: "🎮" },
  surprise: { label: "سورپرایز", icon: "🎁" },
}

const timeLabels: Record<string, string> = {
  "10:00": "۱۰:۰۰",
  "12:00": "۱۲:۰۰",
  "14:00": "۱۴:۰۰",
  "16:00": "۱۶:۰۰",
  "18:00": "۱۸:۰۰",
  "20:00": "۲۰:۰۰",
  "22:00": "۲۲:۰۰",
}

const months = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"
]

export function ConfirmationStep({
  details,
  onReset,
  userName,
}: ConfirmationStepProps) {

  const [status, setStatus] =
    useState<"idle" | "sending" | "success" | "error">("idle")

  const sentRef = useRef(false)

  useEffect(() => {
    if (sentRef.current) return
    sentRef.current = true

    const send = async () => {
      try {
        setStatus("sending")

        await await emailjs.send(
          "service_mln5ozs",
          "template_d2060zs",
          {
            userName,
            date: details.date ? formatDate(details.date) : "",
            time: details.time ?? "",
            activity: details.activity ?? "",
            anythingElse: details.anythingElse ?? "",
          },
          "eI8XC4_hCdTBm5ivO"
        )

        setStatus("success")
      } catch (err) {
        console.error(err)
        setStatus("error")
      }
    }

    send()
  }, [])
  const [animationKey, setAnimationKey] = useState(0)
  const [scene, setScene] = useState<SurpriseScene | null>(null)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)
  const formatDate = (date: Date | null) => {
    if (!date) return ""

    const [jy, jm, jd] = gregorianToJalali(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )

    return `${jd} ${months[jm - 1]}`
  }

  const activity = activityLabels[details.activity] ?? {
    label: "As You Wish",
    icon: ""
  }
  useEffect(() => {
    if (!details.activity) return

    const s = getScene(details.activity)
    setScene(s)

    const a = new Audio(s.music)
    a.loop = true
    a.volume = 0.6

    setAudio(a)

    // autoplay (browser اجازه بده)
    a.play().catch(() => {
      console.log("autoplay blocked")
    })

    return () => {
      a.pause()
      a.src = ""
    }
  }, [details.activity])
  const onSendMessage = () => {

    const telegramUrl = `https://t.me/piadrol`
    window.open(telegramUrl, "_blank")

  }


  return (
    <div className="relative flex min-h-screen items-center justify-center w-full px-4 py-8">
      <div className="absolute inset-0">
        <Grainient className="w-full h-full" />
      </div>
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



      <BorderGlow className="relative z-20 md:w-[60%] w-full bg-red-500"
        edgeSensitivity={30}

        glowColor="40 80 80"
        backgroundColor="transparent"
        borderRadius={28}
        glowRadius={40}
        glowIntensity={1}
        coneSpread={25}
        animated={false}
        colors={['#c084fc', '#f472b6', '#38bdf8']}
      >
        <Card className="w-full border-transparent bg-transparent shadow-none">
          <CardHeader className="text-center">
            <div className="rounded-full w-10 h-10 bg-white/20 flex justify-center pt-1.5 items-center mx-auto mb-2">

              <PartyPopper className="mx-auto mb-2 h-6 w-6 text-primary" />
            </div>
            <CardTitle className="text-primary">{userName} Date Confirmed</CardTitle>
            <SplitText
              key={animationKey}
              // text="✨ Ch dkhtri bh bh ✨"
              text="Take care pretty Lady ✨"
              className="text-center text-white mt-5"
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
          </CardHeader>

          <CardContent className="space-y-5">

            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 space-y-4 shadow-lg">

              <div className="flex items-center justify-between text-sm">
                <span className="opacity-60">📅 تاریخ</span>
                <span className="font-medium text-right">
                  {details.date ? formatDate(details.date) : ""}
                </span>
              </div>

              <div className="h-px bg-white/10" />

              <div className="flex items-center justify-between text-sm">
                <span className="opacity-60">⏰ ساعت</span>
                <span className="font-medium">
                  {details.time ? timeLabels[details.time] : ""}
                </span>
              </div>

              <div className="h-px bg-white/10" />
              <div className="flex items-center justify-between text-sm">
                <span className="opacity-60">✨ فعالیت</span>

                <span className="font-medium">
                  {details.activity
                    ? activityLabels[details.activity]?.label
                    : ""}
                </span>
              </div>

            </div>

            <div className="text-center text-xs px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70">
              {status === "sending" && "در حال ارسال..."}
              {status === "success" && "ارسال شد ✔"}
              {status === "error" && "خطا در ارسال"}
            </div>

            <Button onClick={onSendMessage} className="w-full">
              ?Berim Tel
            </Button>
            {scene && audio && (
              <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 flex items-center gap-4">

                {/* cover */}
                <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
                  <Image src={"/drake.jpg"} className="rounded-lg" alt="cover" width={1000}
                    height={500} />
                </div>

                {/* info */}
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">
                    {scene.mood}
                  </p>

                  <p className="text-xs text-white/60">
                    now playing
                  </p>
                </div>

                {/* play button */}
                <button
                  onClick={() => audio.play()}
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition"
                >
                  ▶
                </button>

              </div>
            )}

          </CardContent>
        </Card>
      </BorderGlow>
    </div>
  )
}