<p style="text-align: center" align="center">
<img src="src/components/Logo/assets/logo-full.svg" alt="">
</p>

<h1 align="center" style="text-align: center">UI-библиотека React-компонентов Инфинитум</h1>

## Установкаа

1. Создаем в корне проекта файл `.npmrc` с содержимым:

```text
@infinitum-frontend:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=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
```

2. Устанавливаем пакет

```text
npm i @infinitum-frontend/ui-components
```

3. Добавляем в глобальные стили/рутовый компонент стили библиотеки `import '@infinitum-frontend/ui-components/dist/style.css'`

4. Для корректной работы необходимо добавить поддиректорию fonts внутрь директории со статичными файлами шрифты из библиотеки.

Лежать шрифты будут по адресу: node_modules/@infinitum-ui/ui-components/dist/fonts

Для проекта на вит необходимо установить пакет https://www.npmjs.com/package/vite-plugin-static-copy
Для vite 4 - версия 0.17.0
Для vite 5 - последняя версия.

После установки в vite.config конечного проекта необходимо:

- импортировать плагин `import { viteStaticCopy } from 'vite-plugin-static-copy`
- добавить следующий код в секцию `plugins`

```typescript
viteStaticCopy({
  targets: [
    {
      src: [
        'node_modules/@infinitum-ui/ui-components/dist/fonts/Circe-Bold.woff2',
        'node_modules/@infinitum-ui/ui-components/dist/fonts/Circe-Regular.woff2'
        // И другие шрифты, если требуются
      ],
      dest: fonts
    }
  ]
})
```

Сбилдить конечный проект, убедиться, что в dist/fonts присутствуют указанные шрифты.

## Использование

Пример использования компонента:

```typescript jsx
import { Button } from '@infinitum-frontend/ui-components'

function App() {
  return <Button>Кнопка</Button>
}
```

## Публикация новой версии с помощью Github Actions

1. Переключиться на ветку main `git checkout origin/main && git pull`
2. `npm i`
3. Поднять версию пакета `npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git] -m "Bump to: %s"`. Команда автоматически создаст тег с соответствующей версией
4. Запушить изменения вместе с тегами `git push`, `git push --tags`
5. Перейти на страницу тега в Github и создать из него релиз
6. После создания релиза в Github Actions автоматически запустится пайплайн на публикацию пакета в Github Package Registry

## Публикация новой версии вручную

1. `git checkout origin/main && git pull`
2. `npm i`
3. `npm version [<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git] -m "Bump to: %s"`
4. `npm run build`
5. `npm publish`
6. `git push`
7. `git push --tags`

## Установка конфига для публикации для публикации вручную

```text
npm config set @infinitum-frontend:registry=https://npm.pkg.github.com/

npm config set //npm.pkg.github.com/:_authToken={github_access_token}
```
