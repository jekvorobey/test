import _cloneDeep from 'lodash/cloneDeep';
import HttpServiceBase from './base';
import { cartItemTypes, receiveMethods, deliveryMethods, deliveryTypes } from '../../assets/scripts/constants';
import { preparePrice, addDays } from '../../util/helpers';

import product1 from '../../assets/images/mock/product1.png';
import product2 from '../../assets/images/mock/product2.png';
import product3 from '../../assets/images/mock/product3.png';
import product4 from '../../assets/images/mock/product4.png';
import product5 from '../../assets/images/mock/product5.png';
// import product6 from '../../assets/images/mock/product6.png';
import product7 from '../../assets/images/mock/product7.png';
import product8 from '../../assets/images/mock/product8.png';
import product9 from '../../assets/images/mock/product9.png';
import product10 from '../../assets/images/mock/product10.png';
import product11 from '../../assets/images/mock/product11.png';
import product12 from '../../assets/images/mock/product12.png';

import instagram1 from '../../assets/images/mock/insta1.png';
import instagram2 from '../../assets/images/mock/insta2.png';
import instagram3 from '../../assets/images/mock/insta3.png';
import instagram4 from '../../assets/images/mock/insta4.png';
import instagram5 from '../../assets/images/mock/insta5.png';
import instagram6 from '../../assets/images/mock/insta6.png';
import instagram7 from '../../assets/images/mock/insta7.png';
import instagram8 from '../../assets/images/mock/insta8.png';

import brand1 from '../../assets/images/mock/brand1.png';
import brand2 from '../../assets/images/mock/brand2.png';
import brand3 from '../../assets/images/mock/brand3.png';
import brand4 from '../../assets/images/mock/brand4.png';
import brand5 from '../../assets/images/mock/brand5.png';

import brandDetail1 from '../../assets/images/mock/brandDetail1.jpg';

import category1 from '../../assets/images/mock/category1.png';
import category2 from '../../assets/images/mock/category2.png';
import category3 from '../../assets/images/mock/category3.png';
import category4 from '../../assets/images/mock/category4.png';
import category5 from '../../assets/images/mock/category5.png';
import category6 from '../../assets/images/mock/category6.png';
import category7 from '../../assets/images/mock/category7.png';
import category8 from '../../assets/images/mock/category8.png';

import banner1 from '../../assets/images/mock/banner1.png';
import banner2 from '../../assets/images/mock/banner2.png';
import banner3 from '../../assets/images/mock/banner3.png';
import banner4 from '../../assets/images/mock/banner4.png';
import banner5 from '../../assets/images/mock/banner5.png';
import banner6 from '../../assets/images/mock/banner6.png';
import banner7 from '../../assets/images/mock/banner7.png';
import banner8 from '../../assets/images/mock/banner8.png';

import productBanner1 from '../../assets/images/mock/productBanner1.png';

import productDetail1 from '../../assets/images/mock/productDetail1.png';
import productDetail2 from '../../assets/images/mock/productDetail2.png';
import productDetail3 from '../../assets/images/mock/productDetail3.png';
import productDetail4 from '../../assets/images/mock/productDetail4.png';

import productDescription1 from '../../assets/images/mock/productDescription1.png';
import productDescription2 from '../../assets/images/mock/productDescription2.png';

import productMasterclass1 from '../../assets/images/mock/productMasterclass1.png';
import productMasterclass2 from '../../assets/images/mock/productMasterclass2.png';

import productReview1 from '../../assets/images/mock/productReview1.png';
import productReview2 from '../../assets/images/mock/productReview2.png';

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

const productBanners = [
    {
        id: 1,
        type: 'banner',
        upperText: 'Подборка',
        title: 'Новая коллекция косметики Tom Ford',
        btnText: 'Смотреть товары',
        image: {
            src: banner7,
            sources: [
                {
                    srcset: `${banner7.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },

    {
        id: 2,
        type: 'banner',
        upperText: 'Подборка',
        title: '20 средств для ухода за молодой кожей',
        btnText: 'Смотреть товары',
        image: {
            src: banner2,
            sources: [
                {
                    srcset: `${banner2.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
];

const brands = [
    {
        id: 1,
        name: 'Brand1',
        title: 'Brand1',
        image: brand1,
    },
    {
        id: 2,
        name: 'Brand2',
        title: 'Brand2',
        image: brand2,
    },
    {
        id: 3,
        name: 'Brand3',
        title: 'Brand3',
        image: brand3,
    },
    {
        id: 4,
        name: 'Brand4',
        title: 'Brand4',
        image: brand4,
    },
    {
        id: 5,
        name: 'Brand5',
        title: 'Brand5',
        image: brand5,
    },
    {
        id: 6,
        name: 'Brand6',
        title: 'Brand6',
        image: brand1,
    },
    {
        id: 7,
        name: 'Christian Dior',
        title: 'Christian Dior',
        image: brand2,
    },
    {
        id: 8,
        name: 'Chanel',
        title: 'Chanel',
        image: brand3,
    },
    {
        id: 9,
        name: 'Shiseido',
        title: 'Shiseido',
        image: brand4,
    },
    {
        id: 10,
        name: 'Maybelline',
        title: 'Maybelline',
        image: brand5,
    },
    {
        id: 11,
        name: 'Avon',
        title: 'Avon',
        image: brand1,
    },
    {
        id: 12,
        name: 'Lancôme',
        title: 'Lancôme',
        image: brand2,
    },
    {
        id: 13,
        name: 'Yves Saint Laurent',
        title: 'Yves Saint Laurent',
        image: brand3,
    },
    {
        id: 14,
        name: 'Clinique',
        title: 'Clinique',
        image: brand4,
    },
    {
        id: 15,
        name: 'Estée Lauder',
        title: 'Estée Lauder',
        image: brand5,
    },
];

const brandDetails = [
    {
        id: 1,
        code: 'loreal',
        name: 'L’Oréal Paris',
        description: `L’Oreal — это, пожалуй, самый известный мировой бренд. 
        Его знают и доверяют его продукции во всех странах мира. 
        Это компания действительно уникальна. 
        Она объединила несколько популярных и сделавших свое имя марок, но при этом логотип «L’Oreal» не теряет собственной значимости и индивидуальности. 
        Каждая женщина при упоминании фразы «L’Oreal Paris» ассоциирует ее с качественными средствами для ухода за кожей, со стойкой и безопасной краской, с шампунями, масками и маслами, а также с возможностью сделать прекрасный макияж.`,
    },

    {
        id: 2,
        code: 'lipstick-queen',
        name: 'Lipstick Queen',
        image: brandDetail1,
        description: `Губная помада Queen приглашает вас преодолеть косметические барьеры и пробиться с губой. 
        Начиная с преобразующих цветов и увлажняющих и комфортных текстур и формул, мы предлагаем губную помаду для всех и каждого случая. 
        Покупайте нашу бестселлерную губную помаду Frog Prince и другие любимые продукты у наших официальных партнеров по всему миру.`,
    },
];

const productCategories = [
    {
        id: 1,
        name: 'Для волос',
        code: 'dlya-volos',
        image: {
            src: category1,
            sources: [
                {
                    srcset: `${category1.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
    {
        id: 2,
        name: 'Для лица и тела',
        code: 'dlya-litsa-i-tela',
        image: {
            src: category2,
            sources: [
                {
                    srcset: `${category2.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
    {
        id: 3,
        name: 'Для рук и ног',
        code: 'dlya-ruk-i-nog',
        image: {
            src: category3,
            sources: [
                {
                    srcset: `${category3.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
    {
        id: 4,
        name: 'Макияж',
        code: 'makiyazh-4',
        image: {
            src: category4,
            sources: [
                {
                    srcset: `${category4.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
        items: [
            {
                id: 9,
                name: 'Для лица',
                code: 'dlya-litsa-9',
            },
            {
                id: 10,
                name: 'Для глаз',
                code: 'dlya-glaz-10',
            },
            {
                id: 11,
                name: 'Для бровей',
                code: 'dlya-brovey-11',
            },
            {
                id: 12,
                name: 'Для губ',
                code: 'dlya-gub-12',

                items: [
                    {
                        id: 13,
                        name: 'Блеск для губ',
                        code: 'blesk-dlya-gub-13',
                    },
                    {
                        id: 14,
                        name: 'Губная помада',
                        code: 'gubnaya-pomada-14',
                    },
                    {
                        id: 15,
                        name: 'Карандаши для губ',
                        code: 'karandashi-dlya-gub-15',
                    },
                ],
            },
        ],
    },
    {
        id: 5,
        name: 'Для ногтей',
        code: 'dlya-nogtei',
        image: {
            src: category5,
            sources: [
                {
                    srcset: `${category5.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
    {
        id: 6,
        name: 'Инструменты',
        code: 'instrumenti',
        image: {
            src: category6,
            sources: [
                {
                    srcset: `${category6.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
    {
        id: 7,
        name: 'Аксессуары',
        code: 'aksesuari',
        image: {
            src: category7,
            sources: [
                {
                    srcset: `${category7.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
    {
        id: 8,
        name: 'Для мужчин',
        code: 'dlya-muzhchin',
        image: {
            src: category8,
            sources: [
                {
                    srcset: `${category8.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
];

const products = [
    {
        id: 1,
        name: 'EvoСухой шампунь-спрей Water Killer, 200 мл',
        description: 'EvoСухой шампунь-спрей Water Killer, 200 мл',
        code: '1',
        price: '1 900 ₽',
        oldPrice: '1 600 ₽',
        tags: ['Новинка', '-15%'],
        type: 'product',
        rating: 5,
        image: {
            src: product1,
            sources: [
                {
                    srcset: `${product1.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
    {
        id: 2,
        name: 'Kevin Murphy Шампунь для уплотнения волос, 200 мл',
        description: 'Kevin Murphy Шампунь для уплотнения волос, 200 мл',
        code: '2',
        price: '1 900 ₽',
        oldPrice: null,
        tags: ['-15%'],
        type: 'product',
        rating: 1,
        image: {
            src: product2,
            sources: [
                {
                    srcset: `${product2.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
    {
        id: 3,
        name: 'Alterna Шампунь для мгновенного восстановления, 250 мл',
        description: 'Alterna Шампунь для мгновенного восстановления, 250 мл',
        code: '3',
        price: '1 900 ₽',
        oldPrice: '1 600 ₽',
        tags: ['Новинка'],
        type: 'product',
        rating: 3,
        image: {
            src: product3,
            sources: [
                {
                    srcset: `${product3.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
    {
        id: 4,
        name: 'Alterna Шампунь лифтинг для объема, 200 мл',
        description: 'Alterna Шампунь лифтинг для объема, 200 мл',
        code: '4',
        price: '1 900 ₽',
        oldPrice: '1 600 ₽',
        type: 'product',
        rating: 2,
        image: {
            src: product4,
            sources: [
                {
                    srcset: `${product4.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
    {
        id: 5,
        name: 'Kevin Murphy Шампунь для уплотнения волос, 200 мл',
        description: 'Kevin Murphy Шампунь для уплотнения волос, 200 мл',
        code: '5',
        price: '1 900 ₽',
        oldPrice: null,
        type: 'product',
        rating: 2,
        image: {
            src: product5,
            sources: [
                {
                    srcset: `${product5.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
    {
        id: 6,
        name: 'Kevin Murphy Шампунь для уплотнения волос, 200 мл',
        description: 'Kevin Murphy Шампунь для уплотнения волос, 200 мл',
        code: '6',
        image: null,
        price: '1 900 ₽',
        oldPrice: '1 600 ₽',
        type: 'product',
        rating: 3,
    },
    {
        id: 7,
        name: 'Alterna Шампунь для мгновенного восстановления, 250 мл',
        description: 'Alterna Шампунь для мгновенного восстановления, 250 мл',
        code: '7',
        price: '1 900 ₽',
        oldPrice: '1 600 ₽',
        type: 'product',
        rating: 3,
        image: {
            src: product7,
            sources: [
                {
                    srcset: `${product7.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
    {
        id: 8,
        name: 'R+Co Шампунь для совершенства волос, 240 мл',
        description: 'R+Co Шампунь для совершенства волос, 240 мл',
        code: '8',
        price: '1 900 ₽',
        oldPrice: '1 600 ₽',
        type: 'product',
        rating: 5,
        image: {
            src: product8,
            sources: [
                {
                    srcset: `${product8.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
    {
        id: 9,
        name: 'Alterna Шампунь лифтинг для объема, 200 мл',
        description: 'Alterna Шампунь лифтинг для объема, 200 мл',
        code: '9',
        price: '1 900 ₽',
        oldPrice: '1 600 ₽',
        type: 'product',
        rating: 5,
        image: {
            src: product9,
            sources: [
                {
                    srcset: `${product9.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
    {
        id: 10,
        name: 'Alterna Шампунь для мгновенного восстановления, 250 мл',
        description: 'Alterna Шампунь для мгновенного восстановления, 250 мл',
        code: '10',
        price: '1 900 ₽',
        oldPrice: '1 600 ₽',
        type: 'product',
        rating: 5,
        image: {
            src: product10,
            sources: [
                {
                    srcset: `${product10.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
    {
        id: 11,
        name: 'Alterna Шампунь лифтинг для объема, 200 мл',
        description: 'Alterna Шампунь лифтинг для объема, 200 мл',
        code: '11',
        price: '1 900 ₽',
        oldPrice: '1 600 ₽',
        type: 'product',
        rating: 5,
        image: {
            src: product11,
            sources: [
                {
                    srcset: `${product11.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
    {
        id: 12,
        name: 'Evo Сухой шампунь-спрей Water Killer, 200 мл',
        description: 'Evo Сухой шампунь-спрей Water Killer, 200 мл',
        code: '12',
        price: '1 900 ₽',
        oldPrice: '1 600 ₽',
        type: 'product',
        rating: 3,
        image: {
            src: product12,
            sources: [
                {
                    srcset: `${product12.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
    {
        id: 13,
        name: 'EvoСухой шампунь-спрей Water Killer, 200 мл',
        description: 'EvoСухой шампунь-спрей Water Killer, 200 мл',
        code: '13',
        price: '1 900 ₽',
        oldPrice: '1 600 ₽',
        tags: ['Новинка', '-15%'],
        type: 'product',
        rating: 5,
        image: {
            src: product1,
            sources: [
                {
                    srcset: `${product1.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
    {
        id: 14,
        name: 'Kevin Murphy Шампунь для уплотнения волос, 200 мл',
        description: 'Kevin Murphy Шампунь для уплотнения волос, 200 мл',
        code: '14',
        price: '1 900 ₽',
        oldPrice: null,
        tags: ['-15%'],
        type: 'product',
        rating: 1,
        image: {
            src: product2,
            sources: [
                {
                    srcset: `${product2.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
    {
        id: 15,
        name: 'Alterna Шампунь для мгновенного восстановления, 250 мл',
        description: 'Alterna Шампунь для мгновенного восстановления, 250 мл',
        code: '15',
        price: '1 900 ₽',
        oldPrice: '1 600 ₽',
        tags: ['Новинка'],
        type: 'product',
        rating: 3,
        image: {
            src: product3,
            sources: [
                {
                    srcset: `${product3.replace(ext, '.webp')}`,
                    type: 'image/webp',
                },
            ],
        },
    },
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

const productsDetails = [
    {
        id: 1,
        code: 'krem-dlya-britya-olaplex',
        title: 'Губная помада TOM FORD Matte Lip Color, 27, Bruised Plum',
        rating: 4,
        reviewsCount: 12,
        vendorCode: 148333731,

        shortDescription: `Двадцать три насыщенных,
        ярких оттенка помады воплощают в себе современную интерпретацию классики от Тома Форда. 
        Редкое экзотическое масло муру-муру из Бразилии и масло цветков ромашки создают кремовую текстуру и обеспечивают...`,

        instagramNote: 'Добавь тег @bessovestnotalantlivy в Instagram и, возможно, мы опубликуем твою фотографию',

        price: {
            value: 3900,
            currency: 'RUB',
        },

        oldPrice: {
            value: 4600,
            currency: 'RUB',
        },

        bonus: 80,

        receiveMethods: [
            {
                id: receiveMethods.EXPRESS,
                date: mockDate,
                price: {
                    value: 550,
                    currency: 'RUB',
                },
            },
            {
                id: receiveMethods.DELIVERY,
                date: addDays(mockDate, 1),
                price: {
                    value: 350,
                    currency: 'RUB',
                },
            },
            {
                id: receiveMethods.PICKUP,
                date: addDays(mockDate, 2),
                price: {
                    value: 0,
                    currency: 'RUB',
                },
            },
        ],

        brand: {
            name: 'brand-name',
            code: 'brand-code',
            image: {
                id: 32,
                sourceExt: 'jpg',
            },
        },

        media: [
            {
                id: 1,
                type: 'image',
                image: productDetail1,
            },
            {
                id: 2,
                type: 'image',
                image: productDetail2,
            },
            {
                id: 3,
                type: 'preview',
                image: productDetail3,
            },
            {
                id: 4,
                type: 'video',
                image: productDetail4,
            },
        ],

        option: {
            id: 3,
            type: 'color',
            code: 'bruised-plum',
            title: '27, Bruised Plum',
            value: '#6F0E3C',
        },

        options: [
            {
                id: 1,
                type: 'color',
                code: 'orange',
                title: '22, Orange',
                value: '#F05033',
            },

            {
                id: 2,
                type: 'color',
                code: 'red',
                title: '27, Red',
                value: '#C4101C',
            },

            {
                id: 3,
                type: 'color',
                code: 'bruised-plum',
                title: '27, Bruised Plum',
                value: '#6F0E3C',
            },
        ],

        profitable: {
            items: products.slice(0, 4),
            price: 6020,
            oldPrice: 7760,
        },

        description: {
            content: `Двадцать три насыщенных, 
            ярких оттенка помады воплощают в себе современную 
            интерпретацию классики от Тома Форда. 
            Редкое экзотическое масло муру-муру из Бразилии и масло цветков ромашки создают кремовую текстуру и 
            обеспечивают невероятно гладкое нанесение.<br/><br/>
            <b>ЧТО</b> Помада с кремовой текстурой подарит губам стойкое покрытие с эффектом сатина. 
            Экстракты белой лилии и мирры в составе помады обеспечивают увлажнение и защиту, визуально делают губы более объемными.<br/><br/>
            <b>ПРЕИМУЩЕСТВА</b> Растительные полимеры отвечают за оптимальную дисперсию цвета, обеспечивают комфортное ощущение на протяжение всего дня. 
            Комплекс смягчающих масел обеспечит шелковое скольжение и равномерное нанесение. Экстракт белой лилии обладает антиоксидантными и восстанавливающими 
            свойствами. Экстракт мирры увлажняет и борется с возрастными признаками.<br/><br/> <b>ЧЕГО ОЖИДАТЬ</b> Обладает точной цветопередачей. Насыщенная формула не 
            оставляет ощущения утяжеления.`,

            image: productDescription1,
        },

        howto: {
            content: `<ol><li>Для начала нанеси помаду в один слой. </li>
            <li>Промокни губы салфеткой, слегка припудри, нанеси второй слой. </li>
            <li>Удели особое внимание середине губ — пусть там цвет будет наиболее  насыщенным. Можешь даже нанести немного более темной помады на середину нижней губы. Это придаст объема и сделает губы чувственными!</li></ol>`,
            image: productDescription2,
        },

        characteristics: [
            {
                id: 1,
                title: 'Эффект',
                value: 'Матовая',
            },
            {
                id: 2,
                title: 'Действие',
                value: 'Увлажнение',
            },
            {
                id: 3,
                title: 'Текстура',
                value: 'Жидкая',
            },
            {
                id: 4,
                title: 'Стойкая',
                value: 'Да',
            },
            {
                id: 5,
                title: 'Серия',
                value: 'Rouge Signature',
            },
            {
                id: 6,
                title: 'Цвет',
                value: '103, розовый',
            },
            {
                id: 7,
                title: 'Бренд',
                value: 'TOM FORD',
            },
            {
                id: 8,
                title: 'Страна-изготовитель',
                value: 'Франция',
            },
            {
                id: 9,
                title: 'Объем, мл',
                value: ' 7',
            },
            {
                id: 10,
                title: 'Упаковка',
                value: 'Стик',
            },
            {
                id: 11,
                title: 'Вес в упаковке, г',
                value: '28',
            },
        ],

        masterClasses,

        reviews: {
            middleRating: 4.2,
            items: [
                {
                    id: 1,
                    name: 'Екатерина',
                    date: '12 мая 2019',
                    rating: 4,
                    likes: 4,
                    dislikes: 0,
                    advantage: 'Цвет понравился, мягкая, не сушит',
                    disadvantage:
                        'Очень быстро стирается, если чмокнуть кого то останется на нём вся, при этом каждый раз когда ее выдвигаешь, а потом задвигаешь, она стирается о пластик, то есть о сам каркас помады и собирается в комок',
                    comment: 'За свои деньги неплохо, но стойкости и достойного качества ожидать не стоит',
                    images: [],
                    options: [
                        {
                            id: 1,
                            title: 'Цвет',
                            value: '14, Wild Ginger',
                        },
                    ],
                },
                {
                    id: 2,
                    name: 'Мария',
                    date: '13 мая 2019',
                    rating: 5,
                    likes: 22,
                    dislikes: 7,
                    advantage: 'Хороший цвет. Давно искала)',
                    disadvantage: 'Быстро исчезает с губ',
                    comment:
                        'Хорошая мягкая помада, очень хороший розовый цвет, тем более за такую цену. Даже если бы ошиблась — было бы не жалко)',
                    images: [
                        {
                            id: 1,
                            image: productReview1,
                        },
                        {
                            id: 2,
                            image: productReview2,
                        },
                    ],
                    options: [
                        {
                            id: 1,
                            title: 'Цвет',
                            value: '09, True Coral',
                        },
                    ],
                },
            ],
        },
    },
];

const typeIds = {
    product: 1,
    masterclass: 2,
};

const mockTypes = {
    product: {
        id: typeIds[cartItemTypes.PRODUCT],
        type: cartItemTypes.PRODUCT,
        alerts: [
            {
                id: 1,
                title: 'Ближайшая доставка курьером 24 июня, понедельник',
            },
            {
                id: 2,
                title: 'Ближайший самовывоз из пункта выдачи с 26 июня, среда',
            },
        ],
        summary: {
            sum: '6 704 ₽',
            promoDiscount: '0 ₽',
            bonusGet: '+1 488 бонусов',
            total: '6 704 ₽',
        },
    },

    masterclass: {
        id: typeIds[cartItemTypes.MASTERCLASS],
        type: cartItemTypes.MASTERCLASS,
        summary: {
            sum: '2 300 ₽',
            promoDiscount: '1 600 ₽',
            bonusGet: '+600 бонусов',
            total: '700 ₽',
        },
    },
};

const cartData = {
    [cartItemTypes.PRODUCT]: {
        ...mockTypes[cartItemTypes.PRODUCT],
        items: [
            ...products.slice(0, 2).map(p => {
                return { id: p.id, type: cartItemTypes.PRODUCT, p, count: 1 };
            }),
        ],
    },

    [cartItemTypes.MASTERCLASS]: {
        ...mockTypes[cartItemTypes.MASTERCLASS],
        items: [
            ...masterClasses.map(mc => {
                return { id: mc.id, type: cartItemTypes.MASTERCLASS, mc, count: 1 };
            }),
        ],
    },
};

const paymentMethods = [
    {
        id: 1,
        title: 'Банковской картой онлайн',
        type: 'card',
    },
    // {
    //     id: 2,
    //     title: 'Наличными при получении',
    //     type: 'cash',
    // },
];

const mockReceiveMethods = [
    {
        id: receiveMethods.DELIVERY,
        title: 'Доставка курьером',
        price: '350 ₽',
        description: 'Ближайшая доставка в понедельник, 24 июня',
        methods: [
            {
                id: deliveryMethods.DELIVERY,
                title: 'Доставка',
            },
        ],
    },
    {
        id: receiveMethods.EXPRESS,
        title: 'Экспресс-доставка',
        price: '500 ₽',
        description: 'Доставка за 4 часа',
        methods: [
            {
                id: deliveryMethods.EXPRESS,
                title: 'Экспресс',
            },
        ],
    },
    {
        id: receiveMethods.PICKUP,
        title: 'Самовывоз из 12 пунктов',
        price: 'Бесплатно',
        description: 'Ближайший самовывоз в среду, 26 июня',
        methods: [
            {
                id: deliveryMethods.OUTPOST_PICKUP,
                title: 'Outpost',
            },
            {
                id: deliveryMethods.POSTOMAT_PICKUP,
                title: 'Postomat',
            },
        ],
    },
];

const confirmationTypes = [
    {
        id: 1,
        title: 'Подтвердить заказ по SMS',
        type: 'sms',
    },
    {
        id: 2,
        title: 'Подтвердить заказ через звонок оператора',
        type: 'call',
    },
];

const addresses = [
    {
        id: 1,
        description: 'ул. Юности, д. 12, кв. 88, г. Зеленоград, г. Москва, Россия, 124482',
    },
    { id: 2, description: 'ул. Парковая, д. 1, кв. 100, г. Москва, Россия, 123456' },
];

const pickupPoints = [
    {
        id: 1,
        methodID: deliveryMethods.POSTOMAT_PICKUP,
        title: 'г. Москва, ул. Стратонавтов, д. 11',
        name: 'Пункт выдачи посылок',
        phone: '+7 800 222-80-00',
        description: `Остановка — Физтех-лицей. 
            Примерное расстояние от остановки до отделения — 200 м. 
            Отделение расположено в 19-ти этажном доме. Расположение входа в отделение — нежилое помещение со стороны улицы, секция ближе к круглым домам.`,
        payment: 'Банковские карты, наличные',
        startDate: 'Можно забрать с 26 июня, среда',
        schedule: [
            { id: 1, title: 'Будни', time: '10:00 — 20:00' },
            { id: 2, title: 'Суббота', time: '10:00 — 18:00' },
            { id: 3, title: 'Воскресенье', time: '10:00 — 15:00' },
        ],
        map: {
            coords: [55.82737306892227, 37.43724449999994],
        },
    },
    {
        id: 2,
        methodID: deliveryMethods.OUTPOST_PICKUP,
        title: 'г. Москва, ул. Пятницкая, д. 3/4, корп. 2',
        name: 'Пункт выдачи посылок',
        phone: '+7 800 333-11-33',
        description: `Остановка — Физтех-лицей. 
            Примерное расстояние от остановки до отделения — 200 м. 
            Отделение расположено в 19-ти этажном доме. Расположение входа в отделение — нежилое помещение со стороны улицы, секция ближе к круглым домам.`,
        payment: 'Банковские карты, наличные',
        startDate: 'Можно забрать с 26 июня, среда',
        schedule: [
            { id: 1, title: 'Будни', time: '10:00 — 20:00' },
            { id: 2, title: 'Воскресенье', time: '10:00 — 15:00' },
        ],
        map: {
            coords: [55.734862141870614, 37.613880184687815],
        },
    },
    {
        id: 3,
        methodID: deliveryMethods.OUTPOST_PICKUP,
        title: 'г. Москва, ул. Пятницкая, д. 3/4, корп. 2',
        name: 'Пункт выдачи посылок',
        phone: '+7 800 333-11-33',
        description: `Остановка — Физтех-лицей. 
            Примерное расстояние от остановки до отделения — 200 м. 
            Отделение расположено в 19-ти этажном доме. Расположение входа в отделение — нежилое помещение со стороны улицы, секция ближе к круглым домам.`,
        payment: 'Банковские карты, наличные',
        startDate: 'Можно забрать с 26 июня, среда',
        schedule: [{ id: 1, title: 'Будни', time: '10:00 — 15:00' }],
        map: {
            coords: [55.74551356898018, 37.627750499999976],
        },
    },
];

const mockDeliveryTypes = [
    {
        id: deliveryTypes.CONSOLIDATION,
        methodID: mockReceiveMethods[0].methods[0].id,
        title: 'Все товары в один день',
        description: 'Одним отправлением',
        items: [
            {
                id: 1,
                selectedDate: mockDate,
                availableDates: [mockDate, addDays(mockDate, 2), addDays(mockDate, 15)],
                items: products.slice(0, 6).map(p => {
                    return { id: p.id, name: p.name, image: p.image };
                }),
            },
        ],
    },
    {
        id: deliveryTypes.SPLIT,
        methodID: mockReceiveMethods[0].methods[0].id,
        title: 'Поскорее',
        description: 'Несколько отправлений',
        items: [
            {
                id: 2,
                selectedDate: mockDate,
                availableDates: [mockDate, addDays(mockDate, 2), addDays(mockDate, 10)],
                items: products.slice(0, 3).map(p => {
                    return { id: p.id, name: p.name, image: p.image };
                }),
            },
            {
                id: 3,
                selectedDate: addDays(mockDate, 4),
                availableDates: [addDays(mockDate, 4), addDays(mockDate, 5), addDays(mockDate, 15)],
                items: products.slice(0, 3).map(p => {
                    return { id: p.id, name: p.name, image: p.image };
                }),
            },
        ],
    },
];

const recipients = [
    {
        id: 1,
        fullname: 'Евгений Лукашин',
        tel: '+7 905 123-45-67',
        email: 'lukashin@gmail.com',
    },
    {
        id: 2,
        fullname: 'Динис Базгутдинов',
        tel: '+7 916 123-45-67',
        email: 'veryverylongemailever-2020@gmail.com',
    },
];

const certificates = [
    {
        id: 1,
        code: 'CERT2020-500',
        amount: 500,
    },
    {
        id: 2,
        code: 'CERT2019-1000',
        amount: 1000,
    },
];

const promocodes = [
    {
        id: 1,
        code: 'ADMITAD700',
        amount: 500,
    },
];

const checkoutData = {
    recipients: [...recipients],
    addresses: [...addresses],
    pickupPoints: [...pickupPoints],
    receiveMethods: [...mockReceiveMethods],
    paymentMethods: [...paymentMethods],
    confirmationTypes: [...confirmationTypes],
    deliveryTypes: [...mockDeliveryTypes],
    availableBonus: 300,

    input: {
        receiveMethodID: mockReceiveMethods[0].id,
        deliveryMethodID: mockReceiveMethods[0].methods[0].id,
        paymentMethodID: paymentMethods[0].id,
        confirmationTypeID: confirmationTypes[0].id,

        recipient: recipients[0],
        address: addresses[0],
        pickupPoint: null,
        deliveryType: mockDeliveryTypes[0],

        subscribe: 0,
        agreement: 0,

        promocode: null,
        bonus: 0,
        certificates: [],
    },

    summary: {
        sum: '6 704 ₽',
        promoDiscount: '0 ₽',
        certDiscount: '0 ₽',
        bonusDiscount: '0 ₽',
        delivery: 'Бесплатно',
        total: '6 704 ₽',
        bonusGet: '+ 1 488',
        bonusSpent: '0',
    },
};

export default class MockHttpService extends HttpServiceBase {
    delete(path, data) {
        return new Promise((resolve, reject) => {
            switch (path) {
                case '/v1/cart/item':
                    if (data.item) {
                        const {
                            item: { id, type },
                        } = data;

                        const cartType = cartData[type];
                        if (!cartType) {
                            reject(new Error('cart type not found'));
                            return;
                        }

                        const itemToDelete = cartType.items.find(i => i.id === id && i.type === type);
                        if (!itemToDelete) {
                            reject(new Error('cart item not found'));
                            return;
                        }

                        const index = cartType.items.indexOf(itemToDelete);
                        cartType.items.splice(index, 1);
                        if (cartType.items.length === 0) cartData[type] = undefined;
                        setTimeout(() => resolve(_cloneDeep(cartData)), 300);
                    } else {
                        cartData[cartItemTypes.PRODUCT] = undefined;
                        cartData[cartItemTypes.MASTERCLASS] = undefined;
                        setTimeout(() => resolve(_cloneDeep(cartData)), 300);
                    }
                    break;
                case '/v1/checkout/certificate':
                    {
                        if (!data.data) {
                            reject(new Error('data not found'));
                            return;
                        }

                        if (!data.certificate) {
                            reject(new Error('certificate not found'));
                            return;
                        }

                        const existCertificate = certificates.find(s => s.code === data.certificate.code);
                        if (!existCertificate) {
                            reject(new Error('wrong certificate code'));
                            return;
                        }

                        const certificateObj = data.data.input.certificates.find(s => s.code === data.certificate.code);
                        if (!certificateObj) {
                            reject(new Error('certificate does not exist'));
                            return;
                        }

                        const clone = _cloneDeep(data.data);
                        const certDiscount =
                            Number(clone.summary.certDiscount.replace(/\D+/g, '')) - existCertificate.amount;
                        const total = Number(clone.summary.total.replace(/\D+/g, '')) + existCertificate.amount;

                        const index = clone.input.certDiscounts.indexOf(certificateObj);
                        clone.input.certDiscounts.splice(index, 1);

                        clone.summary.certDiscount = certDiscount > 0 ? `- ${preparePrice(certDiscount)} ₽` : '0 ₽';
                        clone.summary.total = `${preparePrice(total < 0 ? 0 : total)} ₽`;
                        setTimeout(() => resolve(clone), 300);
                    }
                    break;
                case '/v1/checkout/bonus':
                    {
                        if (!data.data) {
                            reject(new Error('data not found'));
                            return;
                        }

                        const clone = _cloneDeep(data.data);
                        const total = Number(clone.summary.total.replace(/\D+/g, '')) + Number(clone.input.bonus);
                        clone.input.bonus = 0;

                        clone.summary.bonusSpent = `${0}`;
                        clone.summary.bonusDiscount = `${0} ₽`;
                        clone.summary.total = `${preparePrice(total < 0 ? 0 : total)} ₽`;
                        setTimeout(() => resolve(clone), 300);
                    }
                    break;
                case '/v1/checkout/promocode':
                    {
                        if (!data.data) {
                            reject(new Error('data not found'));
                            return;
                        }

                        const existPromocode = promocodes.find(s => s.code === data.data.input.promocode);
                        if (!existPromocode) {
                            reject(new Error('wrong promocode'));
                            return;
                        }

                        const clone = _cloneDeep(data.data);
                        const promoDiscount =
                            Number(clone.summary.promoDiscount.replace(/\D+/g, '')) - existPromocode.amount;
                        const total = Number(clone.summary.total.replace(/\D+/g, '')) + existPromocode.amount;

                        clone.input.promocode = null;
                        clone.summary.promoDiscount = promoDiscount > 0 ? `- ${preparePrice(promoDiscount)} ₽` : '0 ₽';
                        clone.summary.total = `${preparePrice(total < 0 ? 0 : total)} ₽`;
                        setTimeout(() => resolve(clone), 300);
                    }
                    break;
                default:
                    reject();
            }
        });
    }

    post(path, data) {
        return new Promise((resolve, reject) => {
            switch (path) {
                case '/v1/cart/item':
                    {
                        if (!data.item) throw new Error('item not found');

                        const {
                            item: { id, type },
                        } = data;

                        let cartType = cartData[type];
                        if (!cartType) {
                            cartData[type] = { ...mockTypes[type], items: [{ id, type, count: 1, item: data.item }] };
                        } else {
                            cartType = cartData[type];
                            const existItem = cartType.items.find(i => i.id === id && i.type === type);
                            if (!existItem) cartType.items.push({ id, type, count: 1, item: data.item });
                            else if (data.count) existItem.count = data.count;
                            else existItem.count += 1;
                        }
                        setTimeout(() => resolve(_cloneDeep(cartData)), 300);
                    }
                    break;

                case '/v1/checkout/receive-method':
                    {
                        if (!data.method) {
                            reject(new Error('method not found'));
                            return;
                        }

                        if (!data.data) {
                            reject(new Error('data not found'));
                            return;
                        }

                        const clone = _cloneDeep(data.data);

                        switch (data.method.id) {
                            case receiveMethods.DELIVERY:
                            case receiveMethods.EXPRESS:
                                clone.input.address = addresses[0];
                                clone.input.pickupPoint = null;
                                clone.deliveryTypes = [...mockDeliveryTypes];
                                break;
                            case receiveMethods.PICKUP:
                                clone.pickupPoints = [...pickupPoints];
                                clone.input.address = null;
                                clone.input.pickupPoint = null;
                                clone.deliveryTypes = [];
                                break;
                            default:
                                break;
                        }
                        clone.input.receiveMethodID = data.method.id;

                        // пересчет
                        const price = Number(data.method.price.replace(/\D+/g, ''));
                        const delivery = Number(clone.summary.delivery.replace(/\D+/g, ''));
                        let total = Number(clone.summary.total.replace(/\D+/g, ''));
                        if (!Number.isNaN(delivery)) total += delivery;
                        if (!Number.isNaN(price)) total -= price;

                        clone.summary.delivery =
                            !Number.isNaN(price) && price > 0 ? `- ${preparePrice(price)} ₽` : 'Бесплатно';
                        clone.summary.total = `${preparePrice(total < 0 ? 0 : total)} ₽`;
                        setTimeout(() => resolve(clone), 300);
                    }
                    break;

                case '/v1/checkout/address':
                    {
                        if (!data.data) {
                            reject(new Error('data not found'));
                            return;
                        }
                        if (!data.address) {
                            reject(new Error('address not found'));
                            return;
                        }

                        const clone = _cloneDeep(data.data);
                        // сетаем типы, полученные из сервиса для данного адреса
                        clone.deliveryTypes = [...mockDeliveryTypes];
                        clone.input.address = data.address;
                        clone.input.deliveryType = mockDeliveryTypes[0];
                        setTimeout(() => resolve(clone), 300);
                    }
                    break;

                case '/v1/checkout/pickup-point':
                    {
                        if (!data.data) {
                            reject(new Error('data not found'));
                            return;
                        }
                        if (!data.pickupPoint) {
                            reject(new Error('point not found'));
                            return;
                        }

                        const clone = _cloneDeep(data.data);
                        // сетаем типы, полученные из сервиса для данного адреса
                        clone.deliveryTypes = [...mockDeliveryTypes];
                        clone.input.pickupPoint = data.pickupPoint;
                        clone.input.deliveryType = mockDeliveryTypes[0];
                        setTimeout(() => resolve(clone), 300);
                    }
                    break;

                case '/v1/checkout/certificate':
                    {
                        if (!data.data) {
                            reject(new Error('data not found'));
                            return;
                        }
                        if (!data.code) {
                            reject(new Error('code not found'));
                            return;
                        }

                        const existCertificate = certificates.find(s => s.code === data.code);
                        if (!existCertificate) {
                            reject(new Error('wrong certificate code'));
                            return;
                        }

                        if (data.data.input.certificates.some(s => s.code === data.code)) {
                            reject(new Error('exists certificate code'));
                            return;
                        }

                        const clone = _cloneDeep(data.data);
                        const certDiscount =
                            Number(clone.summary.certDiscount.replace(/\D+/g, '')) + existCertificate.amount;
                        const total = Number(clone.summary.total.replace(/\D+/g, '')) - existCertificate.amount;

                        clone.input.certDiscounts.push(existCertificate);
                        clone.summary.certDiscount = certDiscount > 0 ? `- ${preparePrice(certDiscount)} ₽` : '0 ₽';
                        clone.summary.total = `${preparePrice(total < 0 ? 0 : total)} ₽`;
                        setTimeout(() => resolve(clone), 300);
                    }
                    break;
                case '/v1/checkout/bonus':
                    {
                        if (!data.data) reject(new Error('data not found'));
                        if (!data.bonus) reject(new Error('bonus not found'));

                        const clone = _cloneDeep(data.data);
                        const total = Number(clone.summary.total.replace(/\D+/g, '')) - Number(data.bonus);
                        clone.input.bonus = data.bonus;
                        clone.summary.bonusSpent = data.bonus > 0 ? `- ${preparePrice(data.bonus)}` : '0';
                        clone.summary.bonusDiscount = data.bonus > 0 ? `- ${preparePrice(data.bonus)} ₽` : '0 ₽';
                        clone.summary.total = `${preparePrice(total < 0 ? 0 : total)} ₽`;
                        setTimeout(() => resolve(clone), 300);
                    }
                    break;
                case '/v1/checkout/promocode':
                    {
                        if (!data.data) {
                            reject(new Error('data not found'));
                            return;
                        }

                        if (!data.promocode) {
                            reject(new Error('promocode not found'));
                            return;
                        }

                        const existPromocode = promocodes.find(s => s.code === data.promocode);
                        if (!existPromocode) {
                            reject(new Error('wrong promocode'));
                            return;
                        }

                        if (data.data.input.promocode === data.promocode) {
                            reject(new Error('exists promocode'));
                            return;
                        }

                        const clone = _cloneDeep(data.data);
                        const promoDiscount =
                            Number(clone.summary.promoDiscount.replace(/\D+/g, '')) + existPromocode.amount;
                        const total = Number(clone.summary.total.replace(/\D+/g, '')) - existPromocode.amount;

                        clone.input.promocode = data.promocode;
                        clone.summary.promoDiscount = promoDiscount > 0 ? `- ${preparePrice(promoDiscount)} ₽` : '0 ₽';
                        clone.summary.total = `${preparePrice(total < 0 ? 0 : total)} ₽`;
                        setTimeout(() => resolve(clone), 300);
                    }
                    break;
                default:
                    reject();
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
                case '/v1/auth/check-session':
                    setTimeout(resolve(true), 300);
                    break;
                case '/v1/search':
                    if (data) {
                        setTimeout(
                            () =>
                                resolve({
                                    products: products.filter(p => p.name.toLowerCase().includes(data)),
                                    categories: categories.filter(c => c.name.toLowerCase().includes(data)),
                                }),
                            300
                        );
                    } else
                        resolve({
                            products: [],
                            categories: [],
                        });
                    break;
                case '/v1/products':
                    switch (data.code) {
                        case 'blesk-dlya-gub-13':
                            setTimeout(() => resolve({ items: products.slice(3, 5), range: 2 }), 300);
                            break;
                        case 'gubnaya-pomada-14':
                            setTimeout(() => resolve({ items: products.slice(8, 10), range: 2 }), 300);
                            break;
                        case 'karandashi-dlya-gub-15':
                            setTimeout(() => resolve({ items: products.slice(4, 6), range: 2 }), 300);
                            break;
                        case 'dlya-gub-12':
                            setTimeout(() => resolve({ items: products.slice(5, 11), range: 6 }), 300);
                            break;
                        case 'makiyazh-4':
                            setTimeout(() => resolve({ items: products.slice(3, 11), range: 8 }), 300);
                            break;
                        default:
                            setTimeout(() => resolve({ items: products, range: 16 }), 300);
                    }
                    break;
                case '/v1/catalog/items':
                    switch (data.code) {
                        case 'blesk-dlya-gub-13':
                            setTimeout(() => resolve({ items: products.slice(3, 5), range: 2 }), 300);
                            break;
                        case 'gubnaya-pomada-14':
                            setTimeout(() => resolve({ items: products.slice(8, 10), range: 2 }), 300);
                            break;
                        case 'karandashi-dlya-gub-15':
                            setTimeout(() => resolve({ items: products.slice(4, 6), range: 2 }), 300);
                            break;
                        case 'dlya-gub-12':
                            setTimeout(
                                () =>
                                    resolve({
                                        items: [...products.slice(5, 9), productBanners[1], ...products.slice(9, 11)],
                                        range: 6,
                                    }),
                                300
                            );
                            break;
                        case 'makiyazh-4':
                            setTimeout(
                                () =>
                                    resolve({
                                        items: [...products.slice(3, 7), productBanners[0], ...products.slice(7, 11)],
                                        range: 8,
                                    }),
                                300
                            );
                            break;
                        default:
                            setTimeout(
                                () =>
                                    resolve({
                                        items: [...products.slice(0, 6), productBanners[0], ...products.slice(6, 12)],
                                        range: 13,
                                    }),
                                300
                            );
                    }
                    break;

                case '/v1/categories':
                    setTimeout(() => resolve(productCategories), 300);
                    break;

                case '/v1/banners':
                    setTimeout(() => resolve(banners), 300);
                    break;

                case '/v1/instagram':
                    setTimeout(() => resolve(instagrams), 300);
                    break;

                case '/v1/brands':
                    setTimeout(() => resolve(brands), 300);
                    break;

                case '/v1/masterclasses':
                    setTimeout(() => resolve(masterClasses), 300);
                    break;

                case '/v1/product':
                    switch (data.code) {
                        default:
                            setTimeout(() => resolve(productsDetails[0]), 300);
                    }
                    break;

                case '/v1/cart/data':
                    setTimeout(() => resolve(_cloneDeep(cartData)), 300);
                    break;

                case '/v1/checkout/data':
                    setTimeout(() => resolve(_cloneDeep(checkoutData)), 300);
                    break;

                case '/v1/brand':
                    if (!data.brandCode) {
                        reject(new Error('wrong brandCode'));
                        return;
                    }
                    const brand = brandDetails.find(b => b.code === data.brandCode);
                    if (!brand) {
                        reject("brand doesn't exist");
                        return;
                    }
                    setTimeout(() => resolve(_cloneDeep(brand)), 300);
                    break;

                default:
                    reject(new Error(`Unknown method, path: ${path}, data: ${JSON.stringify(data)}`));
            }
        });
    }
}
