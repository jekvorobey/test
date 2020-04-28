<template>
    <section class="section referrer-view">
        <div class="container">
            <breadcrumbs class="referrer-view__breadcrumbs">
                <breadcrumb-item key="main" to="/">
                    Главная
                </breadcrumb-item>
                <breadcrumb-item key="Referrer" :to="$route.fullPath">
                    {{ $route.params.code }}
                </breadcrumb-item>
            </breadcrumbs>
        </div>

        <section class="section">
            <div class="container referrer-view__header">
                <h1 class="referrer-view__header-hl">
                    {{ title }}
                    <span class="referrer-view__header-counter" v-if="items && items.length > 0">
                        {{ items.length }} продуктов
                    </span>
                </h1>
            </div>

            <div class="container referrer-view__list">
                <catalog-product-list
                    v-if="items && items.length > 0"
                    :items="items"
                    :referral-code="code"
                    fullscreen
                />
                <p class="referrer-view__list-empty" v-else>Ничего не найдено</p>
            </div>

            <div class="container referrer-view__main-controls" v-if="pagesCount > 1">
                <show-more-button
                    v-if="activePage < pagesCount"
                    btn-class="btn--outline referrer-view__main-controls-btn"
                    preloader-class="referrer-view__preloader"
                    :show-preloader="showMore"
                    @click="onShowMore"
                >
                    Показать ещё
                </show-more-button>
                <v-pagination :value="activePage" :page-count="pagesCount" @input="onPageChanged" />
            </div>
        </section>

        <section class="section referrer-view__section referrer-view__seo">
            <div class="container referrer-view__seo-container">
                <h2 class="referrer-view__section-hl referrer-view__seo-hl">Блок SEO текста</h2>
                <v-expander class="referrer-view__seo-text" :min-height="80" has-mask>
                    Помада L'Oreal Paris Color Riche — это первый матовый тинт для губ с ультранасыщенным цветом,
                    который абсолютно не ощущается на губах. Выбери из 10 модных оттенков те, которые тебе по душе. Эта
                    помада не оставит тебя равнодушной. Экспериментируй и наслаждайся, а Color Riche поможет тебе в
                    этом. Мы заботимся о надёжных поставщиках, качестве товаров и безопасной оплате. А что делать вам?
                    Просто наслаждаться покупками. Для экономии не нужен повод, поэтому мы каждый день даём вам скидки
                    на популярные товары самых разных категорий.

                    <template v-slot:btn="{ isExpanded }">
                        {{ isExpanded ? 'Скрыть' : 'Показать больше' }}
                    </template>
                </v-expander>
            </div>
        </section>
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VButton from '@controls/VButton/VButton.vue';
import VPagination from '@controls/VPagination/VPagination.vue';
import VExpander from '@controls/VExpander/VExpander.vue';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '@components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';

import CatalogProductList from '@components/CatalogProductList/CatalogProductList.vue';
import ShowMoreButton from '@components/ShowMoreButton/ShowMoreButton.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { $store, $progress, $logger } from '@services';

import { NAME as REFERRER_MODULE, ITEMS, ACTIVE_PAGE, TITLE } from '@store/modules/Referrer';
import { PAGES_COUNT } from '@store/modules/Referrer/getters';
import { FETCH_REFERRER_DATA, FETCH_ITEMS, SET_LOAD_PATH } from '@store/modules/Referrer/actions';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { DEFAULT_PAGE } from '@constants';
import { modalName, sortDirections } from '@enums';

import './Referrer.css';

export default {
    name: 'referrer',

    components: {
        VSvg,
        VButton,
        VPagination,
        VExpander,

        CatalogProductList,
        ShowMoreButton,
        Breadcrumbs,
        BreadcrumbItem,
    },

    data() {
        return {
            showMore: false,
        };
    },

    computed: {
        ...mapState(REFERRER_MODULE, [TITLE, ITEMS, ACTIVE_PAGE]),
        ...mapGetters(REFERRER_MODULE, [PAGES_COUNT]),

        ...mapState('route', {
            code: state => state.params.code,
        }),
    },

    methods: {
        ...mapActions(REFERRER_MODULE, [FETCH_REFERRER_DATA, SET_LOAD_PATH]),

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
    },

    beforeRouteEnter(to, from, next) {
        const {
            fullPath,
            params: { code },
            query: { page = DEFAULT_PAGE },
        } = to;

        const { loadPath } = $store.state[REFERRER_MODULE];

        if (loadPath === fullPath) next();
        else {
            $progress.start();
            $store
                .dispatch(`${REFERRER_MODULE}/${FETCH_REFERRER_DATA}`, { code, page })
                .then(data => {
                    $store.dispatch(`${REFERRER_MODULE}/${SET_LOAD_PATH}`, fullPath);
                    next(vm => {
                        $progress.finish();
                    });
                })
                .catch(thrown => {
                    if (thrown && thrown.isCancel === true) return true;
                    next(vm => {
                        $progress.fail();
                    });
                });
        }
    },

    async beforeRouteUpdate(to, from, next) {
        const {
            params: { code },
            query: { page = DEFAULT_PAGE },
        } = to;

        const {
            params: { code: fromCode },
            query: { page: fromPage },
        } = from;

        if (code === fromCode && page === fromPage) return next();

        try {
            this.$progress.start();
            await this[FETCH_REFERRER_DATA]({ code, page, showMore: this.showMore });
            this.$progress.finish();
            next();
        } catch (error) {
            this.$progress.fail();
            next(false);
        }

        this.showMore = false;
    },
};
</script>