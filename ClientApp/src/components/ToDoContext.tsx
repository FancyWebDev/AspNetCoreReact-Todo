import { createContext } from 'react'
import { IToDoContextProps } from 'services'


export const ToDoContext = createContext<IToDoContextProps>({
  todoItems: [],
  searchTerm: '',
  setTodoItems(): void {},
  setUpdate(): void {},
  setSearchTerm(): void {}
})