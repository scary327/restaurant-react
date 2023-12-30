import React from "react";
import styles from './dishOnCart.module.css';

export const DishOnCart = (props) => {

    const { id, name, count, price, dishDelete, dishMinus, dishPlus} = props;

    return (
        <li key={id} className={styles['dish-cart']}>
            <p className={styles['dish-name']}>{name}</p>
            <p className={styles['dish-count']}>Количество: {count}</p>
            <p className={styles['dish-price']}>Цена: {price * count} ₽</p>
            <button className={styles['dish-cart__buttons']} onClick={() => dishPlus(id)}>+</button>
            <button className={styles['dish-cart__buttons']} onClick={() => dishMinus(id)}>-</button>
            <button className={styles['dish-cart__buttons']} onClick={() => dishDelete(id)}>Удалить</button>
        </li>
    );
}