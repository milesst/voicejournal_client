import { Link, NavLink } from "react-router-dom";

export function Home() {
    return (
        <ul className="data-list">
                    <li className="data-list-item"><NavLink to="/admin/users">Пользователи</NavLink></li>
                    <li className="data-list-item">Студенты</li>
                    <li className="data-list-item">Дисциплины и занятия</li>
                    <li className="data-list-item">Расписание</li>
                </ul>
    )
}