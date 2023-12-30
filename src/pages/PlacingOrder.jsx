import React, { useEffect, useMemo } from "react";
import styles from './placingOrder.module.css';
import { Link } from "react-router-dom";

const PlacingOrder = (props) => {

    const {cartDishes} = props;
    const totalPrice = cartDishes.reduce((total, dish) => total + dish.price * dish.count, 0);

    const handleClick = () => {
        alert('Ваш заказ принят!');
    }

    const content = useMemo(() => {
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
                            <li key={dish.id} className={styles['dish-cart']}>
                                <img src={dish.img} alt="dish-image" className={styles['dish-img']}/>
                                <div className={styles['dish-cart-right']}>
                                    <p className={styles['dish-name']}>{dish.name}</p>
                                    <p className={styles['dish-count']}>Количество: {dish.count}</p>
                                    <p className={styles['dish-price']}>Цена: {dish.price * dish.count} ₽</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <form className={styles['form-container']}>
                        <span className={styles['radio-span']}>Выберите способ получения</span>
                        <div className={styles['radio-container']}>
                            <label htmlFor="selfpickup"><input type="radio" id="selfpickup" name="pickup" value="selfpickup" defaultChecked/>Самовывоз</label>
                            <label htmlFor="delivery"><input type="radio" id="delivery" name="pickup" value="delivery"/>Доставка</label>
                        </div>
                        <span className={styles['full-price-span']}>К оплате будет: {totalPrice} ₽</span>
                        <span className={styles['payment-span']}>Выберите способ оплаты</span>
                        <div className={styles['payment-method-container']}>
                            <label htmlFor="cash"><input type="radio" id="cash" name="payment" value="cash" defaultChecked/>Наличными</label>
                            <label htmlFor="credit-card"><input type="radio" id="credit-card" name="payment" value="credit-card"/>Банковской картой</label>
                            <label htmlFor="qr-code"><input type="radio" id="qr-code" name="payment" value="qr-code"/>СБП</label>
                        </div>
                        <button type="submit" className={styles['form-button']} onClick={() => handleClick()}>Заказать</button>
                    </form>
                    
                </div>
            );
        }
    }, [cartDishes]);

    return (
        <div className={styles['order-container']}>
            <span className={styles['order-title']}>Оформление заказа</span>
            {content}
        </div>
    );
}

export default PlacingOrder;