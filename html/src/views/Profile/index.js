/**
 * @Module
 */

import Account from './Account/Account';
import Referal from './Referal/Referal';

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
            children: [...Account.routes, ...Referal.routes],
        },
    ],
};
