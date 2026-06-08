"use client"

import { useState, useEffect } from "react"
import { InvitationStep } from "./invitation-step"
import { CalendarStep } from "./calendar-step"
import { TimeStep } from "./time-step"
import { ActivityStep } from "./activity-step"
import { AnythingElseStep } from "./anything-else-step"
import { ConfirmationStep } from "./confirmation-step"

type Step =
  | "invitation"
  | "imageSequence"
  | "calendar"
  | "time"
  | "activity"
  | "anythingElse"
  | "confirmation"

interface DateDetails {
  date: Date | null
  time: string | null
  activity: string | null
  anythingElse: string
}

export function DateRequestFlow() {
  const [currentStep, setCurrentStep] = useState<Step>("invitation")

  const [dateDetails, setDateDetails] = useState<DateDetails>({
    date: null,
    time: null,
    activity: null,
    anythingElse: "",
  })

  useEffect(() => {
    console.log(dateDetails)
  }, [dateDetails])

  const handleAcceptInvitation = () => {
    setCurrentStep("calendar")
  }

  const handleSelectDate = (date: Date) => {
    setDateDetails((prev) => ({ ...prev, date }))
    setCurrentStep("time")
  }

  const handleSelectTime = (time: string) => {
    setDateDetails((prev) => ({ ...prev, time }))
    setCurrentStep("activity")
  }

  const handleSelectActivity = (activity: string) => {
    setDateDetails((prev) => ({
      ...prev,
      activity,
    }))

    setCurrentStep("anythingElse")
  }

  const handleAnythingElse = (text: string) => {
    setDateDetails((prev) => ({
      ...prev,
      anythingElse: text,
    }))

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

  return (
    <main className="min-h-screen bg-background">
      {currentStep === "invitation" && (
        <InvitationStep
          onAccept={handleAcceptInvitation}
          onReject={() => {}}
        />
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

      {currentStep === "anythingElse" && (
        <AnythingElseStep
          onSubmit={handleAnythingElse}
          onBack={() => setCurrentStep("activity")}
        />
      )}

      {currentStep === "confirmation" &&
        dateDetails.date &&
        dateDetails.time &&
        dateDetails.activity && (
          <ConfirmationStep
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