import _cloneDeep from 'lodash/cloneDeep';
import HttpServiceBase from './base';

import { cartItemTypes } from '@enums/product';
import { receiveMethods, deliveryMethods, deliveryTypes } from '@enums/checkout';
import { preparePrice, addDays } from '@util';

import instagram1 from '@images/mock/insta1.png';
import instagram2 from '@images/mock/insta2.png';
import instagram3 from '@images/mock/insta3.png';
import instagram4 from '@images/mock/insta4.png';
import instagram5 from '@images/mock/insta5.png';
import instagram6 from '@images/mock/insta6.png';
import instagram7 from '@images/mock/insta7.png';
import instagram8 from '@images/mock/insta8.png';

import brand1 from '@images/mock/brand1.png';
import brand2 from '@images/mock/brand2.png';
import brand3 from '@images/mock/brand3.png';
import brand4 from '@images/mock/brand4.png';
import brand5 from '@images/mock/brand5.png';

import banner1 from '@images/mock/banner1.png';
import banner2 from '@images/mock/banner2.png';
import banner3 from '@images/mock/banner3.png';
import banner4 from '@images/mock/banner4.png';
import banner5 from '@images/mock/banner5.png';
import banner6 from '@images/mock/banner6.png';
import banner7 from '@images/mock/banner7.png';
import banner8 from '@images/mock/banner8.png';

import productMasterclass1 from '@images/mock/productMasterclass1.png';
import productMasterclass2 from '@images/mock/productMasterclass2.png';

import masterclassDetailImage1 from '@images/mock/masterclassDetailImage1.png';

import masterclassGalleryImg1 from '@images/mock/masterclassGalleryImg1.png';
import masterclassGalleryImg2 from '@images/mock/masterclassGalleryImg2.png';
import masterclassGalleryImg3 from '@images/mock/masterclassGalleryImg3.png';

import author1 from '@images/mock/author1.png';

const mockDate = new Date(Date.now());
mockDate.setHours(0, 0, 0, 0);

const ext = /\.(jpe?g|png)$/i;

const categories = [
    {
        id: 1,
        name: 'Шампунь',
    },
    {
        id: 2,
        name: 'Шампунь для жирных волос',
    },
    {
        id: 3,
        name: 'Шампунь для вьющихся волос',
    },
    {
        id: 4,
        name: 'Шампунь-спрей',
    },
    {
        id: 5,
        name: 'Восстанавливающий шампунь',
    },
    {
        id: 6,
        name: 'Шампунь для окрашенных волос',
    },
    {
        id: 7,
        name: 'Шампунь для объема',
    },
    {
        id: 8,
        name: 'Шампунь для мужчин',
    },
];

const instagrams = [
    {
        id: 1,
        image: {
            src: instagram1,
            sources: [
                {
                    srcset: `${instagram1.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
    {
        id: 2,
        image: {
            src: instagram2,
            sources: [
                {
                    srcset: `${instagram2.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
    {
        id: 3,
        image: {
            src: instagram3,
            sources: [
                {
                    srcset: `${instagram3.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
    {
        id: 4,
        image: {
            src: instagram4,
            sources: [
                {
                    srcset: `${instagram4.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
    {
        id: 5,
        image: {
            src: instagram5,
            sources: [
                {
                    srcset: `${instagram5.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
    {
        id: 6,
        image: {
            src: instagram6,
            sources: [
                {
                    srcset: `${instagram6.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
    {
        id: 7,
        image: {
            src: instagram7,
            sources: [
                {
                    srcset: `${instagram7.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
    {
        id: 8,
        image: {
            src: instagram8,
            sources: [
                {
                    srcset: `${instagram8.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
];

const banners = [
    {
        id: 1,
        upperText: '',
        type: 'banner',
        title: 'Новая коллекция косметики Aveda',
        btnText: 'Смотреть товары',
        image: banner1,
    },
    {
        id: 2,
        upperText: 'Подборка',
        type: 'banner',
        title: '20 средств для ухода за молодой кожей',
        btnText: 'Посмотреть',
        image: banner2,
    },
    {
        id: 3,
        upperText: 'Подборка',
        type: 'banner',
        title: '20 средств для ухода за молодой кожей',
        btnText: 'Посмотреть',
        image: banner1,
    },
    {
        id: 4,
        type: 'banner',
        title: 'Лучшие стайлинги для летних укладок в новом сезоне только для тебя',
        btnText: 'Смотреть товары',
        image: banner3,
    },
    {
        id: 5,
        type: 'banner',
        title: 'Новейшая косметика для лица и тела с омолаживающим эффектом',
        btnText: 'Смотреть товары',
        image: banner4,
    },
    {
        id: 6,
        type: 'banner',
        title: ' Натуральный макияж Aveda, который подойдёт для каждой девушки',
        btnText: 'Смотреть товары',
        image: banner5,
    },
    {
        id: 7,
        type: 'banner',
        title: 'Водостойкая губная помада L’Oreal Paris',
        bottomText: 'Мгновенная оптимизация тона, текстуры и увлажнения кожи',
        btnText: 'Посмотреть',
        image: banner6,
    },
    {
        id: 8,
        type: 'banner',
        title: 'Если ты — бессовестно талантливый стилист, визажист, мастер красоты любого профиля',
        bottomText: 'Мгновенная оптимизация тона, текстуры и увлажнения кожи',
        btnText: 'Регистрация',
        image: banner7,
    },
    {
        id: 9,
        type: 'banner',
        title: 'Если ты — бессовестно талантливый стилист, визажист, мастер красоты любого профиля',
        bottomText: 'Мгновенная оптимизация тона, текстуры и увлажнения кожи',
        btnText: 'Регистрация',
        image: banner7,
    },
    {
        id: 10,
        type: 'banner',
        title: 'Если ты — бессовестно талантливый стилист, визажист, мастер красоты любого профиля',
        bottomText: 'Мгновенная оптимизация тона, текстуры и увлажнения кожи',
        btnText: 'Регистрация',
        image: banner7,
    },
    {
        id: 11,
        type: 'banner',
        title: 'Основной уход за кожей',
        bottomText: 'Мгновенная оптимизация тона, текстуры и увлажнения кожи',
        btnText: 'Посмотреть',
        image: banner6,
    },
];

const brands = [
    { id: 1, name: 'Alterna', code: 'alterna', image: brand1 },
    { id: 2, name: 'Aveda', code: 'aveda', image: brand2 },
    { id: 3, name: 'Bungeetape', code: 'bungeetape', image: brand3 },
    { id: 4, name: 'Christina Fitzgerald', code: 'christina_fitzgerald', image: brand4 },
    { id: 5, name: 'Cloud Nine', code: 'cloud_nine', image: brand5 },
    { id: 6, name: 'Dajuja', code: 'dajuja', image: brand1 },
    { id: 7, name: 'Dyson', code: 'dyson' },
    { id: 8, name: 'IKOO', code: 'ikoo' },
    { id: 9, name: 'Kevin.Murphy', code: 'kevin_murphy' },
    { id: 10, name: 'Kure Bazaar', code: 'kure_bazaar' },
    { id: 11, name: 'La Ric', code: 'la_ric' },
    { id: 12, name: 'Olaplex', code: 'olaplex' },
    { id: 13, name: 'Oribe', code: 'oribe' },
    { id: 14, name: 'R+Co', code: 'r_co' },
];

const masterClasses = [
    {
        id: 1,
        name: 'Мастер-класс по макияжу',
        description: '3 сентября (пт), 12:00',
        author: 'Денис Карташев, визажист',
        type: 'masterclass',
        price: 'от 1 900 ₽',
        oldPrice: null,
        image: productMasterclass1,
    },
    {
        id: 2,
        name: 'Макияж для фотографии',
        description: 'Видео-урок',
        type: 'masterclass',
        image: productMasterclass2,
    },
];

const masterClassDetails = {
    name: 'Макияж для фото',
    code: 'code1',
    date: '3 сентября (пт), 12:00–18:00',
    topText: `<p>Мастер-класс «Макияж для фото» направлен на создание образов непосредственно для коммерческих и творческих съемок. </p>
    Рекомендуем посетить мастер-класс визажистам с любым уровнем подготовки, которые только начали или давно работают с частными клиентами, но хотят качественно изменить направление работы в сторону fashion, beauty и других коммерческих съемок.`,
    bottomText: `На мастер-классе преподаватель расскажет и покажет главные отличия картинки в жизни и на фото, какие текстуры подойдут для создания самых трендовых эффектов (матовая, глянцевая, мокрая, сияющая кожа), как работать с крупными кадрами и какие текстуры выбирать, чтобы постпродакшн (дальнейшая обработка фото) сказал вам спасибо!`,
    image: productMasterclass2,
    detailImage: masterclassDetailImage1,

    contacts: {
        name: 'Тумарева Элина Леонидовна',
        description: 'Лицензированный консультант, мастер-коуч ICI',
        phone: '+7 (903) 233 77 11',
        email: 'info@insight-russia.ru',
    },

    gallery: [masterclassGalleryImg1, masterclassGalleryImg2, masterclassGalleryImg3],

    program: `
    <p>— Зачем нужна команда и как с ней работать, где ее искать;</p>
    <p>— Как придумать образ по референсу стилиста и что это такое;</p> 
    <p>— Разбор текстур для работы с кожей, начиная с выбора ухода;</p> 
    <p>— Вариации nude make-up: от «голого лица» до свежего образа;</p>
    <p>— Способы нанесения тона для очень крупных кадров, чтобы кожа оставалась живой;</p>
    <p>— Создание влажной, матовой или сияющей кожи для формата beauty съемок;</p> 
    <p>— Универсальные и проверенные продукты для создания безупречного нюдового мейкапа;</p> 
    <p>— Демонстрация и практическая отработка по пройденно лекции;</p>
    <p>— Особенности работы с разным освещением в студии;</p> 
    <p>— Создание портфолио и выбор фотографа;</p> 
    <p>— Этапы трансформации нюдового макияжа в яркий, этапы нанесения и цветовые решения для создания единой концепции съемки;</p> 
    <p>— Сочетание сухих, кремовых и жидких текстур в одном макияже;</p> 
    <p>— Использование продуктов не поназначению, креативные макияжи;</p> 
    <p>— Секреты цвета – как добиться такого же насыщенного цвета на фото, как и в жизни;</p> 
    <p>— Влажные цветные смоки, подводка нижнего века, несколько цветных акцентов в макияже;</p> 
    <p>— Демонстрация и практическая отработка по пройденной лекции.</p>`,

    requirements: `
    <p>— Влажные салфетки;</p> 
    <p>— Жидкость для снятия макияжа;</p> 
    <p>— Ершик для бровей;</p> 
    <p>— Корректор (база или крем);</p> 
    <p>— Кисть для хайлайтера;</p> 
    <p>— Кисть плоская для консилера;</p> 
    <p>— Кисть для нижнего века и ресничного контура;</p>`,

    authors: [
        {
            id: 1,
            firstName: 'Владимир',
            lastName: 'Соколов',
            nickName: '@sokolov',
            profile: 'Ведущий стилист',
            image: author1,
        },
        {
            id: 2,
            firstName: 'Игорь',
            lastName: 'Борисов',
            nickName: null,
            profile: 'Cтилист',
            image: null,
        },
        {
            id: 3,
            firstName: 'Владимир',
            lastName: 'Соколов',
            nickName: '@sokolov',
            profile: 'Ведущий стилист',
            image: author1,
        },
        {
            id: 4,
            firstName: 'Игорь',
            lastName: 'Борисов',
            nickName: null,
            profile: 'Cтилист',
            image: null,
        },
    ],

    address: {
        id: 1,
        full: 'Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1',
        coords: [55.7521569884845, 37.66961932869719],
    },

    tickets: [
        {
            id: 1,
            name: 'Входной билет LITE',
            description: 'Возможность посетить только одну площадку на мероприятии',
            remain: 10,
            price: {
                value: 5000,
                currency: 'RUB',
            },
        },
        {
            id: 2,
            name: 'Входной билет PRO',
            description: 'Доступ ко всем площадкам и материалам',
            remain: 3,
            price: {
                value: 7000,
                currency: 'RUB',
            },
        },
    ],

    price: {
        value: {
            from: 5000,
            to: 7000,
        },
        currency: 'RUB',
    },
};

export default class MockHttpService extends HttpServiceBase {
    delete(path, data) {
        return new Promise((resolve, reject) => {
            switch (path) {
                default:
                    reject(new Error(`Unknown method, path: ${path}, data: ${JSON.stringify(data)}`));
            }
        });
    }

    post(path, data) {
        return new Promise((resolve, reject) => {
            switch (path) {
                default:
                    reject(new Error(`Unknown method, path: ${path}, data: ${JSON.stringify(data)}`));
            }
        });
    }

    /**
     *
     * @param {String} path
     * @param {*} data
     * @returns {Promise<Object>}
     */
    get(path, data = {}) {
        return new Promise((resolve, reject) => {
            switch (path) {
                case '/v1/banners':
                    setTimeout(() => resolve(banners), 300);
                    break;

                case '/v1/instagram':
                    setTimeout(() => resolve(instagrams), 300);
                    break;
                    brandsCatalog;

                case '/v1/brands':
                    setTimeout(() => resolve(brands), 300);
                    break;

                case '/v1/masterclasses':
                    setTimeout(() => resolve(masterClasses), 300);
                    break;

                case '/v1/catalog/masterclass-detail':
                    setTimeout(() => resolve(_cloneDeep(masterClassDetails)), 300);
                    break;

                default:
                    reject(new Error(`Unknown method, path: ${path}, data: ${JSON.stringify(data)}`));
            }
        });
    }
}
