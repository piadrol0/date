"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"

import { InvitationStep } from "./invitation-step"
import { CalendarStep } from "./calendar-step"
import { TimeStep } from "./time-step"
import { ActivityStep } from "./activity-step"
import { AnythingElseStep } from "./anything-else-step"
import { ConfirmationStep } from "./confirmation-step"

type Step =
  | "invitation"
  | "calendar"
  | "time"
  | "activity"
  | "anythingElse"
  | "confirmation"

type DateDetails = {
  date: Date | null
  time: string | null
  activity: string | null
  anythingElse: string
}

export function DateRequestFlow() {
  const searchParams = useSearchParams()
  const id = searchParams.get("id")

  const people: Record<string, string> = {
    h7k2: "Helia",
    s9p4: "Roya",
    n3x8: "Mania",
    p5v6: "Parmida",
    p1f1: "Paniz",
  }

  const personName = people[id ?? ""] || "Unknown"

  const [currentStep, setCurrentStep] = useState<Step>("invitation")

  const [dateDetails, setDateDetails] = useState<DateDetails>({
    date: null,
    time: null,
    activity: null,
    anythingElse: "",
  })

  const handleAcceptInvitation = () => setCurrentStep("calendar")

  const handleSelectDate = (date: Date) => {
    setDateDetails((p) => ({ ...p, date }))
    setCurrentStep("time")
  }

  const handleSelectTime = (time: string) => {
    setDateDetails((p) => ({ ...p, time }))
    setCurrentStep("activity")
  }

  const handleSelectActivity = (data: {
    activity: string
    date?: Date
    time?: string
    isSurprise?: boolean
  }) => {
    setDateDetails(prev => ({
      ...prev,
      activity: data.activity,
      time: data.time ?? prev.time
    }))

    setCurrentStep("anythingElse")
  }

  const handleAnythingElse = (text: string) => {
    setDateDetails((p) => ({ ...p, anythingElse: text }))
    setCurrentStep("confirmation")
  }

  const handleReset = () => {
    setDateDetails({
      date: null,
      time: null,
      activity: null,
      anythingElse: "",
    })
    setCurrentStep("invitation")
  }
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => {
      setShowIntro(false)
    }, 2500)

    return () => clearTimeout(t)
  }, [])
  return (
    <main className="min-h-screen bg-background">
      {showIntro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 text-white text-2xl font-bold">
          تب مرورگرو چک کردی؟ 👀
        </div>
      )}
      {currentStep === "invitation" && (
        <InvitationStep
          onAccept={handleAcceptInvitation}
          onReject={() => { }}
          date={dateDetails.date?.toString() ?? ""}
          time={dateDetails.time ?? ""}
          activity={dateDetails.activity ?? ""}
          anythingElse={dateDetails.anythingElse}
        />
      )}

      {currentStep === "calendar" && (
        <CalendarStep onSelect={handleSelectDate} onBack={() => setCurrentStep("invitation")} />
      )}

      {currentStep === "time" && (
        <TimeStep onSelect={handleSelectTime} onBack={() => setCurrentStep("calendar")} />
      )}

      {currentStep === "activity" && (
        <ActivityStep onSelect={handleSelectActivity} onBack={() => setCurrentStep("time")} />
      )}

      {currentStep === "anythingElse" && (
        <AnythingElseStep onSubmit={handleAnythingElse} onBack={() => setCurrentStep("activity")} />
      )}

      {currentStep === "confirmation" &&
        (
          <ConfirmationStep
            userName={personName}
            details={{
              date: dateDetails.date,
              time: dateDetails.time,
              activity: dateDetails.activity,
              anythingElse: dateDetails.anythingElse,
            }}
            onReset={handleReset}
          />
        )}
    </main>
  )
}