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
                        v-for="city in suggestions"
                        :key="city.city_fias_id || city.settlement_fias_id"
                    >
                        <button class="city-selection-modal__list-btn" @click="onSubmit(city)">{{ city.value }}</button>
                    </li>
                </ul>
            </div>
        </template>
    </general-modal>
</template>

<script>
import VSvg from '../controls/VSvg/VSvg.vue';
import VInput from '../controls/VInput/VInput.vue';
import GeneralModal from '../GeneralModal/GeneralModal.vue';

import { mapState, mapActions } from 'vuex';

import { NAME as GEOLOCATION_MODULE, SELECTED_CITY } from '../../store/modules/Geolocation';
import { SET_SELECTED_CITY } from '../../store/modules/Geolocation/actions';

import { NAME as MODAL_MODULE, MODALS } from '../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../store/modules/Modal/actions';

import _debounce from 'lodash/debounce';
import { $dadata } from '../../services/ServiceLocator';
import { suggestionTypes } from '../../assets/scripts/constants';
import '../../assets/images/sprites/search-middle.svg';
import './CitySelectionModal.css';

export const NAME = 'city-selection-modal';

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
        ...mapState(GEOLOCATION_MODULE, [SELECTED_CITY]),
        ...mapState(MODAL_MODULE, {
            isOpen: state => state[MODALS][NAME] && state[MODALS][NAME].open,
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
        ...mapActions(GEOLOCATION_MODULE, [SET_SELECTED_CITY]),

        async onCityInputChange(query = '') {
            try {
                const suggestQuery = query || (this[SELECTED_CITY] && this[SELECTED_CITY].value);
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

        onSubmit(city) {
            this[SET_SELECTED_CITY](city);
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
