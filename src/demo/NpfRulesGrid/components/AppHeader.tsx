import { ReactElement } from 'react'
import { Grid } from 'Components/Grid'
import { HeaderNav } from 'Components/HeaderNav'
import { Logo } from 'Components/Logo'
import { UserMenu } from 'Components/UserMenu'

const AppHeader = (): ReactElement => {
  return (
    <Grid
      templateColumns="max-content 1fr max-content"
      gap="xlarge"
      alignItems="center"
    >
      <Logo prefix="МПК" />
      <HeaderNav>
        <HeaderNav.Item>Результаты контроля</HeaderNav.Item>
        <HeaderNav.Item>Уведомления</HeaderNav.Item>
        <HeaderNav.Item active>Показатели контроля</HeaderNav.Item>
        <HeaderNav.Item>Портфели</HeaderNav.Item>
      </HeaderNav>
      <UserMenu fullName="Иванов Константин Сергеевич" />
    </Grid>
  )
}

export default AppHeader
