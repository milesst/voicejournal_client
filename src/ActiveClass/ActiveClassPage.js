import { useEffect, useState } from "react";
import ContentSectionWrap from "../Home/ContentSectionWrap";
import NewTaskPopup from "../Popup/NewTaskPopup";
import axios from "axios";
import { getAccessToken, getUserId, parseFullDateFromJSON } from "../Utils/utils"
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import SaveClassPopup from "../Popup/SaveClassPopup";
import StudentList from "../Students/StudentList";

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
    
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(new Date().toLocaleString())
  const [assignments, setAssignments] = useState([])
  const [students, setStudents] = useState([])

  const [newTaskVisible, setNewTaskVisible] = useState(false)

  const [search, setSearch] = useSearchParams()
  const location = useLocation()
  const [classInfo, setClassInfo] = useState(location.state)
  const navigate = useNavigate();

  const [saveClassPopupShow, setSaveClassPopupShow] = useState(false)

  const commands = [
    {
      command: "*",
      callback: (command) => {
        let commandSplit = command.split(" ");
        let grade = commandSplit[commandSplit.length-1];
        commandSplit.pop();
        let student = commandSplit.join(' ').toLowerCase();

      let finalResult = ["NO_STUDENT", grade]

      for (let stud of students) {
        if (stud.lastName.toLowerCase() === student) 
          finalResult[0] = student
      }

      if (finalResult[0] === "NO_STUDENT") {
        for (let posStud of students) {
          for (let posRes of posStud.possibleResults) {
            if (student === posRes)
              finalResult[0] = posStud.lastName
          }

        }
      }

      console.log("EXECUTE COMMAND: " + finalResult[0] + " " + finalResult[1]);
      if (finalResult[0] != "NO_STUDENT") {
        let listeningMode = ''
        if (/отсутствует|на месте|есть|здесь/.test(command))
          listeningMode = 'attendance'
        else
          listeningMode = 'grade'

        let newStudents = students;
        let i = newStudents.findIndex(stud => stud.lastName.toLowerCase() === finalResult[0])
        if (listeningMode === "grade") {
          console.log("command grade: "+ finalResult[0] + " " + finalResult[1])
          newStudents[i].grade = finalResult[1];
          setStudents(students)
        }
        else if (listeningMode === "attendance") {
          console.log("index "+ i)
          if (grade === "нет" || grade === "отсутствует")
                newStudents[i].attendance = false
          if (grade === "здесь" || grade === "тут")
                newStudents[i].attendance = true
          setStudents(newStudents)
          console.log("command attend: " + finalResult[0] + " " + finalResult[1])
        }
          else console.log("nothing")  
      }
    },
  },
  ]

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_SERVER_API_URL + `/api/professor/assignmentsForClass?scheduleId=${classInfo.schedule_id}&userId=${getUserId()}`;
    axios.get(apiUrl,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
      const assignments = resp.data
      setAssignments(assignments.assignments)
      console.log(assignments)
    });
  }, [setAssignments]);

  useEffect(() => {
    const apiUrl = `http://localhost:3000/api/professor/groupStudents?groupId=${classInfo.group_id}`;
    axios.get(apiUrl,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
      const allPersons = resp.data;
      for (let i of allPersons) {
        i.absent = true
      }
      setStudents(allPersons)
      console.log(allPersons)
    });
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
      navigate('/')
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
    console.log(newStudents)
  }

    return (
        <div className="ActiveClassPage">
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