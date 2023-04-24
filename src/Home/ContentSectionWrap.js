export default function ContentSectionWrap(props) {
    return (
        <div className="ContentSectionWrap">
            <div className="label">{props.contentLabel}</div>
            <div className="content-section-content">
                {props.content ? props.content.map(item => <div className='home-discipline-item'>
                    <div className="home-discipline-item-header">
                        <div className="gome-discipline-item-time-location">{item.time.substring(0, 5)}, ауд. {item.classroom}</div>
                    </div>
                    <div className="home-discipline-item-discipline">{item.name}</div>
                    <div className="home-discipline-item-footer">
                        {/* {item.groups.map(group => <div className='home-discipline-item-group'>{group}</div>)} */}
                        {item.group_number}
                    </div>
                    {/* {item.name} {item.time} */}
                    </div>) : ""}
            </div>
        </div>
    )
}