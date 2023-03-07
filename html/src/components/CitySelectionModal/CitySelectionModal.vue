<template>
    <general-modal
        type="sm"
        class="city-selection-modal"
        :header="header"
        @close="onClose"
        :is-mobile="isTablet"
        :is-scroll-locked="isTablet"
    >
        <template v-slot:content>
            <div class="city-selection-modal__body">
                <h3 class="city-selection-modal__hl">
                    {{ header }}

                </h3>
                <v-input
                    class="city-selection-modal__input"
                    :class="{ 'city-selection-modal__input--empty': !focus && !searchString }"
                    v-model="searchString"
                    @focus="focus = true"
                    @blur="focus = false"
                    placeholder="Ваш город"
                >
                    <template v-slot:after>
                        <v-svg name="search-middle" width="24" height="24" />
                    </template>
                </v-input>

                <div class="city-selection-modal__wrapper">
                    <ul v-if="isTablet" class="city-selection-modal__list">
                        <li
                            class="city-selection-modal__list-item"
                            v-for="suggestion in suggestions"
                            :key="suggestion.value"
                        >
                            <button class="city-selection-modal__list-btn" @click="onSubmit(suggestion)">
                                <template v-if="suggestion.data.settlement_with_type">
                                    {{ suggestion.data.settlement_with_type }},
                                    {{ suggestion.data.region_with_type }}
                                </template>

                                <template v-if="suggestion.data.city">
                                    {{ suggestion.data.city
                                    }}<span v-if="suggestion.data.city_with_type !== suggestion.data.region_with_type"
                                        >, {{ suggestion.data.region_with_type }}</span
                                    >
                                </template>
                            </button>
                        </li>
                    </ul>
                    <v-scroll v-else class="city-selection-modal__scroll" scroll-lock>
                        <ul class="city-selection-modal__list">
                            <li
                                class="city-selection-modal__list-item"
                                v-for="suggestion in suggestions"
                                :key="suggestion.value"
                            >
                                <button class="city-selection-modal__list-btn" @click="onSubmit(suggestion)">
                                    <template v-if="suggestion.data.settlement_with_type">
                                        {{ suggestion.data.settlement_with_type }},
                                        {{ suggestion.data.region_with_type }}
                                    </template>

                                    <template v-if="suggestion.data.city">
                                        {{ suggestion.data.city
                                        }}<span
                                            v-if="suggestion.data.city_with_type !== suggestion.data.region_with_type"
                                            >, {{ suggestion.data.region_with_type }}</span
                                        >
                                    </template>
                                </button>
                            </li>
                        </ul>
                    </v-scroll>
                </div>
            </div>
            <div v-if="isAddressPending" class="city-selection-modal__loader-layout">
                <v-spinner show width="50" height="50" />
            </div>
        </template>
    </general-modal>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VInput from '@controls/VInput/VInput.vue';
import VScroll from '@controls/VScroll/VScroll.vue';
import VSpinner from '@controls/VSpinner/VSpinner.vue';

import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import _debounce from 'lodash/debounce';
import { mapState, mapActions, mapGetters } from 'vuex';
import { NAME as GEO_MODULE, SELECTED_CITY } from '@store/modules/Geolocation';
import { SET_SELECTED_CITY } from '@store/modules/Geolocation/actions';

import { NAME as AUTH_MODULE, HAS_SESSION } from '@store/modules/Auth';

import { NAME as CART_MODULE } from '@store/modules/Cart';
import { FETCH_CART_DATA } from '@store/modules/Cart/actions';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { $dadata, $logger } from '@services';
import { modalName } from '@enums';
import { suggestionTypes } from '@enums/suggestions';
import '@images/sprites/search-middle.svg';
import './CitySelectionModal.css';
import { NAME as CHECKOUT_MODULE, CHECKOUT_DATA } from '@store/modules/Checkout';
import { SET_ADDRESS, SET_ADDRESS_NO_LK, SET_CITY_FIAS } from '@store/modules/Checkout/actions';

import { ADDRESSES } from '@store/modules/Checkout/getters';

import { $store } from '@services';

const NAME = modalName.general.CITY_SELECTION;

export default {
    name: NAME,

    components: {
        VSpinner,
        VSvg,
        VInput,
        VScroll,

        GeneralModal,
    },

    data() {
        return {
            focus: false,
            searchString: null,
            suggestions: [],
            isAddressPending: false,
        };
    },

    computed: {
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapState(GEO_MODULE, [SELECTED_CITY]),
        ...mapState(MODAL_MODULE, {
            isOpen: (state) => state[MODALS][NAME] && state[MODALS][NAME].open,
        }),

        ...mapGetters(CHECKOUT_MODULE, [ADDRESSES]),

        header() {
            return 'Выберите город';
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    watch: {
        searchString(value) {
            this.debounce_onCityInputChange(value);
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(GEO_MODULE, [SET_SELECTED_CITY]),
        ...mapActions(CART_MODULE, [FETCH_CART_DATA]),
        ...mapActions(CHECKOUT_MODULE, [SET_ADDRESS, SET_ADDRESS_NO_LK, SET_CITY_FIAS]),

        async onCityInputChange(query = '') {
            try {
                const suggestQuery = query || suggestionTypes.CITY;
                // return the matching countries as an array
                const { suggestions } = await this.findAddress(suggestionTypes.CITY, suggestQuery, 20);
                this.suggestions = suggestions;
            } catch (error) {
                console.error(error);
                return null;
            }
        },

        findAddress(type, query, count, locations=null, guid=null) {
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

            if (guid) {
                return $dadata.post('/suggest/address', {
                    query: guid,
                    count,
                    locations,
                    from_bound,
                    to_bound
                });
            }

            return $dadata.post('/suggest/address', {
                query,
                count,
                locations,
                from_bound,
                to_bound
            });
        },

        async onSubmit(suggestion) {
            if (this.isAddressPending) return;
            try {
                const {settlement_fias_id, city_type} = suggestion.data;
                const guid = settlement_fias_id || city_type;

                const { suggestions } = await this.findAddress(suggestionTypes.CITY, suggestion.value, 1, null, guid);

                const selectedCitySuggestion = suggestions[0];
                if (selectedCitySuggestion) {
                    this.isAddressPending = true;
                    const {
                        city,
                        city_type,
                        city_fias_id,
                        settlement,
                        settlement_type,
                        settlement_fias_id,
                        geo_lat,
                        geo_lon,
                        region_fias_id,
                        region,
                        postal_code,
                    } = selectedCitySuggestion.data;

                    await this[SET_SELECTED_CITY]({
                        city: {
                            name: settlement || city,
                            type: settlement_type || city_type,
                            fias_id: settlement_fias_id || city_fias_id,
                            geo_lat: geo_lat,
                            geo_lon: geo_lon,
                            region_fias_id,
                        },
                        setCookie: true,
                    });

                    await this[SET_CITY_FIAS]({
                        city: settlement || city,
                        city_guid: settlement_fias_id || city_fias_id,
                        country_code: 'RU',
                        post_index: postal_code,
                        region: region,
                        region_guid: region_fias_id,
                    });

                    if ($store.state[CHECKOUT_MODULE][CHECKOUT_DATA]) {
                        const addressByCity = this[ADDRESSES].find((item) => {
                            return item.city_guid === settlement_fias_id || item.city_guid === city_fias_id;
                        });

                        if (addressByCity !== undefined) {
                            await this[SET_ADDRESS](addressByCity);
                        } else {
                            await this[SET_ADDRESS_NO_LK]({
                                city: settlement || city,
                                city_guid: settlement_fias_id || city_fias_id,
                                country_code: 'RU',
                                post_index: postal_code,
                                region: region,
                                region_guid: region_fias_id,
                            });
                        }
                    }

                    // перезагружаем, если находимся в сессии
                    if (this[HAS_SESSION]) await this[FETCH_CART_DATA]();
                }
            } catch (error) {
                $logger.log(error);
            }

            this.isAddressPending = false;
            this.onClose();
        },

        onClose() {
            if (!this.isAddressPending) {
                this.$emit('close');
                this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
            }
        },
    },

    beforeMount() {
        this.debounce_onCityInputChange = _debounce(this.onCityInputChange, 300);
        this.onCityInputChange();
    },
};
</script>
