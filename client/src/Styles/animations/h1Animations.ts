const letterContainerVariants = {
  before: { transition: { staggerChildren: 0.015 } }, // When the letters show they stagger with a duration of 0.015 seconds
  after: { transition: { staggerChildren: 0.03 } }, // When the letters hide they stagger with a duration of 0.03 seconds
};

// Variants for animating each letter
const letterVariants = {
  // before state or initial
  before: {
    opacity: 0, // invisible!
    y: 20, // a bit lower than final position
    transition: {
      type: 'spring', //physical spring transition
      damping: 12, //how quickly the spring slows down
      stiffness: 200, // how "stiff" the spring is
    }
  },

  // after state or exit
  after: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 200,
    }
  }
};

export { letterVariants, letterContainerVariants }