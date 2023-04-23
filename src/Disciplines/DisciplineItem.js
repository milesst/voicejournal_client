export default function DisciplineItem(props) {
    return (
        <div className="DisciplineItem">
            <div className="discipline-name"><span>{props.discipline}</span></div>
            <div className="discipline-period">{props.startDate.split('T')[0]} - {props.endDate.split('T')[0]}</div>
            <div className="discipline-groups">
                {props.groups.map(item => <div>{item}</div>)}
                {/* <div className="group">09-951</div>
                <div className="group">09-952</div>
                <div className="group">09-951</div> */}
            </div>
        </div>
    )
}