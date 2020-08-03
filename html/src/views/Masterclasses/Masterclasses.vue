<template>
    <section class="section masterclasses-view">
        <div class="container masterclasses-view__header">
            <breadcrumbs class="container container--tablet-lg masterclasses-view__breadcrumbs">
                <breadcrumb-item key="main" to="/">
                    <v-svg v-if="isTablet" name="home" width="10" height="10" />
                    <span v-else>Главная</span>
                </breadcrumb-item>
                <breadcrumb-item key="masterclasses" :to="{ path: $route.path }">
                    {{ $t('masterclasses.title') }}
                </breadcrumb-item>
            </breadcrumbs>

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
                    >
                        <span>{{ $t('masterclasses.title') }}</span>
                        <span class="text-grey masterclasses-view__sets-header-hl-count">
                            {{ range }} {{ eventsLabel }}
                        </span>
                    </h1>
                    <div class="container container--tablet masterclasses-view__sets-header-top-controls">
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
                        >
                        </v-select>
                    </div>
                </div>

                <div class="masterclasses-view__sets-header-bottom">
                    <radio-switch
                        v-if="times"
                        class="masterclasses-view__sets-header-switch"
                        :value="
                            (selectedValueMap[times.name] && selectedValueMap[times.name].code) || times.items[0].code
                        "
                        name="status"
                        id="status"
                        key-field="code"
                        :items="times.items"
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
                    </radio-switch>

                    <select-panel
                        v-if="professions"
                        class="masterclasses-view__sets-header-panel"
                        name="topic"
                        id="topic"
                        :value="(selectedValueMap[professions.name] && selectedValueMap[professions.name].code) || null"
                        :items="professions.items"
                        @input="
                            onChangeFilter(
                                professions,
                                $event,
                                selectedValueMap[professions.name] && selectedValueMap[professions.name].code
                            )
                        "
                    >
                        <template v-slot:content="{ item }">
                            {{ item.name }}
                        </template>
                    </select-panel>
                </div>
            </div>
            <div class="container masterclasses-view__sets-container">
                <ul class="masterclasses-view__sets-list">
                    <master-class-card
                        class="masterclasses-view__sets-list-item"
                        v-for="item in masterclasses"
                        :key="item.id"
                        :name="item.name"
                        :speaker="item.speaker"
                        :date="item.dateTime"
                        :price="item.price"
                        :old-price="item.oldPrice"
                        :address="item.nearestPlaceName"
                        :image="item.image"
                        :to="item.url"
                        has-articles
                        is-small
                    >
                        <template v-if="item.desktopImg">
                            <source :data-srcset="item.desktopImg.webp" type="image/webp" media="(min-width: 1024px)" />
                            <source :data-srcset="item.desktopImg.orig" media="(min-width: 1024px)" />
                        </template>
                        <template v-if="item.tabletImg">
                            <source :data-srcset="item.tabletImg.webp" type="image/webp" media="(min-width: 768px)" />
                            <source :data-srcset="item.tabletImg.orig" media="(min-width: 768px)" />
                        </template>
                        <template v-if="item.mobileImg">
                            <source :data-srcset="item.mobileImg.webp" type="image/webp" media="(min-width: 320px)" />
                            <source :data-srcset="item.mobileImg.orig" media="(min-width: 320px)" />
                        </template>
                        <img
                            v-if="item.defaultImg"
                            class="blur-up lazyload v-picture__img"
                            :data-src="item.defaultImg"
                            alt
                        />
                    </master-class-card>
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

        <!-- #62050
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
        </section> -->
    </section>
</template>

<script>
import Vue from 'vue';
import VButton from '@controls/VButton/VButton.vue';
import VPagination from '@controls/VPagination/VPagination.vue';
import VExpander from '@controls/VExpander/VExpander.vue';
import VSelect from '@controls/VSelect/VSelect.vue';

import SelectPanel from '@components/SelectPanel/SelectPanel.vue';
import RadioSwitch from '@components/RadioSwitch/RadioSwitch.vue';
import VSlider from '@controls/VSlider/VSlider.vue';
import MasterClassCard from '@components/MasterClassCard/MasterClassCard.vue';
import MasterClassBannerCard from '@components/MasterClassBannerCard/MasterClassBannerCard.vue';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '@components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';
import SeparatorSection from '@components/blocks/SeparatorSection/SeparatorSection.vue';
import ShowMoreButton from '@components/ShowMoreButton/ShowMoreButton.vue';

import { $store, $progress, $logger } from '@services';

import { mapState, mapGetters, mapActions } from 'vuex';
import { LOCALE, SCROLL } from '@store';

import { NAME as MASTERCLASSES_MODULE, ITEMS, ACTIVE_PAGE, RANGE } from '@store/modules/Masterclass';
import { PAGES_COUNT, ROUTE_SEGMENTS, FILTER_SEGMENTS, NULLABLE_FILTERS } from '@store/modules/Masterclass/getters';
import {
    FETCH_MASTERCLASS_CATALOG_DATA,
    FETCH_MASTERCLASS_ITEMS,
    SET_LOAD_PATH,
} from '@store/modules/Masterclass/actions';

import { MIN_SCROLL_VALUE } from '@constants';
import { fileExtension } from '@enums';
import { dayMonthLongDateSettings, hourMinuteTimeSettings } from '@settings';
import { pluralize } from '@util';
import { generatePictureSourcePath } from '@util/file';
import { registerModuleIfNotExists } from '@util/store';
import {
    generateMasterclassUrl,
    concatMasterclassesRoutePath,
    computeFilterMasterclassData,
    prepareMasterclassSpeakers,
} from '@util/catalog';
import _debounce from 'lodash/debounce';
import './Masterclasses.css';

import profileMasterClassImg1 from '@images/mock/profileMasterClass1.png';
import profileMasterClassImg2 from '@images/mock/profileMasterClass2.png';
import profileMasterClassImg3 from '@images/mock/profileMasterClass3.png';
import profileMasterClassImg4 from '@images/mock/profileMasterClass4.png';
import '@images/sprites/home.svg';

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

const masterclassStatus = [
    {
        value: 0,
        title: 'Будущие события',
    },
    {
        value: 1,
        title: 'Прошедшие',
    },
];

const topics = [
    {
        value: 0,
        title: 'Все темы',
    },
    {
        value: 1,
        title: 'Парикмахерам',
    },
    {
        value: 2,
        title: 'Визажистам',
    },
    {
        value: 3,
        title: 'Нейл-мастерам',
    },
    {
        value: 4,
        title: 'Фотографам',
    },
    {
        value: 5,
        title: 'Стилистам',
    },
];

export default {
    name: 'masterclasses',

    components: {
        VButton,
        VPagination,
        VExpander,
        VSlider,
        VSelect,

        RadioSwitch,
        SelectPanel,
        ShowMoreButton,

        MasterClassCard,
        MasterClassBannerCard,

        Breadcrumbs,
        BreadcrumbItem,

        SeparatorSection,
    },

    data() {
        return {
            showMore: false,

            masterclassStatus,
            selectedStatus: masterclassStatus[0].value,

            selectedFiltersMap: {},

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
        ...mapGetters(MASTERCLASSES_MODULE, [PAGES_COUNT, ROUTE_SEGMENTS, FILTER_SEGMENTS, NULLABLE_FILTERS]),

        eventsLabel() {
            const range = this[RANGE];
            return range > 0 ? pluralize(range, ['событие', 'события', 'событий']) : 'событий';
        },

        selectedValueMap() {
            const { filterSegments } = this;
            const map = {};

            for (const key in filterSegments) {
                const filter = this[NULLABLE_FILTERS].find(f => f.name === key);
                const keys = Object.keys(filterSegments[key]);
                map[key] = filter.items.find(i => i.code === filterSegments[key][keys[0]]) || filter.items[0];
            }
            return map;
        },

        professions() {
            const filters = this[NULLABLE_FILTERS] || [];
            return filters.find(f => f.name === 'profession');
        },

        times() {
            const filters = this[NULLABLE_FILTERS] || [];
            return filters.find(f => f.name === 'time');
        },

        filters() {
            const filters = this[NULLABLE_FILTERS] || [];
            return filters.filter(f => this.isTabletLg || (f.name !== 'profession' && f.name !== 'time'));
        },

        masterclasses() {
            const items = this[ITEMS] || [];

            return items.map(i => {
                const dateObj = new Date(`${i.nearestDate} ${i.nearestTimeFrom}`);
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
                    webp: generatePictureSourcePath(425, 320, i.image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(425, 320, i.image.id),
                };

                return { ...i, url, speaker, dateTime, desktopImg, mobileImg, defaultImg };
            });
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
        ...mapActions(MASTERCLASSES_MODULE, [FETCH_MASTERCLASS_ITEMS]),

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
                    params: { pathMatch },
                    query: { page = 1 },
                } = to;

                const {
                    query: { page: fromPage = 1 },
                } = from;

                const { filter, routeSegments, filterSegments } = computeFilterMasterclassData(pathMatch);

                this.$progress.start();
                await this[FETCH_MASTERCLASS_ITEMS]({ page, filter, showMore });
                this.$progress.finish();

                if (!showMore && this[SCROLL] && page !== fromPage)
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
            params: { pathMatch },
            query: { page = 1, orderField, orderDirection },
        } = to;

        const { loadPath } = $store.state[MASTERCLASSES_MODULE];

        // если все загружено, пропускаем
        if (loadPath === fullPath) next();
        else {
            const { filter, routeSegments, filterSegments } = computeFilterMasterclassData(pathMatch);

            $progress.start();
            $store
                .dispatch(`${MASTERCLASSES_MODULE}/${FETCH_MASTERCLASS_CATALOG_DATA}`, {
                    page,
                    filter,
                })
                .then(() => {
                    $store.dispatch(`${MASTERCLASSES_MODULE}/${SET_LOAD_PATH}`, fullPath);
                    next(vm => $progress.finish());
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

        if (this.showMore) this.fetchCatalog(to, from, this.showMore);
        else this.debounce_fetchCatalog(to, from);
        next();
    },

    beforeMount() {
        this.debounce_fetchCatalog = _debounce(this.fetchCatalog, 500);
    },
};
</script>
