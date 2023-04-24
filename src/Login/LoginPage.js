import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useRef, useContext } from 'react';
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
    return response.data.accessToken
   }

   
export default function LoginPage() {
    const [username, setUserName] = useState('login5');
    const [password, setPassword] = useState('password');
    const {token, setToken}  = useToken();

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await loginUser({
          username,
          password
        });
        setToken(token);
      }

    return (
        <div className="LoginPage">
            login
            <form onSubmit={handleSubmit}>
                <input type="text" defaultValue={'login5'} onChange={e => setUserName(e.target.value)}/>
                <input type="text" defaultValue={'password'} onChange={e => setPassword(e.target.value)}/>
                <div>
                <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
// LoginPage.propTypes = {
//     setToken: PropTypes.func.isRequired
//   }