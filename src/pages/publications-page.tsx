import { FC, useState } from "react"
import { StandartLayout } from "@/layout/standard-layout"
import { FileBoxIcon, PresentationIcon } from "lucide-react"
import { TransitionLink } from "@/components/common/transition-link"

interface Publication {
  name: string
  student: string
  pdfLink?: string
  presentationLink?: string
}

const publications: Publication[] = [
  {
    name: `Explainable AI in Healthcare: Interpreting Machine Learning’s
Dementia Classification On Imbalanced Multi-Domain Clinical Data.`,
    student: "Tuan Anh Ngo",
    pdfLink: "/papers/Paper_TuanAnhNgo.pdf",
    presentationLink: "/presentations/Presentation_TuanAnhNgo.pptx",
  },
  {
    name: `How can dynamic pricing models be successfully implemented into
digital marketplaces to benefit SMEs in Kazakhstan?`,
    student: "Safiyakhon Zulfikarova",
    pdfLink: "/papers/Paper_Safiyakhon_Zulfikarova.pdf",
    presentationLink: undefined,
  },
  {
    name: `Hosting the Olympics: a comparative study of developed and
developing economies.`,
    student: "Yesseniya Zhumagatova",
    pdfLink: "/papers/Paper_Yesseniya_Zhumagatova.pdf",
    presentationLink: "/presentations/Presentation_Yesseniya_Zhumagatova.pdf",
  },
  {
    name: "Relevance and impact of neurography in Kazakhstan.",
    student: "Alsana",
    pdfLink: "/papers/Paper_Alsana.pdf",
    presentationLink: "/presentations/Presentation_Alsana.pptx",
  },
  {
    name: `Do the changes in human microbiome affect the development of autoimmune
diseases and can the study of these changes fundamentally alter treatment protocols
and approaches to autoimmune diseases?`,
    student: "Amina Smak",
    pdfLink: "/papers/Paper_Amina_Smak.pdf",
    presentationLink: "/presentations/Presentation_Amina_Smak.pdf",
  },
  {
    name: `Why does Kazakhstan have a more developed startup ecosystem
than Kyrgyzstan, although both share a similar Soviet past?`,
    student: "Amir Bushumbayev",
    pdfLink: "/papers/Paper_Amir_Bushumbayev.pdf",
    presentationLink: "/presentations/Presentation_Amir_Bushumbayev.pdf",
  },
  {
    name: `Why is Kazakhstani education system in public schools not as
successful in promoting creativity compared to specialized/private schools?`,
    student: "Aruzhan Olzhabay",
    pdfLink: "/papers/Paper_Aruzhan_Olzhabay.pdf",
    presentationLink: "/presentations/Presentation_Aruzhan_Olzhabay.pdf",
  },
  {
    name: `How do migraines affect the brain and our cognitive skills?`,
    student: "Bolat Leila",
    pdfLink: "/papers/Paper_Bolat_Leila.pdf",
    presentationLink: "/presentations/Presentation_Bolat_Leila.pdf",
  },
]

const PublicationsPageContent: FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [selectedPublication, setSelectedPublication] =
    useState<Publication | null>(null)

  const openModal = (publication: Publication) => {
    setSelectedPublication(publication)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedPublication(null)
  }

  return (
    <main className="min-h-screen bg-white text-black py-24 px-4 md:px-8 flex flex-col items-center">
      <div className="max-w-5xl mx-auto space-y-8 w-full">
        <p className="font-bold text-3xl sm:text-4xl md:text-5xl font-serif">
          Publications
        </p>
        <p className="text-xl sm:text-2xl">
          <b>Research made by our students</b>.
        </p>
        <p className="text-lg md:text-xl">
          Here every student can get published their research paper and
          presentation. If you want to get published, please contact us. Haven't
          applied yet?{" "}
          <TransitionLink
            to="/apply"
            className="underline text-red-600 hover:text-red-800 transition-colors duration-200"
          >
            Apply now!
          </TransitionLink>
        </p>
        <hr className="border-t border-gray-300" />

        <ul className="space-y-6 md:space-y-8">
          {publications.map((pub, index) => (
            <li key={index} className="md:text-xl group">
              <a
                onClick={() => openModal(pub)}
                className="block p-4 -mx-4 rounded-lg cursor-pointer transition-all duration-300 ease-in-out

                           focus:outline-none focus:ring-2 focus:ring-opacity-50"
              >
                <span className="font-semibold group-hover:text-red-600 transition-colors duration-200">
                  "{pub.name}" by {pub.student}.
                </span>{" "}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {showModal && selectedPublication && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-lg p-8 shadow-xl max-w-2xl w-full transform transition-all duration-150 scale-95 opacity-100 animate-scale-in relative">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl font-bold rounded-full w-8 h-8 flex items-center justify-center focus:outline-none transition-colors duration-200"
              aria-label="Close"
            >
              &times;
            </button>
            <h3 className="text-lg md:text-xl font-bold mb-8 md:mb-4 text-gray-900 leading-tight font-serif">
              {selectedPublication.name} by {selectedPublication.student}
            </h3>

            <div className="grid md:flex md:flex-row grid-cols-1 md:space-x-3 md:space-y-0 space-y-1 text-base">
              {selectedPublication.pdfLink && (
                <a
                  href={selectedPublication.pdfLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-600 py-2 px-4 rounded-md
                             transition-all duration-200 ease-in-out flex items-center justify-center gap-2
                             focus:outline-none focus:ring-2 focus:ring-opacity-50"
                >
                  <FileBoxIcon className="w-5 h-5" />
                  View Research Paper
                </a>
              )}
              {selectedPublication.presentationLink && (
                <a
                  href={selectedPublication.presentationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-600 py-2 px-4 rounded-md
                             transition-all duration-200 ease-in-out flex items-center justify-center gap-2
                             focus:outline-none focus:ring-2 focus:ring-opacity-50"
                >
                  <PresentationIcon className="w-5 h-5" />
                  View Presentation
                </a>
              )}
            </div>
            {!selectedPublication.pdfLink &&
              !selectedPublication.presentationLink && (
                <p className="text-gray-500 text-center mt-4">
                  No links available for this publication.
                </p>
              )}
          </div>
        </div>
      )}
    </main>
  )
}

export const PublicationsPage: FC = () => (
  <StandartLayout>
    <PublicationsPageContent />
  </StandartLayout>
)
