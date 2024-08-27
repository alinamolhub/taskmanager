import React, { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import {
  CContainer,
  CHeader,
  CHeaderNav,
  CHeaderToggler
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
  cilMenu
} from '@coreui/icons'

import AppBreadcrumb from './AppBreadcrumb'
import { AppHeaderDropdown } from './header'
import { useLayoutContext } from '../../contexts/layout-context'
import { useAuthContext } from '../../contexts/auth-context'
const AppHeader = () => {
  const { logout } = useAuthContext();
  const {sidebarShow,setSidebarShow,unfoldable,setUnfoldable} = useLayoutContext();

  return (
    <CHeader position="sticky" className="mb-4 p-0">
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => {setSidebarShow(!sidebarShow);setUnfoldable(false)}}
          style={{ marginInlineStart: '-14px' }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
  

        <CHeaderNav>
        <AppHeaderDropdown />
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <li className="nav-item py-1 d-flex align-items-center"><a role="button" onClick={logout}>Logout</a></li>
          
        </CHeaderNav>
      </CContainer>
      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  )
}

export default AppHeader
