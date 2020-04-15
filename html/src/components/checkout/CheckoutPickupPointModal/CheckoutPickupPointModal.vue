<template>
    <general-modal
        class="checkout-pickup-point-modal"
        :type="isTabletLg ? 'fullscreen' : 'wide'"
        @close="onClose"
        :is-scroll-locked="false"
        :is-mobile="isTabletLg"
    >
        <template v-slot:content>
            <div class="checkout-pickup-point-modal__map" v-if="!isTabletLg">
                <yandex-map
                    v-if="showMap"
                    :zoom="11"
                    :coords="coords"
                    :controls="[]"
                    :cluster-options="clusterOptions"
                    showAllMarkers
                >
                    <ymap-marker
                        v-for="point in filteredPickupPoints"
                        :key="`${point.id}-${point.methodID}`"
                        :marker-id="`marker-${point.id}`"
                        :coords="point.map.coords"
                        :icon="markerIcon"
                        cluster-name="default-cluster"
                    />
                </yandex-map>
            </div>

            <div
                class="container container--tablet-lg checkout-pickup-point-modal__details"
                v-if="selectedPickupPoint"
                v-scroll-lock="selectedPickupPoint"
            >
                <v-link class="checkout-pickup-point-modal__details-back-link" tag="button" @click.stop="onBackClick">
                    <v-svg modifier="icon--rotate-deg90" name="arrow-small" width="24" height="24" />&nbsp;Назад к
                    списку
                </v-link>
                <div class="checkout-pickup-point-modal__details-info">
                    <div class="checkout-pickup-point-modal__details-info-main">
                        <h3 class="checkout-pickup-point-modal__details-info-main-hl">
                            {{ selectedPickupPoint.title }}
                        </h3>
                        <div>{{ selectedPickupPoint.name }}</div>
                        <div>{{ selectedPickupPoint.phone }}</div>
                    </div>
                    <div class="checkout-pickup-point-modal__details-info-schedule">
                        {{ selectedPickupPoint.startDate }}
                        <ul class="checkout-pickup-point-modal__details-info-schedule-list">
                            <li
                                class="checkout-pickup-point-modal__details-info-schedule-item"
                                v-for="item in selectedPickupPoint.schedule"
                                :key="item.id"
                            >
                                <div>{{ item.title }}</div>
                                <div>{{ item.time }}</div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="checkout-pickup-point-modal__details-desc">
                    <div class="text-bold">
                        Как добраться
                    </div>
                    {{ selectedPickupPoint.description }}
                </div>
                <div class="checkout-pickup-point-modal__details-payment">
                    <div class="text-bold">
                        Принимаются к оплате
                    </div>
                    {{ selectedPickupPoint.payment }}
                </div>
                <v-button class="checkout-pickup-point-modal__details-accept" @click.stop="onSelectPoint">
                    Выбрать
                </v-button>
            </div>

            <div class="checkout-pickup-point-modal__filter" v-else>
                <div class="container checkout-pickup-point-modal__filter-header">
                    <h3 class="checkout-pickup-point-modal__filter-header-hl">Выбор пункта выдачи</h3>
                    <div class="checkout-pickup-point-modal__filter-header-controls">
                        <!-- <v-select placeholder="Станция метро" :options="[]" /> -->
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
                        @cardClick="onShowPoint(point)"
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
import '@plugins/ya-maps';

import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';
import VSelect from '@controls/VSelect/VSelect.vue';

import GeneralModal from '@components/GeneralModal/GeneralModal.vue';
import CheckoutOptionCard from '@components/checkout/CheckoutOptionCard/CheckoutOptionCard.vue';

import { mapGetters, mapState, mapActions } from 'vuex';
import { NAME as CHECKOUT_MODULE } from '@store/modules/Checkout';
import { SET_PICKUP_POINT } from '@store/modules/Checkout/actions';
import { PICKUP_POINTS, SELECTED_DELIVERY_METHOD_ID, DELIVERY_METHODS } from '@store/modules/Checkout/getters';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { receiveTypes, modalName } from '@enums';
import pin from '@images/icons/pin-filled.svg';
import '@images/sprites/arrow-small.svg';
import './CheckoutPickupPointModal.css';

const NAME = modalName.checkout.PICKUP_POINT;

export default {
    name: NAME,

    components: {
        VSvg,
        VLink,
        VButton,
        VSelect,

        CheckoutOptionCard,
        GeneralModal,
    },

    data() {
        return {
            selectedPickupPoint: null,
            selectedDeliveryMethod: null,
            showMap: false,
            coords: [55.755814, 37.617635],

            markerIcon: {
                layout: 'default#image',
                imageHref: pin,
                imageSize: [24, 24],
                imageOffset: [0, 0],
            },

            clusterMarkerIcon: {
                href: pin,
                size: [32, 32],
                offset: [0, 0],
            },
        };
    },

    computed: {
        ...mapGetters(CHECKOUT_MODULE, [PICKUP_POINTS, DELIVERY_METHODS, SELECTED_DELIVERY_METHOD_ID]),
        ...mapState(MODAL_MODULE, {
            isOpen: (state) => state[MODALS][NAME] && state[MODALS][NAME].open,
        }),

        filteredPickupPoints() {
            return this[PICKUP_POINTS].filter(
                (p) => !this.selectedDeliveryMethod || p.methodID === this.selectedDeliveryMethod.id
            );
        },

        clusterOptions() {
            return {
                'default-cluster': {
                    preset: 'islands#blackClusterIcons',
                },
            };
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(CHECKOUT_MODULE, [SET_PICKUP_POINT]),

        onShowPoint(point) {
            this.selectedPickupPoint = point;
        },

        onSelectPoint(point) {
            this[SET_PICKUP_POINT](this.selectedPickupPoint);
            this.selectedPickupPoint = null;
            this.onClose();
        },

        onBackClick() {
            this.selectedPickupPoint = null;
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
