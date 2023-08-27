import { useSearchParams } from 'react-router-dom';
import styles from './sortByBtn.module.scss';
import { Arrow } from '../icons/arrow';

function SortByBtn({ label, type }) {
  const [searchParams, setSearchParams] = useSearchParams();

  async function clickHandler() {
    let newSort = '';
    if (searchParams.get('sort') === type) {
      newSort = `-${type}`
    } else if (searchParams.get('sort') === `-${type}`) {
      newSort = ''
    } else {
      newSort = type
    }

    newSort
      ? setSearchParams({ sort: newSort, perPage: searchParams.get('perPage') || 10, startPage: 1 })
      : setSearchParams({ perPage: searchParams.get('perPage') || 10, startPage: 1 })
  }

  return (
    <button
      className={`${styles.btn} ${searchParams.get('sort') === type ? styles.arrowUp : styles.arrowDown}`}
      type='button'
      onClick={clickHandler}>
      {label}{searchParams.get('sort')?.includes(type) && <Arrow fill={'#f7fbfa'} />}
    </button>
  )
}

export default SortByBtn