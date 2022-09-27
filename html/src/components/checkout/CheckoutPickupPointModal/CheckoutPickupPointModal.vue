<template>
    <general-modal
        class="checkout-pickup-point-modal"
        :type="isTabletLg ? 'fullscreen' : 'wide'"
        :is-scroll-locked="false"
        :is-mobile="isTabletLg"
        @close="onClose"
        @scroll="onModalScroll"
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
                    :zoom="14"
                    :coords="coords"
                    :controls="[]"
                    :cluster-options="clusterOptions"
                    :show-all-markers="false"
                    :options="{
                        minZoom: 13,
                    }"
                    @map-was-initialized="initHandler"
                    @boundschange="onMapBoundsChange"
                >
                    <ymap-marker
                        v-for="point in filteredPickupPoints"
                        :key="point.id"
                        :marker-id="point.id"
                        :coords="point.map.coords"
                        :icon="markerIcon"
                        :properties="{
                            pointName: point.name,
                            pointId: point.id,
                        }"
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
                    <div class="text-bold">Как добраться</div>
                    {{ selectedPickupPoint.description }}
                </div>

                <div class="checkout-pickup-point-modal__details-payment">
                    <div class="text-bold">Принимаются к оплате</div>
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
                        <v-select
                            v-if="metroOptions.length"
                            v-model="selectedMetro"
                            track-by="id"
                            label="title"
                            placeholder="Станция метро"
                            :options="metroOptions"
                        />
                        <v-select
                            v-model="selectedType"
                            placeholder="Тип пункта выдачи"
                            track-by="id"
                            label="title"
                            :options="pickupPointTypes"
                            :searchable="false"
                            :disabled="pickupPointTypes.length === 1"
                        />
                    </div>

                    <v-input v-model="search" class="checkout-pickup-point-modal__search" placeholder="Поиск" />
                </div>

                <v-scroll
                    v-if="!isTabletLg && filteredPickupPoints && filteredPickupPoints.length > 0"
                    :scroll-lock="isOpen"
                    @handle-scroll="onPickupListScroll"
                >
                    <ul class="checkout-pickup-point-modal__filter-list">
                        <checkout-option-card
                            class="checkout-pickup-point-modal__filter-list-item"
                            v-for="point in pagedPickupPoints"
                            :key="point.id"
                            readonly
                            @cardClick="onShowPoint(point)"
                        >
                            <div class="text-bold">{{ point.title }}</div>
                            <div class="checkout-pickup-point-modal__filter-list-item-name">
                                {{ point.name }}
                            </div>
                            <div class="text-grey text-sm" v-if="point.startDate">
                                Можно забрать с {{ point.startDate }}, {{ point.startDateDay }}
                            </div>
                        </checkout-option-card>
                    </ul>
                </v-scroll>

                <ul
                    v-else-if="filteredPickupPoints && filteredPickupPoints.length > 0"
                    class="checkout-pickup-point-modal__filter-list"
                >
                    <checkout-option-card
                        class="checkout-pickup-point-modal__filter-list-item"
                        v-for="point in pagedPickupPoints"
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

                <div class="checkout-pickup-point-modal__filter" v-else-if="isLoadingFilteredPickupPoints">
                    <v-spinner show/>
                </div>

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
import VScroll from '@controls/VScroll/VScroll.vue';
import VInput from '@controls/VInput/VInput.vue';
import VSpinner from "@controls/VSpinner/VSpinner.vue";

import GeneralModal from '@components/GeneralModal/GeneralModal.vue';
import CheckoutOptionCard from '@components/checkout/CheckoutOptionCard/CheckoutOptionCard.vue';

import { mapGetters, mapState, mapActions } from 'vuex';
import { LOCALE } from '@store';
import { NAME as GEO_MODULE } from '@store/modules/Geolocation';
import { SELECTED_CITY_COORDS } from '@store/modules/Geolocation/getters';

import { NAME as CHECKOUT_MODULE } from '@store/modules/Checkout';
import { SET_PICKUP_POINT } from '@store/modules/Checkout/actions';
import { PICKUP_POINTS, PICKUP_POINT_TYPES, METRO_STATIONS, METRO_LINES } from '@store/modules/Checkout/getters';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { formatPhoneNumber } from '@util';
import { modalName } from '@enums';
import { dayMonthLongDateSettings } from '@settings';
import _ceil from 'lodash/ceil';
import pin from '@images/icons/pin-filled.svg';
import '@images/sprites/arrow-small.svg';
import './CheckoutPickupPointModal.css';

const NAME = modalName.checkout.PICKUP_POINT;
const PER_PAGE = 20;

export default {
    name: NAME,

    components: {
        VInput,
        VSvg,
        VLink,
        VButton,
        VSelect,
        VScroll,
        VSpinner,
        CheckoutOptionCard,
        GeneralModal,
    },

    data() {
        return {
            selectedType: null,
            selectedMetro: null,
            selectedPickupPoint: null,
            search: '',
            debouncedSearch: '',
            showMap: false,
            coords: [55.755814, 37.617635],
            currentMapBounds: [],
            isLoadingFilteredPickupPoints: true,

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
            page: 1,

            yandexMapApi: null,
            debounce_search: null,

            onMarkerClickInBalloonEvent: null,
        };
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapGetters(GEO_MODULE, [SELECTED_CITY_COORDS]),
        ...mapGetters(CHECKOUT_MODULE, [PICKUP_POINTS, PICKUP_POINT_TYPES, METRO_STATIONS, METRO_LINES]),
        ...mapState(MODAL_MODULE, {
            isOpen: (state) => state[MODALS][NAME] && state[MODALS][NAME].open,
        }),

        filteredPickupPoints() {
            if (!this.yandexMapApi) {
                return [];
            }

            const points = this[PICKUP_POINTS] || [];
            const metroLines = this[METRO_LINES] || [];
            const filteredPoints = points.filter((p) => {
                let pass = true;

                if (this.selectedType && this.selectedMetro) {
                    let isMetro = false;
                    if (this.selectedMetro) {
                        const metroIds = metroLines[this.selectedMetro.id];
                        if (metroIds) {
                            p.pointMetroStationLinks.forEach((pointMetroStationLink) => {
                                if (metroIds.includes(pointMetroStationLink.metro_station_id)) {
                                    isMetro = true;
                                }
                            });
                        }
                    }

                    pass =
                        (!this.selectedType && isMetro) ||
                        (!this.selectedMetro && p.methodID === this.selectedType.id) ||
                        (isMetro && p.methodID === this.selectedType.id);
                }

                if (this.debouncedSearch.length > 0) {
                    const normalizedSearchString = this.debouncedSearch.toLowerCase().trim();
                    const normalizedPointTitle = p.title.toLowerCase().trim();
                    const normalizedPointName = p.name.toLowerCase().trim();

                    if (
                        normalizedPointName.search(new RegExp(normalizedSearchString)) === -1 &&
                        normalizedPointTitle.search(new RegExp(normalizedSearchString)) === -1
                    ) {
                        pass = false;
                    }
                }

                return pass;
            });

            return filteredPoints.map((p) => {
                const dateObj = new Date(p.startDate);
                const startDate = p.startDate && dateObj.toLocaleDateString(this[LOCALE], dayMonthLongDateSettings);
                const startDateDay = p.startDate && dateObj.getDay();
                const phones = p.phone && p.phone.split(', ');
                const phone = phones && phones.map((p) => formatPhoneNumber(p)).join(', ');

                return {
                    ...p,
                    phone,
                    startDate,
                    startDateDay: this.$t(`weekdays.long.${startDateDay}`),
                };
            });
        },

        pagedPickupPoints() {
            if (this.page === 1) {
                return this.filteredPickupPoints.slice(0, PER_PAGE - 1);
            } else {
                return this.filteredPickupPoints.slice(0, this.page * PER_PAGE - 1);
            }
        },

        metroOptions() {
            return this[METRO_STATIONS] || [];
        },

        clusterOptions() {
            let clusterOptions = {
                preset: 'islands#blackClusterIcons',
            };

            if (this.yandexMapApi !== null) {
                clusterOptions = {
                    ...clusterOptions,
                    clusterBalloonContentLayout: this.yandexMapApi.templateLayoutFactory.createClass(
                        `<ul class="ymap-pickup-balloon">
                            {% for geoObject in properties.geoObjects %}
                                <li><a href="#" data-point-id="{{ geoObject.properties.pointId }}" class="list_item">{{ geoObject.properties.pointName|raw }}</a></li>
                            {% endfor %}
                        </ul>`
                    ),
                };
            }

            return {
                'default-cluster': clusterOptions,
            };
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    watch: {
        filteredPickupPoints() {
            this.page = 1;
            this.isLoadingFilteredPickupPoints = false;
        },

        search(value) {
            clearTimeout(this.debounce_search);
            this.debounce_search = setTimeout(() => {
                this.debouncedSearch = value;
            }, 1000);
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(CHECKOUT_MODULE, [SET_PICKUP_POINT]),

        onShowPoint(point) {
            this.selectedPickupPoint = point;
            this.activeTab = 1;
            this.coords = point.map.coords;
        },

        onSelectPoint() {
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

        onPickupListScroll(vertical) {
            const { process } = vertical;
            const pages = _ceil(this.filteredPickupPoints.length / PER_PAGE);

            if (process >= 0.85 && this.page < pages) {
                this.page = this.page + 1;
            }
        },

        onModalScroll(event) {
            const { target } = event;
            const scrolledElement = target.firstChild;
            const pages = _ceil(this.filteredPickupPoints.length / PER_PAGE);

            if (scrolledElement) {
                const viewportHeight = window.innerHeight;
                const { y, height } = scrolledElement.getBoundingClientRect();

                const process = Math.abs(y) / (height - viewportHeight);

                if (process >= 0.85 && this.page < pages) {
                    this.page = this.page + 1;
                }
            }
        },

        onMapBoundsChange(event) {
            const {
                originalEvent: { newBounds },
            } = event;

            this.currentMapBounds = newBounds;
        },

        initHandler(e) {
            if (typeof window.ymaps !== 'undefined') {
                this.yandexMapApi = window.ymaps;
            }

            e.geoObjects.events.add('click', (e) => {
                // marker-4238 => 4238
                // defaultPrevented === true if group of markers
                if (!e._defaultPrevented) {
                    const id = +e.get('target').properties._data.markerId;
                    const point = this.filteredPickupPoints.find((item) => item.id === id);
                    this.onShowPoint(point);
                }
            });
        },
    },

    created() {
        if (this.filteredPickupPoints.length === 0 || this.filteredPickupPoints.length > 1) {
            this.coords = this[SELECTED_CITY_COORDS];
        } else {
            this.coords = this.filteredPickupPoints[0].point.map.coords;
        }
    },

    mounted() {
        setTimeout(() => (this.showMap = true), 400);

        const thisComponent = this;
        const delegateEvent = function (event) {
            let t = event.target;
            while (t && t !== this) {
                if (t.matches('.ymap-pickup-balloon a')) {
                    event.preventDefault();

                    const { target } = event;

                    const id = +target.getAttribute('data-point-id');
                    const point = thisComponent.filteredPickupPoints.find((item) => item.id === id);

                    if (point) {
                        thisComponent.onShowPoint(point);
                    }
                }

                t = t.parentNode;
            }
        };

        this.onMarkerClickInBalloonEvent = delegateEvent;

        document.addEventListener('click', delegateEvent);

        if (this.pickupPointTypes.length === 1) {
            this.selectedType = this.pickupPointTypes[0];
        }
    },

    beforeDestroy() {
        if (this.onMarkerClickInBalloonEvent !== null) {
            document.removeEventListener('click', this.onMarkerClickInBalloonEvent);
        }
    },
};
</script>
