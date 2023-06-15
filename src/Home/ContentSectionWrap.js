import {AiFillPlusCircle} from 'react-icons/ai'
import Puff from 'react-loading-icons/dist/esm/components/puff'
import SpinningCircles from 'react-loading-icons/dist/esm/components/spinning-circles'
import TailSpin from 'react-loading-icons/dist/esm/components/tail-spin'
import ThreeDots from 'react-loading-icons/dist/esm/components/three-dots'
import { NavLink } from 'react-router-dom'

export default function ContentSectionWrap(props) {

    return (
        <div className="ContentSectionWrap">
            <div className={"home-content-header" + ' ' + (props.contentLabel === 'Документы и отчеты' ? 'home-documents' : '')}>
                <div className={"home-content-label"}>{props.contentLabel}</div>
                <div className="home-content-header-button" onClick={props.buttonAction}>
                <AiFillPlusCircle size={'1.5rem'} /></div>
                </div>
            <div style={{display: (props.contentLabel === 'Документы и отчеты' ? 'none' : 'block')}} className="content-section-content">
                { 
                !props.classes && !props.tasks ? <TailSpin stroke='orange' speed={.75}  /> :
                props.classes && props.classes.length > 0 ? props.classes.map(item => <div className='home-discipline-item' onClick={() => props.buttonAction(item.schedule_id)}>
                    <div className="home-discipline-item-header">
                        <div className="home-discipline-item-time">{item.time.substring(0, 5)}</div>
                    <div className="home-discipline-item-discipline">{item.name}</div>
                    </div>
                    <div className="home-discipline-item-footer">
                        <div className="gome-discipline-item-time-location">ауд. {item.classroom} (Кремлевская, 35)</div>
                        <div className="home-discipline-item-groups">гр. {item.group_number}</div>
                    </div>
                    </div>) :
                props.classes && props.classes.length === 0 ?
                    `Сегодня у Вас нет занятий` :
                props.tasks && props.tasks.length > 0 ? props.tasks.map(item => <NavLink className="content-section-navlink" to={`/assignments/${item.assignment_id}`}><div className='assignment-item'>
                        <div className="assignment-item-info">
                        <div className="assignment-item-name">{item.name}</div>
                        <div className="assignment-item-description">{item.discipline_name}, гр. {item.group_number}</div></div>
                        <div className="assignment-item-dates-wrap">
                            <div className="assignment-item-start-date">Выдано: {new Date(item.start_date).toLocaleString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                            <div className="assignment-item-deadline">Срок: {new Date(item.deadline).toLocaleString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                        </div>
                    </div></NavLink>) 
                    :
                    props.tasks && props.tasks.length === 0 ?
                     `Сегодня у Вас нет дедлайнов по заданиям`
                    :
                    props.contentLabel === 'Документы и отчеты' ? 
                        <div className="home-documents-wrap"></div>
                    :  <TailSpin stroke='orange' speed={.75}  />
                }   
            </div>
        </div>
    )
}