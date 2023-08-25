import { useCallback, useEffect, useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import styles from './productList.module.scss';
import { baseUrl } from '../../utils/vars';
import ProductCard from '../ProductCard';
import PerPageBtn from '../PerPageBtn';
import SetPageBtn from '../SetPageBtn';
import SortByBtn from '../SortByBtn';
import { fetchData } from '../../utils';
import { Arrow } from '../icons/arrow';

function ProductList() {
  const [displayTable, setDisplayTable] = useState(false);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState({
    sort: window.location.search.match(/sort=[^&]*/) ? window.location.search.match(/sort=[^&]*/)[0] : '',
    perPage: window.location.search.match(/perPage=(\d+)/) ? window.location.search.match(/perPage=(\d+)/)[0] : 'perPage=10',
    page: window.location.search.match(/startPage=(\d+)/) ? window.location.search.match(/startPage=(\d+)/)[0] : 'startPage=1',
  });

  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });

  // async function setPerPage() {

  // }

  // async function sortBy(type) {
  //   if (queryString.includes(`sort=${type}`)) {
  //     setQueryString(queryString.replace(`sort=${type}`, `sort=-${type}`));
  //   } else if (queryString.includes(`sort=-${type}`)) {
  //     setQueryString(queryString.replace(`sort=-${type}`, ''));
  //   } else {
  //     setQueryString(`?sort=${type}`);
  //   }
  // }
  // async function sortBy(type) {
  //   let queryString = window.location.search;

  //   if (queryString.includes(`sort=${type}`)) {
  //     queryString = queryString.replace(`sort=${type}`, `sort=-${type}`);
  //   } else if (queryString.includes(`sort=-${type}`)) {
  //     queryString = queryString.replace(`sort=-${type}`, '');
  //   } else {
  //     queryString = `?sort=${type}`;
  //   }

  //   const data = await fetchData(`${baseUrl}products/filter${queryString}`);
  //   setProducts(Array.isArray(data) ? data : data.products);
  //   navigate(`/${queryString}`);
  // }


  // const getProducts = useCallback(async () => {
  //   const url = `${baseUrl}products/filter${queryString.length > 0 ? queryString + "&" + perPage : "?" + perPage}`
  //   const data = await fetchData(url);

  //   setProducts(Array.isArray(data) ? data : data.products);

  //   navigate(queryString.length > 0 ? queryString + "&" + perPage : perPage !== 'perPage=10' && "?" + perPage)

  // }, [navigate, queryString, perPage])

  // const getProducts = useCallback(async () => {
  //   const url = `${baseUrl}products/filter${queryString.length > 0 ? queryString + "&" + perPage : "?" + perPage}`
  //   const data = await fetchData(url);
  //   // const data = await fetchData(`${baseUrl}products/filter${queryString.length > 0 ? queryString + "&" + perPage : "?" + perPage}`);
  //   setProducts(Array.isArray(data) ? data : data.products);

  //   // if (queryString.length === 0 && perPage === 'perPage=10') navigate("?" + perPage);
  //   // navigate(queryString + "&" + perPage)
  //   navigate(queryString.length > 0 ? queryString + "&" + perPage : perPage !== 'perPage=10' && "?" + perPage)

  //   // if (queryString.length > 0) navigate(`/${queryString}&${perPage}`);
  //   // if (perPage !== 'perPage=10') navigate(`/${perPage}`);
  //   // navigate('/')

  //   // queryString.length > 0 ? navigate(`${queryString}&${perPage}`) : navigate(`/?${perPage}`);
  //   // navigate(`${queryString}&${perPage}`);
  // }, [navigate, queryString, perPage])

  // async function sortBy(type) {
  //   let queryString = window.location.search;

  //   if (queryString.includes('sort=')) {
  //     queryString = queryString.replace(/sort=[^&]*/, `sort=-${type}&`);
  //   } else if (queryString.includes(`sort=-${type}`)) {
  //     queryString = queryString.replace(`sort=-${type}&`, '');
  //   } else if (queryString.length === 0) {
  //     queryString = `?sort=${type}`;
  //   }
  //   // } else {
  //   //   queryString = queryString.replace('?', `?sort=${type}&`)
  //   // }

  //   navigate(`/${queryString}`);
  // }

  // async function setPerPage(amount) {
  //   let queryString = window.location.search;

  //   if (queryString.includes('perPage=')) {
  //     queryString = queryString.replace(/perPage=(\d+)/, `perPage=${amount}`)
  //   } else if (queryString.length === 0) {
  //     queryString = `?perPage=${amount}`;
  //   } else {
  //     queryString = `${queryString}&perPage=${amount}`;
  //   }

  //   navigate(`/${queryString}`);
  // }
  const getProducts = useCallback(async () => {
    // const data = await fetchData(`${baseUrl}products/${`?${query.sort && query.sort + '&'}${query.perPage}`}`);
    const data = await fetchData(`${baseUrl}products/filter${window.location.search ? window.location.search : '?perPage=10'}`);
    // setProducts(Array.isArray(data) ? data : data.products);
    setProducts(data);
  }, [])
  
  useEffect(() => {
    getProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProducts, query, window.location.search])

  return (
    <div className={`${styles.productList} ${displayTable ? styles.productTable : ''}`}>
      <div className={styles.productList__container}>
        <div className={styles.productList__btns}>
          <div>
            Items per page
          </div>
          {[10, 25, 50, 100].map((amount) => (
            <PerPageBtn
              key={amount}
              query={query}
              setQuery={setQuery}
              amount={amount} />
          ))}
          <button
            className={styles.productList__btn}
            type='button'
            onClick={() => setDisplayTable(!displayTable)}>
            Change Style
          </button>
        </div>
        <div className={styles.productList__btns}>
          <SetPageBtn
            query={query}
            setQuery={setQuery}
            label={<Arrow fill={'#f7fbfa'} />}
            direction={false} />
          <div>
            {products?.products?.length < query.perPage.match(/\d+/)[0]
              ? products?.productsQuantity - products?.products?.length + 1 + ' - ' + products?.productsQuantity
              : query.page.match(/\d+/)[0] * products?.products?.length - query.perPage.match(/\d+/)[0] + 1 + ' - ' + query.page.match(/\d+/)[0] * products?.products?.length
              + ' of ' + products?.productsQuantity}
          </div>
          <SetPageBtn
            query={query}
            setQuery={setQuery}
            productsLength={products?.products?.length}
            label={<Arrow fill={'#f7fbfa'} />}
            direction={true} />
        </div>
        {!isMobile &&
          <div className={styles.productList__sort}>
            <SortByBtn
              query={query}
              setQuery={setQuery}
              label={<>Product<Arrow fill={'#f7fbfa'} /></>}
              type='name' />
            <SortByBtn
              query={query}
              setQuery={setQuery}
              label='Cost'
              type='currentPrice' />
          </div>}
        <div className={styles.productList__list}>
          {products?.products?.length > 0 &&
            products?.products?.map((product) => (
              <ProductCard {...product} rows={displayTable} key={product?._id} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default ProductList;