# VUEX: store - modules

- `
    В данном проекте для работы с модулями, помимо создания самого модуля, 
    нужно его вручную подключать на каждой странице где он будет использоваться
`
<br><br>
 *<strong>Например</strong>: компонент корзины внутри себя используется actions/getters/mapState из модуля catalog
таким образом vuex модуль каталога будет доступен на странице каталога (т.к уже подключен)
но если вывести компонент корзины на другой странице или внутри компонента который находится на другой странице
то будет ошибка - <strong>vuex module not found</strong>*
 
### Подключение модуля:
- `/store/modules/your-name-module` - создаем модуль
- в `/views/your-page-name/index.js` импортируем наш модуль
`const CatalogModuleAsync = () => import(/* webpackChunkName: "catalog-view" */ '@store/modules/Catalog');`
- там же в `/views/your-page-name/index.js`, добавляем в массиве `routes` по нужному пути (path) в `middleware`(массив)
наш модуль используя функцию `registerModule` - `registerModule(CatalogModuleAsync)`

После этого vuex модуль будет доступен на данной странице по указанному пути.
