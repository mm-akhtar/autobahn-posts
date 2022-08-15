import React from 'react'
import MainNavigaton from './MainNavigation'
import classes from './Layout.module.css'

type Props = {
  children: React.ReactNode
}

function Layout(props: Props) {
  return (
    <React.Fragment>
      <MainNavigaton />
      <main className={classes.main}>
        {props.children}
      </main>
    </React.Fragment>
  )
}

export default Layout