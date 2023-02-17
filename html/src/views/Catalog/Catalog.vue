<template>
    <section class="section catalog-view">
        <div ref="catalogHeader" class="container catalog-view__header">
            <breadcrumbs class="container container--tablet-lg catalog-view__breadcrumbs">
                <breadcrumb-item key="main" to="/">
                    <v-svg v-if="isTablet" name="home" width="10" height="10" />
                    <span v-else>Главная</span></breadcrumb-item
                >
                <breadcrumb-item :key="type" :to="breadcrumbRootUrl">{{
                    $t(`productGroups.title.${type || 'catalog'}`)
                }}</breadcrumb-item>
                <breadcrumb-item v-if="entityCode" :key="entityCode" :to="breadcrumbEntityUrl">{{
                    productGroup && productGroup.name
                }}</breadcrumb-item>
                <breadcrumb-item
                    v-for="category in categoriesBreadcrumbs"
                    :key="category.id"
                    :to="category.url"
                    :disabled="category.disabled"
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

            <transition name="fade" mode="out-in">
                <remote-banner-placement
                    :type="bannerType.CATALOG_TOP"
                    :desktop-size="[1224, 240]"
                    :tablet-size="[975, 305]"
                    :mobile-size="[767, 575]"
                    class="catalog-view__banner"
                    watch-router
                />
            </transition>
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
                                :always-expanded="autoExpandCategoryMenu"
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
                            <h1 class="catalog-view__main-header-hl" v-if="activePage === 1 || isMounted">
                                {{ catalogTitle }}
                            </h1>
                            <p
                                class="text-grey catalog-view__main-header-text"
                                v-if="type !== productGroupTypes.SEARCH"
                            >
                                {{ rangeWithoutUnion }} {{ productName }}
                            </p>
                        </div>

                        <v-select
                            class="catalog-view__main-header-sort"
                            label="title"
                            track-by="id"
                            :value="sortValue"
                            :options="typeSortOptions"
                            :searchable="false"
                            :allow-empty="false"
                            :show-labels="false"
                            @input="onChangeSortValue"
                        />

                        <filter-button class="catalog-view__main-header-btn" @click="filterModal = !filterModal">
                            Фильтр и сортировка&nbsp;&nbsp;
                            <span class="text-grey">{{ activeTags.length }}</span>
                        </filter-button>
                    </div>

                    <transition-group tag="ul" class="catalog-view__main-tags" name="tag-item">
                        <tag-item
                            v-for="(tag, index) in activeTags"
                            :data-index="index"
                            :key="tag.code || tag.id"
                            :text="tag.name"
                            @delete="onClickDeleteTag(tag.segment)"
                        />
                    </transition-group>

                    <catalog-scroll-top
                            :show="onScrollTopShow"
                            @onScrollTop="onScrollTop"
                    />

                    <catalog-product-list
                        class="catalog-view__main-grid"
                        :key="type"
                        :items="items"
                        :animation="!isTablet"
                        :fullscreen="categories && categories.length === 0"
                        item-prop
                    />

                    <div
                        id="showMoreBlockID"
                        class="container containet--tablet catalog-view__main-controls mobile-pagination-padding"
                        v-if="pagesCount > 1"
                    >
                        <v-pagination
                                class="containet--tablet catalog-view__main-controls-pagination mb-20"
                                :value="activePage"
                                :page-count="pagesCount"
                                @input="onPageChanged"
                        />
                        <show-more-button
                            v-if="activePage < pagesCount"
                            btn-class="btn--outline catalog-view__main-controls-btn"
                            @click="onShowMore"
                            :show-preloader="showMore"
                        >
                            Показать все
                        </show-more-button>
                    </div>

                    <template v-if="isSearchPage">
                        <retail-rocket-container
                            v-if="range > 0"
                            data-retailrocket-markup-block="5f21668797a5282edc07d7c8"
                            :data-search-phrase="$route.query.search_string"
                            :data-auth="hasSession ? 'true' : 'false'"
                            :data-user-moderation="canBuy ? 'true' : 'false'"
                        />
                        <retail-rocket-container
                            v-else
                            data-retailrocket-markup-block="5f21669197a5282edc07d7c9"
                            :data-search-phrase="$route.query.search_string"
                            :data-auth="hasSession ? 'true' : 'false'"
                            :data-user-moderation="canBuy ? 'true' : 'false'"
                        />
                    </template>
                    <retail-rocket-container
                        v-else-if="isBrandPage"
                        data-retailrocket-markup-block="5efdc55a97a52833a0d00baa"
                        :data-vendor="entityCode"
                        :data-auth="hasSession ? 'true' : 'false'"
                        :data-user-moderation="canBuy ? 'true' : 'false'"
                    />
                    <retail-rocket-container
                        v-else
                        data-retailrocket-markup-block="5efda10697a52833a0d006df"
                        :data-category-id="activeCategory && activeCategory.id"
                        :data-auth="hasSession ? 'true' : 'false'"
                        :data-user-moderation="canBuy ? 'true' : 'false'"
                    />
                </div>
            </div>
        </section>

        <section
            class="section catalog-view__section catalog-view__history"
            v-if="showRecentlyViewed && recentlyViewed && recentlyViewed.length > 0"
        >
            <div class="container catalog-view__history-container">
                <h2 class="container container--tablet-lg catalog-view__section-hl catalog-view__history-hl">
                    {{ $t('product.title.history') }}
                </h2>

                <history-panel class="catalog-view__history-panel" :items="recentlyViewed" />
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
                                    v-for="item in typeSortOptions"
                                    :key="item.title"
                                >
                                    <button
                                        class="catalog-view__modal-filter-sort-btn"
                                        @click="onChangeSortValue(item)"
                                    >
                                        {{ item.title }}
                                    </button>
                                </li>
                            </ul>
                        </div>

                        <mobile-category-filter
                            v-if="showMobileFilterCategories"
                            class="catalog-view__modal-category-filter"
                            :categories="filterCategories"
                            :product-group-type="type"
                            :product-entity-code="entityCode"
                        />

                        <catalog-filter class="catalog-view__modal-filter-panel" />

                        <div class="catalog-view__modal-filter-controls">
                            <v-button
                                class="btn--outline catalog-view__modal-filter-clear-btn"
                                :to="clearFilterUrl"
                                replace
                            >
                                Очистить
                            </v-button>
                            <v-button :loading="isFiltersLoading" class="catalog-view__modal-filter-close-btn" @click="filterModal = !filterModal">
                                Показать {{ rangeWithoutUnion }}
                            </v-button>
                        </div>
                    </v-sticky>
                </template>
            </modal>
        </transition>

        <section
            v-if="brandSeoDescription.length > 10 && activePage === 1"
            class="section catalog-view__section catalog-view__seo"
        >
            <div class="container catalog-view__seo-container">
                <h2 class="catalog-view__section-hl catalog-view__seo-hl">О бренде {{ catalogTitle }}</h2>
                <div class="catalog-view__seo-text" v-html="brandSeoDescription" />
            </div>
        </section>
    </section>
</template>

<script>
    import VSvg from '@controls/VSvg/VSvg.vue';
    import VButton from '@controls/VButton/VButton.vue';
    import VPagination from '@controls/VPagination/VPagination.vue';
    import VSelect from '@controls/VSelect/VSelect.vue';
    import VSticky from '@controls/VSticky/VSticky.vue';
    import VSidebar from '@controls/VSidebar/VSidebar.vue';
    import Modal from '@controls/modal/modal.vue';
    import CatalogScrollTop from "@components/CatalogScrollTop/CatalogScrollTop.vue";
    import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs.vue';
    import BreadcrumbItem from '@components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';

    import CatalogBannerCard from '@components/CatalogBannerCard/CatalogBannerCard.vue';

    import FilterButton from '@components/FilterButton/FilterButton.vue';
    import TagItem from '@components/TagItem/TagItem.vue';
    import CategoryTreeItem from '@components/CategoryTreeItem/CategoryTreeItem.vue';
    import CatalogFilter from '@components/CatalogFilter/CatalogFilter.vue';
    import MobileCategoryFilter from '@components/MobileCategoryFilter/MobileCategoryFilter.vue';
    import CatalogProductList from '@components/CatalogProductList/CatalogProductList.vue';
    import ShowMoreButton from '@components/ShowMoreButton/ShowMoreButton.vue';
    import HistoryPanel from '@components/HistoryPanel/HistoryPanel.vue';

    import _debounce from 'lodash/debounce';
    import {mapActions, mapGetters, mapState} from 'vuex';
    import {$progress, $retailRocket, $store} from '@services';
    import {ProductsBuilder, seoEvents} from '@services/SeoEventsService';

    import {RECENTLY_VIEWED_PRODUCTS, SCROLL} from '@store';
    import {FETCH_RECENTLY_VIEWED_PRODUCTS} from '@store/actions';

    import {NAME as CART_MODULE} from '@store/modules/Cart';
    import {ADD_CART_ITEM} from '@store/modules/Cart/actions';

    import {NAME as MODAL_MODULE} from '@store/modules/Modal';
    import {MODAL_SHOW_COUNT} from '@store/modules/Modal/getters';
    import {CHANGE_MODAL_STATE, SAVE_MODAL_OPENING_HISTORY} from '@store/modules/Modal/actions';

    import {
        BANNER,
        CATEGORIES,
        CATEGORY_CODE,
        ENTITY_CODE,
        ITEMS,
        NAME as CATALOG_MODULE,
        PRODUCT_GROUP,
        RANGE,
        RANGE_WITHOUT_UNION,
        TYPE,
    } from '@store/modules/Catalog';
    import {FETCH_CATALOG_DATA, REFRESH_CATALOG_DATA, SET_LOAD_PATH} from '@store/modules/Catalog/actions';
    import {CAN_BUY, HAS_SESSION, NAME as AUTH_MODULE, USER} from '@store/modules/Auth';
    import {
        ACTIVE_CATEGORY,
        ACTIVE_PAGE,
        ACTIVE_TAGS,
        BREADCRUMBS,
        PAGES_COUNT,
        ROUTE_SEGMENTS,
    } from '@store/modules/Catalog/getters';

    import {convertObjectToMetaProperties, pluralize} from '@util';
    import {
        computeFilterData,
        concatCatalogRoutePath,
        generateCategoryUrl,
        generateProductGroupUrl,
        generateProductUrl,
        generateSearchUrl,
    } from '@util/catalog';
    import {generateFileOriginalPath, generatePictureSourcePath, getImageType} from '@util/file';
    import {createNotFoundRoute} from '@util/router';
    import {productGroupTypes} from '@enums/product';
    import {sortFields} from '@enums/catalog';
    import {bannerType, fileExtension, httpCodes, modalName, sortDirections} from '@enums';
    import {DEFAULT_PAGE, MIN_SCROLL_VALUE} from '@constants';
    import metaMixin from '@plugins/meta';

    import '@plugins/sticky';
    import '@images/sprites/cross-small.svg';
    import '@images/sprites/home.svg';
    import './Catalog.css';
    import RetailRocketContainer from '@components/RetailRocketContainer/RetailRocketContainer.vue';
    import RemoteBannerPlacement from '@components/RemoteBanner/RemoteBannerPlacement.vue';

    export default {
    name: 'catalog',
    mixins: [metaMixin],

    components: {
        RemoteBannerPlacement,
        MobileCategoryFilter,
        RetailRocketContainer,
        VSvg,
        VButton,
        VSelect,
        VPagination,
        VSticky,
        VSidebar,
        Modal,
        CatalogScrollTop,

        Breadcrumbs,
        BreadcrumbItem,
        CatalogBannerCard,
        FilterButton,
        TagItem,
        CategoryTreeItem,
        CatalogFilter,
        CatalogProductList,
        ShowMoreButton,
        HistoryPanel,
    },

    metaInfo() {
        const { activePage, metaData, productGroup } = this;
        const { title, description, url, image, imageType } = metaData;
        const metaNoIndex = productGroup && productGroup.brand && productGroup.brand.is_visible === 0;

        return {
            title: activePage > 1 ? `${title} – страница ${activePage}` : title,
            meta: convertObjectToMetaProperties({
                description,
                'og:title': title,
                'og:type': 'website',
                'og:url': url,
                'og:image': image,
                'og:image:url': image,
                'og:image:type': imageType,
                'og:site_name': 'Бессовестно талантливый',
                'og:description': description || 'Mаркетплейс для мастеров бьюти-индустрии'
            }, metaNoIndex)
        };
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
            { id: 3, title: 'Сначала дороже', field: sortFields.PRICE, direction: sortDirections.DESC },
            { id: 4, title: 'Сначала дешевле', field: sortFields.PRICE, direction: sortDirections.ASC },
            { id: 5, title: 'Новинки', field: sortFields.NEW, direction: sortDirections.DESC },
            {
                id: 6,
                title: 'По размеру скидки',
                field: sortFields.DISCOUNT,
                direction: sortDirections.DESC,
            },
        ];

        return {
            onScrollTopShow: false,
            isMounted: false,
            sortValue: null,
            sortOptions: sortOptions,
            filterModal: false,
            showMore: false,
            isFiltersLoading: false,

            bannerType: bannerType,
            professionalDisclaimerInterval: null,
        };
    },

    computed: {
        ...mapState([SCROLL, RECENTLY_VIEWED_PRODUCTS]),
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapState(AUTH_MODULE, {
            [CAN_BUY]: (state) => (state[USER] && state[USER][CAN_BUY]) || false,
        }),
        ...mapGetters(CATALOG_MODULE, [
            ACTIVE_TAGS,
            ACTIVE_CATEGORY,
            ACTIVE_PAGE,
            PAGES_COUNT,
            ROUTE_SEGMENTS,
            BREADCRUMBS,
        ]),
        ...mapState(CATALOG_MODULE, [
            ITEMS,
            BANNER,
            CATEGORIES,
            PRODUCT_GROUP,
            TYPE,
            RANGE,
            RANGE_WITHOUT_UNION,
            ENTITY_CODE,
            CATEGORY_CODE,
        ]),
        ...mapState('route', {
            code: (state) => state.params.code,
            entityCode: (state) => state.params.entityCode,
            searchQuery: (state) => state.query.search_string,
        }),
        ...mapGetters(MODAL_MODULE, {
            modalShowCount: MODAL_SHOW_COUNT,
        }),

        professionalDisclaimerModalShowCount() {
            return this.modalShowCount(modalName.general.PROFESSIONAL_DISCLAIMER);
        },

        metaData() {
            let data = {
                title: '',
                description: '',
                url: '',
                image: '',
                imageType: '',
            };

            data.title = this.catalogTitle;

            if (
                this.type === productGroupTypes.CATALOG &&
                this.activeCategory &&
                this.activeCategory.meta_title !== null
            ) {
                data.title = this.activeCategory.meta_title;
            }

            if (
                this.type === productGroupTypes.CATALOG &&
                this.activeCategory &&
                this.activeCategory.meta_description !== null
            ) {
                data.description = this.activeCategory.meta_description;
            }

            if (!data.description && this.type === productGroupTypes.NEW) {
                data.description = 'Новинки маркетплейса для мастеров бьюти-индустрии';
            }

            if (!data.description && this.type === productGroupTypes.SETS) {
                data.description = this.catalogTitle;
            }

            data.url = generateCategoryUrl(this.type, this.entityCode, this.categoryCode, true);

            let internalImage = null;

            if (Array.isArray(this.items)) {
                for (const item of this.items) {
                    const { image } = item;

                    if (typeof item.image !== 'undefined' && typeof item.image.id !== 'undefined') {
                        internalImage = image;
                        break;
                    }
                }
            }

            if (internalImage !== null) {
                data.image = generateFileOriginalPath(internalImage.id);

                if (typeof internalImage.sourceExt !== 'undefined') {
                    data.imageType = getImageType(internalImage.sourceExt);
                }
            }

            return data;
        },

        showRecentlyViewed() {
            const { type } = this;

            switch (type) {
                case productGroupTypes.PROMO:
                case productGroupTypes.SETS:
                case productGroupTypes.BRANDS:
                    return false;
                default:
                    return true;
            }
        },

        recentlyViewed() {
            const items = this[RECENTLY_VIEWED_PRODUCTS] || [];
            return items.map((i) => {
                const { code, categoryCodes } = i;
                const categoryCode = categoryCodes && categoryCodes[categoryCodes.length - 1];

                return {
                    ...i,
                    url: categoryCode && generateProductUrl(categoryCode, code),
                };
            });
        },

        mobileImg() {
            const banner = this[PRODUCT_GROUP][BANNER] || {};
            const image = banner.mobileImage || banner.tabletImage || banner.desktopImage;
            return (
                image && {
                    webp: generatePictureSourcePath(320, 240, image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(320, 240, image.id),
                }
            );
        },

        tabletImg() {
            const banner = this[PRODUCT_GROUP][BANNER] || {};
            const image = banner.tabletImage || banner.desktopImage;
            return (
                image && {
                    webp: generatePictureSourcePath(768, 240, image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(768, 240, image.id),
                }
            );
        },

        desktopImg() {
            const banner = this[PRODUCT_GROUP][BANNER] || {};
            const image = banner.desktopImage || banner.tabletImage;
            return (
                image && {
                    webp: generatePictureSourcePath(1224, 240, image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(1224, 240, image.id),
                }
            );
        },

        defaultImg() {
            const banner = this[PRODUCT_GROUP][BANNER] || {};
            const image = banner.desktopImage || banner.tabletImage || banner.mobileImage;
            return image && generatePictureSourcePath(1224, 240, image.id);
        },

        clearFilterUrl() {
            const { type, entityCode, code } = this;
            const query = { ...this.$route.query };
            delete query.page;

            return {
                path: generateCategoryUrl(type, entityCode, code),
                query,
            };
        },

        productName() {
            return pluralize(this[RANGE_WITHOUT_UNION], ['продукт', 'продукта', 'продуктов']);
        },

        searchTitle() {
            const { rangeWithoutUnion, searchQuery } = this;
            if (rangeWithoutUnion && searchQuery)
                return `По запросу «${searchQuery}» найдено ${rangeWithoutUnion} продуктов`;
            else if (rangeWithoutUnion && !searchQuery) return `По запросу найдено ${rangeWithoutUnion} продуктов`;
            else return `По запросу «${searchQuery}» ничего не найдено`;
        },

        catalogTitle() {
            const { type, productGroup, activeCategory, searchTitle } = this;

            switch (type) {
                case productGroupTypes.SEARCH:
                    return searchTitle;
                case productGroupTypes.CATALOG:
                    return activeCategory ? activeCategory.name : 'Все категории';
                case productGroupTypes.PROMO:
                    if (activeCategory && typeof this.$route.params.code !== 'undefined') {
                        return activeCategory.name;
                    } else {
                        return productGroup && productGroup.name ? productGroup.name : 'Акция';
                    }
                default:
                    return activeCategory
                        ? activeCategory.name
                        : (productGroup && productGroup.name) || 'Все категории';
            }
        },

        categoriesBreadcrumbs() {
            const { type, entityCode } = this;
            const breadcrumbs = this[BREADCRUMBS] || [];
            return breadcrumbs.map((b) => ({ ...b, url: generateCategoryUrl(type, entityCode, b.code) }));
        },

        breadcrumbRootUrl() {
            const { type } = this;
            switch (type) {
                case productGroupTypes.SEARCH:
                    return generateSearchUrl(this.$route.query.search_string);
                default:
                    return generateProductGroupUrl(type);
            }
        },

        breadcrumbEntityUrl() {
            const { type, entityCode } = this;
            return generateCategoryUrl(type, entityCode);
        },

        typeSortOptions() {
            const { type, sortOptions } = this;
            return sortOptions.filter((o) => type === productGroupTypes.SEARCH || o.field !== sortFields.RELEVANCE);
        },

        filterCategories() {
            if (!this[ACTIVE_CATEGORY]) {
                return this[CATEGORIES];
            }

            if (this[ACTIVE_CATEGORY] && Array.isArray(this[ACTIVE_CATEGORY].items)) {
                return this[ACTIVE_CATEGORY].items;
            }

            return null;
        },

        showMobileFilterCategories() {
            const { type } = this;

            if (type === productGroupTypes.PROMO) {
                return this.filterCategories && this.filterCategories.length > 0;
            } else {
                return this.filterCategories && this.filterCategories.length > 1;
            }
        },

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

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        isTablet() {
            return this.$mq.tablet;
        },

        autoExpandCategoryMenu() {
            if (typeof this.$route.params.type !== 'undefined' && this.$route.params.type === 'brands') {
                return true;
            }

            return false;
        },

        brandSeoDescription() {
            if (
                this.isBrandPage &&
                typeof this[PRODUCT_GROUP]['brand'] !== 'undefined' &&
                typeof this[PRODUCT_GROUP]['brand']['description'] !== 'undefined' &&
                this[PRODUCT_GROUP]['brand']['description'].length > 0
            ) {
                return this[PRODUCT_GROUP]['brand']['description'];
            }

            return '';
        },
    },

    watch: {
        code() {
            const category = this[ACTIVE_CATEGORY];
            if (category) $retailRocket.addCategoryView(category.id);
        },

        [HAS_SESSION]() {
            this[REFRESH_CATALOG_DATA]();
        },

        [ITEMS]: {
            immediate: true,
            handler(newItems, oldItems) {
                const items = oldItems ? newItems.filter((item) => !oldItems.includes(item)) : newItems;
                if (items.length) {
                    const impressions = new ProductsBuilder().createForCatalogImpressions(items);
                    seoEvents.impressions(impressions);
                }
            },
        },

        professionalDisclaimerModalShowCount() {
            this.runProfessionalDisclaimerModalInterval();
        },
    },

    methods: {
        ...mapActions([FETCH_RECENTLY_VIEWED_PRODUCTS]),
        ...mapActions(CATALOG_MODULE, [FETCH_CATALOG_DATA, SET_LOAD_PATH, REFRESH_CATALOG_DATA]),
        ...mapActions(CART_MODULE, [ADD_CART_ITEM]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE, SAVE_MODAL_OPENING_HISTORY]),

        scrollTo(options) {
            if (!this.$isServer) window.scrollTo(options);
        },

        onScrollTop() {
            document.getElementById('app').scrollIntoView({ behavior: 'smooth' });
        },

        generateBreadcrumbUrl(categoryCode) {
            const { type, entityCode } = this;
            return { path: generateCategoryUrl(type, entityCode, categoryCode) };
        },

        setSortValue(field, direction) {
            const { typeSortOptions } = this;
            this.sortValue =
                typeSortOptions.find((o) => o.field === field && o.direction === direction) || typeSortOptions[0];
            this.onChangeSortValue(this.sortValue);
        },

        onChangeSortValue(value) {
            if (value) {
                const {
                    params: { type },
                    query: {
                        orderField = type === productGroupTypes.SEARCH ? sortFields.RELEVANCE : sortFields.NEW,
                        orderDirection = sortDirections.DESC,
                    },
                } = this.$route;

                const { field, direction } = value;

                if (field !== orderField || direction !== orderDirection) {
                    const query = { ...this.$route.query, orderField: field, orderDirection: direction };
                    delete query.page;

                    this.$router.replace({
                        path: this.$route.path,
                        query,
                    });
                }
            }
        },

        onClickDeleteTag(value) {
            let { type, code, entityCode, routeSegments } = this;

            if (!routeSegments.includes(value)) return;
            else {
                const index = routeSegments.indexOf(value);
                if (index !== -1) routeSegments.splice(index, 1);
            }

            const path = concatCatalogRoutePath(type, entityCode, code, routeSegments);
            const query = { ...this.$route.query };
            delete query.page;

            this.$router.replace({ path, query });
        },

        /*
        * Обертка для window.onscroll для оптимизации работы
        * Принимает callback который вызывается когда юзер прекратил scroll
        * */
        onWindowScroll(callback) {
            let isScrolling;
            window.onscroll = () => {
                clearTimeout(isScrolling);
                isScrolling = setTimeout(() => {
                    callback();
                }, 100);
            }
        },

        async onShowMore() {
            this.showMore = true;
            await this.$router.replace({
                path: this.$route.path,
                query: { ...this.$route.query, page: this.activePage + 1 },
            });

            /**
             * Listen to mousescroll event
             *
             * @type {HTMLElement} - the target of the event div:#showMoreBlockID
             * @listens window.onscroll - the namespace and name of the event
             * Обработчик для последующей подгрузки записей без нажатия на кнопку, а при скролле до блока пагинации
             */
            this.onWindowScroll(() => {
                // Показывать кнопку скролла вверх
                this.onScrollTopShow = document.documentElement.scrollTop + window.innerHeight >= 1000;
                // Расстояние блока #showMoreBlockID от верхней границы экрана
                let showMoreBlock = document.getElementById("showMoreBlockID").offsetTop;
                // Вычисляемая величина, проверка пересечения нижней видимой границы экрана с верхней границей блока
                let bottomOfWindow = document.documentElement.scrollTop + window.innerHeight / 2.5 >= showMoreBlock;
                // При пересечении сбрасываем обработчик и запускаем подгрузку записей
                if (bottomOfWindow && this.activePage < this.pagesCount) {
                    window.onscroll = null;
                    this.onShowMore()
                }
            });
        },

        onPageChanged(page) {
            this.showMore = false;
            this.$router.push({
                path: this.$route.path,
                query: { ...this.$route.query, page: page > DEFAULT_PAGE ? page : undefined },
            });
        },

        async fetchCatalog(to, from, next, showMore) {
            try {
                const {
                    path,
                    params: { code: toCode, entityCode: toEntityCode, type: toType, pathMatch },
                    query: {
                        page = DEFAULT_PAGE,
                        orderField = this.setDefaultOrderField(toType),
                        orderDirection = sortDirections.DESC,
                        search_string: toSearchString,
                    },
                } = to;

                const {
                    query: { page: fromPage = DEFAULT_PAGE },
                } = from;

                const { filter, routeSegments, filterSegments } = computeFilterData(pathMatch, toCode);

                if (!showMore && page !== fromPage)
                    this.scrollTo({
                        top: this.$refs.catalogHeader.offsetHeight,
                        behavior: 'smooth',
                    });

                this.isFiltersLoading = true;
                this.$progress.start();
                await this[FETCH_CATALOG_DATA]({
                    type: toType,
                    entityCode: toEntityCode,
                    code: toCode,

                    filter,
                    routeSegments,
                    filterSegments,

                    searchString: toSearchString,
                    page,
                    orderField,
                    orderDirection,
                    showMore,
                    pagePath: path,
                });

                next();
                this.setSortValue(orderField, orderDirection);
                this.$progress.finish();
                this.isFiltersLoading = false;

                if (showMore) setTimeout(() => (this.showMore = false), 200);
            } catch (thrown) {
                if (thrown && thrown.isCancel === true) return;
                this.$progress.fail();
                this.isFiltersLoading = false;
                if (thrown && thrown.status === httpCodes.NOT_FOUND) return next(createNotFoundRoute(to));
                else next();
            }
        },

        setDefaultOrderField(type) {
            if (type === productGroupTypes.SEARCH) return sortFields.RELEVANCE;
            else if (type === productGroupTypes.NEW) return sortFields.NEW;
            return sortFields.POPULARITY;
        },

        runProfessionalDisclaimerModalInterval() {
            clearInterval(this.professionalDisclaimerInterval);

            if (this.professionalDisclaimerModalShowCount === 0) {
                this.professionalDisclaimerInterval = setInterval(async () => {
                    const priceHiddenItemIndex = this[ITEMS].findIndex((item) => {
                        return (
                            item.isPriceHidden === true &&
                            (item.price === null || item.price.value === null || item.price.value === 0)
                        );
                    });

                    if (priceHiddenItemIndex >= 0) {
                        await this[CHANGE_MODAL_STATE]({
                            name: modalName.general.PROFESSIONAL_DISCLAIMER,
                            open: true,
                            state: {},
                        });
                    }

                    this.runProfessionalDisclaimerModalInterval();
                }, 60000);
            } else if (this.professionalDisclaimerModalShowCount === 1) {
                this.professionalDisclaimerInterval = setInterval(async () => {
                    const priceHiddenItemIndex = this[ITEMS].findIndex((item) => {
                        return (
                            item.isPriceHidden === true &&
                            (item.price === null || item.price.value === null || item.price.value === 0)
                        );
                    });

                    if (priceHiddenItemIndex >= 0) {
                        await this[CHANGE_MODAL_STATE]({
                            name: modalName.general.PROFESSIONAL_DISCLAIMER,
                            open: true,
                            state: {},
                        });

                        await this[SAVE_MODAL_OPENING_HISTORY]({
                            name: modalName.general.PROFESSIONAL_DISCLAIMER,
                        });
                    }

                    this.runProfessionalDisclaimerModalInterval();
                }, 600000); // 10 min
            }
        },
    },

    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        function setDefaultOrderField(type) {
            if (type === productGroupTypes.SEARCH) return sortFields.RELEVANCE;
            else if (type === productGroupTypes.NEW) return sortFields.NEW;
            return sortFields.POPULARITY;
        }

        const {
            fullPath,
            params: { code: toCode = null, entityCode: toEntityCode = null, type: toType, pathMatch },
            query: {
                page = DEFAULT_PAGE,
                orderField = setDefaultOrderField(toType),
                orderDirection = sortDirections.DESC,
                search_string: toSearchString = null,
            },
        } = to;

        function proceed() {
            if ($store.state[CATALOG_MODULE]) {
                const { loadPath, categoryCode, entityCode, type, searchString: stateSearchString } = $store.state[
                    CATALOG_MODULE
                ];

                // если все загружено, пропускаем
                if (
                    loadPath === fullPath &&
                    toType === type &&
                    toCode === categoryCode &&
                    toEntityCode === entityCode &&
                    toSearchString === stateSearchString
                )
                    next((vm) => vm.setSortValue(orderField, orderDirection));
                else {
                    const { filter, routeSegments, filterSegments } = computeFilterData(pathMatch, toCode);

                    $progress.start();
                    $store
                        .dispatch(`${CATALOG_MODULE}/${FETCH_CATALOG_DATA}`, {
                            type: toType,
                            entityCode: toEntityCode,
                            code: toCode,

                            filter,
                            routeSegments,
                            filterSegments,

                            searchString: toSearchString,
                            page,
                            orderField,
                            orderDirection,
                            pagePath: fullPath,
                        })
                        .then(() => {
                            $store.dispatch(`${CATALOG_MODULE}/${SET_LOAD_PATH}`, fullPath);
                            $progress.finish();

                            next((vm) => {
                                vm.setSortValue(orderField, orderDirection);

                                if (vm[SCROLL])
                                    vm.scrollTo({
                                        top: MIN_SCROLL_VALUE + 1,
                                        behavior: 'smooth',
                                    });
                            });
                        })
                        .catch((thrown) => {
                            if (thrown && thrown.isCancel === true) return next();

                            $progress.fail();
                            if (thrown && thrown.status === httpCodes.NOT_FOUND) return next(createNotFoundRoute(to));
                            else next();
                        });
                }
            }
        }

        if ($store.state[CATALOG_MODULE]) proceed();
        else {
            $store.watch(
                (state) => state[CATALOG_MODULE],
                (value) => {
                    if (value) proceed();
                }
            );
        }
    },

    beforeRouteUpdate(to, from, next) {
        // вызывается, когда маршрут, что рендерит этот компонент, изменился,
        // но этот компонент будет повторно использован в новом маршруте.
        // Например, для маршрута с динамическими параметрами `/foo/:id`, когда мы
        // перемещаемся между `/foo/1` и `/foo/2`, экземпляр того же компонента `Foo`
        // будет использован повторно, и этот хук будет вызван когда это случится.
        // Также имеется доступ в `this` к экземпляру компонента.

        // Закрыть модальное окно с фильтрами после выбора фильтра
        // this.filterModal = false;

        // Если переход из каталога в категорию или из одной категории в другую то сбрасываем бесконечную пагинацию
        if( (!from.params.code && to.params.code) || (from.params.code && from.params.code !== to.params.code) ) {
            this.onWindowScroll(() => {
                this.onScrollTopShow = document.documentElement.scrollTop + window.innerHeight >= 1000;
            });
        }

        const {
            params: { code: toCode, entityCode: toEntityCode, type: toType, pathMatch: toPathMatch },
            query: {
                page: toPage = DEFAULT_PAGE,
                orderField: toOrderField = this.setDefaultOrderField(toType),
                orderDirection: toOrderDirection = sortDirections.DESC,
                search_string: to_search_string = null,
            },
        } = to;

        const {
            params: { code: fromCode, entityCode: fromEntityCode, type: fromType, pathMatch: fromPathMatch },
            query: {
                page: fromPage = DEFAULT_PAGE,
                orderField: fromOrderField = this.setDefaultOrderField(fromType),
                orderDirection: fromOrderDirection = sortDirections.DESC,
                search_string: from_search_string = null,
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

        if (this.showMore) this.fetchCatalog(to, from, next, this.showMore);
        else this.debounce_fetchCatalog(to, from, next);
    },

    beforeRouteLeave(to, from, next) {
        // При уходе с роута отменяем запрос
        this.debounce_fetchCatalog.cancel();
        next();
    },

    created() {
        this.productGroupTypes = productGroupTypes;
    },

    beforeMount() {
        const category = this[ACTIVE_CATEGORY] || null;
        if (category) $retailRocket.addCategoryView(category.id);
        this.debounce_fetchCatalog = _debounce(this.fetchCatalog, 500);
        this[FETCH_RECENTLY_VIEWED_PRODUCTS]();
    },

    mounted() {
        this.isMounted = true;
        this.runProfessionalDisclaimerModalInterval();

        this.onWindowScroll(() => {
            this.onScrollTopShow = document.documentElement.scrollTop + window.innerHeight >= 1000;
        });
    },

    beforeDestroy() {
        clearInterval(this.professionalDisclaimerInterval);
        window.onscroll = null;
    },
};
</script>
