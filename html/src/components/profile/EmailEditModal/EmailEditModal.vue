<template>
    <general-modal
        class="email-edit-modal"
        type="sm"
        header="Редактировать Email"
        :is-mobile="isTablet"
        @close="onClose"
    >
        <template v-slot:content>
            <h4 class="email-edit-modal__hl">Редактировать Email</h4>
            <form class="email-edit-modal__form" @submit.prevent="onSubmit">
                <v-input
                    v-if="!sent"
                    class="email-edit-modal__form-row"
                    v-model="newEmail"
                    placeholder="Введите Email"
                    :error="newEmailError"
                >
                    <template v-slot:error="{ error }">
                        <transition name="slide-in-bottom" mode="out-in">
                            <div :key="error" v-if="error">{{ error }}</div>
                        </transition>
                    </template>
                </v-input>
                <v-input
                    v-else
                    type="number"
                    class="email-edit-modal__form-row"
                    v-model="code"
                    placeholder="Код подтверждения"
                    :error="codeError"
                >
                    <template v-slot:error="{ error }">
                        <transition name="slide-in-bottom" mode="out-in">
                            <div :key="error" v-if="error">{{ error }}</div>
                        </transition>
                    </template>
                </v-input>
            </form>

            <div class="email-edit-modal__submit">
                <v-button class="email-edit-modal__submit-btn" @click="onSubmit">
                    {{ sent ? 'Изменить Email' : 'Отправить код' }}
                </v-button>
            </div>
        </template>
    </general-modal>
</template>
<script>
import VButton from '../../controls/VButton/VButton.vue';
import VInput from '../../controls/VInput/VInput.vue';
import GeneralModal from '../../GeneralModal/GeneralModal.vue';
import validationMixin, { required, email, minLength } from '../../../plugins/validation';

import { mapActions, mapState } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '../../../store/modules/Profile';
import { NAME as CABINET_MODULE, EMAIL } from '../../../store/modules/Profile/modules/Cabinet';
import { SEND_CODE, UPDATE_CREDENTIAL } from '../../../store/modules/Profile/modules/Cabinet/actions';

import { verificationCodeType } from '../../../assets/scripts/enums';
import './EmailEditModal.css';

const CABINET_MODULE_PATH = `${PROFILE_MODULE}/${CABINET_MODULE}`;

export const NAME = 'email-edit-modal';

export default {
    name: NAME,
    mixins: [validationMixin],

    components: {
        VButton,
        VInput,
        GeneralModal,
    },

    validations: {
        newEmail: {
            required,
            email,
        },

        code: {
            required,
            minLength: minLength(4),
        },

        exists: {
            valid: value => value === false,
        },
    },

    data() {
        return {
            newEmail: null,
            code: null,

            sent: false,
            exists: false,
            accepted: false,
        };
    },

    computed: {
        ...mapState(CABINET_MODULE_PATH, [EMAIL]),

        isTablet() {
            return this.$mq.tablet;
        },

        newEmailError() {
            if (this.$v.newEmail.$dirty && !this.$v.newEmail.required) return 'Обязательное поле';
            if (this.$v.newEmail.$dirty && !this.$v.newEmail.email) return 'Неправильный формат';
            if (this.$v.exists.$dirty && !this.$v.exists.valid) return 'Такой Email уже существует';
        },

        codeError() {
            if (this.$v.code.$dirty && !this.$v.code.required) return 'Обязательное поле';
            if (this.$v.code.$dirty && !this.$v.code.minLength) return 'Неправильный код';
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
                this.sent = true;
            } catch (error) {
                this.sent = false;
                this.accepted = false;
            }
        },

        async updateEmail(value, code) {
            try {
                await this[UPDATE_CREDENTIAL]({
                    value,
                    code,
                    type: verificationCodeType.PROFILE_EMAIL,
                });
                this.onClose();
            } catch (error) {
                this.accepted = false;
            }
        },

        async onSubmit() {
            if (!this.sent) {
                this.$v.newEmail.$touch();
                if (!this.$v.newEmail.$invalid) this.sendCode(this.newEmail);
            } else {
                this.$v.code.$touch();
                if (!this.$v.code.$invalid) this.updateEmail(this.newEmail, this.code);
            }
        },

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },

    beforeMount() {
        this.newEmail = this[EMAIL];
    },
};
</script>
