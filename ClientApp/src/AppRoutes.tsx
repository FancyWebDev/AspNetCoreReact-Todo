import React from 'react'
import Counter from './components/Counter'
import FetchData from './components/FetchData'
import { Home } from './components/Home'
import { UserList } from './components/UserList'
import { ToDoList } from './components/ToDoList'

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
    element: <ToDoList/>
  }
]

export default AppRoutes