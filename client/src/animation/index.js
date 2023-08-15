export const fromLeft = {
  hidden: {
    x: -100,
    opacity: 0,
  },
  visible: custom => ({
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: custom * 0.2 }
  }),
}

export const fromRight = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  visible: custom => ({
    x: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: custom * 0.2 }
  })
}

export const fromBottom = {
  hidden: {
    y: 100,
    opacity: 0,
  },
  visible: custom => ({
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, delay: custom * 0.2 }
  })
}