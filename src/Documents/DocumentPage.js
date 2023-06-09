import { useEffect, useState } from "react";
import { AiFillFilter, AiOutlineDownload } from "react-icons/ai";
import {AiFillPlusCircle} from 'react-icons/ai'
import { NavLink } from "react-router-dom";
import { getAccessToken, getUserId } from "../Utils/utils";
import axios from "axios";
import { saveAs } from "file-saver";
import { API, BASE_URL } from "../Utils/api";
import { ToastContainer, toast } from "react-toastify";

export default function DocumentPage() {
    const [documents, setDocuments] = useState()

    useEffect(() => {
        const apiUrl = `${BASE_URL}/api/documents/documentList?userId=${getUserId()}`;
        console.log(apiUrl)
        axios.get(apiUrl, {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
          const allPersons = resp.data;
          setDocuments(allPersons);
          console.log(resp.data)
        });
      }, [setDocuments]);

    function downloadDocument(id) {
        const apiUrl = `${BASE_URL}/api/documents/downloadDocument?docId=${id}`;
        console.log(apiUrl)
        axios.get(apiUrl, {
            headers: { Authorization: `Bearer ${getAccessToken()}` },
            responseType: 'blob'}).then((resp) => {
                // console.log(resp)
                // saveAs(new Blob(resp.data.doc), 'Ведомость.docx')
                const url = window.URL.createObjectURL(new Blob([resp.data], {type: "application/docx"}));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Ведомость.docx');
            document.body.appendChild(link);
            link.click();
        // const allPersons = resp.data;
        // console.log(resp.data)

        // const url = window.URL.createObjectURL(new Blob([resp.data.doc]));
        // const link = document.createElement('a');
        // link.href = url;
        // link.setAttribute('download', 'generate2.docx');
        // document.body.appendChild(link);
        // link.click();
        

        console.log(resp)
        });
    }

    return (
        <div className="DocumentPage page-wrap">
            <ToastContainer autoClose={3500}/>
            <div className="header-wrap">
                <div className="header-label">Документы</div>
                {/* <div className="filter-wrap">
                    <AiFillFilter />
                </div> */}
                <NavLink to="/newDocument">
                    <div className="new-doc-wrap">
                        <AiFillPlusCircle size={'1.5rem'} />
                    </div>
                </NavLink>
            </div>
            <div className="content">
                <div className="doc-list">
                    {documents ? documents.map(doc => <div className="doc-wrap">
                                                        <div className="info-wrap">
                                                            <div className="header">{doc.doc_type === 'ved' ? 'Ведомость' : 'Документ'} от {new Date(doc.creation_date).toLocaleDateString('ru-RU')}</div>
                                                            <div className="details">{doc.discipline_name}, гр. {doc.group_number}</div>
                                                        </div>
                                                        <div className="icon-wrap" onClick={
                                                            process.env.REACT_APP_SERVER_API_URL.includes('localhost') ?
                                                            () => downloadDocument(doc.id) :
                                                            () => toast.error('Извините, данный хостинг не предоставляет устойчивое хранилище данных, поэтому скачивание готовых документов в этой версии отключено :(')
                                                        }>
                                                            <AiOutlineDownload></AiOutlineDownload>
                                                            {/* <span>docx</span> */}
                                                        </div>
                                                    </div>): ''}
                </div>
            </div>
        </div>
    )
}