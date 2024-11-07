import React from 'react'

import type { Decorator } from '@storybook/react'

export const WithTheme: Decorator = (Story, context) => {
  const globalTheme = context.globals.theme

  if (globalTheme === 'dark') {
    document.body.classList.add('inf-ui-theme-dark')
  } else {
    document.body.classList.remove('inf-ui-theme-dark')
  }

  return (
    <div
      className={`theme-provider inf-ui-theme-${globalTheme}`}
      style={{
        height: '100%',
        width: '100%'
      }}
    >
      <Story {...context} />
    </div>
  )
}
