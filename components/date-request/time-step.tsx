"use client"

import { useState } from "react"
import { Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Grainient from "@/components/Grainient"
import SideRays from "../SideRays"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface TimeStepProps {
  onSelect: (time: string) => void
  onBack: () => void
}

const timeSlots = [
  { value: "10:00", label: "۱۰:۰۰ صبح" },
  { value: "12:00", label: "۱۲:۰۰ ظهر" },
  { value: "14:00", label: "۱۴:۰۰ بعدازظهر" },
  { value: "16:00", label: "۱۶:۰۰ عصر" },
  { value: "18:00", label: "۱۸:۰۰ غروب" },
  { value: "20:00", label: "۲۰:۰۰ شب" },
  { value: "21:00", label: "۲۱:۰۰ شب" },
  { value: "22:00", label: "۲۲:۰۰ شب" },
]

export function TimeStep({ onSelect, onBack }: TimeStepProps) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [showTooLateDialog, setShowTooLateDialog] = useState(false)
  const [isGradientLoaded, setIsGradientLoaded] = useState(false)

  const handleTimeSelect = (timeValue: string) => {
    const hour = parseInt(timeValue.split(":")[0])

    if (hour >= 18) {
      setShowTooLateDialog(true)
      return
    }

    setSelectedTime(timeValue)
  }

  const handleConfirm = () => {
    if (selectedTime) {
      onSelect(selectedTime)
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
          rayColor1="#ffb3d9"
          rayColor2="#8d8dff"
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
      <Card className="relative z-20 w-full max-w-md border-border bg-card shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl text-card-foreground">
            چه ساعتی بیام دنبالت؟
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot.value}
                onClick={() => handleTimeSelect(slot.value)}
                className={`
                  flex items-center justify-center gap-2 rounded-xl border-2 p-4 text-center transition-all
                  ${selectedTime === slot.value
                    ? "border-primary bg-primary/10 shadow-md"
                    : "border-border hover:border-primary/50 hover:bg-secondary"
                  }
                `}
              >

                <span className="font-medium text-card-foreground">
                  {slot.label}
                </span>
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">

            <Button
              onClick={handleConfirm}
              disabled={!selectedTime}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              تأیید ساعت
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

      {/* Too Late Dialog */}
      <AlertDialog open={showTooLateDialog} onOpenChange={setShowTooLateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-2xl">
              nch nch nch
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base">
              دیگه حداقل 16:00 انتخاب کن
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogAction className="w-full">
            باشه
          </AlertDialogAction>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
