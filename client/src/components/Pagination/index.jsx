import styles from './pagination.module.scss';
import { useSearchParams } from 'react-router-dom';
import SetPageBtn from "../SetPageBtn";
import { Arrow } from "../icons";

function Pagination({ scrollTo, productsLength, productsQuantity }) {
  const [searchParams] = useSearchParams();

  const perPage = searchParams.get('perPage');
  const page = searchParams.get('startPage');
  
  const startItem = productsQuantity - productsLength + 1;
  const lastItem = page * productsLength;

  return (
    <>
      <SetPageBtn
        scrollTo={scrollTo}
        label={<Arrow fill={'#f7fbfa'} />}
        direction={false} />
      <div className={styles.text}>
        {productsLength < perPage
          ? startItem === productsQuantity ? startItem : startItem + ' - ' + productsQuantity
          : page * productsLength - perPage + 1 + ' - ' + (lastItem < productsQuantity ? lastItem : productsQuantity)}
        <span className={styles.text__between}>of</span>
        {productsQuantity}
      </div>
      <SetPageBtn
        scrollTo={scrollTo}
        productsLength={productsLength}
        label={<Arrow fill={'#f7fbfa'} />}
        direction={true} />
    </>
  )
}

export default Pagination