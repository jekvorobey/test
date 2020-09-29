import widgetImage from '@images/mock/widgetImage.jpg';
import catalogBanner from '@images/mock/catalogBanner2.jpg';

const pagesData = {
    '/text-page': {
        breadcrumbs: [
            {
                id: 1,
                component: 'breadcrumbs-widget',
                data: {
                    url: '/text-page',
                    name: 'Текстовая страница',
                },
            },
        ],
        menu: [
            {
                id: 1,
                component: 'nav-widget',
                data: {
                    items: [
                        { url: '/text-page', name: 'Текстовая страница' },
                        { url: '/text-page-with-images', name: 'Текстовая страница с картинками' },
                        { url: '/text-page-without-menu', name: 'Текстовая страница без меню' },
                        { url: '/undefined-page', name: 'Несуществующая страница' },
                    ],
                },
            },
        ],
        main: [
            {
                id: 1,
                component: 'section-widget',
                data: {
                    children: [
                        {
                            id: 1,
                            component: 'html-text-widget',
                            data: {
                                content: `
                                <h1>Н1. Длинный заголовок типовой страницы</h1>
                                <p>Эта страница создана для демонстрации блоков и элементов, которые используются на сайте, и служит руководством для всех, кто работает над ним.
                                Дизайнеры и технологи отрабатывают здесь стили, чтобы добиться приемлемых результатов в различных сочетаниях блоков и элементов.
                                Контент-менеджеры и редакторы используют страницу в качестве справочника по верстке типовых страниц.
                                Здесь же рассказывается о некоторых общих правилах оформления контента.
                                </p>`,
                            },
                        },
                    ],
                },
            },
            {
                id: 2,
                component: 'section-widget',
                data: {
                    children: [
                        {
                            id: 1,
                            component: 'html-text-widget',
                            data: {
                                content: `
                                <h2>H2. Многострочный заголовок, длина которого иногда бывает так некстати</h2>
                                <p>Типовые элементы оформляются в системе администрирования через визуальный редактор «Реформатор». Чтобы контент-менеджеру было легче в них ориентироваться, их количество лучше свести к необходимому минимуму.</p>
                                <p>Текст состоит из некоторого количества предложений. Одно предложение, даже очень распространённое, сложное, текстом назвать нельзя, поскольку текст можно расчленить на самостоятельные предложения, а части предложения сочетаются по законам синтаксиса сложного предложения, но не текста.</p>
                                <p>Имманентный подход подразумевает отношение к тексту как к автономной реальности, нацеленность на выявление его внутренней структуры. Репрезентативный — рассмотрение текста как особой формы представления знаний о внешней тексту действительности.</p>
                                `,
                            },
                        },
                    ],
                },
            },
            {
                id: 3,
                component: 'section-widget',
                data: {
                    children: [
                        {
                            id: 1,
                            component: 'html-text-widget',
                            data: {
                                content: `
                                <h2>H2. Форматирование текста</h2>
                                <p class="before_list">Для уменьшения расстояния между параграфом и связанным с ним списком, параграфу нужно добавлять класс «Перед списком» (before_list).</p>
                                <ul>
                                    <li>
                                        линии очертания букв оставлялись, а всё остальное срезалось;
                                    </li>
                                    <li>
                                        в доске вглубь вырезалось очертание букв — тогда буквы при печатании выходили белыми, а всё
                                        остальное оставалось чёрным.
                                    </li>
                                </ul>
                                `,
                            },
                        },
                    ],
                },
            },
            {
                id: 4,
                component: 'section-widget',
                data: {
                    children: [
                        {
                            id: 1,
                            component: 'html-text-widget',
                            data: {
                                content: `
                                <h3>H4. Короткие пункты</h3>
                                <ol>
                                    <li>
                                        Если пункты списка длинные и представляют собой развернутые предложения, они должны начинаться с прописной буквы и заканчиваться точкой.
                                    </li>
                                    <li>
                                        Если пункты списка короткие, не являются самостоятельной законченной конструкцией и грамматически тесно связаны с предшествующей списку вводной фразой, они должны начинаться со строчной буквы и заканчиваться точкой с запятой (в конце последнего пункта — точка).
                                    </li>
                                </ol>
                                `,
                            },
                        },
                    ],
                },
            },
            {
                id: 5,
                component: 'section-widget',
                data: {
                    children: [
                        {
                            id: 1,
                            component: 'html-text-widget',
                            data: {
                                content: `
                                <h4>H4. Короткие пункты</h4>
                                <p class="before_list">
                                    Кстати списки с короткими пунктами оформляются проще:
                                </p>
                                <div>с небольшими отступами;</div>
                                <div>без маркеров;</div>
                                <div>с цветовым выделением.</div>
                                `,
                            },
                        },
                    ],
                },
            },
            {
                id: 6,
                component: 'section-widget',
                data: {
                    children: [
                        {
                            id: 1,
                            component: 'html-text-widget',
                            data: {
                                content: `
                                <h2>H2. Ссылки</h2>
                                <p>
                                    На сайте может встречаться несколько видов ссылок. Например, ссылка на <a href="https://yandex.ru/">Яндекс</a> является внешней. Внутренние ссылки могут открываться по умолчанию в текущем окне (например, переход на <a href="/">главную страницу</a>) или в <a href="/" target="_blank">новом окне</a> (например, для показа изображений в оригинальном размере). 
                                </p>
                                `,
                            },
                        },
                    ],
                },
            },
        ],
    },

    '/text-page-with-images': {
        breadcrumbs: [
            {
                id: 1,
                component: 'breadcrumbs-widget',
                data: {
                    url: '/text-page-with-images',
                    name: 'Текстовая страница с картинками',
                },
            },
        ],
        menu: [
            {
                id: 1,
                component: 'nav-widget',
                data: {
                    items: [
                        { url: '/text-page', name: 'Текстовая страница' },
                        { url: '/text-page-with-images', name: 'Текстовая страница с картинками' },
                        { url: '/text-page-without-menu', name: 'Текстовая страница без меню' },
                        { url: '/undefined-page', name: 'Несуществующая страница' },
                    ],
                },
            },
        ],
        main: [
            {
                id: 1,
                component: 'section-widget',
                data: {
                    children: [
                        {
                            id: 1,
                            component: 'html-text-widget',
                            data: {
                                content: `
                            <h1>Н1. Длинный заголовок типовой страницы</h1>
                            <p>Эта страница создана для демонстрации блоков и элементов, которые используются на сайте, и служит руководством для всех, кто работает над ним.
                            Дизайнеры и технологи отрабатывают здесь стили, чтобы добиться приемлемых результатов в различных сочетаниях блоков и элементов.
                            Контент-менеджеры и редакторы используют страницу в качестве справочника по верстке типовых страниц.
                            Здесь же рассказывается о некоторых общих правилах оформления контента.
                            </p>`,
                            },
                        },
                    ],
                },
            },
            {
                id: 2,
                component: 'section-widget',
                data: {
                    noContainer: true,
                    children: [
                        {
                            id: 1,
                            component: 'picture-widget',
                            data: {
                                content: widgetImage,
                            },
                        },
                    ],
                },
            },
        ],
    },

    '/text-page-without-menu': {
        breadcrumbs: [
            {
                id: 1,
                component: 'breadcrumbs-widget',
                data: {
                    url: '/text-page-without-menu',
                    name: 'Текстовая страница без меню',
                },
            },
        ],
        menu: null,
        main: [
            {
                id: 1,
                component: 'section-widget',
                data: {
                    children: [
                        {
                            id: 1,
                            component: 'html-text-widget',
                            data: {
                                content: `
                                <h1>Н1. Длинный заголовок типовой страницы</h1>
                                <p>Эта страница создана для демонстрации блоков и элементов, которые используются на сайте, и служит руководством для всех, кто работает над ним.
                                Дизайнеры и технологи отрабатывают здесь стили, чтобы добиться приемлемых результатов в различных сочетаниях блоков и элементов.
                                Контент-менеджеры и редакторы используют страницу в качестве справочника по верстке типовых страниц.
                                Здесь же рассказывается о некоторых общих правилах оформления контента.
                                </p>`,
                            },
                        },
                    ],
                },
            },
            {
                id: 2,
                component: 'section-widget',
                data: {
                    children: [
                        {
                            id: 1,
                            component: 'html-text-widget',
                            data: {
                                content: `
                                <h2>H2. Многострочный заголовок, длина которого иногда бывает так некстати</h2>
                                <p>Типовые элементы оформляются в системе администрирования через визуальный редактор «Реформатор». Чтобы контент-менеджеру было легче в них ориентироваться, их количество лучше свести к необходимому минимуму.</p>
                                <p>Текст состоит из некоторого количества предложений. Одно предложение, даже очень распространённое, сложное, текстом назвать нельзя, поскольку текст можно расчленить на самостоятельные предложения, а части предложения сочетаются по законам синтаксиса сложного предложения, но не текста.</p>
                                <p>Имманентный подход подразумевает отношение к тексту как к автономной реальности, нацеленность на выявление его внутренней структуры. Репрезентативный — рассмотрение текста как особой формы представления знаний о внешней тексту действительности.</p>
                                `,
                            },
                        },
                    ],
                },
            },
            {
                id: 3,
                component: 'section-widget',
                data: {
                    children: [
                        {
                            id: 1,
                            component: 'html-text-widget',
                            data: {
                                content: `
                                <h2>H2. Форматирование текста</h2>
                                <p class="before_list">Для уменьшения расстояния между параграфом и связанным с ним списком, параграфу нужно добавлять класс «Перед списком» (before_list).</p>
                                <ul>
                                    <li>
                                        линии очертания букв оставлялись, а всё остальное срезалось;
                                    </li>
                                    <li>
                                        в доске вглубь вырезалось очертание букв — тогда буквы при печатании выходили белыми, а всё
                                        остальное оставалось чёрным.
                                    </li>
                                </ul>
                                `,
                            },
                        },
                    ],
                },
            },
            {
                id: 4,
                component: 'section-widget',
                data: {
                    children: [
                        {
                            id: 1,
                            component: 'html-text-widget',
                            data: {
                                content: `
                                <h3>H4. Короткие пункты</h3>
                                <ol>
                                    <li>
                                        Если пункты списка длинные и представляют собой развернутые предложения, они должны начинаться с прописной буквы и заканчиваться точкой.
                                    </li>
                                    <li>
                                        Если пункты списка короткие, не являются самостоятельной законченной конструкцией и грамматически тесно связаны с предшествующей списку вводной фразой, они должны начинаться со строчной буквы и заканчиваться точкой с запятой (в конце последнего пункта — точка).
                                    </li>
                                </ol>
                                `,
                            },
                        },
                    ],
                },
            },
            {
                id: 5,
                component: 'section-widget',
                data: {
                    children: [
                        {
                            id: 1,
                            component: 'html-text-widget',
                            data: {
                                content: `
                                <h4>H4. Короткие пункты</h4>
                                <p class="before_list">
                                    Кстати списки с короткими пунктами оформляются проще:
                                </p>
                                <div>с небольшими отступами;</div>
                                <div>без маркеров;</div>
                                <div>с цветовым выделением.</div>
                                `,
                            },
                        },
                    ],
                },
            },
            {
                id: 6,
                component: 'section-widget',
                data: {
                    children: [
                        {
                            id: 1,
                            component: 'html-text-widget',
                            data: {
                                content: `
                                <h2>H2. Ссылки</h2>
                                <p>
                                    На сайте может встречаться несколько видов ссылок. Например, ссылка на <a href="https://yandex.ru/">Яндекс</a> является внешней. Внутренние ссылки могут открываться по умолчанию в текущем окне (например, переход на <a href="/">главную страницу</a>) или в <a href="/" target="_blank">новом окне</a> (например, для показа изображений в оригинальном размере). 
                                </p>
                                `,
                            },
                        },
                    ],
                },
            },
        ],
    },
};

export function getPageData(path) {
    return pagesData[path];
}

export default { getPageData };
