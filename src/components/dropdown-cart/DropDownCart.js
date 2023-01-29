import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refresh } from '../../redux/cart/reducer'
import DropDownCartItem from './DropDownCartItem'
import CartEndpointAPI from "../../api/CartEndpointAPI";
import { AiOutlineShoppingCart } from 'react-icons/ai';
import './DropDownCart.css'


export default function DropDownCart() {
    const [isOpen, setOpen] = useState(true);
    const [isLoaded, setLoaded] = useState(false);
    const currentUser = useSelector((state) => state.user.currentUser)

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const items = useSelector(state => state.cart.items);

    useEffect(() => {
        async function fetchData() {
            const fetchedItems = await CartEndpointAPI.fetchItems(currentUser.pk);
            dispatch(refresh(fetchedItems));
            setLoaded(true);
        }
        fetchData();
    }, [])

    if (isLoaded) {
        return(
            <div className="dropdown-menu__container">
                <div className="dropdown-menu__trigger" onClick={() => { setOpen(!isOpen)} }>
                    <AiOutlineShoppingCart size={30}/>
                </div>
                <div className={`dropdown-menu ${isOpen? 'active' : 'inactive'}`}>

                {
                    items.map(item => <DropDownCartItem 
                                        key={item.pk}
                                        pk={item.pk}
                                        toy={item.toy}
                                        amount={item.amount}
                                      />)
                }
                <div className="dropdown-menu__controls">
                    <span> 
                        Сумма: &nbsp;
                        { items? items.reduce((acc, item) => acc + item.toy.price * item.amount, 0) : 0 }
                        &nbsp; ₽
                    </span>
                    <button className="btn" onClick={ () => navigate('/order') }>К заказу!</button>
                </div>
                </div>
            </div>
        )
    } else {
        return(
            <div className="dropdown-menu__container">
                <div className="dropdown-menu__trigger" onClick={() => setOpen(!isOpen)}>
                    <AiOutlineShoppingCart size={30}/>
                </div>
                <div className={`dropdown-menu ${isOpen? 'active' : 'inactive'} loader-block`}></div>
            </div>
        )
    }
}