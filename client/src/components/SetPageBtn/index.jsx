import { useSearchParams } from 'react-router-dom';
import styles from './setPageBtn.module.scss';
import { scrollToRef } from '../../utils';

function SetPageBtn({ scrollTo, productsLength, label, direction }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const perPage = searchParams.get('perPage');
  const page = searchParams.get('startPage');

  const disabled = direction && productsLength < perPage;

  async function clickHandler() {
    if (disabled) return;
    const newPage = direction ? Number(page || 1) + 1 : Number(page || 1) - 1;
    if (newPage === 0) return;

    sort
      ? setSearchParams({ sort: sort, perPage: perPage || 10, startPage: newPage })
      : setSearchParams({ perPage: perPage || 10, startPage: newPage })
    
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