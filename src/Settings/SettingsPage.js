import axios from 'axios';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Toggle from 'react-toggle';
import "react-toggle/style.css"
import { API, BASE_URL } from '../Utils/api';

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray; 
  }

export default function SettingsPage(props) {
    const toggleBtn = useRef()
    const [registration, setRegistration] = useState()
    const [subscribed, setSubscribed] = useState(null)    

    useEffect(() => {
        async function fetchRegistration() {
            const registration = await navigator.serviceWorker.getRegistration();
            setRegistration(registration)
            const subscribed = await registration.pushManager.getSubscription();
            setSubscribed(subscribed)
        }
        fetchRegistration()
    }, [setRegistration])

    async function enableNotifications(e) {
        const result = await Notification.requestPermission();
        if (result === 'denied') {
        console.error('The user explicitly denied the permission request.');
        return;
        }
        if (result === 'granted') {
        console.info('The user accepted the permission request.');
        }
        
        if (subscribed) {
            console.info('User is already subscribed.');
            return;
        }
        const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlB64ToUint8Array(process.env.REACT_APP_VAPID_PUBLIC_KEY)
        });
        axios.post(`${BASE_URL}/api/notification/addSubscription`, subscription)
        setSubscribed(subscription)
        toast.success('Уведомления включены!')
    } 

    async function unsubscribe() {
        axios.post(`${BASE_URL}/api/notification/removeSubscription`, {endpoint: subscribed.endpoint})
        const unsubscribed = await subscribed.unsubscribe();
        if (unsubscribed) {
        console.info('Successfully unsubscribed from push notifications.');
        }
        setSubscribed(null)
        toast.success('Уведомления выключены')
    }

    async function notif() {
        axios.post(`${BASE_URL}/api/notification/sendNotification`, {endpoint: subscribed.endpoint})

    }

    const [voiceOn, setVoiceOn] = useState(localStorage.getItem('voiceSystemActive') === '1')

    function toggleVoiceSystem() {
        if (localStorage.getItem('voiceSystemActive') === '1') {
            localStorage.setItem('voiceSystemActive', '0')
        }
        else {
            localStorage.setItem('voiceSystemActive', '1')
        }
        setVoiceOn(!voiceOn)
        window.location.reload(false);
    }

    return (
        <div className="SettingsPage">
            <ToastContainer autoClose={1000}/>
            <div className="settings-header">Настройки</div>
                <label className='notif-btn'>
                <span>Уведомления</span>
                <Toggle
                    ref={toggleBtn}
                    checked={Boolean(subscribed)}
                    icons={false}
                    onChange={subscribed ? unsubscribe : enableNotifications} />
                </label>
                <label className='notif-btn'>
                <span>Голосовое управление</span>
                <Toggle
                    // ref={toggleBtn2}
                    checked={Boolean(voiceOn)}
                    icons={false}
                    onChange={toggleVoiceSystem} />
                </label>
        </div>
    )   
}