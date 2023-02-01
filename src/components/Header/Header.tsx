// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, ComponentPropsWithoutRef } from 'react'
import logo from './assets/logo.svg'
// import Navigation from '../Navigation'
import './Header.scss'

export interface HeaderProps extends ComponentPropsWithoutRef<'header'> {}

const Header = (props: HeaderProps): ReactElement => {
  return (
    <header className="inf-header" role="menubar">
      <div className="inf-header__container">
        <img className="inf-header__logo" src={logo} alt="Инфинитум" />
        {/* <Navigation /> */}
        {/* {props.data.name.length > 0 && (
          <div className={styles.user} role="textbox">
            {props.data.name}
          </div>
        )} */}
      </div>
    </header>
  )
}

export default Header
