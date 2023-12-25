import React from "react";
import styles from './CartModal.module.css';
import classNames from "classnames";

const CartModal = (props) => {

    const {openCart, setOpenCart, cartDishes} = props;

    return (
        <div className={classNames(styles['cart-container'], {[styles.open]: openCart})}>
            <div className={styles["cart-description"]}>
                <div className={styles['close-modal']} onClick={() => setOpenCart(false)}>Закрыть</div>
                <ul className={styles['dishes-list']}>
                    {cartDishes.map((dish) => (
                        <li key={dish.id} className={styles['dish-cart']}>
                            <p className={styles['dish-name']}>{dish.name}</p>
                            <p className={styles['dish-count']}>Количество: {dish.count}</p>
                            <p className={styles['dish-price']}>Цена: {dish.price * dish.count} ₽</p>
                            <button className={styles['dish-cart__buttons']} onClick={() => dishPlus(dish.id)}>+</button>
                            <button className={styles['dish-cart__buttons']} onClick={() => dishMinus(dish.id)}>-</button>
                            <button className={styles['dish-cart__buttons']} onClick={() => dishDelete(dish.id)}>Удалить</button>
                        </li>
                    ))}
                </ul>
                <button className={styles['order-button']}>Оформить заказ</button>
            </div>
        </div>
    );
}

export default CartModal