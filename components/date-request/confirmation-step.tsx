"use client"

import { useEffect, useState } from "react"
import { Calendar, Clock, Sparkles, PartyPopper } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Grainient from "@/components/Grainient"
import SideRays from "../SideRays"
import GlareHover from "@/components/GlareHoverProps"
import { gregorianToJalali } from "@/lib/utils"
import BorderGlow from "../BorderGlow"
import SplitText from "@/components/SplitText"
interface DateDetails {
  date: Date
  time: string
  activity: string
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
  cinema: { label: "سینما", icon: "🎬" },
  park: { label: "پارک", icon: "🌳" },
  museum: { label: "موزه", icon: "🎨" },
  shopping: { label: "خرید", icon: "🛍️" },
  concert: { label: "کنسرت", icon: "🎵" },
  picnic: { label: "پیک‌نیک", icon: "🧺" },
  beach: { label: "ساحل", icon: "🏖️" },
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

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [animationKey, setAnimationKey] = useState(0)

  const formatDate = (date: Date) => {
    const [jy, jm, jd] = gregorianToJalali(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )
    return `${jd} ${months[jm - 1]}`
  }

  const activity = activityLabels[details.activity]
  const onSendMessage = () => {

    const telegramUrl = `https://t.me/piadrol`
    window.open(telegramUrl, "_blank")

  }
  useEffect(() => {
    const send = async () => {
      setStatus("sending")

      try {
        const res = await fetch("/api/submit-form", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userName,
            date: formatDate(details.date),
            time: details.time,
            activity: details.activity,
            anythingElse: details.anythingElse,
          }),
        })

        const text = await res.text()

        if (!res.ok) {
          console.log("API ERROR:", text)
          setStatus("error")
          return
        }

        setStatus(res.ok ? "success" : "error")
      } catch {
        setStatus("error")
      }
    }

    send()
  }, [details, userName])

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
              text="✨ Ch dkhtri bh bh ✨"
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
                  {formatDate(details.date)}
                </span>
              </div>

              <div className="h-px bg-white/10" />

              <div className="flex items-center justify-between text-sm">
                <span className="opacity-60">⏰ ساعت</span>
                <span className="font-medium">
                  {timeLabels[details.time]}
                </span>
              </div>

              <div className="h-px bg-white/10" />

              <div className="flex items-center justify-between text-sm">
                <span className="opacity-60">✨ فعالیت</span>
                <span className="font-medium">
                  {activity?.icon} {activity?.label}
                </span>
              </div>

            </div>

            <div className="text-center text-xs px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-white/70">
              {status === "sending" && "در حال ارسال..."}
              {status === "success" && "ارسال شد ✔"}
              {status === "error" && "خطا در ارسال"}
            </div>

            <Button onClick={onSendMessage} className="w-full">
              وصلم کن به آریا
            </Button>

          </CardContent>
        </Card>
      </BorderGlow>
    </div>
  )
}