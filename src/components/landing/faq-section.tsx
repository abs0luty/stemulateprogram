import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { FC } from "react"

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: "How to contact us?",
    answer: `If you have any questions about the admission process or the program itself, feel free to reach out!
You can email us at admissions@stemulateprogram.com or connect with us on our social media accounts (links located in the footer below).`,
  },
  {
    question: "Who can apply?",
    answer: `The program is open to high school and undergraduate students
             interested in STEM, economics, and social sciences.`,
  },
  {
    question: "What’s the program duration?",
    answer: `The program lasts for 2 months, with additional support available for publication and presentation.`,
  },
  {
    question: "How much does it cost?",
    answer: `The bootcamp costs $400. Early registration fee: $370 (for students who complete payment before May 20th). Limited discounts may also be available for the most competitive students in the bootcamp. If your code is valid, it applies a $50 discount to the program fee and marks your application for priority consideration during review.`,
  },
  {
    question: "How do I apply?",
    answer: `Submit your application through our online portal and complete an interview.`,
  },
  {
    question: "What is the workload like for students?",
    answer: `The program is designed to be rigorous but manageable, with weekly mentor
             check-ins and independent research assignments. Students typically dedicate
             8-10 hours per week to research and related activities. Flexible scheduling
             ensures participants can balance STEMulate with other commitments.`,
  },
]

export const FAQSection: FC = () => (
  <section className="px-5 md:px-14 bg-neutral-900 text-white">
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>
            <p className="text-xl md:text-2xl font-serif">{faq.question}</p>
          </AccordionTrigger>
          <AccordionContent>
            <p className="md:text-xl">{faq.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  </section>
)
