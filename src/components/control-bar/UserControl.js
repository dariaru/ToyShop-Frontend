import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { logout } from '../../redux/user/reducer'

import UserEndpointAPI from '../../api/UserEndpointAPI';
import { BiUserCircle } from 'react-icons/bi';
import './UserControl.css'


export default function User() {
  const dispatch = useDispatch()

  const [isOpen, setOpen] = useState(true);
  const currentUser = useSelector((state) => state.user.currentUser)

  const _logout = async () => {
    const response = await UserEndpointAPI.logout()
    if (response.success) {
      console.log('Logged out')
      dispatch(logout())
    }
  }

  return (
    <div className='user-control'>
      <div className="dropdown-menu__container">
        <div className="dropdown-menu__trigger" onClick={() => { setOpen(!isOpen) }}>
          <BiUserCircle size={'30px'} />
        </div>

        {currentUser &&
          <div className={`dropdown-menu ${isOpen ? 'active' : 'inactive'}`}>
            <div>
              <img src='/images/user.png' width={'50px'} height={'50px'} />
            </div>
            <div className={"user"}>
            <div>Пользователь: {currentUser.username}</div>
            <div>id: {currentUser.pk}</div>
            </div>
            <button className="btn" onClick={() => { _logout() }}>Выйти</button>
          </div>
        }
        {!currentUser &&
          <div className={`dropdown-menu ${isOpen ? 'active' : 'inactive'}`}>
            <div>
              <div>
                <img src='/images/log.png' width={'50px'} height={'50px'} />
              </div>
              <p>Вы не авторизованы</p>
              <div className='dropdown-menu__controls'>
                <a className='user_link' aria-current="page" href='/login'>Вход</a>
                <Link className='user_link' aria-current="page" to="/register">Регистрация</Link>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  )
}
