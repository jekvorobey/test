<template>
    <footer class="v-footer">
        <div class="container v-footer__container v-footer__container--desktop">
            <div class="v-footer__row">
                <div class="v-footer__col v-footer__col--rights">
                    <v-link class="v-footer__logo" to="/">
                        <v-svg name="logo-default" width="128" height="48" />
                    </v-link>
                </div>
                <div class="v-footer__col" :key="col.title" v-for="col in links">
                    <router-link v-if="col.url" class="v-footer__col-title" :to="col.url">{{ col.title }}</router-link>
                    <a v-else class="v-footer__col-title">{{ col.title }}</a>

                    <ul class="v-footer__links">
                        <li class="v-footer__links-item" :key="link.name" v-for="link in col.items" :title="link.name">
                            <router-link v-if="link.url" class="v-footer__link" :to="link.url">
                                {{ link.name }}
                            </router-link>
                            <a v-else class="v-footer__link">{{ col.title }}</a>
                        </li>
                    </ul>
                </div>
                <div class="v-footer__col">
                    <p class="v-footer__col-title v-footer__col-title--socials">{{ socials.name }}</p>
                    <ul class="v-footer__socials">
                        <li
                            class="v-footer__socials-item"
                            :key="link.id"
                            v-for="link in socials.items"
                            :title="link.name"
                        >
                            <a class="v-footer__link" :href="link.href" rel="nofollow">
                                <v-svg :name="link.icon" width="24" height="24" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <hr />
            <div class="v-footer__row v-footer__bottom-links">
                <p class="v-footer__rights" v-html="$t('footer.rights')" />
                <router-link class="v-footer__link" :to="{name: 'Agreements', params: {type: 'public-offer'}}">{{ $t('footer.terms_of_use') }}</router-link>
                <router-link class="v-footer__link" :to="{name: 'Agreements', params: {type: 'personal-policy'}}">{{ $t('footer.offer') }}</router-link>
            </div>
        </div>

        <v-accordion
            class="v-footer__accordion v-footer__col"
            key-field="id"
            :items="links"
            :item-expanded="item => !!item.isExpanded"
            :item-toggled="item => (item.isExpanded = !item.isExpanded)"
        >
            <template v-slot:content="{ item }">
                <ul class="v-footer__links">
                    <li class="v-footer__links-item" :key="link.name" v-for="link in item.items" :title="link.name">
                        <a class="v-footer__link" :href="link.url">{{ link.name }}</a>
                    </li>
                </ul>
            </template>

            <template v-slot:icon="{ isExpanded }">
                <v-svg :class="{ 'icon--rotate-deg180': isExpanded }" name="arrow-down" width="24" height="24" />
            </template>
        </v-accordion>

        <div class="container v-footer__container v-footer__container--mobile v-footer__col">
            <p class="v-footer__col-title">{{ socials.name }}</p>
            <ul class="v-footer__socials">
                <li class="v-footer__socials-item" :key="link.id" v-for="link in socials.items" :title="link.name">
                    <a class="v-footer__link" :href="link.href">
                        <v-svg :name="link.icon" width="24" height="24" />
                    </a>
                </li>
            </ul>
        </div>

        <div class="v-footer__container v-footer__container--mobile v-footer__col v-footer__mobile-links">
            <v-link class="v-footer__link" :to="{name: 'Agreements', params: {type: 'public-offer'}}" target="_blank">{{ $t('footer.terms_of_use') }}</v-link>
            <v-link class="v-footer__link" :to="{name: 'Agreements', params: {type: 'personal-policy'}}" target="_blank">{{ $t('footer.offer') }}</v-link>
            <p class="v-footer__rights" v-html="$t('footer.rights')" />
        </div>
    </footer>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VAccordion from '@controls/VAccordion/VAccordion.vue';

import '@images/sprites/socials/facebook-bw.svg';
import '@images/sprites/socials/instagram-bw.svg';
import '@images/sprites/socials/vkontakte-bw.svg';
import '@images/sprites/socials/youtube-bw.svg';

import '@images/sprites/logo.svg';
import '@images/sprites/logo-default.svg';

import './VFooter.css';
import { mapGetters } from 'vuex';
import { FOOTER_MENU } from '@store/getters';

export default {
    name: 'v-footer',

    components: {
        VSvg,
        VLink,
        VAccordion,
    },

    computed: {
        ...mapGetters([FOOTER_MENU]),

        socials() {
            return {
                name: this.$t('socials.socials'),
                items: [
                    {
                        id: 1,
                        icon: 'facebook-bw',
                        name: this.$t('socials.facebook'),
                        href: 'https://www.facebook.com/bessovestnotalantlivy',
                    },
                    {
                        id: 2,
                        icon: 'instagram-bw',
                        name: this.$t('socials.instagram'),
                        href: 'https://www.instagram.com/bessovestnotalantlivy/',
                    },
                    {
                        id: 3,
                        icon: 'vkontakte-bw',
                        name: this.$t('socials.vkontakte'),
                        href: 'https://vk.com/bessovestnotalantlivy',
                    },
                    // #60156
                    // {
                    //     id: 4,
                    //     icon: 'youtube-bw',
                    //     name: this.$t('socials.youtube'),
                    //     href: '/',
                    // },
                ],
            };
        },

        links() {
            const menuItems = (this[FOOTER_MENU] && this[FOOTER_MENU].items) || [];
            return menuItems.map(mi => {
                return {
                    title: mi.name,
                    url: mi.url,
                    isExpanded: false,
                    items: mi.children.map(i => {
                        return {
                            id: i.id,
                            name: i.name,
                            url: i.url,
                        };
                    }),
                };
            });
        },
    },
};
</script>
