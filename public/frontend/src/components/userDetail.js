import React from 'react'
import { Modal } from './Modal'
import { useDataSource } from '../hooks/useDataSource'
import {
    CCol,
    CRow,
    CSpinner
  } from '@coreui/react'
const UserDetails = ({userid,setShowDetails}) =>{
    const {data:user,loading} = useDataSource("users/"+userid);


    return <Modal title={loading?"...":user.name} visible={true} setVisible={setShowDetails}>
        {loading && <CSpinner color="primary" variant="grow" />}
        {!loading && <>
    <CRow>
        <CCol><span className='fw-bold'>Name: </span>{user.name}</CCol>
    </CRow>
    <CRow>
        <CCol><span className='fw-bold'>Role: </span>{user.role.name}</CCol>
    </CRow>
    <CRow>
        <CCol><span className='fw-bold'>Projects: </span>{user.projects.map((project)=>project.name).join(", ")}</CCol>
    </CRow>
    <CRow>
        <CCol><span className='fw-bold'>Tasks: </span>{user.tasks_count}</CCol>
    </CRow>
    
    </>}
    </Modal>
}
export {UserDetails};