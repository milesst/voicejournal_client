import axios from "axios";
import ContentSectionWrap from "./ContentSectionWrap";
import { useEffect, useState } from "react";
import { getAccessToken } from "../Utils/utils";
import NewTaskPopup from "../Popup/NewTaskPopup";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getUserId } from "../Utils/utils";
import { API, BASE_URL } from "../Utils/api";

export default function HomePage() {
    const [classes, setClasses] = useState([])
    const [tasks, setTasks] = useState([])  
    const [newTaskVisible, setNewTaskVisible] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    if (location.savedClass) {
      toast.success('Пара завершена')
    }

    function addNewTask() {
      setNewTaskVisible(true)
    }

    function startClass(scheduleId) {
      const apiUrl = process.env.REACT_APP_SERVER_API_URL + `/api/professor/currentClass?userId=${getUserId()}`;
      axios.get(apiUrl,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
          const data = resp.data[0]
          if (data) {                      
            localStorage.setItem('activeClass', JSON.stringify({
              data
            }))
            navigate(`activeClass`, { state: data })
          } 
      }).catch((e) => alert('error'))
    }
    
    function closeForm(e) {
      setNewTaskVisible(false)

      const apiUrl = `${BASE_URL}/api/professor/deadlineAssignments?userId=${getUserId()}`;
        axios.get(apiUrl,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
          const allPersons = resp.data;
          setTasks(allPersons);
          console.log(allPersons)
        });
      
      if (e.target.type === 'submit') 
          toast.success('Задание создано!')  
    }

    useEffect(() => {
        const apiUrl = `${BASE_URL}/api/professor/todayClasses?userId=${getUserId()}`;
        axios.get(apiUrl,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
          const allPersons = resp.data;
          setClasses(allPersons);
          console.log(allPersons)
        });
      }, [])

    useEffect(() => {
        const apiUrl = `${BASE_URL}/api/professor/deadlineAssignments?userId=${getUserId()}`;
        axios.get(apiUrl,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
          const allPersons = resp.data;
          setTasks(allPersons);
          console.log(allPersons)
        });
      }, [setTasks, newTaskVisible, setNewTaskVisible])

    return (
        <div className="HomePage">
        <ToastContainer autoClose={1000}/>
        <span className="popup-wrap" style={{'display': (newTaskVisible ? 'initial' : 'none')}}><NewTaskPopup closeForm={closeForm}/></span>
        <div className="content-section-wrap">
        {localStorage.getItem('activeClass') ? <NavLink to="/activeClass"><button className="home-active-class-btn">Активная пара {'>'}</button></NavLink> : ''}
        <ContentSectionWrap contentLabel="Ближайшие пары" classes={classes} buttonAction={startClass}/>
        <ContentSectionWrap contentLabel="Задания" tasks={tasks} buttonAction={addNewTask}/>
        <NavLink to="/documents"><ContentSectionWrap contentLabel="Документы и отчеты" buttonAction={() => navigate(`newDocument`)}/></NavLink>
        </div>
        </div>
    )
}