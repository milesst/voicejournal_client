import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom'

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
    const response = await axios.post('http://localhost:3000/login', {
      username: credentials.username,
      password: credentials.password
    }
   )
    console.log(response.data)
    return JSON.stringify(response.data)
   }

   
export default function LoginPage() {
    const [username, setUserName] = useState('login5');
    const [password, setPassword] = useState('password');
    const {token, setToken}  = useToken();
      const navigate = useNavigate();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        setToken(token);

        navigate("/")
      }

    return (
        <div className="LoginPage">
            <form onSubmit={handleSubmit}>
                {/* <h2>Вход</h2> */}
                <input type="text" defaultValue={'login5'} onChange={e => setUserName(e.target.value)}/>
                <input type="password" defaultValue={'password'} onChange={e => setPassword(e.target.value)}/>
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