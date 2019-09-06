/* eslint-disable no-console */
import axios from 'axios';
import { search } from '../../api';

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
                    if (data && !data.includes('шампунь для'))
                        setTimeout(
                            () =>
                                resolve({
                                    categories: [
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
                                    ],
                                    products: [
                                        {
                                            id: 1,
                                            name: 'EvoСухой шампунь-спрей Water Killer, 200 мл',
                                            price: '1 900 ₽',
                                            oldPrice: '1 600 ₽',
                                        },
                                        {
                                            id: 2,
                                            name: 'Kevin Murphy Шампунь для уплотнения волос, 200 мл',
                                            price: '1 900 ₽',
                                            oldPrice: '1 600 ₽',
                                        },
                                        {
                                            id: 3,
                                            name: 'Alterna Шампунь для мгновенного восстановления, 250 мл',
                                            price: '1 900 ₽',
                                            oldPrice: '1 600 ₽',
                                        },
                                        {
                                            id: 4,
                                            name: 'Alterna Шампунь лифтинг для объема, 200 мл',
                                        },
                                        {
                                            id: 5,
                                            name: 'Kevin Murphy Шампунь для уплотнения волос, 200 мл',
                                            price: '1 900 ₽',
                                            oldPrice: '1 600 ₽',
                                        },
                                        {
                                            id: 6,
                                            name: 'Kevin Murphy Шампунь для уплотнения волос, 200 мл',
                                            price: '1 900 ₽',
                                            oldPrice: '1 600 ₽',
                                        },
                                        {
                                            id: 7,
                                            name: 'Alterna Шампунь для мгновенного восстановления, 250 мл',
                                            price: '1 900 ₽',
                                            oldPrice: '1 600 ₽',
                                        },
                                        {
                                            id: 8,
                                            name: 'R+Co Шампунь для совершенства волос, 240 мл',
                                            price: '1 900 ₽',
                                            oldPrice: '1 600 ₽',
                                        },
                                        {
                                            id: 9,
                                            name: 'Alterna Шампунь лифтинг для объема, 200 мл',
                                            price: '1 900 ₽',
                                            oldPrice: '1 600 ₽',
                                        },
                                        {
                                            id: 10,
                                            name: 'Alterna Шампунь для мгновенного восстановления, 250 мл',
                                            price: '1 900 ₽',
                                            oldPrice: '1 600 ₽',
                                        },
                                        {
                                            id: 11,
                                            name: 'Alterna Шампунь лифтинг для объема, 200 мл',
                                            price: '1 900 ₽',
                                            oldPrice: '1 600 ₽',
                                        },
                                        {
                                            id: 12,
                                            name: 'Evo Сухой шампунь-спрей Water Killer, 200 мл',
                                            price: '1 900 ₽',
                                            oldPrice: '1 600 ₽',
                                        },
                                        {
                                            id: 13,
                                            name: 'Evo Сухой шампунь-спрей Water Killer, 200 мл',
                                            price: '1 900 ₽',
                                            oldPrice: '1 600 ₽',
                                        },
                                        {
                                            id: 14,
                                            name: 'Alterna Шампунь для мгновенного восстановления, 250 мл',
                                            price: '1 900 ₽',
                                            oldPrice: '1 600 ₽',
                                        },
                                    ],
                                }),
                            300
                        );
                    else if (data.includes('шампунь для')) {
                        setTimeout(
                            () =>
                                resolve({
                                    categories: [
                                        {
                                            id: 2,
                                            name: 'Шампунь для жирных волос',
                                        },
                                        {
                                            id: 3,
                                            name: 'Шампунь для вьющихся волос',
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
                                    ],
                                    products: [
                                        {
                                            id: 2,
                                            name: 'Kevin Murphy Шампунь для уплотнения волос, 200 мл',
                                            price: '1 900 ₽',
                                            oldPrice: '1 600 ₽',
                                        },
                                        {
                                            id: 3,
                                            name: 'Alterna Шампунь для мгновенного восстановления, 250 мл',
                                            price: '1 900 ₽',
                                            oldPrice: '1 600 ₽',
                                        },
                                        {
                                            id: 6,
                                            name: 'Kevin Murphy Шампунь для уплотнения волос, 200 мл',
                                            price: '1 900 ₽',
                                            oldPrice: '1 600 ₽',
                                        },
                                        {
                                            id: 11,
                                            name: 'Alterna Шампунь лифтинг для объема, 200 мл',
                                            price: '1 900 ₽',
                                            oldPrice: '1 600 ₽',
                                        },
                                        {
                                            id: 12,
                                            name: 'Evo Сухой шампунь-спрей Water Killer, 200 мл',
                                            price: '1 900 ₽',
                                            oldPrice: '1 600 ₽',
                                        },
                                        {
                                            id: 13,
                                            name: 'Evo Сухой шампунь-спрей Water Killer, 200 мл',
                                            price: '1 900 ₽',
                                            oldPrice: '1 600 ₽',
                                        },
                                        {
                                            id: 14,
                                            name: 'Alterna Шампунь для мгновенного восстановления, 250 мл',
                                            price: '1 900 ₽',
                                            oldPrice: '1 600 ₽',
                                        },
                                    ],
                                }),
                            300
                        );
                    } else
                        resolve({
                            products: [],
                            categories: [],
                        });
                    break;
                default:
                    reject();
            }
        });
    }
}

/* eslint-enable no-console */
