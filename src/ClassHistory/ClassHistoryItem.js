import { AiOutlineArrowRight } from "react-icons/ai";

export default function ClassHistoryItem(props) {
    return (
        <div className="ClassHistoryItem">
            <div className="item-left">
                <div className="date-place">{new Date(props.class.date).toLocaleString('ru-RU')}, ауд. {props.class.classroom}</div>
                <div className="discipline">{props.class.name}</div>
                <div className="group">гр. {props.class.group_number}</div>
            </div>
            <div className="item-right">
                <AiOutlineArrowRight className="icon"/>
            </div>
        </div>
    )
}