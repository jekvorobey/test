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
                    Мы отправили код на <strong>{{ formatPhone }}</strong>
                    , введите его для подтверждения.
                </div>

                <form class="phone-edit-modal__form" @submit.prevent="onSubmit">
                    <div class="phone-edit-modal__form-confirmation">
                        <v-input
                            type="number"
                            class="phone-edit-modal__form-input"
                            key="phone-code"
                            maxLength="4"
                            v-model="code"
                            v-focus
                            :error="codeError"
                        >
                            Код из СМС
                            <template v-slot:after>
                                <v-button class="phone-edit-modal__form-btn" type="submit">
                                    Отправить
                                </v-button>
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
                        <v-link class="phone-edit-modal__form-repeat" v-else tag="button" @click.stop="sendCode(phone)">
                            Отправить новый код
                        </v-link>
                    </div>
                </form>
            </div>
        </template>
    </general-modal>
</template>

<script>
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import VInputMask from '@controls/VInput/VInputMask.vue';
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import _cloneDeep from 'lodash/cloneDeep';
import { mapState, mapActions } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as CABINET_MODULE } from '@store/modules/Profile/modules/Cabinet';
import { SEND_CODE, UPDATE_CREDENTIAL } from '@store/modules/Profile/modules/Cabinet/actions';

import validationMixin, { required, minLength, password, sameAs } from '@plugins/validation';
import { phoneMaskOptions } from '@settings';
import { verificationCodeType } from '@enums/auth';
import { modalName } from '@enums';
import { formatPhoneNumber } from '@util';
import './PhoneEditModal.css';

const CABINET_MODULE_PATH = `${PROFILE_MODULE}/${CABINET_MODULE}`;
const NAME = modalName.profile.PHONE_EDIT;

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
        code: {
            required,
            minLength: minLength(4),
        },

        exists: {
            valid: value => value === false,
        },
    },

    props: {
        phone: {
            type: String,
        },
    },

    data() {
        return {
            code: null,
            exists: false,
            counter: 59,
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: state => state[MODALS][NAME] && state[MODALS][NAME].open,
        }),

        formatPhone() {
            return formatPhoneNumber(this.phone);
        },

        header() {
            return 'Сменить телефон';
        },

        isTablet() {
            return this.$mq.tablet;
        },

        codeError() {
            if (this.$v.code.$dirty && !this.$v.code.required) return this.$t('validation.errors.required');
            if (this.$v.code.$dirty && !this.$v.code.minLength) return 'Неверно введен номер';
            if (this.$v.exists.$dirty && !this.$v.exists.valid) return 'Такой телефон уже существует';
        },
    },

    watch: {
        code() {
            if (this.$v.code.$dirty) {
                this.exists = false;
                this.$v.code.$reset();
            }
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
            } catch (error) {
                this.exists = true;
                this.$v.exists.$touch();
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
                this.exists = true;
                this.$v.exists.$touch();
            }
        },

        async onSubmit() {
            this.$v.code.$touch();
            if (!this.$v.code.$invalid) this.updatePhone(this.phone, this.code);
        },

        onClose() {
            this.$emit('close');
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },

    beforeMount() {
        this.sendCode(this.phone);
        this.startCounter();
    },

    beforeDestroy() {
        this.stopCounter();
    },
};
</script>
