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
            <h3 v-if="!isTablet" class="referral-code-edit-modal__hl">{{ header }}</h3>

            <form class="referral-code-edit-modal__form" @submit.prevent="onSubmit">
                <v-input class="referral-code-edit-modal__form-input" v-model="code" :error="codeError">
                    Новый реферальный код
                    <template v-slot:error="{ error }">
                        <transition name="slide-in-bottom" mode="out-in">
                            <div :key="error" v-if="error">{{ error }}</div>
                        </transition>
                    </template>
                </v-input>
            </form>

            <attention-panel class="referral-code-edit-modal__panel">
                <div>
                    <strong>ВНИМАНИЕ!</strong><br />
                    Код можно сменить только <strong>ОДИН</strong> раз!<br />
                    Код может содержать латинские буквы, цифры, тире и нижние подчеркивания.
                </div>
            </attention-panel>

            <div class="referral-code-edit-modal__submit">
                <v-button class="referral-code-edit-modal__submit-btn" @click="onSubmit">
                    Принять
                </v-button>
            </div>
        </template>
    </general-modal>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';
import AttentionPanel from '../../AttentionPanel/AttentionPanel.vue';

import { mapState, mapActions } from 'vuex';
import { NAME as AUTH_MODULE } from '@store/modules/Auth';
import { SET_REFERRER_CODE } from '@store/modules/Auth/actions';
import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';
import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as CABINET_MODULE } from '@store/modules/Profile/modules/Cabinet';
import { UPDATE_REFERRER_CODE, SET_CAN_EDIT_CODE } from '@store/modules/Profile/modules/Cabinet/actions';

import validationMixin, { required, minLength, referrerCode } from '@plugins/validation';
import { modalName } from '@enums';
import './ReferralCodeEditModal.css';

const CABINET_MODULE_PATH = `${PROFILE_MODULE}/${CABINET_MODULE}`;
const NAME = modalName.profile.REFERRAL_CODE_EDIT;

export default {
    name: NAME,

    mixins: [validationMixin],

    components: {
        VButton,
        VInput,
        AttentionPanel,
        GeneralModal,
    },

    validations: {
        code: {
            required,
            minLength: minLength(2),
            referrerCode,
        },
    },

    data() {
        return {
            code: null,
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: (state) => state[MODALS][NAME] && state[MODALS][NAME].open,
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
                if (!this.$v.code.referrerCode) return 'Допустимы латинские буквы, цифры, тире и нижние подчеркивания';
            }
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(AUTH_MODULE, [SET_REFERRER_CODE]),
        ...mapActions(CABINET_MODULE_PATH, [UPDATE_REFERRER_CODE, SET_CAN_EDIT_CODE]),

        async onSubmit() {
            this.$v.code.$touch();

            if (!this.$v.code.$invalid) {
                try {
                    const { code, can_edit_referral_code } = await this[UPDATE_REFERRER_CODE](this.code);

                    this[SET_REFERRER_CODE](code);
                    this[SET_CAN_EDIT_CODE](can_edit_referral_code);
                    this.onClose();
                } catch (error) {
                    this.onClose();
                    this[CHANGE_MODAL_STATE]({
                        name: modalName.general.NOTIFICATION,
                        open: true,
                        state: {
                            title: 'Ошибка при смене реферального кода',
                            message:
                                'Произошла ошибка при смене реферального кода.\nВозможно такой код уже существует. Попробуйте снова.',
                        },
                    });
                }
            }
        },

        onClose() {
            this.$emit('close');
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },
};
</script>
