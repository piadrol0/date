"use client"

import { useState, useEffect } from "react"
import { InvitationStep } from "./invitation-step"
import { CalendarStep } from "./calendar-step"
import { TimeStep } from "./time-step"
import { ActivityStep } from "./activity-step"
import { ConfirmationStep } from "./confirmation-step"

type Step = "invitation" | "calendar" | "time" | "activity" | "confirmation"

interface DateDetails {
  date: Date | null
  time: string | null
  activity: string | null
}

export function DateRequestFlow() {
  const [currentStep, setCurrentStep] = useState<Step>("invitation")
  const [dateDetails, setDateDetails] = useState<DateDetails>({
    date: null,
    time: null,
    activity: null,
  })

  // Log data whenever it changes
  useEffect(() => {
    if (dateDetails.date || dateDetails.time || dateDetails.activity) {
      console.log("=== DATE REQUEST DATA ===")
      console.log("Date:", dateDetails.date?.toISOString())
      console.log("Time:", dateDetails.time)
      console.log("Activity:", dateDetails.activity)
      console.log("Full Details:", JSON.stringify({
        date: dateDetails.date?.toISOString(),
        time: dateDetails.time,
        activity: dateDetails.activity,
      }, null, 2))
      console.log("========================")
    }
  }, [dateDetails])

  const handleAcceptInvitation = () => {
    setCurrentStep("calendar")
  }

  const handleSelectDate = (date: Date) => {
    setDateDetails((prev) => ({ ...prev, date }))
    console.log("[v0] Date selected:", date.toISOString())
    setCurrentStep("time")
  }

  const handleSelectTime = (time: string) => {
    setDateDetails((prev) => ({ ...prev, time }))
    console.log("[v0] Time selected:", time)
    setCurrentStep("activity")
  }

  const handleSelectActivity = (activity: string) => {
    setDateDetails((prev) => ({ ...prev, activity }))
    console.log("[v0] Activity selected:", activity)

    // Log final data for n8n webhook integration
    const finalData = {
      date: dateDetails.date?.toISOString(),
      time: dateDetails.time,
      activity: activity,
      timestamp: new Date().toISOString(),
    }
    console.log("=== FINAL DATE REQUEST DATA (for n8n) ===")
    console.log(JSON.stringify(finalData, null, 2))
    console.log("=========================================")

    setCurrentStep("confirmation")
  }

  const handleReset = () => {
    setDateDetails({ date: null, time: null, activity: null })
    setCurrentStep("invitation")
  }

  return (
    <main className="min-h-screen bg-background">
      {currentStep === "invitation" && (
        <InvitationStep onAccept={handleAcceptInvitation} />
      )}
      {currentStep === "calendar" && (
        <CalendarStep
          onSelect={handleSelectDate}
          onBack={() => setCurrentStep("invitation")}
        />
      )}
      {currentStep === "time" && (
        <TimeStep
          onSelect={handleSelectTime}
          onBack={() => setCurrentStep("calendar")}
        />
      )}
      {currentStep === "activity" && (
        <ActivityStep
          onSelect={handleSelectActivity}
          onBack={() => setCurrentStep("time")}
        />
      )}
      {currentStep === "confirmation" && dateDetails.date && dateDetails.time && dateDetails.activity && (
        <ConfirmationStep
          details={{
            date: dateDetails.date,
            time: dateDetails.time,
            activity: dateDetails.activity,
          }}
          onReset={handleReset}
        />
      )}
    </main>
  )
}
