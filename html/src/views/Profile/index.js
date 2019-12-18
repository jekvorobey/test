/**
 * @Module
 */

import Account from './Account/Account';
import Referal from './Referal/Referal';
import Promocodes from './Promocodes/Promocodes';
import Promopage from './Promopage/Promopage';
import ProPreferences from './ProPreferences/ProPreferences';
import Seo from './Seo/Seo';

const ProfileAsync = () => import(/* webpackChunkName: "profile-view" */ './Profile.vue');

/**
 * Модуль компонента Profile
 */
export default {
    /**
     * Роуты для данного модуля
     */
    routes: [
        {
            path: '/profile',
            component: ProfileAsync,
            children: [
                ...Account.routes,
                ...Referal.routes,
                ...Promocodes.routes,
                ...Promopage.routes,
                ...ProPreferences.routes,
                ...Seo.routes,
            ],
        },
    ],
};
