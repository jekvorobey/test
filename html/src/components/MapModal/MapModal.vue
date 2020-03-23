<template>
    <general-modal class="map-modal" @close="onClose" :is-scroll-locked="false" :is-mobile="isTablet">
        <template v-slot:content>
            <div class="map-modal__map">
                <slot v-if="showMap && !isTablet" name="map" />
            </div>
            <div class="map-modal__filter">
                <slot name="filter" />
            </div>
        </template>
    </general-modal>
</template>
<script>
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import { mapState, mapActions } from 'vuex';
import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import './MapModal.css';

export const NAME = 'map-modal';

export default {
    name: NAME,

    components: {
        GeneralModal,
    },

    data() {
        return {
            showMap: false,
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: state => state[MODALS][NAME] && state[MODALS][NAME].open,
        }),

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },

    mounted() {
        setTimeout(() => (this.showMap = true), 400);
    },
};
</script>
