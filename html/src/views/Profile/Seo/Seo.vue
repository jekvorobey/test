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

        <info-panel
            class="seo-view__panel"
            :header="item.product_name"
            v-for="(item, index) in seoProducts"
            :key="item.id"
        >
            <template v-slot:controls>
                <div class="seo-view__panel-links">
                    <!-- <v-link class="seo-view__panel-link" tag="button">
                        <v-svg name="download" :width="iconSize" :height="iconSize" />
                        <span>&nbsp;&nbsp;Скачать</span>
                    </v-link> -->

                    <v-link
                        class="seo-view__panel-link"
                        tag="button"
                        @click="onCopyToClipboard($event, item.description)"
                    >
                        <v-svg name="copy" :width="iconSize" :height="iconSize" />
                        <span>&nbsp;&nbsp;Скопировать текст</span>
                    </v-link>

                    <v-link class="seo-view__panel-link" tag="button" @click="onCopyToClipboard($event, item.link)">
                        <v-svg name="link" :width="iconSize" :height="iconSize" />
                        <span>&nbsp;&nbsp;Скопировать ссылку</span>
                    </v-link>
                </div>
            </template>

            <div class="container container--tablet-lg">
                <div class="seo-view__panel-referal">
                    <span class="text-bold seo-view__panel-referal-text">Ссылка</span>
                    <a class="seo-view__panel-referal-link" :href="item.link">
                        {{ item.link }}
                    </a>
                </div>

                <v-html class="seo-view__panel-content" v-html="item.description" />

                <ul class="seo-view__panel-list">
                    <li class="seo-view__panel-item" v-for="file in item.files" :key="file.id">
                        <v-picture>
                            <source :data-srcset="file.image" type="image/webp" />
                            <img class="blur-up lazyload v-picture__img" :data-src="file.defaultImage" alt="" />
                        </v-picture>
                    </li>
                </ul>

                <div class="text-bold seo-view__panel-share">
                    Поделиться
                    <v-svg name="vkontakte-bw" width="24" height="24" />
                    <v-svg name="facebook-bw" width="24" height="24" />
                </div>
            </div>
        </info-panel>

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
import VPicture from '@controls/VPicture/VPicture.vue';
import VHtml from '@controls/VHtml/VHtml.vue';
import VPagination from '@controls/VPagination/VPagination.vue';

import RadioSwitch from '@components/RadioSwitch/RadioSwitch.vue';
import InfoPanel from '@components/profile/InfoPanel/InfoPanel.vue';

import _debounce from 'lodash/debounce';
import { mapState, mapActions, mapGetters } from 'vuex';

import { NAME as AUTH_MODULE, USER, REFERRAL_CODE } from '@store/modules/Auth';
import { NAME as PROFILE_MODULE } from '@store/modules/Profile';

import seoModule, { NAME as SEO_MODULE, ITEMS, ACTIVE_PAGE } from '@store/modules/Profile/modules/Seo';
import { PAGES_COUNT } from '@store/modules/Profile/modules/Seo/getters';
import { FETCH_PRODUCTS, SET_LOAD_PATH } from '@store/modules/Profile/modules/Seo/actions';

import { $store } from '@services';
import { fileExtension } from '@enums';
import { MIN_SCROLL_VALUE } from '@constants';
import { registerModuleIfNotExists } from '@util/store';
import { generatePictureSourcePath } from '@util/file';
import { generateProductUrl, generateAbsoluteProductUrl } from '@util/catalog';

import '@images/sprites/socials/facebook-bw.svg';
import '@images/sprites/socials/vkontakte-bw.svg';
import '@images/sprites/download.svg';
import '@images/sprites/copy.svg';
import '@images/sprites/link.svg';
import './Seo.css';
import { saveToClipboard } from '../../../util';

const SEO_MODULE_PATH = `${PROFILE_MODULE}/${SEO_MODULE}`;

export default {
    name: 'seo',

    components: {
        VSvg,
        VLink,
        VButton,
        VHtml,
        VPicture,
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
            selectedActiveStatus: activeStatus[0].value,
            activeStatus,
            showMore: false,
        };
    },

    computed: {
        ...mapState(SEO_MODULE_PATH, [ITEMS, ACTIVE_PAGE]),
        ...mapGetters(SEO_MODULE_PATH, [PAGES_COUNT]),
        ...mapState(AUTH_MODULE, {
            [REFERRAL_CODE]: state => (state[USER] && state[USER][REFERRAL_CODE]) || null,
        }),

        seoProducts() {
            const items = this[ITEMS] || [];
            const referralCode = this[REFERRAL_CODE];

            return items.map(i => {
                return {
                    ...i,
                    link: generateAbsoluteProductUrl(i.category_code, i.product_code, referralCode),
                    files: i.files.map(f => {
                        return {
                            id: f.id,
                            image: generatePictureSourcePath(null, null, f.id, fileExtension.image.WEBP),
                            defaultImage: generatePictureSourcePath(null, null, f.id, f.sourceExt),
                        };
                    }),
                };
            });
        },

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

        onCopyToClipboard(e, text) {
            const result = saveToClipboard(text);
            var msg = result ? 'Успешно скопировано' : 'Не удается скопировать';
            alert(msg);
            e.target.focus();
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
