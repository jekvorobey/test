<template>
    <general-modal type="sm" class="login-modal" :header="header" @close="onClose" :is-mobile="isTablet">
        <template v-slot:content>
            <div class="login-modal__body">
                <h3 class="login-modal__hl">{{ header }}</h3>

                <form v-if="!restore" class="login-modal__form" @submit.prevent="onSubmit">
                    <v-input-mask v-model="phone" :options="maskOptions" :error="phoneError">
                        Номер телефона
                    </v-input-mask>
                    <v-password v-model="password" :error="passwordError">
                        Пароль
                    </v-password>
                    <div class="login-modal__form-submit">
                        <v-button class="login-modal__form-submit-btn" type="submit">
                            Войти
                        </v-button>
                        <v-link class="login-modal__form-submit-link" tag="button" @click.stop="onRestore">
                            Забыли пароль?
                        </v-link>
                    </div>
                </form>

                <template v-else-if="!sent">
                    <p class="login-modal__desc">
                        Введите номер телефона, использованный при регистрации. Мы отправим на него новый код в СМС.
                    </p>

                    <form class="login-modal__form" @submit.prevent="onSubmit">
                        <v-input-mask
                            class="login-modal__form-input"
                            v-model="rawRestorePhone"
                            :options="maskOptions"
                            :raw="false"
                            :error="restorePhoneError"
                        >
                            Номер телефона
                            <template v-slot:after>
                                <v-button class="login-modal__form-btn" type="submit">
                                    Получить код
                                </v-button>
                            </template>
                        </v-input-mask>
                    </form>

                    <v-link class="login-modal__form-submit-link" tag="button" @click.stop="onCancelRestore">
                        Отмена
                    </v-link>
                </template>

                <template v-else-if="!accepted">
                    <p class="login-modal__desc">
                        Проверьте телефон {{ rawRestorePhone }}. Мы отправили на него новый код в СМС.
                    </p>

                    <form class="login-modal__form" @submit.prevent="onSubmit">
                        <v-input
                            class="login-modal__form-input"
                            type="number"
                            v-model="code"
                            maxLength="4"
                            :error="codeError"
                        >
                            Код из СМС
                            <template v-slot:after>
                                <v-button class="login-modal__form-btn" type="submit">
                                    Подтвердить
                                </v-button>
                            </template>
                            <template v-slot:error="{ error }">
                                <transition name="slide-in-bottom" mode="out-in">
                                    <div :key="error" v-if="error">{{ error }}</div>
                                </transition>
                            </template>
                        </v-input>
                    </form>

                    <div class="login-modal__form-timer">
                        <span v-if="counter !== 0">
                            Получить новый код можно через <strong>{{ counter }} сек.</strong>
                        </span>
                        <v-link v-else class="registration-modal__form-repeat" tag="button" @click.stop="sendSms">
                            Отправить новый код
                        </v-link>
                    </div>
                </template>

                <template v-else>
                    <p class="login-modal__desc">
                        Введите новый пароль
                    </p>

                    <form class="login-modal__form" @submit.prevent="onSubmit">
                        <v-password
                            class="login-modal__form-input"
                            v-model="restorePassword"
                            :error="restorePasswordError"
                        >
                            Пароль
                            <template v-slot:error="{ error }">
                                <transition name="slide-in-bottom" mode="out-in">
                                    <div :key="error" v-if="error">{{ error }}</div>
                                </transition>
                            </template>
                        </v-password>
                        <v-password
                            class="login-modal__form-input"
                            v-model="restorePasswordRepeat"
                            :error="restorePasswordRepeatError"
                        >
                            Пароль ещё раз
                            <template v-slot:error="{ error }">
                                <transition name="slide-in-bottom" mode="out-in">
                                    <div :key="error" v-if="error">{{ error }}</div>
                                </transition>
                            </template>
                        </v-password>
                        <v-button class="login-modal__form-submit-btn" type="submit">
                            Сменить пароль
                        </v-button>
                    </form>
                </template>

                <div class="login-modal__socials" v-if="!restore">
                    <div class="login-modal__socials-list">
                        <button class="login-modal__socials-item" @click="onLoginBySocial('google')">
                            <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M13.2511 5.83646H7.14881V8.30919H10.6603C10.335 9.88225 8.96242 10.7819 7.14881 10.7819C5.00445 10.7819 3.27904 9.09572 3.27904 7.0001C3.27904 4.90447 5.00445 3.21828 7.14881 3.21828C8.0694 3.21828 8.9073 3.53612 9.56328 4.06407L11.4651 2.2001C10.3075 1.20885 8.81358 0.600098 7.14881 0.600098C3.51608 0.600098 0.599976 3.44993 0.599976 7.0001C0.599976 10.5503 3.51608 13.4001 7.14881 13.4001C10.4232 13.4001 13.4 11.0728 13.4 7.0001C13.4 6.62299 13.3448 6.21356 13.2511 5.83646Z"
                                    fill="#141116"
                                />
                            </svg>
                        </button>
                        <button class="login-modal__socials-item" @click="onLoginBySocial('vkontakte')">
                            <svg
                                width="16"
                                height="10"
                                viewBox="0 0 16 10"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M15.3043 7.68706C14.9561 7.2544 14.5599 6.86413 14.1773 6.48826C14.0409 6.3547 13.9 6.21715 13.7643 6.07799C13.375 5.68372 13.3612 5.53337 13.6691 5.08632C13.8824 4.77683 14.1088 4.46653 14.3282 4.16663C14.5263 3.89472 14.7313 3.61481 14.9279 3.33251L14.9683 3.27413C15.3447 2.73351 15.7333 2.17609 15.9398 1.50192C15.9939 1.32518 16.0503 1.06366 15.9216 0.845336C15.792 0.626209 15.5421 0.559031 15.3653 0.529441C15.2777 0.512647 15.1908 0.510248 15.11 0.510248L12.6488 0.508648H12.6282C12.2556 0.508648 12.0049 0.690987 11.8616 1.06526C11.7237 1.42274 11.5736 1.80422 11.4014 2.1657C11.0592 2.88706 10.6241 3.71958 9.99472 4.41295L9.96882 4.44174C9.89414 4.52491 9.81032 4.61688 9.7486 4.61688C9.73945 4.61688 9.72879 4.61688 9.71736 4.61288C9.58705 4.5609 9.49942 4.23141 9.50323 4.08106C9.50323 4.07946 9.50323 4.07706 9.50323 4.07386L9.50171 1.12044C9.50171 1.11165 9.50095 1.10045 9.49942 1.09085C9.43694 0.610214 9.29826 0.312714 8.774 0.20475C8.76028 0.20235 8.74581 0.199951 8.73209 0.199951H6.17177C5.75496 0.199951 5.52484 0.376692 5.30919 0.639805C5.25128 0.710981 5.12936 0.857332 5.18956 1.03487C5.25052 1.21561 5.44864 1.2532 5.5134 1.266C5.83344 1.32917 6.01404 1.53311 6.06509 1.88819C6.15425 2.50558 6.16568 3.16456 6.10014 3.9595C6.08186 4.18182 6.04528 4.35217 5.98585 4.49932C5.97137 4.53371 5.9226 4.64327 5.87231 4.64327C5.8563 4.64327 5.81059 4.63767 5.726 4.57849C5.52788 4.43774 5.38234 4.23541 5.21318 3.98669C4.63711 3.14057 4.15324 2.21128 3.73414 1.13964C3.57869 0.745369 3.28913 0.523843 2.91727 0.517445C2.50884 0.510248 2.13851 0.507849 1.78494 0.507849C1.39937 0.507849 1.04123 0.511847 0.691473 0.519045C0.392769 0.523843 0.185505 0.616612 0.0765392 0.796552C-0.0324267 0.974093 -0.0248067 1.20921 0.0978752 1.49312C1.08314 3.76516 1.9762 5.41821 2.99424 6.84973C3.7067 7.8542 4.42222 8.54837 5.24442 9.03461C6.11081 9.54963 7.08236 9.79995 8.21317 9.79995C8.34118 9.79995 8.47377 9.79595 8.60788 9.79035C9.26473 9.75677 9.50857 9.51045 9.53905 8.84667C9.55429 8.50598 9.5901 8.1501 9.75088 7.847C9.85223 7.65667 9.94672 7.65667 9.97796 7.65667C10.0374 7.65667 10.1121 7.68466 10.1913 7.73744C10.3346 7.83501 10.4573 7.96376 10.5578 8.07812C10.6523 8.18609 10.7461 8.29485 10.8398 8.40442C11.0417 8.63874 11.2513 8.88186 11.4692 9.11138C11.947 9.61601 12.4735 9.83754 13.0785 9.79115H15.3356C15.3401 9.79115 15.3455 9.79035 15.3501 9.78955C15.5748 9.77516 15.7699 9.6448 15.8842 9.43447C16.0267 9.17456 16.0237 8.84187 15.8766 8.54437C15.7105 8.21008 15.4941 7.92218 15.3043 7.68706Z"
                                    fill="#141116"
                                />
                            </svg>
                        </button>
                        <button class="login-modal__socials-item" @click="onLoginBySocial('facebook')">
                            <svg
                                width="8"
                                height="18"
                                viewBox="0 0 8 18"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    fill-rule="evenodd"
                                    clip-rule="evenodd"
                                    d="M7.69659 0.199951H6.74274C4.0912 0.199951 1.93349 2.35303 1.93349 5.00019V7.02491H0.304304C0.136136 7.02491 0 7.16206 0 7.32998V9.75735C0 9.92527 0.136136 10.0607 0.304304 10.0607H1.93349V17.4949C1.93349 17.6628 2.06963 17.8 2.23779 17.8H4.66867C4.83684 17.8 4.97297 17.6628 4.97297 17.4949V10.0607H7.39139C7.55956 10.0607 7.6957 9.92527 7.6957 9.75735V7.32998C7.6957 7.16206 7.55956 7.02491 7.39139 7.02491H4.97297V5.00019C4.97297 4.02696 5.76666 3.23483 6.74185 3.23483H7.69659C7.86386 3.23483 8 3.09768 8 2.93064V0.502384C8 0.335343 7.86386 0.199951 7.69659 0.199951Z"
                                    fill="#141116"
                                />
                            </svg>
                        </button>
                    </div>
                    <span class="login-modal__socials-text">Войти через соцсеть</span>
                </div>
            </div>

            <div class="login-modal__footer" v-if="!restore">
                <v-button class="btn--outline login-modal__footer-btn" @click="onRegister">Зарегистрируйтесь</v-button>
                &nbsp;&nbsp;Нет&nbsp;аккаунта?
            </div>
        </template>
    </general-modal>
</template>
<script>
import VSvg from '../controls/VSvg/VSvg.vue';
import VLink from '../controls/VLink/VLink.vue';
import VButton from '../controls/VButton/VButton.vue';
import VInput from '../controls/VInput/VInput.vue';
import VInputMask from '../controls/VInput/VInputMask.vue';
import VPassword from '../controls/VPassword/VPassword.vue';
import GeneralModal from '../GeneralModal/GeneralModal.vue';
import { NAME as REGISTRATION_MODAL_NAME } from '../RegistrationModal/RegistrationModal.vue';

import validationMixin, { required, minLength, password, sameAs } from '../../plugins/validation';
import { mapState, mapActions } from 'vuex';

import { NAME as AUTH_MODULE } from '../../store/modules/Auth';
import {
    LOGIN_BY_PASSWORD,
    GET_SOCIAL_LINK,
    SEND_RESET_SMS,
    SEND_SMS,
    RESET_PASSWORD,
    CHECK_CODE,
} from '../../store/modules/Auth/actions';

import { NAME as MODAL_MODULE, MODALS } from '../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../store/modules/Modal/actions';

import _cloneDeep from 'lodash/cloneDeep';
import { phoneMaskOptions } from '../../assets/scripts/settings';
import { rawPhone } from '../../util/helpers';
import './LoginModal.css';

export const NAME = 'login-modal';

export default {
    name: NAME,
    mixins: [validationMixin],

    components: {
        VSvg,
        VLink,
        VButton,
        VInput,
        VInputMask,
        VPassword,
        GeneralModal,
    },

    validations: {
        phone: {
            required,
            minLength: minLength(12),
        },

        restorePhone: {
            required,
            minLength: minLength(12),
        },

        password: {
            required,
            password,
            minLength: minLength(8),
        },

        code: {
            required,
            minLength: minLength(4),
        },

        restorePassword: {
            required,
            password,
            minLength: minLength(8),
        },

        restorePasswordRepeat: {
            required,
            sameAs: sameAs('restorePassword'),
        },

        fail: {
            valid: value => value !== true,
        },

        accepted: {
            valid: value => value === true,
        },

        restoreFail: {
            valid: value => value !== true,
        },
    },

    data() {
        return {
            fail: true,
            restoreFail: true,

            phone: null,
            password: null,

            rawRestorePhone: null,
            code: null,

            restorePassword: null,
            restorePasswordRepeat: null,

            accepted: false,
            restore: false,
            sent: false,

            counter: 59,

            maskOptions: { ...phoneMaskOptions },
        };
    },

    computed: {
        isTablet() {
            return this.$mq.tablet;
        },

        header() {
            return this.restore ? 'Восстановление пароля' : 'Войти';
        },

        restorePhone() {
            return rawPhone(this.rawRestorePhone);
        },

        codeError() {
            if (this.$v.code.$dirty) {
                if (!this.$v.code.required) return 'Обязательное поле';
                if (!this.$v.code.minLength) return 'Неверно введен код';
            }
        },

        phoneError() {
            if (this.$v.phone.$dirty) {
                if (!this.$v.phone.required) return 'Обязательное поле';
                if (!this.$v.phone.minLength) return 'Неверно введен номер';
            }

            if (this.$v.fail.$dirty && !this.$v.fail.valid) return 'Неверный логин и/или пароль';
        },

        passwordError() {
            if (this.$v.password.$dirty) {
                if (!this.$v.password.required) return 'Обязательное поле';
                if (!this.$v.password.password) return 'Как минимум 1 заглавная и строчная латинские буквы и 1 цифра';
                if (!this.$v.password.minLength) return 'Не менее 8 символов';
            }
        },

        restorePhoneError() {
            if (this.$v.restorePhone.$dirty) {
                if (!this.$v.restorePhone.required) return 'Обязательное поле';
                if (!this.$v.restorePhone.minLength) return 'Неверно введен номер';
            }

            if (this.$v.restoreFail.$dirty && !this.$v.restoreFail.valid) return 'Неправильный телефон';
        },

        restorePasswordError() {
            if (this.$v.restorePassword.$dirty) {
                if (!this.$v.restorePassword.required) return 'Обязательное поле';
                if (!this.$v.restorePassword.password)
                    return 'Как минимум 1 заглавная и строчная латинские буквы и 1 цифра';
                if (!this.$v.restorePassword.minLength) return 'Не менее 8 символов';
            }
        },

        restorePasswordRepeatError() {
            if (this.$v.restorePasswordRepeat.$dirty) {
                if (!this.$v.restorePasswordRepeat.required) return 'Обязательное поле';
                if (!this.$v.restorePasswordRepeat.sameAs) return 'Не совпадает';
            }
        },
    },

    watch: {
        restore(value) {
            if (!value) this.sent = false;
        },

        phone(value) {
            this.resetLoginValidation();
        },

        password(value) {
            this.resetLoginValidation();
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(AUTH_MODULE, [LOGIN_BY_PASSWORD, GET_SOCIAL_LINK, SEND_SMS, RESET_PASSWORD, CHECK_CODE]),

        resetLoginValidation() {
            if (this.$v.phone.$dirty) this.$v.phone.$reset();
            if (this.$v.password.$dirty) this.$v.password.$reset();
            if (this.$v.fail.$dirty) this.$v.fail.$reset();
        },

        async onSubmit() {
            if (!this.restore) {
                this.$v.phone.$touch();
                this.$v.password.$touch();
                if (!this.$v.phone.$invalid && !this.$v.password.$invalid) this.loginByPassword();
            } else if (!this.sent) {
                this.$v.restorePhone.$touch();
                if (!this.$v.restorePhone.$invalid) this.sendSms();
            } else if (!this.accepted) {
                this.$v.code.$touch();
                if (!this.$v.code.$invalid) this.checkCode();
            } else {
                this.$v.restorePassword.$touch();
                this.$v.restorePasswordRepeat.$touch();
                this.$v.code.$touch();
                if (
                    !this.$v.restorePassword.$invalid &&
                    !this.$v.restorePasswordRepeat.$invalid &&
                    !this.$v.code.$invalid
                )
                    this.resetPassword();
            }
        },

        async sendSms() {
            try {
                await this[SEND_SMS]({
                    phone: this.restorePhone,
                    isReset: true,
                });
                this.sent = true;
                this.restoreFail = false;
                this.startCounter();
            } catch (error) {
                this.sent = false;
                this.restoreFail = true;
                this.$v.restoreFail.$touch();
            }
        },

        async checkCode() {
            try {
                await this[CHECK_CODE]({
                    code: this.code,
                    isReset: true,
                });
                this.accepted = true;
            } catch (error) {
                this.accepted = false;
                this.$v.accepted.$touch();
            }
        },

        async resetPassword() {
            try {
                await this[RESET_PASSWORD]({
                    phone: this.restorePhone,
                    password: this.restorePassword,
                });
                this.onClose();
            } catch (error) {
                this.onClose();
                alert('Не удалось сменить пароль');
            }
        },

        async loginByPassword() {
            try {
                await this[LOGIN_BY_PASSWORD]({
                    login: this.phone,
                    password: this.password,
                });
                this.onClose();
            } catch (error) {
                this.fail = true;
                this.$v.fail.$touch();
            }
        },

        async onLoginBySocial(driver) {
            try {
                const backUrl = this.$route.fullPath;
                const redirectUrl = `${document.location.origin}/social-login`;
                const socialUrl = await this[GET_SOCIAL_LINK]({ backUrl, driver, redirectUrl });
                document.location.href = socialUrl;
            } catch (error) {
                return;
            }
        },

        onSendPassword() {
            if (!this.$v.restorePhone.$invalid) this.sent = true;
        },

        onRestore() {
            this.restore = true;
        },

        onCancelRestore() {
            this.restore = false;
            this.stopCounter();
        },

        onRegister() {
            this.onClose();
            this[CHANGE_MODAL_STATE]({ name: REGISTRATION_MODAL_NAME, open: true });
        },

        startCounter() {
            this.stopCounter();
            this.counter = 59;

            this.timer = setInterval(() => {
                this.counter -= 1;
                if (this.counter === 0) this.stopCounter();
            }, 1000);
        },

        stopCounter() {
            clearInterval(this.timer);
            this.timer = null;
        },

        onClose() {
            this.$emit('close');
            this.CHANGE_MODAL_STATE({ name: NAME, open: false });
        },
    },

    beforeDestroy() {
        this.stopCounter();
    },
};
</script>
