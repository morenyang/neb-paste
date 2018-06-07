/**
 * Created by morenyang on 2018/6/6.
 */
import React from 'react'
import {Navbar, NavbarBrand, Container, NavItem, Nav} from 'reactstrap'
import style from './style.scss'
import {Link} from 'react-router-dom'

class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar className={style.nav}>
        <Container>
          <NavbarBrand>
            Pasted
            <span className={style.navPowerBy}> on nebulas</span>
          </NavbarBrand>
          <Nav navbar className={style.navBar}>
            <NavItem>
              <Link to={'/clipboard'} className={style.navLink}>
                Clipboard
              </Link>
            </NavItem>
            <NavItem>
              <Link to={'/pasted'} className={style.navLink}>
                Pasted
              </Link>
            </NavItem>
          </Nav>
        </Container>
      </Navbar>
    )
  }
}

export default NavigationBar
