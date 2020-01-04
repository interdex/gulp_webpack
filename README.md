# Wonder Starter 3.0

## Особенности сборки
* Интеграция с балдлером [Webpack](https://webpack.js.org/) для наилучшего опыта написания кода
* Интеграция с препроцессором [Sass](https://sass-lang.com/) в синтаксисе .scss
* Интеграция с постпроцессором [PostCSS](https://postcss.org/)
* Интеграция с линтером [ESLint](https://eslint.org/) c конфигом [airbnb-base](https://github.com/airbnb/javascript) – как наиболее популярное и стабильное решиние.
* Интеграция с [TypeScript](https://www.typescriptlang.org/) для любителей строгой типизации
* Интеграция с литером [Stylelint](https://stylelint.io/) c конфигами [stylelint-config-standard](https://www.npmjs.com/package/stylelint-config-standard) и [stylelint-config-recess-order](https://www.npmjs.com/package/stylelint-config-recess-order)
* Интеграция с библиотекой миксинов [WonderCSS](https://github.com/m4n1ac47/gulp_webpack/blob/master/src/scss/mixins/_wonder.scss)
* Интеграция с библиотекой [SmartGrid](https://github.com/dmitry-lavrik/smart-grid)
* **source-map** для Javascript, TypeScript и Sass в режиме **development** для отладки.
* Минификация стилей и скриптов в режиме **production**
* Добавление вендорных префиксов в режиме **production**
* Сортировка медиа-запросов в режиме **production**
* Слияние одинаковых медиа-запросов в режиме **production**
* Очистка лишнего css-кода в режиме **production**
* Поддержка алиасов '@' и '~', для директории './src'
* Поддержка кэширования во время разработки
* Поддержка шаблонизации HTML
* pre-commit хуки для [ESLint](https://eslint.org/) и [Stylelint](https://stylelint.io/)

## Необходимые зависимости
1. [NodeJS](https://nodejs.org) — JavaScript runtime built on Chrome's V8 JavaScript engine.
1. [Yarn](https://yarnpkg.com/en) — пакетный менеджер
1. [Git](https://git-scm.com) — система контроля версий

## Установка
1. Клонировать сборку при помощи GIT или скачать архив [Download ZIP](https://github.com/m4n1ac47/gulp_webpack/archive/master.zip)
1. В корневой директории ввести в терминале — **yarn**, чтоб установить необходимые зависимости.  
Если [Yarn](https://yarnpkg.com/en) не установлен, ввести — **npm i**
1. Done **:D**

## Команды
| Yarn                   | NPM                  |                                        |
| -------------          | ---------------      | -------------                          |
| **gulp**               | **gulp**             | запуск в режиме **development**        |
| **gulp clean**         | **gulp clean**       | очистить директорию сборки             |
| **yarn build**         | **npm run build**    | запуск в режиме **production**         |
| **yarn lint**          | **npm run lint**     | проверка кода с помощью ESLint         |
| **yarn lint:fix**      | **npm run lint:fix** | автофикс кода с помощью ESLint         |
| **yarn stylelint**     | **npm run lint:fix** | проверка стилей с помощью Stylelint    |
| **yarn stylelint:fix** | **npm run lint:fix** | автофикс стилей с помощью Stylelint    |