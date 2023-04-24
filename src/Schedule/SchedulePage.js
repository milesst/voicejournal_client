import axios from "axios"
import { useState, useEffect } from "react"

export default function SchedulePage() {
    const [schedule, setSchedule] = useState([])
    
    useEffect(() => {
            const apiUrl = 'http://localhost:3000/api/professor/todayClasses';
            axios.get(apiUrl, {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}).then((resp) => {
              const allPersons = resp.data;
              setSchedule(allPersons);
            });
          }, [setSchedule]);

    return (
        <div className="SchedulePage">
          <div className="schedule-header">Расписание на: неделю</div>
          <div className="schedule-content">
            <div className="schedule-week-item">
              <div className="week-label">
                <div className="week-label-date">6</div>
                <div className="week-label-weekday">пн</div>
              </div>
              <div className="week-item-content">fewffewf</div>
            </div>
            <div className="schedule-week-item">
              <div className="week-label">
                <div className="week-label-date">6</div>
                <div className="week-label-weekday">пн</div>
              </div>
              <div className="week-item-content">fewffewf</div>
              </div>
            <div className="schedule-week-item">
              <div className="week-label">
                <div className="week-label-date">6</div>
                <div className="week-label-weekday">пн</div>
              </div>
              <div className="week-item-content">fewffewf</div></div>
            <div className="schedule-week-item"></div>
            <div className="schedule-week-item"></div>
            <div className="schedule-week-item"></div>
          </div>
            {schedule.map(obj => <div>{obj.name}</div>)}
        </div>
    )
}