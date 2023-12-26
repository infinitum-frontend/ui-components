<p style="text-align: center" align="center">
<img src="src/components/Logo/assets/logo-full-no-caption.svg" alt="">
</p>

<h1 align="center" style="text-align: center">UI-библиотека React-компонентов Инфинитум</h1>

## Установка

1. Создаем в корне проекта файл `.npmrc` с содержимым:

```text
@infinitum-frontend:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=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
```

2. Устанавливаем пакет

```text
npm i @infinitum-frontend/ui-components
```

3. Добавляем в глобальные стили/рутовый компонент стили библиотеки `import '@@infinitum-frontend/ui-components/dist/style.css'`
4. Добавляем типы в `tsconfig.json` в секцию `include`: `"node_modules/@@infinitum-frontend/ui-components/types"`

## Использование

Пример использования компонента:

```typescript jsx
import { Button } from '@infinitum-frontend/ui-components'

function App() {
  return <Button>Нажми на меня</Button>
}
```

## Установка конфига для публикации

```text
npm config set @infinitum-frontend:registry=https://npm.pkg.github.com/

npm config set //npm.pkg.github.com/:_authToken={github_access_token}
```

## Публикация новой версии

1. `git checkout origin/main && git pull`
2. `npm i`
3. `npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git] -m "Bump to: {new_version}`
4. `npm run build`
5. `npm publish`
6. `git push`
