
import React, { useState, useContext } from 'react'
import {
  CCol,
  CRow
} from '@coreui/react'
import { TaskTimer } from './TaskTimer'
import { Modal } from '../../../components/Modal'
import { useAuthContext } from '../../../contexts/auth-context'
import { isTaskAssingnedOn } from '../../../helpers/helper'
const TaskDetails = ({ setShowDetails, task }) => {
    const { user } = useAuthContext();
    return <Modal title={<>#Task - {task.id}</>} visible={true} setVisible={setShowDetails}>
      {isTaskAssingnedOn(task,user.id) &&
        <CRow className='mb-3 border-bottom pb-3'>
          <div className='d-flex align-items-center'>
          <TaskTimer  task={task}  />
          </div>
        </CRow>
      }
      <CRow><CCol>Created by {task.creator.name} at {new Date(task.created_at).toLocaleDateString()} {new Date(task.created_at).toLocaleTimeString()}</CCol></CRow>
      <CRow><CCol>Assign by {task.user && task.user[0] && task.user[0].name}</CCol></CRow>
      <CRow>
        <CCol>{task.description}</CCol>
      </CRow>
    </Modal>
  
  }
  export {TaskDetails};