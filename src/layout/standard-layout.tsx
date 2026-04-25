import { Footer } from "@/components/common/footer"
import { Navbar } from "@/components/common/navbar"

interface StandartLayoutProps {
  children: React.ReactNode
  footerTopFade?: boolean
  headerBottomFade?: boolean
}

export const StandartLayout: React.FC<StandartLayoutProps> = ({
  children,
  footerTopFade = false,
  headerBottomFade = false,
}) => {
  return (
    <>
      <Navbar withBottomFade={headerBottomFade} />
      {children}
      <Footer withTopFade={footerTopFade} />
    </>
  )
}
