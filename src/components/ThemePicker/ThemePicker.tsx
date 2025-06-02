// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { ReactElement, useContext } from 'react'
import { Button } from 'Components/Button'
import { Tooltip } from 'Components/Tooltip'
import LightThemeIcon from 'Icons/sun.svg?react'
import DarkThemeIcon from 'Icons/moon.svg?react'
import { ThemePickerContext, ThemeVariant } from './context/ThemePickerProvider'

interface ThemePickerProps {
  onChange?: (theme?: ThemeVariant) => void
}

const ThemePicker = ({ onChange }: ThemePickerProps): ReactElement => {
  const { theme, toggleTheme } = useContext(ThemePickerContext)

  const handleChange = (): void => {
    toggleTheme?.()
    onChange?.(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Tooltip
      content={`Переключить на ${
        theme === 'light' ? 'темную' : 'светлую'
      } тему`}
      size="small"
    >
      <Button
        variant="ghost"
        icon={
          theme === 'light' ? (
            <DarkThemeIcon color="var(--inf-color-icon-primary)" />
          ) : (
            <LightThemeIcon color="var(--inf-color-icon-primary)" />
          )
        }
        onClick={handleChange}
      />
    </Tooltip>
  )
}

export default ThemePicker
