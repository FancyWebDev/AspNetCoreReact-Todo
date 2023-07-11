import React, { ChangeEvent, forwardRef, ReactElement, useEffect, useState, useImperativeHandle } from 'react'
import { IToDoDto, Props, Ref } from '@/services/interfaces'
import { Button, Col, Form, FormGroup, Input, Label, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap'
import { ToDoPriority, ToDoStatus } from '../../services/enums'
import { create, update } from '../../services/todoRequestService'
import { TodoPriorities, TodoStatuses } from '../../services/constants'

const ToDoModal = forwardRef<Ref, Props>(({ _todo , onUpdate}, ref) => {
  const [todo, changeToDo] = useState<IToDoDto>({
    title: '',
    description: '',
    status: ToDoStatus.ToDo,
    priority: ToDoPriority.None
  })

  const [open, setOpen] = useState<boolean>(false)

  useImperativeHandle(ref, () => ({
    toggle(todo?: IToDoDto): void {
      if (todo)
        changeToDo(todo)
      toggle()
    }
  }))

  const createTodo = (todo: IToDoDto): void => {
    create(todo)
      .then(_ => {
        if(onUpdate)
          onUpdate()
      })

    toggle()
  }

  const editTodo = (todo: IToDoDto): void => {
    update(todo)
      .then(_ => {
        if(onUpdate)
          onUpdate()
      })
    toggle()
  }

  const toggle = (): void => setOpen(!open)

  useEffect(() => {
    if (_todo)
      changeToDo(_todo)
  }, [_todo, todo])

  const setStatus = (event: ChangeEvent<HTMLInputElement>): void => {
    const index = TodoStatuses.indexOf(event.target.value)

    changeToDo(prevState => ({
      ...prevState,
      status: index
    }))
  }

  const setPriority = (event: ChangeEvent<HTMLInputElement>): void => {
    const index = TodoPriorities.indexOf(event.target.value)
    changeToDo(prevState => ({
      ...prevState,
      priority: index
    }))
  }

  const statusContent = (): ReactElement[] => {
    return TodoStatuses.map(status =>
      <option key={ status }>
        { status }
      </option>
    )
  }

  const setTitle = (event: ChangeEvent<HTMLInputElement>): void => {
    changeToDo(prevState => ({
      ...prevState,
      title: event.target.value
    }))
  }

  const setDescription = (event: ChangeEvent<HTMLInputElement>): void => {
    changeToDo(prevState => ({
      ...prevState,
      description: event.target.value
    }))
  }

  const priorityContent = (): ReactElement[] => {
    return TodoPriorities.map(priority =>
      <option key={ priority }>
        { priority }
      </option>
    )
  }

  return (
    <Modal isOpen={ open }>
      <ModalHeader toggle={ toggle }>Modal title</ModalHeader>
      <ModalBody>
        <Form>
          <FormGroup row>
            <Label
              for="title"
              sm={ 2 }
            >
              Title
            </Label>
            <Col sm={ 10 }>
              <Input
                id="title"
                name="title"
                placeholder="title"
                type="text"
                value={ todo.title }
                onChange={ setTitle }
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label
              for="description"
              sm={ 2 }
            >
              Description
            </Label>
            <Col sm={ 10 }>
              <Input
                id="description"
                name="text"
                type="textarea"
                value={ todo.description }
                onChange={ setDescription }
              />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label
              for="status"
              sm={ 2 }
            >
              Select
            </Label>
            <Col sm={ 10 }>
              <Input
                id="status"
                name="status"
                type="select"
                value={ TodoStatuses[todo.status!] }
                onChange={ setStatus }
              >
                { statusContent() }
              </Input>
            </Col>
          </FormGroup><FormGroup row>
          <Label
            for="status"
            sm={ 2 }
          >
            Select
          </Label>
          <Col sm={ 10 }>
            <Input
              id="exampleSelect"
              name="select"
              type="select"
              value={ TodoPriorities[todo.priority] }
              onChange={ setPriority }
            >
              { priorityContent() }
            </Input>
          </Col>
        </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button
          color="primary"
          onClick={ todo.id ?
            () => editTodo(todo) :
            () => createTodo(todo) }
        >
          { todo.id === undefined ? 'Create' : 'Apply changes' }
        </Button>{ ' ' }
        <Button color="secondary" onClick={ toggle }>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  )
})

export default ToDoModal