
import React, { useState } from 'react'
import { Project } from './components/project';
import { ProjectForm } from "./components/projectForm";
import { ProjectContext } from '.';
import {
  CCard,
  CCardBody,
  CRow,
  CCardHeader,
  CSpinner,
  CCol,
  CButton
} from '@coreui/react'
import { useDataSource } from '../../hooks/useDataSource'
import CIcon from '@coreui/icons-react'
import {
  cilPlus
} from '@coreui/icons'
import { useAuthContext } from '../../contexts/auth-context';

const Projects = () => {
    const [showForm, setShowForm] = useState(false),
      projectDs = useDataSource("projects"),
      userDs = useDataSource("users");
    const {userCan}  = useAuthContext();
    
  
    return (<>
  
      <ProjectContext.Provider value={{ projectDs, userDs, showForm }}>
        {showForm && userCan("create project") && <ProjectForm setShowForm={setShowForm} />}
  
        <CCard className="mb-4">
          <CCardHeader className='d-flex align-items-center'>
            
              <CCol xs={6}><strong>Projects</strong></CCol>
              <CCol xs={6} className="text-end">
              {userCan("create project") && <CButton onClick={() => { setShowForm(true) }} color="primary"><CIcon className="me-2" icon={cilPlus} size="sm" />Add Project</CButton> }  
              </CCol>
           
            
            
            
          </CCardHeader>
          <CCardBody>
            <CRow>
              {projectDs.loading && <CSpinner color="primary" variant="grow" />}
              {!projectDs.loading && projectDs.data.map((project, index) => <Project key={project.id} project={project} />)}
            </CRow>
  
          </CCardBody>
        </CCard> </ProjectContext.Provider> </>);
  
  
  }

  export {Projects};