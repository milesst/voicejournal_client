import axios from 'axios';
import PropTypes from 'prop-types';
import { useState, useRef, useContext } from 'react';
async function loginUser(credentials) {
    const response = await axios.post('http://localhost:3000/login', {
      username: credentials.username,
      password: credentials.password
    })
    return response.data.accessToken
   }

   
export default function LoginPage({ setToken }) {
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();

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
                <input type="text" onChange={e => setUserName(e.target.value)}/>
                <input type="text" onChange={e => setPassword(e.target.value)}/>
                <div>
                <button type="submit">Submit</button>
                </div>
            </form>
        </div>
    )
}
LoginPage.propTypes = {
    setToken: PropTypes.func.isRequired
  }