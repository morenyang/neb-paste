/**
 * Created by morenyang on 2018/6/6.
 */
import React from 'react'
import {Navbar, NavbarBrand, Container} from 'reactstrap'
import style from './style.scss'

class NavigationBar extends React.Component {
  render() {
    return (
      <Navbar className={style.nav}>
        <Container>
          <NavbarBrand>
            Pasted
            <span className={style.navPowerBy}> on nebulas</span>
          </NavbarBrand>
        </Container>
      </Navbar>
    )
  }
}

export default NavigationBar
