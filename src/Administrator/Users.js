import { AiFillEdit } from 'react-icons/ai'

export function Users() {
    const [users, setUsers] = useState([])
    
    return (
        <div className="Users">
            <div className="toolbar">
                <input type="text" className="search" placeholder='Поиск'/>
                <div className="action-wrap">
                    <AiFillEdit />
                </div>
            </div>
            <div className="content">
                {}
            </div>
        </div>
    )
}