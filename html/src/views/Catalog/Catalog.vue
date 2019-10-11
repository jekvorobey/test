<template>
    <section class="section catalog-view">
        <div class="container">
            <ul class="section catalog-view__breadcrumbs">
                <li>Губная помада</li>
            </ul>
        </div>
        <section class="section catalog-view__header">
            <div class="container">
                <h1 class="catalog-view__header-hl">Губная помада</h1>
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
                        @leave="onLeaveItems"
                        appear
                    >
                        <li
                            class="catalog-view__main-grid-item"
                            :data-index="index"
                            v-for="(product, index) in items"
                            :key="product.id"
                        >
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
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import VSvg from '../../components/controls/VSvg/VSvg.vue';
import CatalogFilter from '../../components/CatalogFilter/CatalogFilter.vue';
import CatalogProductCard from '../../components/CatalogProductCard/CatalogProductCard.vue';
import VSelect from '../../components/controls/VSelect/VSelect.vue';

import '../../plugins/velocity';
import catalogModule, { ITEMS } from '../../store/modules/Catalog';
import { ACTIVE_TAGS } from '../../store/modules/Catalog/getters';
import { FETCH_ITEMS, FETCH_CATALOG_DATA } from '../../store/modules/Catalog/actions';
import { mapState, mapActions, mapGetters } from 'vuex';
import { $store, $progress, $logger } from '../../services/ServiceLocator';

import '../../assets/images/sprites/cross-small.svg';
import './Catalog.css';

export const DISPATCH_FETCH_CATALOG_DATA = `${catalogModule.name}/${FETCH_CATALOG_DATA}`;

export default {
    name: 'catalog',
    components: {
        VSvg,
        VSelect,

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
        ...mapGetters(catalogModule.name, [ACTIVE_TAGS]),
        ...mapState(catalogModule.name, [ITEMS]),
        ...mapState('route', {
            code: state => state.params.code,
        }),
    },

    methods: {
        ...mapActions(catalogModule.name, [FETCH_ITEMS]),

        onBeforeEnterItems(el) {
            requestAnimationFrame(() => {
                el.style.opacity = 0;
            });
        },

        onEnterItems(el, done) {
            const delay = el.dataset.index * 150;
            setTimeout(() => {
                this.$velocity(el, { opacity: 1 }, { complete: done });
            }, delay);
        },

        onLeaveItems(el, done) {
            requestAnimationFrame(() => {
                el.style.opacity = 0;
                done();
            });
        },

        onClickDeleteTag(value) {
            let {
                path,
                params: { pathMatch },
            } = this.$route;
            const filterSegment = 'filters';
            const segments = pathMatch ? pathMatch.split('/') : [];

            if (!path.includes(value)) return;
            else {
                const index = segments.indexOf(value);
                if (index !== -1) segments.splice(index, 1);
                if (segments.length === 1) segments.splice(0, 1);
            }

            path = `/catalog/${this.code}`.concat(...segments.map(s => `/${s}`));
            this.$router.replace({ path });
        },
    },

    beforeRouteEnter(to, from, next) {
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
            // если нет - фетчим
            $progress.start();
            $store.dispatch(DISPATCH_FETCH_CATALOG_DATA, { code }).then(() => next(vm => $progress.finish()));
        }
    },

    beforeRouteUpdate(to, from, next) {
        // вызывается когда маршрут, что рендерит этот компонент изменился,
        // но этот компонент будет повторно использован в новом маршруте.
        // Например, для маршрута с динамическими параметрами `/foo/:id`, когда мы
        // перемещаемся между `/foo/1` и `/foo/2`, экземпляр того же компонента `Foo`
        // будет использован повторно, и этот хук будет вызван когда это случится.
        // Также имеется доступ в `this` к экземпляру компонента.

        const {
            params: { code },
        } = to;

        const { categoryCode } = $store.state.catalog;

        if (categoryCode === code) next();
        else {
            this.$progress.start();
            this.FETCH_ITEMS({ code }).then(() => {
                this.$progress.finish();
                next();
            });
        }
    },
};
</script>
