import axios from "axios";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"

export default function ProfilePage() {
    const [user, setUser] = useState({})
    
    useEffect(() => {
            const apiUrl = 'http://localhost:3000/api/professor/personalData?userId=a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
            axios.get(apiUrl).then((resp) => {
              const allPersons = resp.data;
              setUser(allPersons);
            });
          }, [setUser]);

    function logout() {
        localStorage.removeItem("token")
    }
    return (
        <div className="ProfilePage">
            <div className="avatar-wrap"></div>
            <div className="user-name-wrap">{user.last_name} {user.first_name} {user.patronymic}</div>
            <ul className="menu-wrap">
               {/* <li></li> */}
               <NavLink><li>Настройки приложения</li></NavLink>
               <NavLink to="/"><li onClick={logout}>Выйти</li> </NavLink> 
            </ul>
        </div>
    )
}