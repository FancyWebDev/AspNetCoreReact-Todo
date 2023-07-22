import React from 'react'
import { ToDoPriority, ToDoStatus } from 'services/enums'
import { Button } from 'reactstrap'
import { IToDo } from 'services/interfaces'

const ToDoItem: React.FC<{
  todo: IToDo,
  number: number,
  toggleEditModal: (todo: IToDo) => void,
  removeTodo: (todo: IToDo) => void
}> = ({ todo, number, toggleEditModal, removeTodo }) => {
  return (
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
  )
}

export default ToDoItem