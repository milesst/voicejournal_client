import { useState } from "react"

export default function SaveClassPopup(props) {
    const [comment, setComment] = useState('')

    const handleCommentChange = event => {
        // 👇️ access textarea value
        setComment(event.target.value);
        console.log(event.target.value);
      }


    return (
        <div className="SaveClassPopup">
            <div className="save-class-wrap">
                <textarea name="class-comment" id="" cols="30" rows="10" onChange={handleCommentChange} placeholder={'Оставьте комментарий'}></textarea>
                <div className="save-class-btns btn-wrap">
                <button className="save-class-btn" onClick={() => props.buttonAction(comment)}>Сохранить</button>
                <button className="save-class-cancel-btn" onClick={() => props.closeForm()}>Отмена</button></div>
            </div>
        </div>
    )
}