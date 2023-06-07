import { Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react";
import LoginPage from "../Login/LoginPage";

// function useToken() {
//     const getToken = () => {
//       const tokenString = localStorage.getItem('token');
//       const userToken = JSON.parse(tokenString);
//       return userToken?.token
//     };
  
//     const [token, setToken] = useState(getToken());
  
//     const saveToken = userToken => {
//       localStorage.setItem('token', JSON.stringify(userToken));
//       setToken(userToken.token);
//     };
  
//     return {
//       token,
//       setToken: saveToken
//     }
//   }
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
  
export default function App() {
    const navigate = useNavigate()
    SpeechRecognition.lang = "ru-RU"
    
    const сommands = [
            // {
            //     command: 'дисциплины',
            //     callback: (command) => { console.log('disci') }
            // },
            // {
            //     command: 'расписание',
            //     callback: (command) => navigate('/schedule')
            // },
            // {
            //     command: 'главная|основная|домашняя',
            //     callback: (command) => navigate('/')
            // },
            // {
            //     command: 'профиль',
            //     callback: (command) => navigate('/profile')
    
            // },
            // {
            //     command: 'начать пару|пара|новая пара|занятие|новое занятие|начать занятие',
            //     callback: (command) => navigate('/activeClass')
            // }
    ]
    const {
        transcript,
        resetTranscript,
      } = useSpeechRecognition({ сommands });

        // SpeechRecognition.startListening( {
        //     continuous: true,
        //     language:'ru-RU'
            
        // })
//     const listenContinuously = () => {
//             SpeechRecognition.startListening({
//               continuous: true,
//               language: 'ru-RU',
//             });
//           };

// listenContinuously()

      useEffect( () => {
        console.log(transcript)
      }, [transcript])

    return (
        <div className="App">
            <Outlet />
        </div>
    )
}