import { NavLink } from "react-router-dom";
import {AiFillClockCircle, AiOutlineClockCircle, AiOutlineHistory} from 'react-icons/ai'

export default function DisciplineItem(props) {
    const itemStyle = (i) => {return { backgroundColor: `hsl(${(i+2)*50}, 100%, 46%)`}}
    // const itemStyle = (i) => {return { backgroundColor: "black"}}

    return (
        <div className="DisciplineItem">
            <div className="discipline-name">
                <span>{props.discipline}</span>
                <NavLink to={`/classHistory`} state={{disciplineId: props.disciplineId}}><AiOutlineHistory  className='icon' size={25}/></NavLink>
            </div>
            <div className="discipline-period">{new Date(props.startDate).toLocaleDateString()} — {new Date(props.endDate).toLocaleDateString()}</div>
            <div className="discipline-groups">
                {props.groups.map(item => <NavLink to={`/groups/${item.group_id}`}>
                    <div style={itemStyle(props.groups.indexOf(item))} className='student-group-item' id={item.group_id}>{item.group_number}</div
                    ></NavLink>)}
            </div>
            <div style={{display: (props.assignments.length > 0 ? 'block' : 'none')}} className="discipline-assignments">
                <div style={{display: (props.assignments.length > 0 ? 'block' : 'none')}} className="assignments-label">Задания</div>
                {props.assignments.map(item => <NavLink to={`/assignments/${item.assignmentId}`}><div className="assignment-item" key={item.assignmentId}>
                    <div className="assignment-name"><p>{item.assignmentName}</p></div>
                    <div className="assignment-deadline">
                        <div className="deadline-icon"><AiFillClockCircle /></div>
                        <div className="deadline-label">{new Date(item.deadline).toLocaleDateString('ru-RU', {month: 'long', day: 'numeric'})}</div>
                        </div>
                </div></NavLink>)
                }
            </div>
        </div>
    )
}