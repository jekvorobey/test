import actions from './actions';
import mutations from './mutations';
import getters from './getters';

import cabinet from './modules/Cabinet';
import preferences from './modules/Preferences';
import addresses from './modules/Addresses';
import orders from './modules/Orders';
import seo from './modules/Seo';
import promopage from './modules/Promopage';
import documents from './modules/Documents';
import referral from './modules/Referral';
import billing from './modules/Billing';
import promocodes from './modules/Promocodes';
import returnPage from './modules/ReturnPage';
import messages from './modules/Messages';
import bonuses from './modules/Bonuses';

export const NAME = 'profile';
export const BREADCRUMBS = 'breadcrumbs';

export const PROMO_DATA = 'promoData';
export const MESSAGES_DATA = 'messagesData';

export const AVAILABLE_PROFILES = 'availableProfiles';
export const AVAILABLE_CATEGORIES = 'availableCategories';
export const AVAILABLE_BRANDS = 'availableBrands';

export default function createModule() {
    return {
        name: NAME,
        namespaced: true,
        state: {
            [BREADCRUMBS]: [],
        },
        actions,
        mutations,
        getters,

        modules: {
            cabinet: cabinet(),
            preferences: preferences(),
            addresses: addresses(),
            orders: orders(),
            seo: seo(),
            promopage: promopage(),
            documents: documents(),
            referral: referral(),
            billing: billing(),
            promocodes: promocodes(),
            returnPage: returnPage(),
            messages: messages(),
            bonuses: bonuses(),
        },
    };
}
