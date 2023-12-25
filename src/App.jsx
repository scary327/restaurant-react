import React, { useState, useEffect } from 'react'
import './App.css';
import Header from './components/Header/Header';
import DishCard from './components/DishCart/DishCart';
import CartModal from './components/CartModal/CartModal';

function App() {

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openCart, setOpenCart] = useState(false);
  const [dishes, setDishes] = useState([]);

  useEffect(() => {
    fetch('/db.json')
      .then(response => response.json())
      .then(data => setDishes(data));
  }, []);

  const cart = {
    items: [],
    addCartId: (id) => {
       const item = dishes.find(dish => dish.id === id);
       const existingItem = cart.items.find(dish => dish.id === id);
       if (existingItem) {
         existingItem.count++;
       } else {
         cart.items.push({ ...item, count: 1 });
       }
       setCartDishes([...cart.items]);
    },
  }

  const [cartDishes, setCartDishes] = useState(cart.items);

  return (
    <>
      <Header setSelectedCategory={setSelectedCategory} setOpenCart={setOpenCart} />
      <CartModal openCart={openCart} setOpenCart={setOpenCart} cartDishes={cartDishes} />
      <div className='container'>
        <ul className='dishes-list'>
          {dishes.filter(dish => dish.category === selectedCategory || selectedCategory === 'All').map(dish => (
            <DishCard key={dish.id} dish={dish} addCartId={cart.addCartId} />
          ))}
        </ul>
      </div>
    </>
  )
}

export default App
