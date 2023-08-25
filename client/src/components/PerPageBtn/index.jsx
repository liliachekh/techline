import { useNavigate } from 'react-router-dom';
import styles from './perPageBtn.module.scss';

function PerPageBtn({ query, setQuery, amount }) {
  const navigate = useNavigate();

  async function clickHandler() {
    const newPerPage = query.perPage.replace(/\d+/, amount);
    setQuery({ ...query, perPage: newPerPage, page: 'startPage=1' });
    const queryString = `?${query.sort && query.sort + '&'}${newPerPage}&${'startPage=1'}`;

    navigate(`/${queryString}`);
  }

  return (
    <button
      className={styles.btn}
      type='button'
      onClick={clickHandler}>
      {amount}
    </button>
  )
}

export default PerPageBtn