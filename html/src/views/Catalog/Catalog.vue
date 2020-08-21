<template>
    <section class="section catalog-view">
        <div ref="catalogHeader" class="container catalog-view__header">
            <breadcrumbs class="catalog-view__breadcrumbs">
                <breadcrumb-item key="main" to="/">
                    <v-svg v-if="isTablet" name="home" width="10" height="10" />
                    <span v-else>Главная</span></breadcrumb-item
                >
                <breadcrumb-item :key="type" :to="breadcrumbRootUrl">{{
                    $t(`productGroups.title.${type}`)
                }}</breadcrumb-item>
                <breadcrumb-item v-if="entityCode" :key="entityCode" :to="generateBreadcrumbUrl(null)">{{
                    productGroup && productGroup.name
                }}</breadcrumb-item>
                <breadcrumb-item
                    v-for="category in breadcrumbs"
                    :key="category.id"
                    :to="generateBreadcrumbUrl(category.code)"
                    >{{ category.name }}</breadcrumb-item
                >
            </breadcrumbs>

            <!-- <catalog-banner-card class="catalog-view__banner" v-if="productGroup.banner" :item="productGroup.banner">
                <template v-if="desktopImg">
                    <source :data-srcset="desktopImg.webp" type="image/webp" media="(min-width: 1024px)" />
                    <source :data-srcset="desktopImg.orig" media="(min-width: 1024px)" />
                </template>
                <template v-if="tabletImg">
                    <source :data-srcset="tabletImg.webp" type="image/webp" media="(min-width: 768px)" />
                    <source :data-srcset="tabletImg.orig" media="(min-width: 768px)" />
                </template>
                <template v-if="mobileImg">
                    <source :data-srcset="mobileImg.webp" type="image/webp" media="(min-width: 320px)" />
                    <source :data-srcset="mobileImg.orig" media="(min-width: 320px)" />
                </template>
                <img v-if="defaultImg" class="blur-up lazyload v-picture__img" :data-src="defaultImg" alt />
            </catalog-banner-card> -->
        </div>
        <section class="section catalog-view__section--grid">
            <div class="container catalog-view__grid" data-v-sticky-container>
                <v-sidebar
                    class="catalog-view__side-panel"
                    v-if="!isTabletLg && categories.length > 0"
                    container-selector=".catalog-view__grid"
                    top="64"
                    bottom="0"
                >
                    <template v-slot:sticky>
                        <ul class="catalog-view__side-panel-categories">
                            <category-tree-item
                                class="catalog-view__side-panel-categories-item"
                                v-for="category in categories"
                                :item="category"
                                :key="category.id"
                            />
                        </ul>

                        <catalog-filter class="catalog-view__side-panel-filters" />

                        <v-button
                            class="btn--outline catalog-view__side-panel-clear-btn"
                            :to="clearFilterUrl"
                            :class="!isFiltersPage && 'is-disabled'"
                            replace
                            v-show="isFiltersPage"
                        >
                            Очистить фильтры
                        </v-button>
                    </template>
                </v-sidebar>

                <div class="catalog-view__main">
                    <div class="catalog-view__main-header">
                        <div class="catalog-view__main-header-title">
                            <template v-if="type !== productGroupTypes.SEARCH">
                                <h1 class="catalog-view__main-header-hl">
                                    <template v-if="entityCode">
                                        {{ productGroup && productGroup.name }}
                                    </template>
                                    <template v-else>
                                        {{ activeCategory ? activeCategory.name : 'Все категории' }}
                                    </template>
                                </h1>
                                <p class="text-grey catalog-view__main-header-text">{{ range }} {{ productName }}</p>
                            </template>
                            <template v-else>
                                <h1 class="catalog-view__main-header-hl">
                                    {{ searchTitle }}
                                </h1>
                            </template>
                        </div>

                        <v-select
                            class="catalog-view__main-header-sort"
                            label="title"
                            track-by="id"
                            v-model="sortValue"
                            :options="typeSortOptions"
                            :searchable="false"
                            :allow-empty="false"
                            :show-labels="false"
                        />

                        <filter-button class="catalog-view__main-header-btn" @click="filterModal = !filterModal">
                            Фильтр и сортировка&nbsp;&nbsp;
                            <span class="text-grey">{{ activeTags.length }}</span>
                        </filter-button>
                    </div>

                    <transition-group v-if="!isTabletLg" tag="ul" class="catalog-view__main-tags" name="tag-item">
                        <tag-item
                            v-for="(tag, index) in activeTags"
                            :data-index="index"
                            :key="tag.code"
                            :text="tag.name"
                            @delete="onClickDeleteTag(tag.segment)"
                        />
                    </transition-group>

                    <catalog-product-list
                        class="catalog-view__main-grid"
                        :key="type"
                        :items="items"
                        :animation="!isTablet"
                        :fullscreen="categories && categories.length === 0"
                    />

                    <div class="container containet--tablet catalog-view__main-controls" v-if="pagesCount > 1">
                        <show-more-button
                            v-if="activePage < pagesCount"
                            btn-class="btn--outline catalog-view__main-controls-btn"
                            @click="onShowMore"
                            :show-preloader="showMore"
                        >
                            Показать ещё
                        </show-more-button>

                        <v-pagination
                            class="containet--tablet catalog-view__main-controls-pagination"
                            :value="activePage"
                            :page-count="pagesCount"
                            @input="onPageChanged"
                        />
                    </div>

                    <template v-if="isSearchPage">
                        <div
                            v-if="range > 0"
                            data-retailrocket-markup-block="5f21668797a5282edc07d7c8"
                            :data-search-phrase="$route.query.search_string"
                        />
                        <div
                            v-else
                            data-retailrocket-markup-block="5f21669197a5282edc07d7c9"
                            :data-search-phrase="$route.query.search_string"
                        />
                    </template>
                    <div
                        v-else-if="isBrandPage"
                        data-retailrocket-markup-block="5efdc55a97a52833a0d00baa"
                        :data-vendor="entityCode"
                    />
                    <div
                        v-else
                        data-retailrocket-markup-block="5efda10697a52833a0d006df"
                        :data-category-id="activeCategory && activeCategory.id"
                    />
                </div>
            </div>
        </section>

        <transition name="fade-in">
            <modal
                class="catalog-view__modal-filter"
                v-if="filterModal && isTabletLg"
                :show-close-btn="false"
                type="fullscreen"
            >
                <template v-slot:body>
                    <v-sticky class="catalog-view__modal-filter-sticky">
                        <template v-slot:sticky>
                            <div class="catalog-view__modal-filter-header">
                                <button class="catalog-view__modal-filter-header-btn" @click="filterModal = false">
                                    <v-svg name="cross-small" width="14" height="14" />Фильтр
                                </button>
                            </div>
                        </template>

                        <div class="catalog-view__modal-filter-sort">
                            <div class="catalog-view__modal-filter-sort-title">Сортировка</div>
                            <ul class="catalog-view__modal-filter-sort-list">
                                <li
                                    class="catalog-view__modal-filter-sort-item"
                                    :class="{ 'catalog-view__modal-filter-sort-item--active': item === sortValue }"
                                    v-for="item in sortOptions"
                                    :key="item.title"
                                >
                                    <button class="catalog-view__modal-filter-sort-btn" @click="sortValue = item">
                                        {{ item.title }}
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <catalog-filter class="catalog-view__modal-filter-panel" />

                        <div class="catalog-view__modal-filter-controls">
                            <v-button
                                class="btn--outline catalog-view__modal-filter-clear-btn"
                                :to="clearFilterUrl"
                                replace
                            >
                                Очистить
                            </v-button>
                            <v-button class="catalog-view__modal-filter-close-btn" @click="filterModal = !filterModal">
                                Показать {{ range }}
                            </v-button>
                        </div>
                    </v-sticky>
                </template>
            </modal>
        </transition>

        <!-- 62050
        <section class="section catalog-view__section catalog-view__seo">
            <div class="container catalog-view__seo-container">
                <h2 class="catalog-view__section-hl catalog-view__seo-hl">Блок SEO текста</h2>
                <v-expander class="catalog-view__seo-text" :min-height="80" has-mask>
                    Помада L'Oreal Paris Color Riche — это первый матовый тинт для губ с ультранасыщенным цветом,
                    который абсолютно не ощущается на губах. Выбери из 10 модных оттенков те, которые тебе по душе. Эта
                    помада не оставит тебя равнодушной. Экспериментируй и наслаждайся, а Color Riche поможет тебе в
                    этом. Мы заботимся о надёжных поставщиках, качестве товаров и безопасной оплате. А что делать вам?
                    Просто наслаждаться покупками. Для экономии не нужен повод, поэтому мы каждый день даём вам скидки
                    на популярные товары самых разных категорий.
                    <template v-slot:btn="{ isExpanded }">{{ isExpanded ? 'Скрыть' : 'Показать больше' }}</template>
                </v-expander>
            </div>
        </section> -->
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VButton from '@controls/VButton/VButton.vue';
import VCheck from '@controls/VCheck/VCheck.vue';
import VPagination from '@controls/VPagination/VPagination.vue';
import VRange from '@controls/VRange/VRange.vue';
import VSelect from '@controls/VSelect/VSelect.vue';
import VSticky from '@controls/VSticky/VSticky.vue';
import VExpander from '@controls/VExpander/VExpander.vue';
import VSidebar from '@controls/VSidebar/VSidebar.vue';
import Modal from '@controls/modal/modal.vue';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '@components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';

import FilterButton from '@components/FilterButton/FilterButton.vue';
import TagItem from '@components/TagItem/TagItem.vue';
import CategoryTreeItem from '@components/CategoryTreeItem/CategoryTreeItem.vue';
import CatalogFilter from '@components/CatalogFilter/CatalogFilter.vue';
import CatalogBannerCard from '@components/CatalogBannerCard/CatalogBannerCard.vue';
import CatalogProductList from '@components/CatalogProductList/CatalogProductList.vue';
import ShowMoreButton from '@components/ShowMoreButton/ShowMoreButton.vue';

import _debounce from 'lodash/debounce';
import { mapState, mapActions, mapGetters } from 'vuex';
import { $store, $progress, $logger, $retailRocket } from '@services';

import { SCROLL } from '@store';

import { NAME as CART_MODULE } from '@store/modules/Cart';
import { ADD_CART_ITEM } from '@store/modules/Cart/actions';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import catalogModule, {
    NAME as CATALOG_MODULE,
    TYPE,
    ITEMS,
    BANNER,
    CATEGORIES,
    PRODUCT_GROUP,
    RANGE,
} from '@store/modules/Catalog';
import { SET_LOAD_PATH, FETCH_CATALOG_DATA } from '@store/modules/Catalog/actions';
import {
    ACTIVE_TAGS,
    ACTIVE_CATEGORY,
    ACTIVE_PAGE,
    PAGES_COUNT,
    ROUTE_SEGMENTS,
    BREADCRUMBS,
} from '@store/modules/Catalog/getters';

import { pluralize } from '@util';
import { concatCatalogRoutePath, generateCategoryUrl, mapFilterSegments, computeFilterData } from '@util/catalog';
import { generatePictureSourcePath } from '@util/file';
import { registerModuleIfNotExists } from '@util/store';
import { createNotFoundRoute } from '@util/router';
import { productGroupTypes } from '@enums/product';
import { sortFields } from '@enums/catalog';
import { sortDirections, fileExtension, httpCodes } from '@enums';
import { MIN_SCROLL_VALUE } from '@constants';

import '@plugins/sticky';
import '@images/sprites/cross-small.svg';
import '@images/sprites/home.svg';
import './Catalog.css';

export default {
    name: 'catalog',

    components: {
        VSvg,
        VButton,
        VSelect,
        VPagination,
        VSticky,
        VSidebar,
        VExpander,
        Modal,

        Breadcrumbs,
        BreadcrumbItem,
        FilterButton,
        TagItem,
        CategoryTreeItem,
        CatalogFilter,
        CatalogProductList,
        CatalogBannerCard,
        ShowMoreButton,
    },

    data() {
        const sortOptions = [
            {
                id: 1,
                title: 'По релевантности',
                field: sortFields.RELEVANCE,
                direction: sortDirections.DESC,
            },
            { id: 2, title: 'Популярное', field: sortFields.POPULARITY, direction: sortDirections.DESC },
            { id: 3, title: 'Сначала подороже', field: sortFields.PRICE, direction: sortDirections.DESC },
            { id: 4, title: 'Сначала подешевле', field: sortFields.PRICE, direction: sortDirections.ASC },
            { id: 5, title: 'Новинки', field: sortFields.NEW, direction: sortDirections.DESC },
            {
                id: 6,
                title: 'По размеру скидки',
                field: sortFields.DISCOUNT,
                direction: sortDirections.DESC,
            },
        ];

        return {
            sortValue: null,
            sortOptions: sortOptions,
            filterModal: false,
            showMore: false,
        };
    },

    computed: {
        ...mapState([SCROLL]),
        ...mapGetters(CATALOG_MODULE, [
            ACTIVE_TAGS,
            ACTIVE_CATEGORY,
            ACTIVE_PAGE,
            PAGES_COUNT,
            ROUTE_SEGMENTS,
            BREADCRUMBS,
        ]),
        ...mapState(CATALOG_MODULE, [ITEMS, BANNER, CATEGORIES, PRODUCT_GROUP, TYPE, RANGE]),
        ...mapState('route', {
            code: state => state.params.code,
            entityCode: state => state.params.entityCode,
            searchQuery: state => state.query.search_string,
        }),

        isBrandPage() {
            const { type } = this;
            return type === productGroupTypes.BRANDS;
        },

        isSearchPage() {
            const { type } = this;
            return type === productGroupTypes.SEARCH;
        },

        isFiltersPage() {
            return this.$route.path.includes('filters');
        },

        breadcrumbRootUrl() {
            const { type } = this;
            let name = '';

            switch (type) {
                case productGroupTypes.CATALOG:
                case productGroupTypes.NEW:
                case productGroupTypes.BESTSELLERS:
                    return { name: 'Catalog', params: { type } };
                case productGroupTypes.SEARCH:
                    return {
                        name: 'Catalog',
                        params: { type },
                        query: { search_string: this.$route.query.search_string },
                    };
                default:
                    return { name: 'ProductGroups', parmas: { type } };
            }
            return { name, params: { type } };
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        isTablet() {
            return this.$mq.tablet;
        },

        mobileImg() {
            const banner = this[PRODUCT_GROUP][BANNER] || {};
            const image = banner.mobileImage || banner.tabletImage || banner.desktopImage;
            if (image)
                return {
                    webp: generatePictureSourcePath(320, 240, image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(320, 240, image.id),
                };
        },

        tabletImg() {
            const banner = this[PRODUCT_GROUP][BANNER] || {};
            const image = banner.tabletImage || banner.desktopImage;
            if (image)
                return {
                    webp: generatePictureSourcePath(768, 240, image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(768, 240, image.id),
                };
        },

        desktopImg() {
            const banner = this[PRODUCT_GROUP][BANNER] || {};
            const image = banner.desktopImage || banner.tabletImage;
            if (image)
                return {
                    webp: generatePictureSourcePath(1224, 240, image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(1224, 240, image.id),
                };
        },

        defaultImg(item) {
            const banner = this[PRODUCT_GROUP][BANNER] || {};
            const image = banner.desktopImage || banner.tabletImage || banner.mobileImage;
            if (image) return generatePictureSourcePath(1224, 240, image.id);
        },

        clearFilterUrl() {
            const { type, entityCode, code } = this;
            return { path: generateCategoryUrl(type, entityCode, code), query: { ...this.$route.query } };
        },

        productName() {
            return pluralize(this.range, ['продукт', 'продукта', 'продуктов']);
        },

        searchTitle() {
            const { range, searchQuery } = this;
            if (range && searchQuery) return `По запросу «${searchQuery}» найдено ${range} продуктов`;
            else if (range && !searchQuery) return `По запросу найдено ${range} продуктов`;
            else return `По запросу «${searchQuery}» ничего не найдено`;
        },

        typeSortOptions() {
            const { type, sortOptions } = this;
            return sortOptions.filter(o => type === productGroupTypes.SEARCH || o.field !== sortFields.RELEVANCE);
        },
    },

    watch: {
        code(value) {
            const category = this[ACTIVE_CATEGORY];
            if (category) $retailRocket.addCategoryView(category.id);
        },

        sortValue(value, oldValue) {
            if (value !== oldValue) {
                this.$router.replace({
                    path: this.$route.path,
                    query: { ...this.$route.query, orderField: value.field, orderDirection: value.direction },
                });
            }
        },
    },

    methods: {
        ...mapActions(CATALOG_MODULE, [FETCH_CATALOG_DATA, SET_LOAD_PATH]),
        ...mapActions(CART_MODULE, [ADD_CART_ITEM]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        scrollTo(options) {
            if (!this.$isServer) window.scrollTo(options);
        },

        generateBreadcrumbUrl(categoryCode) {
            const { type, entityCode } = this;
            return { path: generateCategoryUrl(type, entityCode, categoryCode) };
        },

        setSortValue(field, direction) {
            const { typeSortOptions } = this;
            this.sortValue =
                typeSortOptions.find(o => o.field === field && o.direction === direction) || typeSortOptions[0];
        },

        onClickDeleteTag(value) {
            let { type, code, entityCode, routeSegments } = this;

            if (!routeSegments.includes(value)) return;
            else {
                const index = routeSegments.indexOf(value);
                if (index !== -1) routeSegments.splice(index, 1);
            }
            const path = concatCatalogRoutePath(type, entityCode, code, routeSegments);
            this.$router.replace({ path });
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
            this.$router.push({ path: this.$route.path, query: { ...this.$route.query, page } });
        },

        async fetchCatalog(to, from, next, showMore) {
            try {
                const {
                    params: { code: toCode, entityCode: toEntityCode, type: toType, pathMatch },
                    query: {
                        page = 1,
                        orderField = toType === productGroupTypes.SEARCH ? sortFields.RELEVANCE : sortFields.POPULARITY,
                        orderDirection = sortDirections.DESC,
                        search_string = null,
                    },
                } = to;

                const encodeSearchString =
                    search_string && toType === productGroupTypes.SEARCH ? encodeURI(search_string) : undefined;

                const {
                    params: { code: fromCode, entityCode: fromEntityCode, type: fromType },
                } = from;

                const { query: { page: fromPage = 1 } = { page: 1 } } = from;
                const { filter, routeSegments, filterSegments } = computeFilterData(
                    pathMatch,
                    toCode,
                    encodeSearchString
                );

                if (!showMore && page !== fromPage)
                    this.scrollTo({
                        top: this.$refs.catalogHeader.offsetHeight,
                        behavior: 'smooth',
                    });

                this.$progress.start();
                await this[FETCH_CATALOG_DATA]({
                    type: toType,
                    entityCode: toEntityCode,
                    code: toCode,

                    filter,
                    routeSegments,
                    filterSegments,

                    page,
                    orderField,
                    orderDirection,
                    showMore,
                });

                this.setSortValue(orderField, orderDirection);
                this.$progress.finish();
                next();

                if (showMore) setTimeout(() => (this.showMore = false), 200);
            } catch (thrown) {
                if (thrown && thrown.isCancel === true) return;
                this.$progress.fail();
            }
        },
    },

    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        const {
            fullPath,
            params: { code: toCode = null, entityCode: toEntityCode = null, type: toType, pathMatch },
            query: {
                page = 1,
                orderField = toType === productGroupTypes.SEARCH ? sortFields.RELEVANCE : sortFields.POPULARITY,
                orderDirection = sortDirections.DESC,
                search_string,
            } = {
                page: 1,
                orderField: sortFields.POPULARITY,
                orderDirection: sortDirections.DESC,
            },
        } = to;

        // Если у нас нет поисковой строки, либо продуктовая группа !== search, ничего искать не нужно
        const encodeSearchString =
            search_string && toType === productGroupTypes.SEARCH ? encodeURI(search_string) : undefined;

        const { loadPath, categoryCode, entityCode, type } = $store.state[CATALOG_MODULE];

        // если все загружено, пропускаем
        if (loadPath === fullPath && toType === type && toCode === categoryCode && toEntityCode === entityCode)
            next(vm => vm.setSortValue(orderField, orderDirection));
        else {
            const { filter, routeSegments, filterSegments } = computeFilterData(pathMatch, toCode, encodeSearchString);

            $progress.start();
            $store
                .dispatch(`${CATALOG_MODULE}/${FETCH_CATALOG_DATA}`, {
                    type: toType,
                    entityCode: toEntityCode,
                    code: toCode,

                    filter,
                    routeSegments,
                    filterSegments,

                    page,
                    orderField,
                    orderDirection,
                })
                .then(data => {
                    $store.dispatch(`${CATALOG_MODULE}/${SET_LOAD_PATH}`, fullPath);
                    next(vm => {
                        $progress.finish();
                        vm.setSortValue(orderField, orderDirection);

                        if (vm[SCROLL])
                            vm.scrollTo({
                                top: MIN_SCROLL_VALUE + 1,
                                behavior: 'smooth',
                            });
                    });
                })
                .catch(thrown => {
                    if (thrown && thrown.isCancel === true) return next();

                    $progress.fail();
                    if (thrown && thrown.status === httpCodes.NOT_FOUND) return next(createNotFoundRoute(to));
                    else next();
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

        const {
            params: { code: toCode, entityCode: toEntityCode, type: toType, pathMatch: toPathMatch },
            query: {
                page: toPage = 1,
                orderField: toOrderField = sortFields.POPULARITY,
                orderDirection: toOrderDirection = sortDirections.DESC,
                search_string: to_search_string,
            },
        } = to;

        // Если у нас нет поисковой строки, либо продуктовая группа !== search, ничего искать не нужно
        const encodeSearchString =
            to_search_string && toType === productGroupTypes.SEARCH ? encodeURI(to_search_string) : undefined;

        const { filter, routeSegments, filterSegments } = computeFilterData(toPathMatch, toCode, encodeSearchString);

        const {
            params: { code: fromCode, entityCode: fromEntityCode, type: fromType, pathMatch: fromPathMatch },
            query: {
                page: fromPage = 1,
                orderField: fromOrderField = sortFields.POPULARITY,
                orderDirection: fromOrderDirection = sortDirections.DESC,
                search_string: from_search_string,
            },
        } = from;

        if (
            toType === fromType &&
            toEntityCode === fromEntityCode &&
            toCode === fromCode &&
            toPathMatch === fromPathMatch &&
            toPage === fromPage &&
            toOrderField === fromOrderField &&
            toOrderDirection === fromOrderDirection &&
            to_search_string === from_search_string
        )
            return next();

        if (this.showMore) {
            this.fetchCatalog(to, from, next, this.showMore);
        } else this.debounce_fetchCatalog(to, from, next);
    },

    beforeRouteLeave(to, from, next) {
        // При уходе с роута отменяем запрос
        this.debounce_fetchCatalog.cancel();
        next();
    },

    beforeMount() {
        const category = this[ACTIVE_CATEGORY] || null;
        if (category) $retailRocket.addCategoryView(category.id);
        this.debounce_fetchCatalog = _debounce(this.fetchCatalog, 500);
    },

    created() {
        this.productGroupTypes = productGroupTypes;
    },
};
</script>
