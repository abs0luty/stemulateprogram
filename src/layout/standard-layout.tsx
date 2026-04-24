import { Footer } from "@/components/common/footer"
import { Navbar } from "@/components/common/navbar"

interface StandartLayoutProps {
  children: React.ReactNode
  footerTopFade?: boolean
}

export const StandartLayout: React.FC<StandartLayoutProps> = ({
  children,
  footerTopFade = false,
}) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer withTopFade={footerTopFade} />
    </>
  )
}
