import { useNavigate } from 'react-router-dom';
import styles from './setPageBtn.module.scss';

function SetPageBtn({ query, setQuery, productsLength, label, direction }) {
  const navigate = useNavigate();

  const disabled = direction && productsLength < query.perPage.match(/\d+/)[0];

  async function clickHandler() {
    if (disabled) return;
    const currentPage = query.page.match(/\d+/)[0];
    const newPage = direction ? Number(currentPage) + 1 : Number(currentPage) - 1;
    if (newPage === 0) return;

    setQuery({ ...query, page: `startPage=${newPage}` });
    const queryString = `?${query.sort && query.sort + '&'}${query.perPage}&${`startPage=${newPage}`}`;

    navigate(`/${queryString}`);
  }

  return (
    <button
      className={`${styles.btn} ${direction ? styles.rotate : ''}`}
      type='button'
      onClick={clickHandler}>
      {label}
    </button>
  )
}

export default SetPageBtn