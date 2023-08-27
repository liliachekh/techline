import { useSearchParams } from 'react-router-dom';
import styles from './perPageBtn.module.scss';
import { scrollToRef } from '../../utils';

function PerPageBtn({ newPerPage, scrollTo }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sort = searchParams.get('sort');
  const perPage = searchParams.get('perPage');
  const activeBtn = (Number(perPage) === newPerPage || (!perPage && newPerPage === 10));

  async function clickHandler() {
    if (!activeBtn) {
      sort
        ? setSearchParams({ sort: sort, perPage: newPerPage, startPage: 1 })
        : setSearchParams({ perPage: newPerPage, startPage: 1 })
    }
    scrollToRef(scrollTo);
  }

  return (
    <button
      className={`${styles.btn} ${activeBtn ? styles.btn_active : ''}`}
      type='button'
      onClick={clickHandler}>
      {newPerPage}
    </button>
  )
}

export default PerPageBtn