"use client"

import { useState } from "react"
import { ChevronRight, ChevronLeft, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Grainient from "@/components/Grainient"
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

const persianDays = ["ش", "ی", "د", "س", "چ", "پ", "ج"]

export function CalendarStep({ onSelect, onBack }: CalendarStepProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [showTooLateDialog, setShowTooLateDialog] = useState(false)

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const [todayJalaliYear, todayJalaliMonth, todayJalaliDay] = gregorianToJalali(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  )

  const [currentJalaliYear, setCurrentJalaliYear] = useState(todayJalaliYear)
  const [currentJalaliMonth, setCurrentJalaliMonth] = useState(todayJalaliMonth)

  const isDateSelectable = (date: Date) => {
    const [jy, jm, jd] = gregorianToJalali(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    )

    return (
      jy === todayJalaliYear &&
      jm === todayJalaliMonth &&
      jd >= 16 &&
      jd <= 19
    )
  }

  const getJalaliMonthLength = (jy: number, jm: number) => {
    if (jm <= 6) return 31
    if (jm <= 11) return 30

    const [gy, gm, gd] = jalaliToGregorian(jy, jm, 30)
    const [jy2, jm2, jd2] = gregorianToJalali(gy, gm - 1, gd)

    return jy2 === jy && jm2 === jm && jd2 === 30 ? 30 : 29
  }

  const getJalaliMonthStartWeekday = (jy: number, jm: number) => {
    const [gy, gm, gd] = jalaliToGregorian(jy, jm, 1)
    const weekday = new Date(gy, gm - 1, gd).getDay()
    return (weekday + 1) % 7
  }

  const getDaysInJalaliMonth = (jy: number, jm: number) => {
    const monthLength = getJalaliMonthLength(jy, jm)
    const startingDay = getJalaliMonthStartWeekday(jy, jm)

    const days: (number | null)[] = []
    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }

    for (let i = 1; i <= monthLength; i++) {
      days.push(i)
    }

    return days
  }

  const handlePrevMonth = () => {
    if (currentJalaliMonth === 1) {
      setCurrentJalaliMonth(12)
      setCurrentJalaliYear((year) => year - 1)
    } else {
      setCurrentJalaliMonth((month) => month - 1)
    }
  }

  const handleNextMonth = () => {
    if (currentJalaliMonth === 12) {
      setCurrentJalaliMonth(1)
      setCurrentJalaliYear((year) => year + 1)
    } else {
      setCurrentJalaliMonth((month) => month + 1)
    }
  }

  const handleDateSelect = (day: number) => {
    const [gy, gm, gd] = jalaliToGregorian(
      currentJalaliYear,
      currentJalaliMonth,
      day,
    )
    const date = new Date(gy, gm - 1, gd)
    date.setHours(0, 0, 0, 0)

    const [jy, jm, jd] = gregorianToJalali(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
    )

    if (
      jy === todayJalaliYear &&
      jm === todayJalaliMonth &&
      jd > 19
    ) {
      setShowTooLateDialog(true)
      return
    }

    if (isDateSelectable(date)) {
      setSelectedDate(date)
    }
  }

  const handleConfirm = () => {
    if (selectedDate) {
      onSelect(selectedDate)
    }
  }

  const days = getDaysInJalaliMonth(currentJalaliYear, currentJalaliMonth)

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-8">
      <div className="absolute inset-0 z-0">
        <Grainient
          className="w-full h-full"
          color1="#ffffff"
          color2="#ff2757"
          color3="#B497CF"
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
      <Card className="relative z-10 w-full max-w-md border-border bg-card shadow-xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Calendar className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl text-card-foreground">
            روز رو انتخاب کن
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Month Navigation */}
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="icon" onClick={handlePrevMonth}>
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <span className="text-lg font-semibold text-card-foreground">
              {persianMonths[currentJalaliMonth - 1]} {currentJalaliYear}
            </span>
            <Button variant="ghost" size="icon" onClick={handleNextMonth}>
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Days of Week */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {persianDays.map((day) => (
              <div
                key={day}
                className="py-2 text-sm font-medium text-muted-foreground"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((day, index) => {
              if (day === null) {
                return <div key={`empty-${index}`} />
              }

              const [gy, gm, gd] = jalaliToGregorian(
                currentJalaliYear,
                currentJalaliMonth,
                day,
              )
              const date = new Date(gy, gm - 1, gd)
              date.setHours(0, 0, 0, 0)

              const isSelectable = isDateSelectable(date)
              const isSelected =
                selectedDate?.toDateString() === date.toDateString()
              const isToday =
                currentJalaliYear === todayJalaliYear &&
                currentJalaliMonth === todayJalaliMonth &&
                day === todayJalaliDay

              return (
                <button
                  key={day}
                  onClick={() => handleDateSelect(day)}
                  disabled={!isSelectable}
                  className={`
                    aspect-square rounded-lg p-2 text-sm font-medium transition-all
                    ${!isSelectable ? "cursor-not-allowed text-muted-foreground/40" : "cursor-pointer hover:bg-primary/10"}
                    ${isSelected ? "bg-primary text-primary-foreground shadow-md" : ""}
                    ${isToday && !isSelected ? "border-2 border-primary" : ""}
                  `}
                >
                  {day}
                </button>
              )
            })}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            
            <Button
              onClick={handleConfirm}
              disabled={!selectedDate}
              className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
            >
              تایید
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Too Late Dialog */}
      <AlertDialog open={showTooLateDialog} onOpenChange={setShowTooLateDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center text-2xl">
              خیلی دیره! ⏰
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center text-base">
              روز رو تا ۱۹ خرداد انتخاب کن. بعدش خیلی دیره میشه!
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
