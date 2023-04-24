import React from 'react';
import ReactDOM from 'react-dom/client';
import './Stylesheets/professor-style.css';
import './Stylesheets/index.css';
import BaseWrap from './BaseWrap/BaseWrap.js';
import reportWebVitals from './reportWebVitals';
import { TransitionGroup, CSSTransition } from "react-transition-group";

import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";
import DisciplinesPage from './Disciplines/DisciplinesPage';
import DisciplineItem from './Disciplines/DisciplineItem';
import ProfilePage from './Profile/ProfilePage';
import LoginPage from './Login/LoginPage';
import App from './Components/App';
import HomePage from './Home/HomePage';
import SchedulePage from './Schedule/SchedulePage';
import { useState } from 'react';
// function useToken() {
//   const getToken = () => {
//     const tokenString = localStorage.getItem('token');
//     const userToken = JSON.parse(tokenString);
//     return userToken?.token
//   };

//   const [token, setToken] = useState(getToken());

//   const saveToken = userToken => {
//     localStorage.setItem('token', JSON.stringify(userToken));
//     setToken(userToken.token);
//   };

//   return {
//     token,
//     setToken: saveToken
//   }
// }

const router = createBrowserRouter([
  {
    path: "",
    element: localStorage.getItem('token') ? <App /> : <LoginPage/>,
    children: [
      {
        path: "/",
        element: <BaseWrap />,
        children: [
          {
            path: "disciplines",
            element: <DisciplinesPage />
          },
          {
            index: true,
            path: "/",
            element: <HomePage />
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "schedule",
            element: <SchedulePage />
          }
        ]
      },
    ]
  }
  // {
  //   path: "",
  //   element: <RouteGuard path="/" component={App}/>
  // }
]);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode> 
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
