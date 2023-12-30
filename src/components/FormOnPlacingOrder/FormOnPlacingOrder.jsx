import React from "react";
import styles from './formOnPlacingOrder.module.css';

export const FormOnPlacingOrder = (props) => {

    const { totalPrice } = props;

    return (
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
    )
}