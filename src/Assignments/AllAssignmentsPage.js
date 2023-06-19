import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { BASE_URL } from "../Utils/api";
import AssignmentItem from "./AssignmentItem";
import TailSpin from "react-loading-icons/dist/esm/components/tail-spin";
import { getUserId } from "../Utils/utils";

export default function AllAssignmentsPage() {
    const { disciplineId } = useParams()
    const location = useLocation()
    const [assignments, setAssignments] = useState()

    useEffect(() => {
      axios.get(BASE_URL + `/api/professor/assignmentsForDiscipline?disciplineId=${disciplineId}&userId=${getUserId()}`)
        .then(response => {
            const data = response.data
            console.log(data)
            console.log(disciplineId)
            setAssignments(data)
        })
    }, [setAssignments])
    

    return (
        <div className="AllAssignmentsPage">
             <div className="ContentHeader">
                <div className="content-header-label">Задания по дисциплине {location.state.name}</div>
            </div>
            <div className="Content">
                {
                assignments && assignments.length === 0 ? 'По данной дисциплине не было выставлено заданий' :
                assignments ? assignments.sort(
                    (a, b) => {
                     const dateA = new Date(a.deadline)
                     const dateB = new Date(b.deadline)
                     const today = new Date()
                     if (dateA < today && dateA < dateB) return 1
                     else if (dateA > today && dateA > dateB) return -1
                     return 0
                    }
                ).map(item => <AssignmentItem assignment={item} />) : 
                <TailSpin stroke='orange' speed={.75} />}
            </div>
        </div>
    )
}