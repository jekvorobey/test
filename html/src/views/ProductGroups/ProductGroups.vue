<template>
    <section class="section product-groups-view">
        <div class="container">
            <breadcrumbs class="product-groups-view__breadcrumbs">
                <breadcrumb-item key="main" to="/">
                    Главная
                </breadcrumb-item>
                <breadcrumb-item key="sets" :to="{ path: $route.path }">
                    {{ $t(`productGroups.title.${type}`) }}
                </breadcrumb-item>
            </breadcrumbs>
        </div>

        <template v-if="showList">
            <categories-section class="brands-view__categories" :categories="categories" />

            <separator-section class="brands-view__separator" />

            <section class="section brands-view__section">
                <div class="container">
                    <h1 class="brands-view__section-hl">{{ $t(`productGroups.title.${type}`) }}</h1>
                    <group-list class="brands-view__brands" :items="brandsCatalog" :columns="columns" />
                </div>
            </section>
        </template>

        <section v-else class="section product-groups-view__section product-groups-view__sets">
            <h1 class="container product-groups-view__section-hl">{{ $t(`productGroups.title.${type}`) }}</h1>
            <div class="container product-groups-view__sets-container">
                <ul class="product-groups-view__sets-list">
                    <banner-card
                        class="product-groups-view__sets-list-item"
                        tag="li"
                        v-for="item in items"
                        :key="item.id"
                        :title="item.name"
                        :image="item.image"
                        :to="`/${type}/${item.code}`"
                        button-text="Смотреть товары"
                    />
                </ul>

                <div class="product-groups-view__sets-controls" v-if="pagesCount > 1">
                    <v-button
                        v-if="activePage < pagesCount"
                        class="btn--outline product-groups-view__sets-controls-btn"
                        @click="onShowMore"
                    >
                        Показать ещё
                    </v-button>
                    <v-pagination :value="activePage" :page-count="pagesCount" @input="onPageChanged" />
                </div>
            </div>
        </section>

        <section class="section product-groups-view__section product-groups-view__seo">
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
        </section>
    </section>
</template>

<script>
import VButton from '../../components/controls/VButton/VButton.vue';
import VPagination from '../../components/controls/VPagination/VPagination.vue';
import VExpander from '../../components/VExpander/VExpander.vue';

import BannerCard from '../../components/BannerCard/BannerCard.vue';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '../../components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';

import GroupList from '../../components/GroupList/GroupList.vue';
import SeparatorSection from '../../components/blocks/SeparatorSection/SeparatorSection.vue';
import CategoriesSection from '../../components/blocks/CategoriesSection/CategoriesSection.vue';

import { $store, $progress, $logger } from '../../services/ServiceLocator';

import { mapState, mapGetters, mapActions } from 'vuex';
import { CATEGORIES } from '../../store';
import productGroupsModule, {
    NAME as PRODUCT_GROUPS_MODULE,
    ITEMS,
    LOAD_PATH,
    TYPE,
} from '../../store/modules/ProductGroups';
import { BRANDS_CATALOG } from '../../store/modules/ProductGroups/getters';
import { FETCH_ITEMS, SET_LOAD_PATH, SET_TYPE } from '../../store/modules/ProductGroups/actions';

import { productGroupTypes } from '../../assets/scripts/enums';
import { registerModuleIfNotExists } from '../../util/store';
import _debounce from 'lodash/debounce';
import './ProductGroups.css';

export default {
    name: 'product-groups',

    components: {
        VButton,
        VPagination,
        VExpander,

        BannerCard,

        Breadcrumbs,
        BreadcrumbItem,

        GroupList,
        SeparatorSection,
        CategoriesSection,
    },

    data() {
        return {
            activePage: 0,
            pagesCount: 10,
        };
    },

    computed: {
        ...mapState([CATEGORIES]),
        ...mapState(PRODUCT_GROUPS_MODULE, [ITEMS, TYPE]),
        ...mapGetters(PRODUCT_GROUPS_MODULE, [BRANDS_CATALOG]),

        showList() {
            return this[TYPE] === productGroupTypes.BRANDS;
        },

        columns() {
            if (this.isTablet) return 2;
            return this.isTabletLg ? 3 : 6;
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

        onShowMore() {
            this.activePage += 1;
        },

        onPageChanged(page) {
            this.activePage = page;
        },

        async fetchCatalog(to, from, showMore) {
            try {
                const {
                    params: { type, page },
                } = to;

                const {
                    params: { page: fromPage },
                } = from;

                this.$progress.start();
                await this[FETCH_ITEMS]({ type, page });
                this.$progress.finish();

                if (!showMore && page !== fromPage)
                    window.scrollTo({
                        top: MIN_SCROLL_VALUE + 1,
                        behavior: 'smooth',
                    });

                if (showMore) setTimeout(() => (this.showMore = false), 200);
            } catch (error) {
                this.$progress.fail();
                $logger.error('debounce_fetchCatalog', error);
                this.$router.replace({ name: '404' });
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
            params: { type: toType, page },
        } = to;

        // регистрируем модуль, если такого нет
        registerModuleIfNotExists($store, PRODUCT_GROUPS_MODULE, productGroupsModule);
        const { loadPath, type } = $store.state[PRODUCT_GROUPS_MODULE];

        // если все загружено, пропускаем
        if (loadPath === fullPath && type === toType) next();
        else {
            $progress.start();
            $store
                .dispatch(`${PRODUCT_GROUPS_MODULE}/${FETCH_ITEMS}`, { type: toType, page })
                .then(() => {
                    $store.dispatch(`${PRODUCT_GROUPS_MODULE}/${SET_LOAD_PATH}`, fullPath);
                    next(vm => {
                        $progress.finish();
                    });
                })
                .catch(error => {
                    next(vm => {
                        $progress.fail();
                        $progress.finish();
                    });
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

    beforeMount() {
        this.debounce_fetchCatalog = _debounce(this.fetchCatalog, 500);
    },
};
</script>
