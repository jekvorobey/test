<template>
    <div class="registration-panel__body">
        <div class="registration-panel__desc" v-if="!sent && !accepted">
            <template v-if="!sent">
                На указанный номер телефона будет выслан код по СМС, введите его для регистрации.
            </template>

            <template v-else-if="!accepted">
                Мы отправили код на {{ rawPhone }}, введите его для регистрации.
                <a @click.stop="onChangeNumber">Изменить</a>
            </template>
        </div>

        <form class="registration-panel__form" @submit.prevent="onSubmit">
            <div v-if="!sent" class="registration-panel__form-phone">
                <v-input-mask
                    class="registration-panel__form-input"
                    v-model="rawPhone"
                    name="phone"
                    v-focus
                    :options="maskOptions"
                    :error="phoneError"
                >
                    Номер телефона
                    <template v-if="!isTablet" v-slot:after>
                        <v-button class="registration-panel__form-btn" type="submit" :disabled="isDisabledGetCodeBtn">
                            Получить код
                        </v-button>
                    </template>

                    <template v-slot:error="{ error }">
                        <transition name="slide-in-bottom" mode="out-in">
                            <div :key="error" v-if="error">{{ error }}</div>
                        </transition>
                    </template>
                </v-input-mask>

                <v-button
                    v-if="isTablet"
                    class="registration-panel__form-btn"
                    type="submit"
                    :disabled="isDisabledGetCodeBtn"
                >
                    Получить код
                </v-button>
            </div>

            <template v-else-if="!accepted">
                <div class="registration-panel__desc">
                    Мы отправили код на {{ rawPhone }}, введите его для регистрации.
                    <a @click.stop="onChangeNumber">Изменить</a>
                </div>
                <div class="registration-panel__form-confirmation">
                    <v-input
                        class="registration-panel__form-input"
                        key="registration-code"
                        maxLength="4"
                        v-model="code"
                        v-focus
                        :error="codeError"
                        @input="onInputCode"
                    >
                        Код из СМС
                        <template v-if="!isTablet" v-slot:after>
                            <v-button class="registration-panel__form-btn" type="submit">Регистрация</v-button>
                        </template>

                        <template v-slot:error="{ error }">
                            <transition name="slide-in-bottom" mode="out-in">
                                <div :key="error" v-if="error">{{ error }}</div>
                            </transition>
                        </template>
                    </v-input>

                    <v-button class="registration-panel__form-btn" v-if="isTablet" type="submit">Регистрация</v-button>
                </div>

                <div class="registration-panel__form-timer">
                    <span v-if="counter !== 0">
                        Получить новый код можно через <strong>{{ counter }} сек.</strong>
                    </span>

                    <v-link v-else class="registration-panel__form-repeat" tag="button" @click.stop="sendSms">
                        Отправить новый код
                    </v-link>
                </div>

                <span class="text-grey registration-panel__form-info">
                    Нажимая кнопку «Регистрация», вы соглашаетесь с условиями
                    <a class="registration-panel__form-info-link" href="/agreements/public-offer" target="_blank"
                        >оферты</a
                    >
                    и
                    <a class="registration-panel__form-info-link" href="/agreements/personal-policy" target="_blank">
                        политикой конфиденциальности
                    </a>
                </span>
            </template>

            <div v-else class="registration-panel__form-password">
                <h4 class="registration-panel__hl" v-if="!isTablet">Создание пароля</h4>
                <validation-tooltip
                    :tooltips="visualTooltips"
                    :validatedValue="password"
                    :validations="$v.password"
                ></validation-tooltip>
                <v-password
                    class="registration-panel__form-input"
                    key="new-password"
                    v-model="password"
                    v-focus
                    :error="passwordError"
                >
                    Пароль
                    <template v-slot:error="{ error }">
                        <transition name="slide-in-bottom" mode="out-in">
                            <div :key="error" v-if="error">{{ error }}</div>
                        </transition>
                    </template>
                </v-password>

                <v-password
                    class="registration-panel__form-input"
                    v-model="passwordRepeat"
                    :error="passwordRepeatError"
                >
                    Пароль ещё раз
                    <template v-slot:error="{ error }">
                        <transition name="slide-in-bottom" mode="out-in">
                            <div :key="error" v-if="error">{{ error }}</div>
                        </transition>
                    </template>
                </v-password>

                <v-button :disabled="!isPasswordCorrect" class="registration-panel__form-btn" type="submit"
                    >Сохранить</v-button
                >
            </div>
        </form>

        <div v-if="!accepted" class="registration-panel__socials">
            <div class="registration-panel__socials-list">
                <button class="registration-panel__socials-item" @click="onRegisterBySocial('google')">
                    <v-svg name="google-bw" height="19" width="20" class="registration-panel__socials-item--google" />
                </button>

                <button class="registration-panel__socials-item" @click="onRegisterBySocial('vkontakte')">
                    <v-svg
                        name="vkontakte-bw"
                        height="22"
                        width="21"
                        class="registration-panel__socials-item--vkontake"
                    />
                </button>
            </div>

            <span class="registration-panel__socials-text">Или зарегистрируйтесь через соцсеть</span>
        </div>

        <div v-if="!accepted" class="registration-panel__footer">
            <v-button class="btn--outline registration-panel__footer-btn" @click.stop="onLogin">Войти</v-button>
            <span class="registration-panel__has-account" @click.stop="onLogin">Есть аккаунт?</span>
        </div>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';
import VPassword from '@controls/VPassword/VPassword.vue';
import VInput from '@controls/VInput/VInput.vue';
import VInputMask from '@controls/VInput/VInputMask.vue';
import ValidationTooltip from '@components/ValidationTooltip/ValidationTooltip.vue';

import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import _cloneDeep from 'lodash/cloneDeep';
import { mapState, mapActions } from 'vuex';
import { NAME as AUTH_MODULE } from '@store/modules/Auth';
import { SEND_SMS, CHECK_CODE, REGISTER_BY_PASSWORD, GET_SOCIAL_LINK } from '@store/modules/Auth/actions';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import validationMixin, {
    required,
    minLength,
    password,
    sameAs,
    hasUpperCase,
    hasLowerCase,
    hasNumbers,
} from '@plugins/validation';
import { rawPhone } from '@util';
import { phoneMaskOptions } from '@settings';
import { modalName, authMode } from '@enums';
import { verificationCodeType } from '@enums/auth';
import '@images/sprites/socials/vkontakte-bw.svg';
import '@images/sprites/socials/google-bw.svg';

import './RegistrationPanel.css';

export default {
    name: 'registration-panel',

    mixins: [validationMixin],

    components: {
        VSvg,
        VLink,
        VButton,
        VPassword,
        VInput,
        VInputMask,
        ValidationTooltip,
        GeneralModal,
    },

    validations: {
        password: {
            required,
            password,
            minLength: minLength(8),
            hasUpperCase,
            hasLowerCase,
            hasNumbers,
        },

        passwordRepeat: {
            required,
            sameAs: sameAs('password'),
        },

        phone: {
            required,
            minLength: minLength(12),
        },

        phoneExists: {
            exists: (value) => value === false,
        },

        code: {
            required,
        },

        accepted: {
            valid: (value) => value === true,
        },
    },

    props: {
        enteredPhone: {
            type: [String, null],
            default: null,
        },

        finishRedirectRoute: {
            type: [String, Boolean],
            default: 'Cabinet',
        },
    },

    data() {
        return {
            mounted: false,

            sent: false,
            accepted: false,

            isDisabledGetCodeBtn: false,

            rawPhone: this.enteredPhone,
            phoneExists: false,

            code: null,

            password: null,
            passwordRepeat: null,

            counter: 59,

            maskOptions: {
                ...phoneMaskOptions,
            },

            visualTooltips: [
                {
                    text: '8 символов',
                    validator: 'minLength',
                },
                {
                    text: 'A-Z',
                    validator: 'hasUpperCase',
                },
                {
                    text: 'a-z',
                    validator: 'hasLowerCase',
                },
                {
                    text: '0-9',
                    validator: 'hasNumbers',
                },
            ],
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: (state) => state[MODALS][NAME] && state[MODALS][NAME].open,
        }),

        phone() {
            return rawPhone(this.rawPhone);
        },

        header() {
            return this.accepted ? 'Создание пароля' : 'Регистрация';
        },

        isTablet() {
            return this.$mq.tablet;
        },

        codeError() {
            if (this.$v.code.$dirty && !this.$v.code.required) return this.$t('validation.errors.required');
            if (this.$v.accepted.$dirty && !this.$v.accepted.valid) return 'Неверный код';
        },

        phoneError() {
            if (this.$v.phone.$dirty) {
                if (!this.$v.phone.required) return this.$t('validation.errors.required');
                if (!this.$v.phone.minLength) return 'Неверно введен номер';
            }

            if (this.$v.phoneExists.$dirty && !this.$v.phoneExists.exists) return 'Такой номер уже зарегистрирован';
        },

        passwordError() {
            if (this.$v.password.$dirty) {
                if (!this.$v.password.required) return this.$t('validation.errors.required');
                if (!this.$v.password.password) return 'Как минимум 1 заглавная и строчная латинские буквы и 1 цифра';
                if (!this.$v.password.minLength) return 'Не менее 8 символов';
            }
        },

        passwordRepeatError() {
            if (this.$v.passwordRepeat.$dirty) {
                if (!this.$v.passwordRepeat.required) return this.$t('validation.errors.required');
                if (!this.$v.passwordRepeat.sameAs) return 'Не совпадает';
            }
        },

        isVisibleTabs() {
            return !this.accepted;
        },

        isPasswordCorrect() {
            return (
                this.password === this.passwordRepeat &&
                this.$v.password.minLength &&
                this.$v.password.hasUpperCase &&
                this.$v.password.hasLowerCase &&
                this.$v.password.hasNumbers
            );
        },
    },

    watch: {
        phone(value) {
            if (this.$v.phoneExists.$dirty) this.$v.phoneExists.$reset();
            if (this.$v.phone.$dirty) this.$v.phone.$reset();
            this.$emit('input-phone', value);
        },

        code() {
            if (this.$v.code.$dirty) this.$v.code.$reset();
            if (this.$v.accepted.$dirty) this.$v.accepted.$reset();
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(AUTH_MODULE, [SEND_SMS, REGISTER_BY_PASSWORD, CHECK_CODE, GET_SOCIAL_LINK]),

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

        onLogin() {
            this.$emit('change-tab', authMode.LOGIN);
        },

        async onRegisterBySocial(driver) {
            try {
                const backUrl = '/profile';
                const redirectUrl = `${document.location.origin}/social-login`;
                const socialUrl = await this[GET_SOCIAL_LINK]({ backUrl, driver, redirectUrl });
                document.location.href = socialUrl;
            } catch (error) {
                return;
            }
        },

        async finishRegistration() {
            try {
                await this[REGISTER_BY_PASSWORD](this.password);
                this.onClose();

                if (this.finishRedirectRoute !== false) {
                    let route = {
                        name: 'Cabinet',
                    };

                    if (this.finishRedirectRoute !== true && this.finishRedirectRoute.length > 0) {
                        route.name = this.finishRedirectRoute;
                    }

                    this.$router.push(route);
                }
            } catch (error) {
                return;
            }
        },

        async sendSms() {
            try {
                this.isDisabledGetCodeBtn = true;
                await this[SEND_SMS]({
                    phone: this.phone,
                    type: verificationCodeType.REGISTRATION,
                });
                this.isDisabledGetCodeBtn = false;
                this.startCounter();
                this.phoneExists = false;
                this.sent = true;
            } catch (error) {
                this.phoneExists = true;
                this.$v.phoneExists.$touch();

                this.stopCounter();
                this.sent = false;
                this.isDisabledGetCodeBtn = false;
            }
        },

        async checkCode() {
            try {
                const { isCodeValid } = await this[CHECK_CODE]({
                    code: this.code,
                    type: verificationCodeType.REGISTRATION,
                });
                this.accepted = isCodeValid;
            } catch (error) {
                this.accepted = false;
            }

            this.$v.accepted.$touch();
        },

        async onSubmit() {
            if (this.sent && this.accepted) {
                this.$v.password.$touch();
                this.$v.passwordRepeat.$touch();
                if (!this.$v.password.$invalid && !this.$v.passwordRepeat.$invalid) this.finishRegistration();
            } else if (this.sent) {
                this.$v.code.$touch();
                if (!this.$v.code.$invalid) this.checkCode();
            } else {
                this.$v.phone.$touch();
                if (!this.$v.phone.$invalid) this.sendSms();
            }
        },

        onInputCode(code) {
            if (code.length === 4) this.onSubmit();
        },

        onChangeNumber() {
            this.stopCounter();
            this.sent = false;
        },

        onClose() {
            this.$emit('close');
            this[CHANGE_MODAL_STATE]({ name: modalName.general.AUTH, open: false });
        },
    },

    mounted() {
        this.$emit('set-title', {
            title: this.header,
            payload: this.isVisibleTabs,
        });
    },

    beforeUpdate() {
        this.$emit('set-title', {
            title: this.header,
            payload: this.isVisibleTabs,
        });
    },

    beforeDestroy() {
        this.stopCounter();
    },
};
</script>
