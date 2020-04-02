<template>
    <div class="product-pickup-points-panel">
        <div class="container container--tablet product-pickup-points-panel__header">
            <h3 class="product-pickup-points-panel__header-hl">Пункты выдачи</h3>
            <div class="product-pickup-points-panel__header-controls">
                <v-select
                    placeholder="Тип пункта выдачи"
                    track-by="id"
                    label="title"
                    :options="pickupPointTypes"
                    :searchable="false"
                    :value="selectedPickupPointType"
                    @input="onSetPickupPointType"
                />
            </div>
        </div>

        <ul
            class="product-pickup-points-panel__list"
            :class="{
                'product-pickup-points-panel__list--selected': selectedPickupPoint,
            }"
            v-scroll-lock="mounted"
            v-observe-visibility="onVisibilityChanged"
        >
            <checkout-option-card
                class="product-pickup-points-panel__list-item"
                :class="{
                    'product-pickup-points-panel__list-item--selected':
                        selectedPickupPoint && selectedPickupPoint.id === point.id,
                }"
                v-for="(point, index) in filteredPickupPoints"
                :key="point.id"
                ref="options"
                readonly
                @cardClick="onPointClick(point, index)"
            >
                <p class="text-bold">{{ point.name }}</p>
                <p>{{ point.description }}</p>
                <p class="text-grey text-sm">{{ point.startDate }}</p>
            </checkout-option-card>
        </ul>
    </div>
</template>
<script>
import VSelect from '@controls/VSelect/VSelect.vue';
import CheckoutOptionCard from '@components/checkout/CheckoutOptionCard/CheckoutOptionCard.vue';

import { mapState, mapGetters, mapActions } from 'vuex';

import {
    NAME as PRODUCT_MODULE,
    SELECTED_PICKUP_POINT,
    SELECTED_INDEX,
    PRODUCT,
    SELECTED_PICKUP_POINT_TYPE,
    PICKUP_POINT_TYPES,
} from '@store/modules/Product';
import { FILTERED_PICKUP_POINTS } from '@store/modules/Product/getters';
import { SET_SELECTED_PICKUP_POINT, SET_SELECTED_PICKUP_POINT_TYPE } from '@store/modules/Product/actions';

import { deliveryMethods } from '@enums/checkout';
import './ProductPickupPointsPanel.css';

export default {
    name: 'product-pickup-points-panel',

    components: {
        VSelect,

        CheckoutOptionCard,
    },

    data() {
        return {
            mounted: false,
        };
    },

    computed: {
        ...mapGetters(PRODUCT_MODULE, [FILTERED_PICKUP_POINTS]),
        ...mapState(PRODUCT_MODULE, [
            PICKUP_POINT_TYPES,
            SELECTED_INDEX,
            SELECTED_PICKUP_POINT,
            SELECTED_PICKUP_POINT_TYPE,
        ]),
    },

    watch: {
        [SELECTED_INDEX](value) {
            if (value) {
                const { options = [] } = this.$refs;
                const selectedCard = options[value];
                if (selectedCard) selectedCard.$el.scrollIntoView({ block: 'center' });
            }
        },

        [SET_SELECTED_PICKUP_POINT_TYPE](value) {
            this.resetIndex();
        },
    },

    methods: {
        ...mapActions(PRODUCT_MODULE, [SET_SELECTED_PICKUP_POINT, SET_SELECTED_PICKUP_POINT_TYPE]),

        onSetPickupPointType(type) {
            this[SET_SELECTED_PICKUP_POINT_TYPE](type);
        },

        onPointClick(point, index) {
            this[SET_SELECTED_PICKUP_POINT]({ point, index });
        },

        onVisibilityChanged(isVisible) {
            if (isVisible && this[SELECTED_INDEX] !== -1) {
                const { options } = this.$refs;
                const selectedCard = options[this[SELECTED_INDEX]];
                if (selectedCard) selectedCard.$el.scrollIntoView({ block: 'center' });
            }
        },

        resetIndex() {
            this[SET_SELECTED_PICKUP_POINT]({ point: null, index: -1 });
        },
    },

    mounted() {
        this.mounted = true;
    },

    beforeDestroy() {
        this.mounted = false;
    },
};
</script>
