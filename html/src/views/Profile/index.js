/**
 * @Module
 */

import hasSession from '@router/middleware/hasSession';
import setUser from '@router/middleware/setUser';

import Cabinet from './Cabinet/Cabinet';
import Addresses from './Addresses/Addresses';
import Preferences from './Preferences/Preferences';
import Payment from './Payment/Payment';
import Subscribes from './Subscribes/Subscribes';
import Messages from './Messages/Messages';
import MessageDetails from './MessageDetails/MessageDetails';
import Certificates from './Certificates/Certificates';
import Bonuses from './Bonuses/Bonuses';
import Orders from './Orders/Orders';
import OrderDetails from './OrderDetails/OrderDetails';
import ReferalOrderDetails from './ReferalOrderDetails/ReferalOrderDetails';

import Referal from './Referal/Referal';
import Promocodes from './Promocodes/Promocodes';
import Promopage from './Promopage/Promopage';
import ProPreferences from './ProPreferences/ProPreferences';
import Seo from './Seo/Seo';
import Account from './Account/Account';
import Documents from './Documents/Documents';

import HowItWorks from './HowItWorks/HowItWorks';
import Guides from './Guides/Guides';
import GuideDetails from './GuideDetails/GuideDetails';
import Masterclasses from './Masterclasses/Masterclasses';
import QnA from './QnA/QnA';

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

            meta: {
                middleware: [hasSession, setUser],
            },

            children: [
                ...Cabinet.routes,
                ...Preferences.routes,
                ...Addresses.routes,
                ...Payment.routes,
                ...Subscribes.routes,
                ...Messages.routes,
                ...MessageDetails.routes,
                ...Certificates.routes,
                ...Bonuses.routes,
                ...Orders.routes,
                ...OrderDetails.routes,
                ...ReferalOrderDetails.routes,

                ...Referal.routes,
                ...Promocodes.routes,
                ...Promopage.routes,
                ...ProPreferences.routes,
                ...Seo.routes,
                ...Account.routes,
                ...Documents.routes,

                ...HowItWorks.routes,
                ...Guides.routes,
                ...GuideDetails.routes,
                ...Masterclasses.routes,
                ...QnA.routes,

                {
                    path: '*',
                    redirect: '/profile',
                },
            ],
        },
    ],
};
