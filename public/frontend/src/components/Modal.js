import {React,useEffect,useState} from 'react'
import {
    CButton,
    CModal,
    CModalHeader,
    CModalBody,
    CModalFooter,
    CModalTitle
  } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import {
    cilPlus
} from '@coreui/icons'
export const Modal = ({visible,setVisible,onSave,children,title,isButtonEnabled=()=>true}) =>{
    return (
        <>
          <CModal
          scrollable size="xl"
            backdrop="static"
            visible={visible}
            onClose={() => setVisible(false)}
            aria-labelledby="StaticBackdropExampleLabel"
          >
            <CModalHeader>
              <CModalTitle id="StaticBackdropExampleLabel">{title}</CModalTitle>
            </CModalHeader>
            <CModalBody>
            {children}
            </CModalBody>
            <CModalFooter>
              <CButton color="secondary" onClick={() => setVisible(false)}>
                Close
              </CButton>
             {onSave && <CButton  disabled={!isButtonEnabled()} color="primary" onClick={async() => { if(!isButtonEnabled()) return; onSave();setVisible(false); } }>Save</CButton>} 
            </CModalFooter>
          </CModal>
        </>
    );
}