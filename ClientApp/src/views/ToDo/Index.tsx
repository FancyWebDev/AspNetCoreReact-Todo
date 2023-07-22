import React, { useEffect, useState } from 'react'
import { getAll, IToDo } from 'services'
import { ToDoList } from './ToDoList'
import { ToDoContext } from 'components/ToDoContext'

const Index: React.FC = () => {
  const [todoItems, setTodoItems] = useState<Array<IToDo>>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [update, setUpdate] = useState<boolean>(true)
  const [searchTerm, setSearchTerm] = useState<string>('')

  useEffect(() => {
    if (update === false) return

    getAll()
      .then(data => {
        setTodoItems(data)
        setLoading(false)
        setUpdate(false)
      })
  }, [update])

  return (
    <div>
      { loading ?
        <div>
          Loading...
        </div>
        :
        <ToDoContext.Provider
          value={ {
            todoItems,
            searchTerm,
            setUpdate,
            setTodoItems,
            setSearchTerm,
          } }>
          <ToDoList/>
        </ToDoContext.Provider>
      }
    </div>
  )
}

export default Index