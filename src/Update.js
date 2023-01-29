import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {SetDicription, SetId, SetPrice, SetTitle} from "./redux/cart/reducer";
import axios from "axios";
import { Button } from './components/button/button';

export function Update(){
    const [error, setError] = useState(null);
    const users = useSelector(state => state.cart.itemsUsers);
    const [isLoaded, setIsLoaded] = useState(false);
    const [item, setItems] = useState([]);
    const [name1, setTitle] = useState('');
    const [pk1, setId] = useState(null);
    const [price1, setPrice] = useState('');
    // const [dicription1, SetDicription] = useState('');
    const navigate = useNavigate();

    async function updateGame() {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
            }
        };
        const body = JSON.stringify({name: name1, price: price1, pk: pk1})

        const res = await axios.put(`http://127.0.0.1:8000/toys/${pk1}/`,body, config)

            dispatch(SetId(res.data.pk))
            dispatch(SetTitle(res.data.name))
            dispatch(SetPrice(res.data.price))
            // dispatch(SetDicription(res.data.dicription))
    }

    const dispatch = useDispatch();
    const handleClick = () => {
        updateGame();
        navigate("/toys");
    };
    const viewGame = function() {
        
    };

    return (
        <div >
            <div className='container mt-5'>
                <h1 className="title">Обновление</h1>
                <form>
                    <div className="form-group">
                        <label className='form-label'>ID игрушки: </label>
                        <input type ="text" className="form-control"
                               placeholder= "ID"
                               onChange ={(event) => setId(event.target.value)}
                               />
                    </div>
                    <div className="form-group">
                        <label className='form-label'>Название: </label>
                        <input type ="text" className="form-control"
                               placeholder= "title"
                               onChange ={(event) => setTitle(event.target.value)}/>
                    </div>
                    <div className="form-group">
                        <label className='form-label'>Цена: </label>

                        <input type ="text" className="form-control"
                               placeholder= "password"
                               onChange ={(event) => setPrice(event.target.value)}/>
                    </div>
                    {/*<div className="form-group">*/}
                    {/*    <label className='form-label'>Описание: </label>*/}

                    {/*    <input type ="text" className="form-control"*/}
                    {/*           placeholder= "developer"*/}
                    {/*           onChange ={(event) => SetDicription(event.target.value)}/>*/}
                    {/*</div>*/}

                </form>
                <Button type="primary" onClick={handleClick} > Обновить</Button>
            </div>

        </div>
    );
}

export default Update;