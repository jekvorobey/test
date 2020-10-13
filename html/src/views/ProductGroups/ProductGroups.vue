<template>
    <section class="section product-groups-view">
        <div class="container product-groups-view__header">
            <breadcrumbs class="container container--tablet-lg product-groups-view__breadcrumbs">
                <breadcrumb-item key="main" to="/">
                    <v-svg v-if="isTablet" name="home" width="10" height="10" />
                    <span v-else>Главная</span>
                </breadcrumb-item>
                <breadcrumb-item key="sets" :to="$route.path">{{ catalogTitle }}</breadcrumb-item>
            </breadcrumbs>
        </div>

        <template v-if="showList">
            <categories-section class="product-groups-view__categories" :categories="frequentCategories" />

            <separator-section class="product-groups-view__separator" />

            <section class="section product-groups-view__section">
                <div class="container">
                    <h1 class="product-groups-view__section-hl">
                        {{ catalogTitle }}
                    </h1>
                    <group-list class="product-groups-view__brands" :items="brandsCatalog" :columns="columns" />
                </div>
            </section>
        </template>

        <template v-else>
            <section class="section product-groups-view__section product-groups-view__sets">
                <h1 class="container product-groups-view__section-hl" v-if="activePage === 1 || isMounted">
                    {{ catalogTitle }}
                </h1>
                <div class="container product-groups-view__sets-container">
                    <template v-if="items && items.length > 0">
                        <ul class="product-groups-view__sets-list">
                            <banner-card
                                class="product-groups-view__sets-list-item"
                                tag="router-link"
                                v-for="item in productGroups"
                                :key="item.id"
                                :title="item.name"
                                :image="item.preview_photo"
                                :to="item.url"
                                button-text="Смотреть товары"
                            />
                        </ul>

                        <div class="product-groups-view__sets-controls" v-if="pagesCount > 1">
                            <show-more-button
                                v-if="activePage < pagesCount"
                                btn-class="btn--outline product-groups-view__sets-controls-btn"
                                @click="onShowMore"
                                :show-preloader="showMore"
                            >
                                Показать ещё
                            </show-more-button>
                            <v-pagination :value="activePage" :page-count="pagesCount" @input="onPageChanged" />
                        </div>
                    </template>
                    <empty-placeholder-panel class="product-groups-view__sets-empty" v-else @btn-click="onToCatalog">
                        В данный момент нет активных акций
                        <template v-slot:btn>
                            В каталог
                        </template>
                    </empty-placeholder-panel>
                </div>
            </section>
        </template>

        <section class="section product-groups-view__section">
            <div class="container">
                <div data-retailrocket-markup-block="5efdc56097a52833a0d00bab"></div>
            </div>
        </section>

        <!-- #62050
        <section class="section product-groups-view__section product-groups-view__seo" v-if="activePage === 1 || isMounted">
            <div class="container product-groups-view__seo-container">
                <h2 class="product-groups-view__section-hl product-groups-view__seo-hl">Блок SEO текста</h2>
                <v-expander class="product-groups-view__seo-text" :min-height="80" has-mask>
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
        </section> -->
    </section>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VPagination from '@controls/VPagination/VPagination.vue';
import VExpander from '@controls/VExpander/VExpander.vue';
import VSvg from '@controls/VSvg/VSvg.vue';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '@components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';

import GroupList from '@components/GroupList/GroupList.vue';
import SeparatorSection from '@components/blocks/SeparatorSection/SeparatorSection.vue';
import VSlider from '@controls/VSlider/VSlider.vue';
import BannerCard from '@components/BannerCard/BannerCard.vue';
import CategoriesSection from '@components/blocks/CategoriesSection/CategoriesSection.vue';
import ShowMoreButton from '@components/ShowMoreButton/ShowMoreButton.vue';
import EmptyPlaceholderPanel from '@components/EmptyPlaceholderPanel/EmptyPlaceholderPanel.vue';

import { $store, $progress, $logger } from '@services';

import { mapState, mapGetters, mapActions } from 'vuex';
import { CATEGORIES, SCROLL, FREQUENT_CATEGORIES } from '@store';
import { NAME as PRODUCT_GROUPS_MODULE, ITEMS, LOAD_PATH, TYPE } from '@store/modules/ProductGroups';
import { BRANDS_CATALOG, ACTIVE_PAGE, PAGES_COUNT } from '@store/modules/ProductGroups/getters';
import { FETCH_ITEMS, SET_LOAD_PATH, SET_TYPE } from '@store/modules/ProductGroups/actions';

import _debounce from 'lodash/debounce';
import { httpCodes, sortDirections } from '@enums';
import { productGroupTypes, productGroupSortFields } from '@enums/product';
import { MIN_SCROLL_VALUE, DEFAULT_PAGE } from '@constants';
import { createNotFoundRoute } from '@util/router';
import { generateCategoryUrl, generateProductGroupUrl } from '@util/catalog';
import metaMixin from '@plugins/meta';
import '@images/sprites/home.svg';
import './ProductGroups.css';

const sliderOptions = {
    slidesPerView: 1,
    // grabCursor: true,
    // loop: true,
    // autoplay: {
    //     delay: 10000,
    // },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },
};

export default {
    name: 'product-groups',
    mixins: [metaMixin],

    components: {
        VButton,
        VPagination,
        VExpander,
        VSlider,

        BannerCard,

        Breadcrumbs,
        BreadcrumbItem,

        GroupList,
        SeparatorSection,
        CategoriesSection,
        ShowMoreButton,

        EmptyPlaceholderPanel,
    },

    metaInfo() {
        const { catalogTitle, activePage } = this;
        return {
            title: activePage > 1 ? `${catalogTitle} – страница ${activePage}` : catalogTitle,
        };
    },

    data() {
        return {
            isMounted: false,
            showMore: false,
        };
    },

    computed: {
        ...mapState([CATEGORIES, FREQUENT_CATEGORIES, SCROLL]),
        ...mapState(PRODUCT_GROUPS_MODULE, [ITEMS, TYPE]),
        ...mapGetters(PRODUCT_GROUPS_MODULE, [BRANDS_CATALOG, ACTIVE_PAGE, PAGES_COUNT]),

        showList() {
            return this[TYPE] === productGroupTypes.BRANDS;
        },

        productGroups() {
            const { type } = this;
            const items = this[ITEMS] || [];
            return items.map((i) => ({
                ...i,
                url: generateCategoryUrl(type, i.code),
            }));
        },

        columns() {
            if (this.isTablet) return 2;
            return this.isTabletLg ? 3 : 6;
        },

        sliderOptions() {
            return sliderOptions;
        },

        catalogTitle(){
            const { type } = this;
            return this.$t(`productGroups.title.${type || 'catalog'}`);
        },

        isTablet() {
            return this.$mq.tablet;
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    methods: {
        ...mapActions(PRODUCT_GROUPS_MODULE, [FETCH_ITEMS]),

        generateCategoryUrl(code) {
            const { type } = this;
            return generateCategoryUrl(type, code);
        },

        onShowMore() {
            this.showMore = true;
            this.$router.replace({
                path: this.$route.path,
                query: { ...this.$route.query, page: this.activePage + 1 },
            });
        },

        onPageChanged(page) {
            this.showMore = false;
            this.$router.push({
                path: this.$route.path,
                query: { ...this.$route.query, page: page > DEFAULT_PAGE ? page : undefined },
            });
        },

        onToCatalog() {
            this.$router.push({ name: 'Catalog', params: { type: productGroupTypes.CATALOG } });
        },

        async fetchCatalog(to, from, next, showMore) {
            try {
                const {
                    fullPath,
                    params: { type: toType },
                    query: {
                        page = DEFAULT_PAGE,
                        orderField = toType === productGroupTypes.BRANDS
                            ? productGroupSortFields.NAME
                            : productGroupSortFields.CREATED_AT,
                        orderDirection = toType === productGroupTypes.BRANDS ? sortDirections.ASC : sortDirections.DESC,
                    },
                } = to;

                const {
                    params: { type: fromType },
                    query: { page: fromPage = DEFAULT_PAGE },
                } = from;

                if (!showMore && this[SCROLL] && (toType !== fromType || page !== fromPage))
                    window.scrollTo({
                        top: MIN_SCROLL_VALUE + 1,
                        behavior: 'smooth',
                    });

                // для брендов нам нужны сразу все страницы
                const fetchPage = toType === productGroupTypes.BRANDS ? undefined : page;
                this.$progress.start();
                await this[FETCH_ITEMS]({ type: toType, page: fetchPage, orderField, orderDirection, showMore });

                next();
                this.$progress.finish();

                if (showMore) setTimeout(() => (this.showMore = false), 200);
            } catch (error) {
                this.$progress.fail();
                if (error.status === httpCodes.NOT_FOUND) next(createNotFoundRoute(to));
                else next(new Error(error.message));
            }
        },
    },

    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        const {
            fullPath,
            params: { type: toType },
            query: {
                page = DEFAULT_PAGE,
                orderField = toType === productGroupTypes.BRANDS
                    ? productGroupSortFields.NAME
                    : productGroupSortFields.CREATED_AT,
                orderDirection = toType === productGroupTypes.BRANDS ? sortDirections.ASC : sortDirections.DESC,
            },
        } = to;

        const { loadPath, type } = $store.state[PRODUCT_GROUPS_MODULE];

        // если все загружено, пропускаем
        if (loadPath === fullPath && type === toType)
            next((vm) => {
                if (!vm.$isServer && vm[SCROLL]) {
                    window.scrollTo({
                        top: 0,
                    });
                }
            });
        else {
            // для брендов нам нужны сразу все страницы
            const fetchPage = toType === productGroupTypes.BRANDS ? undefined : page;
            $progress.start();
            $store
                .dispatch(`${PRODUCT_GROUPS_MODULE}/${FETCH_ITEMS}`, {
                    type: toType,
                    page: fetchPage,
                    orderField,
                    orderDirection,
                })
                .then(() => {
                    $store.dispatch(`${PRODUCT_GROUPS_MODULE}/${SET_LOAD_PATH}`, fullPath);
                    next((vm) => {
                        $progress.finish();
                        if (!vm.$isServer && vm[SCROLL]) {
                            window.scrollTo({
                                top: 0,
                            });
                        }
                    });
                })
                .catch((error) => {
                    $progress.fail();
                    if (error.status === httpCodes.NOT_FOUND) next(createNotFoundRoute(to));
                    else next(new Error(error.message));
                });
        }
    },

    beforeRouteUpdate(to, from, next) {
        // вызывается, когда маршрут, что рендерит этот компонент, изменился,
        // но этот компонент будет повторно использован в новом маршруте.
        // Например, для маршрута с динамическими параметрами `/foo/:id`, когда мы
        // перемещаемся между `/foo/1` и `/foo/2`, экземпляр того же компонента `Foo`
        // будет использован повторно, и этот хук будет вызван когда это случится.
        // Также имеется доступ в `this` к экземпляру компонента.

        if (this.showMore) this.fetchCatalog(to, from, next, this.showMore);
        else this.debounce_fetchCatalog(to, from, next);
    },

    beforeMount() {
        this.debounce_fetchCatalog = _debounce(this.fetchCatalog, 500);
    },

    mounted() {
        this.isMounted = true;
    },
};
</script>
