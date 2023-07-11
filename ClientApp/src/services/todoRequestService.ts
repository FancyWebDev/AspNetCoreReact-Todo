import { IToDo, IToDoDto } from "@/services/interfaces"

export async function getAll(): Promise<Array<IToDo>> {
  const response = await fetch('ToDo')
  console.log(response)
  let data = await response.json()
  console.log(data)
  return data
}

export async function get(id: number): Promise<IToDo> {
  const response = await fetch(`ToDo/${ id }`)
  return await response.json()
}

export async function create(todo: IToDoDto): Promise<Response> {
  return await fetch('ToDo', {
    method: 'POST',
    body: JSON.stringify(todo),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  })
}

export async function update(todo: IToDoDto): Promise<Response> {
  return await fetch(`ToDo/${ todo.id }`, {
    method: 'PUT',
    body: JSON.stringify(todo),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  })
}

export async function remove(todo: IToDoDto): Promise<Response> {
  return await fetch(`ToDo/${ todo.id }`, {
    method: 'DELETE',
    body: JSON.stringify(todo),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    }
  })
}