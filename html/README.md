# IBT Frontend Project

## Проект

Проект разработан на фреймворке Vue v2.6.10.
Внедрено SSR(server-side rendering), SPA(single-page application), PWA(progressive web app).
Приложение на стеке технологий:

-   Babel
-   vue-loader (для однофайловых компонентов)
-   postcss-loader (для postcss обработки стилей)
-   svg-sprite-loader (для svg спрайтов)
-   vue (framework проекта)
-   vuex (технология для хранения данных на странице, разделено на модули)
-   vue-router (роутер SPA для vue)
-   vuelidate (валидация)
-   lazysizes (отложенная работа с изображениями)
-   pdfjs-dist (для отображения PDF файлов)

Ассеты сжимаются в .gz(.br) и добавлены source-map.

Используется семантическая верстка и aria атрибуты, для повышения accessability приложения.
Поддерживается IE 11. (на момент 09.08.2019)

## Установка

Должны быть установлены глобально:

1. node.js - https://nodejs.org/en/
2. yarn - https://yarnpkg.com/en/

```bash
# устанавливаем зависимости
yarn install

# собираем сборку
yarn rebuild

# запуск сервера в production сборке
yarn start

# запуск сервера в dev сборке (webpack-dev-server)
yarn dev

```

## Архитектура приложения

<img width="973" alt="screen shot 2016-08-11 at 6 06 57 pm" src="https://cloud.githubusercontent.com/assets/499550/17607895/786a415a-5fee-11e6-9c11-45a2cfdf085c.png">

**Более подробная информация [тут](https://ssr.vuejs.org).**

## Пакетный менеджер

На проекте используется пакетный менеджер **yarn** - все зависимости ставятся через него, и сохраняются в package.json. Файл yarn.lock лежит в репозитории и хранит информацию по загружаемым пакетам.

Зависимости, используемые исключительно при разработке, т.е. всё, что относится к dev-среде, например инструменты для сборки, сохраняются в devDependencies. devDependencies не попадают в production. В dependencies же напротив прописываются зависимости, идущие в production - это, к примеру, библиотеки для компонентов страницы. Соответственно чем их меньше, тем лучше.

Установка внешнего модуля с сохранением в dependencies:

```bash
yarn add <имя модуля>
```

Установка внешнего модуля с сохранением в devDependencies:

```bash
yarn add -D <имя модуля>
```

## Список скриптов проекта

Запуск команд осуществляется через npm-скрипты. Список скриптов определяется в package.json в поле scripts. Для запуска скрипта использовать синтаксис:

```bash
yarn <имя скрипта>
```

-   **dev** - Запускает development-сборку и стартует сервер;
-   **start** - Старт сервера с production-сборкой;
-   **start:host** - Старт сервера с production-сборкой, хост через переменные окружения в файле .env.json;
-   **rebuild** - Запускает production-сборку серверной и клиентской частей;
-   **build:client** - Запускает production-сборку клиентской части;
-   **build:server** - Запускает production-сборку серверной части;
-   **analyze** - Запускает production-сборку клиентской части и запускает webpack-bundle-analyzer;
-   **eslint** - Запускает eslint для фикса и проверки .js файлов;
-   **stylelint** - Запускает eslint для фикса и проверки .css файлов;
