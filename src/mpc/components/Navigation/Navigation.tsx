// import React from 'react';
// import { NavLink } from 'react-router-dom';

// import { useAccessControl } from '../../../AccessControl';

import styles from './Navigation.module.css'

import links from './enums/links'
import cn from 'classnames'

const Navigation = (props: {
  className?: string
  role?: string
}): JSX.Element => {
  const { className, role, ...attributes } = props

  return (
    <nav className={className} role={role} {...attributes}>
      <ul className={styles.list}>
        {links.map((link, index) => (
          <li key={link.to} className={styles.item}>
            <a
              className={cn(styles.link, {
                [styles.active]: index === 0
              })}
              href={link.to}
            >
              {link.title}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}
export default Navigation
