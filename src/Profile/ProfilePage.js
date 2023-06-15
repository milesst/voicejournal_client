import axios, { all } from "axios";
import { useState, useEffect } from "react";
import { NavLink, Navigate, redirect } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import { getAccessToken, getUserId, isAdmin } from "../Utils/utils";
import { ToastContainer, toast } from "react-toastify";
import { API } from "../Utils/api";

export default function ProfilePage() {
    const [user, setUser] = useState({})
    const navigate = useNavigate();

    // function subscribe() {
    //     Notification.requestPermission().then((result) => {
    //         if (result === "granted") {
    //             toast.success('Уведомления включены!')
    //         }
    //       });

    //     //   const payload = document.getElementById("notification-payload").value;
    //     //   const delay = document.getElementById("notification-delay").value;
    //     //   const ttl = document.getElementById("notification-ttl").value;
        
    //     //   fetch("./sendNotification", {
    //     //     method: "post",
    //     //     headers: {
    //     //       "Content-type": "application/json",
    //     //     },
    //     //     body: JSON.stringify({
    //     //       subscription,
    //     //       payload,
    //     //       delay,
    //     //       ttl,
    //     //     }),
    //     //   });
    //     successNotification()
    // }

    // function successNotification (){
    //     // addNotification({
    //     //   title: 'Success',
    //     //   subtitle: 'You have successfully submitted',
    //     //   message: 'Welcome to GeeksforGeeks',
    //     //   theme: 'light',
    //     //   closeButton:"X",
    //     //   backgroundTop:"green",
    //     //   backgroundBottom:"yellowgreen"
    //     // })
    //     navigator.serviceWorker.registration.showNotification('Скоро занятие', {
    //             body: 'У Вас скоро занятие!',
    //             tag: 'spell',
    //           })
    //   };

    useEffect(() => {
            const apiUrl = `${API.BASE_URL}/api/professor/personalData?userId=${getUserId()}`;
            axios.get(apiUrl, {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
              const allPersons = resp.data;
              console.log(allPersons)
              setUser(allPersons);
            });
          }, [setUser]);

    function logout() {
        localStorage.removeItem("token")
    }
    return (
        <div className="ProfilePage">
            <ToastContainer />
            <div className="avatar-wrap"></div>
            <div className="user-name-wrap">{user.last_name} {user.first_name} {user.patronymic}</div>
            <ul className="menu-wrap">
               {/* <li></li> */}
               <NavLink to="/settings"><li>Настройки приложения</li></NavLink>
               {isAdmin() ? <NavLink to="/admin"><li>Панель администратора</li></NavLink> : ''}
               <NavLink to="/login"><li onClick={logout}>Выйти</li> </NavLink> 
               {/* <li><a onClick={subscribe}>Уведомления</a></li> */}
            </ul>
        </div>
    )
}