<template>
    <general-modal
        v-if="isOpen"
        type="sm"
        class="referral-code-edit-modal"
        :header="header"
        @close="onClose"
        :is-mobile="isTablet"
    >
        <template v-slot:content>
            <div class="referral-code-edit-modal__body">
                <h3 v-if="!isTablet" class="referral-code-edit-modal__hl">{{ header }}</h3>

                <form class="referral-code-edit-modal__form" @submit.prevent="onSubmit">
                    <v-input-mask
                        class="referral-code-edit-modal__form-input"
                        v-model="code"
                        :options="maskOptions"
                        :error="codeError"
                    >
                        Новый код
                        <template v-slot:error="{ error }">
                            <transition name="slide-in-bottom" mode="out-in">
                                <div :key="error" v-if="error">{{ error }}</div>
                            </transition>
                        </template>
                    </v-input-mask>
                </form>
            </div>
        </template>
    </general-modal>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VInputMask from '@controls/VInput/VInputMask.vue';
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import _cloneDeep from 'lodash/cloneDeep';
import { mapState, mapActions } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as CABINET_MODULE } from '@store/modules/Profile/modules/Cabinet';
import {  } from '@store/modules/Profile/modules/Cabinet/actions';

import validationMixin, { required, minLength } from '@plugins/validation';
import './ReferralCodeEditModal.css';

const CABINET_MODULE_PATH = `${PROFILE_MODULE}/${CABINET_MODULE}`;

export const NAME = 'referral-code-edit-modal';

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
            minLength: minLength(2),
        },
    },

    data() {
        return {
            code: null,

            maskOptions: {
                
            },
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: state => state[MODALS][NAME] && state[MODALS][NAME].open,
        }),

        header() {
            return 'Сменить реферальный код';
        },

        isTablet() {
            return this.$mq.tablet;
        },

        codeError() {
            if (this.$v.code.$dirty) {
                if (!this.$v.code.required) return 'Обязательное поле';
                if (!this.$v.code.minLength) return 'Минимальная длина 2 символа';
            }
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(CABINET_MODULE_PATH, []),

        async onSubmit() {
            this.$v.code.$touch();
            if (!this.$v.code.$invalid) {
                this.onClose();
            }
        },

        onClose() {
            this.$emit('close');
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },
};
</script>
