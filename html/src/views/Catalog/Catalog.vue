<template>
    <section class="section catalog-view">
        <div class="container catalog-view__header">
            <transition-group tag="ol" class="section catalog-view__breadcrumbs" name="fade-in">
                <li class="catalog-view__breadcrumbs-item" key="main">
                    <router-link class="catalog-view__breadcrumbs-link" to="/">
                        Главная
                    </router-link>
                </li>

                <li class="catalog-view__breadcrumbs-item" key="all">
                    <router-link class="catalog-view__breadcrumbs-link" to="/catalog">
                        Каталог
                    </router-link>
                </li>

                <li class="catalog-view__breadcrumbs-item" v-for="category in activeCategories" :key="category.id">
                    <router-link class="catalog-view__breadcrumbs-link" :to="`/catalog/${category.code}`">
                        {{ category.name }}
                    </router-link>
                </li>
            </transition-group>

            <catalog-banner-card
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
                <div class="catalog-view__side-panel">
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
                                {{ activeCategory ? activeCategory.name : 'Каталог' }}
                            </h1>
                            <p class="text-grey catalog-view__main-header-text">489 товаров</p>
                        </div>
                        <v-select
                            class="catalog-view__main-header-sort"
                            v-model="sortValue"
                            label="title"
                            track-by="id"
                            :options="sortOptions"
                            :searchable="false"
                            :allow-empty="false"
                        />

                        <v-button class="catalog-view__main-header-btn" @click="filterModal = !filterModal">
                            <span>
                                Фильтр и сортировка&nbsp;&nbsp;
                                <span class="text-grey">{{ activeTags.length }}</span>
                            </span>
                            <v-svg id="catalog-filter-icon" name="filter" width="18" height="14" />
                        </v-button>
                    </div>

                    <transition-group tag="ul" class="catalog-view__main-tags" name="tag-item">
                        <li
                            :data-index="index"
                            class="catalog-view__main-tags-item"
                            v-for="(tag, index) in activeTags"
                            :key="tag.code"
                        >
                            {{ tag.name }}&nbsp;
                            <button class="catalog-view__main-tags-delete-btn" @click="onClickDeleteTag(tag.code)">
                                <v-svg name="cross-small" width="10" height="10" />
                            </button>
                        </li>
                    </transition-group>

                    <transition-group
                        tag="ul"
                        class="catalog-view__main-grid"
                        name="catalog-item"
                        @before-enter="onBeforeEnterItems"
                        @enter="onEnterItems"
                        @after-enter="onAfterEnterItems"
                        @leave="onLeaveItems"
                    >
                        <li
                            class="catalog-view__main-grid-item"
                            v-for="item in items"
                            :key="`${item.id}-${item.type}`"
                            :class="{ [`catalog-view__main-grid-item--${item.type}`]: item.type }"
                        >
                            <catalog-product-card
                                v-if="item.type === 'product'"
                                class="catalog-view__main-grid-card"
                                :product-id="item.id"
                                :name="item.name"
                                :type="item.type"
                                :href="`/catalog/${item.categoryCodes[item.categoryCodes.length - 1]}/${item.code}`"
                                :image="item.image"
                                :price="item.price"
                                :old-price="item.oldPrice"
                                :tags="item.tags"
                                :rating="item.rating"
                                @addItem="ADD_CART_ITEM({ offerId: item.id })"
                            />
                            <catalog-banner-card
                                v-else-if="item.type === 'banner'"
                                class="catalog-view__main-grid-card"
                                :banner-id="item.id"
                                :title="item.title"
                                :image="item.image"
                                :upper-text="item.upperText"
                                :btn-text="item.btnText"
                            />
                        </li>
                    </transition-group>
                    <div class="catalog-view__main-controls" v-if="pagesCount > 1">
                        <v-button
                            v-if="activePage < pagesCount"
                            class="btn--outline catalog-view__main-controls-btn"
                            @click="onShowMore"
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
                                    :key="item"
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
import Modal from '../../components/controls/modal/modal.vue';

import CategoryTreeItem from '../../components/CategoryTreeItem/CategoryTreeItem.vue';
import CatalogFilter from '../../components/CatalogFilter/CatalogFilter.vue';
import CatalogProductCard from '../../components/CatalogProductCard/CatalogProductCard.vue';
import CatalogBannerCard from '../../components/CatalogBannerCard/CatalogBannerCard.vue';

import { $store, $progress, $logger } from '../../services/ServiceLocator';
import { concatCatalogRoutePath } from '../../util/catalog';
import { mapState, mapActions, mapGetters } from 'vuex';

import { NAME as CART_MODULE } from '../../store/modules/Cart';
import { ADD_CART_ITEM } from '../../store/modules/Cart/actions';

import catalogModule, { NAME as CATALOG_MODULE, ITEMS, BANNER, CATEGORIES } from '../../store/modules/Catalog';
import { FETCH_ITEMS, FETCH_CATALOG_DATA, SET_LOAD } from '../../store/modules/Catalog/actions';
import {
    ACTIVE_TAGS,
    ACTIVE_CATEGORY,
    ACTIVE_PAGE,
    PAGES_COUNT,
    ROUTE_SEGMENTS,
    ACTIVE_CATEGORIES,
} from '../../store/modules/Catalog/getters';

import _debounce from 'lodash/debounce';
import '../../assets/images/sprites/filter.svg';
import '../../assets/images/sprites/cross-small.svg';
import './Catalog.css';

const itemAnimationDelayDelta = 100;
let counter = 0;

export default {
    name: 'catalog',
    components: {
        VSvg,
        VButton,
        VSelect,
        VPagination,
        VSticky,
        Modal,

        CategoryTreeItem,
        CatalogFilter,
        CatalogProductCard,
        CatalogBannerCard,
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
        ...mapState(CATALOG_MODULE, [ITEMS, BANNER, CATEGORIES]),
        ...mapState('route', {
            code: state => state.params.code,
        }),

        isTabletLg() {
            return this.$mq.tabletLg;
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
        ...mapActions(CATALOG_MODULE, [FETCH_ITEMS, FETCH_CATALOG_DATA]),
        ...mapActions(CART_MODULE, [ADD_CART_ITEM]),

        setSortValue(field, direction) {
            this.sortValue =
                this.sortOptions.find(o => o.field === field && o.direction === direction) || this.sortOptions[0];
        },

        onBeforeEnterItems(el) {
            el.dataset.index = counter;
            counter += 1;
            el.style.opacity = 0;
        },

        itemAnimation(el, delay) {
            return new Promise((resolve, reject) => {
                try {
                    setTimeout(() => {
                        requestAnimationFrame(() => {
                            el.style.opacity = 1;
                            resolve();
                        });
                    }, delay);
                } catch (error) {
                    reject(error);
                }
            });
        },

        async onEnterItems(el, done) {
            const delay = el.dataset.index * itemAnimationDelayDelta;
            await this.itemAnimation(el, delay);
            done();
        },

        onAfterEnterItems(el) {
            delete el.dataset.index;
            counter = 0;
        },

        onLeaveItems(el, done) {
            requestAnimationFrame(() => {
                el.style.opacity = 0;
                done();
            });
        },

        onClickDeleteTag(value) {
            let { routeSegments, code } = this;

            if (!routeSegments.includes(value)) return;
            else {
                const index = routeSegments.indexOf(value);
                if (index !== -1) routeSegments.splice(index, 1);
            }

            this.$router.replace({ path: concatCatalogRoutePath(code, routeSegments) });
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
                    params: { code },
                    query: { page = 1, orderField = 'price', orderDirection = 'desc' } = {
                        page: 1,
                        orderField: 'price',
                        orderDirection: 'desc',
                    },
                } = to;

                const filter = code && { category: code };
                this.$progress.start();
                await this[FETCH_ITEMS]({ filter, orderField, orderDirection, page, showMore });
                this.setSortValue(orderField, orderDirection);
                this.$progress.finish();
            } catch (error) {
                $logger.error('debounce_fetchCatalog', error);
                this.$progress.fail();
            }
        },
    },

    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        const {
            params: { code },
            query: { page = 1, orderField = 'price', orderDirection = 'desc' } = {
                page: 1,
                orderField: 'price',
                orderDirection: 'desc',
            },
        } = to;

        // регистрируем модуль, если такого нет
        const register = !!$store._modulesNamespaceMap[`${CATALOG_MODULE}/`];
        if (!register)
            $store.registerModule(CATALOG_MODULE, catalogModule, {
                preserveState: !!$store.state.catalog,
            });

        const { categoryCode, load } = $store.state.catalog;

        // если все загружено, пропускаем
        if (load && categoryCode === code) next(vm => vm.$store.dispatch(`${CATALOG_MODULE}/${SET_LOAD}`, false));
        else {
            // если нет - фетчим
            const filter = code && { category: code };

            $progress.start();
            $store
                .dispatch(`${CATALOG_MODULE}/${FETCH_CATALOG_DATA}`, { filter, page, orderField, orderDirection })
                .then(() =>
                    next(vm => {
                        vm.setSortValue(orderField, orderDirection);
                        $progress.finish();
                    })
                )
                .catch(error => {
                    $progress.fail();
                    $logger.error(error);
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
            this.showMore = false;
        } else this.debounce_fetchCatalog(to, from);
        next();
    },

    beforeMount() {
        this.debounce_fetchCatalog = _debounce(this.fetchCatalog, 500);
    },
};
</script>
