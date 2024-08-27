import React, { memo,useState, useContext, createContext, useEffect, useMemo, useCallback } from 'react'
import { columns,roleContext } from '.'
import { useDataSource } from '../../hooks/useDataSource'
import {
    CTable, CTabs, CTabList, CTab, CTabContent, CTabPanel, CButton,
    CRow,
    CCol,
    CCard,
    CCardHeader,
    CCardBody,
    CFormInput,
    CListGroup,
    CFormCheck
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cilPlus,
    cilPen
} from '@coreui/icons'
import { Modal } from '../../components/Modal';

const RoleForm = ({ setVisible,role }) => {

    const [name ,  setName,] = useState(role?role.name:"");
    //const [email , setEmail ] = useState(user?user.email:"");
    const [ perms , setPerms ] = useState(role?role.permissions.map((perm) =>perm.id):[]);
    const {roleUpdate,roleData, permsData, roleCreate, permsCreate, roleSetData, permsSetData} = useContext(roleContext);
    const permsChange = (id,status)=>{
        if(status)
            setPerms([...perms,id]);
        else
        setPerms(perms.filter((perm) => perm!==id));
      }

    const createPerm = async() =>{
        const newRole = await roleCreate({name:name,perms:perms});
        roleSetData( [...roleData,newRole] )
    }
    const updateRole = async() =>{
        const updateRole = await roleUpdate(role.id,{name:name,perms:perms});
        
        roleSetData( [...roleData.filter((roleOb)=>
            roleOb.id !== role.id
        ),updateRole] );
    }
    return <Modal visible={true} setVisible={setVisible} onSave={async () => role ? updateRole():createPerm() }>
        <div className="mb-3">
            <label className="form-label">Name: {role && role.name}</label>
           {!role&& <CFormInput onChange={e => setName(e.target.value)} value={name} type="text"  aria-label="default input example" />}
        </div>
        <div className="mb-3">
            <label className="form-label">Perms</label>
            <CListGroup> 
          <CRow>
        {permsData.map((perm) =>{ const defaultChecked = perms.includes(perm.id); return <CCol lg={6} key={perm.id}>
    <CFormCheck  label={perm.name} onChange={(e)=>{permsChange(perm.id,e.target.checked)}} defaultChecked={defaultChecked}  />
  </CCol>})}
  </CRow>
</CListGroup>
        </div>

    </Modal>
}
const PermForm = ({ setVisible }) => {

    const [name ,  setName,] = useState("");

    const { permsData, permsCreate,  permsSetData} = useContext(roleContext);


    const createPerm = async() =>{
        const newPerm = await permsCreate({name:name});
        permsSetData( [...permsData,newPerm] )
    }

    return <Modal visible={true} setVisible={setVisible} onSave={async () => createPerm() }>
        <div className="mb-3">
            <label className="form-label">Name:</label>
           <CFormInput onChange={e => setName(e.target.value)} value={name} type="text"  aria-label="default input example" />
        </div>


    </Modal>
}


const EditRole = ({role}) =>{
    const [visible,setVisible] = useState(false);

    return <>{visible && <RoleForm role={role} setVisible={setVisible}/> }<CButton onClick={() => {setVisible(true)}} color="light"><CIcon className="me-2" icon={cilPen} size="sm" /></CButton></>;
}

const Roles = () => {

    const { data:roleData, loading:roleLoading, create:roleCreate, setData:roleSetData, update:roleUpdate } = useDataSource("roles");
    const { data:permsData, loading:permsLoading, create:permsCreate, setData:permsSetData, update:permsUpdate } = useDataSource("perms");

    
    const [roleVisible,setRoleVisible] = useState(false);
    const [permVisible,setPermVisible] = useState(false);

    const createItemsRoles = () => {return roleData.map((role, index) => {
        return {
            id:<EditRole role={role}/>,
            name: role.name
        }
    })};
    const createItemsPerms = () => {return permsData.map((role, index) => {
        return {
            id:index,
            name: role.name
        }
    })};


    return <roleContext.Provider value={{roleData,permsUpdate ,roleUpdate, permsData, roleCreate, permsCreate, roleSetData, permsSetData} }>
        {!roleLoading  &&
            <>
            {roleVisible && <RoleForm setVisible={setRoleVisible}/> }
            {permVisible && <PermForm setVisible={setPermVisible}/> }
            
            <CCard className="mb-4">
                <CCardHeader className='d-flex align-items-center'>
                    <CCol lg={6}><strong>Roles</strong></CCol>
                    <CCol lg={6} className="text-end"><CButton onClick={() => { setRoleVisible(true) }} color="primary"><CIcon className="me-2" icon={cilPlus} size="sm" />Add Role</CButton></CCol>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                    <CTable columns={columns} items={createItemsRoles()} />
                    </CRow>

                </CCardBody>
            </CCard>
            </>
            }
            {!permsLoading  &&
            <>
            <CCard className="mb-4">
                <CCardHeader className='d-flex align-items-center'>
                    <CCol lg={6}><strong>Permissions</strong></CCol>
                    <CCol lg={6} className="text-end"><CButton onClick={() => { setPermVisible(true) }} color="primary"><CIcon className="me-2" icon={cilPlus} size="sm" />Add Perm</CButton></CCol>
                </CCardHeader>
                <CCardBody>
                    <CRow>
                    <CTable columns={columns} items={createItemsPerms()} />
                    </CRow>

                </CCardBody>
            </CCard>
            
            
            </>
            }

            </roleContext.Provider>;

}
export default Roles;