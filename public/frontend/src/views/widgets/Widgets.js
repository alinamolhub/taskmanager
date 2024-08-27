import React, {  useState,useEffect  } from 'react'
import classNames from 'classnames'

import { CRow, CCol, CCard, CCardTitle, CCardBody, CButton, CCardText, CForm, CFormLabel, CFormInput, CFormCheck } from '@coreui/react'
import { getStyle } from '@coreui/utils'
import { CChartBar, CChartLine } from '@coreui/react-chartjs'
import CIcon from '@coreui/icons-react'
import { cilArrowBottom, cilArrowTop, cilOptions, cilTrash } from '@coreui/icons'
export function Clock() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timerId = setInterval(() => setDate(new Date()), 1000);
    return () => {
      clearInterval(timerId);
    }
  }, []);
  return <>{date.toLocaleTimeString()}</>
  
}
function TodoItem({
  onDelete,
  onComplete,
  item,
 }) {
  const label = <p className={ item.completed?"text-decoration-line-through":"" }>{item.todo}</p>
  return (
    <CRow><CCol xs="auto"><CFormCheck className="text-decoration-line-through" checked={item.completed} xs="auto" onChange={() => onComplete(item)} inline id="inlineCheckbox1" value="option1" label={label}/><CIcon onClick={() => onDelete(item)} icon={cilTrash} /></CCol></CRow>
  );
 }
export function ToDoList() {

  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState('');
  const [todovalid,setTodovalid] = useState(true);

  useEffect(() => {
    if(todo)
      setTodovalid(true);
  }, [{}, todo])

  const addTodo = () => {
    if(todo){
      setTodos([...todos, { todo, completed: false }]);
      setTodo('');
    }
    else
    setTodovalid(false);

  };

  const deleteTodo = item => {
    setTodos(todos.filter(todo => todo !== item));
  };

  const completeTodo = item => {
    setTodos(
      todos.map(todo =>
        todo === item ? { ...todo, completed: !todo.completed } : todo

      )
    );
  };
  const inputClass = classNames({
		'is-invalid': !todovalid
	});
    return <><CRow>
    <CCol xs="9">
      <CFormInput className={inputClass} type="Text" id="inputPassword2" placeholder="Task" value={todo} onChange={e => setTodo(e.target.value)} />
    </CCol>
    <CCol xs="auto">
      <CButton onClick={addTodo} color="primary" type="submit" className="mb-3">
        Add
      </CButton>
    </CCol>
  </CRow>
  {todos.map((item, index) => (
        <TodoItem

          key={index}
          onDelete={deleteTodo}
          onComplete={completeTodo}
          item={item}
        />
      ))}
  </>
  
}