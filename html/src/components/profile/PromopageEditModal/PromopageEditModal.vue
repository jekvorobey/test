<template>
    <general-modal
        v-if="isOpen"
        class="promopage-edit-modal"
        type="sm"
        header="Редактировать название промостраницы"
        @close="onClose"
        :is-mobile="isTablet"
    >
        <template v-slot:content>
            <h4 class="promopage-edit-modal__hl">Редактировать название промостраницы</h4>
            <form class="promopage-edit-modal__form" @submit.prevent="onSubmit">
                <v-input
                    class="promopage-edit-modal__form-row"
                    v-model="newTitle"
                    placeholder="Введите заголовок"
                    :error="newTitleError"
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
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import { mapActions, mapState } from 'vuex';
import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as PROMOPAGE_MODULE, TITLE } from '@store/modules/Profile/modules/Promopage';
import { SET_PROMOPAGE_TITLE } from '@store/modules/Profile/modules/Promopage/actions';

import validationMixin, { required } from '@plugins/validation';
import { modalName } from '@enums';
import './PromopageEditModal.css';

const PROMOPAGE_MODULE_PATH = `${PROFILE_MODULE}/${PROMOPAGE_MODULE}`;
const NAME = modalName.profile.PROMO_EDIT;

export default {
    name: NAME,
    mixins: [validationMixin],

    components: {
        VButton,
        VInput,
        GeneralModal,
    },

    validations: {
        newTitle: {
            required,
        },
    },

    data() {
        return {
            newTitle: '',
        };
    },

    computed: {
        ...mapState(PROMOPAGE_MODULE_PATH, [TITLE]),
        ...mapState(MODAL_MODULE, {
            isOpen: state => (state[MODALS][NAME] && state[MODALS][NAME].open) || false,
        }),

        isTablet() {
            return this.$mq.tablet;
        },

        newTitleError() {
            if (this.$v.newTitle.$dirty && this.$v.newTitle.$invalid) return 'Обязательное поле';
        },
    },

    methods: {
        ...mapActions(PROMOPAGE_MODULE_PATH, [SET_PROMOPAGE_TITLE]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onSubmit() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                this[SET_PROMOPAGE_TITLE](this.newTitle);
                this.onClose();
            }
        },

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },

    beforeMount() {
        this.newTitle = this[TITLE];
    },
};
</script>
