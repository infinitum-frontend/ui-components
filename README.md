<p style="text-align: center" align="center">
<img src="src/components/Logo/assets/logo-full.svg" alt="">
</p>

<h1 align="center" style="text-align: center">UI-библиотека React-компонентов ГК Инфинитум</h1>

## Установка

1. Создаем в корне проекта файл `.npmrc` с содержимым:

```text
@vinderman:registry=https://gitlab.com/api/v4/projects/41846893/packages/npm/
//gitlab.com/api/v4/projects/41846893/packages/npm/:_authToken=glpat-Sq1hc1148qxeYZoQsugv
```

2. Устанавливаем пакет

```text
npm i @vinderman/ui-components
```

3. Добавляем в глобальные стили/рутовый компонент стили библиотеки `import '@vinderman/ui-components/dist/style.css'`
4. Добавляем типы в `tsconfig.json` в секцию `include`: `"node_modules/@vinderman/ui-components/types"`

## Использование

Пример использования компонента:

```typescript jsx
import { Button } from '@vinderman/ui-components'

function App() {
  return <Button>Нажми на меня</Button>
}
```

## Установка конфига для публикации

```text
npm config set @vinderman:registry=https://gitlab.com/api/v4/projects/41846893/packages/npm/

npm config set //gitlab.com/api/v4/projects/41846893/packages/npm/:_authToken={gitlab_access_token}
```

## Публикация новой версии

1. `git checkout origin/main && git pull`
2. `npm i`
3. `npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git] -m "Bump to: {new_version}`
4. `npm run build`
5. `npm publish`
6. `git push`
