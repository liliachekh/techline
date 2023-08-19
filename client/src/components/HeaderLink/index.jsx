function HeaderLink({ refTarget, text, className, toggleBurgerMenu }) {

  const scrollTo = (ref) => {
    ref && (
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth',
      }));
    toggleBurgerMenu && toggleBurgerMenu()
  };

  return (
    <li className={className}>
      <button onClick={() => scrollTo(refTarget)}>
        {text}
      </button>
    </li >
  )
}

export default HeaderLink