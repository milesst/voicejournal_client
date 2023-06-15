import { AiFillPlusCircle } from "react-icons/ai";

export function ToolBar(props) {
    return (
        <div className="toolbar">
                <input onChange={props.handleSearch} type="text" className="search" placeholder='Поиск'/>
                <div className="action-wrap">
                    <div className="new-user-btn" onClick={props.openForm}><AiFillPlusCircle size={25}/></div>
                </div>
            </div>
    )
}