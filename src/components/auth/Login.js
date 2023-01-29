import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import { authenticate } from "../../redux/user/reducer";

import UserEndpointAPI from "../../api/UserEndpointAPI";

import './Auth.css';


export default function Login() {
  const [usernameText, setUsername] = useState('')
  const [passwordText, setPassword] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  async function submit() {
    try {
      const loginResponse = await UserEndpointAPI.authenticate(usernameText, passwordText)
      if (loginResponse.success) {
        console.log(loginResponse.username + ' Logged in')
        dispatch(authenticate({
          username: loginResponse.username,
          pk: loginResponse.pk,
          is_staff: loginResponse?.is_staff
        }))
      } else {
        console.error(loginResponse.error)
      }
    } catch (e) {
      console.error(e)
    }

    navigate('/toys')
  }

  return (
    <div className="auth-form-wrapper ">
      <div className="auth-form">
        <h3>Вход в аккаунт</h3>
        <div className="form-group">
          <label className='form-label'>Имя пользователя: </label>
          <input type="text" className="form-control"
            placeholder="Ваше имя"
            onChange={(event) => setUsername(event.target.value)} />
        </div>
        <div className="form-group">
          <label className='form-label'>Пароль: </label>
          <input type="password" className="form-control"
            placeholder="Пароль...."
            onChange={(event) => setPassword(event.target.value)} />
        </div>
        <button className="button" onClick={submit} > войти</button>
        <p className='mt-6'>
          Вы не зарегистрированы? <Link to='/register'> Зарегистрироваться</Link>
        </p>
      </div>
    </div>
  );
}
