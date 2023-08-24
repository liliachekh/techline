import { useCallback, useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import styles from './productList.module.scss';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';
import { baseUrl } from '../../utils/vars';


function ProductList() {
  const [displayTable, setDisplayTable] = useState(false);
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState({
    sort: window.location.search.match(/sort=/) ? window.location.search.match(/sort=/)[0] : '',
    perPage: window.location.search.match(/perPage=(\d+)/) ? window.location.search.match(/perPage=(\d+)/)[0] : 'perPage=10',
  });

  const navigate = useNavigate();
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' });
  // ====================================================================================================================
  // ====================================================================================================================
  // ====================================================================================================================
  async function fetchData(url, reqBody) {
    try {
      const response = await fetch(url, reqBody);
      if (!response.ok) {
        // handleError(response, 401);
        const error = await response.json();
        throw new Error(error?.loginOrEmail || error?.password || error?.message || error?.email || error);
      }
      return await response.json();
    } catch (error) {
      throw new Error(error?.message);
    }
  }
  // ====================================================================================================================
  // ====================================================================================================================
  // ====================================================================================================================

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
  async function sortBy(type) {
    let newQuary = {};
    if (query.sort.includes(`sort=+${type}`)) {
      newQuary = { ...query, sort: `sort=-${type}` }
    } else if (query.sort.includes(`sort=-${type}`)) {
      newQuary = { ...query, sort: '' }
    } else {
      newQuary = { ...query, sort: `sort=+${type}` }
    }

    setQuery(newQuary)
    const queryString = `?${newQuary.sort && newQuary.sort + '&'}${newQuary.perPage}`

    navigate(`/${queryString}`);
  }

  async function setPerPage(amount) {
    const newPerPage = query.perPage.replace(/\d+/, amount);
    console.log(newPerPage);
    setQuery({ ...query, perPage: newPerPage })
    const queryString = `?${query.sort && query.sort + '&'}${newPerPage}`

    navigate(`/${queryString}`);
  }

  const getProducts = useCallback(async () => {
    // const data = await fetchData(`${baseUrl}products/${`?${query.sort && query.sort + '&'}${query.perPage}`}`);
    const data = await fetchData(`${baseUrl}products/${window.location.search ? window.location.search : '?perPage=10'}`);
    setProducts(Array.isArray(data) ? data : data.products);
  }, [])

  useEffect(() => {
    console.log('query', query);
    console.log('window', window.location.search);
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
          <button
            className={styles.productList__btn}
            type='button'
            onClick={() => setPerPage('10')}>
            10
          </button>
          <button
            className={styles.productList__btn}
            type='button'
            onClick={() => setPerPage('25')}>
            25
          </button>
          <button
            className={styles.productList__btn}
            type='button'
            onClick={() => setPerPage('50')}>
            50
          </button>
          <button
            className={styles.productList__btn}
            type='button'
            onClick={() => setPerPage('100')}>
            100
          </button>
          <button
            className={styles.productList__btn}
            type='button'
            onClick={() => setDisplayTable(!displayTable)}>
            Change Style
          </button>
        </div>
        {!isMobile &&
          <div className={styles.productList__sort}>
            <button
              className={styles.productList__btn}
              type='button'
              onClick={() => sortBy('name')}>
              Product
            </button>
            <button
              className={styles.productList__btn}
              type='button'
              onClick={() => sortBy('currentPrice')}>
              Cost
            </button>
          </div>}
        <div className={styles.productList__list}>
          {products.length > 0 &&
            products?.map((product) => (
              <ProductCard {...product} rows={displayTable} key={product?._id} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default ProductList;