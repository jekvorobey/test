<template>
    <general-modal
        v-if="isOpen"
        type="sm"
        class="phone-edit-modal"
        :header="header"
        @close="onClose"
        :is-mobile="isTablet"
    >
        <template v-slot:content>
            <div class="phone-edit-modal__body">
                <h3 v-if="!isTablet" class="phone-edit-modal__hl">{{ header }}</h3>
                <div class="phone-edit-modal__desc">
                    <template v-if="!sent">
                        На указанный номер телефона будет выслан код по СМС, введите его для регистрации
                    </template>

                    <template v-else> Мы отправили код на {{ rawPhone }}, введите его для регистрации. </template>
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
                                type="number"
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
                    </template>
                </form>
            </div>
        </template>
    </general-modal>
</template>

<script>
import VLink from '../../controls/VLink/VLink.vue';
import VButton from '../../controls/VButton/VButton.vue';
import VInput from '../../controls/VInput/VInput.vue';
import VInputMask from '../../controls/VInput/VInputMask.vue';
import GeneralModal from '../../GeneralModal/GeneralModal.vue';

import validationMixin, { required, minLength, password, sameAs } from '../../../plugins/validation';
import { mapState, mapActions } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '../../../store/modules/Profile';
import { NAME as CABINET_MODULE } from '../../../store/modules/Profile/modules/Cabinet';
import { SEND_CODE, UPDATE_CREDENTIAL } from '../../../store/modules/Profile/modules/Cabinet/actions';

import _cloneDeep from 'lodash/cloneDeep';
import { phoneMaskOptions } from '../../../assets/scripts/settings';
import { verificationCodeType } from '../../../assets/scripts/enums';
import { rawPhone } from '../../../util/helpers';
import './PhoneEditModal.css';

const CABINET_MODULE_PATH = `${PROFILE_MODULE}/${CABINET_MODULE}`;

export const NAME = 'phone-edit-modal';

export default {
    name: NAME,

    mixins: [validationMixin],

    components: {
        VButton,
        VInput,
        VInputMask,
        GeneralModal,
    },

    validations: {
        phone: {
            required,
            minLength: minLength(12),
        },

        code: {
            required,
            minLength: minLength(4),
        },
    },

    data() {
        return {
            sent: false,

            rawPhone: null,
            code: null,
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
            return 'Сменить телефон';
        },

        isTablet() {
            return this.$mq.tablet;
        },

        codeError() {
            if (this.$v.code.$dirty) {
                if (!this.$v.code.required) return 'Обязательное поле';
                if (!this.$v.code.minLength) return 'Неверно введен номер';
            }
        },

        phoneError() {
            if (this.$v.phone.$dirty) {
                if (!this.$v.phone.required) return 'Обязательное поле';
                if (!this.$v.phone.minLength) return 'Неверно введен номер';
            }
        },
    },

    watch: {
        phone() {
            if (this.$v.phone.$dirty) this.$v.phone.$reset();
        },

        code() {
            if (this.$v.code.$dirty) this.$v.code.$reset();
            //if (this.$v.accepted.$dirty) this.$v.accepted.$reset();
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(CABINET_MODULE_PATH, [SEND_CODE, UPDATE_CREDENTIAL]),

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

        async sendCode(destination) {
            try {
                await this[SEND_CODE]({
                    destination,
                    type: verificationCodeType.PROFILE_PHONE,
                });
                this.sent = true;
            } catch (error) {
                this.sent = false;
            }
        },

        async updatePhone(value, code) {
            try {
                await this[UPDATE_CREDENTIAL]({
                    value,
                    code,
                    type: verificationCodeType.PROFILE_PHONE,
                });
                this.onClose();
            } catch (error) {
                this.accepted = false;
            }
        },

        async onSubmit() {
            if (!this.sent) {
                this.$v.phone.$touch();
                if (!this.$v.phone.$invalid) this.sendCode(this.phone);
            } else {
                this.$v.code.$touch();
                if (!this.$v.code.$invalid) this.updatePhone(this.phone, this.code);
            }
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
