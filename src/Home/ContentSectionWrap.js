import {AiFillPlusCircle} from 'react-icons/ai'

export default function ContentSectionWrap(props) {

    return (
        <div className="ContentSectionWrap">
            <div className={"home-content-header" + ' ' + (props.contentLabel === 'Документы и отчеты' ? 'home-documents' : '')}>
                <div className={"home-content-label"}>{props.contentLabel}</div>
                <div className="home-content-header-button" onClick={props.buttonAction}>
                <AiFillPlusCircle size={'1.5rem'} /></div>
                </div>
            <div className="content-section-content">
                { props.contentLabel !== 'Документы и отчеты' ?
                props.classes ? props.classes.map(item => <div className='home-discipline-item' onClick={() => props.buttonAction(item.schedule_id)}>
                    <div className="home-discipline-item-header">
                        <div className="home-discipline-item-time">{item.time.substring(0, 5)}</div>
                    <div className="home-discipline-item-discipline">{item.name}</div>
                    </div>
                    <div className="home-discipline-item-footer">
                        <div className="gome-discipline-item-time-location">ауд. {item.classroom} (Кремлевская, 35)</div>
                        <div className="home-discipline-item-groups">{item.group_number}</div>
                    </div>
                    </div>) :
                    props.tasks ? props.tasks.map(item => <div className='assignment-item'>
                        <div className="assignment-item-info">
                        <div className="assignment-item-name">{item.name}</div>
                        <div className="assignment-item-description">{item.description}</div></div>
                        <div className="assignment-item-dates-wrap">
                            <div className="assignment-item-start-date">Выдано: {new Date(item.start_date).toLocaleString('ru-RU')}</div>
                            <div className="assignment-item-deadline">Срок: {new Date(item.deadline).toLocaleString('ru-RU')}</div>
                        </div>
                    </div>) 
                    :
                     `Сегодня у Вас нет ${props.classes ? 'занятий' : props.tasks ? 'дедлайнов по заданиям' : ''}`
                    :
                    props.contentLabel === 'Документы и отчеты' ? 
                        <div className="home-documents-wrap"></div>
                    : ''
                }   
            </div>
        </div>
    )
}