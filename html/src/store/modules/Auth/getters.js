import {USER} from "@store/modules/Auth/index";

export const IS_USER_PROFESSIONAL = 'IS_USER_PROFESSIONAL';

export default {
    [IS_USER_PROFESSIONAL]: (state) => (state[USER] && state[USER].canBuy) || false,
};
