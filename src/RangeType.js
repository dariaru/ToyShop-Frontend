import React, { Component, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { put, remove } from './redux/cart/reducer';
import CartEndpointAPI from './api/CartEndpointAPI';
import './App.css'


function GameInf() {
  const currentUser = useSelector(state => state.user.currentUser)

  const { pk } = useParams();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [toy, setToy] = useState({});

  const cartItems = useSelector(state => state.cart.items);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/toys/${pk}/`)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setToy(result);
          setIsInCart(cartItems.some(item => item.toy.pk === parseInt(pk)));
        },

        (error) => {
          setIsLoaded(true);
          setError(error);
        })
  }, [])

  async function addToCart() {
    if (isInCart)
      return;

    const itemToPut = {
      user: currentUser.pk,
      toy: toy.pk,
      amount: 1
    };

    let createdItem = await CartEndpointAPI.putItem(itemToPut);
    createdItem.toy = toy;

    dispatch(put(createdItem));
    setIsInCart(true);

  }

  async function removeFromCart() {
    if (!isInCart)
      return;

    const cartItemPk = cartItems.find(item => item.toy.pk === parseInt(pk)).pk;
    await CartEndpointAPI.removeItem(cartItemPk);
    dispatch(remove(cartItemPk))
    setIsInCart(false);
  }

  if (error) {
    return <div>Ошибка: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Загрузка...</div>;
  } else {
    return (
      <div className={"theme"}>
        <div key={toy.pk}>
            <div className={"card"}>
              <div className={"img"}>
              <img src={toy.image} width={"350px"} className={"image"} />
              </div>
              <div className={"name"}>{toy.name}</div>
              <div className={"dicription"}>{toy.dicription}</div>
              <div className={"price"}>{toy.price} руб.</div>

              {currentUser &&
              <button
                className={`${isInCart ? 'remove-button' : 'button'} `}
                onClick={isInCart ? removeFromCart : addToCart}>
                {
                  isInCart ? 'Убрать из корзины' : 'В корзину'
                }
              </button>
              }
            </div>
        </div>
      </div>
    );
  }
}

export default GameInf;