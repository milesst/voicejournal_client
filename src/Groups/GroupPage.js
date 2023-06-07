import { useState } from "react";
import ContentSectionWrap from "../Home/ContentSectionWrap";
import { useEffect } from "react";
import axios from "axios";
import { getAccessToken, getUserId } from "../Utils/utils";
import { useParams } from "react-router-dom";
import NewTaskPopup from "../Popup/NewTaskPopup";
import { AiOutlineDown, AiOutlineLine } from "react-icons/ai";

export default function GroupPage() {
    const { groupId } = useParams()
    const [allStudentsDisplay, setAllStudentsDisplay] = useState(false)
    const [classes, setClasses] = useState([])
    const [tasks, setTasks] = useState([])  
    const [students, setStudents] = useState([])

    const [newTaskVisible, setNewTaskVisible] = useState(false)

    function addNewTask() {
      setNewTaskVisible(true)
    }
  
    function closeForm() {
      setNewTaskVisible(false)
    }

    useEffect(() => {
        const apiUrl = `http://localhost:3000/api/professor/todayClasses?userId=${getUserId()}`;
        axios.get(apiUrl,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
          const allPersons = resp.data;
          setClasses(allPersons);
          console.log(allPersons)
        });
      }, [setClasses]);

      useEffect(() => {
        const apiUrl = `http://localhost:3000/api/professor/groupStudents?groupId=${groupId}`;
        axios.get(apiUrl,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
          const allPersons = resp.data;
          setStudents(allPersons);
          console.log(allPersons)
        });
      }, [setStudents]);

      // useEffect(() => {
      //   const apiUrl = `http://localhost:3000/api/professor/assignmentsForGroup?groupId=${groupId}&userId=${getUserId()}`;
      //   console.log(apiUrl)
      //   axios.get(apiUrl,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
      //     const allPersons = resp.data;
      //     setTasks(allPersons);
      //     console.log(allPersons)
      //   });
      // }, [setTasks]);

    return (
        <div className="GroupPage">
        <span className="popup-wrap" style={{'display': (newTaskVisible ? 'initial' : 'none')}}><NewTaskPopup groupid={groupId} closeForm={closeForm}/></span>
            <div className="ContentHeader">
                <div className="content-header-label">Группа {students[0]  ? students[0].group_number : ''} ({students[0] ? new Date().getFullYear() - students[0].admission_year : ''} курс)</div>
            </div>
            <div className="Content">
                <ul className="student-list-wrap">
                  <li>
                    <div className="all-students-header" onClick={() => setAllStudentsDisplay(!allStudentsDisplay)}>
                        <span className="" >Все студенты</span>
                        {!allStudentsDisplay ? <AiOutlineDown size={15} /> : <AiOutlineLine size={15} />}
                    </div>
                    <ul className={"all-students-wrap " + (allStudentsDisplay ? "show" : 'hidden')}
                    //  style={{'display': (allStudentsDisplay ? 'inherit' : 'none')}}
                     >
                        {students.map(item => <li>{item.last_name} {item.first_name} {item.patronymic}</li>)}
                    </ul>
                  </li>
                  </ul>
                <ContentSectionWrap contentLabel={'Задания'} tasks={tasks} buttonAction={addNewTask}/>
                <ContentSectionWrap contentLabel={'Ближайшая пара'} classes={classes}/>
            </div>
        </div>
    )
}