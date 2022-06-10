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
                <div class="text-grey">Ежедневно с 9:00 до 21:00</div>
                <div class="text-bold help-panel__phone">
                    <a href="tel:+74951396428" class="help-panel__phone-link">+7 495 139-64-28</a>
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
                    v-for="link in links"
                    class="help-panel__socials-icon"
                    :key="link.href"
                    :href="link.href"
                    :title="link.title"
                    @mouseover="link.hover = true"
                    @mouseleave="link.hover = false"
                    target="_blank"
                    rel="nofollow noreferrer noopener"
                >
                    <v-svg :name="link.hover ? link.iconHover : link.icon" width="40" height="40" />
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
import '@images/sprites/socials/viber.svg';
import '@images/sprites/socials/viber-hover.svg';
import '@images/sprites/socials/vkontakte.svg';
import '@images/sprites/socials/vkontakte-hover.svg';
import '@images/sprites/socials/ok-rounded.svg';
import '@images/sprites/socials/ok-rounded-hover.svg';

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
            isOpen: false,

            links: [
                {
                    href: 'tg://resolve?domain=Bessovestnyj_bot',
                    title: 'Связаться с нами в Telegram',
                    hover: false,
                    icon: 'telegram',
                    iconHover: 'telegram-hover',
                },
                {
                    href: 'viber://pa/?chatURI=ibtru',
                    title: 'Связаться с нами в Viber',
                    hover: false,
                    icon: 'viber',
                    iconHover: 'viber-hover',
                },
                {
                    href: 'https://vk.me/bessovestnotalantlivy',
                    title: 'Связаться с нами в VK',
                    hover: false,
                    icon: 'vkontakte',
                    iconHover: 'vkontakte-hover',
                },
                {
                    href: 'https://ok.ru/group/62240588693625/messages',
                    title: 'Связаться с нами в OK',
                    hover: false,
                    icon: 'ok-rounded',
                    iconHover: 'ok-rounded-hover',
                },
            ],
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
