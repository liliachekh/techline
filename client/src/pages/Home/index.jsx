import AboutUs from "../../components/AboutUs";
import Header from "../../components/Header";
import BecomePartner from "../../components/BecomePartner";
// import style from "./Home.module.scss"
import B2B from "../../components/B2B"
import { useRef } from "react"
import { useInView } from "framer-motion"
import BackToTop from "../../components/BackToTop";

export function Home() {
  const partner = useRef(null);
  const about = useRef(null);
  const b2b = useRef(null);

  const partnerInView = useInView(partner, { margin: "-50% 0px" })
  const aboutInView = useInView(about, { margin: "-50% 0px" })
  const b2bInView = useInView(b2b, { margin: "-50% 0px" })

  const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <>
      <Header
        refList={{ partner, about, b2b }}
        inViewList={{ 'partner': partnerInView, 'about': aboutInView, 'b2b': b2bInView }} />
      <BecomePartner refName={partner} />
      <AboutUs refName={about} />
      <B2B refName={b2b} />
      <BackToTop scrollToTop={scrollToTop}/>
    </>
  )
}