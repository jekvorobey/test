<template>
    <footer class="v-footer">
        <div class="container v-footer__container v-footer__container--desktop">
            <div class="v-footer__row">
                <div class="v-footer__col v-footer__col--rights">
                    <a class="v-footer__logo" href="/">
                        <v-svg name="logo-text" width="128" height="48" />
                    </a>
                    <p class="v-footer__rights" v-html="$t('footer.rights')" />
                </div>
                <div class="v-footer__col" :key="index" v-for="(col, index) in links">
                    <p class="v-footer__col-title">{{ col.title }}</p>
                    <ul class="v-footer__links">
                        <li class="v-footer__links-item" :key="link.id" v-for="link in col.items" :title="link.key">
                            <a class="v-footer__link" :href="link.href">{{ link.label }}</a>
                        </li>
                    </ul>
                </div>
                <div class="v-footer__col">
                    <p class="v-footer__col-title">{{ socials.name }}</p>
                    <ul class="v-footer__socials">
                        <li
                            class="v-footer__socials-item"
                            :key="link.id"
                            v-for="link in socials.items"
                            :title="link.name"
                        >
                            <a class="v-footer__link" :href="link.href">
                                <v-svg :name="link.icon" width="24" height="24" />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <hr />
            <div class="v-footer__row">
                <v-link class="v-footer__link">{{ $t('footer.terms_of_use') }}</v-link>
                <v-link class="v-footer__link">{{ $t('footer.offer') }}</v-link>
                <v-link
                    class="v-footer__link v-footer__made-by v-footer__col"
                    href="https://greensight.ru/"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {{ $t('footer.made_by') }}
                </v-link>
            </div>
        </div>

        <div class="container v-footer__container v-footer__container--mobile">
            <v-accordion
                class="v-footer__accordion v-footer__col"
                key-value="id"
                :items="links"
                :item-expanded="item => !!item.isExpanded"
                :item-toggled="item => (item.isExpanded = !item.isExpanded)"
            >
                <template v-slot:content="{ item }">
                    <ul class="v-footer__links">
                        <li class="v-footer__links-item" :key="link.id" v-for="link in item.items" :title="link.key">
                            <a class="v-footer__link" :href="link.href">{{ link.label }}</a>
                        </li>
                    </ul>
                </template>
            </v-accordion>
            <div class="v-footer__col">
                <p class="v-footer__col-title">{{ socials.name }}</p>
                <ul class="v-footer__socials">
                    <li class="v-footer__socials-item" :key="link.id" v-for="link in socials.items" :title="link.name">
                        <a class="v-footer__link" :href="link.href">
                            <v-svg :name="link.icon" width="24" height="24" />
                        </a>
                    </li>
                </ul>
                <p class="v-footer__rights" v-html="$t('footer.rights')" />
            </div>
            <hr />
            <v-link class="v-footer__link v-footer__col">{{ $t('footer.terms_of_use') }}</v-link>
            <v-link class="v-footer__link v-footer__col">{{ $t('footer.offer') }}</v-link>
            <v-link
                class="v-footer__link v-footer__made-by v-footer__col"
                href="https://greensight.ru/"
                target="_blank"
                rel="noopener noreferrer"
            >
                {{ $t('footer.made_by') }}
            </v-link>
        </div>
    </footer>
</template>

<script>
import VSvg from '../controls/VSvg/VSvg.vue';
import VLink from '../controls/VLink/VLink.vue';
import VAccordion from '../controls/VAccordion/VAccordion.vue';

import '../../assets/images/sprites/socials/facebook-bw.svg';
import '../../assets/images/sprites/socials/instagram-bw.svg';
import '../../assets/images/sprites/socials/vkontakte-bw.svg';
import '../../assets/images/sprites/socials/youtube-bw.svg';

import '../../assets/images/sprites/logo.svg';
import '../../assets/images/sprites/logo-text.svg';

import './VFooter.css';

export default {
    name: 'v-footer',
    components: {
        VSvg,
        VLink,
        VAccordion,
    },
    data() {
        return {};
    },
    computed: {
        socials() {
            return {
                name: this.$t('socials.socials'),
                items: [
                    {
                        id: 1,
                        icon: 'facebook-bw',
                        name: this.$t('socials.facebook'),
                        href: '/',
                    },
                    {
                        id: 2,
                        icon: 'instagram-bw',
                        name: this.$t('socials.instagram'),
                        href: '/',
                    },
                    {
                        id: 3,
                        icon: 'vkontakte-bw',
                        name: this.$t('socials.vkontakte'),
                        href: '/',
                    },
                    {
                        id: 4,
                        icon: 'youtube-bw',
                        name: this.$t('socials.youtube'),
                        href: '/',
                    },
                ],
            };
        },

        links() {
            return [
                {
                    id: 1,
                    title: this.$t('footer.links.purchase'),
                    isExpanded: false,
                    items: [
                        {
                            id: 1,
                            label: this.$t('footer.links.payment'),
                            href: '/',
                        },
                        {
                            id: 2,
                            label: this.$t('footer.links.refund'),
                            href: '/',
                        },
                        {
                            id: 3,
                            label: this.$t('footer.links.guarantee'),
                            href: '/',
                        },
                        {
                            id: 4,
                            label: this.$t('footer.links.qna'),
                            href: '/',
                        },
                    ],
                },
                {
                    id: 2,
                    title: this.$t('footer.links.about_company'),
                    isExpanded: false,
                    items: [
                        {
                            id: 1,
                            label: this.$t('footer.links.about_us'),
                            href: '/',
                        },
                        {
                            id: 2,
                            label: this.$t('footer.links.partners'),
                            href: '/',
                        },
                        {
                            id: 3,
                            label: this.$t('footer.links.feedback'),
                            href: '/',
                        },
                        {
                            id: 4,
                            label: this.$t('footer.links.vacancy'),
                            href: '/',
                        },
                    ],
                },
            ];
        },
    },
};
</script>


