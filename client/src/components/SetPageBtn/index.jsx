import styles from './setPageBtn.module.scss';
import { scrollToRef } from '../../utils';
import useQueryString from '../../hooks';

function SetPageBtn({ scrollTo, productsLength, label, direction }) {
  const { sort, perPage, page, setSearchParams } = useQueryString();

  const disabled = direction && productsLength < perPage;

  async function clickHandler() {
    if (disabled) return;
    const newPage = direction ? Number(page || 1) + 1 : Number(page || 1) - 1;
    if (newPage === 0) return;

    sort
      ? setSearchParams({ sort, perPage, startPage: newPage })
      : setSearchParams({ perPage, startPage: newPage })
    scrollToRef(scrollTo);
  }

  return (
    <button
      className={`${styles.btn} ${disabled || ((Number(page) === 1 || !page) && !direction) ? styles.btn_disabled : ''} ${direction ? styles.rotate : ''}`}
      type='button'
      onClick={clickHandler}>
      {label}
    </button>
  )
}

export default SetPageBtn