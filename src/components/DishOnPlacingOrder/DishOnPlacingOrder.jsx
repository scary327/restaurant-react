import React from "react";
import styles from './dishOnPlacingOrder.module.css';

export const DishOnPlacingOrder = (props) => {

    const { dish } = props;

    return (
        <li key={dish.id} className={styles['dish-cart']}>
            <img src={dish.img} alt="dish-image" className={styles['dish-img']}/>
            <div className={styles['dish-cart-right']}>
                <p className={styles['dish-name']}>{dish.name}</p>
                <p className={styles['dish-count']}>Количество: {dish.count}</p>
                <p className={styles['dish-price']}>Цена: {dish.price * dish.count} ₽</p>
            </div>
        </li>
    )
}