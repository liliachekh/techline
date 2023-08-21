const animateOnScroll = (amount) => ({
  initial: "hidden",
  whileInView: "visible",
  viewport: { amount: amount, once: true },
})

export const animateFromBottom = (custom, amount = 0.5) => ({
  ...animateOnScroll(amount),
  variants: {
    hidden: {
      y: 100,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: custom * 0.2 }
    },
  },
})

export const animateFromLeft = (custom, amount = 0.5) => ({
  ...animateOnScroll(amount),
  variants: {
    hidden: {
      x: -100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: custom * 0.2 }
    },
  },
})

export const animateFromRight = (custom, amount = 0.5) => ({
  ...animateOnScroll(amount),
  variants: {
    hidden: {
      x: 100,
      opacity: 0,
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, delay: custom * 0.2 }
    },
  },
})

export const animateBackToTop = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0, transition: { duration: 0.6 } }
};

export const animateLangSelect = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } }
};

export const animateMobileMenu = {
  initial: { right: '-60%' },
  animate: { right: 0, transition: { duration: 0.3 } },
  exit: { right: '-60%', transition: { duration: 0.3} }
};