import React, { Suspense, useState } from 'react'
import { Route, Routes,Navigate, Outlet  } from 'react-router-dom'


import { CSpinner } from '@coreui/react'
import './scss/style.scss'

import { useAuthContext } from './contexts/auth-context'
// Containers
const DefaultLayout = React.lazy(() => import('./layout/DefaultLayout'))

// Pages
const Login = React.lazy(() => import('./views/pages/login/Login'))
const Register = React.lazy(() => import('./views/pages/register/Register'))
const Page404 = React.lazy(() => import('./views/pages/page404/Page404'))
const Page500 = React.lazy(() => import('./views/pages/page500/Page500'))
const AuthLayout = () => {
  const { user } = useAuthContext();
  return user?<Outlet/>:<Navigate to="/login"/>;


}

const GuestLayout = () => {
  const { user } = useAuthContext();
  return user?<Navigate to="/"/>:<Outlet/>;
}
const App = () => {
  const { loading } = useAuthContext();
  return (
    <>
      {loading && <CSpinner color="primary" variant="grow" />}
      {!loading && <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route element={<GuestLayout/>}>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route exact path="/register" name="Register Page" element={<Register />} />
          </Route>
          <Route element={<AuthLayout/>}>
          <Route path="*" name="Home" element={<DefaultLayout />} />
          </Route>
          <Route exact path="/404" name="Page 404" element={<Page404 />} />
          <Route exact path="/500" name="Page 500" element={<Page500 />} />
          
          
          
        </Routes>
        
      </Suspense>}
      </>


  )
}

export default App
