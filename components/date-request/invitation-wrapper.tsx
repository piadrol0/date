"use client"

import { useEffect, useState } from "react"
import { DateRequestFlow } from "./date-request-flow"
import Image from "next/image"

export default function InvitationWrapper() {
    const [showIntro, setShowIntro] = useState(true)

    useEffect(() => {
        const t = setTimeout(() => {
            setShowIntro(false)
        }, 3000)

        return () => clearTimeout(t)
    }, [])

    return (
        <>
            <DateRequestFlow />

            {showIntro && (
                <div className="fixed flex-col gap-5 inset-0 z-50 flex items-center justify-center bg-black text-white text-2xl font-bold pointer-events-none ">
                   
                </div>
            )}
        </>
    )
}