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
                    class="email-edit-modal__form-row"
                    v-model="newEmail"
                    placeholder="Введите Email"
                    :error="newEmailError"
                />
            </form>

            <div class="email-edit-modal__submit">
                <v-button class="email-edit-modal__submit-btn" @click="onSubmit">
                    Сохранить
                </v-button>
            </div>
        </template>
    </general-modal>
</template>
<script>
import VButton from '../../controls/VButton/VButton.vue';
import VInput from '../../controls/VInput/VInput.vue';
import GeneralModal from '../../GeneralModal/GeneralModal.vue';
import validationMixin, { required, email } from '../../../plugins/validation';

import { mapActions, mapState } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import { NAME as PROFILE_MODULE, PROMO_DATA, CABINET_DATA } from '../../../store/modules/Profile';
import { UPDATE_EMAIL } from '../../../store/modules/Profile/actions';

import './EmailEditModal.css';

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

        exists: {
            valid: value => value === false,
        },
    },

    data() {
        return {
            newEmail: '',
            exists: false,
        };
    },

    computed: {
        ...mapState(PROFILE_MODULE, {
            email: state => (state[CABINET_DATA] && state[CABINET_DATA].email) || '',
        }),

        isTablet() {
            return this.$mq.tablet;
        },

        newEmailError() {
            if (this.$v.newEmail.$dirty && !this.$v.newEmail.required) return 'Обязательное поле';
            if (this.$v.newEmail.$dirty && !this.$v.newEmail.email) return 'Неправильный формат';
            if (this.$v.exists.$dirty && !this.$v.exists.valid) return 'Такой Email уже существует';
        },
    },

    watch: {
        newEmail() {
            if (this.$v.$dirty) {
                this.exists = false;
                this.$v.$reset();
            }
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(PROFILE_MODULE, [UPDATE_EMAIL]),

        async onSubmit() {
            try {
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    await this[UPDATE_EMAIL](this.newEmail);
                    this.onClose();
                }
            } catch (error) {
                this.exists = true;
            }
        },

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },

    beforeMount() {
        this.newEmail = this.email;
    },
};
</script>
