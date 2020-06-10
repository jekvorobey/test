<template>
    <section class="section masterclasses-view">
        <div class="container masterclasses-view__header">
            <breadcrumbs class="container container--tablet-lg masterclasses-view__breadcrumbs">
                <breadcrumb-item key="main" to="/">
                    Главная
                </breadcrumb-item>
                <breadcrumb-item key="masterclasses" :to="{ path: $route.path }">
                    {{ $t('masterclasses.title') }}
                </breadcrumb-item>
            </breadcrumbs>

            <section class="section masterclasses-view__banners">
                <v-slider class="masterclasses-view__banners-slider" name="masterClasses" :options="sliderOptions">
                    <master-class-banner-card
                        class="swiper-slide masterclasses-view__banners-slider-item"
                        v-for="item in masterclassBanners"
                        :key="item.id"
                        :name="item.name"
                        :image="item.image"
                        :price="item.price"
                        :author="item.author"
                        :description="item.date"
                        :to="generateMasterclassUrl(item.code)"
                        show-btn
                    />
                </v-slider>
            </section>
        </div>

        <section class="section masterclasses-view__section masterclasses-view__sets">
            <h1 class="container masterclasses-view__section-hl">
                {{ $t('masterclasses.title') }}
            </h1>
            <div class="container masterclasses-view__sets-container">
                <ul class="masterclasses-view__sets-list">
                    <master-class-card
                        class="masterclasses-view__sets-list-item"
                        v-for="item in masterclasses"
                        :key="item.id"
                        v-bind="item"
                        :to="generateMasterclassUrl(item.code)"
                        is-small
                    />
                </ul>

                <div class="masterclasses-view__sets-controls" v-if="pagesCount > 1">
                    <show-more-button
                        v-if="activePage < pagesCount"
                        btn-class="btn--outline masterclasses-view__sets-controls-btn"
                        @click="onShowMore"
                        :show-preloader="showMore"
                    >
                        Показать ещё
                    </show-more-button>
                    <v-pagination :value="activePage" :page-count="pagesCount" @input="onPageChanged" />
                </div>
            </div>
        </section>

        <section class="section masterclasses-view__section masterclasses-view__seo">
            <div class="container masterclasses-view__seo-container">
                <h2 class="masterclasses-view__section-hl masterclasses-view__seo-hl">Блок SEO текста</h2>
                <v-expander class="masterclasses-view__seo-text" :min-height="80" has-mask>
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
import VButton from '@controls/VButton/VButton.vue';
import VPagination from '@controls/VPagination/VPagination.vue';
import VExpander from '@controls/VExpander/VExpander.vue';

import MasterClassCard from '@components/MasterClassCard/MasterClassCard.vue';
import MasterClassBannerCard from '@components/MasterClassBannerCard/MasterClassBannerCard.vue';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '@components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';

import SeparatorSection from '@components/blocks/SeparatorSection/SeparatorSection.vue';
import VSlider from '@controls/VSlider/VSlider.vue';
import CategoriesSection from '@components/blocks/CategoriesSection/CategoriesSection.vue';
import ShowMoreButton from '@components/ShowMoreButton/ShowMoreButton.vue';

import { $store, $progress, $logger } from '@services';

import { mapState, mapGetters, mapActions } from 'vuex';
import { CATEGORIES, SCROLL } from '@store';
import productGroupsModule, {
    NAME as PRODUCT_GROUPS_MODULE,
    ITEMS,
    LOAD_PATH,
    TYPE,
} from '@store/modules/ProductGroups';
import { BRANDS_CATALOG, ACTIVE_PAGE, PAGES_COUNT } from '@store/modules/ProductGroups/getters';
import { FETCH_ITEMS, SET_LOAD_PATH, SET_TYPE } from '@store/modules/ProductGroups/actions';

import { productGroupTypes } from '@enums/product';
import { MIN_SCROLL_VALUE } from '@constants';
import { registerModuleIfNotExists } from '@util/store';
import { generateMasterclassUrl } from '@util/catalog';
import _debounce from 'lodash/debounce';
import './Masterclasses.css';

import profileMasterClassImg1 from '@images/mock/profileMasterClass1.png';
import profileMasterClassImg2 from '@images/mock/profileMasterClass2.png';
import profileMasterClassImg3 from '@images/mock/profileMasterClass3.png';
import profileMasterClassImg4 from '@images/mock/profileMasterClass4.png';

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

    components: {
        VButton,
        VPagination,
        VExpander,
        VSlider,

        MasterClassCard,
        MasterClassBannerCard,

        Breadcrumbs,
        BreadcrumbItem,

        SeparatorSection,
        CategoriesSection,
        ShowMoreButton,
    },

    data() {
        return {
            showMore: false,
            masterclassBanners: [
                {
                    id: 1,
                    name: 'Свадебный стилист',
                    date: '3 сентября (пт), 12:00',
                    author: 'Владимир Перельман',
                    image: profileMasterClassImg1,
                    code: 'code1',
                    price: {
                        value: 5000,
                        currency: 'RUB',
                    },
                },
                {
                    id: 2,
                    name: 'Модные косы',
                    date: '4 сентября (пт), 12:00',
                    author: 'Владимир Перельман',
                    image: profileMasterClassImg2,
                    code: 'code2',
                    price: {
                        value: 6000,
                        currency: 'RUB',
                    },
                },
                {
                    id: 3,
                    name: 'Пучки и хвосты',
                    date: '5 сентября (пт), 12:00',
                    author: 'Владимир Перельман',
                    image: profileMasterClassImg3,
                    code: 'code3',

                    price: {
                        value: 2000,
                        currency: 'RUB',
                    },
                },
                {
                    id: 4,
                    name: 'Цвет под ключ',
                    date: '8 сентября (пт), 12:00',
                    author: 'Владимир Перельман',
                    image: profileMasterClassImg4,
                    code: 'code4',
                    price: {
                        value: 4000,
                        currency: 'RUB',
                    },
                },
            ],

            masterclasses: [
                {
                    id: 1,
                    name: 'Свадебный стилист',
                    date: '3 сентября (пт), 12:00',
                    address: 'Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1',
                    image: profileMasterClassImg1,
                    code: 'code1',
                    price: {
                        value: 5000,
                        currency: 'RUB',
                    },
                },
                {
                    id: 2,
                    name: 'Модные косы',
                    date: '4 сентября (пт), 12:00',
                    address: 'Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1',
                    image: profileMasterClassImg2,
                    code: 'code2',
                    price: {
                        value: 6000,
                        currency: 'RUB',
                    },
                },
                {
                    id: 3,
                    name: 'Пучки и хвосты',
                    date: '5 сентября (пт), 12:00',
                    address: 'Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1',
                    image: profileMasterClassImg3,
                    code: 'code3',
                    price: {
                        value: 2000,
                        currency: 'RUB',
                    },
                },
                {
                    id: 4,
                    name: 'Цвет под ключ',
                    date: '8 сентября (пт), 12:00',
                    address: 'Artplay, г. Москва, Нижняя Сыромятническая ул., 10, этаж 1',
                    image: profileMasterClassImg4,
                    code: 'code4',
                    price: {
                        value: 4000,
                        currency: 'RUB',
                    },
                },
            ],
        };
    },

    computed: {
        ...mapState([CATEGORIES, SCROLL]),
        ...mapState(PRODUCT_GROUPS_MODULE, [ITEMS, TYPE]),
        ...mapGetters(PRODUCT_GROUPS_MODULE, [BRANDS_CATALOG, ACTIVE_PAGE, PAGES_COUNT]),

        columns() {
            if (this.isTablet) return 2;
            return this.isTabletLg ? 3 : 6;
        },

        sliderOptions() {
            return sliderOptions;
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

        generateMasterclassUrl(code) {
            return generateMasterclassUrl(code);
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
                    fullPath,
                    params: { type: toType },
                    query: { page = 1, orderField = 'name' },
                } = to;

                const {
                    params: { type: fromType },
                    query: { page: fromPage = 1 },
                } = from;

                // для брендов нам нужны сразу все страницы
                const fetchPage = toType === productGroupTypes.BRANDS ? undefined : page;
                this.$progress.start();
                await this[FETCH_ITEMS]({ type: toType, page: fetchPage, orderField, showMore });
                this.$progress.finish();

                if (!showMore && this[SCROLL] && (toType !== fromType || page !== fromPage))
                    window.scrollTo({
                        top: MIN_SCROLL_VALUE + 1,
                        behavior: 'smooth',
                    });

                if (showMore) setTimeout(() => (this.showMore = false), 200);
            } catch (error) {
                $logger.error(error);
                this.$progress.fail();
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
            params: { type: toType },
            query: { page = 1, orderField = 'name' },
        } = to;

        // регистрируем модуль, если такого нет
        registerModuleIfNotExists($store, PRODUCT_GROUPS_MODULE, productGroupsModule);
        const { loadPath, type } = $store.state[PRODUCT_GROUPS_MODULE];

        // если все загружено, пропускаем
        if (loadPath === fullPath && type === toType)
            next(vm => {
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
                .dispatch(`${PRODUCT_GROUPS_MODULE}/${FETCH_ITEMS}`, { type: toType, page: fetchPage, orderField })
                .then(() => {
                    $store.dispatch(`${PRODUCT_GROUPS_MODULE}/${SET_LOAD_PATH}`, fullPath);
                    next(vm => {
                        $progress.finish();
                        if (!vm.$isServer && vm[SCROLL]) {
                            window.scrollTo({
                                top: 0,
                            });
                        }
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
