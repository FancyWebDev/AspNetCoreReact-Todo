import React from 'react'
import Counter from './views/Counter'
import FetchData from './views/FetchData'
import { Home } from './views/Home'
import { UserList } from './views/UserList'
import ToDo from './views/ToDo/Index'

const AppRoutes = [
  {
    index: true,
    element: <Home/>
  },
  {
    path: '/counter',
    element: <Counter/>
  },
  {
    path: '/fetch-data',
    element: <FetchData/>
  },
  {
    path: '/user-list',
    element: <UserList/>
  },
  {
    path: '/todo',
    element: <ToDo/>
  }
]

export default AppRoutes