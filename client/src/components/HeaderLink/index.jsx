function HeaderLink({ refTarget, text, className }) {

  const scrollTo = (ref) => {
    ref && (
      window.scrollTo({
        top: ref.current.offsetTop,
        behavior: 'smooth',
      }));
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