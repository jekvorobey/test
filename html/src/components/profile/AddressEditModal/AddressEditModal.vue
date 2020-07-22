<template>
    <general-modal
        class="address-edit-modal"
        :type="isTabletLg ? 'fullscreen' : 'wide'"
        header="Выбор пункта выдачи"
        @close="onClose"
        :is-mobile="isTabletLg"
    >
        <template v-slot:content>
            <radio-switch
                class="address-edit-modal__switch"
                name="map-switch"
                v-model="selectedSwitch"
                :items="switchItems"
                v-if="isTabletLg"
            >
                <template v-slot:content="{ item }">
                    <v-svg :name="item.value" width="24" height="24" />&nbsp;&nbsp;{{ item.title }}
                </template>
            </radio-switch>
            <div class="address-edit-modal__map" v-show="!isTabletLg || isMap">
                <yandex-map
                    v-if="showMap"
                    :zoom="zoom"
                    :settings="mapSettings"
                    :coords="computedCoords"
                    :controls="[]"
                    :options="{ yandexMapDisablePoiInteractivity: true }"
                    @click="onMapClick"
                >
                    <ymap-marker v-if="coords" marker-id="marker-id" :coords="computedCoords" :icon="markerIcon" />
                </yandex-map>
            </div>
            <div class="address-edit-modal__form" v-show="!isTabletLg || !isMap">
                <div class="address-edit-modal__form-header">
                    <h3 class="address-edit-modal__form-header-hl">Адрес доставки</h3>
                    <span class="text-grey text-sm">Укажите на карте или введите вручную</span>
                </div>
                <div class="address-edit-modal__form-row">
                    <v-suggestion
                        class="address-edit-modal__form-column"
                        :value="address.city"
                        :options="options"
                        :items="cities"
                        @input="onCityInputChange"
                        @selected="onCitySelected"
                        :error="cityError"
                    >
                        Ваш населенный пункт
                        <template v-slot:item="{ item }">
                            {{ item.value }}
                        </template>
                        <template v-slot:error="{ error }">
                            <transition name="slide-in-bottom" mode="out-in">
                                <div :key="error" v-if="error">{{ error }}</div>
                            </transition>
                        </template>
                    </v-suggestion>

                    <v-input
                        class="address-edit-modal__form-column address-edit-modal__form-column--30"
                        v-model="address.post_index"
                        type="number"
                        maxlength="6"
                        min="1"
                        :error="indexError"
                    >
                        Индекс
                        <template v-slot:error="{ error }">
                            <transition name="slide-in-bottom" mode="out-in">
                                <div :key="error" v-if="error">{{ error }}</div>
                            </transition>
                        </template>
                    </v-input>
                </div>

                <div class="address-edit-modal__form-row">
                    <v-suggestion
                        class="address-edit-modal__form-column"
                        :value="selectedFormatAddress"
                        :options="options"
                        :items="addresses"
                        @input="onAddressInputChange"
                        @selected="onAddressSelected"
                        :error="houseError"
                    >
                        Улица, дом, корпус
                        <template v-slot:item="{ item }">
                            {{ formatAddress(item) }}
                        </template>
                        <template v-slot:error="{ error }">
                            <transition name="slide-in-bottom" mode="out-in">
                                <div :key="error" v-if="error">{{ error }}</div>
                            </transition>
                        </template>
                    </v-suggestion>
                    <v-input
                        v-model="address.flat"
                        class="address-edit-modal__form-column address-edit-modal__form-column--30 address-edit-modal__form-column--50"
                    >
                        Квартира/офис
                    </v-input>

                    <v-input
                        v-model="address.floor"
                        class="address-edit-modal__form-column address-edit-modal__form-column--30 address-edit-modal__form-column--50"
                        type="number"
                        min="1"
                    >
                        Этаж
                    </v-input>

                    <v-input
                        v-model="address.porch"
                        class="address-edit-modal__form-column address-edit-modal__form-column--30 address-edit-modal__form-column--50"
                        type="number"
                        min="1"
                    >
                        Подъезд
                    </v-input>

                    <v-input
                        v-model="address.intercom"
                        class="address-edit-modal__form-column address-edit-modal__form-column--30 address-edit-modal__form-column--50"
                        min="1"
                    >
                        Домофон
                    </v-input>
                </div>

                <v-input tag="textarea" rows="3" v-model="address.comment" maxHeight="100">
                    Комментарий курьеру
                </v-input>

                <div class="address-edit-modal__form-submit">
                    <v-button class="address-edit-modal__form-submit-btn" @click.prevent="onSubmit">
                        Привезти сюда
                    </v-button>
                </div>
            </div>
        </template>
    </general-modal>
</template>
<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps';

import VSvg from '@controls/VSvg/VSvg.vue';
import VButton from '@controls/VButton/VButton.vue';
import VSuggestion from '@controls/VSuggestion/VSuggestion.vue';
import VInput from '@controls/VInput/VInput.vue';

import RadioSwitch from '@components/RadioSwitch/RadioSwitch.vue';
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import { mapGetters, mapState, mapActions } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as GEO_MODULE, SELECTED_CITY } from '@store/modules/Geolocation';
import { SELECTED_CITY_COORDS } from '@store/modules/Geolocation/getters';
import { SET_SELECTED_CITY } from '@store/modules/Geolocation/actions';

import validationMixin, { required } from '@plugins/validation';
import { $dadata } from '@services';
import { yaMapSettings } from '@settings';
import { modalName } from '@enums';
import { suggestionTypes } from '@enums/suggestions';

import pin from '@images/icons/pin-filled.svg';
import '@images/sprites/list.svg';
import '@images/sprites/map.svg';
import './AddressEditModal.css';

const NAME = modalName.profile.ADDRESS_EDIT;

export default {
    name: NAME,
    mixins: [validationMixin],

    components: {
        VSvg,
        VButton,
        VInput,
        VSuggestion,
        GeneralModal,
        RadioSwitch,

        yandexMap,
        ymapMarker,
    },

    validations: {
        address: {
            city: {
                required,
            },

            house: {
                required,
            },

            post_index: {
                required,
            },
        },
    },

    data() {
        return {
            address: {
                country_code: '',
                post_index: '',
                region: '',
                region_guid: '',
                area: '',
                area_guid: '',
                city: '',
                city_guid: '',
                street: '',
                house: '',
                block: '',
                flat: '',
                floor: '',
                porch: '',
                intercom: '',
                comment: '',
                geo_lat: '',
                geo_lon: '',
            },

            zoom: null,
            coords: null,

            cities: [],
            addresses: [],

            options: { debounce: 500 },
            showMap: false,

            selectedSwitch: 'list',
            switchItems: [
                { value: 'list', title: 'Форма' },
                { value: 'map', title: 'Карта' },
            ],

            markerIcon: {
                layout: 'default#image',
                imageHref: pin,
                imageSize: [24, 24],
                imageOffset: [0, 0],
            },
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            modalState: state => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
        }),
        ...mapGetters(GEO_MODULE, [SELECTED_CITY_COORDS]),

        computedCoords() {
            return this.coords || this[SELECTED_CITY_COORDS];
        },

        selectedFormatAddress() {
            let address = '';
            if (this.address.street) address += this.address.street + ' ';
            if (this.address.house) address += this.address.house + ' ';
            if (this.address.block) address += this.address.block;
            return address;
        },

        mapSettings() {
            return { ...yaMapSettings };
        },

        cityError() {
            if (this.$v.address.city.$dirty && !this.$v.address.city.required) return 'Обязательное поле';
        },

        houseError() {
            if (this.$v.address.house.$dirty && !this.$v.address.house.required) return 'Обязательное поле';
        },

        indexError() {
            if (this.$v.address.post_index.$dirty && !this.$v.address.post_index.required) return 'Обязательное поле';
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        isMap() {
            return this.selectedSwitch === 'map';
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        findAddress(type, query, count, locations) {
            let from_bound = { value: type };
            let to_bound;

            switch (type) {
                case suggestionTypes.REGION:
                    to_bound = { value: suggestionTypes.AREA };
                    break;
                case suggestionTypes.CITY:
                    to_bound = { value: suggestionTypes.SETTLEMENT };
                    break;
                case suggestionTypes.STREET:
                    to_bound = { value: suggestionTypes.STREET };
                    break;
                case suggestionTypes.HOUSE:
                    break;
                default:
                    to_bound = { value: type };
            }

            return $dadata.post('/suggest/address', {
                query,
                count,
                locations,
                from_bound,
                to_bound,
            });
        },

        async onCitySelected(selected) {
            try {
                const { suggestions } = await this.findAddress(suggestionTypes.CITY, selected.unrestricted_value, 1);
                this.onApplyAddress(suggestions[0]);
            } catch (error) {
                console.log(error);
            }
        },

        async onCityInputChange(query) {
            try {
                // return the matching countries as an array
                const { suggestions } = await this.findAddress(suggestionTypes.CITY, query || this.address.value, 20);
                this.cities = suggestions;
            } catch (error) {
                console.log(error);
                return null;
            }
        },

        async onAddressSelected(selected) {
            try {
                const { suggestions } = await this.findAddress(suggestionTypes.HOUSE, selected.unrestricted_value, 1);
                this.zoom = 17;
                setTimeout(() => {
                    this.onApplyAddress(suggestions[0]);
                }, 0);
            } catch (error) {
                console.log(error);
            }
        },

        async onAddressInputChange(query = '') {
            try {
                let filter = [];
                // return the matching countries as an array

                if (this.address && this.address.city_guid)
                    filter.push({
                        city_fias_id: this.address.city_guid,
                    });

                const { suggestions } = await this.findAddress(
                    suggestionTypes.HOUSE,
                    `${this.address.city || ''} ${query}`,
                    20,
                    filter
                );
                this.addresses = suggestions;
            } catch (error) {
                console.log(error);
                return null;
            }
        },

        async onMapClick(e) {
            const coords = e.get('coords');

            const { suggestions } = await $dadata.post('/geolocate/address', {
                lat: coords[0],
                lon: coords[1],
                radius_meters: 1000,
            });

            const selected = suggestions.find(s => s.data.house);
            this.onApplyAddress(selected);
        },

        formatAddress(item) {
            return `${item.data.street_with_type ||
                item.data.city_district_with_type ||
                item.data.settlement_with_type ||
                ''} ${item.data.house_type} ${item.data.house} ${
                item.data.block ? `${item.data.block_type} ${item.data.block}` : ''
            }`;
        },

        onApplyAddress(value) {
            const address = { ...this.address };
            if (value) {
                address.country_code = value.data.country_iso_code;
                if (value.data.postal_code) address.post_index = value.data.postal_code;
                address.region = value.data.region_with_type || value.data.region;
                address.region_guid = value.data.region_fias_id;
                address.area = value.data.area_with_type || value.data.area;
                address.area_guid = value.data.area_fias_id;
                address.city =
                    value.data.city_with_type ||
                    value.data.city ||
                    value.data.settlement_with_type ||
                    value.data.settlement;
                address.city_guid = value.data.city_fias_id || value.data.settlement_fias_id;
                address.street = value.data.street_with_type || value.data.street;
                address.house = value.data.house_type
                    ? `${value.data.house_type} ${value.data.house}`
                    : value.data.house;
                address.block = value.data.block_type
                    ? `${value.data.block_type} ${value.data.block}`
                    : value.data.block;

                if (value.data.geo_lat && value.data.geo_lon) {
                    address.geo_lat = value.data.geo_lat;
                    address.geo_lon = value.data.geo_lon;
                }
                this.coords = [Number(value.data.geo_lat), Number(value.data.geo_lon)] || this[SELECTED_CITY_COORDS];
                this.address = address;
            }
        },

        onSubmit() {
            this.$v.$touch();
            if (this.$v.$invalid) return;
            const address = {
                ...this.address,
                porch: String(this.address.porch),
                floor: String(this.address.floor),
                flat: String(this.address.flat),
                post_index: String(this.address.post_index),
            };
            this.$emit('save', address);
            this.onClose();
        },

        onClose() {
            this.$emit('close');
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false, state: { address: null, onSave: null } });
        },

        init() {
            if (this.modalState.address) {
                if (this.modalState.address.geo_lat && this.modalState.address.geo_lon) {
                    this.zoom = 17;
                    this.coords = [Number(this.modalState.address.geo_lat), Number(this.modalState.address.geo_lon)];
                } else this.zoom = 11;

                this.address = { ...this.modalState.address };
            }
        },
    },

    beforeMount() {
        this.init();
    },

    mounted() {
        setTimeout(() => (this.showMap = true), 300);
    },
};
</script>
