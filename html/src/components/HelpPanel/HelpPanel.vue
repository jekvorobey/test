<template>
    <general-popup-panel
        header="Ваш город Москва?"
        popover-class="tooltip--white help-panel"
        :open="isHelpOpen"
        @hide="onClose"
        show-bottom
    >
        <slot />
        <template v-slot:header>
            <div class="help-panel__top">
                <div class="text-grey">Каждый день с 9:00 до 21:00</div>
                <div class="text-bold help-panel__phone">8 800 730-12-34</div>
            </div>
            <button class="general-popup-panel__header-close" @click="onClose">
                <v-svg name="cross" width="24" height="24" />
            </button>
        </template>
        <template v-slot:body>
            <div class="text-grey help-panel__info">Всегда отвечаем на ваши сообщения</div>
            <div class="help-panel__socials">
                <v-svg name="telegram" width="40" height="40" />
                <v-svg name="whatsup" width="40" height="40" />
                <v-svg name="viber" width="40" height="40" />
            </div>
        </template>
        <template v-slot:bottom>
            <div class="help-panel__links">
                <v-link class="help-panel__link" v-for="item in helpMenu.items" :key="item.name" :to="item.url">
                    {{ item.name }}
                </v-link>
            </div>
        </template>
    </general-popup-panel>
</template>

<script>
import VSvg from '../controls/VSvg/VSvg.vue';
import VLink from '../controls/VLink/VLink.vue';

import GeneralPopupPanel from '../GeneralPopupPanel/GeneralPopupPanel.vue';

import { mapActions, mapState, mapGetters } from 'vuex';
import { IS_HELP_OPEN } from '../../store';
import { SET_HELP_OPEN } from '../../store/actions';
import { HELP_MENU } from '../../store/getters';

import '../../assets/images/sprites/socials/telegram.svg';
import '../../assets/images/sprites/socials/whatsup.svg';
import '../../assets/images/sprites/socials/viber.svg';
import '../../assets/images/sprites/cross.svg';
import './HelpPanel.css';

export default {
    name: 'help-panel',

    components: {
        VSvg,
        VLink,

        GeneralPopupPanel,
    },

    computed: {
        ...mapState([IS_HELP_OPEN]),
        ...mapGetters([HELP_MENU]),
    },

    methods: {
        ...mapActions([SET_HELP_OPEN]),

        onClose() {
            this[SET_HELP_OPEN](false);
        },
    },
};
</script>
