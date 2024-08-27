import React,{useState,useContext,createContext,useEffect } from 'react'
import CIcon from '@coreui/icons-react'
import {
    cilCaretRight,
    cilMediaPause
} from '@coreui/icons'
import { convertSeconds } from '../../../helpers/helper'
import { taskContext } from '..'
import { taskTimerContext } from '..'
const TaskTimer = ({task}) => {
    const {update,setTasks,tasks} = useContext(taskContext);
    const {seconds,setSeconds,timerOn,setTimerOn} = useContext(taskTimerContext);
    

    const buttonHandler = async () =>{
        const timerStatus = !timerOn;

        if( !timerStatus ){
            const updatedTaskOb = await update(task.id,{timer_end:new Date()});
            setTasks({type:"update",updateTask:updatedTaskOb});
        }  
        else
            await update(task.id,{timer_start:new Date()});

            setTimerOn(!timerOn);
    }
    useEffect(() => {
        if(timerOn)
            setTimeout(()=>setSeconds(seconds+1),1000);
      }, [timerOn,seconds]);
    if(task.empty) 
        return <>---</>
    return <><div className="me-1"><CIcon  role="button" onClick={buttonHandler} width={20} height={20} icon={timerOn?cilMediaPause:cilCaretRight} customClassName="nav-icon" /></div>
        <div className='mt-1'>{convertSeconds(seconds)}</div></>;
}
export {TaskTimer};