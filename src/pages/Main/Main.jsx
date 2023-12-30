import React, { useState, useMemo } from "react";
import styles from './main.module.css';
import Header from '../../components/Header/Header';
import CartModal from '../../components/CartModal/CartModal';
import DishCart from '../../components/DishCart/DishCart';

export const Main = (props) => {
    const {addCartId, cartDishes, dishDelete, dishMinus, dishPlus, dishes, totalPrice} = props;
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [openCart, setOpenCart] = useState(false);

    const filteredDishes = useMemo(() => {
        return dishes.filter(
          (dish) =>
            dish.category === selectedCategory || selectedCategory === 'All'
        );
     }, [dishes, selectedCategory]);
  
    return (
      <>
        <Header
          setSelectedCategory={setSelectedCategory}
          setOpenCart={setOpenCart}
          dishes={dishes}
        />
        <CartModal
          openCart={openCart}
          setOpenCart={setOpenCart}
          cartDishes={cartDishes}
          dishPlus={dishPlus}
          dishMinus={dishMinus}
          dishDelete={dishDelete}
          totalPrice={totalPrice}
        />
        <div className={styles["container"]}>
          <ul className={styles["dishes-list"]}>
            {filteredDishes.map((dish) => (
                <DishCart
                key={dish.id}
                dish={dish}
                addCartId={addCartId}
                />
            ))}
          </ul>
        </div>
      </>
    );
};