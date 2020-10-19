<template>
    <general-modal class="navigation-modal" type="fullscreen" @close="onClose" :is-mobile="isTabletLg">
        <template v-slot:content>
            <div class="container navigation-modal__container">
                <navigation-panel class="navigation-modal__panel" :groups="groups" @link-click="onClose" />
            </div>
        </template>
    </general-modal>
</template>
<script>
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';
import NavigationPanel from '@components/profile/NavigationPanel/NavigationPanel.vue';

import { mapActions } from 'vuex';
import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { modalName } from '@enums';
import './NavigationModal.css';

const NAME = modalName.profile.NAVIGATION;

export default {
    name: NAME,

    components: {
        GeneralModal,
        NavigationPanel,
    },

    props: {
        groups: {
            type: Array,
            default() {
                return [];
            },
        },
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
