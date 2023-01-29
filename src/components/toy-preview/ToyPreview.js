import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { put, remove } from '../../redux/cart/reducer'
import CartEndpointAPI from "../../api/CartEndpointAPI";
import './ToyPreview.css'


export default function ToyPreview({ toy }) {
  const dispatch = useDispatch();

  const currentUser = useSelector(state => state.user.currentUser)
  const cartItems = useSelector(state => state.cart.items);
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    setIsInCart(cartItems.some(item => item.toy.pk === toy.pk))
  }, [cartItems, toy.pk])

  async function addToCart() {
    if (isInCart)
      return;

    const item = {
      user: currentUser.pk,
      toy: toy.pk,
      amount: 1
    };

    let newItem = await CartEndpointAPI.putItem(item);
    newItem.toy = toy;

    dispatch(put(newItem));
    setIsInCart(true);
  }

  async function removeFromCart() {
    const cartItemPk = cartItems.find(item => item.toy.pk === toy.pk).pk;
    await CartEndpointAPI.removeItem(cartItemPk);
    dispatch(remove(cartItemPk))
    setIsInCart(false);
  }

  return (
    <div className='toy-preview'>
      <img src={toy.image} width={"200px"} className={"image"} />
      <div><Link to={`/toys/${toy.pk}/`} className={"name"}>{toy.name}</Link></div>

      <div className='toy-preview__price'>{toy.price} ₽</div>

      {currentUser &&
      <button
        className={`${isInCart ? 'button-remove' : 'button'} `}
        onClick={isInCart ? removeFromCart : addToCart}>
        {
          isInCart ? 'Убрать из корзины' : 'В корзину'
        }
      </button>
      }
    </div>
  )
}
