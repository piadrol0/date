"use client"

import { useEffect, useState } from "react"
import { Heart, Calendar, Clock, Sparkles, PartyPopper } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Grainient from "@/components/Grainient"
import { gregorianToJalali } from "@/lib/utils"
import SideRays from "../SideRays"

interface DateDetails {
  date: Date
  time: string
  activity: string
}

interface ConfirmationStepProps {
  details: DateDetails
  onReset: () => void
}

const activityLabels: Record<string, { label: string; icon: string }> = {
  restaurant: { label: "رستوران", icon: "🍽️" },
  cafe: { label: "کافه", icon: "☕" },
  cinema: { label: "سینما", icon: "🎬" },
  park: { label: "پارک", icon: "🌳" },
  museum: { label: "موزه/گالری", icon: "🎨" },
  shopping: { label: "خرید", icon: "🛍️" },
  concert: { label: "کنسرت", icon: "🎵" },
  picnic: { label: "پیک‌نیک", icon: "🧺" },
  beach: { label: "ساحل", icon: "🏖️" },
  bowling: { label: "بولینگ", icon: "🎳" },
  arcade: { label: "گیم نت", icon: "🎮" },
  surprise: { label: "سورپرایز!", icon: "🎁" },
}

const timeLabels: Record<string, string> = {
  "10:00": "۱۰:۰۰ صبح",
  "12:00": "۱۲:۰۰ ظهر",
  "14:00": "۱۴:۰۰ بعدازظهر",
  "16:00": "۱۶:۰۰ عصر",
  "18:00": "۱۸:۰۰ غروب",
  "20:00": "۲۰:۰۰ شب",
  "21:00": "۲۱:۰۰ شب",
  "22:00": "۲۲:۰۰ شب",
}

const dayLabels = [
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنج‌شنبه",
  "جمعه",
  "شنبه",
]

const persianMonths = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "آبان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
]

export function ConfirmationStep({ details, onReset }: ConfirmationStepProps) {
  const [isGradientLoaded, setIsGradientLoaded] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle")

  const formatDate = (date: Date) => {
    const [jy, jm, jd] = gregorianToJalali(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )
    const month = persianMonths[jm - 1]
    return `${jd} ${month}`
  }

  const getDayLabel = (date: Date) => dayLabels[date.getDay()]

  const activity = activityLabels[details.activity]

  useEffect(() => {
    const submitDetails = async () => {
      setSubmitStatus("sending")

      try {
        const formattedDate = formatDate(details.date)
        const formattedDay = getDayLabel(details.date)
        const formattedTime = timeLabels[details.time] || details.time
        const formattedActivity = activity?.label || details.activity

        const emailBody = `تاریخ: ${formattedDate}\nروز: ${formattedDay}\nساعت: ${formattedTime}\nفعالیت: ${formattedActivity}`

        const response = await fetch("/api/submit-form", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            submissionType: "date-request",
            emailSubject: `قرار ${formattedDate} - ${formattedTime}`,
            emailText: emailBody,
            date: details.date.toISOString(),
            formattedDate,
            day: formattedDay,
            time: details.time,
            formattedTime,
            activity: details.activity,
            formattedActivity,
            activityIcon: activity?.icon || "",
          }),
        })

        if (response.ok) {
          setSubmitStatus("success")
        } else {
          setSubmitStatus("error")
          console.error("submit-form failed", await response.text())
        }
      } catch (error) {
        console.error("submit-form error", error)
        setSubmitStatus("error")
      }
    }

    submitDetails()
  }, [details])

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-8">
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
      {/* Celebration animation */}
      <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-bounce text-2xl"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          >
            {/* {["💕", "✨", "🎉", "💖", "🌟", "💗"][Math.floor(Math.random() * 6)]} */}
          </div>
        ))}
      </div>

      <Card className="relative z-20 w-full max-w-md border-border bg-card shadow-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
            <PartyPopper className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl text-card-foreground">
            !Date Confirmed
          </CardTitle>
          <p className="mt-2 text-muted-foreground">
            che dkhtri bh bh
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4 rounded-xl bg-secondary/50 p-6">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Calendar className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">تاریخ</p>
                <p className="font-semibold text-card-foreground">
                  {formatDate(details.date)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ساعت</p>
                <p className="font-semibold text-card-foreground">
                  {timeLabels[details.time] || details.time}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">فعالیت</p>
                <p className="font-semibold text-card-foreground">
                  {activity.icon} {activity.label}
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-secondary/50 p-4 text-center text-sm text-muted-foreground">
            {submitStatus === "sending" && "در حال ارسال اطلاعات به ایمیل..."}
            {submitStatus === "success" && "اطلاعات با موفقیت ارسال شد."}
            {submitStatus === "error" && "ارسال اطلاعات به ایمیل ناموفق بود. لطفا دوباره امتحان کنید."}
          </div>

          <Button
            asChild
            variant="outline"
            className="w-full border-border"
          >
            <a
              href="https://t.me/piadrol"
              target="_blank"
              rel="noopener noreferrer"
            >
              پیام به سلطان
            </a>
          </Button>
        </CardContent>
      </Card>


    </div>
  )
}
