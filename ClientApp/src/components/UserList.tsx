import React, { Component } from "react"
import { IUser } from "@/services/interfaces"

export class UserList extends Component<any, { users: Array<IUser>, loading: boolean }> {
  constructor(props: any) {
    super(props)
    this.state = {
      users: [],
      loading: true
    }
  }

  componentDidMount() {
    this.getUserList()
      .then(data => {
        this.setState({ users: data, loading: false })
      })
  }

  render() {
    const { users, loading } = this.state

    let content = loading
      ? <p>Loading...</p>
      : this.renderUsers(users)

    return (
      <div>
        <h2>User list</h2>
        { content }
      </div>
    )
  }

  renderUsers(users: Array<IUser>) {
    return (
      <main>
        <table className="table table-striped" aria-labelledby="tableLabel">
          <thead>
          <tr>
            <th>Identity</th>
            <th>Username</th>
            <th>Age</th>
            <th>Created at</th>
          </tr>
          </thead>
          <tbody>
          { users.map(user =>
            <tr key={ user.createdAt }>
              <td>{ user.id }</td>
              <td>{ user.userName }</td>
              <td>{ user.age }</td>
              <td>{ user.createdAt }</td>
            </tr>
          ) }
          </tbody>
        </table>
      </main>
    )
  }

  async getUserList() {
    const response = await fetch('User')
    return await response.json()
  }
}