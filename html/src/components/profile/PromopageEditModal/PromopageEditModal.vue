<template>
    <general-modal
        class="promopage-edit-modal"
        type="sm"
        header="Редактировать заголовок"
        @close="onClose"
        :is-mobile="isTablet"
    >
        <template v-slot:content>
            <h4 class="promopage-edit-modal__hl">Редактировать заголовок</h4>
            <form class="promopage-edit-modal__form" @submit.prevent="onSubmit">
                <v-input
                    class="promopage-edit-modal__form-row"
                    v-model="newName"
                    placeholder="Введите заголовок"
                    :error="newNameError"
                />
            </form>

            <div class="promopage-edit-modal__submit">
                <v-button class="promopage-edit-modal__submit-btn" @click="onSubmit">
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
import validationMixin, { required } from '../../../plugins/validation';

import { mapActions, mapState } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import { NAME as PROFILE_MODULE, PROMO_DATA } from '../../../store/modules/Profile';
import { UPDATE_PROMOPAGE_NAME } from '../../../store/modules/Profile/actions';

import './PromopageEditModal.css';

export const NAME = 'promopage-edit-modal';

export default {
    name: NAME,
    mixins: [validationMixin],

    components: {
        VButton,
        VInput,
        GeneralModal,
    },

    validations: {
        newName: {
            required,
        },
    },

    data() {
        return {
            newName: '',
        };
    },

    computed: {
        ...mapState(PROFILE_MODULE, {
            name: state => (state[PROMO_DATA] && state[PROMO_DATA].name) || '',
        }),

        isTablet() {
            return this.$mq.tablet;
        },

        newNameError() {
            if (this.$v.newName.$dirty && this.$v.newName.$invalid) return 'Обязательное поле';
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(PROFILE_MODULE, [UPDATE_PROMOPAGE_NAME]),

        onSubmit() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                this[UPDATE_PROMOPAGE_NAME](this.newName);
                this.onClose();
            }
        },

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },

    beforeMount() {
        this.newName = this.name;
    },
};
</script>
