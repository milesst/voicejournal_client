import axios from "axios";
import ContentSectionWrap from "./ContentSectionWrap";
import { useEffect, useState } from "react";

export default function HomePage() {
    const [classes, setClasses] = useState([])
    
    useEffect(() => {
        const apiUrl = 'http://localhost:3000/api/professor/todayClasses?userId=a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';
        axios.get(apiUrl,  {headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }}).then((resp) => {
          const allPersons = resp.data;
          setClasses(allPersons);
          console.log(allPersons)
        });
      }, [setClasses]);

    return (
        <div className="HomePage">
        <ContentSectionWrap contentLabel="Ближайшие пары" content={classes}/>
        <ContentSectionWrap contentLabel="Дедлайны заданий" />
        </div>
    )
}