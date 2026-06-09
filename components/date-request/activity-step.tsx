"use client"

import { useState } from "react"
import { Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Grainient from "@/components/Grainient"
import SideRays from "../SideRays"

interface ActivityStepProps {
  onSelect: (activity: string) => void
  onBack: () => void
}

const activities = [
  { value: "restaurant", label: "رستوران", icon: "🍽️", description: "پاستا؟ پیتزا؟ چی؟" },
  { value: "cafe", label: "کافه", icon: "☕", description: "نولان / بنیز مسخرشون کنیم" },
  { value: "park", label: "فضای باز", icon: "🌳", description: "بام ولنجک " },
  { value: "museum", label: "موزه/گالری", icon: "🎨", description: "گالری اعتماد/سیحون " },
  { value: "shopping", label: "مال", icon: "🛍️", description: "idk why" },
  { value: "movie", label: "سینما", icon: "🎬", description: "سینما ماشین" },
  { value: "bowling", label: "بیلیارد", icon: "🎱", description: "بام ولنجک" },
  // { value: "arcade", label: "گیم نت", icon: "🎮", description: "بازی و هیجان" },
  { value: "surprise", label: "سورپرایز!", icon: "🎁", description: "هر چی تو بخوای" },
]

export function ActivityStep({ onSelect, onBack }: ActivityStepProps) {
  const [selectedActivity, setSelectedActivity] = useState<string | null>(null)
  const [isGradientLoaded, setIsGradientLoaded] = useState(false)

  const handleConfirm = () => {
    if (selectedActivity) {
      onSelect(selectedActivity)
    }
  }

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
      <Card className="relative z-20 w-full max-w-lg border-border bg-card shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl text-card-foreground">
            چیکار کنیم؟
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {activities.map((activity) => (
              <button
                key={activity.value}
                onClick={() => setSelectedActivity(activity.value)}
                className={`
                  flex flex-col items-center gap-2 rounded-[12px] border-2 p-4 text-center transition-all
                  ${selectedActivity === activity.value
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-border hover:border-primary/50 hover:bg-secondary"
                  }
                `}
              >
                <span className="text-3xl">{activity.icon}</span>
                <span className="font-semibold text-card-foreground">
                  {activity.label}
                </span>
                <span className="text-xs text-muted-foreground">
                  {activity.description}
                </span>
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">

            <Button
              onClick={handleConfirm}
              disabled={!selectedActivity}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              تأیید فعالیت
            </Button>
          </div>
        </CardContent>
      </Card>

      {!isGradientLoaded && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-4 bg-black/70 text-white">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
          <div className="text-center text-lg font-medium">
            کمی صبر کن تا صفحه آماده بشه
          </div>
        </div>
      )}
    </div>
  )
}
