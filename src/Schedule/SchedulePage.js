import axios from "axios"
import { useState, useEffect } from "react"

export default function SchedulePage() {
    const [schedule, setSchedule] = useState([])
    
    useEffect(() => {
            const apiUrl = 'http://localhost:3000/api/professor/todayClasses';
            axios.get(apiUrl).then((resp) => {
              const allPersons = resp.data;
              setSchedule(allPersons);
            });
          }, [setSchedule]);

    return (
        <div className="SchedulePage">
            {schedule.map(obj => <div>{obj.name}</div>)}
        </div>
    )
}