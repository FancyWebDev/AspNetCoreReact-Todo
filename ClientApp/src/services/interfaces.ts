export interface IToDoDto {
  id?: number,
  title: string
  description: string,
  priority: number,
  status: number
}

export interface IToDo {
  id: number,
  title: string
  description: string,
  priority: number,
  status: number
}

export interface IUser {
  id: number,
  userName: string | undefined,
  age: number,
  createdAt: string
}

export interface IForecast {
  id: number,
  summary: string,
  date: string,
  temperatureC: number,
  temperatureF: number
}

export type Ref = {toggle: (todo?: IToDo) => void}

export interface IProps {
  _todo?: IToDoDto,
  onUpdate?: () => void
}

export interface IToDoContextProps {
  todoItems: Array<IToDo>,
  setTodoItems: (todoItems: Array<IToDo>) => void,
  setUpdate: (update: boolean) => void,
  searchTerm: string
  setSearchTerm: (term: string) => void
}
