<template>
    <general-modal
        v-if="isOpen"
        type="sm"
        class="email-edit-modal"
        :header="header"
        @close="onClose"
        :is-mobile="isTablet"
    >
        <template v-slot:content>
            <div class="email-edit-modal__body">
                <h3 v-if="!isTablet" class="email-edit-modal__hl">{{ header }}</h3>
                <div class="email-edit-modal__desc">
                    Мы отправили код на <strong>{{ email }}</strong>
                    , введите его для подтверждения.
                </div>

                <form class="email-edit-modal__form" @submit.prevent="onSubmit">
                    <div class="email-edit-modal__form-confirmation">
                        <v-input
                            type="number"
                            class="email-edit-modal__form-input"
                            maxLength="4"
                            v-model="code"
                            :error="codeError"
                        >
                            Код из письма
                            <template v-slot:after>
                                <v-button class="email-edit-modal__form-btn" type="submit">
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
                    <div class="email-edit-modal__form-timer">
                        <span v-if="counter !== 0">
                            Получить новый код можно через <strong>{{ counter }} сек.</strong>
                        </span>
                        <v-link class="email-edit-modal__form-repeat" v-else tag="button" @click.stop="sendCode(email)">
                            Отправить новый код
                        </v-link>
                    </div>
                </form>
            </div>
        </template>
    </general-modal>
</template>
<script>
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';
import validationMixin, { required, minLength } from '@plugins/validation';

import { mapActions, mapState } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as CABINET_MODULE, EMAIL } from '@store/modules/Profile/modules/Cabinet';
import { SEND_CODE, UPDATE_CREDENTIAL } from '@store/modules/Profile/modules/Cabinet/actions';

import { modalName } from '@enums';
import { verificationCodeType } from '@enums/auth';
import './EmailEditModal.css';

const CABINET_MODULE_PATH = `${PROFILE_MODULE}/${CABINET_MODULE}`;
const NAME = modalName.profile.EMAIL_EDIT;

export default {
    name: NAME,
    mixins: [validationMixin],

    components: {
        VButton,
        VInput,
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
        email: {
            type: String,
        },
    },

    data() {
        return {
            code: null,
            exists: false,
            isDisabledGetCodeBtn: false,
            counter: 59,
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: state => state[MODALS][NAME] && state[MODALS][NAME].open,
        }),

        header() {
            return 'Редактировать E-mail';
        },

        isTablet() {
            return this.$mq.tablet;
        },

        codeError() {
            if (this.$v.code.$dirty && !this.$v.code.required) return this.$t('validation.errors.required');
            if (this.$v.code.$dirty && !this.$v.code.minLength) return 'Неправильный код';
            if (this.$v.exists.$dirty && !this.$v.exists.valid) return 'Такой Email уже существует';
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
        ...mapActions(CABINET_MODULE_PATH, [UPDATE_CREDENTIAL, SEND_CODE]),

        async sendCode(destination) {
            try {
                await this[SEND_CODE]({
                    destination,
                    type: verificationCodeType.PROFILE_EMAIL,
                });
            } catch (error) {
                this.exists = true;
            }
        },

        async updateEmail(value, code) {
            try {
                this.isDisabledGetCodeBtn = true;
                await this[UPDATE_CREDENTIAL]({
                    value,
                    code,
                    type: verificationCodeType.PROFILE_EMAIL,
                });
                this.isDisabledGetCodeBtn = false;
                this.onClose();
            } catch (error) {
                this.isDisabledGetCodeBtn = false;
            }
        },

        async onSubmit() {
            this.$v.code.$touch();
            if (!this.$v.code.$invalid) this.updateEmail(this.email, this.code);
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
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },

    beforeMount() {
        this.sendCode(this.email);
        this.startCounter();
    },

    beforeDestroy() {
        this.stopCounter();
    },
};
</script>
