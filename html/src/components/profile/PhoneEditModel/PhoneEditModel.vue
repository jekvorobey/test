<template>
    <general-modal type="sm" class="phone-edit-modal" :header="header" @close="onClose" :is-mobile="isTablet">
        <template v-slot:content>
            <div class="phone-edit-modal__body">
                <h3 v-if="!isTablet" class="phone-edit-modal__hl">{{ header }}</h3>
                <div class="phone-edit-modal__desc">
                    <template v-if="!sent">
                        На указанный номер телефона будет выслан код по СМС, введите его для регистрации
                    </template>

                    <template v-else-if="!accepted">
                        Мы отправили код на {{ rawPhone }}, введите его для регистрации.
                        <a @click.stop="onChangeNumber">Изменить</a>
                    </template>

                    <template v-else>
                        Придумайте пароль для входа в Личный кабинет
                    </template>
                </div>

                <form class="phone-edit-modal__form" @submit.prevent="onSubmit">
                    <div v-if="!sent" class="phone-edit-modal__form-phone">
                        <v-input-mask
                            class="phone-edit-modal__form-input"
                            v-model="rawPhone"
                            placeholder="+7 ___ ___-__-__"
                            :raw="false"
                            :options="maskOptions"
                            :error="phoneError"
                        >
                            Номер телефона
                            <template v-slot:after>
                                <v-button class="phone-edit-modal__form-btn" type="submit">Получить код</v-button>
                            </template>
                            <template v-slot:error="{ error }">
                                <transition name="slide-in-bottom" mode="out-in">
                                    <div :key="error" v-if="error">{{ error }}</div>
                                </transition>
                            </template>
                        </v-input-mask>
                    </div>

                    <template v-else-if="!accepted">
                        <div class="phone-edit-modal__form-confirmation">
                            <v-input
                                class="phone-edit-modal__form-input"
                                maxLength="4"
                                v-model="code"
                                :error="codeError"
                            >
                                Код из СМС
                                <template v-slot:after>
                                    <v-button class="phone-edit-modal__form-btn" type="submit">Регистрация</v-button>
                                </template>
                                <template v-slot:error="{ error }">
                                    <transition name="slide-in-bottom" mode="out-in">
                                        <div :key="error" v-if="error">{{ error }}</div>
                                    </transition>
                                </template>
                            </v-input>
                        </div>
                        <div class="phone-edit-modal__form-timer">
                            <span v-if="counter !== 0">
                                Получить новый код можно через <strong>{{ counter }} сек.</strong>
                            </span>
                            <v-link class="phone-edit-modal__form-repeat" v-else tag="button" @click.stop="sendSms">
                                Отправить новый код
                            </v-link>
                        </div>
                        <span class="text-grey phone-edit-modal__form-info">
                            Нажимая кнопку «Регистрация», вы соглашаетесь с условиями <a>оферты</a> и
                            <a>политикой конфиденциальности</a>
                        </span>
                    </template>

                    <div v-else class="phone-edit-modal__form-password">
                        <v-password class="phone-edit-modal__form-input" v-model="password" :error="passwordError">
                            Пароль
                            <template v-slot:error="{ error }">
                                <transition name="slide-in-bottom" mode="out-in">
                                    <div :key="error" v-if="error">{{ error }}</div>
                                </transition>
                            </template>
                        </v-password>
                        <v-password
                            class="phone-edit-modal__form-input"
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
                        <v-button class="phone-edit-modal__form-btn" type="submit">Сохранить</v-button>
                    </div>
                </form>
            </div>
        </template>
    </general-modal>
</template>

<script>
import VLink from '../controls/VLink/VLink.vue';
import VButton from '../controls/VButton/VButton.vue';
import VPassword from '../controls/VPassword/VPassword.vue';
import VInput from '../controls/VInput/VInput.vue';
import VInputMask from '../controls/VInput/VInputMask.vue';
import GeneralModal from '../GeneralModal/GeneralModal.vue';
import { NAME as LOGIN_MODAL_NAME } from '../LoginModal/LoginModal.vue';

import validationMixin, { required, minLength, password, sameAs } from '../../plugins/validation';
import { mapState, mapActions } from 'vuex';

import { NAME as AUTH_MODULE } from '../../store/modules/Auth';
import { SEND_SMS, CHECK_CODE, REGISTER_BY_PASSWORD, GET_SOCIAL_LINK } from '../../store/modules/Auth/actions';

import { NAME as MODAL_MODULE, MODALS } from '../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../store/modules/Modal/actions';

import _cloneDeep from 'lodash/cloneDeep';
import { phoneMaskOptions } from '../../assets/scripts/settings';
import { rawPhone } from '../../util/helpers';
import './PhoneEditModal.css';

export const NAME = 'phone-edit-modal';

export default {
    name: NAME,

    mixins: [validationMixin],

    components: {
        VLink,
        VButton,
        VPassword,
        VInput,
        VInputMask,
        GeneralModal,
    },

    validations: {
        password: {
            required,
            password,
            minLength: minLength(8),
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
            exists: value => value === false,
        },

        code: {
            required,
        },

        accepted: {
            valid: value => value === true,
        },
    },

    data() {
        return {
            sent: false,
            accepted: false,

            rawPhone: null,
            phoneExists: false,

            code: null,

            password: null,
            passwordRepeat: null,

            counter: 59,

            maskOptions: {
                ...phoneMaskOptions,
            },
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: state => state[MODALS][NAME] && state[MODALS][NAME].open,
        }),

        phone() {
            return rawPhone(this.rawPhone);
        },

        header() {
            return this.accepted ? 'Создание пароля' : 'Сменить телефон';
        },

        isTablet() {
            return this.$mq.tablet;
        },

        codeError() {
            if (this.$v.code.$dirty && !this.$v.code.required) return 'Обязательное поле';
            if (this.$v.accepted.$dirty && !this.$v.accepted.valid) return 'Неверный код';
        },

        phoneError() {
            if (this.$v.phone.$dirty) {
                if (!this.$v.phone.required) return 'Обязательное поле';
                if (!this.$v.phone.minLength) return 'Неверно введен номер';
            }

            if (this.$v.phoneExists.$dirty && !this.$v.phoneExists.exists) return 'Такой номер уже зарегистрирован';
        },

        passwordError() {
            if (this.$v.password.$dirty) {
                if (!this.$v.password.required) return 'Обязательное поле';
                if (!this.$v.password.password) return 'Как минимум 1 заглавная и строчная латинские буквы и 1 цифра';
                if (!this.$v.password.minLength) return 'Не менее 8 символов';
            }
        },

        passwordRepeatError() {
            if (this.$v.password.$dirty && this.$v.passwordRepeat.$dirty && !this.$v.passwordRepeat.sameAs)
                return 'Пароль не совпадает';
        },
    },

    watch: {
        phone() {
            if (this.$v.phoneExists.$dirty) this.$v.phoneExists.$reset();
            if (this.$v.phone.$dirty) this.$v.phone.$reset();
        },

        code() {
            if (this.$v.code.$dirty) this.$v.code.$reset();
            if (this.$v.accepted.$dirty) this.$v.accepted.$reset();
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(AUTH_MODULE, [SEND_SMS, CHECK_CODE]),

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
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
            this[CHANGE_MODAL_STATE]({ name: LOGIN_MODAL_NAME, open: true });
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
                this.$router.push({ name: 'Cabinet' });
            } catch (error) {
                return;
            }
        },

        async checkCode() {
            try {
                this.accepted = await this[CHECK_CODE](this.code);
            } catch (error) {
                this.accepted = false;
                this.$v.accepted.$touch();
            }
        },

        async sendSms() {
            try {
                this.code = await this[SEND_SMS](this.phone);
                this.startCounter();
                this.phoneExists = false;
                this.sent = true;
            } catch (error) {
                this.phoneExists = true;
                this.$v.phoneExists.$touch();

                this.stopCounter();
                this.sent = false;
            }
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

        onChangeNumber() {
            this.stopCounter();
            this.sent = false;
        },

        onClose() {
            this.$emit('close');
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },

    beforeDestroy() {
        this.stopCounter();
    },
};
</script>
