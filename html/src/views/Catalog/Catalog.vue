<template>
    <section class="section catalog-view">
        <div class="container catalog-view__header">
            <transition-group tag="ol" class="section catalog-view__breadcrumbs" name="fade-in">
                <li class="catalog-view__breadcrumbs-item" key="main">
                    <router-link to="/">{{ 'Главная' }}</router-link>
                </li>

                <li class="catalog-view__breadcrumbs-item" key="all">
                    <router-link to="/catalog">{{ 'Каталог' }}</router-link>
                </li>

                <li class="catalog-view__breadcrumbs-item" v-for="category in activeCategories" :key="category.id">
                    <router-link :to="`/catalog/${category.code}`">{{ category.name }}</router-link>
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
                            :options="sortOptions"
                            :searchable="false"
                            :allowEmpty="false"
                        />
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
                                <v-svg name="cross-small" width="24" height="24" />
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
                                :href="`/catalog${activeCategory ? `/${activeCategory.code}` : ''}/${item.code}`"
                                :image="item.image"
                                :price="item.price"
                                :old-price="item.oldPrice"
                                :tags="item.tags"
                                :rating="item.rating"
                            />
                            <catalog-banner-card
                                v-if="item.type === 'banner'"
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
                            :to="{ path: $route.path, query: { page: activePage + 1 } }"
                        >
                            Показать ещё
                        </v-button>
                        <v-pagination
                            :value="activePage"
                            :page-count="pagesCount"
                            @input="$router.push({ path: $route.path, query: { page: $event } })"
                        />
                    </div>
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import VSvg from '../../components/controls/VSvg/VSvg.vue';
import VButton from '../../components/controls/VButton/VButton.vue';
import VCheck from '../../components/controls/VCheck/VCheck.vue';
import VPagination from '../../components/controls/VPagination/VPagination.vue';
import VRange from '../../components/controls/VRange/VRange.vue';
import VSelect from '../../components/controls/VSelect/VSelect.vue';

import CatalogFilter from '../../components/CatalogFilter/CatalogFilter.vue';
import CatalogProductCard from '../../components/CatalogProductCard/CatalogProductCard.vue';
import CatalogBannerCard from '../../components/CatalogBannerCard/CatalogBannerCard.vue';

import { concatCatalogRoutePath } from '../../util/catalog';
import catalogModule, { ITEMS, BANNER } from '../../store/modules/Catalog';
import {
    ACTIVE_TAGS,
    ACTIVE_CATEGORY,
    ACTIVE_PAGE,
    PAGES_COUNT,
    ROUTE_SEGMENTS,
    ACTIVE_CATEGORIES,
} from '../../store/modules/Catalog/getters';
import { FETCH_ITEMS, FETCH_CATALOG_DATA } from '../../store/modules/Catalog/actions';
import { mapState, mapActions, mapGetters } from 'vuex';
import { $store, $progress, $logger } from '../../services/ServiceLocator';

import _debounce from 'lodash/debounce';
import '../../assets/images/sprites/cross-small.svg';
import './Catalog.css';

export const DISPATCH_FETCH_CATALOG_DATA = `${catalogModule.name}/${FETCH_CATALOG_DATA}`;

const itemAnimationDelayDelta = 100;
let counter = 0;

export default {
    name: 'catalog',
    components: {
        VSvg,
        VButton,
        VSelect,
        VPagination,

        CatalogFilter,
        CatalogProductCard,
        CatalogBannerCard,
    },

    data() {
        const sortOptions = ['Сначала подороже'];
        return {
            sortValue: sortOptions[0],
            sortOptions,
        };
    },

    computed: {
        ...mapGetters(catalogModule.name, [
            ACTIVE_TAGS,
            ACTIVE_CATEGORY,
            ACTIVE_PAGE,
            PAGES_COUNT,
            ROUTE_SEGMENTS,
            ACTIVE_CATEGORIES,
        ]),
        ...mapState(catalogModule.name, [ITEMS, BANNER]),
        ...mapState('route', {
            code: state => state.params.code,
        }),
    },

    methods: {
        ...mapActions(catalogModule.name, [FETCH_ITEMS, FETCH_CATALOG_DATA]),

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
    },

    async beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        const {
            params: { code },
        } = to;

        // регистрируем модуль, если такого нет
        const register = !!$store._modulesNamespaceMap[`${catalogModule.name}/`];
        if (!register)
            $store.registerModule(catalogModule.name, catalogModule, {
                preserveState: !!$store.state.catalog,
            });

        const { categoryCode } = $store.state.catalog;

        // если все загружено, пропускаем
        if (categoryCode === code) next();
        else {
            try {
                // если нет - фетчим
                $progress.start();
                await $store.dispatch(DISPATCH_FETCH_CATALOG_DATA, { code });
                next(vm => $progress.finish());
            } catch (error) {
                $progress.fail();
                $logger.error(error);
            }
        }
    },

    beforeRouteUpdate(to, from, next) {
        // вызывается, когда маршрут, что рендерит этот компонент, изменился,
        // но этот компонент будет повторно использован в новом маршруте.
        // Например, для маршрута с динамическими параметрами `/foo/:id`, когда мы
        // перемещаемся между `/foo/1` и `/foo/2`, экземпляр того же компонента `Foo`
        // будет использован повторно, и этот хук будет вызван когда это случится.
        // Также имеется доступ в `this` к экземпляру компонента.

        this.debounce_fetchCatalog(to, from);
        next();
    },

    beforeMount() {
        this.debounce_fetchCatalog = _debounce(async (to, from) => {
            try {
                const { categoryCode } = this.$store.state.catalog;
                const {
                    params: { code },
                } = to;

                this.$progress.start();

                if (categoryCode !== code) await this[FETCH_CATALOG_DATA]({ code });
                else await this[FETCH_ITEMS]({ code });

                this.$progress.finish();
            } catch (error) {
                $logger.error('debounce_fetchCatalog', error);
                this.$progress.fail();
            }
        }, 500);
    },
};
</script>
