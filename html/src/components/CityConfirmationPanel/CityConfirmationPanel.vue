<template>
    <general-popup-panel header="Ваш город Москва?" :open="isCityConfirmationOpen" @close="onClose" @hide="onClose">
        <slot />
        <template v-slot:body>
            <v-button class="city-confirmation-panel__controls-btn" @click="onClose">Да, Все верно</v-button>
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
import { NAME as CITY_SELECTION_MODAL } from '@components/CitySelectionModal/CitySelectionModal.vue';

import { mapActions, mapState } from 'vuex';
import { IS_CITY_CONFIRMATION_OPEN } from '@store';
import { SET_CITY_CONFIRMATION_OPEN } from '@store/actions';

import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

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
    },

    methods: {
        ...mapActions([SET_CITY_CONFIRMATION_OPEN]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        onSelectCity() {
            this.onClose();
            this[CHANGE_MODAL_STATE]({ name: CITY_SELECTION_MODAL, open: true });
        },

        onClose() {
            this[SET_CITY_CONFIRMATION_OPEN](false);
        },
    },
};
</script>
