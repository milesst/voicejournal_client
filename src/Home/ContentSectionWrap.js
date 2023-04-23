export default function ContentSectionWrap(props) {
    return (
        <div className="ContentSectionWrap">
            <div className="label">{props.contentLabel}</div>
            <div className="content-section-content">
                {props.content ? props.content.map(item => <div>{item.name} {item.time}</div>) : ""}
            </div>
        </div>
    )
}