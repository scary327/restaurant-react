import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PlacingOrder from "./pages/PlacingOrder/PlacingOrder";
import { Main } from "./pages/Main/Main";

function App() {

  const [dishes, setDishes] = useState([]);
  const [cartDishes, setCartDishes] = useState([]);

  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => setDishes(data));
    const savedCartDishes = localStorage.getItem("cartDishes");
    if (savedCartDishes) {
      setCartDishes(JSON.parse(savedCartDishes));
    }
  }, []);

  useEffect(() => {
    if (cartDishes.length) {
      localStorage.setItem("cartDishes", JSON.stringify(cartDishes));
    }
  },  [cartDishes]);

  const addCartId = (id) => {
    const item = dishes.find((dish) => dish.id === id);
    const existingItemIndex = cartDishes.findIndex((dish) => dish.id === id);
    if (existingItemIndex >= 0) {
      setCartDishes((prevCartDishes) => {
        const updatedCartDishes = [...prevCartDishes];
        updatedCartDishes[existingItemIndex].count++;
        return updatedCartDishes;
      });
    } else {
      setCartDishes((prevCartDishes) => {
        const updatedCartDishes = [...prevCartDishes];
        updatedCartDishes.push({ ...item, count: 1 });
        return updatedCartDishes;
      });
    }
  };

  const dishPlus = (id) => {
    const existindItemIndex = cartDishes.findIndex((dish) => dish.id === id);
    if (existindItemIndex >= 0) {
      setCartDishes(
        cartDishes.map((dish, index) => {
          if (index === existindItemIndex) {
            return { ...dish, count: dish.count + 1 };
          }
          return dish;
        })
      );
    }
  };

  const dishMinus = (id) => {
    const existindItemIndex = cartDishes.findIndex((dish) => dish.id === id);
    if (existindItemIndex >= 0) {
      const updatedDish = {
        ...cartDishes[existindItemIndex],
        count: cartDishes[existindItemIndex].count - 1,
      };
      setCartDishes(
        cartDishes
          .map((dish, index) => {
            if (index === existindItemIndex) {
              return updatedDish;
            }
            return dish;
          })
          .filter((dish) => dish.count > 0)
      );
    }
  };

  const dishDelete = (id) => { 
    setCartDishes(
      cartDishes.filter((dish) => dish.id !== id)
    ); 
  };

  const totalPrice = useMemo(() => {
    return cartDishes.reduce((total, dish) => total + dish.price * dish.count, 0);
  }, [cartDishes]);
  

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main 
                                cartDishes={cartDishes}
                                addCartId={addCartId}
                                dishPlus={dishPlus}
                                dishMinus={dishMinus}
                                dishDelete={dishDelete}
                                dishes={dishes}
                                totalPrice={totalPrice} />}/>
        <Route path="/PlacingOrder" element={<PlacingOrder 
                                              cartDishes={cartDishes}
                                              totalPrice={totalPrice} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
