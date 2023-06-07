import { useNavigate } from 'react-router-dom'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
const VoiceServiceType = {
    STUDENTS: 's', CLASS: 'c', ASSIGNMENT: 'a', SCHEDULE: 'sch'
}

const getClassCommands = (classData) => {
    let commands = []
    commands.push(classData.students.map(
        student => {return {
            command: student.lastName + ' (есть|присутствует|на месте|здесь)',
            callback: (command, spokenPhrase, similarityRatio) => console.log(command),
        }
    }))
    commands.push(classData.students.map(
        student => {return {
            command: student.lastName + ' (нет|отсутствует|не на месте)',
            callback: (command, spokenPhrase, similarityRatio) => console.log(command),
        }
    }))
}


export default function VoiceService(props) {
    SpeechRecognition.lang = "ru-RU";
    const navigate = useNavigate()
    const fuzzySetting = {
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.2
    }

    const getNavigationCommands = () => {
        return [
            {
                command: 'дисциплины|группы|задания|лабораторные',
                callback: () => navigate('/disciplines')
            },
            {
                command: 'расписание',
                callback: () => navigate('/schedule')
            },
            {
                command: 'главная|основная|домашняя',
                callback: () => navigate('/')
            },
            {
                command: 'профиль',
                callback: () => navigate('/profile')
    
            },
            {
                command: 'начать пару|пара|новая пара|занятие|новое занятие|начать занятие',
                callback: () => navigate('/activeClass')
            }
        ]
    }
    
    const commands = props.isNav ? getNavigationCommands() : getClassCommands()
    const {
        transcript,
        interimTranscript,
        finalTranscript,
        resetTranscript,
        listening,
        } = useSpeechRecognition({ commands })
    
    function startListening() {
        SpeechRecognition.startListening({
            continuous: true,
            language: 'en-GB',
          })
    }

    function stopListening() {
        SpeechRecognition.stopListening()
    }
    // return {
    //     transcript,
    //     interimTranscript,
    //     finalTranscript,
    //     resetTranscript,
    //     listening,
    //     }
}