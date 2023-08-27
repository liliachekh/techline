import styles from './pagination.module.scss';
import SetPageBtn from "../SetPageBtn";
import { Arrow } from "../icons";

function Pagination({ query, setQuery, scrollTo, productsLength, productsQuantity }) {
  const perPage = query.perPage.match(/\d+/)[0];
  const page = query.page.match(/\d+/)[0];
  const startItem = productsQuantity - productsLength + 1;
  const lastItem = page * productsLength;

  return (
    <>
      <SetPageBtn
        scrollTo={scrollTo}
        query={query}
        setQuery={setQuery}
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
        query={query}
        setQuery={setQuery}
        productsLength={productsLength}
        label={<Arrow fill={'#f7fbfa'} />}
        direction={true} />
    </>
  )
}

export default Pagination