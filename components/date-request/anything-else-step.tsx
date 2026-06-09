"use client"

import { useState } from "react"
import { MessageSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Grainient from "@/components/Grainient"
import SideRays from "../SideRays"

interface AnythingElseStepProps {
    onSubmit: (text: string) => void
    onBack: () => void
}

export function AnythingElseStep({
    onSubmit,
    onBack,
}: AnythingElseStepProps) {
    const [text, setText] = useState("")
    const [isGradientLoaded, setIsGradientLoaded] = useState(false)

    return (
        <div className="relative flex min-h-screen flex-col items-center justify-center px-4 py-8">
            <div className="absolute inset-0 z-0">
                <Grainient
                    className="w-full h-full"
                    // color1="#ffffff"
                    // color2="#ff2757"
                    // color3="#B497CF"
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
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <MessageSquare className="h-6 w-6 text-primary" />
                    </div>

                    <CardTitle className="text-2xl text-card-foreground ">
                        ?Anything Else
                    </CardTitle>

                    <ul className="text-sm text-muted-foreground ">
                        <li>چیزی هست بهم بگی؟</li>
                        <li>
                            این قسمت <span className="text-primary"> دوماه</span> دیگه پیامش میاد برام و میتونی چیزی خواستی بنویسی 
                        </li>
                    </ul>
                </CardHeader>

                <CardContent className="space-y-4">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        // placeholder="اگه چیزی هست که اینجا بگی بهم بگو. دسترسی این قسمت دوماه دیگه برای من باز میشه و یادگاری میمونه اینجا"
                        className="min-h-45 w-full rounded-[12px] border border-border bg-background p-4 resize-none outline-none "
                    />

                    <div className="flex gap-3">


                        <Button
                            className="flex-1"
                            onClick={() => onSubmit(text)}
                        >
                            ادامه
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {!isGradientLoaded && (
                <div className="absolute inset-0 z-30 flex flex-col items-center justify-center gap-4 bg-black/70 text-white">
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
                    <div className="text-center text-lg font-medium">
                        کمی صبر کن تا صفحه آماده بشه
                    </div>
                </div>
            )}
        </div>
    )
}