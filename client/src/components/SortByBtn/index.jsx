import { useNavigate } from 'react-router-dom';
import styles from './sortByBtn.module.scss';
import { useState } from 'react';

function SortByBtn({ query, setQuery, label, type }) {
  const navigate = useNavigate();
  const [direction, setDirection] = useState();

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
      className={`${styles.btn} ${direction}`}
      type='button'
      onClick={clickHandler}>
      {label}
    </button>
  )
}

export default SortByBtn