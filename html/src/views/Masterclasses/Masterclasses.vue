<template>
    <section class="section masterclasses-view">
        <div class="container masterclasses-view__header">
            <breadcrumbs class="container container--tablet-lg masterclasses-view__breadcrumbs">
                <breadcrumb-item key="main" to="/">
                    <v-svg v-if="isTablet" name="home" width="10" height="10" />
                    <span v-else>Главная</span>
                </breadcrumb-item>
                <breadcrumb-item key="masterclasses" :to="{ name: 'CatalogMasterclasses' }">{{
                    catalogTitle
                }}</breadcrumb-item>
            </breadcrumbs>

            <transition name="fade" mode="out-in">
                <remote-banner-placement
                    :type="bannerType.MK_TOP"
                    :desktop-size="[1224, 240]"
                    :tablet-size="[975, 305]"
                    :mobile-size="[767, 575]"
                    class="masterclasses-view__banner"
                    watch-router
                />
            </transition>

            <!-- <section class="section masterclasses-view__banners">
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
            </section> -->
        </div>

        <section class="section masterclasses-view__section masterclasses-view__sets">
            <div class="container masterclasses-view__sets-header">
                <div class="masterclasses-view__sets-header-top">
                    <h1
                        class="container container--tablet masterclasses-view__section-hl masterclasses-view__sets-header-hl"
                        v-if="activePage === 1 || isMounted"
                    >
                        <span>{{ catalogTitle }}</span>
                        <span class="text-grey masterclasses-view__sets-header-hl-count">
                            {{ range }} {{ eventsLabel }}
                        </span>
                    </h1>

                    <div class="container container--tablet masterclasses-view__sets-header-top-controls">
                        <template v-if="!isTablet">
                            <v-select
                                class="masterclasses-view__sets-header-select"
                                v-for="filter in filters"
                                track-by="id"
                                label="name"
                                :value="selectedValueMap[filter.name] || filter.items[0]"
                                :key="filter.id"
                                :options="filter.items"
                                :placeholder="filter.title"
                                :searchable="false"
                                :allow-empty="false"
                                :show-labels="false"
                                @input="
                                    onChangeFilter(
                                        filter,
                                        $event && $event.code,
                                        selectedValueMap[filter.name] && selectedValueMap[filter.name].code
                                    )
                                "
                            />
                        </template>
                        <filter-button
                            v-else
                            class="masterclasses-view__sets-header-btn"
                            @click="filterModal = !filterModal"
                        >
                            Фильтр&nbsp;&nbsp;
                            <span class="text-grey">{{ activeTags.length }}</span>
                        </filter-button>
                    </div>
                </div>

                <div class="masterclasses-view__sets-header-bottom" v-if="!isTablet">
                    <links-switch
                        v-if="times"
                        class="masterclasses-view__sets-header-switch"
                        :value="
                            (selectedValueMap[times.name] && selectedValueMap[times.name].code) || times.items[0].code
                        "
                        id="status"
                        name="status"
                        :items="times.items"
                        :linkSegments="getLinkSegments('time')"
                        @input="
                            onChangeFilter(
                                times,
                                $event,
                                selectedValueMap[times.name] && selectedValueMap[times.name].code
                            )
                        "
                    >
                        <template v-slot:content="{ item }">
                            {{ item.name }}
                        </template>
                    </links-switch>

                    <select-panel
                        v-if="specialties"
                        class="masterclasses-view__sets-header-panel"
                        name="topic"
                        id="topic"
                        :value="(selectedValueMap[specialties.name] && selectedValueMap[specialties.name].code) || null"
                        :items="specialties.items"
                        :linkSegments="getLinkSegments('specialty')"
                        @input="
                            onChangeFilter(
                                specialties,
                                $event,
                                selectedValueMap[specialties.name] && selectedValueMap[specialties.name].code
                            )
                        "
                    >
                        <template v-slot:content="{ item }">
                            {{ item.name }}
                        </template>
                    </select-panel>
                </div>
            </div>

            <div class="container masterclasses-view__sets-container" v-if="pagesCount > 0">
                <ul class="masterclasses-view__sets-list">
                    <template v-for="item in masterclasses">
                        <master-class-card
                            v-if="item.type === 'masterclass'"
                            :key="item.id"
                            class="masterclasses-view__sets-list-item"
                            :name="item.name"
                            :speaker="item.speaker"
                            :date="item.dateTime"
                            :price="item.price"
                            :old-price="item.oldPrice"
                            :address="item.nearestPlaceName"
                            :image="item.image"
                            :to="item.url"
                            :in-cart="
                                !!(
                                    item.ticketTypes.length === 1 &&
                                    isInCart(cartItemTypes.MASTERCLASS, item.ticketTypes[0].offerId)
                                )
                            "
                            has-articles
                            is-small
                            @buy="onBuyMasterclass(item)"
                        >
                            <template v-if="item.desktopImg">
                                <source
                                    :data-srcset="item.desktopImg.webp"
                                    type="image/webp"
                                    media="(min-width: 1024px)"
                                />
                                <source :data-srcset="item.desktopImg.orig" media="(min-width: 1024px)" />
                            </template>

                            <template v-if="item.tabletImg">
                                <source
                                    :data-srcset="item.tabletImg.webp"
                                    type="image/webp"
                                    media="(min-width: 768px)"
                                />
                                <source :data-srcset="item.tabletImg.orig" media="(min-width: 768px)" />
                            </template>

                            <template v-if="item.mobileImg">
                                <source
                                    :data-srcset="item.mobileImg.webp"
                                    type="image/webp"
                                    media="(min-width: 320px)"
                                />
                                <source :data-srcset="item.mobileImg.orig" media="(min-width: 320px)" />
                            </template>

                            <img
                                v-if="item.defaultImg"
                                class="blur-up lazyload v-picture__img"
                                :data-src="item.defaultImg"
                                :srcset="item.placeholderImg"
                                alt
                            />
                        </master-class-card>

                        <li
                            v-if="item.type === 'banner'"
                            :key="item.id"
                            class="masterclasses-view__sets-list-item masterclasses-view__sets-list-item--banner"
                        >
                            <remote-banner
                                :banner="item"
                                :desktop-size="[808, 415]"
                                :tablet-size="[475, 424]"
                                :mobile-size="[640, 640]"
                            />
                        </li>
                    </template>
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
            <empty-placeholder-panel class="masterclasses-view__sets-placeholder" :show-btn="false" v-else>
                К сожалению, список мероприятий пуст. <br />
                Измените настройки фильтра.
            </empty-placeholder-panel>
        </section>

        <!-- #62050
        <section class="section masterclasses-view__section masterclasses-view__seo" v-if="activePage === 1 || isMounted">
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
        </section> -->

        <transition name="fade-in">
            <modal
                class="masterclasses-view__modal-filter"
                v-if="filterModal && isTabletLg"
                :show-close-btn="false"
                type="fullscreen"
            >
                <template v-slot:body>
                    <v-sticky class="masterclasses-view__modal-filter-sticky">
                        <template v-slot:sticky>
                            <div class="masterclasses-view__modal-filter-header">
                                <button
                                    class="masterclasses-view__modal-filter-header-btn"
                                    @click="filterModal = false"
                                >
                                    <v-svg name="cross-small" width="14" height="14" />Фильтр
                                </button>
                            </div>
                        </template>

                        <masterclass-catalog-filter class="masterclasses-view__modal-filter-panel" />

                        <div class="masterclasses-view__modal-filter-controls">
                            <v-button
                                class="btn--outline masterclasses-view__modal-filter-clear-btn"
                                :to="clearFilterUrl"
                                replace
                            >
                                Очистить
                            </v-button>
                            <v-button
                                class="masterclasses-view__modal-filter-close-btn"
                                @click="filterModal = !filterModal"
                            >
                                Показать {{ range }}
                            </v-button>
                        </div>
                    </v-sticky>
                </template>
            </modal>
        </transition>
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VButton from '@controls/VButton/VButton.vue';
import VPagination from '@controls/VPagination/VPagination.vue';
import VExpander from '@controls/VExpander/VExpander.vue';
import VSelect from '@controls/VSelect/VSelect.vue';
import VSticky from '@controls/VSticky/VSticky.vue';
import Modal from '@controls/modal/modal.vue';

import RemoteBanner from '@components/RemoteBanner/RemoteBanner.vue';
import RemoteBannerPlacement from '@components/RemoteBanner/RemoteBannerPlacement.vue';

import SelectPanel from '@components/SelectPanel/SelectPanel.vue';
import LinksSwitch from '@components/LinksSwitch/LinksSwitch.vue';
import VSlider from '@controls/VSlider/VSlider.vue';
import MasterClassCard from '@components/MasterClassCard/MasterClassCard.vue';
import MasterClassBannerCard from '@components/MasterClassBannerCard/MasterClassBannerCard.vue';
import MasterclassCatalogFilter from '@components/MasterclassCatalogFilter/MasterclassCatalogFilter.vue';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '@components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';
import SeparatorSection from '@components/blocks/SeparatorSection/SeparatorSection.vue';
import ShowMoreButton from '@components/ShowMoreButton/ShowMoreButton.vue';
import FilterButton from '@components/FilterButton/FilterButton.vue';
import EmptyPlaceholderPanel from '@components/EmptyPlaceholderPanel/EmptyPlaceholderPanel.vue';

import { mapState, mapGetters, mapActions } from 'vuex';
import { LOCALE, SCROLL } from '@store';

import { NAME as MODAL_MODULE } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as CART_MODULE } from '@store/modules/Cart';
import { IS_IN_CART } from '@store/modules/Cart/getters';
import { ADD_MASTERCLASS_ITEM } from '@store/modules/Cart/actions';
import { cartItemTypes } from '@enums/product';

import { NAME as MASTERCLASSES_MODULE, ITEMS, ACTIVE_PAGE, RANGE } from '@store/modules/Masterclass';
import {
    PAGES_COUNT,
    ROUTE_SEGMENTS,
    FILTER_SEGMENTS,
    NULLABLE_FILTERS,
    ACTIVE_TAGS,
} from '@store/modules/Masterclass/getters';
import {
    FETCH_MASTERCLASS_CATALOG_DATA,
    FETCH_MASTERCLASS_ITEMS,
    SET_LOAD_PATH,
} from '@store/modules/Masterclass/actions';

import _debounce from 'lodash/debounce';
import metaMixin from '@plugins/meta';
import { $store, $progress, $logger } from '@services';
import { MIN_SCROLL_VALUE, DEFAULT_PAGE } from '@constants';
import { bannerType, fileExtension, modalName } from '@enums';
import { dayMonthLongDateSettings, hourMinuteTimeSettings } from '@settings';
import { pluralize, getDate, convertObjectToMetaProperties } from '@util';
import { generatePictureSourcePath, generateFileOriginalPath, getImageType } from '@util/file';
import { generateAbsoluteMasterclassUrl } from '@util/catalog';
import { registerModuleIfNotExists } from '@util/store';
import {
    generateMasterclassUrl,
    concatMasterclassesRoutePath,
    computeFilterMasterclassData,
    prepareMasterclassSpeakers,
} from '@util/catalog';
import '@images/sprites/home.svg';
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

function computeSort(filter) {
    if (typeof filter.time !== 'undefined' && Array.isArray(filter.time) && filter.time.indexOf('past') >= 0) {
        return {
            field: 'date_from',
            direction: 'desc',
        };
    }

    return {
        field: 'date_from',
        direction: 'asc',
    };
}

export default {
    name: 'masterclasses',
    mixins: [metaMixin],

    components: {
        RemoteBannerPlacement,
        RemoteBanner,
        VSvg,
        VButton,
        VPagination,
        VExpander,
        VSlider,
        VSelect,
        VSticky,
        Modal,

        LinksSwitch,
        SelectPanel,
        ShowMoreButton,
        FilterButton,

        MasterClassCard,
        MasterClassBannerCard,
        MasterclassCatalogFilter,

        Breadcrumbs,
        BreadcrumbItem,

        SeparatorSection,
        EmptyPlaceholderPanel,
    },

    metaInfo() {
        const { activePage, metaData } = this;
        const { title, description, url, image, imageType } = metaData;

        return {
            title: activePage > 1 ? `${title} – страница ${activePage}` : title,
            meta: convertObjectToMetaProperties({
                'og:title': title,
                'og:type': 'website',
                'og:url': url,
                'og:image': image,
                'og:image:url': image,
                'og:image:type': imageType,
                'og:og:site_name': 'Бессовестно талантливый',
                description: description || 'Мастер-классы для мастеров бьюти-индустрии',
            }),
        };
    },

    data() {
        return {
            isMounted: false,
            showMore: false,
            filterModal: false,

            bannerType,
            cartItemTypes,

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
        };
    },

    computed: {
        ...mapState([LOCALE, SCROLL]),
        ...mapState(MASTERCLASSES_MODULE, [ITEMS, ACTIVE_PAGE, RANGE]),
        ...mapGetters(CART_MODULE, {
            isInCart: IS_IN_CART,
        }),
        ...mapGetters(MASTERCLASSES_MODULE, [
            PAGES_COUNT,
            ROUTE_SEGMENTS,
            FILTER_SEGMENTS,
            NULLABLE_FILTERS,
            ACTIVE_TAGS,
        ]),

        metaData() {
            let data = {
                title: '',
                description: '',
                url: '',
                image: '',
                imageType: '',
            };

            data.title = this.catalogTitle;
            data.url = generateAbsoluteMasterclassUrl();

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

        clearFilterUrl() {
            return { name: 'CatalogMasterclasses' };
        },

        eventsLabel() {
            const range = this[RANGE];
            return range > 0 ? pluralize(range, ['событие', 'события', 'событий']) : 'событий';
        },

        selectedValueMap() {
            const { filterSegments } = this;
            const map = {};

            for (const key in filterSegments) {
                const filter = this[NULLABLE_FILTERS].find((f) => f.name === key);
                const keys = Object.keys(filterSegments[key]);
                map[key] = filter.items.find((i) => i.code === filterSegments[key][keys[0]]) || filter.items[0];
            }
            return map;
        },

        specialties() {
            const filters = this[NULLABLE_FILTERS] || [];
            return filters.find((f) => f.name === 'specialty');
        },

        times() {
            const filters = this[NULLABLE_FILTERS] || [];
            return filters.find((f) => f.name === 'time');
        },

        filters() {
            const filters = this[NULLABLE_FILTERS] || [];
            return filters.filter((f) => this.isTabletLg || (f.name !== 'specialty' && f.name !== 'time'));
        },

        howSort() {
            const { filter } = computeFilterMasterclassData(this.$route.fullPath);
            return computeSort(filter);
        },

        masterclasses() {
            const items = this[ITEMS] || [];

            return items.map((i) => {
                if (i.type === 'banner') {
                    return i;
                }

                const dateObj = getDate(`${i.nearestDate} ${i.nearestTimeFrom}`);
                const date = dateObj.toLocaleString(this[LOCALE], dayMonthLongDateSettings);
                const time = dateObj.toLocaleString(this[LOCALE], hourMinuteTimeSettings);
                const dateTime = `${date} (${this.$t(`weekdays.short.${dateObj.getDay()}`)}), ${time}`;
                const url = generateMasterclassUrl(i.code);
                const speaker = prepareMasterclassSpeakers(i.speakers);

                const defaultImg = i.image && generatePictureSourcePath(400, 240, i.image.id);
                const desktopImg = i.image && {
                    webp: generatePictureSourcePath(400, 240, i.image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(400, 240, i.image.id),
                };

                const mobileImg = i.image && {
                    webp: generatePictureSourcePath(400, 240, i.image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(400, 240, i.image.id),
                };

                const placeholderImg = i.image && generatePictureSourcePath(40, 24, i.image.id);

                return { ...i, url, speaker, dateTime, desktopImg, mobileImg, defaultImg, placeholderImg };
            });
        },

        sliderOptions() {
            return sliderOptions;
        },

        catalogTitle() {
            return this.$t('masterclasses.title');
        },

        isTablet() {
            return this.$mq.tablet;
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(MASTERCLASSES_MODULE, [FETCH_MASTERCLASS_ITEMS]),
        ...mapActions(CART_MODULE, {
            addMasterclassItem: ADD_MASTERCLASS_ITEM,
        }),

        onChangeFilter(filter, value, oldValue) {
            const { routeSegments } = this;

            const oldSegment = `${filter.name}-${oldValue}`;
            const newSegment = `${filter.name}-${value}`;

            if (oldValue && routeSegments.includes(oldSegment)) {
                const index = routeSegments.indexOf(oldSegment);
                routeSegments.splice(index, 1);
            }

            if (value && !routeSegments.includes(newSegment)) {
                routeSegments.push(newSegment);
            }

            const path = concatMasterclassesRoutePath(routeSegments);
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
            this.$router.push({
                path: this.$route.path,
                query: { ...this.$route.query, page: page > DEFAULT_PAGE ? page : undefined },
            });
        },

        scrollToTop(behavior) {
            if (typeof window !== 'undefined')
                window.scrollTo({
                    top: MIN_SCROLL_VALUE + 1,
                    behavior,
                });
        },

        async onBuyMasterclass(masterclass) {
            if (masterclass.ticketTypes.length > 1) {
                this[CHANGE_MODAL_STATE]({
                    name: modalName.general.QUICK_MASTERCLASS_ADD_TO_CART,
                    open: true,
                    state: { masterclass },
                });
            } else {
                if (!this.isInCart(cartItemTypes.MASTERCLASS, masterclass.ticketTypes[0].offerId)) {
                    try {
                        this.$progress.start();

                        await this.addMasterclassItem({
                            offerId: masterclass.ticketTypes[0].offerId,
                            count: 1,
                        });

                        this.$progress.finish();

                        this[CHANGE_MODAL_STATE]({
                            name: modalName.general.SNACK_NOTIFICATION,
                            open: true,
                            state: {
                                closeTimeout: 1500,
                                message: 'Билет добавлен в корзину',
                            },
                        });
                    } catch (error) {
                        this.$progress.fail();
                        console.error(error);
                    }
                } else {
                    this[CHANGE_MODAL_STATE]({
                        name: modalName.general.SNACK_NOTIFICATION,
                        open: true,
                        state: {
                            closeTimeout: 1500,
                            message: 'Билет уже добавлен в корзину',
                        },
                    });
                }
            }
        },

        async fetchCatalog(to, from, showMore) {
            try {
                const {
                    fullPath,
                    params: { pathMatch },
                    query: { page = DEFAULT_PAGE },
                } = to;

                const {
                    query: { page: fromPage = DEFAULT_PAGE },
                } = from;

                const { filter, routeSegments, filterSegments } = computeFilterMasterclassData(pathMatch);

                if (!showMore && this[SCROLL] && page !== fromPage) this.scrollToTop('smooth');

                this.$progress.start();

                await this[FETCH_MASTERCLASS_ITEMS]({
                    page,
                    filter,
                    sortField: this.howSort.field,
                    sortDirection: this.howSort.direction,
                    showMore,
                    pagePath: this.$route.fullPath,
                });

                this.$progress.finish();

                if (showMore) setTimeout(() => (this.showMore = false), 200);
            } catch (error) {
                this.$progress.fail();
            }
        },

        getLinkSegments(filterId) {
            const { filters } = $store.state[MASTERCLASSES_MODULE];
            return {
                filters: `/masterclasses/filters/${filters.find((filter) => filter.id === filterId).name}-`,
                noFilters: '/masterclasses/',
            };
        },
    },

    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        const {
            fullPath,
            params: { pathMatch },
            query: { page = DEFAULT_PAGE },
        } = to;

        function proceed() {
            if ($store.state[MASTERCLASSES_MODULE]) {
                const { loadPath } = $store.state[MASTERCLASSES_MODULE];

                // если все загружено, пропускаем
                if (loadPath === fullPath) next((vm) => vm.scrollToTop());
                else {
                    const { filter } = computeFilterMasterclassData(pathMatch);
                    const sort = computeSort(filter);

                    $progress.start();
                    $store
                        .dispatch(`${MASTERCLASSES_MODULE}/${FETCH_MASTERCLASS_CATALOG_DATA}`, {
                            page,
                            filter,
                            sortField: sort.field,
                            sortDirection: sort.direction,
                        })
                        .then(() => {
                            $store.dispatch(`${MASTERCLASSES_MODULE}/${SET_LOAD_PATH}`, fullPath);
                            next((vm) => {
                                $progress.finish();
                                vm.scrollToTop();
                            });
                        })
                        .catch(() => {
                            next(() => {
                                $progress.fail();
                                $progress.finish();
                            });
                        });
                }
            }
        }

        if ($store.state[MASTERCLASSES_MODULE]) proceed();
        else {
            $store.watch(
                (state) => state[MASTERCLASSES_MODULE],
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

        if (this.showMore) this.fetchCatalog(to, from, this.showMore);
        else this.debounce_fetchCatalog(to, from);
        next();
    },

    beforeMount() {
        this.debounce_fetchCatalog = _debounce(this.fetchCatalog, 500);
    },

    mounted() {
        this.isMounted = true;
    },
};
</script>
