import { useEffect, useState } from "react";
import axios from "axios";
import { getAccessToken } from "../Utils/utils";
import Select from "react-select";

export default function NewTaskPopup(props) {
    const [disciplines, setDisciplines] = useState()
    const [selectedDiscipline, setSelectedDiscipline] = useState()

    const [discipline, setDiscipline] = useState()
    const [group, setGroup] = useState()
    const [name, setName] = useState()
    const [description, setDescription] = useState()
    const [startDate, setStartDate] = useState()
    const [deadline, setDeadline] = useState()
    const [responseBody, setResponseBody] = useState()


    const inputChangeHandler = (event) => {
        event.preventDefault()
        console.log({
            data: {
                disciplineId: discipline,
                groupId: group,
                name: name,
                description: description,
                startDate: startDate,
                deadline: deadline
            }
        }
        )
        const response = axios.post(process.env.REACT_APP_SERVER_API_URL + '/api/professor/newAssignment', 
        {
                disciplineId: discipline,
                groupId: group,
                name: name,
                description: description,
                startDate: startDate,
                deadline: deadline
            },
        {
            headers: 
            { Authorization: `Bearer ${getAccessToken()}`}
        })
        console.log(response)
    }

    function handleChangeDiscipline(selectedValue) {
        setSelectedDiscipline(selectedValue)
        console.log(selectedValue)
        setDiscipline(JSON.parse(selectedValue['value'])['discipline_id'])
    }
    function handleChangeGroup(selectedValue) {
        setGroup(selectedValue.value)
    }
    function handleChangeName(e) {
        setName(e.target.value)
    }
    function handleChangeDesc(e) {
        setDescription(e.target.value)
    }
    function handleChangeStartDate(e) {
        setStartDate(e.target.value)
    }
    function handleChangeDeadline(e) {
        setDeadline(e.target.value)
    }

    useEffect(() => {
        const apiUrl = 'http://localhost:3000/api/professor/disciplinesAndGroups?userId=a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
        axios.get(apiUrl, {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
          const allPersons = resp.data;
    
          setDisciplines(allPersons);
        });
      }, [setDisciplines]);

    return (
        <div className="NewTaskPopup">
            <div className="new-task-wrap">
                <h3>Новое задание</h3>
                <form className="new-task-form" onSubmit={inputChangeHandler}>
                    <Select className="react-select-container" onChange={handleChangeDiscipline} options={disciplines ? disciplines.map(item => {return {'label': item.discipline, 'value': JSON.stringify(item)} }) : []} />
                    <Select className="react-select-container" onChange={handleChangeGroup} options={selectedDiscipline ? JSON.parse(selectedDiscipline['value'])['groups'].map(item => {return {'label': item.group_number, 'value': item.group_id} }) : []} />
                    <input name='name' onChange={handleChangeName} type="text" placeholder="Название" required />
                    <textarea name='description' onChange={handleChangeDesc} type="text" placeholder="Описание"/>
                    <input type="date" onChange={handleChangeStartDate} />
                    <input type="date" onChange={handleChangeDeadline}/>
                    <div className="new-task-button-wrap">
                    <button type='submit' onClick={props.closeForm}>Сохранить</button><button type='button' onClick={props.closeForm}>Отмена</button></div>
                </form>
            </div>
        </div>
    )
}