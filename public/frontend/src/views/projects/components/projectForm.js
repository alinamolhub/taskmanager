import { ProjectContext } from '..'
import React, {  useState, useContext, createContext } from 'react'
import { Modal } from '../../../components/Modal'
import {
  CCol,
  CRow,
  CFormInput,
  CListGroup,
  CFormCheck,
} from '@coreui/react'


//import {Clock,ToDoList} from '../widgets/Widgets'
const ProjectForm = ({setShowForm,project}) => {

  const { projectDs,userDs } = useContext(ProjectContext);
  const [name, setName] = useState(project?project.name:"");
  const [team, setTeam] = useState([]);
  React.useLayoutEffect(() => {
    project && setTeam(project.users.map((user) => {
      return user.id;
    })
    );

  }, []);
  const userChange = (id,status)=>{
    if(status)
      setTeam([...team,id]);
      //addUser(id);
    else
      setTeam(team.filter((user) => user!==id));
  }
  const create = async ()=>{
    const newProject = await projectDs.create({ name: name,users:team });
    projectDs.setData( [...projectDs.data,newProject] );
  }
  const update = async ()=>{

    const updatedProject = await projectDs.update(project.id,{ name: name,users:team });
    const updatedIndex = projectDs.data.findIndex((projectEl)=>projectEl.id === project.id);
    projectDs.setData( [...projectDs.data.slice(0,updatedIndex),updatedProject,...projectDs.data.slice(updatedIndex+1)] );
  }

  return (
    <>
      <Modal visible={true} isButtonEnabled={()=>name && team.length} setVisible={setShowForm} onSave={async () => project?update():create() }>
      <div className="mb-3">
        <label className="form-label d-flex">Project Name <div className='text-danger ms-1'>*</div></label>
        <CFormInput onChange={e => setName(e.target.value)} value={name} type="text" placeholder="Project Name" aria-label="default input example" />
        </div>
        <div className="mb-3">
        <label className="form-label d-flex">Team <div className='text-danger ms-1'>*</div></label>
        {!userDs.loading && 
        <CListGroup> 
          <CRow>
        {userDs.data.map((user) =>{ const defaultChecked = team.includes(user.id); return <CCol lg={6} key={user.id}>
    <CFormCheck  label={user.name} onChange={(e)=>{userChange(user.id,e.target.checked)}} defaultChecked={defaultChecked}  />
  </CCol>})}
  </CRow>
</CListGroup>
        }
        </div>
      </Modal>
    </>
  )

}
export {ProjectForm}