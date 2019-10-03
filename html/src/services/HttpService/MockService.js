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

/* eslint-disable no-console */
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

const productCategories = [
    {
        id: 1,
        name: 'Уход за волосами',
        to: '/',
        image: 'https://via.placeholder.com/150x150',
    },
    {
        id: 2,
        name: 'Для лица и тела',
        to: '/',
        image: 'https://via.placeholder.com/150x150',
    },
    {
        id: 3,
        name: 'Для рук и ног',
        to: '/',
        image: 'https://via.placeholder.com/150x150',
    },
    {
        id: 4,
        name: 'Макияж',
        to: '/',
        image: 'https://via.placeholder.com/150x150',
    },
    {
        id: 5,
        name: 'Для ногтей',
        to: '/',
        image: 'https://via.placeholder.com/150x150',
    },
    {
        id: 6,
        name: 'Инструменты',
        to: '/',
        image: 'https://via.placeholder.com/150x150',
    },
    {
        id: 7,
        name: 'Аксессуары',
        to: '/',
        image: 'https://via.placeholder.com/150x150',
    },
    {
        id: 8,
        name: 'Мужская коллекция',
        to: '/',
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
    get(path, data) {
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
                    setTimeout(() => resolve(products), 300);
                    break;
                case '/categories':
                    setTimeout(() => resolve(productCategories), 300);
                    break;
                default:
                    reject();
            }
        });
    }
}

/* eslint-enable no-console */
