import { useCallback, useEffect, useState } from 'react';
import ProductCard from '../ProductCard';
import styles from './productList.module.scss';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';


function ProductList() {
  const [displayTable, setDisplayTable] = useState(false);
  const [products, setProducts] = useState([]);

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

  async function sortBy(type) {
    let queryString = window.location.search;
    if (queryString.includes(`+${type}`)) {
      queryString = queryString.replace(`+${type}`, `-${type}`);
      const data = await fetchData(`https://sea-turtle-app-tgzpt.ondigitalocean.app/api/products/filter?${queryString}`);
      navigate(`/${queryString}`);
      setProducts(data.products);
    } else if (queryString.includes(`-${type}`)) {
      queryString = queryString.replace(`&sort=-${type}`, '');
      const data = await fetchData(`https://sea-turtle-app-tgzpt.ondigitalocean.app/api/products/filter?${queryString}`);
      navigate(`/${queryString}`);
      setProducts(data);
    } else {
      queryString = `?&sort=+${type}`;
      const data = await fetchData(`https://sea-turtle-app-tgzpt.ondigitalocean.app/api/products/filter${queryString}`);
      navigate(`/${queryString}`);
      setProducts(data.products);
    }
  }

  const getProducts = useCallback(async () => {
    const data = await fetchData(`https://sea-turtle-app-tgzpt.ondigitalocean.app/api/products${window.location.search}`);
    setProducts(data);
  }, [])

  useEffect(() => {
    getProducts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getProducts, window.location.search])

  return (
    <div className={`${styles.productList} ${displayTable ? styles.productTable : ''}`}>
      <div className={styles.productList__container}>
        {!isMobile &&
          <div className={styles.productList__btns}>
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
            <button
              className={styles.productList__btn}
              type='button'
              onClick={() => setDisplayTable(!displayTable)}>
              Change Style
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