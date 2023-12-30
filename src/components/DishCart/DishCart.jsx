import React, { useState, useEffect} from "react";
import styles from './DishCart.module.css';

const DishCard = (props) => {

    const {dish, addCartId} = props;

    return (
        <li className={styles['dish-card']}>
            <img className={styles['dish-img']} src={dish.img} alt={dish.name} />
            <h2 className={styles['dish-name']}>{dish.name}</h2>
            <p className={styles['dish-description']}>{dish.description}</p>
            <p className={styles['dish-price']}>Цена: {dish.price} ₽</p>
            <button className={styles['dish-button']} onClick={() => addCartId(dish.id)}>Добавить</button>
        </li>
    );
};
   
export default DishCard;