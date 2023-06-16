import axios from "axios"
import { useEffect, useState } from "react"
import { getAccessToken, getUserId } from "../Utils/utils"
import { NavLink, useNavigate } from "react-router-dom"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { API } from "../Utils/api"
import Select from "react-select";

export default function DocGenPage() {
    const [docType, setDocType] = useState('ved')
    const [discipline, setDiscipline] = useState('')
    const [group, setGroup] = useState('')
    const [semester, setSemester] = useState('0')

    const navigate = useNavigate();

    const [disciplines, setDisciplines] = useState([])

    useEffect(() => {
        const apiUrl = `${BASE_URL}/api/professor/disciplinesAndGroups?userId=${getUserId()}`;
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
        setDocType(e.value)
        console.log(e.value)
    }

    function handleChangeDiscipline(e) {
        setDiscipline(disciplines.find(item => item.discipline_id === e.value))
        console.log(e)
    }

    function handleChangeGroup(e) {
        setGroup(e.value)
        console.log(e.value)
    }

    function handleChangeSemester(e) {
        setSemester(e.value)
    }

    function getDocument(e) {
        e.preventDefault()
        const apiUrl = API.DOC_GENERATE
        const docData = {
            docType,
            id: discipline.discipline_id,
            name: discipline.discipline,
            group,
            semester,
            userId: getUserId(),
        }
        console.log(docData)

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
                    <Select placeholder='Тип документа' required name="doc-type" onChange={handleChangeDocType} options={[{value: 'ved', label: 'Ведомость'}]} />
                </div>
                <div className="step-wrap">
                    <Select required className="react-select-container" name="disciplines" onChange={handleChangeDiscipline} placeholder='Дисциплина' options={disciplines.map(discipline => {return {"value": discipline.discipline_id, 'label': discipline.discipline }})}/>
                </div>
                <div className="step-wrap">
                    <Select required className="react-select-container" name="groups" onChange={handleChangeGroup} placeholder='Группа' options={disciplines && discipline ? disciplines.find(selected => selected.discipline_id === discipline.discipline_id)
                            .groups
                            .map(group => {return {'value': group.group_id, 'label': group.group_number}}) : ''}/>
                </div>
                <div className="step-wrap">
                    <Select required placeholder='Период' onChange={handleChangeSemester} options={[{value: '0', label: 'Текущий семестр'}]}/>
                </div>
                <button type="submit" className="doc-submit-btn">Создать</button>
            </form> 
        </div>
    )
}