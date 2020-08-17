<template>
    <general-modal
        class="checkout-pickup-point-modal"
        :type="isTabletLg ? 'fullscreen' : 'wide'"
        @close="onClose"
        :is-scroll-locked="false"
        :is-mobile="isTabletLg"
    >
        <template v-slot:header>
            <button
                v-if="!selectedPickupPoint"
                class="checkout-pickup-point-modal__header-btn checkout-pickup-point-modal__header-btn--close"
                @click="onClose()"
            >
                <v-svg name="cross" width="24" height="24" />Выбор пункта выдачи
            </button>
            <template v-else class="container checkout-pickup-point-modal">
                <button
                    class="checkout-pickup-point-modal__header-btn checkout-pickup-point-modal__header-btn--arrow"
                    @click.prevent="onBackClick"
                >
                    <v-svg name="arrow-small" width="24" height="24" />
                    Назад к списку
                </button>
            </template>
        </template>

        <template v-slot:content>
            <div class="checkout-pickup-point-modal__tabs" v-if="isTabletLg">
                <button
                    class="checkout-pickup-point-modal__tabs-button"
                    type="button"
                    v-for="(tab, index) in tabs"
                    :class="{ 'is-active': activeTab === index }"
                    :key="index"
                    @click="onTabClick(index)"
                >
                    <v-svg class="checkout-pickup-point-modal__tabs-icon" :name="tab.icon" width="24" height="24" />
                    {{ tab.name }}
                </button>
            </div>

            <div class="checkout-pickup-point-modal__map" v-if="!isTabletLg || activeTab === 0">
                <yandex-map
                    v-if="showMap"
                    :zoom="11"
                    :coords="coords"
                    :controls="[]"
                    :cluster-options="clusterOptions"
                    :show-all-markers="filteredPickupPoints.length > 1"
                    @map-was-initialized="initHandler"
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
                v-if="(!isTabletLg || activeTab === 1) && selectedPickupPoint"
                v-scroll-lock="selectedPickupPoint"
            >
                <v-link
                    class="checkout-pickup-point-modal__details-back-link"
                    tag="button"
                    v-if="!isTabletLg"
                    @click.stop="onBackClick"
                >
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
                        <template v-if="selectedPickupPoint.startDate">
                            Можно забрать с {{ selectedPickupPoint.startDate }}, {{ selectedPickupPoint.startDateDay }}
                        </template>

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

                <div class="checkout-pickup-point-modal__details-desc" v-if="selectedPickupPoint.description">
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

            <div
                class="checkout-pickup-point-modal__filter"
                v-if="(!isTabletLg || activeTab === 1) && !selectedPickupPoint"
            >
                <div class="container checkout-pickup-point-modal__filter-header">
                    <h3 class="checkout-pickup-point-modal__filter-header-hl" v-if="!isTabletLg">
                        Выбор пункта выдачи
                    </h3>

                    <div class="checkout-pickup-point-modal__filter-header-controls">
                        <!-- <v-select placeholder="Станция метро" :options="[]" /> -->
                        <v-select
                            v-model="selectedType"
                            placeholder="Тип пункта выдачи"
                            track-by="id"
                            label="title"
                            :options="pickupPointTypes"
                            :searchable="false"
                        />
                    </div>
                </div>

                <ul
                    class="checkout-pickup-point-modal__filter-list"
                    v-if="filteredPickupPoints.length"
                    v-scroll-lock="isOpen"
                >
                    <checkout-option-card
                        class="checkout-pickup-point-modal__filter-list-item"
                        v-for="point in filteredPickupPoints"
                        :key="point.id"
                        readonly
                        @cardClick="onShowPoint(point)"
                    >
                        <div class="text-bold">{{ point.title }}</div>
                        <div class="checkout-pickup-point-modal__filter-list-item-name">{{ point.name }}</div>
                        <div class="text-grey text-sm" v-if="point.startDate">
                            Можно забрать с {{ point.startDate }}, {{ point.startDateDay }}
                        </div>
                    </checkout-option-card>
                </ul>
                <div class="checkout-pickup-point-modal__filter" v-else>
                    <span class="checkout-pickup-point-modal__filter-empty-text">
                        Не найдено ни одного пункта самовывоза.
                    </span>
                </div>
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
import { LOCALE } from '@store';
import { NAME as GEO_MODULE } from '@store/modules/Geolocation';
import { SELECTED_CITY_COORDS } from '@store/modules/Geolocation/getters';

import { NAME as CHECKOUT_MODULE } from '@store/modules/Checkout';
import { SET_PICKUP_POINT } from '@store/modules/Checkout/actions';
import { PICKUP_POINTS, PICKUP_POINT_TYPES } from '@store/modules/Checkout/getters';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { formatPhoneNumber } from '@util';
import { receiveTypes, modalName } from '@enums';
import { dayMonthLongDateSettings } from '@settings';
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
            selectedType: null,
            selectedPickupPoint: null,
            showMap: false,
            // coords: [55.755814, 37.617635],

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

            tabs: [
                {
                    name: 'Карта',
                    icon: 'map',
                },
                {
                    name: 'Список',
                    icon: 'list',
                },
            ],

            activeTab: 0,
        };
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapGetters(GEO_MODULE, [SELECTED_CITY_COORDS]),
        ...mapGetters(CHECKOUT_MODULE, [PICKUP_POINTS, PICKUP_POINT_TYPES]),
        ...mapState(MODAL_MODULE, {
            isOpen: state => state[MODALS][NAME] && state[MODALS][NAME].open,
        }),

        coords() {
            if (this.filteredPickupPoints.length === 0 || this.filteredPickupPoints.length > 1)
                return this[SELECTED_CITY_COORDS];
            const point = this.filteredPickupPoints[0];
            return point.map.coords;
        },

        filteredPickupPoints() {
            const points = this[PICKUP_POINTS] || [];
            const filteredPoints = points.filter(p => !this.selectedType || p.methodID === this.selectedType.id);

            return filteredPoints.map(p => {
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
            this.activeTab = 1;
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
            this.CHANGE_MODAL_STATE({ name: NAME, open: false });
        },

        onTabClick(index) {
            if (this.activeTab !== index) {
                this.selectedPickupPoint = null;
                this.activeTab = index;
            }
        },

        initHandler(e) {
            const vm = this;
            e.geoObjects.events.add('click', e => {
                // marker-4238 => 4238
                // defaultPrevented === true if group of markers
                if (!e._defaultPrevented) {
                    const id = +e.get('target').properties._data.markerId.split('-')[1];
                    const point = this.filteredPickupPoints.find(item => item.id === id);
                    this.onShowPoint(point);
                }
            });
        },
    },

    mounted() {
        setTimeout(() => (this.showMap = true), 400);
    },
};
</script>
