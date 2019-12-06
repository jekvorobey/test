<template>
    <general-modal class="checkout-address-modal" @close="onClose" :is-mobile="isTablet">
        <template v-slot:content>
            <div class="checkout-address-modal__map">
                <yandex-map
                    v-if="showMap && !isTablet"
                    :zoom="zoom"
                    :coords="coords"
                    :controls="[]"
                    :options="{ yandexMapDisablePoiInteractivity: true }"
                    showAllMarkers
                    @click="onMapClick"
                >
                    <ymap-marker v-if="selectedAddress" marker-id="marker-id" :coords="coords" :icon="markerIcon" />
                </yandex-map>
            </div>
            <div class="checkout-address-modal__form">
                <div class="checkout-address-modal__form-header">
                    <h3 class="checkout-address-modal__form-header-hl">Адрес доставки</h3>
                    <span class="text-grey text-sm">Укажите на карте или введите вручную</span>
                </div>
                <div class="checkout-address-modal__form-row">
                    <v-suggestion
                        class="checkout-address-modal__form-column"
                        :selectedItem="selectedCity"
                        :options="options"
                        :onInputChange="onCityInputChange"
                        :selectedValuePath="item => item.value"
                        @selected="onCitySelected($event)"
                    >
                        Ваш населенный пункт
                        <template v-slot:item="{ item }">
                            {{ item.value }}
                        </template>
                    </v-suggestion>

                    <v-input
                        class="checkout-address-modal__form-column checkout-address-modal__form-column--30"
                        v-model="address.post_index"
                        type="number"
                        maxlength="6"
                        min="1"
                    >
                        Индекс
                    </v-input>
                </div>

                <div class="checkout-address-modal__form-row">
                    <v-suggestion
                        class="checkout-address-modal__form-column"
                        :selectedItem="selectedAddress"
                        :options="options"
                        :onInputChange="onAddressInputChange"
                        :selectedValuePath="selectedFormatAddress"
                        @selected="onAddressSelected($event)"
                    >
                        Улица, дом, корпус
                        <template v-slot:item="{ item }">
                            {{ formatAddress(item) }}
                        </template>
                    </v-suggestion>
                    <v-input
                        v-model="address.flat"
                        class="checkout-address-modal__form-column checkout-address-modal__form-column--30"
                        type="number"
                        min="1"
                    >
                        Квартира/офис
                    </v-input>
                </div>

                <div class="checkout-address-modal__form-row">
                    <v-input
                        v-model="address.floor"
                        class="checkout-address-modal__form-column checkout-address-modal__form-column--30"
                        type="number"
                        min="1"
                    >
                        Этаж
                    </v-input>

                    <v-input
                        v-model="address.porch"
                        class="checkout-address-modal__form-column checkout-address-modal__form-column--30"
                        type="number"
                        min="1"
                    >
                        Подъезд
                    </v-input>

                    <v-input
                        v-model="address.intercom"
                        class="checkout-address-modal__form-column checkout-address-modal__form-column--30"
                        min="1"
                    >
                        Домофон
                    </v-input>
                </div>

                <v-input tag="textarea" rows="3" v-model="address.comment" maxHeight="100">
                    Комментарий курьеру
                </v-input>

                <div>
                    <v-button class="checkout-address-modal__form-submit" @click.prevent="onSubmit">
                        Привезти сюда
                    </v-button>
                </div>
            </div>
        </template>
    </general-modal>
</template>
<script>
import '../../../plugins/ya-maps';

import VButton from '../../controls/VButton/VButton.vue';
import VSuggestion from '../../controls/VSuggestion/VSuggestion.vue';
import VInput from '../../controls/VInput/VInput.vue';
import GeneralModal from '../../GeneralModal/GeneralModal.vue';

import { mapGetters, mapState, mapActions } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import { NAME as GEO_MODULE, SELECTED_CITY } from '../../../store/modules/Geolocation';
import { SELECTED_CITY_COORDS } from '../../../store/modules/Geolocation/getters';
import { SET_SELECTED_CITY } from '../../../store/modules/Geolocation/actions';

import validationMixin, { required } from '../../../plugins/validation';
import DadataHttpService from '../../../services/HttpService/DadataHttpService';
import { suggestionTypes } from '../../../assets/scripts/constants';

import pin from '../../../assets/images/icons/pin-filled.svg';
import './CheckoutAddressModal.css';

const http = new DadataHttpService();

export const NAME = 'checkout-address-modal';

export default {
    name: NAME,
    mixins: [validationMixin],

    components: {
        VButton,
        VInput,
        VSuggestion,
        GeneralModal,
    },

    validations: {
        selectedAddress: {
            required,
        },
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

            selectedAddress: null,
            options: { debounce: 500 },

            showMap: false,
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
        ...mapState(GEO_MODULE, [SELECTED_CITY]),
        ...mapGetters(GEO_MODULE, [SELECTED_CITY_COORDS]),

        isTablet() {
            return this.$mq.tablet;
        },

        coords() {
            return this.selectedAddressCoords ? this.selectedAddressCoords : this.selectedCityCoords;
        },

        selectedAddressCoords() {
            return this.selectedAddress && this.selectedAddress.data.geo_lat && this.selectedAddress.data.geo_lon
                ? [Number(this.selectedAddress.data.geo_lat), Number(this.selectedAddress.data.geo_lon)]
                : null;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(GEO_MODULE, [SET_SELECTED_CITY]),

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
                case suggestionTypes.HOUSE:
                    break;
                default:
                    to_bound = { value: type };
            }

            return http.post('/suggestions/api/4_1/rs/suggest/address', {
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
                this[SET_SELECTED_CITY](suggestions[0]);
            } catch (error) {
                console.log(error);
            }
        },

        async onCityInputChange(query) {
            try {
                // return the matching countries as an array
                const { suggestions } = await this.findAddress(
                    suggestionTypes.CITY,
                    query || this.selectedCity.value,
                    20
                );
                return suggestions;
            } catch (error) {
                console.log(error);
                return null;
            }
        },

        async onAddressSelected(selected) {
            try {
                const { suggestions } = await this.findAddress(suggestionTypes.HOUSE, selected.unrestricted_value, 1);
                this.selectedAddress = suggestions[0];
            } catch (error) {
                console.log(error);
                this.selectedAddress = null;
            }
        },

        async onAddressInputChange(query = '') {
            try {
                // return the matching countries as an array
                const { suggestions } = await this.findAddress(suggestionTypes.HOUSE, query, 20, [
                    {
                        city_fias_id: this.selectedCity.data['city_fias_id'],
                    },
                ]);

                return suggestions;
            } catch (error) {
                console.log(error);
                return null;
            }
        },

        async onMapClick(e) {
            const coords = e.get('coords');

            const { suggestions } = await http.post('/suggestions/api/4_1/rs/geolocate/address', {
                lat: coords[0],
                lon: coords[1],
                radius_meters: 1000,
            });

            const selected = suggestions.find(s => s.data.house);
            this.selectedAddress = selected;
        },

        formatAddress(item) {
            return `${item.data.street_with_type ||
                item.data.city_district_with_type ||
                item.data.settlement_with_type ||
                ''} ${item.data.house_type} ${item.data.house} ${
                item.data.block ? `${item.data.block_type} ${item.data.block}` : ''
            }`;
        },

        selectedFormatAddress(item) {
            return `${item.data.street_with_type || item.data.settlement_with_type || ''} ${item.data.house_type} ${
                item.data.house
            } ${item.data.block ? `${item.data.block_type} ${item.data.block}` : ''}`;
        },

        onSubmit() {
            this.$v.$touch();
            if (this.$v.$invalid) return;
            this.$emit('addressSubmit', this.address);
            this.CHANGE_MODAL_STATE({ name: NAME, open: false, state: {} });
        },

        onClose() {
            this.CHANGE_MODAL_STATE({ name: NAME, open: false, state: {} });
        },

        async init() {
            this.showMap = true;
            if (this.modalState.address) {
                const { suggestions } = await this.findAddress(
                    suggestionTypes.HOUSE,
                    this.modalState.address.description,
                    1,
                    [
                        {
                            city_fias_id: this.selectedCity.data['city_fias_id'],
                        },
                    ]
                );
                this.selectedAddress = suggestions[0];
                if (this.selectedAddress) this.zoom = 17;
            } else this.zoom = 15;
        },
    },

    watch: {
        selectedCity(value) {
            this.selectedAddress = null;
            this.postalCode = null;
        },
    },

    beforeMount() {
        //this.init();
    },

    mounted() {
        setTimeout(() => (this.showMap = true), 300);
    },
};
</script>
