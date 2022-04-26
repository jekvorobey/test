<template>
    <div class="checkout-pickup-point-panel">
        <div v-if="!selectedPickupPoint" class="checkout-pickup-point-panel__choice">
            <h3
                :class="{
                    'checkout-pickup-point-panel__title': true,
                    'checkout-pickup-point-panel__title--error': error,
                }"
            >
                Выберите пункт выдачи заказов
            </h3>
            <v-button class="btn--outline" @click="onChangePickupPoint">Выбрать</v-button>
        </div>
        <div v-else class="checkout-pickup-point-panel__address">
            <div class="checkout-pickup-point-panel__address-info">
                <div class="checkout-pickup-point-panel__address-info-main">
                    <h3 class="checkout-pickup-point-panel__address-info-main-hl">{{ selectedPickupPoint.title }}</h3>
                    <div>{{ selectedPickupPoint.name }}</div>
                    <div>{{ selectedPickupPoint.phone }}</div>
                </div>
                <div class="checkout-pickup-point-panel__address-info-schedule">
                    <template v-if="selectedPickupPoint.startDate">
                        {{ selectedPickupPoint.startDate }}
                    </template>
                    <ul class="checkout-pickup-point-panel__address-info-schedule-list">
                        <li
                            class="checkout-pickup-point-panel__address-info-schedule-item"
                            v-for="item in selectedPickupPoint.schedule"
                            :key="item.id"
                        >
                            <div>{{ item.title }}</div>
                            <div>{{ item.time }}</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="checkout-pickup-point-panel__address-desc" v-if="selectedPickupPoint.description">
                <div class="text-bold">Как добраться</div>
                {{ selectedPickupPoint.description }}
            </div>
            <div class="checkout-pickup-point-panel__address-payment">
                <div class="text-bold">Принимаются к оплате</div>
                {{ selectedPickupPoint.payment }}
            </div>
            <div class="checkout-pickup-point-panel__address-map">
                <yandex-map v-if="showMap" :coords="selectedPickupPoint.map.coords" :zoom="13" :controls="[]">
                    <ymap-marker
                        :key="`selected-point-${selectedPickupPoint.id}`"
                        :marker-id="`selected-point-${selectedPickupPoint.id}`"
                        :coords="selectedPickupPoint.map.coords"
                        :icon="markerIcon"
                    />
                </yandex-map>
            </div>
        </div>
    </div>
</template>
<script>
import '@plugins/ya-maps';
import VButton from '@controls/VButton/VButton.vue';

import { mapGetters } from 'vuex';
import { NAME as CHECKOUT_MODULE } from '@store/modules/Checkout';
import { SELECTED_PICKUP_POINT } from '@store/modules/Checkout/getters';

import pin from '@images/icons/pin-filled.svg';
import './CheckoutPickupPointPanel.css';

export default {
    name: 'checkout-pickup-point-panel',

    components: {
        VButton,
    },

    props: {
        error: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            showMap: false,
            coords: [55.755814, 37.617635],
            markerIcon: {
                layout: 'default#image',
                imageHref: pin,
                imageSize: [24, 24],
                imageOffset: [0, 0],
            },
        };
    },

    computed: {
        ...mapGetters(CHECKOUT_MODULE, [SELECTED_PICKUP_POINT]),
    },

    methods: {
        onChangePickupPoint() {
            this.$emit('change-address');
        },
    },

    mounted() {
        setTimeout(() => (this.showMap = true), 400);
    },
};
</script>
