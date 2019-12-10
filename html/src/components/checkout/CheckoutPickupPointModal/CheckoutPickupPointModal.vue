<template>
    <general-modal class="checkout-pickup-point-modal" @close="onClose" :is-scroll-locked="false" :is-mobile="isTablet">
        <template v-slot:content>
            <div class="checkout-pickup-point-modal__map">
                <yandex-map v-if="showMap && !isTablet" :zoom="11" :coords="coords" :controls="[]" showAllMarkers>
                    <ymap-marker
                        v-for="point in filteredPickupPoints"
                        :key="`${point.id}-${point.methodID}`"
                        :marker-id="`marker-${point.id}`"
                        :coords="point.map.coords"
                        :icon="markerIcon"
                    />
                </yandex-map>
            </div>
            <div class="checkout-pickup-point-modal__filter">
                <div class="container checkout-pickup-point-modal__filter-header">
                    <h3 class="checkout-pickup-point-modal__filter-header-hl">Выбор пункта выдачи</h3>
                    <div class="checkout-pickup-point-modal__filter-header-controls">
                        <v-select placeholder="Станция метро" :options="[]" />
                        <v-select
                            v-model="selectedDeliveryMethod"
                            placeholder="Тип пункта выдачи"
                            track-by="id"
                            label="title"
                            :options="deliveryMethods"
                            :searchable="false"
                        />
                    </div>
                </div>

                <ul class="checkout-pickup-point-modal__filter-list" v-scroll-lock="isOpen">
                    <checkout-option-card
                        class="checkout-pickup-point-modal__filter-list-item"
                        v-for="point in filteredPickupPoints"
                        :key="point.id"
                        readonly
                        @cardClick="onSelectPoint(point)"
                    >
                        <p class="text-bold">{{ point.title }}</p>
                        <p>{{ point.name }}</p>
                        <p class="text-grey text-sm">{{ point.startDate }}</p>
                    </checkout-option-card>
                </ul>
            </div>
        </template>
    </general-modal>
</template>
<script>
import '../../../plugins/ya-maps';

import VButton from '../../controls/VButton/VButton.vue';
import VSelect from '../../controls/VSelect/VSelect.vue';
import CheckoutOptionCard from '../CheckoutOptionCard/CheckoutOptionCard.vue';
import GeneralModal from '../../GeneralModal/GeneralModal.vue';

import { mapGetters, mapState, mapActions } from 'vuex';
import { NAME as CHECKOUT_MODULE } from '../../../store/modules/Checkout';
import { SET_PICKUP_POINT } from '../../../store/modules/Checkout/actions';
import { PICKUP_POINTS, SELECTED_DELIVERY_METHOD_ID, DELIVERY_METHODS } from '../../../store/modules/Checkout/getters';

import { NAME as MODAL_MODULE, MODALS } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import { receiveTypes } from '../../../assets/scripts/constants';
import pin from '../../../assets/images/icons/pin-filled.svg';
import './CheckoutPickupPointModal.css';

export const NAME = 'checkout-pickup-point-modal';

export default {
    name: NAME,

    components: {
        VButton,
        VSelect,

        CheckoutOptionCard,
        GeneralModal,
    },

    data() {
        return {
            selectedDeliveryMethod: null,
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
        ...mapGetters(CHECKOUT_MODULE, [PICKUP_POINTS, DELIVERY_METHODS, SELECTED_DELIVERY_METHOD_ID]),
        ...mapState(MODAL_MODULE, {
            isOpen: state => state[MODALS][NAME] && state[MODALS][NAME].isOpen,
        }),

        filteredPickupPoints() {
            return this[PICKUP_POINTS].filter(
                p => !this.selectedDeliveryMethod || p.methodID === this.selectedDeliveryMethod.id
            );
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(CHECKOUT_MODULE, [SET_PICKUP_POINT]),

        onSelectPoint(point) {
            this[SET_PICKUP_POINT](point);
            this.onClose();
        },

        onClose() {
            this.selectedDeliveryMethod = null;
            this.CHANGE_MODAL_STATE({ name: NAME, open: false });
        },
    },

    mounted() {
        setTimeout(() => (this.showMap = true), 400);
    },
};
</script>
