import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export const NAME = 'returnPage';

export const PRODUCTS = 'products';
export const SELECTED_PRODUCTS = 'selectedProducts';
export const COURIER_DELIVERY = 'courierDelivery';
export const ADDRESSES = 'addresses';

export const STEP = 'step';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,

        state: {
            [STEP]: null,
            [PRODUCTS]: [
                {
                    id: 532,
                    categoryCodes: ['dlya_makiyazha'],
                    code: 'shampun-dlya-uplotneniya-volos-plumping-wash',
                    description: 'Цвет 27',
                    image: {
                        id: 3,
                        sourceExt: 'jpg',
                    },
                    name: 'Шампунь для уплотнения волос Plumping.Wash',
                    price: {
                        currency: 'RUB',
                        value: 3000,
                    },
                    oldPrice: {
                        currency: 'RUB',
                        value: 4200,
                    },
                    productId: 2,
                    stock: {
                        qty: 3,
                        storeId: 1,
                    },
                    type: 'product',
                },
                {
                    id: 531,
                    categoryCodes: ['dlya_makiyazha'],
                    code: 'shampun-dlya-uplotneniya-volos-plumping-wash',
                    image: {
                        id: 3,
                        sourceExt: 'jpg',
                    },
                    name: 'Второй шамнупь для уплотнение Plumping.Wash с очень длинным названием',
                    price: {
                        currency: 'RUB',
                        value: 300,
                    },
                    oldPrice: {
                        currency: 'RUB',
                        value: 450,
                    },
                    productId: 2,
                    stock: {
                        qty: 1,
                        storeId: 1,
                    },
                    type: 'product',
                },
            ],
            [SELECTED_PRODUCTS]: [],
            [COURIER_DELIVERY]: [
                {
                    id: 1,
                    title: 'Отправление №124589524-1',
                    time: '24 июня (пн), с 10:00 до 18:00',
                    products: [
                        {
                            id: 531,
                            categoryCodes: ['dlya_makiyazha'],
                            code: 'shampun-dlya-uplotneniya-volos-plumping-wash',
                            image: {
                                id: 3,
                                sourceExt: 'jpg',
                            },
                            name: 'Второй шамнупь для уплотнение Plumping.Wash с очень длинным названием',
                            price: {
                                currency: 'RUB',
                                value: 300,
                            },
                            oldPrice: {
                                currency: 'RUB',
                                value: 450,
                            },
                            productId: 2,
                            stock: {
                                qty: 1,
                                storeId: 1,
                            },
                            type: 'product',
                            quantity: 1,
                            reason: 'Вскрыта оригинальная упаковка',
                        },
                    ],
                    selectedAddress: null,
                },
                {
                    id: 2,
                    title: 'Отправление №124589524-2',
                    time: '28 июня (пт), с 10:00 до 18:00',
                    products: [
                        {
                            id: 532,
                            categoryCodes: ['dlya_makiyazha'],
                            code: 'shampun-dlya-uplotneniya-volos-plumping-wash',
                            description: 'Цвет 27',
                            image: {
                                id: 3,
                                sourceExt: 'jpg',
                            },
                            name: 'Шампунь для уплотнения волос Plumping.Wash',
                            price: {
                                currency: 'RUB',
                                value: 3000,
                            },
                            oldPrice: {
                                currency: 'RUB',
                                value: 4200,
                            },
                            productId: 2,
                            stock: {
                                qty: 3,
                                storeId: 1,
                            },
                            type: 'product',
                            quantity: 1,
                            reason: 'Не тот товар в заказе',
                        },
                    ],
                    selectedAddress: null,
                },
            ],
            [ADDRESSES]: [
                {
                    area: 'поселение Воскресенское',
                    city: 'г Москва',
                    flat: '21',
                    block: '',
                    floor: '3',
                    house: 'д 4',
                    porch: 'undefined',
                    region: 'г Москва',
                    street: '',
                    comment: '2',
                    geo_lat: '55.5295556',
                    geo_lon: '37.4456939',
                    intercom: '',
                    area_guid: 'f3860e12-eee7-4a1a-8ece-0d82b2ce497f',
                    city_guid: '0c5b2444-70a0-4932-980c-b4dc0d3f02b5',
                    post_index: '108803',
                    region_guid: '0c5b2444-70a0-4932-980c-b4dc0d3f02b5',
                    country_code: 'RU',
                    id: 44,
                },
                {
                    area: 'ул. Парковая',
                    city: 'г Москва',
                    flat: '31',
                    block: '',
                    floor: '3',
                    house: 'д 4',
                    porch: 'undefined',
                    region: 'г Москва',
                    street: '',
                    comment: '2',
                    geo_lat: '55.5295556',
                    geo_lon: '37.4456939',
                    intercom: '',
                    area_guid: 'f421421412ce497f',
                    city_guid: '0c5b2444-70a0-4932-9841d3f02b5',
                    post_index: '108803',
                    region_guid: '0c5b2444-70a0-4932-9841d3f02b5',
                    country_code: 'RU',
                    id: 45,
                },
            ],
        },

        actions,
        mutations,
        getters,
    };
}
