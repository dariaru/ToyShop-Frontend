import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import UserEndpointAPI from "../../api/UserEndpointAPI";



export default function Register() {
  const [usernameText, setUsername] = useState('')
  const [passwordText, setPassword] = useState('')

  const navigate = useNavigate()

  async function submit() {
    try {
      const registerResponse = await UserEndpointAPI.register(usernameText, passwordText)
      if (registerResponse.error) {
        console.error(registerResponse.error)
      }
    } catch (e) {
      console.error(e)
    }

    navigate('/login')
  }

  return (
    <div className="auth-form-wrapper">
      <div className="auth-form">
        <h3>Регистрация</h3>
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
        <button className="button" onClick={submit} > Зарегистрироваться</button>
        <p className='mt-3'>
          Вы зарегистрированы? <Link to='/login'> Войти</Link>
        </p>
      </div>
    </div>
  );
}
