import React, { useState, useEffect, createRef, useContext} from 'react'
import Create from 'components/ToDo/ToDoModal'
import Edit from 'components/ToDo/ToDoModal'
import { IToDo, Ref } from 'services/interfaces'
import { remove } from 'services/todoRequestService'
import { Button } from 'reactstrap'
import ToDoItem from 'components/ToDo/ToDoItem'
import SearchToDo from 'components/ToDo/SearchToDo'
import { ToDoContext } from 'components/ToDoContext'

export const ToDoList: React.FC = () => {
  const [filteredTodoItems, setFilteredTodoItems] = useState<Array<IToDo>>([])
  const { todoItems, setUpdate, searchTerm } = useContext(ToDoContext)
  const createModal = createRef<Ref>()
  const editModal = createRef<Ref>()

  useEffect(() => {
    filter()
  }, [searchTerm, todoItems])

  const toggleCreateModal = (): void => createModal.current!.toggle()

  const toggleEditModal = (todo: IToDo): void => editModal.current!.toggle(todo)

  const removeTodo = (todo: IToDo): void => {
    remove(todo)
      .then(_ => setUpdate(true))
  }

  const updateList = (): void => setUpdate(true)

  const onSearchChange = (): Array<IToDo> => {
    if (searchTerm.length === 0)
      return todoItems

    return todoItems.filter(todo => {
      return todo.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
    })
  }

  const filter = (): void => {
    setFilteredTodoItems(onSearchChange())
  }

  return (
    <main>
      <SearchToDo />
      <table className="table table-striped" aria-labelledby="tableLabel">
        <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Description</th>
          <th>Status</th>
          <th>Priority</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        </thead>
        <tbody>
        { filteredTodoItems.map((todo, number) =>
          <ToDoItem
            key={ todo.id }
            todo={ todo }
            number={ number }
            removeTodo={ removeTodo }
            toggleEditModal={ toggleEditModal }/>
        ) }
        <Edit ref={ editModal } onUpdate={ updateList }/>
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <Button className="justify-content-center" color="success" onClick={ toggleCreateModal }>
          Create
        </Button>
      </div>
      <Create ref={ createModal } onUpdate={ updateList }/>
    </main>
  )
}