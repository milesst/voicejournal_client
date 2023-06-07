import axios from "axios"
import { useEffect, useState } from "react"
import { getAccessToken, getUserId } from "../Utils/utils"
import { NavLink, useNavigate } from "react-router-dom"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { API } from "../Utils/api"

export default function DocGenPage() {
    const [docType, setDocType] = useState('ved')
    const [discipline, setDiscipline] = useState('')
    const [group, setGroup] = useState('')
    const [semester, setSemester] = useState('0')

    const navigate = useNavigate();

    const [disciplines, setDisciplines] = useState([])

    useEffect(() => {
        const apiUrl = `http://localhost:3000/api/professor/disciplinesAndGroups?userId=${getUserId()}`;
        console.log(apiUrl)
        axios.get(apiUrl, {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
          const allPersons = resp.data;
          setDisciplines(allPersons);
          console.log(resp.data)
          setDiscipline(resp.data[0])
          console.log(resp.data[0])
          setGroup(resp.data[0].groups[0])
        });
      }, [setDisciplines, setGroup]);

    function handleChangeDocType(e) {
        setDocType(e.target.value)
        console.log('fewf')
    }

    function handleChangeDiscipline(e) {
        setDiscipline(e.target.value)
        console.log(e.target.value)
    }

    function handleChangeGroup(e) {
        setGroup(e.target.value)
        console.log(e.target.value)
    }

    function handleChangeSemester(e) {
        setSemester(e.target.value)
    }

    function getDocument(e) {
        e.preventDefault()
        console.log('few')
        const apiUrl = API.DOC_GENERATE
        const docData = {
            docType,
            id: discipline.discipline_id,
            name: discipline.discipline,
            group,
            semester,
            userId: getUserId(),
        }

        axios.post(apiUrl, docData, {headers: { Authorization: `Bearer ${getAccessToken()}` },  responseType: 'blob'})
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Ведомость.docx');
            document.body.appendChild(link);
            link.click();

            navigate('/documents')
          });
    }

    return (
        <div className="DocGenPage page-wrap">
            <div className="header-wrap">
                <div className="back-btn-wrap"><NavLink to="/documents"><AiOutlineArrowLeft /></NavLink></div>
                <div className="header-label">Создать новый документ</div>
            </div>
            <form className="content-form" onSubmit={getDocument}>
                <div className="step-wrap">
                    <label htmlFor="">Тип документа</label>
                    <select name="doc-type" id="" defaultValue={'ved'} onInput={handleChangeDocType} onChange={handleChangeDocType}>
                        <option value="ved">Ведомость</option>
                    </select>
                </div>
                <div className="step-wrap">
                    <label htmlFor="">Дисциплина</label>
                    <select required name="disciplines" id="" onChange={handleChangeDiscipline}>
                            {disciplines.map(discipline => <option value={{discipline_id: discipline.discipline_id, discipline: discipline.discipline}} key={discipline.discipline_id}>{discipline.discipline}</option>)}
                    </select>
                </div>
                <div className="step-wrap">
                    <label htmlFor="">Группа</label>
                    <select required name="groups" id="" onChange={handleChangeGroup}>
                        {disciplines && discipline ? disciplines.find(selected => selected.discipline_id === discipline.discipline_id)
                            .groups
                            .map(group => <option value={group.group_id}>{group.group_number}</option>) : ''}
                    </select>
                </div>
                <div className="step-wrap">
                    <label htmlFor="">Семестр</label>
                    <select name="semester" id="" onChange={handleChangeSemester}>
                        <option value="0">Текущий семестр</option>
                    </select>
                </div>
                <button type="submit" className="doc-submit-btn">Создать</button>
            </form> 
        </div>
    )
}