import { useCallback, useEffect, useRef, useState } from 'react';
import ProductCard from '../ProductCard';
import PerPageBtn from '../PerPageBtn';
import SortByBtn from '../SortByBtn';
import { IconCardList, IconTableList } from '../icons';
import styles from './productList.module.scss';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../utils/vars';
import { fetchData } from '../../utils';
import Pagination from '../Pagination';

function ProductList() {
  const [displayTable, setDisplayTable] = useState(false);
  const [{ products, productsQuantity }, setProducts] = useState([]);
  const [query, setQuery] = useState({
    sort: window.location.search.match(/sort=[^&]*/) ? window.location.search.match(/sort=[^&]*/)[0] : '',
    perPage: window.location.search.match(/perPage=(\d+)/) ? window.location.search.match(/perPage=(\d+)/)[0] : 'perPage=10',
    page: window.location.search.match(/startPage=(\d+)/) ? window.location.search.match(/startPage=(\d+)/)[0] : 'startPage=1',
  });
  const ref = useRef(null);
  // не чіпай const navigate = useNavigate(), без нього навігація не працює!?
  // eslint-disable-next-line no-unused-vars
  const navigate = useNavigate();
  // ==============================
  const isMobile = useMediaQuery({ query: '(max-width: 480px)' });

  const getProducts = useCallback(async () => {
    // const data = await fetchData(`${baseUrl}products/${`?${query.sort && query.sort + '&'}${query.perPage}`}`);
    const data = await fetchData(`${baseUrl}products/filter${window.location.search ? window.location.search : '?perPage=10'}`);
    // setProducts(Array.isArray(data) ? data : data.products);
    setProducts(data);
  }, [])

  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProducts, window.location.search])
  useEffect(() => {
    setQuery({
      sort: window.location.search.match(/sort=[^&]*/) ? window.location.search.match(/sort=[^&]*/)[0] : '',
      perPage: window.location.search.match(/perPage=(\d+)/) ? window.location.search.match(/perPage=(\d+)/)[0] : 'perPage=10',
      page: window.location.search.match(/startPage=(\d+)/) ? window.location.search.match(/startPage=(\d+)/)[0] : 'startPage=1',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [setQuery, window.location.search])

  return (
    <div ref={ref} className={`${styles.productList} ${displayTable ? styles.productTable : ''}`}>
      <div className={styles.productList__container}>
        <div className={styles.productList__wrapper}>
          <div className={styles.productList__btns}>
            <div className={styles.productList__controlTitle}>
              Sort by
            </div>
            <SortByBtn
              query={query}
              setQuery={setQuery}
              label='Product'
              type='name' />
            <SortByBtn
              query={query}
              setQuery={setQuery}
              label='Cost'
              type='currentPrice' />
          </div>
          {!isMobile &&
            <div className={styles.productList__btns}>
              <div className={styles.productList__controlTitle}>
                Display Style
              </div>
              <button
                className={styles.productList__btn}
                type='button'
                onClick={() => setDisplayTable(!displayTable)}>
                {displayTable ? <IconTableList /> : <IconCardList />}
              </button>
            </div>}
        </div>
        <div className={styles.productList__list}>
          {products?.length > 0 &&
            products?.map((product) => (
              <ProductCard {...product} displayTable={displayTable} key={product?._id} />
            ))}
        </div>
        <div className={styles.productList__wrapper}>
          <div className={styles.productList__btns}>
            <div className={styles.productList__controlTitle}>
              Items per page
            </div>
            {[10, 25, 50, 100].map((amount) => (
              <PerPageBtn
                scrollTo={ref}
                key={amount}
                query={query}
                setQuery={setQuery}
                amount={amount} />
            ))}
          </div>
          <div className={styles.productList__btns}>
            <Pagination
              scrollTo={ref}
              query={query}
              setQuery={setQuery}
              productsLength={products?.length}
              productsQuantity={productsQuantity} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductList;