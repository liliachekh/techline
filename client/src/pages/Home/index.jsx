import AboutUs from "../../components/AboutUs";
import Header from "../../components/Header";
import BecomePartner from "../../components/BecomePartner";
// import style from "./Home.module.scss"
import B2B from "../../components/B2B";

export function Home() {
  return (
    <>
      <Header />
      <BecomePartner />
      <AboutUs />
      <B2B />
    </>
  );
}
