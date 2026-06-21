"use client"

import { useState, useEffect } from "react"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Grainient from "@/components/Grainient"
import SideRays from "../SideRays"

/* ---------- props ---------- */

interface ActivityStepProps {
  onSelect: (data: {
    activity: string
    date?: Date
    time?: string
    isSurprise?: boolean
  }) => void
  onBack: () => void
}

/* ---------- activities ---------- */

const activities = [
  { value: "restaurant", label: "رستوران", icon: "🍽️" },
  { value: "cafe", label: "کافه", icon: "☕" },
  { value: "park", label: "فضای باز", icon: "🌳" },
  { value: "museum", label: "گالری", icon: "🎨" },
  { value: "cat", label: "موزه گربه", icon: "🐱" },
  { value: "movie", label: "سینما", icon: "🎬" },
  { value: "bowling", label: "بیلیارد", icon: "🎱" },
]

/* ---------- utils ---------- */

const getHourFromTime = (time?: string) => {
  if (!time) return null
  const h = parseInt(time.split(":")[0])
  return isNaN(h) ? null : h
}

/* ---------- vibe ---------- */

const getVibe = (activity: string, hour: number) => {
  const isNight = hour >= 18
  const isMorning = hour < 12

  switch (activity) {
    case "restaurant":
      return isNight ? "شام نیاوران 🌙" : "ناهار قیطریه 🍝"

    case "cafe":
      return isMorning ? "ویونا اندرزگو ☕" : "ربلان قیطریه ☕"

    case "park":
      return isNight ? "پارک قیطریه 🌙" : "بوستان نیاوران 🌳"

    case "movie":
      return isNight ? "کوروش 🎬" : "ملت 🎬"

    case "cat":
      return "موزه گربه 🐱"

    case "museum":
      return "گالری دستان 🎨"

    case "bowling":
      return "بولینگ بام ولنجک 🎱"

    default:
      return "قیطریه ساده ✨"
  }
}

/* ---------- surprise ---------- */

const generateSurprise = () => {
  const now = new Date()

  const dayOffset = Math.floor(Math.random() * 7)
  const date = new Date(now)
  date.setDate(now.getDate() + dayOffset)

  const hours = [14, 16, 18, 20, 22]
  const hour = hours[Math.floor(Math.random() * hours.length)]

  date.setHours(hour, 0, 0, 0)

  const activityPool = [
    "cafe",
    "restaurant",
    "park",
    "movie",
    "bowling",
    "museum",
  ]

  const activity =
    activityPool[Math.floor(Math.random() * activityPool.length)]

  return {
    activity,
    date,
    time: `${hour}:00`,
    isSurprise: true,
  }
}

/* ---------- component ---------- */

export function ActivityStep({ onSelect }: ActivityStepProps) {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [isGradientLoaded, setIsGradientLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsGradientLoaded(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  const hour = getHourFromTime(selectedTime ?? undefined) || new Date().getHours()

  const vibe = selectedActivity
    ? getVibe(selectedActivity, hour)
    : null

  /* ---------- handlers ---------- */

  const handleNormalSelect = () => {
    if (!selectedActivity) return

    onSelect({
      activity: selectedActivity,
      time: selectedTime ?? "18:00"
    })
  }

  const handleSurprise = () => {
    const result = generateSurprise()

    onSelect({
      activity: result.activity,
      date: result.date,
      time: result.time,
      isSurprise: true,
    })
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-8">

      {/* bg */}
      <div className="absolute inset-0 z-0">
        <Grainient className="w-full h-full" />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <SideRays />
      </div>

      {/* card */}
      <Card className="relative z-20 w-full max-w-lg">

        <CardHeader className="text-center">

          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>

          <CardTitle>چیکار کنیم؟</CardTitle>

          {vibe && (
            <div className="mt-3 rounded-xl bg-primary/10 p-2">
              <p className="text-xs text-muted-foreground">vibe پیشنهادی</p>
              <p className="font-semibold text-primary">{vibe}</p>
            </div>
          )}

        </CardHeader>

        <CardContent className="space-y-4">

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">

            {activities.map((activity) => (
              <button
                key={activity.value}
                onClick={() => setSelectedActivity(activity.value)}
                className={`
                  flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all
                  ${selectedActivity === activity.value
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50 hover:bg-secondary"
                  }
                `}
              >
                <span className="text-3xl">{activity.icon}</span>
                <span className="font-semibold">{activity.label}</span>
              </button>
            ))}

          </div>

          <Button
            onClick={handleNormalSelect}
            disabled={!selectedActivity}
            className="w-full"
          >
            تأیید فعالیت
          </Button>

          <Button
            onClick={handleSurprise}
            variant="outline"
            className="w-full"
          >
            🎁 Surprise Mode
          </Button>

        </CardContent>
      </Card>

      {!isGradientLoaded && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/70 text-white">
          در حال آماده‌سازی...
        </div>
      )}

    </div>
  )
}