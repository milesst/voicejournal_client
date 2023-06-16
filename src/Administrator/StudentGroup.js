import { useParams } from "react-router-dom";
import { ToolBar } from "./ToolBar";
import { getAccessToken } from './../Utils/utils';
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { API } from "../Utils/api";
import { BASE_URL } from './../Utils/api';

export default function StudentGroup() {
    let {groupId} = useParams()
    const [students, setStudents] = useState([])
    const studentForm = useRef(null)
    const [selectedStudent, setSelectedStudent] = useState({})

    const [newUserData, setNewUserData] = useState({})

    const [searchData, setSearchData] = useState('')
    
    useEffect(() => {
        const apiUrl = `${BASE_URL}/api/admin/students?groupId=${groupId}`;
        axios.get(apiUrl,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
          const data = resp.data;
          setStudents(data);
          console.log(data)
        });
      }, [setStudents])


    function deleteStudent() {
        const apiUrl = `${BASE_URL}/api/admin/deleteStudent?userId=${selectedStudent.student_id}`;
        axios.delete(apiUrl,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
            const data = resp.data;
            console.log(data)
          })
    }  

    function updateStudent() {
        const apiUrl = `${BASE_URL}/api/admin/updateStudent`;
        axios.put(apiUrl, newUserData,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
            const data = resp.data;
            console.log(data)
          })
        console.log('new')
        console.log(newUserData)
    }

    function openStudentForm(student) {
        setSelectedStudent(student)
        setNewUserData(Object.assign({}, student))
        studentForm.current.showModal()
    }  

    function handleChange(e) {
        let newData = Object.assign({}, newUserData)
        newData[e.target.id] = e.target.value
        setNewUserData(newData)
        console.log('handle')
        console.log(newData)
    }

    function handleSearch(e) {
        setSearchData(e.target.value)
    }

    return (
        <div className="StudentGroup">
            <dialog ref={studentForm}>
                <form method='dialog'>
                    <div className="form-student-name">
                        <input placeholder="Фамилия" id="last_name" key="last_name" type="text" defaultValue={selectedStudent.last_name} onChange={handleChange}/>
                        <input placeholder="Имя" id="first_name" type="text" defaultValue={selectedStudent.first_name} onChange={handleChange}/>
                        <input placeholder="Отчество" id="patronymic" type="text" defaultValue={selectedStudent.patronymic} onChange={handleChange}/>
                    </div>
                   <input placeholder="Группа" type="text" defaultValue={selectedStudent.group_number} />
                    <button type="submit" onClick={updateStudent}>Сохранить</button>
                    {selectedStudent.student_id ? <button onClick={deleteStudent}>Удалить студента</button> : ''}
                    <button onClick={() => studentForm.current.close()}>Закрыть</button>
                </form>
            </dialog>
            <ToolBar handleSearch={handleSearch} openForm={() => openStudentForm({})}/>
            <div className="content">
                {students.length > 0 ? students.filter(student => Object.values(student).toString().toLowerCase().includes(searchData)).map(student => <div className="list-item" key={student.student_id} id={student.student_id} onClick={() => openStudentForm(student)}>
                    <div className="student-name">{student.last_name} {student.first_name} {student.patronymic}</div>
                </div>) : 'В этой группе нет студентов'}
            </div>
        </div>
    )
}