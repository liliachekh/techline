import { useCallback, useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import PerPageBtn from '../PerPageBtn';
import SortByBtn from '../SortByBtn';
import SetPageBtn from '../SetPageBtn';
import { Arrow, IconCardList, IconTableList } from '../icons';
import styles from './productList.module.scss';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../utils/vars';
import { fetchData } from '../../utils';

function ProductList() {
  const [displayTable, setDisplayTable] = useState(false);
  const [{ products, productsQuantity }, setProducts] = useState([]);
  const [query, setQuery] = useState({
    sort: window.location.search.match(/sort=[^&]*/) ? window.location.search.match(/sort=[^&]*/)[0] : '',
    perPage: window.location.search.match(/perPage=(\d+)/) ? window.location.search.match(/perPage=(\d+)/)[0] : 'perPage=10',
    page: window.location.search.match(/startPage=(\d+)/) ? window.location.search.match(/startPage=(\d+)/)[0] : 'startPage=1',
  });
  // не чіпай const navigate = useNavigate(), без нього навігація не працює!?
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
    window.location.search.length === 0 && setQuery({
      sort: '',
      perPage: 'perPage=10',
      page: 'startPage=1',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProducts, window.location.search])

  return (
    <div className={`${styles.productList} ${displayTable ? styles.productTable : ''}`}>
      <div className={styles.productList__container}>
        <div className={styles.productList__btns}>
          <div className={styles.productList__controlTitle}>
            Items per page
          </div>
          {[10, 25, 50, 100].map((amount) => (
            <PerPageBtn
              key={amount}
              query={query}
              setQuery={setQuery}
              amount={amount} />
          ))}
        </div>
        <div className={styles.productList__btns}>
          <SetPageBtn
            query={query}
            setQuery={setQuery}
            label={<Arrow fill={'#f7fbfa'} />}
            direction={false} />
          <div>
            {products?.length < query.perPage.match(/\d+/)[0]
              ? productsQuantity - products?.length + 1 + ' - ' + productsQuantity
              : query.page.match(/\d+/)[0] * products?.length - query.perPage.match(/\d+/)[0] + 1 + ' - ' + query.page.match(/\d+/)[0] * products?.length}
            {' of ' + productsQuantity}
          </div>
          <SetPageBtn
            query={query}
            setQuery={setQuery}
            productsLength={products?.length}
            label={<Arrow fill={'#f7fbfa'} />}
            direction={true} />
        </div>
        <div className={styles.productList__sort}>
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
          {!isMobile &&
            <button
              className={styles.productList__btn}
              type='button'
              onClick={() => setDisplayTable(!displayTable)}>
              Display Style
              {displayTable ? <IconTableList /> : <IconCardList />}
            </button>}
        </div>
        <div className={styles.productList__list}>
          {products?.length > 0 &&
            products?.map((product) => (
              <ProductCard {...product} displayTable={displayTable} key={product?._id} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default ProductList;