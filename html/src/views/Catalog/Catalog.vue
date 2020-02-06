<template>
    <section class="section catalog-view">
        <div class="container catalog-view__header">
            <breadcrumbs class="catalog-view__breadcrumbs">
                <breadcrumb-item key="main" to="/">
                    Главная
                </breadcrumb-item>
                <breadcrumb-item :key="type" :to="breadcrumbRootUrl">
                    {{ $t(`productGroups.title.${type}`) }}
                </breadcrumb-item>
                <breadcrumb-item v-if="entityCode" :key="entityCode" :to="generateBreadcrumbUrl(null)">
                    {{ productGroup && productGroup.name }}
                </breadcrumb-item>
                <breadcrumb-item
                    v-for="category in activeCategories"
                    :key="category.id"
                    :to="generateBreadcrumbUrl(category.code)"
                >
                    {{ category.name }}
                </breadcrumb-item>
            </breadcrumbs>

            <catalog-banner-card
                v-if="entityCode && productGroup"
                class="catalog-view__brand"
                :banner-id="productGroup.id"
                :bottom-text="productGroup.description"
                :title="productGroup.name"
                :image="productGroup.image"
            />

            <catalog-banner-card
                v-else
                class="catalog-view__banner"
                :banner-id="banner.id"
                :image="banner.image"
                :upper-text="banner.upperText"
                :bottom-text="banner.bottomText"
                :title="banner.title"
                :btn-text="banner.btnText"
            />
        </div>
        <section class="section">
            <div class="container catalog-view__grid">
                <div class="catalog-view__side-panel" v-if="!isTabletLg">
                    <ul class="catalog-view__side-panel-categories">
                        <category-tree-item
                            class="catalog-view__side-panel-categories-item"
                            v-for="category in categories"
                            :item="category"
                            :key="category.id"
                        />
                    </ul>
                    <catalog-filter class="catalog-view__side-panel-filters" />
                </div>
                <div class="catalog-view__main">
                    <div class="catalog-view__main-header">
                        <div class="catalog-view__main-header-title">
                            <h1 class="catalog-view__main-header-hl">
                                {{ activeCategory ? activeCategory.name : 'Все категории' }}
                            </h1>
                            <p class="text-grey catalog-view__main-header-text">489 продуктов</p>
                        </div>

                        <v-select
                            class="catalog-view__main-header-sort"
                            label="title"
                            track-by="id"
                            v-model="sortValue"
                            :options="sortOptions"
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

                    <catalog-product-list class="catalog-view__main-grid" :animation="!isTablet" />

                    <div class="catalog-view__main-controls" v-if="pagesCount > 1">
                        <v-button
                            v-if="activePage < pagesCount"
                            class="btn--outline catalog-view__main-controls-btn"
                            @click="onShowMore"
                            :disabled="showMore"
                        >
                            Показать ещё
                        </v-button>
                        <v-pagination :value="activePage" :page-count="pagesCount" @input="onPageChanged" />
                    </div>
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
                    </v-sticky>
                </template>
            </modal>
        </transition>

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

                    <template v-slot:btn="{ isExpanded }">
                        {{ isExpanded ? 'Скрыть' : 'Показать больше' }}
                    </template>
                </v-expander>
            </div>
        </section>

        <transition name="fade-in">
            <quick-view-modal v-if="isQuickViewOpen && !isTabletLg" />
            <add-to-cart-modal v-else-if="isAddToCartOpen" />
        </transition>
    </section>
</template>

<script>
import VSvg from '../../components/controls/VSvg/VSvg.vue';
import VButton from '../../components/controls/VButton/VButton.vue';
import VCheck from '../../components/controls/VCheck/VCheck.vue';
import VPagination from '../../components/controls/VPagination/VPagination.vue';
import VRange from '../../components/controls/VRange/VRange.vue';
import VSelect from '../../components/controls/VSelect/VSelect.vue';
import VSticky from '../../components/controls/VSticky/VSticky.vue';
import VExpander from '../../components/VExpander/VExpander.vue';
import Modal from '../../components/controls/modal/modal.vue';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '../../components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';

import FilterButton from '../../components/FilterButton/FilterButton.vue';
import TagItem from '../../components/TagItem/TagItem.vue';
import CategoryTreeItem from '../../components/CategoryTreeItem/CategoryTreeItem.vue';
import CatalogFilter from '../../components/CatalogFilter/CatalogFilter.vue';
import CatalogBannerCard from '../../components/CatalogBannerCard/CatalogBannerCard.vue';
import CatalogProductList from '../../components/CatalogProductList/CatalogProductList.vue';

import QuickViewModal, { NAME as QUICK_VIEW_MODAL_NAME } from '../../components/QuickViewModal/QuickViewModal.vue';
import AddToCartModal, { NAME as ADD_TO_CART_MODAL_NAME } from '../../components/AddToCartModal/AddToCartModal.vue';

import { $store, $progress, $logger } from '../../services/ServiceLocator';
import { mapState, mapActions, mapGetters } from 'vuex';

import { NAME as CART_MODULE } from '../../store/modules/Cart';
import { ADD_CART_ITEM } from '../../store/modules/Cart/actions';

import { NAME as MODAL_MODULE, MODALS } from '../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../store/modules/Modal/actions';

import catalogModule, {
    NAME as CATALOG_MODULE,
    ITEMS,
    BANNER,
    CATEGORIES,
    PRODUCT_GROUP,
} from '../../store/modules/Catalog';
import { FETCH_ITEMS, SET_LOAD_PATH, FETCH_DATA_BY_TYPE } from '../../store/modules/Catalog/actions';
import {
    ACTIVE_TAGS,
    ACTIVE_CATEGORY,
    ACTIVE_PAGE,
    PAGES_COUNT,
    ROUTE_SEGMENTS,
    ACTIVE_CATEGORIES,
} from '../../store/modules/Catalog/getters';

import { concatCatalogRoutePath, generateCategoryUrl, mapFilterSegments, computeFilterData } from '../../util/catalog';
import { registerModuleIfNotExists } from '../../util/store';
import { MIN_SCROLL_VALUE, productGroupTypes } from '../../assets/scripts/constants';
import _debounce from 'lodash/debounce';
import '../../assets/images/sprites/cross-small.svg';
import './Catalog.css';

export default {
    name: 'catalog',

    components: {
        VSvg,
        VButton,
        VSelect,
        VPagination,
        VSticky,
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

        AddToCartModal,
        QuickViewModal,
    },

    data() {
        const sortOptions = [
            { id: 1, title: 'Сначала подороже', field: 'price', direction: 'desc' },
            { id: 2, title: 'Сначала подешевле', field: 'price', direction: 'asc' },
            // { id: 3, title: 'Популярное', field: 'price', direction: 'desc' },
            // { id: 4, title: 'Новинки', field: '', direction: '' },
            // { id: 5, title: 'По размеру скидки', field: '', direction: '' },
            // { id: 6, title: 'С высоким рейтингом', field: '', direction: '' },
        ];
        return {
            sortValue: sortOptions[0],
            sortOptions,
            filterModal: false,
            showMore: false,
        };
    },

    computed: {
        ...mapGetters(CATALOG_MODULE, [
            ACTIVE_TAGS,
            ACTIVE_CATEGORY,
            ACTIVE_PAGE,
            PAGES_COUNT,
            ROUTE_SEGMENTS,
            ACTIVE_CATEGORIES,
        ]),
        ...mapState(CATALOG_MODULE, [ITEMS, BANNER, CATEGORIES, PRODUCT_GROUP]),
        ...mapState(MODAL_MODULE, {
            isQuickViewOpen: state => state[MODALS][QUICK_VIEW_MODAL_NAME] && state[MODALS][QUICK_VIEW_MODAL_NAME].open,
            isAddToCartOpen: state =>
                state[MODALS][ADD_TO_CART_MODAL_NAME] && state[MODALS][ADD_TO_CART_MODAL_NAME].open,
        }),
        ...mapState('route', {
            type: state => state.params.type,
            code: state => state.params.code,
            entityCode: state => state.params.entityCode,
        }),

        breadcrumbRootUrl() {
            const { type } = this;
            return { name: type === productGroupTypes.CATALOG ? 'Catalog' : 'ProductGroups', params: { type } };
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    watch: {
        sortValue(value, oldValue) {
            if (value !== oldValue) {
                this.$router.replace({
                    path: this.$route.path,
                    query: { orderField: value.field, orderDirection: value.direction },
                });
            }
        },
    },

    methods: {
        ...mapActions(CATALOG_MODULE, [FETCH_ITEMS, FETCH_DATA_BY_TYPE, SET_LOAD_PATH]),
        ...mapActions(CART_MODULE, [ADD_CART_ITEM]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        generateBreadcrumbUrl(categoryCode) {
            const { type, entityCode } = this;
            return { path: generateCategoryUrl(type, entityCode, categoryCode) };
        },

        setSortValue(field, direction) {
            this.sortValue =
                this.sortOptions.find(o => o.field === field && o.direction === direction) || this.sortOptions[0];
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

        async fetchCatalog(to, from, showMore) {
            try {
                const {
                    params: { code: toCode, entityCode: toEntityCode, type: toType, pathMatch },
                    query: { page = 1, orderField = 'price', orderDirection = 'desc' } = {
                        page: 1,
                        orderField: 'price',
                        orderDirection: 'desc',
                    },
                } = to;

                const {
                    params: { code: fromCode, entityCode: fromEntityCode, type: fromType },
                } = from;

                const { query: { page: fromPage = 1 } = { page: 1 } } = from;
                const filter = computeFilterData(pathMatch, toCode);

                this.$progress.start();
                if (toType === fromType && toCode === fromCode && toEntityCode === fromEntityCode)
                    await this[FETCH_ITEMS]({ filter, orderField, orderDirection, page, showMore });
                else
                    await this[FETCH_DATA_BY_TYPE]({
                        type: toType,
                        entityCode: toEntityCode,
                        filter,
                        orderField,
                        orderDirection,
                        page,
                    });

                this.setSortValue(orderField, orderDirection);
                this.$progress.finish();

                if (!showMore && page !== fromPage)
                    window.scrollTo({
                        top: MIN_SCROLL_VALUE + 1,
                        behavior: 'smooth',
                    });

                if (showMore) setTimeout(() => (this.showMore = false), 200);
            } catch (error) {
                this.$progress.fail();
                $logger.error('fetchCatalog', error);
                this.$progress.finish();
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
            query: { page = 1, orderField = 'price', orderDirection = 'desc' } = {
                page: 1,
                orderField: 'price',
                orderDirection: 'desc',
            },
        } = to;

        // регистрируем модуль, если такого нет
        registerModuleIfNotExists($store, CATALOG_MODULE, catalogModule);
        const { loadPath, categoryCode, entityCode, type } = $store.state[CATALOG_MODULE];

        // если все загружено, пропускаем
        if (loadPath === fullPath && toType === type && toCode === categoryCode && toEntityCode === entityCode) next();
        else {
            const filter = computeFilterData(pathMatch, toCode);
            let fetchMethod = null;
            if (toType === type && toCode === categoryCode && toEntityCode === entityCode)
                fetchMethod = `${CATALOG_MODULE}/${FETCH_ITEMS}`;
            else fetchMethod = `${CATALOG_MODULE}/${FETCH_DATA_BY_TYPE}`;

            $progress.start();
            $store
                .dispatch(fetchMethod, {
                    type: toType,
                    entityCode: toEntityCode,
                    filter,
                    page,
                    orderField,
                    orderDirection,
                })
                .then(() => {
                    $store.dispatch(`${CATALOG_MODULE}/${SET_LOAD_PATH}`, fullPath);
                    next(vm => {
                        vm.setSortValue(orderField, orderDirection);
                        $progress.finish();
                    });
                })
                .catch(error => {
                    $progress.fail();
                    $logger.error('beforeRouteEnter', error);
                    $progress.finish();
                    next();
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

        if (this.showMore) {
            this.fetchCatalog(to, from, this.showMore);
        } else this.debounce_fetchCatalog(to, from);
        next();
    },

    beforeRouteLeave(to, from, next) {
        // При уходе с роута отменяем запрос
        this.debounce_fetchCatalog.cancel();
        next();
    },

    beforeMount() {
        this.debounce_fetchCatalog = _debounce(this.fetchCatalog, 500);
    },
};
</script>
