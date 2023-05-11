import { useState } from "react"

export default function SaveClassPopup(props) {
    const [comment, setComment] = useState('')

    return (
        <div className="SaveClassPopup">
            <div className="save-class-wrap">
                <textarea name="class-comment" id="" cols="30" rows="10" onChange={() => setComment(this.target.value)}></textarea>
                <button className="save-class-btn" onClick={(comment) => props.buttonAction(comment)}>Сохранить</button>
                <button className="save-class-cancel-btn" onClick={() => props.closeForm()}>Отмена</button>
            </div>
        </div>
    )
}