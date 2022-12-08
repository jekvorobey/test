<template>
    <general-modal
        type="sm"
        class="auth-modal"
        :class="{ 'hidden-tabs': !isVisibleTabsHeader }"
        :is-mobile="isTablet"
        :header="header"
        @close="onClose"
    >
        <template v-slot:content>
            <!-- Мод bessovestniyMode: Быстрая регистрация для ВСЕХ -->
            <registration-panel
                    v-if="bessovestniyMode"
                    :bessovestniyMode="bessovestniyMode"
                    @checkBessovestniyMode="checkBessovestniyMode"
                    :enteredPhone="enteredPhone"
                    :finish-redirect-route="registrationSuccessRedirect"
                    @set-title="onSetTitle"
                    @change-tab="onChangeTab"
                    @input-phone="onInputPhone"
            />

            <!-- Мод bessovestniyMode: Обычная регистрация / авторизация -->
            <v-tabs v-else :items="items" key-field="id" :activeTab.sync="activeTab" :is-visible-header="isVisibleTabsHeader">
                <template v-slot:header="{ item }">
                    <span>{{ item.title }}</span>
                </template>
                <template v-slot:panel="{ item }">
                    <login-panel
                        v-if="item.type === authMode.LOGIN"
                        :enteredPhone="enteredPhone"
                        :passwordFocus="passwordFocus"
                        @set-title="onSetTitle"
                        @change-tab="onChangeTab"
                        @input-phone="onInputPhone"
                    />
                    <registration-panel
                        v-else-if="item.type === authMode.REGISTRATION"
                        :enteredPhone="enteredPhone"
                        :finish-redirect-route="registrationSuccessRedirect"
                        @set-title="onSetTitle"
                        @change-tab="onChangeTab"
                        @input-phone="onInputPhone"
                    />
                </template>
            </v-tabs>
        </template>
    </general-modal>
</template>

<script>
import VTabs from '@controls/VTabs/VTabs.vue';

import GeneralModal from '@components/GeneralModal/GeneralModal.vue';
import LoginPanel from '@components/LoginPanel/LoginPanel.vue';
import RegistrationPanel from '@components/RegistrationPanel/RegistrationPanel.vue';

import { mapState, mapActions } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { modalName, authMode } from '@enums';
import './AuthModal.css';

const NAME = modalName.general.AUTH;

export default {
    name: NAME,

    components: {
        VTabs,
        GeneralModal,

        LoginPanel,
        RegistrationPanel,
    },

    data() {
        return {
            bessovestniyMode: false,
            passwordFocus: false,
            activeTab: 0,
            items: [
                {
                    id: 1,
                    title: 'Войти',
                    type: authMode.LOGIN,
                },
                {
                    id: 2,
                    title: 'Регистрация',
                    type: authMode.REGISTRATION,
                },
            ],
            title: null,
            showTabs: true,
            enteredPhone: null,
            registrationSuccessRedirect: 'Cabinet',
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            modalState: (state) => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
        }),

        isTablet() {
            return this.$mq.tablet;
        },

        header() {
            return this.title;
        },

        isVisibleTabsHeader() {
            return this.showTabs;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        checkBessovestniyMode() {
            this.bessovestniyMode = false;
            this.passwordFocus = true;
            this.activeTab = 0;
        },

        onClose() {
            this.$emit('close');
            this.CHANGE_MODAL_STATE({ name: NAME, open: false });
        },

        onSetTitle({ title, payload }) {
            this.title = title;
            this.showTabs = payload;
        },

        onChangeTab(tab) {
            this.activeTab = tab;
        },

        onInputPhone(phone) {
            this.enteredPhone = phone;
        },
    },

    created() {
        this.authMode = authMode;
    },

    beforeMount() {
        this.activeTab = this.modalState.activeTab;
        this.bessovestniyMode = this.modalState.bessovestniyMode;

        if (typeof this.modalState.registrationSuccessRedirect !== 'undefined') {
            this.registrationSuccessRedirect = this.modalState.registrationSuccessRedirect;
        }
    },
};
</script>
