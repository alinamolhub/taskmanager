import React, { memo,useState, useContext, createContext, useEffect, useMemo, useCallback } from 'react'
import { columns, roles,teamContext } from '.'
import { useDataSource } from '../../hooks/useDataSource'
import {
    CTable, CTabs, CTabList, CTab, CTabContent, CTabPanel, CButton,
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CFormInput,
    CFormSelect
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cilPlus,
    cilPen
} from '@coreui/icons'
import { Modal } from '../../components/Modal';
import { useAuthContext } from '../../contexts/auth-context';
const UserForm = ({ setVisible,user }) => {
    
    const [name ,  setName,] = useState(user?user.name:"");
    const [email , setEmail ] = useState(user?user.email:"");
    const [ role , setRole ] = useState(user?parseInt(user.role_id):"");
    const {data,create,update,setData} = useContext(teamContext);
    const createUser = async() =>{
        const newUser = await create({name:name,email:email,role_id:role});
  
        setData( [...data,newUser] )
    }
    const updateUser = async() =>{
        const updateUser = await update(user.id,{name:name,email:email,role_id:role});
        setData( [...data.filter((userOb)=>
            userOb.id !== user.id
        ),updateUser] );
    }
    return <Modal visible={true} setVisible={setVisible} onSave={async () => user ? updateUser():createUser() }>
        <div className="mb-3">
            <label className="form-label">User Name</label>
            <CFormInput onChange={e => setName(e.target.value)} value={name} type="text" placeholder="Project Name" aria-label="default input example" />
        </div>
        <div className="mb-3">
            <label className="form-label">Email</label>
            <CFormInput onChange={e => setEmail(e.target.value)} value={email} type="text" placeholder="Project Name" aria-label="default input example" />
        </div>
        <div className="mb-3">
        <label className="form-label">Role:</label>
        <CFormSelect value={role} size="sm" onChange={(e)=>{setRole(e.target.value);}}>
          <option>None</option>
 
          {roles.map((role)=>{ return <option key={role.id} value={role.id}>{role.name}</option>})}
        </CFormSelect>
      </div>
    </Modal>
}

const TeamGroup = memo(({ itemKey, items }) => {

    return <>
        <CTabPanel className="p-3 bg-white border border-light" itemKey={itemKey}>
            <CTable columns={columns} items={items} />
        </CTabPanel>
    </>;
});
const EditUser = ({user}) =>{
    const [visible,setVisible] = useState(false);

    return <>{visible && <UserForm user={user} setVisible={setVisible}/> }<CButton onClick={() => {setVisible(true)}} color="light"><CIcon className="me-2" icon={cilPen} size="sm" /></CButton></>;
}
const Team = () => {
    const {userCan}  = useAuthContext();
    const { data, loading, setLoading, create, setData, update, destroy } = useDataSource("users");
    const [visible,setVisible] = useState(false);
    const [currentTab,setCurrentTab] = useState(roles[0].name[0]);
    const createItems = (roleid) => {return data.filter((user) => parseInt(user.role_id) === roleid).map((user, index) => {
        return {
            id:userCan("update user")?<EditUser user={user}/>:index+1,
            name: user.name,
            email: user.email,
            projects: "test"
        }
    })};
    useEffect(()=>{
        if( !loading ){
         
        }
    },[data]);

    return <teamContext.Provider value={{ data, loading, setLoading, create, setData, update, destroy} }>
        {!loading &&
            <>
            {visible && <UserForm setVisible={setVisible}/> }
            <CCard className="mb-4">
                <CCardHeader className='d-flex align-items-center'>
                    <CCol lg={6}><strong>Team</strong></CCol>
                    <CCol lg={6} className="text-end">
                        {userCan("create user") && <CButton onClick={() => { setVisible(true) }} color="primary"><CIcon className="me-2" icon={cilPlus} size="sm" />Add User</CButton>}
                        
                    </CCol>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                        <CTabs onChange={(tab)=>{setCurrentTab(tab)}} activeItemKey={roles[0].name[0]}>
                            <CTabList variant="tabs">
                                {roles.map((tab) => <CTab key={tab.id} itemKey={tab.name[0]}>{tab.name}</CTab>)}
                            </CTabList>
                            <CTabContent>
                                {roles.map((tab) => {return tab.name[0]===currentTab && <TeamGroup key={tab.id} itemKey={tab.name[0]} items={createItems(tab.id)} />}
                                )}
                            </CTabContent>
                        </CTabs>
                    </CRow>

                </CCardBody>
            </CCard></>}

            </teamContext.Provider>

}
export default Team;