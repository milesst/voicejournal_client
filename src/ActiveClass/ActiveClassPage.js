import { useEffect, useState } from "react";
import ContentSectionWrap from "../Home/ContentSectionWrap";
import NewTaskPopup from "../Popup/NewTaskPopup";
import axios from "axios";
import { getAccessToken, parseFullDateFromJSON } from "../Utils/utils"
import { useLocation, useParams, useSearchParams } from "react-router-dom";

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

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_SERVER_API_URL + `/api/professor/assignmentsForClass?scheduleId=${classInfo.schedule_id}&userId=a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11`;
    axios.get(apiUrl,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
      const assignments = resp.data
      setAssignments(assignments)
    });
  }, [setAssignments]);

  useEffect(() => {
    const apiUrl = `http://localhost:3000/api/professor/groupStudents?groupId=${classInfo.group_id}`;
    axios.get(apiUrl,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
      const allPersons = resp.data;
      setStudents(allPersons);
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

  function saveClass() {
    const apiUrl = process.env.REACT_APP_SERVER_API_URL + `/api/professor/saveClass?scheduleId=${classInfo.schedule_id}&userId=a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11`;
    axios.post(apiUrl,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
      const assignments = resp.data
      setAssignments(assignments)
    });
  }

    return (
        <div className="ActiveClassPage">
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
                    <div className="active-class-group-list-wrap">
                        <div className="group-list-label">Студенты</div>
                        <div className="group-list">
                            {students ? students.map(item => <div className='student-list-item'><div className="student-name">{item.last_name} {item.first_name}</div></div>) : ''}
                        </div>
                    </div>
                </div>
                <div className="active-class-btns">
                      <button className="active-class-save" onClick={saveClass}>Завершить</button>
                </div>
            </div>
            
        </div>
    )
}