import { useState } from "react";
import ContentSectionWrap from "../Home/ContentSectionWrap";
import { useEffect } from "react";
import axios from "axios";
import { getAccessToken } from "../Utils/utils";
import { useParams } from "react-router-dom";

export default function GroupPage() {
    const { groupId } = useParams()
    const [allStudentsDisplay, setAllStudentsDisplay] = useState(false)
    const [classes, setClasses] = useState([])
    const [tasks, setTasks] = useState([])  

    useEffect(() => {
        const apiUrl = 'http://localhost:3000/api/professor/todayClasses?userId=a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
        axios.get(apiUrl,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
          const allPersons = resp.data;
          setClasses(allPersons);
          console.log(allPersons)
        });
      }, [setClasses]);

    return (
        <div className="GroupPage">
            <div className="ContentHeader">
                <div className="content-header-label">Группа 09-951 (4 курс)</div>
            </div>
            <div className="Content">
                <ul><li><span onClick={() => setAllStudentsDisplay(!allStudentsDisplay)}>Все студенты</span>  
                    <ul className="all-students-wrap" style={{'display': (allStudentsDisplay ? 'initial' : 'none')}}>
                    <li>Иванов</li>
                    <li>Иванов</li>
                    <li>Иванов</li>
                    <li>Иванов</li>
                    <li>Иванов</li>
                    </ul></li></ul>
                <ContentSectionWrap contentLabel={'Задания'} tasks={tasks}/>
                <ContentSectionWrap contentLabel={'Ближайшая пара'} classes={classes}/>
            </div>
        </div>
    )
}