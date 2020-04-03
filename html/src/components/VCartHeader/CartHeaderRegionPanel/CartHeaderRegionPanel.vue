<template>
    <div class="cart-header-region-panel">
        <div class="cart-header-region-panel__region">
            <button class="cart-header-region-panel__city" title="Выбрать город" @click="onOpenCitySelection">
                <v-svg name="pin" width="16" height="16" />
                <span class="cart-header-region-panel__city-title">
                    <v-clamp class="cart-header-region-panel__city-name" :max-lines="1" autoresize>{{ city }}</v-clamp>
                </span>
            </button>
        </div>
        <div class="cart-header-region-panel__description">
            От выбранного региона зависят доступные способы и сроки получения заказов
        </div>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VClamp from 'vue-clamp';

import { NAME as CITY_SELECTION_MODAL_NAME } from '@components/CitySelectionModal/CitySelectionModal.vue';

import { mapState, mapActions, mapGetters } from 'vuex';

import { NAME as GEO_MODULE, SELECTED_CITY } from '@store/modules/Geolocation';
import { SET_SELECTED_CITY } from '@store/modules/Geolocation/actions';

import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import '@images/sprites/pin.svg';

import './CartHeaderRegionPanel.css';

export default {
    name: 'cart-header-region-panel',

    components: {
        VSvg,
        VClamp,
    },

    computed: {
        ...mapState(GEO_MODULE, {
            city: state => (state[SELECTED_CITY] && state[SELECTED_CITY].name) || 'Выберите город',
        }),
    },

    methods: {
        ...mapActions(GEO_MODULE, [SET_SELECTED_CITY]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onOpenCitySelection() {
            this[CHANGE_MODAL_STATE]({ name: CITY_SELECTION_MODAL_NAME, open: true });
        },
    }
};
</script>
