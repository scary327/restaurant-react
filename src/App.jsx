import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header/Header";
import DishCard from "./components/DishCart/DishCart";
import CartModal from "./components/CartModal/CartModal";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PlacingOrder from "./pages/PlacingOrder";

const Main = (props) => {
  const {addCartId, cartDishes, dishDelete, dishMinus, dishPlus, isCartDishes, dishes} = props;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [openCart, setOpenCart] = useState(false);

  return (
    <>
      <Header
        setSelectedCategory={setSelectedCategory}
        setOpenCart={setOpenCart}
      />
      <CartModal
        openCart={openCart}
        setOpenCart={setOpenCart}
        cartDishes={cartDishes}
        dishPlus={dishPlus}
        dishMinus={dishMinus}
        dishDelete={dishDelete}
      />
      <div className="container">
        <ul className="dishes-list">
          {dishes.filter(
              (dish) =>
                dish.category === selectedCategory || selectedCategory === "All"
            )
            .map((dish) => (
              <DishCard
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

function App() {

  const [dishes, setDishes] = useState([]);
  const [cartDishes, setCartDishes] = useState([]);

  useEffect(() => {
    fetch("/db.json")
      .then((response) => response.json())
      .then((data) => setDishes(data));
  }, []);

  useEffect(() => {
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
    const existindItemIndex = cartDishes.findIndex((dish) => dish.id === id);
    if (existindItemIndex >= 0) {
      setCartDishes(
        cartDishes
          .slice(0, existindItemIndex)
          .concat(cartDishes.slice(existindItemIndex + 1))
      );
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main 
                                cartDishes={cartDishes}
                                addCartId={addCartId}
                                dishPlus={dishPlus}
                                dishMinus={dishMinus}
                                dishDelete={dishDelete}
                                dishes={dishes}/>}/>
        <Route path="/PlacingOrder" element={<PlacingOrder cartDishes={cartDishes} setCartDishes={setCartDishes} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
