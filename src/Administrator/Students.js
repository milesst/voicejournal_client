import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import { AiFillEdit, AiFillPlusCircle, AiOutlineUnorderedList } from 'react-icons/ai'
import { getAccessToken } from '../Utils/utils';
import { ToolBar } from './ToolBar';
import { NavLink } from 'react-router-dom';

export default function Students() {
    const [groups, setGroups] = useState([])
    const groupForm = useRef(null)
    const [selectedGroup, setSelectedGroup] = useState({})

    const [newUserData, setNewUserData] = useState({})
    const [searchData, setSearchData] = useState('')
    
    useEffect(() => {
        const apiUrl = `http://localhost:3000/api/admin/student_groups`;
        axios.get(apiUrl,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
          const data = resp.data;
          setGroups(data);
          console.log(data)
        });
      }, [setGroups])


    function deleteGroup() {
        const apiUrl = `http://localhost:3000/api/admin/deleteStudentGroup?groupId=${selectedGroup.group_id}`;
        axios.delete(apiUrl,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
            const data = resp.data;
            console.log(data)
          })
    }  

    function updateGroup() {
        const apiUrl = `http://localhost:3000/api/admin/updateStudentGroup`;
        axios.put(apiUrl, newUserData,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
            const data = resp.data;
            console.log(data)
          })
        
        const newGroups = groups.slice()
        newGroups.  
        console.log('new')
        console.log(newUserData)
    }

    function openGroupForm(group) {
        setSelectedGroup(group)
        setNewUserData(Object.assign({}, group))
        groupForm.current.showModal()
    }  

    function handleChange(e) {
        let newData = Object.assign({}, newUserData)
        newData[e.target.id] = e.target.value
        setNewUserData(newData)
    }

    function handleSearch(e) {
        setSearchData(e.target.value)
    }

    return (
        <div className="Students">
            <dialog ref={groupForm}>
                <form method='dialog'>
                    <input placeholder='Номер группы' required id="group_number" type="text" className="group_number" defaultValue={selectedGroup.group_number} onChange={handleChange}/>
                    <input placeholder='Год поступления' required id="admission_year" type="number" defaultValue={selectedGroup.admission_year} className="admission_year" onChange={handleChange}/>
                    <button type="submit" onClick={updateGroup}>Сохранить</button>
                    {selectedGroup.group_id ? <button onClick={deleteGroup}>Удалить группу</button> : '' }
                    <button onClick={() => groupForm.current.close()}>Закрыть</button>
                </form>
            </dialog>
            <ToolBar openForm={() => openGroupForm({})} handleSearch={handleSearch}/>
            <div className="content">
                {groups ? groups.filter(group => Object.values(group).toString().toLowerCase().includes(searchData)).map(group => <div className="list-item" key={group.group_id} id={group.group_id} >
                    <div className="group-number" onClick={() => openGroupForm(group)}>{group.group_number}</div>
                    <div className="group-admission-year">{group.admission_year}</div>
                    <NavLink className="group-students-link" to={`list/${group.group_id}`}><AiOutlineUnorderedList /></NavLink>
                </div>) : 'Нет групп'}
            </div>
        </div>
    )
}