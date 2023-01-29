import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Basket from './components/toy-preview/Basket';

export function BookingPage(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const user = useSelector(state => state.cart.itemsUsers);


    let [cartOpen, setCartOpen] = useState(false);


    useEffect(() => {
        fetch(`http://127.0.0.1:8000/basket/?user_id=${user.pk}`)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setItems(result);
                },

                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])


    return (
        <div >
            <div>
                {/*{items.map(item => <ItemBooking toy = {item} key={item.pk} />)}*/}
                {items.map(item => <Basket user = {item} key={item.pk} />)}
            </div>
        </div>
    );
}

export default BookingPage;