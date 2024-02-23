import React from 'react';
import styles from './ProductCardInCart.module.scss';
import DeleteIcon from '../svg/DeleteIcon/DeleteIcon';
import PropTypes from 'prop-types';
import {useDispatch, useSelector} from 'react-redux';
import {addItemToCart, getCart, removeItemFromCart, removeOneItemFromCart} from '../../store/cartSlice';
import {clearCartSessionStorage} from '../../services/sessionStorage.service';

const ProductCardInCart = ({item, type}) => {
  const dispatch = useDispatch();
  const cart = useSelector(getCart);
  const handleItemDelete = () => {
    if (cart.length === 1) {
      clearCartSessionStorage();
    }
    dispatch(removeItemFromCart(item.itemIdentifier));
  };
  const handleQuantityAdd = () => {
    dispatch(addItemToCart({...item, itemQuantity: 1}));
  };
  const handleQuantityLess = () => {
    if (cart.length === 1) {
      clearCartSessionStorage();
    }
    dispatch(removeOneItemFromCart(item.itemIdentifier));
  };

  return (
    <div className={styles.productCardInCart} data-testid="ProductCardInCart" type={type}>
      <div className={styles.imageBlock}>
        <img src={item.itemImg} alt='item picture'/>
      </div>
      <div className={styles.infoBlock}>
        <p className={styles.name}>{item.itemName}</p>
        <div className={styles.priceSizeColorQuantityBlock}>
          <p className={(item.discountPrice===item.itemPrice)? styles.price : styles.discount}>
            <span>
              {item.itemPrice} $
            </span>
            <span>
              {(item.discountPrice===item.itemPrice) ? '' : item.discountPrice + ' $'}
            </span>
          </p>
          <div className={styles.sizeColorQuantityBlock}>
            <div className={styles.block}>
              <div className={styles.sizeBlock}>
                <p>size: </p>
                <p>{item.itemSize}</p>
              </div>
              <div className={styles.fakeDiv}/>
            </div>
            <div className={styles.block}>
              <div className={styles.colorBlock}>
                <p>color:</p>
                <div style={{'backgroundColor': `${item.itemColor}`}} className={styles.colorRectangle}></div>
              </div>
              <div className={styles.quantityBlock}>
                <p>quantity:</p>
                <div className={styles.quantity}>
                  <button
                    onClick={handleQuantityLess}
                    className={styles.button}>
                      -
                  </button>
                  <p>
                    {item.itemQuantity}
                  </p>
                  <button
                    onClick={handleQuantityAdd}
                    className={styles.button}>
                      +
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleItemDelete}
        className={styles.buttonBlock}
        disabled={type==='1'}
      >
        <DeleteIcon />
      </button>
    </div>
  );
};

ProductCardInCart.propTypes = {
  item: PropTypes.object.isRequired,
  type: PropTypes.string,
};
export default ProductCardInCart;