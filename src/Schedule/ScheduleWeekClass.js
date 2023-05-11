import { useEffect, useState } from "react"

export default function ScheduleWeekClass(props) {
    const [open, setOpen] = useState(props.selected === props.index)

    useEffect(() => {setOpen(props.selected === props.index)})
    // function selectClass() {
    //     setOpen(true)
    // }

    return (
        <div className={"ScheduleWeekClass" + (open ? '' : ' class-hidden') + (props.index >= props.selected ? ' right' : ' left')} style={{'z-index': props.index, 'max-width': (100 - props.index*15) + '%', 'min-width': (100 - props.index*20)/props.index+1}} onClick={props.selectClass}>
            <div className="class-content-wrap">
                <div className="class-time">{(open) ? props.content.time.substring(0, 5) : <div className="class-time-wrap"> <div>{props.content.time.substring(0, 2)}</div><div>{props.content.time.substring(3, 5)}</div></div>}</div>
                <div className="class-name">{props.content.name}</div>
                <div className="class-name">{props.content.classroom}</div>
            </div>
        </div>
    )
}