<template>
    <section class="section catalog-view">
        <div class="container">
            <ul class="section catalog-view__breadcrumbs">
                <li>Губная помада</li>
            </ul>
        </div>
        <section class="section catalog-view__header">
            <div class="container">
                <h1 class="catalog-view__header-hl">{{ activeCategory ? activeCategory.name : 'Каталог' }}</h1>
                <p class="text-grey catalog-view__header-text">489 товаров</p>
            </div>
        </section>
        <section class="section">
            <div class="container catalog-view__grid">
                <div class="catalog-view__side-panel">
                    <catalog-filter class="catalog-view__side-panel-filters" />
                </div>
                <div class="catalog-view__main">
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
                    <v-select
                        class="catalog-view__main-sort"
                        v-model="sortValue"
                        :options="sortOptions"
                        :searchable="false"
                        :allowEmpty="false"
                    />
                    <transition-group
                        tag="ul"
                        class="catalog-view__main-grid"
                        name="catalog-item"
                        @before-enter="onBeforeEnterItems"
                        @enter="onEnterItems"
                        @after-enter="onAfterEnterItems"
                        @leave="onLeaveItems"
                    >
                        <li class="catalog-view__main-grid-item" v-for="product in items" :key="product.id">
                            <catalog-product-card
                                class="catalog-view__main-grid-card"
                                :product-id="product.id"
                                :name="product.name"
                                :href="product.href"
                                :image="product.image"
                                :price="product.price"
                                :old-price="product.oldPrice"
                                :tags="product.tags"
                                :rating="product.rating"
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

import { concatCatalogRoutePath } from '../../util/catalog';
import catalogModule, { ITEMS } from '../../store/modules/Catalog';
import {
    ACTIVE_TAGS,
    ACTIVE_CATEGORY,
    ACTIVE_PAGE,
    PAGES_COUNT,
    ROUTE_SEGMENTS,
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
    },

    data() {
        const sortOptions = ['Сначала подороже'];
        return {
            sortValue: sortOptions[0],
            sortOptions,
        };
    },

    computed: {
        ...mapGetters(catalogModule.name, [ACTIVE_TAGS, ACTIVE_CATEGORY, ACTIVE_PAGE, PAGES_COUNT, ROUTE_SEGMENTS]),
        ...mapState(catalogModule.name, [ITEMS]),
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
