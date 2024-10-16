import React from 'react'


import {
  CCloseButton,
  CSidebar,
  CSidebarBrand,
  CSidebarFooter,
  CSidebarHeader,
  CSidebarToggler,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

import { AppSidebarNav } from './AppSidebarNav'
import { useLayoutContext } from '../../contexts/layout-context'


// sidebar nav config

import navigation from '../../_nav'


const AppSidebar = () => {
 

  const {sidebarShow,setSidebarShow,unfoldable,setUnfoldable} = useLayoutContext();
  return (
    <CSidebar
      className="border-end"
      colorScheme="dark"
      position="fixed"
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        setSidebarShow(visible)
      }}
    >
      <CSidebarHeader className="border-bottom justify-content-center">
        <CSidebarBrand></CSidebarBrand>
        <CCloseButton
          className="d-lg-none "
          dark
          onClick={() => setSidebarShow(false) }/>
      </CSidebarHeader>
      <AppSidebarNav items={navigation} />
      <CSidebarFooter className="border-top d-none d-lg-flex">
        <CSidebarToggler
          onClick={() => setUnfoldable(!unfoldable)}
        />
      </CSidebarFooter>
    </CSidebar>
  )
}

export default React.memo(AppSidebar)
