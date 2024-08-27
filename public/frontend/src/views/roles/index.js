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
    }
]

const roleContext = createContext();
export {columns,roleContext};