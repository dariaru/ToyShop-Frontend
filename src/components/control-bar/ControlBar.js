import DropDownCart from '../dropdown-cart/DropDownCart';
import './ControlBar.css'

import { Link } from 'react-router-dom';

import UserControl from './UserControl';
import { useSelector } from 'react-redux';


export default function ControlBar() {
  const currentUser = useSelector(state => state.user.currentUser)

  return (
    <div className='topnav'>
      <a href="/"><Link to="/toys">Главная</Link></a>
      <a href="/"><Link to="/toys">Контакты</Link></a>
      <a href="/"><Link to="/toys">Информация</Link></a>
      <div class="topnav-right">
        <div className="topnav-user-element">
          <UserControl />
        </div>

        {currentUser &&
        <div className="topnav-user-element">
          <DropDownCart />
        </div>
        }
      </div>
    </div>
  );
}
