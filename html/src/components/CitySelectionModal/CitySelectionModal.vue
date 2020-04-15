<template>
    <general-modal type="sm" class="city-selection-modal" :header="header" @close="onClose" :is-mobile="isTablet">
        <template v-slot:content>
            <div class="city-selection-modal__body">
                <h3 class="city-selection-modal__hl">{{ header }}</h3>
                <v-input class="city-selection-modal__input" @input="debounce_onCityInputChange">
                    <template v-slot:after>
                        <v-svg name="search-middle" width="24" height="24" />
                    </template>
                </v-input>
                <ul class="city-selection-modal__list">
                    <li
                        class="city-selection-modal__list-item"
                        v-for="suggestion in suggestions"
                        :key="suggestion.value"
                    >
                        <button class="city-selection-modal__list-btn" @click="onSubmit(suggestion)">
                            <template v-if="suggestion.data.settlement_with_type">
                                {{ suggestion.data.settlement_with_type }},
                            </template>

                            <template v-if="suggestion.data.city_with_type">
                                {{ suggestion.data.city_with_type }}
                            </template>
                        </button>
                    </li>
                </ul>
            </div>
        </template>
    </general-modal>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VInput from '@controls/VInput/VInput.vue';

import GeneralModal from '@components/GeneralModal/GeneralModal.vue';

import _debounce from 'lodash/debounce';
import { mapState, mapActions } from 'vuex';
import { NAME as GEO_MODULE, SELECTED_CITY } from '@store/modules/Geolocation';
import { SET_SELECTED_CITY } from '@store/modules/Geolocation/actions';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { $dadata, $logger } from '@services';
import { modalName } from '@enums';
import { suggestionTypes } from '@enums/suggestions';
import '@images/sprites/search-middle.svg';
import './CitySelectionModal.css';

const NAME = modalName.general.CITY_SELECTION;

export default {
    name: NAME,

    components: {
        VSvg,
        VInput,
        GeneralModal,
    },

    data() {
        return {
            suggestions: [],
        };
    },

    computed: {
        ...mapState(GEO_MODULE, [SELECTED_CITY]),
        ...mapState(MODAL_MODULE, {
            isOpen: (state) => state[MODALS][NAME] && state[MODALS][NAME].open,
        }),

        header() {
            return 'Выберите город';
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(GEO_MODULE, [SET_SELECTED_CITY]),

        async onCityInputChange(query = '') {
            try {
                const suggestQuery = query || (this[SELECTED_CITY] && this[SELECTED_CITY].name);
                // return the matching countries as an array
                const { suggestions } = await this.findAddress(suggestionTypes.CITY, suggestQuery, 20);
                this.suggestions = suggestions;
            } catch (error) {
                console.log(error);
                return null;
            }
        },

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

            return $dadata.post('/suggest/address', {
                query,
                count,
                locations,
                from_bound,
                to_bound,
            });
        },

        async onSubmit(suggestion) {
            try {
                const { suggestions } = await this.findAddress(suggestionTypes.CITY, suggestion.value, 1);
                const selectedCitySuggestion = suggestions[0];
                if (selectedCitySuggestion) {
                    const {
                        city,
                        city_fias_id,
                        settlement,
                        settlement_fias_id,
                        geo_lat,
                        geo_lon,
                    } = selectedCitySuggestion.data;

                    this[SET_SELECTED_CITY]({
                        city: {
                            name: settlement || city,
                            fias_id: settlement_fias_id || city_fias_id,
                            geo_lat: geo_lat,
                            geo_lon: geo_lon,
                        },
                        setCookie: true,
                    });
                }
            } catch (error) {
                $logger.log(error);
            }

            this.onClose();
        },

        onClose() {
            this.$emit('close');
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },

    beforeMount() {
        this.debounce_onCityInputChange = _debounce(this.onCityInputChange, 300);
        this.onCityInputChange();
    },
};
</script>
