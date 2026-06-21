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

const timeGroups = [
  {
    label: "صبح ☀️",
    slots: ["10:00", "12:00"],
  },
  {
    label: "بعدازظهر 🌤",
    slots: ["14:00", "16:00"],
  },
  {
    label: "شب 🌙",
    slots: ["18:00", "20:00", "21:00", "22:00"],
  },
]

const getSuggestedTime = () => {
  const hour = new Date().getHours()

  if (hour < 12) return "14:00"
  if (hour < 16) return "18:00"
  return "16:00"
}

export function TimeStep({ onSelect }: TimeStepProps) {
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [showTooLateDialog, setShowTooLateDialog] = useState(false)

  const suggestedTime = getSuggestedTime()

  const handleTimeSelect = (timeValue: string) => {
    const hour = parseInt(timeValue.split(":")[0])

    if (hour >= 23) {
      setShowTooLateDialog(true)
      return
    }

    setSelectedTime(timeValue)
  }

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-8">

      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Grainient className="w-full h-full" />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none">
        <SideRays />
      </div>

      <Card className="relative z-20 w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>چه ساعتی بیام دنبالت؟</CardTitle>

          {/* Suggestion */}
          <p className="text-sm text-muted-foreground mt-2">
            پیشنهاد ما: <span className="font-semibold text-primary">{suggestedTime}</span>
          </p>
        </CardHeader>

        <CardContent className="space-y-6">

          {timeGroups.map((group) => (
            <div key={group.label} className="space-y-2">

              <p className="text-sm text-muted-foreground">
                {group.label}
              </p>

              <div className="grid grid-cols-2 gap-2">
                {group.slots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => handleTimeSelect(slot)}
                    className={`
                      relative rounded-xl border-2 p-3 text-center transition-all
                      ${selectedTime === slot
                        ? "border-primary bg-primary/10"
                        : "border-border hover:border-primary/50 hover:bg-secondary"
                      }
                      ${suggestedTime === slot && !selectedTime
                        ? "border-yellow-400 bg-yellow-400/10"
                        : ""
                      }
                    `}
                  >
                    {slot}

                    {suggestedTime === slot && (
                      <span className="absolute -top-2 -right-2 text-[10px] bg-yellow-400 text-black px-2 py-[2px] rounded-full">
                        پیشنهادی
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}

          <Button
            onClick={() => selectedTime && onSelect(selectedTime)}
            disabled={!selectedTime}
            className="w-full"
          >
            تأیید ساعت
          </Button>

        </CardContent>
      </Card>

      {/* Dialog */}
      <AlertDialog open={showTooLateDialog} onOpenChange={setShowTooLateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>یه کم دیر شد 😏</AlertDialogTitle>
            <AlertDialogDescription>
              بهتره یه ساعت زودتر انتخاب کنی
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