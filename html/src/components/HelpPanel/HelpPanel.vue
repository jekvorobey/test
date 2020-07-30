<template>
    <general-popup-panel
        popover-class="tooltip--white help-panel"
        placement="bottom-end"
        show-bottom
        :open="isOpen"
        @hide="onHide"
    >
        <div class="help-panel__slot" @click="onClick">
            <slot />
        </div>
        <template v-slot:header>
            <div class="help-panel__top">
                <div class="text-grey">Каждый день с 9:00 до 21:00</div>
                <div class="text-bold help-panel__phone">
                    <a href="tel:88007079070" class="help-panel__phone-link">8 800 707-90-70</a>
                </div>
            </div>
            <div class="help-panel__controls" @click="onHide">
                <v-svg class="help-panel__close-btn" name="cross" width="25" height="25" />
            </div>
        </template>
        <template v-slot:body>
            <div class="text-grey help-panel__info">Всегда отвечаем на ваши сообщения</div>
            <div class="help-panel__socials">
                <v-link
                    class="help-panel__socials-icon"
                    :href="links.telegram.href"
                    :title="links.telegram.title"
                    @mouseover="telegram_hover = true"
                    @mouseleave="telegram_hover = false"
                    target="_blank"
                    rel="nofollow"
                >
                    <v-svg v-if="!telegram_hover" name="telegram" width="40" height="40" />
                    <v-svg v-else name="telegram-hover" width="40" height="40" />
                </v-link>

                <v-link
                    class="help-panel__socials-icon"
                    :href="links.whatsapp.href"
                    :title="links.whatsapp.title"
                    @mouseover="whatsup_hover = true"
                    @mouseleave="whatsup_hover = false"
                    target="_blank"
                    rel="nofollow"
                >
                    <v-svg v-if="!whatsup_hover" name="whatsup-bw" width="40" height="40" />
                    <v-svg v-else name="whatsup-hover" width="40" height="40" />
                </v-link>

                <v-link
                    class="help-panel__socials-icon"
                    :href="links.viber.href"
                    :title="links.viber.title"
                    @mouseover="viber_hover = true"
                    @mouseleave="viber_hover = false"
                    target="_blank"
                    rel="nofollow"
                >
                    <v-svg v-if="!viber_hover" name="viber" width="40" height="40" />
                    <v-svg v-else name="viber-hover" width="40" height="40" />
                </v-link>
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
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';

import GeneralPopupPanel from '@components/GeneralPopupPanel/GeneralPopupPanel.vue';

import { mapActions, mapState, mapGetters } from 'vuex';
import { HELP_MENU } from '@store/getters';

import '@images/sprites/socials/telegram.svg';
import '@images/sprites/socials/telegram-hover.svg';
import '@images/sprites/socials/whatsup-bw.svg';
import '@images/sprites/socials/whatsup-hover.svg';
import '@images/sprites/socials/viber.svg';
import '@images/sprites/socials/viber-hover.svg';
import './HelpPanel.css';

export default {
    name: 'help-panel',

    components: {
        VSvg,
        VLink,

        GeneralPopupPanel,
    },

    data() {
        return {
            telegram_hover: false,
            whatsup_hover: false,
            viber_hover: false,
            isOpen: false,
            links: {
                telegram: {
                    href: 'tg://resolve?domain=Bessovestnyj_bot',
                    title: 'Связаться с нами в Telegram',
                },
                whatsapp: {
                    href: 'https://api.whatsapp.com/send?phone=79162001869',
                    title: 'Связаться с нами в WhatsApp',
                },
                viber: {
                    href: 'viber://pa/?chatURI=ibtru',
                    title: 'Связаться с нами в Viber',
                },
            },
        };
    },

    computed: {
        ...mapGetters([HELP_MENU]),
    },

    methods: {
        onClick() {
            this.isOpen = !this.isOpen;
        },

        onHide() {
            this.isOpen = false;
        },
    },
};
</script>
