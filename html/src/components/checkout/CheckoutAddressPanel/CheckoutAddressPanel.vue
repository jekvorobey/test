<template>
    <div class="checkout-address-panel">
        <div v-if="!selectedAddress" class="checkout-address-panel__choice">
            <h3>Выберите пункт выдачи заказов</h3>
            <v-button @click="onChangeBtnClick">Выбрать</v-button>
        </div>
        <div v-else class="checkout-address-panel__address">
            <div class="checkout-address-panel__address-info">
                <div class="checkout-address-panel__address-info-main">
                    <h3>{{ selectedAddress.title }}</h3>
                    <div>{{ selectedAddress.name }}</div>
                    <div>{{ selectedAddress.phone }}</div>
                </div>
                <div class="checkout-address-panel__address-info-schedule">
                    {{ selectedAddress.startDate }}
                    <ul class="checkout-address-panel__address-info-schedule-list">
                        <li
                            class="checkout-address-panel__address-info-schedule-item"
                            v-for="item in selectedAddress.schedule"
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
                {{ selectedAddress.description }}
            </div>
            <div class="checkout-address-panel__address-payment">
                <div class="text-bold">
                    Принимаются к оплате
                </div>
                {{ selectedAddress.payment }}
            </div>
            <div class="checkout-address-panel__address-map" :style="{ width: 600, height: 600 }">
                <yandex-map
                    :coords="selectedAddress.map.coords"
                    :cluster-options="{ 1: { clusterDisableClickZoom: true } }"
                    :controls="[]"
                >
                    <ymap-marker marker-id="123" :coords="selectedAddress.map.coords" :icon="markerIcon" />
                </yandex-map>
            </div>
        </div>
    </div>
</template>
<script>
import '../../../plugins/ya-maps';
import pin from '../../../assets/images/icons/pin-filled.svg';
import VButton from '../../controls/VButton/VButton.vue';

import { mapGetters, mapState } from 'vuex';
import { NAME as CHECKOUT_MODULE, CHECKOUT_DATA } from '../../../store/modules/Checkout';
import { ADDRESSES_BY_METHOD } from '../../../store/modules/Checkout/getters';

import './CheckoutAddressPanel.css';

export default {
    name: 'checkout-address-panel',

    components: {
        VButton,
    },

    data() {
        return {
            markerIcon: {
                layout: 'default#image',
                imageHref: pin,
                imageSize: [24, 24],
                imageOffset: [0, 0],
            },
        };
    },

    computed: {
        ...mapState(CHECKOUT_MODULE, [CHECKOUT_DATA]),
        ...mapGetters(CHECKOUT_MODULE, [ADDRESSES_BY_METHOD]),

        selectedAddress() {
            return this[ADDRESSES_BY_METHOD].items.find(i => i.id === this[CHECKOUT_DATA].addressID);
        },
    },

    methods: {
        onChangeBtnClick() {
            this.$emit('changeAddress');
        },
    },
};
</script>
