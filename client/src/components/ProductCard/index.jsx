// import PropTypes from 'prop-types';
import styles from './productCard.module.scss';
// import { buyNowHandler, isInCart} from '../../utils';
// import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import { Verified } from '../Icons/verified';
import { LazyLoadImage } from "react-lazy-load-image-component";
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useState } from 'react';
import { Cart } from '../icons';
// import { AdminProductCard } from '../AdminProductCard';

function ProductCard({ _id, imageUrls, quantity, name, currentPrice, categories, color, productUrl, brand, memory, itemNo, displayTable }) {
  const [amount, setAmount] = useState(1);

  function handleAmountChange(e) {
    if (e.target.value > 0 && e.target.value <= quantity) setAmount(e.target.value);
  }

  async function increase(plus) {
    try {
      if (plus && quantity > amount) {
        // dispatch(changeQuantity(cart, _id, token, plus));
        setAmount(Number(amount) + 1)
      } else if (!plus) {
        // dispatch(changeQuantity(cart, _id, token, plus));
        setAmount(Number(amount) - 1)
      }
    } catch (error) {
      console.log(error);
      // dispatch(setErrorAction(error));
    }
  }

  return (
    <div className={`${styles.productCard} ${displayTable ? styles.productRow : ''}`}>
      <Link to={`/product/${itemNo}`} className={styles.productCard__mainLink}>
        <LazyLoadImage
          className={styles.productCard__img}
          // src={'./images/Home.webp'}
          src={imageUrls[0]}
          alt={name}
          effect="blur"
          placeholderSrc={'./images/Home.webp'}
          height={255}
          width='100%' />
        <p className={styles.productCard__name}>{name}</p>
      </Link>
      <div className={styles.productCard__links}>
        <Link to={`/products/filter?&categories=${brand}`} className={styles.productCard__link}>
          {brand}
        </Link>
        <Link to={`/products/filter?&categories=${categories}`} className={styles.productCard__link}>
          {categories}
        </Link>
      </div>
      <div className={`${styles.productCard__purchase} ${styles.purchase}`}>
        <div className={styles.purchase__price}>{currentPrice.toFixed(2)} €</div>
        <div className={`${styles.purchase__amount} ${styles.amount}`}>
          <button
            type='button'
            disabled={amount === 1}
            className={`${styles.amount__btn} ${styles.amount__btn_decrease}`}
            onClick={amount > 1 ? (e) => increase(false) : null} />
          <input
            name={name}
            type="number"
            className={styles.amount__input}
            value={amount}
            onChange={handleAmountChange} />
          <button
            type='button'
            className={`${styles.amount__btn} ${styles.amount__btn_increase}`}
            onClick={(e) => increase(true)} />
        </div>
        <div className={`${styles.purchase__price} ${styles.purchase__price_total}`}>
          {(currentPrice * amount).toFixed(2)} €
        </div>
        <button type='button' className={styles.purchase__addToCart}>
          Add to cart
          <Cart color={'#f7fbfa'} strokeWidth={'2'} />
        </button>
      </div>
    </div>
  );
}

// ProductCard.propTypes = {
//   _id: PropTypes.string.isRequired,
//   imageUrls: PropTypes.arrayOf(PropTypes.string),
//   authorIcon: PropTypes.string,
//   author: PropTypes.string,
//   currentPrice: PropTypes.number,
//   buttonText: PropTypes.string,
//   buttonHandler: PropTypes.func,
//   adminCard: PropTypes.bool
// };

// ProductCard.defaultProps = {
//   imageUrls: [],
//   authorIcon: '/images/avatars/user-icon.png',
//   author: 'varios author',
//   currentPrice: 0,
//   buttonText: "Buy now",
// };

export default ProductCard;