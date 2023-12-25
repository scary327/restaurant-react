import React, { useState, useEffect } from "react";
import styles from './Header.module.css';

const Header = (props) => {
    const [dishes, setDishes] = useState([]);
    const { setSelectedCategory, setOpenCart} = props;

    useEffect(() => {
      fetch('/db.json')
        .then(response => response.json())
        .then(data => setDishes(data));
    }, []);

    const getUniqueCategories = () => {
        const categories = dishes.map(dish => dish.category);
        const uniqueCategories = [...new Set(categories)];
        return uniqueCategories;
    }

    return (
        <div className={styles['header-container']}>
            <div className={styles['logo']} onClick={() => setSelectedCategory('All')}>Rest</div>
            <ul className={styles['categories-list']}>
                {getUniqueCategories().map(category => (
                    <li key={category} className={styles['categories-elem']} onClick={() => setSelectedCategory(category)}>{category}</li>
                ))}
            </ul>
            <div className={styles['shopping-cart']} onClick={() => setOpenCart(true)}>Корзина</div>
        </div>
    );
}

export default Header;