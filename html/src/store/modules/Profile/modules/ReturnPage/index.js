import actions from './actions';
import mutations from './mutations';
import getters from './getters';

import { returnFormSteps } from '@enums/profile';

export const NAME = 'returnPage';

export const PRODUCTS = 'products';
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
        },

        actions,
        mutations,
        getters,
    };
}
