import React, { useState, useEffect } from 'react';
import {TiTimes} from 'react-icons/ti';

import './DropDownCartItem.css'

export function CartItem({pk, toy, amount}) {
    
    return (
        <div className='dropdown-menu__item'>
            <span className='dropdown-menu__name'> {toy.name}</span>
            <span> {toy.price} ₽</span>
            <span> <TiTimes/> {amount} </span>
        </div>
    );
}

export default CartItem;
