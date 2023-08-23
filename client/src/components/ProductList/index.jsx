import ProductCard from '../ProductCard';
import styles from './productList.module.scss';

function ProductList({products, rows}) {

  return (
    <div className={`${styles.productList} ${rows ? styles.productTable : ''}`}>
      <div className={styles.productList__container}>
        {products &&
          products?.map((product)=>(
            <ProductCard {...product} rows={rows} key={product?._id}/>
          ))}
      </div>
    </div>
  )
}

export default ProductList;