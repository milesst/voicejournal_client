import { useState, useEffect } from "react";
import DisciplineItem from "./DisciplineItem";
import axios from "axios";

export default function DisciplinesPage() {
    const [disciplines, setDisciplines] = useState([])

    useEffect(() => {
        const apiUrl = 'http://localhost:3000/api/professor/disciplinesAndGroups?userId=a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
        axios.get(apiUrl, {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}).then((resp) => {
          const allPersons = resp.data;
          setDisciplines(allPersons);
        });
      }, [setDisciplines]);

    return (
        <div className="DisciplinesPage">
            <div className="ContentHeader">
                <div className="content-header-label">Дисциплины</div>
            </div>
            <div className="Content">
                {disciplines.map(item => <DisciplineItem groups={item.groups} discipline={item.discipline} startDate={item.disciplineStart} endDate={item.disciplineEnd} />)}
            </div>
        </div>
    )
}