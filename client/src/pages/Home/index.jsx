import AboutUs from "../../components/AboutUs";
import Header from "../../components/Header";
import BecomePartner from "../../components/BecomePartner";
import Footer from "../../components/Footer";
// import style from "./Home.module.scss"
import B2B from "../../components/B2B"
import { useRef } from "react"
// import { useCallback, useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"
import BackToTop from "../../components/BackToTop";
import ProductList from "../../components/ProductList";

export function Home() {
  const partner = useRef(null);
  const about = useRef(null);
  const b2b = useRef(null);
  const contacts = useRef(null);

  const partnerInView = useInView(partner, { margin: "-50% 0px" });
  const aboutInView = useInView(about, { margin: "-50% 0px" });
  const b2bInView = useInView(b2b, { margin: "-50% 0px" });
  const contactsInView = useInView(contacts, { margin: "-50% 0px" });

  // ====================================================================================================================
  // ====================================================================================================================
  // ====================================================================================================================
  // const [products, setProducts] = useState(null);

  // async function fetchData(url, reqBody) {
  //   try {
  //     const response = await fetch(url, reqBody);
  //     if (!response.ok) {
  //       // handleError(response, 401);
  //       const error = await response.json();
  //       throw new Error(error?.loginOrEmail || error?.password || error?.message || error?.email || error);
  //     }
  //     return await response.json();
  //   } catch (error) {
  //     throw new Error(error?.message);
  //   }
  // }

  // const productLoad = useCallback(async () => {
  //   const products = await fetchData('https://sea-turtle-app-tgzpt.ondigitalocean.app/api/products');
  //   setProducts(products);
  // }, [setProducts])

  // useEffect(() => {
  //   productLoad()
  // }, [productLoad])
  // ====================================================================================================================
  // ====================================================================================================================
  // ====================================================================================================================

  return (
    <>
      <Header
        refList={{ partner, about, b2b, contacts }}
        inViewList={{ 'partner': partnerInView, 'about': aboutInView, 'b2b': b2bInView, 'contacts': contactsInView }} />
      <BecomePartner refName={partner} />
      <AboutUs refName={about} />
      <B2B refName={b2b} />

      <ProductList  />

      <Footer refName={contacts} />
      <BackToTop />
    </>
  )
}
