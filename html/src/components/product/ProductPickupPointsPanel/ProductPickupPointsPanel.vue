<template>
    <div class="product-pickup-points-panel">
        <div class="product-pickup-points-panel__header">
            <h3 class="product-pickup-points-panel__header-hl">Выбор пункта выдачи</h3>
            <div class="product-pickup-points-panel__header-controls">
                <v-select placeholder="Станция метро" :options="[]" />
                <!-- <v-select
                    v-model="selectedDeliveryMethod"
                    placeholder="Тип пункта выдачи"
                    track-by="id"
                    label="title"
                    :options="deliveryMethods"
                    :searchable="false"
                /> -->
            </div>
        </div>

        <ul
            class="product-pickup-points-panel__list"
            :class="{
                'product-pickup-points-panel__list--selected': selectedPickupPoint,
            }"
            v-scroll-lock="true"
        >
            <checkout-option-card
                class="product-pickup-points-panel__list-item"
                :class="{
                    'product-pickup-points-panel__list-item--selected':
                        selectedPickupPoint && selectedPickupPoint.id === point.id,
                }"
                v-for="(point, index) in pickupPoints"
                :key="point.id"
                ref="options"
                readonly
                @cardClick="onPointClick(point, index)"
            >
                <p class="text-bold">{{ point.title }}</p>
                <p>{{ point.name }}</p>
                <p class="text-grey text-sm">{{ point.startDate }}</p>
            </checkout-option-card>
        </ul>
    </div>
</template>
<script>
import VSelect from '@controls/VSelect/VSelect.vue';
import CheckoutOptionCard from '@components/checkout/CheckoutOptionCard/CheckoutOptionCard.vue';

import { mapState, mapGetters, mapActions } from 'vuex';

import { NAME as PRODUCT_MODULE, PICKUP_POINTS, SELECTED_PICKUP_POINT, SELECTED_INDEX } from '@store/modules/Product';
import { SET_SELECTED_PICKUP_POINT } from '@store/modules/Product/actions';

import './ProductPickupPointsPanel.css';

export default {
    name: 'product-pickup-points-panel',

    components: {
        VSelect,

        CheckoutOptionCard,
    },

    computed: {
        ...mapState(PRODUCT_MODULE, [PICKUP_POINTS, SELECTED_INDEX, SELECTED_PICKUP_POINT]),
    },

    watch: {
        [SELECTED_INDEX](value) {
            if (value) {
                const { options } = this.$refs;
                const selectedCard = options[value];
                if (selectedCard) selectedCard.$el.scrollIntoView({ behavior: 'smooth' });
            }
        },
    },

    methods: {
        ...mapActions(PRODUCT_MODULE, [SET_SELECTED_PICKUP_POINT]),

        onPointClick(point, index) {
            this[SET_SELECTED_PICKUP_POINT]({ point, index });
        },
    },
};
</script>