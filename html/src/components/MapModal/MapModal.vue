<template>
    <general-modal
        v-if="isOpen"
        class="map-modal"
        :type="isTabletLg ? 'fullscreen' : 'wide'"
        :is-scroll-locked="false"
        :is-mobile="isTabletLg"
        @close="onClose"
    >
        <template v-slot:after>
            <radio-switch
                class="map-modal__switch"
                name="map-switch"
                v-model="selectedSwitch"
                :items="switchItems"
                v-if="isTabletLg"
            >
                <template v-slot:content="{ item }">
                    <v-svg :name="item.value" width="24" height="24" />&nbsp;&nbsp;{{ item.title }}
                </template>
            </radio-switch>
        </template>
        <template v-slot:content>
            <div class="map-modal__map" v-show="!isTabletLg || isMap">
                <slot name="map" />
            </div>
            <div class="map-modal__filter" v-show="!isTabletLg || !isMap">
                <slot name="filter" />
            </div>
        </template>
    </general-modal>
</template>
<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import RadioSwitch from '@components/RadioSwitch/RadioSwitch.vue';
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import { mapState, mapActions } from 'vuex';
import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import '@images/sprites/list.svg';
import '@images/sprites/map.svg';
import './MapModal.css';

export const NAME = 'map-modal';

export default {
    name: NAME,

    components: {
        VSvg,

        RadioSwitch,
        GeneralModal,
    },

    data() {
        return {
            showMap: false,

            selectedSwitch: 'list',
            switchItems: [
                { value: 'list', title: 'Форма' },
                { value: 'map', title: 'Карта' },
            ],
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: state => state[MODALS][NAME] && state[MODALS][NAME].open,
        }),

        isMap() {
            return this.selectedSwitch === 'map';
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },

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
