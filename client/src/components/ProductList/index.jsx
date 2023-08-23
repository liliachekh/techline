import { useState } from 'react';
import ProductCard from '../ProductCard';
import styles from './productList.module.scss';
import { useMediaQuery } from 'react-responsive';


function ProductList({ products }) {
  const [displayTable, setDisplayTable] = useState(false);

  const isMobile = useMediaQuery({
    query: '(max-width: 768px)'
  })

  return (
    <div className={`${styles.productList} ${displayTable ? styles.productTable : ''}`}>
      <div className={styles.productList__container}>
        {!isMobile && <div className={styles.productList__btns}>
          <button
          type='button'
          onClick={() => setDisplayTable(!displayTable)}>
            click
            </button>
        </div>}
        <div className={styles.productList__list}>
          {products &&
            products?.map((product) => (
              <ProductCard {...product} rows={displayTable} key={product?._id} />
            ))}
        </div>
      </div>
    </div>
  )
}

export default ProductList;