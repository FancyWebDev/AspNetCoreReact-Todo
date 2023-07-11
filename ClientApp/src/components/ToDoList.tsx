import React, { useState, useEffect, createRef } from 'react'
import Create from './ToDo/ToDoModal'
import Edit from './ToDo/ToDoModal'
import { IToDo, Ref } from '@/services/interfaces'
import { getAll, remove } from '../services/todoRequestService'
import { Button } from 'reactstrap'
import { ToDoPriority, ToDoStatus } from '../services/enums'

export const ToDoList: React.FC = () => {
  const [todoItems, setTodoItems] = useState<Array<IToDo>>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [update, setUpdate] = useState<boolean>(true)

  const createModal = createRef<Ref>()
  const editModal = createRef<Ref>()

  useEffect(() => {
    if (update === false) return

    getAll()
      .then(data => {
        setTodoItems(data)
        setLoading(false)
        setUpdate(false)
      })
  }, [update])

  const toggleCreateModal = (): void => createModal.current!.toggle()

  const toggleEditModal = (todo: IToDo): void => editModal.current!.toggle(todo)

  const removeTodo = (todo: IToDo): void => {
    remove(todo)
      .then(_ => setUpdate(true))
  }

  const updateList = () => setUpdate(true)

  return (
    <div>
      { loading ?
        <div>
          Loading...
        </div>
        : renderTodos(todoItems) }
    </div>
  )

  function renderTodos(todoItems: IToDo[]) {
    return (
      <main>
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
          { todoItems.map((todo, number) =>
            <tr className="table-primary" key={ todo.id }>
              <td>{ number + 1 }</td>
              <td>{ todo.title }</td>
              <td>{ todo.description }</td>
              <td>{ ToDoStatus[todo.status] }</td>
              <td>{ ToDoPriority[todo.priority] }</td>
              <td>
                <Button color="primary" onClick={ () => toggleEditModal(todo) }>
                  Edit
                </Button>
              </td>
              <td>
                <Button color="danger" onClick={ () => removeTodo(todo) }>
                  Delete
                </Button>
              </td>
            </tr>
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
}