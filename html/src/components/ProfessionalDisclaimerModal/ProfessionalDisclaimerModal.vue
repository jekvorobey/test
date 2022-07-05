<template>
    <general-modal
        type="sm"
        class="professional-disclaimer-modal"
        :header="title"
        @close="onClose"
        :is-mobile="isTablet"
    >
        <template v-slot:content>
            <div class="professional-disclaimer-modal__body">
                <p class="professional-disclaimer-modal__message">
                    Цена доступна профессионалам бьюти-индустрии с&nbsp;подтвержденным статусом
                </p>
                <p
                    :class="{
                        'professional-disclaimer-modal__message--complete': isAuth,
                    }"
                >
                    1. Пройди <span class="fake-link" @click="goToRegistration">регистрацию</span>
                </p>
                <p class="professional-disclaimer-modal__message">
                    2. Отправь ссылку на свои работы в любой соц.сети или фото диплома, сертификата в&nbsp;<span
                        :class="{
                            'fake-link': isAuth,
                        }"
                        @click="goToProfile"
                        >личном кабинете</span
                    >
                </p>
                <p class="professional-disclaimer-modal__message">
                    Полный доступ предоставляется после прохождения модерации в течение 30 минут
                </p>
            </div>
        </template>
    </general-modal>
</template>

<script>
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import { mapState, mapActions, mapGetters } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE, SAVE_MODAL_OPENING_HISTORY } from '@store/modules/Modal/actions';

import { authMode, modalName } from '@enums';
import './ProfessionalDisclaimerModal.css';
import { HAS_SESSION, NAME as AUTH_MODULE } from '@store/modules/Auth';
import { MODAL_SHOW_COUNT } from '@store/modules/Modal/getters';

const NAME = modalName.general.PROFESSIONAL_DISCLAIMER;

export default {
    name: NAME,

    components: {
        GeneralModal,
    },

    computed: {
        ...mapState(AUTH_MODULE, {
            isAuth: HAS_SESSION,
        }),
        ...mapState(MODAL_MODULE, {
            modalState: (state) => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
        }),
        ...mapGetters(MODAL_MODULE, {
            modalShowCount: MODAL_SHOW_COUNT,
        }),

        showCount() {
            return this.modalShowCount(modalName.general.PROFESSIONAL_DISCLAIMER);
        },

        isTablet() {
            return this.$mq.tablet;
        },

        title() {
            return this.modalState.title || 'Уведомление';
        },
    },

    mounted() {
        if (this.showCount === 0) {
            this[SAVE_MODAL_OPENING_HISTORY]({
                name: modalName.general.PROFESSIONAL_DISCLAIMER,
            });
        }
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE, SAVE_MODAL_OPENING_HISTORY]),

        onClose() {
            this.$emit('close');
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },

        goToRegistration() {
            if (!this.isAuth) {
                this[CHANGE_MODAL_STATE]({
                    name: modalName.general.AUTH,
                    open: true,
                    state: {
                        activeTab: authMode.REGISTRATION,
                    },
                });
            }
        },

        async goToProfile() {
            if (this.isAuth) {
                this.onClose();

                await this.$router.push('/profile/');

                this[CHANGE_MODAL_STATE]({
                    name: modalName.profile.PORTFOLIO_EDIT,
                    open: true,
                    state: {},
                });
            }
        },
    },
};
</script>
