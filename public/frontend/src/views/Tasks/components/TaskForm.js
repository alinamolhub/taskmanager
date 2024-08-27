import React, { useContext, useState } from 'react'
import { Modal } from '../../../components/Modal'

import {
  CFormSelect,
  CFormInput,
} from '@coreui/react'
import { taskContext } from '..'



const TaskForm = ({ setShowForm, task }) => {

  const [description, setDescription] = useState(task ? task.description : ""),
    [assignuser,setUser] = useState(task && task.user && task.user[0] ? task.user[0].id : 0);
  const {tasks,project,create,setTasks,update} = useContext(taskContext);
  const createTask = async ()=>{
    const newTask = await create({ description: description,user_id:assignuser });
    setTasks([...tasks,newTask]);

  }
  const updateTask = async ()=>{

    const updatedTaskOb = await update(task.id,{  description: description,user_id:assignuser });
    const updatedIndex = tasks.findIndex((taskEl)=>taskEl.id === task.id);
    setTasks( [...tasks.slice(0,updatedIndex),updatedTaskOb,...tasks.slice(updatedIndex+1)] );

  }

  return (
    <>
      <Modal isButtonEnabled={()=>assignuser && description} visible={true} setVisible={setShowForm} onSave={async () => task?updateTask():createTask() }>
      <div className="mb-3">
        <label className="form-label d-flex">Task Description <div className='text-danger ms-1'>*</div> </label>
        <CFormInput value={description} onChange={e => setDescription(e.target.value)} type="text" placeholder="Task Description" aria-label="default input example" />
      </div>
      <div className="mb-3">
        <label className="form-label d-flex">Assgn To: <div className='text-danger ms-1'>*</div> </label>
        <CFormSelect value={assignuser} size="sm" onChange={(e)=>{setUser(e.target.value);}}>
          <option>None</option>
 
          {project.users.map((user)=>{ return <option key={user.id} value={user.id}>{user.name}</option>})}
        </CFormSelect>
      </div>
      </Modal>
    </>
  )

}
export { TaskForm };