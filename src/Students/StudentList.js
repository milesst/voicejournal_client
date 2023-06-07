export default function StudentList(props) {

    return (
        <div className="active-class-group-list-wrap">
                        <div className="group-list-label">Студенты</div>
                        <div className="group-list">
                            {!props.activeClass ? props.students.map(item => <div className='student-list-item'><div className="student-name">{item.last_name} {item.first_name}</div></div>) : 
                            props.students.map(item => 
                                <div key={item.student_id} onClick={() => props.setStudentPresent(this, item.student_id)} className={'student-list-item student-item-colored' + (item.absent ? ' absent' : '')}>
                                    <div className="student-name">{item.last_name} {item.first_name}</div>
                                </div>)
                            }
                        </div>
        </div>
    )
}