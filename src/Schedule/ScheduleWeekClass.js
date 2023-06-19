import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function ScheduleWeekClass(props) {
    const [open, setOpen] = useState(props.selected === props.index)

    useEffect(() => {setOpen(props.selected === props.index)})
    // function selectClass() {
    //     setOpen(true)
    // }

    return (
        <motion.div
            // animate={{ x: 0 }}
            transition={{ type: "spring", stiffness: 100 }} 
            animate="show"
            className={"ScheduleWeekClass" + (open ? '' : ' class-hidden') + (props.index >= props.selected ? ' right' : ' left')} 
            style={{'z-index': props.index, 'max-width': (100 - props.index*15) + '%', 'minWidth': (100 - props.index*20)/props.index+1}}
             onClick={props.selectClass}>
            <div className="class-content-wrap">
                <div className="class-time">{(open) ? `${props.content.time.substring(0, 5)}, ауд. ${props.content.classroom}` : <div className="class-time-wrap"> <div>{props.content.time.substring(0, 2)}</div><div>{props.content.time.substring(3, 5)}</div></div>}</div>
                <div className="class-name">{props.content.name}</div>
                <div className="class-name">гр. {props.content.group_number}</div>
                {/* <div className="class-name">ауд. {props.content.classroom}</div> */}
            </div>
        </motion.div>
    )
}