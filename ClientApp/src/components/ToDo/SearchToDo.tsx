import React, { ChangeEvent, useContext } from 'react'
import { ToDoContext } from '../ToDoContext'
import { IToDoContextProps } from 'services'
import { Input } from 'reactstrap'

const SearchToDo: React.FC = () => {
  const { searchTerm, setSearchTerm } = useContext<IToDoContextProps>(ToDoContext)

  const onSearchChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(event.target.value.trim())
  }

  return (
    <div className="input-group d-flex justify-content-center">
      <Input
        className="mb-3"
        placeholder="type to search"
        value={ searchTerm }
        onInput={ onSearchChange }
      />
    </div>
  )
}

export default SearchToDo