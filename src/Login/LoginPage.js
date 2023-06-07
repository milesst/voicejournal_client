import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API } from '../Utils/api';

function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token');
    const userToken = JSON.parse(tokenString);
    return tokenString?.substring(0)
  };

  const [token, setToken] = useState(getToken());

  const saveToken = userToken => {
    localStorage.setItem('token', userToken);
    setToken(userToken.token);
  };

  return {
    token,
    setToken: saveToken
  }
}

  async function loginUser(credentials) {
      const response = await axios.post(API.USER_LOGIN, {
        username: credentials.username,
        password: credentials.password
      }
      )  
      if (!response.data.accessToken)
          throw new Error('Invalid user data')
          
      return JSON.stringify(response.data)
    }

   
export default function LoginPage() {
    const [username, setUserName] = useState('login5');
    const [password, setPassword] = useState('password');
    const {token, setToken}  = useToken();
    const navigate = useNavigate();

    const handleSubmit = async e => {
      try {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        setToken(token);

        navigate("/")
      }
      catch (e) {
        toast.error("Неправильный логин или пароль!");
      }
      }

    return (
        <div className="LoginPage">
          <ToastContainer autoClose={1000}/>
            <form onSubmit={handleSubmit}>
                {/* <h2>Вход</h2> */}
                <input placeholder='Логин' type="text" defaultValue={''} onChange={e => setUserName(e.target.value)}/>
                <input placeholder='Пароль' type="password" defaultValue={''} onChange={e => setPassword(e.target.value)}/>
                <div className="submit-wrap">
                <button type="submit">Войти</button>
                </div>
            </form>
        </div>
    )
}
// LoginPage.propTypes = {
//     setToken: PropTypes.func.isRequired
//   }