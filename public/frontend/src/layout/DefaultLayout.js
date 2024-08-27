import React,{  useEffect } from 'react'
import { AppContent } from '../components'
import { AppFooter} from '../components'
import {AppHeader} from '../components'
import {AppSidebar} from '../components'
import { LayoutProvider } from '../contexts/layout-context'
const DefaultLayout = () => {
  return (
    <div>
      <LayoutProvider>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        <AppFooter />
      </div>
      </LayoutProvider>
    </div>
  )
}

export default DefaultLayout
