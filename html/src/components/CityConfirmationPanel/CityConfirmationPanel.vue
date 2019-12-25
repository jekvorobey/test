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
import VLink from '../controls/VLink/VLink.vue';
import VButton from '../controls/VButton/VButton.vue';

import GeneralPopupPanel from '../GeneralPopupPanel/GeneralPopupPanel.vue';

import { mapActions, mapState } from 'vuex';
import { IS_CITY_CONFIRMATION_OPEN } from '../../store';
import { SET_CITY_CONFIRMATION_OPEN } from '../../store/actions';

import '../../assets/images/sprites/cross.svg';
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

        onSelectCity() {
            this.onClose();
        },

        onClose() {
            this[SET_CITY_CONFIRMATION_OPEN](false);
        },
    },
};
</script>
