import React from 'react';
import { useSelector } from 'react-redux';
import OrderItem from './OrderItem';
import {Link} from "react-router-dom";

export default function Order() {
  const items = useSelector(state => state.cart.items);

  return (
    <div>
      <div>
        {
          items.map(item =>
            <OrderItem
              key={item.pk}
              pk={item.pk}
              toy={item.toy}
              amount={item.amount}
            />)
        }
      </div>
      <h3 style={{ padding: '1rem' }}>
        Сумма: {items.reduce((acc, item) => acc + item.toy.price * item.amount, 0)} ₽
      </h3>
        <Link to ={`/bookingpage`}>Сформировать заказ </Link>
    </div>
  );
}
