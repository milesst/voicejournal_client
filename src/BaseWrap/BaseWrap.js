import ContentWrap from "../Components/ContentWrap"
import BottomMenuWrap from "../BottomMenu/BottomMenuWrap"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
function BaseWrap() {
    
    return (
        <div className="BaseWrap">
            <ContentWrap />
            <BottomMenuWrap />
        </div>
    )
}

export default BaseWrap