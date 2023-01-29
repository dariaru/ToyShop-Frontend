import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {deleteItemFromCart, setItemInCart} from "../redux/cart/reducer";

import {MdRemoveCircle} from 'react-icons/md'

export function OrderItem(props) {
    const {cartItem} = props;

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);

    const dispatch = useDispatch();

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/basket/${cartItem.pk}/`)
            .then (result => result.json())
            .then(
                (data) => {
                    console.log(data);
                    setIsLoaded(true);
                    setItems(data);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    const remove = () => {
        const request = {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        }
        fetch(`http://127.0.0.1:8000/basket/${cartItem.pk}/`, request)
            .then((response) => {
                dispatch(deleteItemFromCart(cartItem))
            })
    }

    if (error) {
        return <div>Ошибка: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Загрузка...</div>;
    } else {
        return (
            <div className="order-item">
                <div>
                    <div className="order-item__title">
                        {cartItem.toy.name}
                    </div>
                    <div className="order-item__price">
                        {cartItem.toy.price} ₽
                    </div>
                </div>      

                <img src={'images/' + cartItem.toy.image} className="order-item__image"/>

                <div className="order-item__control_block">
                    <MdRemoveCircle className="remove-button" onClick={remove}></MdRemoveCircle>
                </div>
            </div>
        );
    }
}

export default OrderItem;

