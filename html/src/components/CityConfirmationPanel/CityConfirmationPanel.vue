<template>
    <general-popup-panel
        v-if="selectedCity"
        :header="header"
        :open="isCityConfirmationOpen"
        @close="onClose"
        @hide="onClose"
    >
        <slot />
        <template v-slot:body>
            <v-button class="city-confirmation-panel__controls-btn" @click="onAccept">Да, все верно</v-button>
            <v-link class="city-confirmation-panel__controls-btn" tag="button" @click="onSelectCity">
                Нет, выбрать другой
            </v-link>
        </template>
    </general-popup-panel>
</template>

<script>
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';

import GeneralPopupPanel from '@components/GeneralPopupPanel/GeneralPopupPanel.vue';

import { mapActions, mapState } from 'vuex';
import { IS_CITY_CONFIRMATION_OPEN } from '@store';
import { SET_CITY_CONFIRMATION_OPEN } from '@store/actions';
import { NAME as GEO_MODULE, SELECTED_CITY } from '@store/modules/Geolocation';
import { SET_SELECTED_CITY } from '@store/modules/Geolocation/actions';
import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { modalName } from '@enums';
import '@images/sprites/cross.svg';
import './CityConfirmationPanel.css';

export default {
    name: 'city-confirmation-panel',

    components: {
        VLink,
        VButton,

        GeneralPopupPanel,
    },

    computed: {
        ...mapState([IS_CITY_CONFIRMATION_OPEN]),
        ...mapState(GEO_MODULE, [SELECTED_CITY]),

        city() {
            return this[SELECTED_CITY] && this[SELECTED_CITY].name;
        },

        header() {
            return `Ваш город ${this.city}?`;
        },
    },

    methods: {
        ...mapActions([SET_CITY_CONFIRMATION_OPEN]),
        ...mapActions(GEO_MODULE, [SET_SELECTED_CITY]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onSelectCity() {
            this.onClose();
            this[CHANGE_MODAL_STATE]({ name: modalName.general.CITY_SELECTION, open: true });
        },

        onAccept() {
            this[SET_SELECTED_CITY]({
                city: this[SELECTED_CITY],
                setCookie: true,
            });
            this.onClose();
        },

        onClose() {
            this[SET_CITY_CONFIRMATION_OPEN](false);
        },
    },
};
</script>
