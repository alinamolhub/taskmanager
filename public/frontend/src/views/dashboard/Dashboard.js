import React, { useEffect, useState, useContext, createContext } from 'react'
import { Projects } from '../projects/projects'
import {
  CCol

} from '@coreui/react'



const Dashboard = () => {
  return (
    <>
      <CCol xs={12}>
        <Projects />
      </CCol>

    </>);

}

export default Dashboard
