<template>
    <footer class="v-footer">
        <div class="container v-footer__container v-footer__container--desktop">
            <div class="v-footer__row">
                <div class="v-footer__col v-footer__col--rights">
                    <v-link class="v-footer__logo" to="/" same-disabled>
                        <v-svg name="logo-default" width="128" height="48" />
                    </v-link>
                </div>
                <div class="v-footer__col" :key="col.title" v-for="col in links">
                    <self-router-link class="v-footer__col-title" v-if="col.url" :to="col.url" same-disabled>{{
                        col.title
                    }}</self-router-link>
                    <a v-else class="v-footer__col-title">{{ col.title }}</a>

                    <ul class="v-footer__links">
                        <li class="v-footer__links-item" :key="link.name" v-for="link in col.items" :title="link.name">
                            <self-router-link class="v-footer__link" v-if="link.url" :to="link.url" same-disabled>
                                {{ link.name }}
                            </self-router-link>
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
                            <a
                                class="v-footer__link"
                                :href="link.href"
                                rel="nofollow noreferrer noopener"
                                target="_blank"
                            >
                                <v-svg :name="link.icon" width="24" height="24" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <hr />
            <div class="v-footer__row v-footer__bottom-links">
                <p class="v-footer__rights" v-html="$t('footer.rights')" />
                <self-router-link
                    class="v-footer__link"
                    :to="{ name: 'InfoPageAgreement', params: { code: agreementTypes.PERSONAL_POLICY } }"
                    target="_blank"
                    same-disabled
                >
                    {{ $t('footer.terms_of_use') }}
                </self-router-link>
                <self-router-link
                    class="v-footer__link"
                    :to="{ name: 'InfoPageAgreement', params: { code: agreementTypes.PUBLIC_OFFER } }"
                    target="_blank"
                    same-disabled
                >
                    {{ $t('footer.offer') }}
                </self-router-link>
            </div>
        </div>

        <v-accordion
            class="v-footer__accordion v-footer__col"
            key-field="id"
            :items="links"
            :item-expanded="(item) => !!item.isExpanded"
            :item-toggled="(item) => (item.isExpanded = !item.isExpanded)"
        >
            <template v-slot:content="{ item }">
                <ul class="v-footer__links">
                    <li class="v-footer__links-item" :key="link.name" v-for="link in item.items" :title="link.name">
                        <self-router-link class="v-footer__link" v-if="link.url" :to="link.url" same-disabled>
                            {{ link.name }}
                        </self-router-link>
                    </li>
                </ul>
            </template>

            <template v-slot:icon="{ isExpanded }">
                <v-svg :class="{ 'icon--rotate-deg180': isExpanded }" name="arrow-down" width="24" height="24" />
            </template>
        </v-accordion>

        <div class="container v-footer__container v-footer__container--mobile v-footer__col">
            <p class="v-footer__col-title v-footer__col-title--socials">{{ socials.name }}</p>
            <ul class="v-footer__socials">
                <li class="v-footer__socials-item" :key="link.id" v-for="link in socials.items" :title="link.name">
                    <a class="v-footer__link" :href="link.href" target="_blank" rel="nofollow noreferrer noopener">
                        <v-svg :name="link.icon" width="24" height="24" />
                    </a>
                </li>
            </ul>
        </div>

        <div class="v-footer__container v-footer__container--mobile v-footer__col v-footer__mobile-links">
            <self-router-link
                class="v-footer__link"
                :to="{ name: 'InfoPageAgreement', params: { code: agreementTypes.PERSONAL_POLICY } }"
                target="_blank"
                same-disabled
            >
                {{ $t('footer.terms_of_use') }}
            </self-router-link>
            <self-router-link
                class="v-footer__link"
                :to="{ name: 'InfoPageAgreement', params: { code: agreementTypes.PUBLIC_OFFER } }"
                target="_blank"
                same-disabled
            >
                {{ $t('footer.offer') }}
            </self-router-link>
            <p class="v-footer__rights" v-html="$t('footer.rights')" />
        </div>
    </footer>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VAccordion from '@controls/VAccordion/VAccordion.vue';
import SelfRouterLink from '@controls/VLink/SelfRouterLink.vue';

import '@images/sprites/socials/vkontakte-bw.svg';
import '@images/sprites/socials/telegram-bw.svg';
import '@images/sprites/socials/ok-bw.svg';
import '@images/sprites/socials/dzen-bw.svg';

import '@images/sprites/logo.svg';
import '@images/sprites/logo-default.svg';

import './VFooter.css';
import { mapGetters } from 'vuex';
import { FOOTER_MENU } from '@store/getters';

import { agreementTypes } from '@enums';

export default {
    name: 'v-footer',

    components: {
        VSvg,
        VLink,
        VAccordion,
        SelfRouterLink,
    },

    computed: {
        ...mapGetters([FOOTER_MENU]),

        socials() {
            return {
                name: this.$t('socials.socials'),
                items: [
                    {
                        id: 1,
                        icon: 'vkontakte-bw',
                        name: this.$t('socials.vkontakte'),
                        href: 'https://vk.com/bessovestnotalantlivy',
                    },
                    {
                        id: 2,
                        icon: 'telegram-bw',
                        name: this.$t('socials.telegram'),
                        href: 'https://t.me/BessovestnoTalantlivy',
                    },
                    {
                        id: 3,
                        icon: 'ok-bw',
                        name: this.$t('socials.ok'),
                        href: 'https://ok.ru/group/62240588693625',
                    },
                    {
                        id: 4,
                        icon: 'dzen-bw',
                        name: this.$t('socials.dzen'),
                        href: 'https://zen.yandex.ru/bessovestnotalantlivy',
                    },
                ],
            };
        },

        links() {
            const menuItems = (this[FOOTER_MENU] && this[FOOTER_MENU].items) || [];
            return menuItems.map((mi) => {
                return {
                    title: mi.name,
                    url: mi.url,
                    isExpanded: false,
                    items: mi.children.map((i) => {
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

    created() {
        this.agreementTypes = agreementTypes;
    },
};
</script>
