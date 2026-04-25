import { FC } from "react"
import { StandartLayout } from "@/layout/standard-layout"

const ContactInfoPageContent: FC = () => {
  return (
    <main className="flex min-h-screen items-center bg-neutral-900 px-4 py-24 text-neutral-100 md:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-6 md:grid-cols-[minmax(0,1.35fr)_auto] md:items-center">
        <section className="max-w-4xl space-y-6">
          <p className="font-serif text-3xl font-bold sm:text-3xl md:text-5xl">
            Contact Information
          </p>
          <p className="text-base leading-7 text-neutral-300 md:text-xl">
            We&apos;re here to help. Reach out with questions about admissions,
            programs, timelines, or anything else related to STEMulate.
          </p>
          <div className="space-y-4 text-base md:text-xl">
            <p className="leading-7 text-neutral-200">
              Email:{" "}
              <a
                href="mailto:admissions@stemulateprogram.com"
                className="text-red-400 transition hover:text-red-300 hover:underline"
              >
                admissions@stemulateprogram.com
              </a>
            </p>
            <p className="leading-7 text-neutral-200">
              Phone number:{" "}
              <a
                href="tel:+77753036077"
                className="text-red-400 transition hover:text-red-300 hover:underline"
              >
                +7 (775) 303-6077
              </a>
            </p>
            <p className="leading-7 text-neutral-300">
              We aim to respond to all inquiries within 24-48 business hours.
            </p>
          </div>
        </section>

        <section className="flex justify-center md:justify-start">
          <img
            src="/contact.svg"
            alt="Contact STEMulate"
            className="w-full max-w-[9rem] md:max-w-[12rem]"
          />
        </section>
      </div>
    </main>
  )
}

export const ContactInfoPage: FC = () => (
  <StandartLayout footerTopFade headerBottomFade>
    <ContactInfoPageContent />
  </StandartLayout>
)
