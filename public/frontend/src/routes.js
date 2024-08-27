import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const Tasks = React.lazy(() => import('./views/Tasks/Tasks'))
const Team = React.lazy(() => import('./views/Team/Team'))
const Roles = React.lazy(() => import('./views/roles/Roles'))
const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path:"project/:projectId",element: Tasks},
  { path: '/team', name: 'Team', element: Team },
  { path: '/roles', name: 'Team', element: Roles ,perms:"view roles"}
]

export default routes
