import { useNavigate } from 'react-router-dom';
import styles from './sortByBtn.module.scss';
import { Arrow } from '../icons/arrow';

function SortByBtn({ query, setQuery, label, type }) {
  const navigate = useNavigate();

  async function clickHandler() {
    let newQuary = {};
    if (query.sort.includes(`sort=+${type}`)) {
      newQuary = { ...query, sort: `sort=-${type}` }
    } else if (query.sort.includes(`sort=-${type}`)) {
      newQuary = { ...query, sort: '' }
    } else {
      newQuary = { ...query, sort: `sort=+${type}` }
    }

    setQuery(newQuary);
    const queryString = `?${newQuary.sort && newQuary.sort + '&'}${newQuary.perPage}&${newQuary.page}`;

    navigate(`/${queryString}`);
  }

  return (
    <button
      className={`${styles.btn} ${query.sort.includes(`sort=+${type}`) ? styles.arrowUp : styles.arrowDown}`}
      type='button'
      onClick={clickHandler}>
      {label}{query.sort.includes(type) && <Arrow fill={'#f7fbfa'} />}
    </button>
  )
}

export default SortByBtn