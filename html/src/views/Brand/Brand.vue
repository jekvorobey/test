<template>
    <section class="section brand-view">
        <div class="container">
            <ul class="section brand-view__breadcrumbs">
                <li>Губная помада</li>
            </ul>
        </div>
        <section class="section brand-view__header">
            <div class="container">
                <h1 class="brand-view__header-hl">{{ activeCategory ? activeCategory.name : 'Каталог' }}</h1>
                <p class="text-grey brand-view__header-text">489 товаров</p>
            </div>
        </section>
        <section class="section">
            <div class="container brand-view__grid">
                <div class="brand-view__side-panel">
                    <catalog-filter class="brand-view__side-panel-filters" />
                </div>
                <div class="brand-view__main">
                    <transition-group tag="ul" class="brand-view__main-tags" name="tag-item">
                        <li
                            :data-index="index"
                            class="brand-view__main-tags-item"
                            v-for="(tag, index) in activeTags"
                            :key="tag.code"
                        >
                            {{ tag.name }}&nbsp;
                            <button class="brand-view__main-tags-delete-btn" @click="onClickDeleteTag(tag.code)">
                                <v-svg name="cross-small" width="24" height="24" />
                            </button>
                        </li>
                    </transition-group>
                    <v-select
                        class="brand-view__main-sort"
                        v-model="sortValue"
                        :options="sortOptions"
                        :searchable="false"
                        :allowEmpty="false"
                    />
                    <transition-group
                        tag="ul"
                        class="brand-view__main-grid"
                        name="catalog-item"
                        @before-enter="onBeforeEnterItems"
                        @enter="onEnterItems"
                        @after-enter="onAfterEnterItems"
                        @leave="onLeaveItems"
                    >
                        <li class="brand-view__main-grid-item" v-for="product in items" :key="product.id">
                            <catalog-product-card
                                class="brand-view__main-grid-card"
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
                    <div class="brand-view__main-controls" v-if="pagesCount > 1">
                        <v-button
                            v-if="activePage < pagesCount"
                            class="btn--outline brand-view__main-controls-btn"
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

import brandModule, { ITEMS } from '../../store/modules/Brand';
import { ACTIVE_TAGS, ACTIVE_CATEGORY, ACTIVE_PAGE, PAGES_COUNT } from '../../store/modules/Brand/getters';
import { FETCH_ITEMS, FETCH_CATALOG_DATA } from '../../store/modules/Brand/actions';
import { mapState, mapActions, mapGetters } from 'vuex';
import { $store, $progress, $logger } from '../../services/ServiceLocator';

import _debounce from 'lodash/debounce';
import '../../assets/images/sprites/cross-small.svg';
import './Brand.css';

export const DISPATCH_FETCH_CATALOG_DATA = `${brandModule.name}/${FETCH_CATALOG_DATA}`;

const itemAnimationDelayDelta = 100;
let counter = 0;

export default {
    name: 'brand',
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
        ...mapGetters(brandModule.name, [ACTIVE_TAGS, ACTIVE_CATEGORY, ACTIVE_PAGE, PAGES_COUNT]),
        ...mapState(brandModule.name, [ITEMS]),
        ...mapState('route', {
            brandCode: state => state.params.brandCode,
            code: state => state.params.code,
        }),
    },

    methods: {
        ...mapActions(brandModule.name, [FETCH_ITEMS, FETCH_CATALOG_DATA]),

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
            let { path } = this.$route;
            const segments = path.split('/').slice(4);

            if (!segments.includes(value)) return;
            else {
                const index = segments.indexOf(value);
                if (index !== -1) segments.splice(index, 1);
            }

            const basePath =
                segments.length > 0
                    ? `/brand/${this.brandCode}/${this.code}/filters`
                    : `/brand/${this.brandCode}/${this.code}`;
            this.$router.replace({ path: basePath.concat(...segments.map(s => `/${s}`)) });
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
        const register = !!$store._modulesNamespaceMap[`${brandModule.name}/`];
        if (!register)
            $store.registerModule(brandModule.name, brandModule, {
                preserveState: !!$store.state.brand,
            });

        const { categoryCode } = $store.state.brand;

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
                const { categoryCode } = this.$store.state.brand;
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
