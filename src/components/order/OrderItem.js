import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";

import {increaseAmount, decreaseAmount, remove } from "../../redux/cart/reducer";

import CartEndpointAPI from '../../api/CartEndpointAPI';

import { MdDelete } from 'react-icons/md';
import { FcCollapse, FcExpand } from 'react-icons/fc';
import './OrderItem.css';


export default function OrderItem({pk, toy, amount}) {
    const dispatch = useDispatch();

    const currentUser = useSelector(state => state.user.currentUser)
    
    const _increaseAmount = async () => {
        const item = {
            user: currentUser.pk,
            toy: toy.pk,
            amount: amount + 1
        };

        await CartEndpointAPI.updateItem(pk, item);
        dispatch(increaseAmount(pk));
    }

    const _decreaseAmount = async () => {
        if (amount <= 1) {
            return;
        }

        const item = {
            user: currentUser.pk,
            toy: toy.pk,
            amount: amount - 1
        };

        await CartEndpointAPI.updateItem(pk, item);
        dispatch(decreaseAmount(pk));
    }

    const _remove = async () => {
        await CartEndpointAPI.removeItem(pk);
        dispatch(remove(pk));
    }

    return (
        <div className='order-item__container'>
            <div>
                <div className="order-item__name">
                    {toy.name}
                </div>
                <div className="order-item__price">
                    {toy.price} ₽
                </div>
            </div>      

            <img src={toy.image} className="order-item__image"/>

            <div className='order-item__control'>
                <div>
                    <FcCollapse size={25} onClick={_increaseAmount}/>
                    <div className='order-item__amount'> {amount} </div>
                    <FcExpand size={25} onClick={_decreaseAmount}/>
                </div>
            </div>
            <div className='order-item__control'>
                <MdDelete size={30} color={'#C3073F'} onClick={_remove}/>
            </div>
        </div>
    );
}
