<template>
    <general-modal type="sm" class="auth-modal" @close="onClose" :is-mobile="isTablet" :header="header">
        <template v-slot:content>
            <v-tabs :items="items" key-field="id" :activeTab.sync="activeTab">
                <template v-slot:header="{ item }">
                    {{ item.title }}
                </template>
                <template v-slot:panel="{ item }">
                    <login-panel v-if="item.type === authMode.LOGIN" @set-title="onSetTitle" @change-tab="onChangeTab" />
                    <registration-panel v-else-if="item.type === authMode.REGISTRATION" @set-title="onSetTitle" @change-tab="onChangeTab" />
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
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            modalState: state => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
        }),

        isTablet() {
            return this.$mq.tablet;
        },

        header() {
            return this.title;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onClose() {
            this.$emit('close');
            this.CHANGE_MODAL_STATE({ name: NAME, open: false });
        },

        onSetTitle(newTitle) {
            this.title = newTitle;
        },

        onChangeTab(tab) {
            this.activeTab = tab;
        },
    },

    created() {
        this.authMode = authMode;
    },

    beforeMount() {
        this.activeTab = this.modalState.activeTab;
    },
};
</script>
