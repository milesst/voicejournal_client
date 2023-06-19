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
import { API } from "../Utils/api";
import { getAccessToken, getUserId } from "../Utils/utils";
import axios from "axios";
import VoiceService from "../VoiceSystem/VoiceService";
import { ToastContainer, toast } from "react-toastify";
  
export default function App() {
//     const navigate = useNavigate()
//     const commands = [
//             {
//                 command: ['дисциплины', 'группы'],
//                 callback: () => { navigate('/disciplines') },
//                 isFuzzyMatch: true,
//                 fuzzyMatchingThreshold: 0.6,
//             },
//             {
//                 command: ['расписание'],
//                 callback: () => { navigate('/schedule') },
//                 isFuzzyMatch: true,
//                 fuzzyMatchingThreshold: 0.6,
//             },
//             {
//                 command: ['настройки'],
//                 callback: () => { navigate('/settings') },
//                 isFuzzyMatch: true,
//                 fuzzyMatchingThreshold: 0.6,
//             },
//             {
//                 command: ['главная', 'домашняя'],
//                 callback: () => { navigate('/') },
//                 isFuzzyMatch: true,
//                 fuzzyMatchingThreshold: 0.6,
//             },
//             {
//                 command: ['начать пару', 'новая пара', 'начать занятие', 'новое занятие'],
//                 callback: () => { 
//                     axios.get(`${API.GET_CURRENT_CLASS}/?userId=${getUserId()}`,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
//                         const data = resp.data[0]
//                         if (data) {                      
//                             localStorage.setItem('activeClass', JSON.stringify({
//                             data
//                             }))
//                             navigate(`activeClass`, { state: data })
//                         } 
//                     }).catch((e) => alert('error'))
//                 },
//                 isFuzzyMatch: true,
//                 fuzzyMatchingThreshold: 0.8,
//             },
//             {
//                 command: ['закончить пару с комментарием *'],
//                 callback: (comment) => { console.log('comment: ' + comment) },
//                 isFuzzyMatch: true,
//                 fuzzyMatchingThreshold: 0.6,
//             },
//     ]
//     const {
//       transcript,
//       interimTranscript,
//       finalTranscript,
//       resetTranscript,
//       listening,
//       } = useSpeechRecognition({ commands })

//     useEffect(() => {
//         if (finalTranscript !== '') {
//          console.log('Got final result:', finalTranscript)
//         }
//     }, [interimTranscript, finalTranscript])

//     if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
//       return null;
//     }
   
//     if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
//       console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
//     }
//     const listenContinuously = () => {
//       SpeechRecognition.startListening({
//         continuous: true,
//         language: 'ru-RU',
//       });
//     };

//    if (localStorage.getItem('voiceSystemActive') === '1') {
//       listenContinuously()
//    }
    function showError(message) {
        toast.error(message)
    }

    return (
        <div className="App">
            <ToastContainer style={{zIndex: 99999}} autoClose={1000} />
            <VoiceService showError={showError} />
            <Outlet />
        </div>
    )
}