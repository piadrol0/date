"use client"

import { useState } from "react"
import { ChevronRight, ChevronLeft, Calendar } from "lucide-react"
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
import { gregorianToJalali, jalaliToGregorian } from "@/lib/utils"

interface CalendarStepProps {
  onSelect: (date: Date) => void
  onBack: () => void
}

const persianMonths = [
  "فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور",
  "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند",
]

const persianDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"]

export function CalendarStep({ onSelect }: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showTooLateDialog, setShowTooLateDialog] = useState(false)

  // 🧠 Tehran-safe today
  const today = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Asia/Tehran" })
  )
  today.setHours(0, 0, 0, 0)

  const [todayJy, todayJm, todayJd] = gregorianToJalali(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  )

  const [currentJy, setCurrentJy] = useState(todayJy)
  const [currentJm, setCurrentJm] = useState(todayJm)

  // ✅ only today → 19 allowed
  const isDateSelectable = (date: Date) => {
    const [jy, jm, jd] = gregorianToJalali(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )

    return (
      jy === todayJy &&
      jm === todayJm &&
      jd >= todayJd &&
      jd <= 19
    )
  }

  // ✅ month length
  const getMonthLength = (m: number) =>
    m <= 6 ? 31 : m <= 11 ? 30 : 29

  // ✅ correct weekday start
  const getFirstWeekday = (jy: number, jm: number) => {
    const [gy, gm, gd] = jalaliToGregorian(jy, jm, 1)
    return (new Date(gy, gm - 1, gd).getDay() + 6) % 7
  }

  const handlePrev = () => {
    if (currentJm === 1) {
      setCurrentJm(12)
      setCurrentJy(y => y - 1)
    } else {
      setCurrentJm(m => m - 1)
    }
  }

  const handleNext = () => {
    if (currentJm === 12) {
      setCurrentJm(1)
      setCurrentJy(y => y + 1)
    } else {
      setCurrentJm(m => m + 1)
    }
  }

  const handleSelect = (day: number) => {
    const [gy, gm, gd] = jalaliToGregorian(
      currentJy,
      currentJm,
      day
    )

    const date = new Date(gy, gm - 1, gd)
    date.setHours(0, 0, 0, 0)

    if (!isDateSelectable(date)) {
      setShowTooLateDialog(true)
      return
    }

    setSelectedDate(date)
  }

  const firstWeekday = getFirstWeekday(currentJy, currentJm)
  const monthLength = getMonthLength(currentJm)

  const cells: (number | null)[] = []

  for (let i = 0; i < firstWeekday; i++) cells.push(null)
  for (let d = 1; d <= monthLength; d++) cells.push(d)

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
      <Card className="relative z-20 w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <CardTitle>روز رو انتخاب کن</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          {/* nav */}
          <div className="flex justify-between items-center">
            <Button variant="ghost" size="icon" onClick={handlePrev}>
              <ChevronRight />
            </Button>

            <span className="font-semibold">
              {persianMonths[currentJm - 1]} {currentJy}
            </span>

            <Button variant="ghost" size="icon" onClick={handleNext}>
              <ChevronLeft />
            </Button>
          </div>

          {/* days header */}
          <div className="grid grid-cols-7 text-center text-sm text-muted-foreground">
            {persianDays.map(d => <div key={d}>{d}</div>)}
          </div>

          {/* grid */}
          <div className="grid grid-cols-7 gap-1">
            {cells.map((day, i) => {
              if (!day) return <div key={i} />

              const [gy, gm, gd] = jalaliToGregorian(
                currentJy,
                currentJm,
                day
              )

              const date = new Date(gy, gm - 1, gd)
              date.setHours(0, 0, 0, 0)

              const isSelectable = isDateSelectable(date)
              const isSelected =
                selectedDate?.toDateString() === date.toDateString()

              const isToday =
                currentJy === todayJy &&
                currentJm === todayJm &&
                day === todayJd

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(day)}
                  disabled={!isSelectable}
                  className={`
                    aspect-square rounded-lg text-sm
                    ${!isSelectable ? "text-muted-foreground/40" : "hover:bg-primary/10"}
                    ${isSelected ? "bg-primary text-white" : ""}
                    ${isToday && !isSelected ? "border border-primary" : ""}
                  `}
                >
                  {day}
                </button>
              )
            })}
          </div>

          <Button
            className="w-full"
            disabled={!selectedDate}
            onClick={() => selectedDate && onSelect(selectedDate)}
          >
            تایید
          </Button>
        </CardContent>
      </Card>

      <AlertDialog open={showTooLateDialog} onOpenChange={setShowTooLateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>خیلی دیره ⏰</AlertDialogTitle>
            <AlertDialogDescription>
              فقط تا ۱۹ خرداد قابل انتخابه
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