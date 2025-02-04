import { Decorator } from '@storybook/react'
import React, { useEffect } from 'react'

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme

  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('inf-ui-theme-dark')
      document.body.classList.remove('inf-ui-theme-light')
    } else {
      document.body.classList.add('inf-ui-theme-light')
      document.body.classList.remove('inf-ui-theme-dark')
    }
  }, [theme])

  return <Story {...context} />
}

export default withTheme
