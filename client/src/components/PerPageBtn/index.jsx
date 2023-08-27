import { useNavigate } from 'react-router-dom';
import styles from './perPageBtn.module.scss';
import { scrollToRef } from '../../utils';

function PerPageBtn({ query, setQuery, amount, scrollTo }) {
  const navigate = useNavigate();

  async function clickHandler() {
    const newPerPage = query.perPage.replace(/\d+/, amount);
    setQuery({ ...query, perPage: newPerPage, page: 'startPage=1' });
    const queryString = `?${query.sort && query.sort + '&'}${newPerPage}&${'startPage=1'}`;

    navigate(`/${queryString}`);
    scrollToRef(scrollTo);
  }
  return (
    <button
      className={`${styles.btn} ${Number(query.perPage.match(/\d+/)[0]) === amount ? styles.btn_active : ''}`}
      type='button'
      onClick={clickHandler}>
      {amount}
    </button>
  )
}

export default PerPageBtn