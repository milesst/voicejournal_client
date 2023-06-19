import { NavLink } from "react-router-dom"

export default function AssignmentItem(props) {
    const assignment = props.assignment
    return (
        <NavLink className={'assignment-item'} to={`/assignments/${assignment.assignment_id}`}>
            <div className="AssignmentItem">
                <div className="assignment-general-info assignment-block">
                    <div className="assignment-item-name" style={new Date(assignment.deadline) < new Date() ? {color: 'gray'} : {}}>{assignment.name}</div>
                    <div className="description">{assignment.description}</div>
                    <div className="group-number">группы: {assignment.group_number}</div>
                </div>
                <div className="assignment-completion-info assignment-block">
                    <div className="completed-amount" style={assignment.completedAssignments.length < assignment.studentCount ? {color: 'red'} : ''}>{assignment.completedAssignments.length}/{assignment.studentCount}</div>
                    <div className="deadline">до: {new Date(assignment.deadline).toLocaleDateString('ru-RU', {'month': 'long', 'day': 'numeric'})}</div>
                </div>
            </div>   
        </NavLink>
    )
}