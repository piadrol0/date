import type { Metadata } from 'next'
import { Vazirmatn } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import Grainient from '@/components/Grainient';

const vazirmatn = Vazirmatn({ subsets: ["arabic"] });

export const metadata: Metadata = {
  title: 'Date Request',
  description: 'A romantic date invitation',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fa" dir="rtl" className="">
      <body className={`${vazirmatn.className} antialiased`}>
        <div style={{ width: '100%', height: '100vh', position: 'relative' }}>

          {/* Background */}
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
              blendSoftness={0.05}
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

          {/* Content */}
          <div className="relative z-10">
            {children}
          </div>

          {process.env.NODE_ENV === 'production' && <Analytics />}
        </div>
      </body>
    </html>
  )
}
