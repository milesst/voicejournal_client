import { useEffect, useState } from "react";
import ContentSectionWrap from "../Home/ContentSectionWrap";
import NewTaskPopup from "../Popup/NewTaskPopup";
import axios, { all } from "axios";
import { getAccessToken, getUserId, parseFullDateFromJSON } from "../Utils/utils"
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import SaveClassPopup from "../Popup/SaveClassPopup";
import StudentList from "../Students/StudentList";
import { ToastContainer, toast } from "react-toastify";
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'
import { API, BASE_URL } from './../Utils/api';

function saveSubmission(data) {
  console.log(data)
  const apiUrl = `${API.BASE_URL}/api/professor/completedAssignment`
  // if (selectedStudent.completionId) {
  //     console.log(axios.put(apiUrl, data, {headers: { Authorization: `Bearer ${getAccessToken()}` }}))

  // }
  // else {
  console.log(axios.post(apiUrl, data, {headers: { Authorization: `Bearer ${getAccessToken()}` }}))
  // }

  toast.success('Оценка выставлена!')
}

function Timer(props) {
    return (
      <div className="timer">
      <span className="digits">
        {("0" + Math.floor((props.time / 3600000) % 60)).slice(-2)}:
      </span>
        <span className="digits">
          {("0" + Math.floor((props.time / 60000) % 60)).slice(-2)}:
        </span>
        <span className="digits">
          {("0" + Math.floor((props.time / 1000) % 60)).slice(-2)}
        </span>
      </div>
    );
  }

export default function ActiveClassPage(props) {
    
  const [startDate, setStartDate] = useState(new Date().toLocaleDateString().split('.').reverse().join('-'))
  const [time, setTime] = useState(new Date() - new Date(JSON.parse(localStorage.getItem('activeClass')).data.start_time) || 0);
  const [startTime, setStartTime] = useState(new Date().toLocaleString())
  const [assignments, setAssignments] = useState([])
  const [students, setStudents] = useState([])

  const [newTaskVisible, setNewTaskVisible] = useState(false)

  const [search, setSearch] = useSearchParams()
  const location = useLocation()
  const [classInfo, setClassInfo] = useState(location.state || JSON.parse(localStorage.getItem('activeClass')).data)

  const navigate = useNavigate();

  const [saveClassPopupShow, setSaveClassPopupShow] = useState(false)
  const [assignmentPopupShow, setAssignmentPopupShow] = useState(false)
  const [chosenAssignment, setChosenAssignment] = useState()
  const [selectedStudent, setSelectedStudent] = useState()

  const [assignmentCommand, setAssignmentCommand] = useState()
  const [studentCommand, setStudentCommand] = useState()

  const [commands, setCommands] = useState()

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening,
    } = useSpeechRecognition({ commands })

  useEffect(() => {
    setAssignmentCommand(assignments.map(item => {return {
      command: `${item.name}`,
      callback: () => {
        setChosenAssignment(item)
        setAssignmentPopupShow(true)
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.8
    }}))
  }, [assignments])

  useEffect(() => {
    const commandsGrades = students.map( item => { return {
      command: `${item.last_name} :grade *`,
      callback: (grade, comment) => {
        setSelectedStudent(item)
        saveSubmission({
          grade: grade,
          comment: comment,
          studentId: item.student_id,
          assignmentId: chosenAssignment.assignment_id,
        })
        setAssignmentPopupShow(false)
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.8
    } })
    const commandsAttendance = students.map( item => { return {
      command: [`${item.last_name} есть`, `${item.last_name} на месте`, `${item.last_name} отсутствует`, `${item.last_name} нет`],
      callback: ({command}) => {
        const isPresent = /(есть|на месте)/.test(command.split(' '))
        setStudentPresent(null, item.student_id, isPresent)
      },
      isFuzzyMatch: true,
      fuzzyMatchingThreshold: 0.8
    } })
    setStudentCommand(commandsGrades.concat(commandsAttendance))
  }, [assignments, chosenAssignment])
  


  useEffect(() => {
    SpeechRecognition.startListening({ language: 'ru-RU' })
  }, [studentCommand, assignmentCommand])
  
  //   {
  //     command: "*",
  //     callback: (command) => {
  //       let commandSplit = command.split(" ");
  //       let grade = commandSplit[commandSplit.length-1];
  //       commandSplit.pop();
  //       let student = commandSplit.join(' ').toLowerCase();

  //     let finalResult = ["NO_STUDENT", grade]

  //     for (let stud of students) {
  //       if (stud.lastName.toLowerCase() === student) 
  //         finalResult[0] = student
  //     }

  //     if (finalResult[0] === "NO_STUDENT") {
  //       for (let posStud of students) {
  //         for (let posRes of posStud.possibleResults) {
  //           if (student === posRes)
  //             finalResult[0] = posStud.lastName
  //         }

  //       }
  //     }

  //     console.log("EXECUTE COMMAND: " + finalResult[0] + " " + finalResult[1]);
  //     if (finalResult[0] != "NO_STUDENT") {
  //       let listeningMode = ''
  //       if (/отсутствует|на месте|есть|здесь/.test(command))
  //         listeningMode = 'attendance'
  //       else
  //         listeningMode = 'grade'

  //       let newStudents = students;
  //       let i = newStudents.findIndex(stud => stud.lastName.toLowerCase() === finalResult[0])
  //       if (listeningMode === "grade") {
  //         console.log("command grade: "+ finalResult[0] + " " + finalResult[1])
  //         newStudents[i].grade = finalResult[1];
  //         setStudents(students)
  //       }
  //       else if (listeningMode === "attendance") {
  //         console.log("index "+ i)
  //         if (grade === "нет" || grade === "отсутствует")
  //               newStudents[i].attendance = false
  //         if (grade === "здесь" || grade === "тут")
  //               newStudents[i].attendance = true
  //         setStudents(newStudents)
  //         console.log("command attend: " + finalResult[0] + " " + finalResult[1])
  //       }
  //         else console.log("nothing")  
  //     }
  //   },
  // },
  // ]

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_SERVER_API_URL + `/api/professor/assignmentsForClass?userId=${getUserId()}&disciplineId=${classInfo.discipline_id}&groupId=${classInfo.group_id}`;
    axios.get(apiUrl,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
      console.log(resp.data)
      const assignments = resp.data
      setAssignments(assignments)
      console.log(assignments)
    });
  }, [setAssignments]);

  useEffect(() => {
    if (!localStorage.getItem('activeClassStudents')) {
        const apiUrl = `${API.BASE_URL}/api/professor/groupStudents?groupId=${classInfo.group_id}`;
        axios.get(apiUrl,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
          const allPersons = resp.data;
          for (let i of allPersons) {
            i.absent = true
          }
          setStudents(allPersons)
          localStorage.setItem('activeClassStudents', JSON.stringify(allPersons))
          console.log(allPersons)
        });
    }
    else {
      setStudents(JSON.parse(localStorage.getItem('activeClassStudents')))
    }
  }, [setStudents]);

  function addNewTask() {
    setNewTaskVisible(true)
  }

  function closeForm() {
    setNewTaskVisible(false)
  }

  useEffect(() => {
    let interval = null;
      interval = setInterval(() => {
        setTime((time) => time + 10);
      }, 10);
  }, [])

  function saveClass(classComment) {
    const apiUrl = process.env.REACT_APP_SERVER_API_URL + `/api/professor/completedClass?scheduleId=${classInfo.schedule_id}&userId=${getUserId()}`;
    const classData = {
      scheduleId: classInfo.schedule_id,
      comment: classComment,
      date: startTime,
      endDate: new Date().toLocaleString(),
      students: students
    }
    console.log(classData)
    
    axios.post(apiUrl, classData, {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
      navigate('/', {savedClass: true})

      localStorage.removeItem('activeClass')
      localStorage.removeItem('activeClassStudents')
    })
  }

  function openSavePopup() {
    setSaveClassPopupShow(true)
  }

  function closeSavePopup() {
    setSaveClassPopupShow(false)
  }

  function setStudentPresent(e, key) {
    let newStudents = students
    for (let i = 0; i < newStudents.length; i++) {
      if (newStudents[i].student_id === key)
      newStudents[i].absent = !students[i].absent
    }
    setStudents(newStudents)
    localStorage.setItem('activeClassStudents', JSON.stringify(newStudents))
    console.log(newStudents)
  }

    return (
        <div className="ActiveClassPage">
          <dialog style={{display: (assignmentPopupShow ? 'initial' : 'none')}} class="submitted-assignment-popup">
                <form method="dialog" onSubmit={saveSubmission}>
                    <p>Выставить оценку: {selectedStudent?.lastName} {selectedStudent?.firstName} {selectedStudent?.patronymic} за задание "{chosenAssignment?.name}"</p>
                    <input type="date" value={ parseFullDateFromJSON(selectedStudent?.completionDate) || startDate}/>
                    <input type="number" value={selectedStudent?.grade} placeholder={'Оценка'} />
                    <textarea defaultValue={selectedStudent?.comment !== 'undefined' ? selectedStudent?.comment : ''} placeholder="Комментарий" name="" id="" cols="30" rows="10"></textarea>
                    <div className="btn-wrap new-task-button-wrap">
                        <button type="submit">Сохранить</button>
                        <button type='button'>Отмена</button>
                    </div>
                </form>
          </dialog>
          <ToastContainer autoClose={1000} />
          <span className="popup-wrap" style={{'display': (saveClassPopupShow ? 'initial' : 'none')}}><SaveClassPopup buttonAction={saveClass} closeForm={closeSavePopup}></SaveClassPopup></span>
            <span className="popup-wrap" style={{'display': (newTaskVisible ? 'initial' : 'none')}}><NewTaskPopup closeForm={closeForm}/></span>
            <div className="class-info-wrap">
                <div className="class-duration"><Timer time={time}></Timer></div>
                <div className="class-info-detail-wrap">
                      <div className="class-name-wrap">
                          <div className="class-name-label">текущая пара</div>
                          <div className="class-name">{classInfo ? classInfo.name : ''}</div>
                      </div>
                      <div className="class-date-place-wrap">
                        <div className="class-date">{classInfo ? parseFullDateFromJSON(classInfo.start_time) : ''}</div>
                        <div className="class-groups">группа {classInfo ? classInfo.group_number : ''}</div>
                      </div>
                </div>
                
            </div>
            <div className="active-class-actions">
                <div className="group-info-wrap">
                    <ContentSectionWrap contentLabel={'Задания'} tasks={assignments} buttonAction={() => addNewTask()}/>
                    <StudentList students={students} activeClass={true} setStudentPresent={setStudentPresent}/>
                </div>
                <div className="active-class-btns btn-wrap">
                      <button className="active-class-save" onClick={() => openSavePopup()}>Завершить</button>
                </div>
            </div>
            
        </div>
    )
}