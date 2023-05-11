import axios from "axios"
import { useState, useEffect } from "react"
import ScheduleWeekItem from "./ScheduleWeekItem";
import { getAccessToken } from "../Utils/utils";

export default function SchedulePage() {
    const [schedule, setSchedule] = useState([])
    
    useEffect(() => {
            const apiUrl = 'http://localhost:3000/api/professor/scheduleWeek?userId=a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
            axios.get(apiUrl, {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
              const allPersons = resp.data;
              setSchedule(allPersons);
            });
          }, [setSchedule]);

    function generateWeekItems() {
      let items = []
      for (let i = 0; i < 6; i++) {
        items.push(<ScheduleWeekItem weekDayNumber={i} content={schedule.filter(item => item.day_of_week === i)}/>)
      }
      return items
    }      

    return (
        <div className="SchedulePage">
          <div className="schedule-header">Расписание на: <span><select name="cars" id="cars">
                                                          <option value="volvo">неделю</option>
                                                          <option value="saab">день</option>
                                                          <option value="mercedes">месяц</option>
                                                        </select></span>
            </div>
          <div className="schedule-content">
            {generateWeekItems()}
            {/* <ScheduleWeekItem weekDayNumber={0}></ScheduleWeekItem>
            <ScheduleWeekItem weekDayNumber={1}></ScheduleWeekItem>
            <ScheduleWeekItem weekDayNumber={2}></ScheduleWeekItem>
            <ScheduleWeekItem weekDayNumber={3}></ScheduleWeekItem>
            <ScheduleWeekItem weekDayNumber={4}></ScheduleWeekItem>
            <ScheduleWeekItem weekDayNumber={5}></ScheduleWeekItem> */}
          </div>
        </div>
    )
}