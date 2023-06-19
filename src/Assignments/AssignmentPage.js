import axios, { all } from "axios";
import { useEffect, useRef, useState } from "react"
import { NavLink, useParams, useSearchParams } from "react-router-dom"
import { getAccessToken, parseDateFromJSONDate } from "../Utils/utils";
import { ToastContainer, toast } from "react-toastify";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { API, BASE_URL } from "../Utils/api";

export default function AssignmentPage() {
    let {id} = useParams()
    const [assignment, setAssignment] = useState()
    const [allStudentsDisplay, setAllStudentsDisplay] = useState(true)
    const submittedAssignmentPopup = useRef(null)
    const [startDate, setStartDate] = useState(new Date().toLocaleDateString().split('.').reverse().join('-'))

    const [submissionDate, setSubmissionDate] = useState(startDate)
    const [submissionGrade, setSubmissionGrade] = useState()
    const [submissionComment, setSubmissionComment] = useState()
    const [selectedStudent, setSelectedStudent] = useState({})

    useEffect(() => {
        const apiUrl = `${BASE_URL}/api/professor/assignment?assignmentId=${id}`;
        axios.get(apiUrl,  {headers: { Authorization: `Bearer ${getAccessToken()}` }}).then((resp) => {
          const allPersons = resp.data;
          setAssignment(allPersons);
          console.log(id)
          console.log(allPersons)
        });
      }, [setAssignment, id]);

    function showSubmitForm(item) {
        setSelectedStudent(item)
        submittedAssignmentPopup.current.showModal()
    }

    function closeSubmitForm() {
        submittedAssignmentPopup.current.close()
    }

    // useEffect(() => {

    // }, [selectedStudent])

    function saveSubmission() {
        const data = {
            assignmentId: assignment.assignmentId,
            studentId: selectedStudent.studentId,
            completionDate: submissionDate,
            grade: submissionGrade
        }
        if (submissionComment)
            data.comment = submissionComment
        if (selectedStudent.completionId)
            data.completionId = selectedStudent.completionId
        console.log(data)
        const apiUrl = `${BASE_URL}/api/professor/completedAssignment`
        if (selectedStudent.completionId) {
            console.log(axios.put(apiUrl, data, {headers: { Authorization: `Bearer ${getAccessToken()}` }}))

        }
        else {
        console.log(axios.post(apiUrl, data, {headers: { Authorization: `Bearer ${getAccessToken()}` }}))
        }

        const indexOSelected = assignment.completedAssignments.indexOf(assignment.completedAssignments.find(item => item.studentId === selectedStudent.studentId))
        console.log(indexOSelected)
        
        const newAssignment = Object.assign({}, assignment)
        const newCompleted = newAssignment.completedAssignments.slice()
        newCompleted[indexOSelected].grade = submissionGrade
        newCompleted[indexOSelected].comment = submissionComment
        newCompleted[indexOSelected].completionDate = submissionDate
        newAssignment.completedAssignments = newCompleted
        setAssignment(newAssignment)
        console.log(newAssignment)

        toast.success('Оценка выставлена!')
    }

    function handleChangeDate(e) {
        setSubmissionDate(e.target.value)
    }

    function handleChangeGrade(e) {
        setSubmissionGrade(e.target.value)
    }

    function handleChangeComment(e) {
        setSubmissionComment(e.target.value)
    }

    return assignment ? 
            <div className="AssignmentPage">
            <ToastContainer autoClose={1000} />
                <dialog ref={submittedAssignmentPopup} class="submitted-assignment-popup">
                <form method="dialog" onSubmit={saveSubmission}>
                    <p>Выставить оценку: {selectedStudent?.lastName} {selectedStudent?.firstName} {selectedStudent?.patronymic}</p>
                    <input type="date" defaultValue={ parseDateFromJSONDate(selectedStudent.completionDate) || startDate} onChange={handleChangeDate}/>
                    <input type="number" defaultValue={selectedStudent?.grade} placeholder={'Оценка'} onChange={handleChangeGrade}/>
                    <textarea defaultValue={selectedStudent?.comment !== 'undefined' ? selectedStudent.comment : ''} placeholder="Комментарий" name="" id="" cols="30" rows="10" onChange={handleChangeComment}></textarea>
                    <div className="btn-wrap new-task-button-wrap">
                        <button type="submit">Сохранить</button>
                        <button type='button' onClick={closeSubmitForm}>Отмена</button>
                    </div>
                </form>
                </dialog>
            <div className="ContentHeader">
               {localStorage.getItem('activeClass') ? <NavLink className="back-to-class-btn" to="/activeClass"><AiOutlineArrowLeft /></NavLink> : ''} <div className="content-header-label">Задание</div>
            </div>
            <div className="Content">
                
            <div className="assignment-info-wrap">
                <div className="assignment-name-desc-wrap">
                    <div className="assignment-name">{assignment.assignmentName}</div>
                    <div className="assignment-desc">{assignment.description}</div>
                </div>
                <div className="assignment-info-footer">
                    <div className="assignment-discipline">Дисциплина: {assignment.disciplineName}</div>
                    <div className="assignment-discipline-group">Группы: {assignment.groupNumber}</div>
                    <div className="assignment-dates">Сроки: С {new Date(assignment.startDate).toLocaleString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })} по {new Date(assignment.deadline).toLocaleString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
            </div>
            <div className="assignment-submissions-wrap">
                <div className="assignment-submission-group">
                    <ul><li><span className="all-students-header" onClick={() => setAllStudentsDisplay(!allStudentsDisplay)}>{assignment.groupNumber}</span>  
                    <ul className="all-students-wrap" style={{'display': (allStudentsDisplay ? 'initial' : 'none')}}>
                    {assignment ? assignment.completedAssignments.sort((a, b) => {
                          if (a.lastName > b.lastName) return 1;
                          if (a.lastName < b.lastName) return -1;
                          return 0
                        }).map(item => <div onClick={() => showSubmitForm(item)} className={'student-assignment-item' + (item.completionId ? ' submitted' : '')}><div className="student-name">{item.lastName} {item.firstName} {item.patronymic}</div> <div className="student-grade">{item.grade ? item.grade : '0'}б</div></div>)
                    : ''}
                    </ul></li></ul>
                </div>
            </div>
            </div>
            </div>
            
            : <div></div>
    
}