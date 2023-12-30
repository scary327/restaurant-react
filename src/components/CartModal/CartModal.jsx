import React from "react";
import styles from './CartModal.module.css';
import classNames from "classnames";
import { Link } from "react-router-dom";
import { DishOnCart } from "../DishOnCart/DishOnCart";

const CartModal = (props) => {

    const {openCart, setOpenCart, cartDishes, dishPlus, dishMinus, dishDelete, totalPrice} = props;

    return (
        <div className={classNames(styles['cart-container'], {[styles.open]: openCart})}>
            <div className={styles["cart-description"]}>
                <button className={styles['close-modal']} onClick={() => setOpenCart(false)}>Закрыть</button>
                <ul className={styles['dishes-list']}>
                    {cartDishes.map((dish) => (
                        <DishOnCart
                            key={dish.id}
                            id={dish.id}
                            name={dish.name}
                            price={dish.price}
                            count={dish.count}
                            dishPlus={dishPlus}
                            dishDelete={dishDelete}
                            dishMinus={dishMinus} />
                    ))}
                </ul>
                <div className={styles['result-price']}>Общая стоимость <span>{totalPrice}</span> ₽</div>
                <Link to="/PlacingOrder">
                <button className={styles['order-button']}>Оформить заказ</button>
                </Link>
            </div>
        </div>
    );
}

export default CartModal