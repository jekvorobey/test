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
                    <catalog-filter />
                </div>
                <div class="catalog-view__main">
                    <ul class="catalog-view__main-tags">
                        <li class="catalog-view__main-tags-item">
                            L’Oreal Paris&nbsp;<v-svg name="cross-small" width="24" height="24" />
                        </li>
                        <li class="catalog-view__main-tags-item">
                            Pupa&nbsp;<v-svg name="cross-small" width="24" height="24" />
                        </li>
                        <li class="catalog-view__main-tags-item">
                            Maybelline&nbsp;<v-svg name="cross-small" width="24" height="24" />
                        </li>
                        <li class="catalog-view__main-tags-item">
                            Vivienne Sabo&nbsp;<v-svg name="cross-small" width="24" height="24" />
                        </li>
                        <li class="catalog-view__main-tags-item">
                            L’Oreal Paris&nbsp;<v-svg name="cross-small" width="24" height="24" />
                        </li>
                        <li class="catalog-view__main-tags-item">
                            Pupa&nbsp;<v-svg name="cross-small" width="24" height="24" />
                        </li>
                        <li class="catalog-view__main-tags-item">
                            Maybelline&nbsp;<v-svg name="cross-small" width="24" height="24" />
                        </li>
                        <li class="catalog-view__main-tags-item">
                            Vivienne Sabo&nbsp;<v-svg name="cross-small" width="24" height="24" />
                        </li>
                    </ul>
                    <v-select
                        class="catalog-view__main-sort"
                        v-model="sortValue"
                        :options="sortOptions"
                        :searchable="false"
                        :allowEmpty="false"
                    />
                    <transition-group tag="ul" name="item" class="catalog-view__main-grid" appear>
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
                </div>
            </div>
        </section>
    </section>
</template>

<script>
import VSvg from '../../components/controls/VSvg/VSvg.vue';
import VSelect from '../../components/controls/VSelect/VSelect.vue';
import CatalogFilter from '../../components/CatalogFilter/CatalogFilter.vue';
import CatalogProductCard from '../../components/CatalogProductCard/CatalogProductCard.vue';

import catalogModule, { ITEMS } from '../../store/modules/Catalog';
import { FETCH_ITEMS, FETCH_CATALOG_DATA } from '../../store/modules/Catalog/actions';
import { $store, $progress, $logger } from '../../services/ServiceLocator';
import { mapState, mapActions } from 'vuex';
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
        ...mapState(catalogModule.name, [ITEMS]),
    },

    methods: {
        ...mapActions(catalogModule.name, [FETCH_ITEMS]),
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
