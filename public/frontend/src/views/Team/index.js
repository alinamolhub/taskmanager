import {createContext } from 'react'
const columns = [
    {
      key: 'id',
      label: '#',
      _props: { scope: 'col' },
    },
    {
      key: 'name',
      _props: { scope: 'col' },
    },
    {
      key: 'email',
      _props: { scope: 'col' },
    },
    {
      key: 'projects',
      label: 'Projects',
      _props: { scope: 'col' },
    }
]
const roles = [
  {id:1,name:"Project Managers"},
  {id:2,name:"Developers"},
  {id:3,name:"Admins"}
];
const teamContext = createContext();
export {columns,roles,teamContext};