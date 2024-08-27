import React,{useState,useContext,useReducer, useEffect,useMemo ,useCallback} from 'react'
import { KanbanBoard } from '../../components/KanbanBoard'
import { useDataSource } from '../../hooks/useDataSource'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CSpinner,
  CButton,
  CCardHeader,
  CBadge 
} from '@coreui/react'
import {useParams} from 'react-router-dom'
import { TaskForm } from './components/TaskForm'
import { Task } from './components/Task'
import CIcon from '@coreui/icons-react'
import {
  cilPlus
} from '@coreui/icons'
import { taskContext,cols,colsNames } from '.'
import { useAuthContext } from '../../contexts/auth-context'
import {BrowserView, MobileView} from 'react-device-detect';

import { UserDetails } from '../../components/userDetail'
const reducer = (state,action)=>{
    switch(action.type){
      case "init":{
        return action.collection;
      }
      case "add":{
        console.log(action.newTask);
        return [...state,action.newTask];
      }
      case "update":{
        const updatedIndex = state.findIndex((taskEl)=>taskEl.id === action.updateTask.id);
        return [...state.slice(0,updatedIndex),action.updateTask,...state.slice(updatedIndex+1)];
      }
      case "destroy":{
        return state.filter((taskEl) => taskEl.id !== action.id)
      }
      
    }
}
const Tasks = () => {
  const {user}  = useAuthContext();
  let params = useParams();
  const {data:project,loading,setLoading} = useDataSource("projects/"+params.projectId);
  const {create,update,destroy} = useDataSource("projects/"+params.projectId+"/tasks",false);
  const [showForm, setShowForm] = useState(false);
  const [tasks,setTasks] = useReducer(reducer,[]);
  const [showUserDetails, setShowUserDetails] = useState({ open: false, userId: 0 });
  const openDet = (id)=>setShowUserDetails({open:true,userId:id});
  useEffect(()=>{
    if(!loading && !project.error){
      setTasks({type:"init",collection:[...project.tasks]});
    }
    
  },[loading]);
  useEffect(()=>{
    console.log(tasks);
    
  },[tasks]);

  const onReplace = useCallback(async(task,column) => {
    
    const updated = await update(task.id,{column:column});
    return updated;
  },[]);
  const dragedIf = useCallback((task) => task.canUpdate,[]);


  const groupFilter = useCallback((task,group) =>{
    return task && task.user && task.user[0] && task.user[0].id == group.id
  },[]);
  const groupName = useCallback((group) =>{
    return group.id===user.id?"My Tasks":group.name;
  },[]);
  const groupList = useMemo(() =>{
    return !loading?[user,...project.users.filter((puser)=>puser.id !== user.id)]:[];
  },[project,user,loading]);
  return (
    <>{loading && <CSpinner color="primary" variant="grow" />}
    {!loading && project.error && <>{project.message}</>}
    {!loading && !project.error && <taskContext.Provider value={{openDet,showUserDetails, setShowUserDetails,project,tasks,loading,setLoading,create,setTasks,update,destroy}}>
    
     <>
     {showUserDetails.open && <UserDetails userid={showUserDetails.userId} setShowDetails={(status) => { setShowUserDetails({ open: status, userId: showUserDetails.userId }) }} />}
     <CRow className="mb-4" xs={{ gutter: 4 }}>
    {showForm && <TaskForm setShowForm={setShowForm}/>}
      <CCol sm={12} xl={12} xxl={12}>
        <CCard>
        <CCardHeader className='d-flex align-items-center'>
        <CCol xs={6}><strong>{project.name}</strong>
      </CCol>
        <CCol xs={6} className="text-end"><CButton onClick={() => { setShowForm(true) }} color="primary"><CIcon className="me-2" icon={cilPlus} size="sm" />Add Task</CButton></CCol>
        
        </CCardHeader>
          <CCardBody>
          <CRow className='p-2'>Team:</CRow>
          <CRow className='p-2 border-bottom border-ligh mb-2'>
            <CCol className='p-0'>
            {project.users.map((user,index)=><span key={index}><CBadge className='me-1 border border-primary' textBgColor="light" onClick={()=>openDet(user.id)} role="button" key={user.id}>{user.name}</CBadge></span>)}
            </CCol>
            </CRow>
          <BrowserView>
          <KanbanBoard groupName={groupName} groupFilter={groupFilter} groupsList={groupList} dragedIf={dragedIf} cardContent={Task} onReplace={onReplace} data={tasks} setData={setTasks} columnField={"column"} cols={cols}  />
          </BrowserView>
          <MobileView>
          <TasksList/>
          </MobileView>
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    </>
  
    </taskContext.Provider>}</>

  )
}

const TasksList = ()=>{
  const {tasks} = useContext(taskContext);
  return <>{tasks.map((task,index)=><TaskListElement key={index} task={task}/>)}</>;
}
const TaskListElement = ({task})=>{
  const element = Task(task);
  return <>{element}</>;
}

export default Tasks
