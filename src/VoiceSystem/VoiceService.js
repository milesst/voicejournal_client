import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { API, BASE_URL } from '../Utils/api'
import { fuzzyMatch, getAccessToken, getUserId } from '../Utils/utils'
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
    const [commands, setCommands] = useState()
    SpeechRecognition.lang = "ru-RU";
    const navigate = useNavigate()
    const fuzzySetting = {
        isFuzzyMatch: true,
        fuzzyMatchingThreshold: 0.2
    }

    useEffect(() => {   
        axios.get(BASE_URL + '/api/professor/voiceCommandData')
        .then(response => {
            const commandData = response.data
            // console.log(commandData)
            const navCommands = getNavigationCommands()
            const fuzzyCommands = [
                {
                    command: 'группа *',
                    callback: (groupNumber) => {
                        // console.log(command)
                        console.log(groupNumber)
                        const group = fuzzyMatch(groupNumber, ['data_name'], commandData.filter(item => item.entity === 'student_group'), 0.7)
                        if (group)
                            navigate(`/groups/${group.id}`)
                        else 
                            props.showError('Не нашлось такой группы')
                    },
                },
                {
                    // command: ['задание *', 'лабораторная *', 'лаба *', '(открыть) *'],
                    command: 'задание *',
                    callback: (assignmentName) => {
                        console.log(assignmentName)
                        const assignment = fuzzyMatch(assignmentName, ['data_name'], commandData.filter(item => item.entity === 'assignments'), 0.6)
                        const discipline = fuzzyMatch(assignmentName, ['data_name'], commandData.filter(item => item.entity === 'discipline'), 0.6)
                        
                        if ((assignment && discipline && assignment.score > discipline.score)
                        || !discipline
                            )
                            navigate(`/assignments/${assignment.id}`)
                        else if (discipline) {
                            navigate(`/disciplineAssignments/${discipline.id}`, {state: {name: discipline.data_name}})
                        }
                        else 
                            props.showError('Не нашлось данных по вашему запросу')    
                    },
                },
                {
                    command: 'задания по *',
                    callback: (disciplineName) => {
                        console.log(disciplineName)
                        const discipline = fuzzyMatch(disciplineName, ['data_name'], commandData.filter(item => item.entity === 'discipline'), 0.7)
                        if (discipline)
                            navigate(`/disciplineAssignments/${discipline.id}`)
                    }
                }
            ]   
            setCommands(navCommands.concat(fuzzyCommands))
        })
      
    }, [setCommands])
    

    const getNavigationCommands = () => {
        return [
            {
                command: ['дисциплины', 'группы'],
                callback: () => { navigate('/disciplines') },
                isFuzzyMatch: true,
                fuzzyMatchingThreshold: 0.3,
            },
            {
                command: ['расписание'],
                callback: () => { navigate('/schedule') },
                isFuzzyMatch: true,
                fuzzyMatchingThreshold: 0.6,
            },
            {
                command: ['настройки'],
                callback: () => { navigate('/settings') },
                isFuzzyMatch: true,
                fuzzyMatchingThreshold: 0.6,
            },
            {
                command: ['главная', 'домашняя'],
                callback: () => { navigate('/') },
                isFuzzyMatch: true,
                fuzzyMatchingThreshold: 0.6,
            },
            {
                command: ['начать пару', 'новая пара', 'начать занятие', 'новое занятие'],
                callback: () => { 
                    axios.get(`${API.GET_CURRENT_CLASS}/?userId=${getUserId()}`,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
                        const data = resp.data[0]
                        if (data) {                      
                            localStorage.setItem('activeClass', JSON.stringify({
                            data
                            }))
                            navigate(`activeClass`, { state: data })
                        } 
                    }).catch((e) => alert('error'))
                },
                isFuzzyMatch: true,
                fuzzyMatchingThreshold: 0.8,
            },
            {
                command: ['закончить пару с комментарием *'],
                callback: (comment) => { console.log('comment: ' + comment) },
                isFuzzyMatch: true,
                fuzzyMatchingThreshold: 0.6,
            },
    ]
    }
    
    const {
        transcript,
        interimTranscript,
        finalTranscript,
        resetTranscript,
        listening,
        } = useSpeechRecognition({ commands })
  
      useEffect(() => {
          if (finalTranscript !== '') {
           console.log('Got final result:', finalTranscript)
          }
      }, [interimTranscript, finalTranscript])
  
      if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        return null;
      }
     
      if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
        console.log('Your browser does not support speech recognition software! Try Chrome desktop, maybe?');
      }
      const listenContinuously = () => {
        SpeechRecognition.startListening({
          continuous: true,
          language: 'ru-RU',
        });
      };
  
     if (localStorage.getItem('voiceSystemActive') === '1') {
        listenContinuously()
     }
}