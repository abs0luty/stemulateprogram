import { StandartLayout } from "@/layout/standard-layout"
import { FC, useEffect, useRef, useState } from "react"

const useVantaEffect = () => {
  const [vantaEffect, setVantaEffect] = useState<any>(null)
  const myRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!vantaEffect) {
      import("vanta/dist/vanta.globe.min.js")
        .then((vantaModule) => {
          if (!myRef.current) return

          const GLOBE = vantaModule.default
          const effect = GLOBE({
            el: myRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.0,
            minWidth: 200.0,
            scale: 1.0,
            scaleMobile: 1.0,
            color: 0xff3f3f,
            backgroundColor: "#171717",
          })
          setVantaEffect(effect)
        })
        .catch((err) => {
          console.error("Error loading Vanta Globe:", err)
        })
    }
    return () => {
      if (vantaEffect) {
        vantaEffect.destroy()
      }
    }
  }, [vantaEffect])

  return { myRef, vantaEffect }
}

const AboutUsPageContent: FC = () => {
  const { myRef } = useVantaEffect()

  return (
    <div ref={myRef} className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_left,_rgba(0,0,0,0.18),_transparent_44%)]" />
      <main className="relative min-h-screen px-4 py-10 text-white md:px-8 md:py-16">
        <div className="mx-auto flex min-h-[calc(100vh-7rem)] max-w-6xl items-center">
          <section className="w-full max-w-3xl rounded-[2rem] border border-white/12 bg-black/45 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-md md:p-10">
            <div className="space-y-6">
              <h1 className="max-w-2xl text-4xl font-semibold leading-none tracking-tight md:text-6xl">
                About Us
              </h1>

              <div className="max-w-2xl space-y-5 text-base leading-8 text-white/88 md:text-xl md:leading-9">
                <p>
                  STEMulate was created to address a critical gap in research
                  education. Our mission is to train over{" "}
                  <span className="font-semibold text-white">5000 students</span>{" "}
                  in research skills and project development across STEM,
                  economics, and social sciences.
                </p>
                <p>
                  Through structured learning opportunities and hands-on
                  guidance, we bridge the gap between classroom education and
                  real-world research, helping students pursue academic
                  excellence and contribute meaningfully to the scientific
                  community.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export const AboutUsPage: FC = () => (
  <StandartLayout footerTopFade>
    <AboutUsPageContent />
  </StandartLayout>
)
