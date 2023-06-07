import { useState, useEffect } from "react";
import DisciplineItem from "./DisciplineItem";
import axios from "axios";
import { getAccessToken, getUserId } from "../Utils/utils";

export default function DisciplinesPage() {
    const [disciplines, setDisciplines] = useState([])

    useEffect(() => {
        const apiUrl = `http://localhost:3000/api/professor/disciplineInfo?userId=${getUserId()}`;
        axios.get(apiUrl, {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
          const allPersons = resp.data;
          console.log(allPersons)
          setDisciplines(allPersons);
        });
      }, [setDisciplines]);

    return (
        <div className="DisciplinesPage">
            <div className="ContentHeader">
                <div className="content-header-label">Дисциплины</div>
            </div>
            <div className="Content">
                {disciplines.map(item => <DisciplineItem disciplineId={item.discipline_id} assignments={item.assignments} groups={item.groups} discipline={item.discipline} startDate={item.disciplineStart} endDate={item.disciplineEnd} />)}
            </div>
        </div>
    )
}