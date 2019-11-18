<template>
    <div class="checkout-address-panel">
        <div v-if="!selectedPickupPoint" class="checkout-address-panel__choice">
            <h3>Выберите пункт выдачи заказов</h3>
            <v-button class="btn--outline" @click="$emit('changeAddress')">
                Выбрать
            </v-button>
        </div>
        <div v-else class="checkout-address-panel__address">
            <div class="checkout-address-panel__address-info">
                <div class="checkout-address-panel__address-info-main">
                    <h3>{{ selectedPickupPoint.title }}</h3>
                    <div>{{ selectedPickupPoint.name }}</div>
                    <div>{{ selectedPickupPoint.phone }}</div>
                </div>
                <div class="checkout-address-panel__address-info-schedule">
                    {{ selectedPickupPoint.startDate }}
                    <ul class="checkout-address-panel__address-info-schedule-list">
                        <li
                            class="checkout-address-panel__address-info-schedule-item"
                            v-for="item in selectedPickupPoint.schedule"
                            :key="item.id"
                        >
                            <div>{{ item.title }}</div>
                            <div>{{ item.time }}</div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="checkout-address-panel__address-desc">
                <div class="text-bold">
                    Как добраться
                </div>
                {{ selectedPickupPoint.description }}
            </div>
            <div class="checkout-address-panel__address-payment">
                <div class="text-bold">
                    Принимаются к оплате
                </div>
                {{ selectedPickupPoint.payment }}
            </div>
            <div class="checkout-address-panel__address-map">
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
import '../../../plugins/ya-maps';
import pin from '../../../assets/images/icons/pin-filled.svg';
import VButton from '../../controls/VButton/VButton.vue';

import { mapGetters, mapState, mapActions } from 'vuex';
import { NAME as CHECKOUT_MODULE, CHECKOUT_DATA, SELECTED_PICKUP_POINT } from '../../../store/modules/Checkout';
import { ADDRESSES_BY_METHOD } from '../../../store/modules/Checkout/getters';

import { NAME as MODAL_MODULE } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import './CheckoutAddressPanel.css';

export default {
    name: 'checkout-address-panel',

    components: {
        VButton,
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
        ...mapState(CHECKOUT_MODULE, [SELECTED_PICKUP_POINT]),
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
    },

    mounted() {
        setTimeout(() => (this.showMap = true), 400);
    },
};
</script>
