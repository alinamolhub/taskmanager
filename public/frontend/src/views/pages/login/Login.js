import { React,useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { useAuthContext } from '../../../contexts/auth-context';

const Login = () => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {login,error} = useAuthContext();
 
  const handleLogin = async  ( event ) => {
    event.preventDefault();
    login({email,password});
  }
  return (
  
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={4}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Sign In to your account</p>
                    <CAlert color="light">
                      admin@mail.com/password,
                      pm@mail.com/password,
                      dev@mail.net/password
                    </CAlert>
                    {error && <CRow><CAlert color="danger">{error}</CAlert></CRow>}
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput onChange={(e) => setEmail(e.target.value)} value={email} placeholder="Email" autoComplete="username" />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password" 
                        name="password" onChange={(e) => setPassword(e.target.value)} value={password}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton onClick={handleLogin} color="primary" className="px-4">
                          Login
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
