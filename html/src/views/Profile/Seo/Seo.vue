<template>
    <section class="section seo-view">
        <div class="container container--tablet-lg seo-view__header">
            <h2 class="seo-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>
            <radio-switch
                class="seo-view__switch"
                v-model="selectedStatus"
                :items="seoStatus"
                id="seo-switch"
                key-field="value"
                name="seoStatus"
            />
        </div>

        <info-panel class="seo-view__panel" header="Лаки для ногтей Mood">
            <template v-slot:controls>
                <div class="seo-view__panel-links">
                    <v-link class="seo-view__panel-link" tag="button">
                        <v-svg name="download" :width="iconSize" :height="iconSize" />
                        <span>&nbsp;&nbsp;Скачать</span>
                    </v-link>

                    <v-link class="seo-view__panel-link" tag="button">
                        <v-svg name="copy" :width="iconSize" :height="iconSize" />
                        <span>&nbsp;&nbsp;Скопировать текст</span>
                    </v-link>

                    <v-link class="seo-view__panel-link" tag="button">
                        <v-svg name="link" :width="iconSize" :height="iconSize" />
                        <span>&nbsp;&nbsp;Скопировать ссылку</span>
                    </v-link>
                </div>
            </template>

            <div class="container container--tablet-lg">
                <div class="seo-view__panel-referal">
                    <span class="text-bold seo-view__panel-referal-text">Ссылка</span>
                    <a
                        class="seo-view__panel-referal-link"
                        href="https://master_front.ibt-mas.greensight.ru/catalog/tonalnye-sredstva/krem-dlya-britya-olaplex-3"
                    >
                        https://master_front.ibt-mas.greensight.ru/catalog/tonalnye-sredstva/krem-dlya-britya-olaplex-3
                    </a>
                </div>

                <v-html
                    class="seo-view__panel-content"
                    v-html="
                        `<p>Гибридные и такие эмоциональные лаки <b>MOOD!</b></p>
                    Идея в том, что каждый оттенок лака «выражает» эмоцию. 
                    Растрепанные чувства не повод отказываться от нового покрытия — просто оторвитесь на маникюре с оттенком MOOD «Jammin», уверены вы будете в восторге MOOD «DBL Happy»! 
                    Это лимитированная коллекция, лаки с 7-free формулой, стойким, ярким покрытием с эффектом глянцевого блеска. 
                    <b>Какое настроение у вас сегодня?!</b>`
                    "
                />

                <ul class="seo-view__panel-list">
                    <li class="seo-view__panel-item">
                        <img :src="profileSEO1" />
                    </li>
                    <li class="seo-view__panel-item">
                        <img :src="profileSEO2" />
                    </li>
                    <li class="seo-view__panel-item">
                        <img :src="profileSEO3" />
                    </li>
                </ul>

                <div class="text-bold seo-view__panel-share">
                    Поделиться
                    <v-svg name="vkontakte-bw" width="24" height="24" />
                    <v-svg name="facebook-bw" width="24" height="24" />
                </div>
            </div>
        </info-panel>

        <!-- <info-panel class="seo-view__panel" header="Сухой шампунь R+CO">
            <template v-slot:controls>
                <div class="seo-view__panel-links">
                    <v-link class="seo-view__panel-link" tag="button">
                        <v-svg name="download" :width="iconSize" :height="iconSize" />
                        &nbsp;&nbsp;Скачать
                    </v-link>

                    <v-link class="seo-view__panel-link" tag="button">
                        <v-svg name="copy" :width="iconSize" :height="iconSize" />
                        &nbsp;&nbsp;Скопировать текст
                    </v-link>

                    <v-link class="seo-view__panel-link" tag="button">
                        <v-svg name="link" :width="iconSize" :height="iconSize" />
                        &nbsp;&nbsp;Скопировать ссылку
                    </v-link>
                </div>
            </template>

            <div class="container container--tablet-lg">
                <div class="seo-view__panel-referal">
                    <span class="text-bold seo-view__panel-referal-text">Ссылка</span>
                    <a
                        class="seo-view__panel-referal-link"
                        href="https://master_front.ibt-mas.greensight.ru/catalog/tonalnye-sredstva/krem-dlya-britya-olaplex-3"
                        rel="noreferrer noopener"
                        target="_blank"
                    >
                        https://master_front.ibt-mas.greensight.ru/catalog/bb-cc-dd-kremy/shampun-dlya-uplotneniya-volos-plumping-wash
                    </a>
                </div>

                <v-html
                    class="seo-view__panel-content"
                    v-html="
                        `<p>
                        Новинка <b>R+Co</b> разрушает привычные представления о том, что такое классический сухой шампунь. 
                        Впервые в составе формулы — мицеллярная основа, позаимствованная из средств для ухода за кожей, препятствует оседанию пудры и обеспечивает волосам объем и свежесть.
                    </p>
                    <p>
                    Жидкий сухой шампунь <b>Spiritualized Dry Shampoo Mist</b> разработан для применения между основным мытьем головы, справляется с накопившимися укладочными средствами на поверхности волос. 
                    Подходит для сухой чувствительной кожи головы и для всех типов волос; очищает, увлажняет и не оставляет налета на волосах. Идеальный!
                    </p>`
                    "
                />

                <ul class="seo-view__panel-list">
                    <li class="seo-view__panel-item">
                        <img :src="profileSEO4" />
                    </li>
                </ul>

                <div class="text-bold seo-view__panel-share">
                    Поделиться
                    <v-svg name="vkontakte-bw" width="24" height="24" />
                    <v-svg name="facebook-bw" width="24" height="24" />
                </div>
            </div>
        </info-panel> -->

        <div class="container container--tablet-lg seo-view__controls">
            <v-button class="btn--outline seo-view__controls-btn">
                Показать ещё
            </v-button>
            <v-pagination :value="1" :page-count="10" />
        </div>
    </section>
</template>

<script>
import VSvg from '../../../components/controls/VSvg/VSvg.vue';
import VLink from '../../../components/controls/VLink/VLink.vue';
import VButton from '../../../components/controls/VButton/VButton.vue';
import VHtml from '../../../components/controls/VHtml/VHtml.vue';
import VPagination from '../../../components/controls/VPagination/VPagination.vue';

import RadioSwitch from '../../../components/RadioSwitch/RadioSwitch.vue';
import InfoPanel from '../../../components/profile/InfoPanel/InfoPanel.vue';

import profileSEO1 from '../../../assets/images/mock/profileSEO1.png';
import profileSEO2 from '../../../assets/images/mock/profileSEO2.png';
import profileSEO3 from '../../../assets/images/mock/profileSEO3.png';
import profileSEO4 from '../../../assets/images/mock/profileSEO4.png';

import '../../../assets/images/sprites/socials/facebook-bw.svg';
import '../../../assets/images/sprites/socials/vkontakte-bw.svg';
import '../../../assets/images/sprites/download.svg';
import '../../../assets/images/sprites/copy.svg';
import '../../../assets/images/sprites/link.svg';
import './Seo.css';

export default {
    name: 'seo',

    components: {
        VSvg,
        VLink,
        VButton,
        VHtml,
        VPagination,

        RadioSwitch,
        InfoPanel,
    },

    data() {
        const seoStatus = [
            {
                value: 'active',
                title: 'Действующие',
            },
            {
                value: 'archive',
                title: 'Архив',
            },
        ];

        return {
            profileSEO1,
            profileSEO2,
            profileSEO3,
            profileSEO4,

            selectedStatus: seoStatus[0].value,
            seoStatus,
        };
    },

    computed: {
        isTablet() {
            return this.$mq.tablet;
        },

        iconSize() {
            return this.$mq.tablet ? 24 : 16;
        },
    },

    watch: {},

    methods: {},

    beforeRouteEnter(to, from, next) {
        next();
    },

    beforeRouteUpdate(to, from, next) {
        next();
    },

    beforeMount() {},
};
</script>
