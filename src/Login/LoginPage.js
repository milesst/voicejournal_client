import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { API, BASE_URL } from '../Utils/api';
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin';

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
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const {token, setToken}  = useToken();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async e => {
      setLoading(true)
      try {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        setToken(token);

        setLoading(false)

        navigate("/")
        // window.location.reload(false);
      }
      catch (e) {
        console.log(e)
        toast.error("Неправильный логин или пароль!");
        setLoading(false)
      }
      }

    async function specialAuth() {
      const response = await axios.post(BASE_URL + '/login/specialAuth')  
      if (!response.data.accessToken)
          throw new Error('Invalid user data')
          
      return JSON.stringify(response.data)
    }  

    return (
        <div className="LoginPage">
          <ToastContainer autoClose={1000}/>
          <div className="login-welcome">
            <img src="whitelogo.svg" alt="логотип" style={{height: '100px'}}/>
            <p className="logo-name" style={{fontWeight: '800', margin: 0, fontSize: '2.5rem', color: 'white'}}>Jivi</p>
          </div>
            <form onSubmit={handleSubmit}>
              
                {/* <h2>Вход</h2> */}
                <input placeholder='Логин' type="text" defaultValue={''} onChange={e => setUserName(e.target.value)}/>
                <input placeholder='Пароль' type="password" defaultValue={''} onChange={e => setPassword(e.target.value)}/>
                <div className="submit-wrap">
                {
                  loading ?
                  <TailSpin style={{position: 'absolute', margin: 'auto'}} stroke='orange' speed={.75} /> :
                  ''
                }
                {
                  
                  <button type="submit" disabled={loading}>Войти</button>}
                </div>
            </form>
        </div>
    )
}
// LoginPage.propTypes = {
//     setToken: PropTypes.func.isRequired
//   }