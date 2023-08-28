import styles from './perPageBtn.module.scss';
import { scrollToRef } from '../../utils';
import useQueryString from '../../hooks';

function PerPageBtn({ newPerPage, scrollTo }) {
  const { sort, perPage, setSearchParams } = useQueryString();

  const activeBtn = (Number(perPage) === newPerPage || (!perPage && newPerPage === 10));

  async function clickHandler() {
    if (!activeBtn) {
      sort
        ? setSearchParams({ sort, perPage: newPerPage, startPage: 1 })
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