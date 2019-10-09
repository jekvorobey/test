import product1 from '../../assets/images/mock/product1.png';
import product2 from '../../assets/images/mock/product2.png';
import product3 from '../../assets/images/mock/product3.png';
import product4 from '../../assets/images/mock/product4.png';
import product5 from '../../assets/images/mock/product5.png';
import product6 from '../../assets/images/mock/product6.png';
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
        image: instagram1,
    },
    {
        id: 2,
        image: instagram2,
    },
    {
        id: 3,
        image: instagram3,
    },
    {
        id: 4,
        image: instagram4,
    },
    {
        id: 5,
        image: instagram5,
    },
    {
        id: 6,
        image: instagram6,
    },
    {
        id: 7,
        image: instagram7,
    },
    {
        id: 8,
        image: instagram8,
    },
];

const mainBanners = [
    {
        id: 1,
        title: 'Стильные аксессуары для волос Kela с кристаллами и покрытием',
        image: 'https://via.placeholder.com/350x200',
    },
    {
        id: 2,
        title: 'Встречайте обновленный бренд Christina Fitzgerald',
        image: 'https://via.placeholder.com/350x200',
    },
];

const middleBanners = [
    {
        id: 1,
        title: 'Стайлинги для летних укладок',
        image: instagram7,
    },
    {
        id: 2,
        title: 'Косметика для лица и тела',
        image: instagram3,
    },
    {
        id: 3,
        title: 'Натуральный макияж Aveda',
        image: instagram1,
    },
];

const brands = [
    {
        id: 1,
        name: 'Brand1',
        image: brand1,
    },
    {
        id: 2,
        name: 'Brand2',
        image: brand2,
    },
    {
        id: 3,
        name: 'Brand3',
        image: brand3,
    },
    {
        id: 4,
        name: 'Brand4',
        image: brand4,
    },
    {
        id: 5,
        name: 'Brand5',
        image: brand5,
    },
    {
        id: 6,
        name: 'Brand6',
        image: brand1,
    },
    {
        id: 7,
        name: 'Brand7',
        image: brand2,
    },
];

const productCategories = [
    {
        id: 1,
        name: 'Уход за волосами',
        code: null,
        image: 'https://via.placeholder.com/150x150',
    },
    {
        id: 2,
        name: 'Для лица и тела',
        code: null,
        image: 'https://via.placeholder.com/150x150',
    },
    {
        id: 3,
        name: 'Для рук и ног',
        code: null,
        image: 'https://via.placeholder.com/150x150',
    },
    {
        id: 4,
        name: 'Макияж',
        code: 'makiyazh-4',
        image: 'https://via.placeholder.com/150x150',
        items: [
            {
                id: 9,
                name: 'Для лица',
                code: null,
            },
            {
                id: 10,
                name: 'Для глаз',
                code: null,
            },
            {
                id: 11,
                name: 'Для бровей',
                code: null,
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
        code: null,
        image: 'https://via.placeholder.com/150x150',
    },
    {
        id: 6,
        name: 'Инструменты',
        code: null,
        image: 'https://via.placeholder.com/150x150',
    },
    {
        id: 7,
        name: 'Аксессуары',
        code: null,
        image: 'https://via.placeholder.com/150x150',
    },
    {
        id: 8,
        name: 'Мужская коллекция',
        code: null,
        image: 'https://via.placeholder.com/150x150',
    },
];

const products = [
    {
        id: 1,
        name: 'EvoСухой шампунь-спрей Water Killer, 200 мл',
        description: 'EvoСухой шампунь-спрей Water Killer, 200 мл',
        image: product1,
        price: '1 900 ₽',
        oldPrice: '1 600 ₽',
        tags: ['Новинка', '-15%'],
        type: 'simple',
        rating: 5,
    },
    {
        id: 2,
        name: 'Kevin Murphy Шампунь для уплотнения волос, 200 мл',
        description: 'Kevin Murphy Шампунь для уплотнения волос, 200 мл',
        image: product2,
        price: '1 900 ₽',
        oldPrice: null,
        tags: ['-15%'],
        type: 'simple',
        rating: 1,
    },
    {
        id: 3,
        name: 'Alterna Шампунь для мгновенного восстановления, 250 мл',
        description: 'Alterna Шампунь для мгновенного восстановления, 250 мл',
        image: product3,
        price: '1 900 ₽',
        oldPrice: '1 600 ₽',
        tags: ['Новинка'],
        type: 'simple',
        rating: 3,
    },
    {
        id: 4,
        name: 'Alterna Шампунь лифтинг для объема, 200 мл',
        description: 'Alterna Шампунь лифтинг для объема, 200 мл',
        image: product4,
        price: '1 900 ₽',
        oldPrice: '1 600 ₽',
        rating: 2,
    },
    {
        id: 5,
        name: 'Kevin Murphy Шампунь для уплотнения волос, 200 мл',
        description: 'Kevin Murphy Шампунь для уплотнения волос, 200 мл',
        image: product5,
        price: '1 900 ₽',
        oldPrice: null,
        type: 'complicate',
        rating: 2,
    },
    {
        id: 6,
        name: 'Kevin Murphy Шампунь для уплотнения волос, 200 мл',
        description: 'Kevin Murphy Шампунь для уплотнения волос, 200 мл',
        image: product6,
        price: '1 900 ₽',
        oldPrice: '1 600 ₽',
        type: 'simple',
        rating: 3,
    },
    {
        id: 7,
        name: 'Alterna Шампунь для мгновенного восстановления, 250 мл',
        description: 'Alterna Шампунь для мгновенного восстановления, 250 мл',
        image: product7,
        price: '1 900 ₽',
        oldPrice: '1 600 ₽',
        type: 'complicate',
        rating: 3,
    },
    {
        id: 8,
        name: 'R+Co Шампунь для совершенства волос, 240 мл',
        description: 'R+Co Шампунь для совершенства волос, 240 мл',
        image: product8,
        price: '1 900 ₽',
        oldPrice: '1 600 ₽',
        type: 'complicate',
        rating: 5,
    },
    {
        id: 9,
        name: 'Alterna Шампунь лифтинг для объема, 200 мл',
        description: 'Alterna Шампунь лифтинг для объема, 200 мл',
        image: product9,
        price: '1 900 ₽',
        oldPrice: '1 600 ₽',
        type: 'complicate',
        rating: 5,
    },
    {
        id: 10,
        name: 'Alterna Шампунь для мгновенного восстановления, 250 мл',
        description: 'Alterna Шампунь для мгновенного восстановления, 250 мл',
        image: product10,
        price: '1 900 ₽',
        oldPrice: '1 600 ₽',
        type: 'complicate',
        rating: 5,
    },
    {
        id: 11,
        name: 'Alterna Шампунь лифтинг для объема, 200 мл',
        description: 'Alterna Шампунь лифтинг для объема, 200 мл',
        image: product11,
        price: '1 900 ₽',
        oldPrice: '1 600 ₽',
        type: 'complicate',
        rating: 5,
    },
    {
        id: 12,
        name: 'Evo Сухой шампунь-спрей Water Killer, 200 мл',
        description: 'Evo Сухой шампунь-спрей Water Killer, 200 мл',
        image: product12,
        price: '1 900 ₽',
        oldPrice: '1 600 ₽',
        type: 'complicate',
        rating: 3,
    },
    {
        id: 13,
        name: 'EvoСухой шампунь-спрей Water Killer, 200 мл',
        description: 'EvoСухой шампунь-спрей Water Killer, 200 мл',
        image: product1,
        price: '1 900 ₽',
        oldPrice: '1 600 ₽',
        tags: ['Новинка', '-15%'],
        type: 'simple',
        rating: 5,
    },
    {
        id: 14,
        name: 'Kevin Murphy Шампунь для уплотнения волос, 200 мл',
        description: 'Kevin Murphy Шампунь для уплотнения волос, 200 мл',
        image: product2,
        price: '1 900 ₽',
        oldPrice: null,
        tags: ['-15%'],
        type: 'simple',
        rating: 1,
    },
    {
        id: 15,
        name: 'Alterna Шампунь для мгновенного восстановления, 250 мл',
        description: 'Alterna Шампунь для мгновенного восстановления, 250 мл',
        image: product3,
        price: '1 900 ₽',
        oldPrice: '1 600 ₽',
        tags: ['Новинка'],
        type: 'simple',
        rating: 3,
    },
];

export default class MockHttpService {
    /**
     *
     * @param {String} path
     * @param {*} data
     * @returns {Promise<Object>}
     */
    post(path, data) {
        return new Promise((resolve, reject) => {
            resolve();
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
                case '/search':
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
                case '/products':
                    switch (data.code) {
                        case 'blesk-dlya-gub-13':
                            setTimeout(() => resolve(products.slice(3, 5)), 300);
                            break;
                        case 'gubnaya-pomada-14':
                            setTimeout(() => resolve(products.slice(5, 8)), 300);
                            break;
                        case 'karandashi-dlya-gub-15':
                            setTimeout(() => resolve(products.slice(8, 10)), 300);
                            break;
                        case 'dlya-gub-12':
                            setTimeout(() => resolve(products.slice(3, 11)), 300);
                            break;
                        case 'makiyazh-4':
                            setTimeout(() => resolve(products), 300);
                            break;
                        default:
                            setTimeout(() => reject(), 300);
                    }
                    break;
                case '/categories':
                    setTimeout(() => resolve(productCategories), 300);
                    break;
                case '/banners':
                    setTimeout(() => resolve({ mainBanners, sliderBanners: mainBanners, middleBanners }), 300);
                    break;
                case '/instagram':
                    setTimeout(() => resolve(instagrams), 300);
                    break;
                case '/brands':
                    setTimeout(() => resolve(brands), 300);
                    break;
                default:
                    reject();
            }
        });
    }
}

/* eslint-enable no-console */
