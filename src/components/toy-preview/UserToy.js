import React, {Component, useState, useEffect, useReducer} from 'react';
import {Link} from "react-router-dom";
import { useDispatch } from "react-redux"
import { useNavigate } from 'react-router-dom';

function UserToy() {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [value, setValue] = useState('');

    const [isManager, setIsManager] = useState(false);


    const navigate = useNavigate();
    const viewAuth = function() {
        navigate("/login");
    };

    useEffect(() => {
        fetch(`http://127.0.0.1:8000/basket/`)
            .then (res => res.json())
            .then(

                (result) =>{
                    setIsLoaded(true);
                    setItems(result);
                },
                (error) =>{
                    setIsLoaded(true);
                    setItems(error);
                }
            )
    }, [])

    const dispatch = useDispatch();

    if(error) {
        return <div>Error: {error.message}</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        return (

            <div className='container-text' >
                <div className>
                    <div className="assortment">Заказы</div>
                </div>

                <div className="mx-auto">
                </div>
                {items.map(item=>(

                    <div key={item.pk}>

                        <div className='order-item__container'>

                            <br/><div className> Пользователь:{item.user}</div>
                            <br/><div className='price'>Игрушка: {item.toy}</div>
                            {/*<br/><div className='price'>Статус покупки: {item.buyed}</div>*/}
                            <br/><div className='price'>Количество: {item.amount}</div>

                        </div>
                    </div>
                ))}

            </div>

        );
    }
}

export default UserToy;