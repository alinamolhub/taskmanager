import {createContext } from 'react'


const colsNames = {
    TODO: 0,
    In_progress: 1,
    Testing: 2,
    Done: 3
  }
  const cols = [
    { id: 0, name: "To Do" },
    { id: 1, name: "In progress" },
    { id: 2, name: "Testing" },
    { id: 3, name: "Done" }
  ];
  const taskContext = createContext();
  const taskTimerContext = createContext();
  export {colsNames,cols,taskContext,taskTimerContext};