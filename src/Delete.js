import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import {SetId} from "./redux/cart/reducer";
import axios from "axios";
import { Button } from './components/button/button';

export function Delete(){
    const [error, setError] = useState(null);
    const users = useSelector(state => state.cart.itemsUsers);
    const [isLoaded, setIsLoaded] = useState(false);
    const [pk1, setId] = useState(null);
    const navigate = useNavigate();

    
    async function deleteGame() {
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json',
            }
        };
        const body = JSON.stringify({pk: pk1})

        const res = await axios.delete(`http://127.0.0.1:8000/toys/${pk1}/`,body, config)

            dispatch(SetId(res.data.pk))
    }

    const dispatch = useDispatch();
    const handleClick = () => {
        deleteGame();
        navigate("/toys");
    };
    const viewGame = function() {
        
    };

    return (
        <div >
            <div className='container mt-5'>
                <h1 className="title">Удаление</h1>
                <form>
                    <div className="form-group">
                        <label className='form-label'>ID игрушки: </label>
                        <input type ="text" className="form-control"
                               placeholder= "ID"
                               onChange ={(event) => setId(event.target.value)}
                               />
                    </div>

                </form>
                <Button type="primary" onClick={handleClick} > Удалить</Button>
            </div>

        </div>
    );
}

export default Delete;