import React from 'react'
import { Container } from 'reactstrap'
import NavMenu from './NavMenu'

const Layout: React.FC<{
  children: React.ReactNode
}> = (props) => {
  return (
    <div>
      <NavMenu/>
      <Container tag="main">
        { props.children }
      </Container>
    </div>
  )
}

export default Layout