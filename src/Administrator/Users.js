import axios from 'axios';
import { useEffect, useRef, useState } from 'react'
import { AiFillEdit, AiFillPlusCircle } from 'react-icons/ai'
import { getAccessToken } from '../Utils/utils';
import { ToolBar } from './ToolBar';
import { API } from '../Utils/api';

export function Users() {
    const [users, setUsers] = useState([])
    const userForm = useRef(null)
    const [selectedUser, setSelectedUser] = useState({})

    const [newUserData, setNewUserData] = useState({})
    const [searchData, setSearchData] = useState('')
    
    useEffect(() => {
        const apiUrl = `${API.BASE_URL}/api/admin/users`;
        axios.get(apiUrl,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
          const data = resp.data;
          setUsers(data);
          console.log(data)
        });
      }, [setUsers])


    function deleteUser() {
        const apiUrl = `${API.BASE_URL}/api/admin/deleteUser?userId=${selectedUser.user_id}`;
        axios.delete(apiUrl,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
            const data = resp.data;
            console.log(data)
          })
    }  

    function updateUser() {
        const apiUrl = `${API.BASE_URL}/api/admin/updateUser`;
        axios.put(apiUrl, newUserData,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
            const data = resp.data;
            console.log(data)
          })
        console.log('new')
        console.log(newUserData)
    }

    function openUserForm(user) {
        console.log('new3')
        console.log(user)
        setSelectedUser(user)
        setNewUserData(Object.assign({}, user))
        console.log('new2')
        console.log(newUserData)
        userForm.current.showModal()
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
        <div className="Users">
            <dialog ref={userForm}>
                <form method='dialog'>
                    <input placeholder='Логин' id="login" type="text" className="login" defaultValue={selectedUser.login} onChange={handleChange}/>
                    <div className="form-user-name">
                        <input placeholder='Фамилия' id="last_name" key="last_name" type="text" defaultValue={selectedUser.last_name} onChange={handleChange}/>
                        <input placeholder='Имя' id="first_name" type="text" defaultValue={selectedUser.first_name} onChange={handleChange}/>
                        <input placeholder='Отчество' id="patronymic" type="text" defaultValue={selectedUser.patronymic} onChange={handleChange}/>
                    </div>
                    <select id="role" name="" defaultValue={selectedUser.role} onChange={handleChange}>
                        <option value="professor">Преподаватель</option>
                        <option value="admin">Администратор</option>
                    </select>
                    <button type="submit" onClick={updateUser}>Сохранить</button>
                    {selectedUser.user_id ? <button onClick={deleteUser}>Удалить пользователя</button> : '' }
                    <button onClick={() => userForm.current.close()}>Закрыть</button>
                </form>
            </dialog>
            <ToolBar handleSearch={handleSearch} openForm={() => openUserForm({})} />
            <div className="content">
                {users.filter(user => Object.values(user).toString().toLowerCase().includes(searchData)).map(user => <div className="user-list-item" key={user.user_id} id={user.user_id} onClick={() => openUserForm(user)}>
                    <div className="user-name">{user.last_name} {user.first_name} {user.patronymic}</div>
                    <div className="user-login">{user.login}</div>
                </div>)}
            </div>
        </div>
    )
}