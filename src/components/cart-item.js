import React from 'react'

export function CartItem(props){
    const {name, price }= props;

    return (
        <div className='cart-item'>
            <span> {name}</span>
            <span> {price} руб.</span>
        </div>
    );
}

export default CartItem;