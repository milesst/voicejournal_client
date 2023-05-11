import { NavLink } from "react-router-dom";

export default function DisciplineItem(props) {
    return (
        <div className="DisciplineItem">
            <div className="discipline-name"><span>{props.discipline}</span></div>
            <div className="discipline-period">{props.startDate.split('T')[0]} — {props.endDate.split('T')[0]}</div>
            <div className="discipline-groups">
                {props.groups.map(item => <NavLink to='/groups'><div className='student-group-item' id={item.group_id}>{item.group_number}</div></NavLink>)}
            </div>
        </div>
    )
}