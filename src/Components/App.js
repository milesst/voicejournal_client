import { Outlet } from "react-router-dom"
import { useState } from "react";
import LoginPage from "../Login/LoginPage";

function useToken() {
    const getToken = () => {
      const tokenString = localStorage.getItem('token');
      const userToken = JSON.parse(tokenString);
      return userToken?.token
    };
  
    const [token, setToken] = useState(getToken());
  
    const saveToken = userToken => {
      localStorage.setItem('token', JSON.stringify(userToken));
      setToken(userToken.token);
    };
  
    return {
      token,
      setToken: saveToken
    }
  }

  
export default function App() {
    // const [token, setToken] = useState();
    // const token = getToken();
    
  const { token, setToken } = useToken();

    if (!token) {
        return <LoginPage setToken={setToken}/>
    }
    return (
        <div className="App">
            <Outlet />
        </div>
    )
}