import React, { useState, useContext,useRef,memo, useEffect } from 'react'
import classNames from 'classnames'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CDropdownMenu, CDropdownItem, CDropdownDivider, CDropdown, CDropdownToggle,
  CCol,
  CRow,
  CAvatar
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilOptions,
  cilArrowThickRight,
} from '@coreui/icons'
import { TaskForm } from './TaskForm'
import { colsNames } from '..'
import { ConfirmModal } from '../../../components/ConfirmModal'
import { parseLetters, trimText } from '../../../helpers/helper'
import { TaskTimer } from './TaskTimer'
import { useAuthContext } from '../../../contexts/auth-context'
import { UserDetails } from '../../../components/userDetail'
import { TaskDetails } from './TaskDetails'
import { isTaskAssingnedOn } from '../../../helpers/helper'
import { taskContext } from '..'
import { taskTimerContext } from '..'
const Task = (task) => {

  const [showDetails, setShowDetails] = useState(false),
  [seconds,setSeconds] = useState(task.seconds),
   [timerOn,setTimerOn] = useState(task.isTimerOn),
    border = classNames("mb-3",{ [`border-${getColorByColumn(task.column)}`]: true }),
      text = classNames({ [`${getColorByColumn(task.column)}`]: true });
  

     
   
  return (<taskTimerContext.Provider value={{seconds,setSeconds,timerOn,setTimerOn}}>
    {showDetails && <TaskDetails task={task} setShowDetails={setShowDetails} />}
    <CCard color="white" textColor={text} className={border}>
      
      <CCardHeader className='d-flex align-items-center'>
        <CCol className="text-start"><span onClick={()=> setShowDetails(true)} role="button">#Task - {task.id}</span></CCol>
        <CCol className="text-end"> {task.canUpdate && <Options task={task}/> }</CCol>
      </CCardHeader>
      <CCardBody>
        <CRow className='ps-1 pe-1 '>
          <p className='text-start font-weight-bold'>{trimText(task.description, 50)}</p>
          <a className='text-start mb-2' onClick={()=> setShowDetails(true)} role="button">Details</a>
        </CRow>
        <CRow className='ps-1 pe-1'>
          <Timer task={task}/>
          <TaskUsers task={task}/>
        </CRow>
      </CCardBody>
    </CCard></taskTimerContext.Provider>);
};
const Options = ({task})=>{
  const [showForm, setShowForm] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const {destroy,setTasks,tasks} = useContext(taskContext);
  const destroyTask = async () => {
    await destroy(task.id);
    setTasks(tasks.filter((taskEl) => taskEl.id !== task.id));
  }
  return <>{showForm && <TaskForm setShowForm={setShowForm} task={task} />}
  {showConfirm && <ConfirmModal setShow={setShowConfirm} onConfirm={() => { destroyTask() }} />}<CDropdown>
  <CDropdownToggle className="p-0 m-0" caret={false}><CIcon className="me-2" icon={cilOptions} size="sm" /></CDropdownToggle>
  <CDropdownMenu>
    <CDropdownItem onClick={() => setShowForm(true)}>Edit</CDropdownItem>
    <CDropdownDivider />
    <CDropdownItem onClick={() => setShowConfirm(true)}>Delete</CDropdownItem>
  </CDropdownMenu>
</CDropdown></> 
}
const Timer = ({task})=>{
  const { user } = useAuthContext();
  if(task.column !== colsNames.Done && isTaskAssingnedOn(task,user.id))
    return <><CCol className='text-start d-flex align-items-center'>
    <TaskTimer task={task}  />
    </CCol></>
    else 
    return <></>
}
const TaskUsers = ({task})=>{
  const {showUserDetails,setShowUserDetails,openDet} = useContext(taskContext);

  return  <>

  <CCol className='text-end'>
  {task.creator && <CAvatar role="button" onClick={()=>openDet(task.creator.id)} color="primary" textColor="white">{parseLetters(task.creator.name, 2)}</CAvatar>}
  <CIcon className="me-2 ms-2 text-secondary" icon={cilArrowThickRight} size="sm" />
  {task.user && task.user[0] && <CAvatar role="button" onClick={()=>openDet(task.user[0].id)} className="border border-dark" color="light" textColor="dark">{parseLetters(task.user[0].name, 2)}</CAvatar>}
</CCol></>;
}
const getColorByColumn = (column) =>{
  switch (column) {
    case 0:
      return 'primary'
    case 1:
      return 'success'
    case 2:
           return 'warning'
      case 3:  
          return 'info'
    default:
      return 'primary'
  }
}
export { Task };