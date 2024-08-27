import React, { useState, useEffect, useContext, useRef, memo } from 'react'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider, useDrag, useDrop } from 'react-dnd'
import {

  CRow,
  CSpinner,
  CCard,

  CCardHeader,
  CCol,


} from '@coreui/react'


const KanbanContext = React.createContext();


const KanbanElement = ({ kitem, index }) => {
  const { cardContent, dragedIf } = useContext(KanbanContext);
  const ref = useRef(null)
  const [, dragRef] = useDrag({
    type: "box",
    item: kitem,
    collect: (monitor) => {

    },
    canDrag: (monitor) => {
      return dragedIf(kitem);
    }

  });
  const [, dropRef] = useDrop({
    accept: "box",
    drop: (droppedItem) => {
      droppedItem.droppedOn = kitem.id;

    },
    collect: (monitor) => {

    }
  });
  dragRef(dropRef(ref));
  if(kitem.empty)
    return <CCard color="white">
    <CCardHeader className='d-flex align-items-center'><CSpinner color="primary" variant="grow" /></CCardHeader>
  </CCard>;
  const content = cardContent(kitem);
  return (<div ref={ref}>{content}</div>);
}
/** */
const getReplacedDataSet = (item,column,currentDataSet)=>{
  let newData = currentDataSet.map((kitem) => {
    return {...kitem,...{dropped:false,reodered:false}};
  });
  let droppedIndex = newData.findIndex((kitem) => kitem.id === item.id);
  newData[droppedIndex] = {...newData[droppedIndex],...{dropped:true,column:column}};
  let droppedOnIndex = 0;
  if (item.droppedOn && item.column === column) {
    droppedOnIndex = newData.findIndex((kitem) => kitem.id === item.droppedOn);
    newData[droppedOnIndex].reodered = true;
    if (droppedOnIndex > droppedIndex && item.column !== column)
      droppedOnIndex--;
    newData.splice(droppedOnIndex, 0, newData.splice(droppedIndex, 1)[0]);
  }
  else{

  }
  newData.filter((task)=>
    task.id !== item.id
  ).push(item);
  
  return newData.map((kitem, index) => { kitem.order = index; return kitem; });
}

const KanbanColumn = ({ column, items }) => {
  const { ds, onReplace, setDs } = useContext(KanbanContext);
  const [loading,setLoading] = useState(false); 
  const ref = useRef(null)

  const [, dropRef] = useDrop({
    accept: "box",
    drop:async (item) => {

      let upData = ds;
      if(item.column !==column ){

      setDs(ds.filter((task)=>
        task.id !== item.id
      ));
        
      setLoading({item:{...item,...{column:column}}});
      upData = await onReplace(item, column);
      setLoading(false);
      
      }
      setDs(getReplacedDataSet(item,column,upData));

    },
    hover: (item, monitor) => {

    }
  });
  dropRef(ref); 
  let renderItems = [...items];
  if(loading){
      renderItems.push(loading.item);
  }
    
  return <CCol ref={ref} className='p-3 bg-light text-center'>
    
    {renderItems.map((item, index) => <KanbanElement index={index} key={item.id} kitem={item} />)}
  </CCol>
};
const KanbanGroup = ({ group,groupFilter }) => {
  const { ds, groupName, cols, columnField } = useContext(KanbanContext);
  const getColIitems = (colId, group) => {

    return ds.filter((kbox) => {
      return kbox[columnField] === colId && groupFilter(kbox, group);
    });
  }
  const getGroupLength = (group) => {
    return ds.filter((kbox) => {
      return groupFilter(kbox, group);
    }).length;
  }
  if (getGroupLength(group) > 0)
    return <>
      <CRow className='gap-2 mt-2 mb-2'>
        <CCol className='col bg-light ps-2 text-info fw-bold'>{groupName(group)}</CCol></CRow>
      <CRow className='gap-2'>
        {cols.map((col) => <KanbanColumn key={col.id} column={col.id} columnName={col.name} items={getColIitems(col.id, group)} />)}
      </CRow>
    </>;
  else
    return <></>;
}

const KanbanBoard = memo(({ groupsList = [], groupFilter =()=>true, groupName=()=>"", dragedIf, onReplace, columnField, cols, cardContent, data, setData}) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <KanbanContext.Provider value={{ cols, columnField, groupsList, groupFilter, groupName, dragedIf, onReplace, cardContent, ds:data, setDs:setData}}>
        <CRow className='mb-3 gap-2'>{cols.map((col) => <CCol className='bg-light fw-bold text-center pb-2 pt-2' key={col.id}>{col.name}</CCol>)}</CRow>
        {groupsList.map((group) => <KanbanGroup groupFilter={groupFilter} group={group} key={groupName(group)} />)}
      </KanbanContext.Provider>
    </DndProvider>
  )
})
export { KanbanBoard };

