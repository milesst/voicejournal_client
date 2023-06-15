import { useEffect, useState } from "react"
import ClassHistoryItem from "./ClassHistoryItem"
import axios from "axios";
import { getAccessToken } from "../Utils/utils";
import { useLocation, useSearchParams } from "react-router-dom";
import { getUserId } from "../Utils/utils";
import { API } from "../Utils/api";

export default function ClassHistoryPage() {
    const [classes, setClasses] = useState()
    const [searchParams] = useSearchParams()
    const location = useLocation()

    const [filterParams, setFilterParams] = useState(location.state)

    useEffect(() => {
        let apiUrl = `${API.BASE_URL}/api/professor/completedClasses?userId=${getUserId()}`
        if (filterParams.disciplineId) {
            apiUrl = apiUrl + `&disciplineId=${filterParams.disciplineId}`
        }
        if (filterParams.groupId)
            apiUrl = apiUrl + `&groupId=${filterParams.groupId}`
        axios.get(apiUrl,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
          const allPersons = resp.data;
          setClasses(allPersons);
          console.log(allPersons)
        });
      }, [setClasses]);


    return (
        <div className="ClassHistoryPage">
            <div className="ContentHeader">
                <div className="content-header-label">Проведенные занятия</div>
            </div>
            <div className="Content">
                {classes ? classes.map(item => <ClassHistoryItem class={item}/>) : ''}
            </div>
        </div>
    )
}