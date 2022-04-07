<template>
    <div class="login-panel__body">
        <p class="login-panel__desc" v-if="!restore">
            Авторизуйтесь или пройдите регистрацию, чтобы получить доступ к покупкам.
        </p>

        <form v-if="!restore" class="login-panel__form" @submit.prevent="onSubmit">
            <v-input-mask
                key="login-phone"
                v-model="phone"
                name="phone"
                v-focus
                :options="maskOptions"
                :error="phoneError"
            >
                Номер телефона
            </v-input-mask>

            <v-password
                v-model="password"
                :error="passwordError"
                name="password"
                class="login-panel__form-password-input"
            >
                Пароль
            </v-password>

            <div class="login-panel__form-submit">
                <v-button class="login-panel__form-submit-btn" type="submit">Войти</v-button>

                <v-link class="login-panel__form-submit-link" tag="button" @click.stop="onRestore">
                    Забыли пароль?
                </v-link>
            </div>
        </form>

        <template v-else-if="!sent">
            <h4 class="login-panel__hl" v-if="!isTablet">Смена пароля</h4>

            <p class="login-panel__attention">
                Введите номер телефона, использованный при регистрации. Мы отправим на него новый код в СМС.
            </p>

            <form @submit.prevent="onSubmit">
                <v-input-mask
                    class="login-panel__form-input"
                    key="restore-phone"
                    v-model="rawRestorePhone"
                    v-focus
                    :options="maskOptions"
                    :raw="false"
                    :error="restorePhoneError"
                >
                    Номер телефона
                    <template v-slot:after-error>
                        <div>
                            <v-button class="login-panel__form-btn" type="submit" :disabled="isDisabledGetCodeBtn">
                                Получить код
                            </v-button>
                            <v-link
                                class="login-panel__form-submit-link--tablet"
                                tag="button"
                                @click.stop="onCancelRestore"
                            >
                                Отмена
                            </v-link>
                        </div>
                    </template>
                </v-input-mask>
            </form>
            <div class="login-panel__modal-footer">
                <v-button class="btn--outline login-panel__modal-footer-btn" @click.stop="onRegister"
                    >Зарегистрируйтесь</v-button
                >
                <span class="login-panel__modal-footer-no-account" @click.stop="onRegister">Нет аккаунта?</span>
            </div>
        </template>

        <template v-else-if="!accepted">
            <h4 class="login-panel__hl" v-if="!isTablet">Смена пароля</h4>

            <p class="login-panel__attention login-panel__attention--short">
                Проверьте телефон {{ rawRestorePhone }}. Мы отправили на него новый код в СМС.
            </p>

            <form class="login-panel__form" @submit.prevent="onSubmit">
                <v-input
                    class="login-panel__form-input"
                    key="sms-code"
                    v-model="code"
                    v-focus
                    maxLength="4"
                    :error="codeError"
                    @input="onInputCode"
                >
                    Код из СМС
                    <template v-slot:error="{ error }">
                        <transition name="slide-in-bottom" mode="out-in">
                            <div :key="error" v-if="error">{{ error }}</div>
                        </transition>
                    </template>
                    <template v-slot:after-error>
                        <v-button class="login-panel__form-btn" type="submit"> Подтвердить </v-button>
                    </template>
                </v-input>
            </form>

            <div class="login-panel__form-timer">
                <span v-if="counter !== 0">
                    Получить новый код можно через <strong>{{ counter }} сек.</strong>
                </span>
                <v-link v-else class="login-panel__form-repeat" tag="button" @click.stop="sendSms">
                    Отправить новый код
                </v-link>
            </div>
        </template>

        <template v-else>
            <h4 class="login-panel__hl" v-if="!isTablet">Смена пароля</h4>

            <form class="login-panel__form" @submit.prevent="onSubmit">
                <validation-tooltip
                    :tooltips="visualTooltips"
                    :validatedValue="restorePassword"
                    :validations="$v.restorePassword"
                ></validation-tooltip>
                <div class="login-panel__form-container">
                    <v-password
                        class="login-panel__form-input"
                        key="change-password"
                        v-model="restorePassword"
                        v-focus
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
                        class="login-panel__form-input"
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
                    <v-button class="login-panel__form-submit-btn" type="submit"> Сменить пароль </v-button>
                </div>
            </form>
        </template>

        <div class="login-panel__socials" v-if="!restore">
            <div class="login-panel__socials-list">
                <button class="login-panel__socials-item" @click="onLoginBySocial('google')">
                    <v-svg name="google-bw" height="19" width="20" class="login-panel__socials-item--google" />
                </button>
                <button class="login-panel__socials-item" @click="onLoginBySocial('vkontakte')">
                    <v-svg name="vkontakte-bw" height="22" width="21" class="login-panel__socials-item--vkontake" />
                </button>
            </div>
            <span class="login-panel__socials-text">Войти через соцсеть</span>
        </div>
        <div class="login-panel__footer">
            <v-button class="btn--outline login-panel__footer-btn" @click.stop="onRegister">Зарегистрируйтесь</v-button>
            <span class="login-panel__no-account" @click.stop="onRegister">Нет аккаунта?</span>
        </div>
    </div>
</template>
<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import VInputMask from '@controls/VInput/VInputMask.vue';
import VPassword from '@controls/VPassword/VPassword.vue';
import ValidationTooltip from '@components/ValidationTooltip/ValidationTooltip.vue';

import { mapActions } from 'vuex';

import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as AUTH_MODULE } from '@store/modules/Auth';
import { LOGIN_BY_PASSWORD, GET_SOCIAL_LINK, SEND_SMS, RESET_PASSWORD, CHECK_CODE } from '@store/modules/Auth/actions';

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
import './LoginPanel.css';

export default {
    name: 'login-panel',
    mixins: [validationMixin],

    components: {
        VSvg,
        VLink,
        VButton,
        VInput,
        VInputMask,
        VPassword,
        ValidationTooltip,
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
            hasUpperCase,
            hasLowerCase,
            hasNumbers,
        },

        restorePasswordRepeat: {
            required,
            sameAs: sameAs('restorePassword'),
        },

        fail: {
            valid: (value) => value !== true,
        },

        accepted: {
            valid: (value) => value === true,
        },

        restoreFail: {
            valid: (value) => value !== true,
        },
    },

    props: {
        enteredPhone: {
            type: [String, null],
            default: null,
        },
    },

    data() {
        return {
            fail: true,
            restoreFail: true,

            phone: this.enteredPhone,
            password: null,

            rawRestorePhone: this.enteredPhone,
            code: null,

            restorePassword: null,
            restorePasswordRepeat: null,

            accepted: false,
            restore: false,
            sent: false,
            isDisabledGetCodeBtn: false,

            counter: 59,

            maskOptions: { ...phoneMaskOptions },

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
        isTablet() {
            return this.$mq.tablet;
        },

        header() {
            return this.restore ? 'Установить новый пароль' : 'Войти';
        },

        restorePhone() {
            return rawPhone(this.rawRestorePhone);
        },

        codeError() {
            if (this.$v.code.$dirty) {
                if (!this.$v.code.required) return this.$t('validation.errors.required');
                if (!this.$v.code.minLength) return 'Неверно введен код';
                if (!this.$v.accepted.valid) return 'Неверный код';
            }
        },

        phoneError() {
            if (this.$v.phone.$dirty) {
                if (!this.$v.phone.required) return this.$t('validation.errors.required');
                if (!this.$v.phone.minLength) return 'Неверно введен номер';
            }

            if (this.$v.fail.$dirty && !this.$v.fail.valid) return 'Неверный логин и/или пароль';
        },

        passwordError() {
            if (this.$v.password.$dirty) {
                if (!this.$v.password.required) return this.$t('validation.errors.required');
                if (!this.$v.password.password) return 'Как минимум 1 заглавная и строчная латинские буквы и 1 цифра';
                if (!this.$v.password.minLength) return 'Не менее 8 символов';
            }
        },

        restorePhoneError() {
            if (this.$v.restorePhone.$dirty) {
                if (!this.$v.restorePhone.required) return this.$t('validation.errors.required');
                if (!this.$v.restorePhone.minLength) return 'Неверно введен номер';
            }

            if (this.$v.restoreFail.$dirty && !this.$v.restoreFail.valid)
                return 'Номер телефона не найден, проверьте номер или зарегистрируйтесь';
        },

        restorePasswordError() {
            if (this.$v.restorePassword.$dirty) {
                if (!this.$v.restorePassword.required) return this.$t('validation.errors.required');
                if (!this.$v.restorePassword.password)
                    return 'Как минимум 1 заглавная и строчная латинские буквы и 1 цифра';
                if (!this.$v.restorePassword.minLength) return 'Не менее 8 символов';
            }
        },

        restorePasswordRepeatError() {
            if (this.$v.restorePasswordRepeat.$dirty) {
                if (!this.$v.restorePasswordRepeat.required) return this.$t('validation.errors.required');
                if (!this.$v.restorePasswordRepeat.sameAs) return 'Не совпадает';
            }
        },

        isVisibleTabs() {
            return !this.restore;
        },
    },

    watch: {
        restore(value) {
            if (!value) this.sent = false;
        },

        restorePhone(value) {
            this.resetRestoreValidation();
            this.$emit('input-phone', value);
        },

        phone(value) {
            this.resetLoginValidation();
            this.$emit('input-phone', value);
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

        resetRestoreValidation() {
            if (this.$v.restorePhone.$dirty) this.$v.restorePhone.$reset();
            if (this.$v.restoreFail.$dirty) this.$v.restoreFail.$reset();
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

        onInputCode(code) {
            if (code.toString().length === 4) this.onSubmit();
        },

        async sendSms() {
            try {
                this.isDisabledGetCodeBtn = true;
                await this[SEND_SMS]({
                    phone: this.restorePhone,
                    type: verificationCodeType.RESET_PASSWORD,
                });
                this.isDisabledGetCodeBtn = false;
                this.sent = true;
                this.restoreFail = false;
                this.startCounter();
            } catch (error) {
                this.isDisabledGetCodeBtn = false;
                this.sent = false;
                this.restoreFail = true;
                this.$v.restoreFail.$touch();
            }
        },

        async checkCode() {
            try {
                await this[CHECK_CODE]({
                    code: this.code,
                    type: verificationCodeType.RESET_PASSWORD,
                });
                this.accepted = true;
            } catch (error) {
                this.accepted = false;
            }

            this.$v.accepted.$touch();
        },

        async resetPassword() {
            try {
                await this[RESET_PASSWORD]({
                    phone: this.restorePhone,
                    password: this.restorePassword,
                });
                location.reload();
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
                console.log(error);
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
            this.rawRestorePhone = this.enteredPhone;
            this.restore = true;
        },

        onCancelRestore() {
            this.phone = this.enteredPhone;
            this.restore = false;
            this.stopCounter();
        },

        onRegister() {
            this.phone = this.enteredPhone;
            if (this.restore) this.stopCounter();
            this.restore = false;
            this.$emit('set-title', {
                title: this.header,
                payload: this.isVisibleTabs,
            });
            this.$emit('change-tab', authMode.REGISTRATION);
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
            this[CHANGE_MODAL_STATE]({
                name: modalName.general.AUTH,
                open: false,
            });
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
