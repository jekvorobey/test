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
                v-for="(point, index) in points"
                :key="point.id"
                ref="options"
                readonly
                @cardClick="onPointClick(point, index)"
            >
                <p class="text-bold">{{ point.name }}</p>
                <p>{{ point.title }}</p>
                <p>{{ point.phone }}</p>
                <p>{{ point.payment }}</p>
                <p class="text-grey text-sm" v-if="point.startDate">
                    Можно забрать с {{ point.startDate }}, {{ point.startDateDay }}
                </p>
                <br />
                <p>{{ point.description }}</p>
            </checkout-option-card>
        </ul>
    </div>
</template>
<script>
import VSelect from '@controls/VSelect/VSelect.vue';
import CheckoutOptionCard from '@components/checkout/CheckoutOptionCard/CheckoutOptionCard.vue';

import { mapState, mapGetters, mapActions } from 'vuex';
import { LOCALE } from '@store';

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

import { formatPhoneNumber } from '@util';
import { dayMonthLongDateSettings } from '@settings';
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
        ...mapState([LOCALE]),
        ...mapGetters(PRODUCT_MODULE, [FILTERED_PICKUP_POINTS]),
        ...mapState(PRODUCT_MODULE, [
            PICKUP_POINT_TYPES,
            SELECTED_INDEX,
            SELECTED_PICKUP_POINT,
            SELECTED_PICKUP_POINT_TYPE,
        ]),

        points() {
            const points = this[FILTERED_PICKUP_POINTS] || [];

            return points.map(p => {
                const dateObj = new Date(p.startDate);
                const startDate = p.startDate && dateObj.toLocaleDateString(this[LOCALE], dayMonthLongDateSettings);
                const startDateDay = p.startDate && dateObj.getDay();
                const phones = p.phone && p.phone.split(', ');
                const phone = phones && phones.map(p => formatPhoneNumber(p)).join(', ');

                return {
                    ...p,
                    phone,
                    startDate,
                    startDateDay: this.$t(`weekdays.long.${startDateDay}`),
                };
            });
        },
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
