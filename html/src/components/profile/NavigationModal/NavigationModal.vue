<template>
    <general-modal class="navigation-modal" @close="onClose" :is-mobile="isTabletLg">
        <template v-slot:content>
            <div class="container">
                <navigation-panel class="navigation-modal__panel" />
            </div>
        </template>
    </general-modal>
</template>
<script>
import NavigationPanel from '../NavigationPanel/NavigationPanel.vue';
import GeneralModal from '../../GeneralModal/GeneralModal.vue';

import { mapActions } from 'vuex';
import { NAME as MODAL_MODULE, MODALS } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';
import './NavigationModal.css';

export const NAME = 'navigation-modal';

export default {
    name: NAME,

    components: {
        GeneralModal,
        NavigationPanel,
    },

    computed: {
        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },
};
</script>
