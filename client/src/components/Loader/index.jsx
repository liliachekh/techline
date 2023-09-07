import style from './loader.module.scss';

function Loader() {
  return (
    <div className={style.three}>
      <div className={style.three__body}>
        <div className={style.three__bodyDot}></div>
        <div className={style.three__bodyDot}></div>
        <div className={style.three__bodyDot}></div>
      </div>
    </div>
  );
}

export default Loader;
