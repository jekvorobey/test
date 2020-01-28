<template>
    <general-modal
        class="address-edit-modal"
        :type="isTabletLg ? 'fullscreen' : 'wide'"
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
                    >
                        Ваш населенный пункт
                        <template v-slot:item="{ item }">
                            {{ item.value }}
                        </template>
                    </v-suggestion>

                    <v-input
                        class="address-edit-modal__form-column address-edit-modal__form-column--30"
                        v-model="address.post_index"
                        type="number"
                        maxlength="6"
                        min="1"
                    >
                        Индекс
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
                    >
                        Улица, дом, корпус
                        <template v-slot:item="{ item }">
                            {{ formatAddress(item) }}
                        </template>
                    </v-suggestion>
                    <v-input
                        v-model="address.flat"
                        class="address-edit-modal__form-column address-edit-modal__form-column--30"
                        type="number"
                        min="1"
                    >
                        Квартира/офис
                    </v-input>
                </div>

                <div class="address-edit-modal__form-row">
                    <v-input
                        v-model="address.floor"
                        class="address-edit-modal__form-column address-edit-modal__form-column--30"
                        type="number"
                        min="1"
                    >
                        Этаж
                    </v-input>

                    <v-input
                        v-model="address.porch"
                        class="address-edit-modal__form-column address-edit-modal__form-column--30"
                        type="number"
                        min="1"
                    >
                        Подъезд
                    </v-input>

                    <v-input
                        v-model="address.intercom"
                        class="address-edit-modal__form-column address-edit-modal__form-column--30"
                        min="1"
                    >
                        Домофон
                    </v-input>
                </div>

                <v-input tag="textarea" rows="3" v-model="address.comment" maxHeight="100">
                    Комментарий курьеру
                </v-input>

                <div>
                    <v-button class="address-edit-modal__form-submit" @click.prevent="onSubmit">
                        Сохранить
                    </v-button>
                </div>
            </div>
        </template>
    </general-modal>
</template>
<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps';

import VSvg from '../../controls/VSvg/VSvg.vue';
import VButton from '../../controls/VButton/VButton.vue';
import VSuggestion from '../../controls/VSuggestion/VSuggestion.vue';
import VInput from '../../controls/VInput/VInput.vue';

import RadioSwitch from '../../RadioSwitch/RadioSwitch.vue';
import GeneralModal from '../../GeneralModal/GeneralModal.vue';

import { mapGetters, mapState, mapActions } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import { NAME as GEO_MODULE, SELECTED_CITY } from '../../../store/modules/Geolocation';
import { SELECTED_CITY_COORDS } from '../../../store/modules/Geolocation/getters';
import { SET_SELECTED_CITY } from '../../../store/modules/Geolocation/actions';

import validationMixin, { required } from '../../../plugins/validation';
import { suggestionTypes } from '../../../assets/scripts/constants';
import { $dadata } from '../../../services/ServiceLocator';
import '../../../assets/images/sprites/list.svg';
import '../../../assets/images/sprites/map.svg';
import pin from '../../../assets/images/icons/pin-filled.svg';
import './AddressEditModal.css';

export const NAME = 'address-edit-modal';

const settings = {
    apiKey: '46c69919-a571-416e-8198-189ed26c6a79',
    lang: 'ru_RU',
    coordorder: 'latlong',
    version: '2.1',
};

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
            post_index: {
                required,
            },

            flat: {
                required,
            },

            floor: {
                required,
            },

            porch: {
                required,
            },
        },
    },

    data() {
        return {
            zoom: 15,
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
            },

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

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        computedCoords() {
            return this.coords || this[SELECTED_CITY_COORDS];
        },

        selectedFormatAddress() {
            let address = '';
            if (this.address.area) address += this.address.area + ' ';
            if (this.address.street) address += this.address.street + ' ';
            if (this.address.house) address += this.address.house + ' ';
            if (this.address.block) address += this.address.block;
            return address;
        },

        mapSettings() {
            return settings;
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
                this.onApplyAddress(suggestions[0]);
            } catch (error) {
                console.log(error);
            }
        },

        async onAddressInputChange(query = '') {
            try {
                let filter = [];
                // return the matching countries as an array
                if (this.selectedAddress && this.selectedAddress.data.city_fias_id)
                    filter.push({
                        city_fias_id: this.selectedAddress.data.city_fias_id,
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
                address.value = value.value;
                address.country_code = value.data.country_iso_code;
                if (value.data.postal_code) address.post_index = value.data.postal_code;
                address.region = value.data.region_with_type || value.data.region;
                address.region_guid = value.data.region_fias_id;
                address.area = value.data.area_with_type || value.data.area;
                address.area_guid = value.data.area_fias_id;
                address.city = value.data.city_with_type || value.data.city;
                address.city_guid = value.data.city_fias_id;
                address.street = value.data.street_with_type || value.data.street;
                address.house = value.data.house_type
                    ? `${value.data.house_type} ${value.data.house}`
                    : value.data.house;
                address.block = value.data.block_type
                    ? `${value.data.block_type} ${value.data.block}`
                    : value.data.block;
                if (value.data.geo_lat && value.data.geo_lon)
                    this.coords =
                        [Number(value.data.geo_lat), Number(value.data.geo_lon)] || this[SELECTED_CITY_COORDS];
                this.address = address;
            }
        },

        onSubmit() {
            this.$v.$touch();
            if (this.$v.$invalid) return;
            const address = { ...this.address };
            if (this.modalState.onSave) this.modalState.onSave(address);
            this.onClose();
        },

        onClose() {
            this.CHANGE_MODAL_STATE({ name: NAME, open: false, state: { address: null, onSave: null } });
        },

        async init() {
            if (this.modalState.address) {
                this.address = { ...this.modalState.address };
                const { suggestions } = await this.findAddress(suggestionTypes.HOUSE, this.address.value, 1);
                const suggestion = suggestions[0];
                if (suggestion) this.coords = [Number(suggestion.data.geo_lat), Number(suggestion.data.geo_lon)];
            } else this.zoom = 15;
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
