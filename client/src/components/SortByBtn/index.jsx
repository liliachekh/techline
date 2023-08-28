import styles from './sortByBtn.module.scss';
import { Arrow } from '../icons/arrow';
import useQueryString from '../../hooks';

function SortByBtn({ label, type }) {
  const { sort, perPage, setSearchParams } = useQueryString()

  async function clickHandler() {
    let newSort = '';
    if (sort === type) {
      newSort = `-${type}`
    } else if (sort === `-${type}`) {
      newSort = ''
    } else {
      newSort = type
    }

    newSort
      ? setSearchParams({ sort: newSort, perPage, startPage: 1 })
      : setSearchParams({ perPage, startPage: 1 })
  }

  return (
    <button
      className={`${styles.btn} ${sort === type ? styles.arrowUp : styles.arrowDown}`}
      type='button'
      onClick={clickHandler}>
      {label}{sort?.includes(type) && <Arrow fill={'#f7fbfa'} />}
    </button>
  )
}

export default SortByBtn