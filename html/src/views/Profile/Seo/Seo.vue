<template>
    <section class="section seo-view">
        <div class="container container--tablet-lg seo-view__header">
            <h2 class="seo-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>
            <radio-switch
                class="seo-view__switch"
                v-model="selectedActiveStatus"
                :items="activeStatus"
                id="seo-switch"
                key-field="value"
                name="activeStatus"
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
                        `<p>Гибридные и такие эмоциональные лаки <strong>MOOD!</strong></p>
                    Идея в том, что каждый оттенок лака «выражает» эмоцию. 
                    Растрепанные чувства не повод отказываться от нового покрытия — просто оторвитесь на маникюре с оттенком MOOD «Jammin», уверены вы будете в восторге MOOD «DBL Happy»! 
                    Это лимитированная коллекция, лаки с 7-free формулой, стойким, ярким покрытием с эффектом глянцевого блеска. 
                    <strong>Какое настроение у вас сегодня?!</strong>`
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
                        Новинка <strong>R+Co</strong> разрушает привычные представления о том, что такое классический сухой шампунь. 
                        Впервые в составе формулы — мицеллярная основа, позаимствованная из средств для ухода за кожей, препятствует оседанию пудры и обеспечивает волосам объем и свежесть.
                    </p>
                    <p>
                    Жидкий сухой шампунь <strong>Spiritualized Dry Shampoo Mist</strong> разработан для применения между основным мытьем головы, справляется с накопившимися укладочными средствами на поверхности волос. 
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

        <div class="container container--tablet-lg seo-view__controls" v-if="pagesCount > 1">
            <v-button
                class="btn--outline seo-view__controls-btn"
                v-if="activePage < pagesCount"
                @click="onShowMore"
                :disabled="showMore"
            >
                Показать ещё
            </v-button>
            <v-pagination :value="activePage" :page-count="pagesCount" @input="onPageChanged" />
        </div>
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';
import VHtml from '@controls/VHtml/VHtml.vue';
import VPagination from '@controls/VPagination/VPagination.vue';

import RadioSwitch from '@components/RadioSwitch/RadioSwitch.vue';
import InfoPanel from '@components/profile/InfoPanel/InfoPanel.vue';

import profileSEO1 from '@images/mock/profileSEO1.png';
import profileSEO2 from '@images/mock/profileSEO2.png';
import profileSEO3 from '@images/mock/profileSEO3.png';
import profileSEO4 from '@images/mock/profileSEO4.png';

import _debounce from 'lodash/debounce';
import { mapState, mapActions, mapGetters } from 'vuex';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';

import seoModule, { NAME as SEO_MODULE, ITEMS, ACTIVE_PAGE } from '@store/modules/Profile/modules/Seo';
import { PAGES_COUNT } from '@store/modules/Profile/modules/Seo/getters';
import { FETCH_PRODUCTS, SET_LOAD_PATH } from '@store/modules/Profile/modules/Seo/actions';

import { $store } from '@services';
import { registerModuleIfNotExists } from '@util/store';
import { MIN_SCROLL_VALUE } from '../../../assets/scripts/constants';

import '@images/sprites/socials/facebook-bw.svg';
import '@images/sprites/socials/vkontakte-bw.svg';
import '@images/sprites/download.svg';
import '@images/sprites/copy.svg';
import '@images/sprites/link.svg';
import './Seo.css';

const SEO_MODULE_PATH = `${PROFILE_MODULE}/${SEO_MODULE}`;

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
        const activeStatus = [
            {
                value: 1,
                title: 'Действующие',
            },
            {
                value: 0,
                title: 'Архив',
            },
        ];

        return {
            profileSEO1,
            profileSEO2,
            profileSEO3,
            profileSEO4,

            selectedActiveStatus: activeStatus[0].value,
            activeStatus,
            showMore: false,
        };
    },

    computed: {
        ...mapState(SEO_MODULE_PATH, [ITEMS, ACTIVE_PAGE]),
        ...mapGetters(SEO_MODULE_PATH, [PAGES_COUNT]),

        isTablet() {
            return this.$mq.tablet;
        },

        iconSize() {
            return this.$mq.tablet ? 24 : 16;
        },
    },

    watch: {
        selectedActiveStatus(value) {
            this.$router.replace({
                path: this.$route.path,
                query: { ...this.$route.query, isActive: value },
            });
        },
    },

    methods: {
        ...mapActions(SEO_MODULE_PATH, [FETCH_PRODUCTS]),

        setStatus(isActive) {
            this.selectedActiveStatus = Number(isActive);
        },

        onShowMore() {
            this.showMore = true;
            this.$router.replace({
                path: this.$route.path,
                query: { ...this.$route.query, page: this[ACTIVE_PAGE] + 1 },
            });
        },

        onPageChanged(page) {
            this.showMore = false;
            this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page } });
        },

        async fetchProducts(to, from, showMore) {
            try {
                const {
                    query: { page, isActive },
                } = to;

                const {
                    query: { page: fromPage },
                } = to;

                this.$progress.start();

                await this[FETCH_PRODUCTS]({
                    page,
                    isActive,
                    showMore,
                });

                this.$progress.finish();

                if (!showMore && page !== fromPage)
                    window.scrollTo({
                        top: MIN_SCROLL_VALUE + 1,
                        behavior: 'smooth',
                    });

                if (showMore) setTimeout(() => (this.showMore = false), 200);
            } catch (thrown) {
                if (thrown && thrown.isCancel === true) return;
                console.log(thrown.message);
                this.$progress.fail();
            }
        },
    },

    beforeRouteEnter(to, from, next) {
        const {
            fullPath,
            query: { isActive = 1, page = 1 },
        } = to;

        const { loadPath } = $store.state[PROFILE_MODULE][SEO_MODULE];

        if (loadPath === fullPath) next(vm => vm.setStatus(isActive));
        else {
            debugger;
            $store
                .dispatch(`${SEO_MODULE_PATH}/${FETCH_PRODUCTS}`, { page, isActive })
                .then(() => {
                    $store.dispatch(`${SEO_MODULE_PATH}/${SET_LOAD_PATH}`, fullPath);
                    next(vm => vm.setStatus(isActive));
                })
                .catch(error => {
                    $progress.fail();
                    next();
                });
        }
    },

    beforeRouteUpdate(to, from, next) {
        const {
            query: { page, isActive },
        } = to;

        const {
            query: { page: fromPage, isActive: fromIsActive },
        } = from;

        if (page === fromPage && isActive == fromIsActive) next();
        else {
            this.debounce_fetchProducts(to, from, this.showMore);
            next();
        }
    },

    beforeMount() {
        this.debounce_fetchProducts = _debounce(this.fetchProducts, 500);
    },
};
</script>
