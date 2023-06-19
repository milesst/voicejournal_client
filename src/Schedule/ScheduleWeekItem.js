import { useState } from "react"
import ScheduleWeekClass from "./ScheduleWeekClass"
import { useEffect } from "react";
import TailSpin from "react-loading-icons/dist/esm/components/tail-spin";

export default function ScheduleWeekItem(props) {
    const [selectedClass, setSelectedClass] = useState(0)
    const [classes, setClasses] = useState([])

    useEffect(() => {
        setClasses(props.content.map( item =>
            <ScheduleWeekClass content={item} index={props.content.indexOf(item)} selected={selectedClass} selectClass={() => selectClass(props.content.indexOf(item))}/>))
        
      }, [props.content]);

    function selectClass(itemIndex) {
        setSelectedClass(itemIndex)
        setClasses(props.content.map( item =>
            <ScheduleWeekClass content={item} index={props.content.indexOf(item)} selected={itemIndex} selectClass={() => selectClass(props.content.indexOf(item))}/>))
    }

    function getDate() {
        const date = new Date()
        date.setDate(date.getDate() + (props.weekDayNumber - new Date().getDay() + 1) )
        return date.getDate()
    }
    return (
        <div className={"schedule-week-item" + (getDate() === new Date().getDate() ? ' week-label-today' : '')}>
              <div className={"week-label"}>
                <div className="week-label-date">{getDate()}</div>
                <div className="week-label-weekday"> {
                    {
                    0: 'пн',
                    1: 'вт',
                    2: 'ср',
                    3: 'чт',
                    4: 'пт',
                    5: 'сб'
                    }[props.weekDayNumber]
                }</div>
              </div>
              <div className="week-item-content">
              {
              props.content.length > 0 ?
              classes
            //   props.content.map( item =>
            //     <ScheduleWeekClass content={item} index={props.content.indexOf(item)} selected={props.content.indexOf(item) === selectedClass} selectClass={() => selectClass(props.content.indexOf(item))}/>
            //     )
            //   : props.content === undefined ? <TailSpin stroke='orange' speed={.75} /> 
              : ''
              }
</div>
        </div>
    )
}