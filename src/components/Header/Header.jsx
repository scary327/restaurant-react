import React, { useMemo } from "react";
import styles from './Header.module.css';

const Header = (props) => {
    const { setSelectedCategory, setOpenCart, dishes} = props;

    const uniqueCategories = useMemo(() => {
        const categories = dishes.map(dish => dish.category);
        return [...new Set(categories)];
      }, [dishes]);
      

    return (
        <div className={styles['header-container']}>
            <div className={styles['logo']} onClick={() => setSelectedCategory('All')}>Rest</div>
            <ul className={styles['categories-list']}>
                {uniqueCategories.map(category => (
                    <li key={category} className={styles['categories-elem']} onClick={() => setSelectedCategory(category)}>{category}</li>
                ))}
            </ul>
            <div className={styles['shopping-cart']} onClick={() => setOpenCart(true)}>Корзина</div>
        </div>
    );
}

export default Header;