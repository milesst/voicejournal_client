import axios from "axios";
import ContentSectionWrap from "./ContentSectionWrap";
import { useEffect, useState } from "react";
import { getAccessToken } from "../Utils/utils";
import NewTaskPopup from "../Popup/NewTaskPopup";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
    const [classes, setClasses] = useState([])
    const [tasks, setTasks] = useState([])  
    const [newTaskVisible, setNewTaskVisible] = useState(false)
    const navigate = useNavigate()

    function addNewTask() {
      setNewTaskVisible(true)
    }

    function startClass(scheduleId) {
      const apiUrl = process.env.REACT_APP_SERVER_API_URL + `/api/professor/currentClass?userId=a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11`;
      axios.get(apiUrl,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
          const data = resp.data[0]
          console.log(data)
          // navigate(`activeClass?scheduleId=${scheduleId}`)
          if (data) 
            navigate(`activeClass`, { state: data }) 
      }).catch((e) => alert('connection error'))
    }
    
    function closeForm() {
      setNewTaskVisible(false)
    }

    useEffect(() => {
        const apiUrl = 'http://localhost:3000/api/professor/todayClasses?userId=a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
        axios.get(apiUrl,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
          const allPersons = resp.data;
          setClasses(allPersons);
          console.log(allPersons)
        });
      }, [setClasses])

    useEffect(() => {
        const apiUrl = 'http://localhost:3000/api/professor/deadlineAssignments?userId=a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
        axios.get(apiUrl,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
          const allPersons = resp.data;
          setTasks(allPersons);
          console.log(allPersons)
        });
      }, [setTasks])

    return (
        <div className="HomePage">
        <span className="popup-wrap" style={{'display': (newTaskVisible ? 'initial' : 'none')}}><NewTaskPopup closeForm={closeForm}/></span>
        <div className="content-section-wrap">
        <ContentSectionWrap contentLabel="Ближайшие пары" classes={classes} buttonAction={startClass}/>
        <ContentSectionWrap contentLabel="Задания" tasks={tasks} buttonAction={addNewTask}/>
        <ContentSectionWrap contentLabel="Документы и отчеты" /></div>
        
        </div>
    )
}