
import React, { useState,useContext } from 'react'
import { ProjectContext } from '..'
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
  CCardText,
  CCardTitle,
  CCardHeader,
  CDropdownMenu,CDropdownItem,CDropdownDivider,CDropdown,CDropdownToggle
} from '@coreui/react'
import { Link } from 'react-router-dom'
import { ProjectForm } from './projectForm'
import CIcon from '@coreui/icons-react'
import {
  cilOptions
} from '@coreui/icons'
import { ConfirmModal } from '../../../components/ConfirmModal'
import { useAuthContext } from '../../../contexts/auth-context'

const Project = ({ project }) => {
    const {userCan}  = useAuthContext();
    const { projectDs } = useContext(ProjectContext);
    const [showForm, setShowForm] = useState(false);  
    const [showConfirm,setShowConfirm] = useState(false);  
    const destroy = async() => {
        await projectDs.destroy(project.id);
        projectDs.setData(projectDs.data.filter((projectEl)=>
            projectEl.id !== project.id
        ));
    }
    const userString = project.users.map((user)=>user.name).concat(", ");
    return <CCol lg={4} >
      {showForm && <ProjectForm setShowForm={setShowForm} project={project} />}
      {showConfirm && <ConfirmModal setShow={setShowConfirm} onConfirm={()=>{ destroy() }} />}
      <CCard color='light' textColor='black' className="mb-3">
        <CCardHeader>
          <CRow>
            <CCol><Link className='text-black' to={{ pathname: "/project/" + project.id }}>Tasks ({project.tasks_count || 0})</Link></CCol>
            {userCan("update project") && <CCol style={{"textAlign":"right"}}><CDropdown>
                    <CDropdownToggle caret={false}><CIcon  className="me-2" icon={cilOptions} size="sm" /></CDropdownToggle>
                    <CDropdownMenu>
                      <CDropdownItem className="cursor-pointer" onClick={()=>setShowForm(true)}>Edit</CDropdownItem>
                      <CDropdownDivider />
                      <CDropdownItem className="cursor-pointer" onClick={()=>setShowConfirm(true)}>Delete</CDropdownItem>
                    </CDropdownMenu>
                  </CDropdown></CCol>}
          </CRow>
        </CCardHeader>
        <CCardBody>
          <CCardTitle>{project.name}</CCardTitle>
          <CCardText>
            {project.users.map((user)=>user.name).join(", ")}
          </CCardText>
        </CCardBody>
      </CCard>
    </CCol>
  }
  export {Project}