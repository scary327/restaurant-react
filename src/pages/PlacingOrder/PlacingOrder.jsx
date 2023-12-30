import React, { useEffect, useMemo } from "react";
import styles from './placingOrder.module.css';
import { Link } from "react-router-dom";
import { DishOnPlacingOrder } from "../../components/DishOnPlacingOrder/DishOnPlacingOrder";
import { FormOnPlacingOrder } from "../../components/FormOnPlacingOrder/FormOnPlacingOrder";

const PlacingOrder = (props) => {

    const {cartDishes, totalPrice} = props;

    const handleClick = () => {
        alert('Ваш заказ принят!');
    }

    const getContent = () => {
        if (cartDishes <= 0) {
            return (
                <div className={styles['content-container']}>
                    <div className={styles['zero-dish']}>Вы ничего не выбрали</div>
                    <Link to="/">
                        <button className={styles['go-back-btn']}>Вернуться</button>
                    </Link>
                </div>
            );
        } else {
            return (
                <div className={styles['content-container']}>
                    <div className={styles['go-back-container']}>
                        <span className={styles['go-back__span']}>Поняли, что чего-то не хватает?</span>
                        <Link to='/'>
                            <button className={styles['go-back-btn']}>Вернуться на главную</button>
                        </Link>
                    </div>
                    <ul className={styles['dishes-list']}>
                        {cartDishes.map((dish) => (
                            <DishOnPlacingOrder key={dish.id} dish={dish} />
                        ))}
                    </ul>
                    <FormOnPlacingOrder totalPrice={totalPrice} />
                </div>
            );
        }
    };

    const OrderContent = React.memo(getContent);

    return (
        <div className={styles['order-container']}>
            <span className={styles['order-title']}>Оформление заказа</span>
            <OrderContent />
        </div>
    );
}

export default PlacingOrder;