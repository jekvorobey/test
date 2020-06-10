<template>
    <section class="section master-class-view">
        <div class="container master-class-view__header">
            <breadcrumbs class="container container--tablet-lg master-class-view__breadcrumbs">
                <breadcrumb-item key="main" to="/">
                    Главная
                </breadcrumb-item>
                <breadcrumb-item key="root" to="/masterclasses">
                    {{ rootTitle }}
                </breadcrumb-item>
                <breadcrumb-item :key="masterClass.code" :to="{ path: $route.path }">
                    {{ masterClass.name }}
                </breadcrumb-item>
            </breadcrumbs>

            <master-class-banner-card
                class="master-class-view__banner"
                :image="masterClass.image"
                :name="masterClass.name"
                :price="masterClass.price"
                btn-text="Купить билет"
                show-btn
                @btnClick="onBuyBtnClick"
            />
        </div>

        <section class="section master-class-view__section master-class-view__panel">
            <div class="container master-class-view__panel-container">
                <div class="master-class-view__panel-body">
                    <div class="container container--tablet master-class-view__panel-left">
                        <attention-panel>
                            <span>
                                <strong>Внимание!</strong> Событие проходит в другом городе<br />
                                (г. Москва)
                            </span>
                        </attention-panel>
                    </div>
                    <div class="master-class-view__panel-middle">
                        <p class="container container--tablet text-bold master-class-view__section-hl">
                            Описание
                        </p>
                        <v-html class="container container--tablet" v-html="masterClass.topText" />
                        <img :src="masterClass.detailImage" />
                        <v-html class="container container--tablet" v-html="masterClass.bottomText" />
                    </div>
                    <div class="master-class-view__panel-right">
                        <div class="container container--tablet master-class-view__panel-right-section">
                            <p class="text-bold master-class-view__panel-right-hl">
                                Спикеры
                            </p>
                            <v-expander :min-height="160">
                                <template v-slot:btn="{ isExpanded }">
                                    {{ isExpanded ? 'Скрыть' : 'Все спикеры' }}
                                </template>
                                <ul>
                                    <author-card
                                        class="master-class-view__panel-right-card"
                                        v-for="author in masterClass.authors"
                                        :key="author.id"
                                        v-bind="author"
                                    />
                                </ul>
                            </v-expander>
                        </div>
                        <div class="container container--tablet master-class-view__panel-right-section">
                            <p class="text-bold master-class-view__panel-right-hl">
                                Дата и время
                            </p>
                            <p>{{ masterClass.date }}</p>
                            <p><a>Задать вопрос организатору</a></p>
                        </div>
                        <div class="container container--tablet master-class-view__panel-right-section">
                            <p class="text-bold master-class-view__panel-right-hl">
                                Место проведения
                            </p>
                            <p>{{ masterClass.address.full }}</p>
                            <p><a @click="onShowMap">Посмотреть на карте</a></p>
                        </div>
                        <div
                            v-if="!isTablet"
                            class="container container--tablet master-class-view__panel-right-section master-class-view__panel-right-social"
                        >
                            <p class="text-bold master-class-view__panel-right-hl">
                                Поделиться
                            </p>
                            <v-svg name="facebook-bw" width="24" height="24" />
                            <v-svg name="vkontakte-bw" width="24" height="24" />
                            <v-svg name="ok-bw" width="24" height="24" />
                            <v-svg name="twitter-bw" width="24" height="24" />
                            <v-svg name="telegram-bw" width="24" height="24" />
                            <v-svg name="link" width="24" height="24" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section
            class="section master-class-view__section master-class-view__gallery"
            v-if="masterClass.gallery || masterClass.gallery.length > 0"
        >
            <div class="container" v-if="!isTablet">
                <ul class="master-class-view__gallery-list">
                    <li class="master-class-view__gallery-item" v-for="image in masterClass.gallery" :key="image">
                        <v-picture :image="image" />
                    </li>
                </ul>
            </div>

            <v-slider
                name="masterclass-gallery-slider"
                class="master-class-view__gallery-slider"
                :options="sliderOptions"
                v-else
            >
                <div
                    class="swiper-slide master-class-view__gallery-item"
                    v-for="image in masterClass.gallery"
                    :key="image"
                >
                    <v-picture :image="image" />
                </div>
            </v-slider>
        </section>

        <section class="section master-class-view__section master-class-view__panel">
            <div class="container master-class-view__panel-container">
                <div class="master-class-view__panel-body">
                    <div class="container container--tablet master-class-view__panel-left" />
                    <div class="master-class-view__panel-middle">
                        <p class="container container--tablet text-bold master-class-view__section-hl">
                            Программа
                        </p>
                        <v-html class="container container--tablet" v-html="masterClass.program" />
                    </div>
                    <div class="master-class-view__panel-right">
                        <div class="container container--tablet master-class-view__panel-right-section">
                            <p class="text-bold master-class-view__panel-right-hl">
                                Что взять с собой
                            </p>
                            <v-html v-html="masterClass.requirements" />
                        </div>
                        <div
                            v-if="isTablet"
                            class="container container--tablet master-class-view__panel-right-section master-class-view__panel-right-social"
                        >
                            <p class="text-bold master-class-view__panel-right-hl">
                                Поделиться
                            </p>
                            <v-svg name="facebook-bw" width="24" height="24" />
                            <v-svg name="vkontakte-bw" width="24" height="24" />
                            <v-svg name="ok-bw" width="24" height="24" />
                            <v-svg name="twitter-bw" width="24" height="24" />
                            <v-svg name="telegram-bw" width="24" height="24" />
                            <v-svg name="link" width="24" height="24" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section
            class="section master-class-view__section master-class-view__tickets"
            ref="panel"
            v-observe-visibility="onPanelVisibilityChanged"
        >
            <div class="container master-class-view__tickets-container">
                <h2 class="container container--tablet master-class-view__section-hl">
                    Билеты на мастер-класс
                </h2>
                <ul class="master-class-view__tickets-list">
                    <ticket-card
                        class="master-class-view__tickets-item"
                        v-for="ticket in masterClass.tickets"
                        :key="ticket.id"
                        :name="ticket.name"
                        :description="ticket.description"
                        :max="ticket.remain"
                        :price="ticket.price"
                        :disabled="isInCart(ticket.id)"
                        @btnClick="onAddToCart(ticket.id, $event)"
                    >
                        <template v-if="!isTablet">
                            {{ isInCart(ticket.id) ? 'Перейти в корзину' : 'Добавить в корзину' }}
                        </template>
                        <template v-else>
                            {{ isInCart(ticket.id) ? 'В корзину' : 'Добавить' }}
                        </template>
                    </ticket-card>
                </ul>
            </div>
        </section>

        <section ref="map" class="section master-class-view__section master-class-view__map">
            <div class="container master-class-view__map-container">
                <h2 class="container container--tablet master-class-view__section-hl">
                    Место проведения
                </h2>
                <p class="container container--tablet master-class-view__map-desc">
                    {{ masterClass.address.full }}
                </p>
                <yandex-map
                    v-if="showMap"
                    :coords="masterClass.address.coords"
                    :controls="[]"
                    :options="{ yandexMapDisablePoiInteractivity: true }"
                    :settings="mapSettings"
                >
                    <ymap-marker
                        :key="`masterclass-point-${masterClass.address.id}`"
                        :marker-id="`masterclass-point-${masterClass.address.id}`"
                        :coords="masterClass.address.coords"
                        :icon="markerIcon"
                    />
                </yandex-map>
            </div>
        </section>

        <section v-if="masterClass.contacts" class="section master-class-view__section master-class-view__contacts">
            <div class="container master-class-view__contacts-container">
                <h2 class="container container--tablet master-class-view__section-hl">
                    Контакты организатора
                </h2>
                <div class="master-class-view__contacts-panel">
                    <p class="master-class-view__contacts-panel-hl">
                        По всем вопросам и предложениям обращаться к организатору
                    </p>
                    <p class="text-bold master-class-view__contacts-panel-name">
                        {{ masterClass.contacts.name }}
                    </p>
                    <p class="text-grey master-class-view__contacts-panel-desc">
                        {{ masterClass.contacts.description }}
                    </p>
                    <div class="master-class-view__contacts-panel-bottom">
                        <div class="master-class-view__contacts-panel-phone">
                            Телефон: {{ masterClass.contacts.phone }}
                        </div>
                        <div class="master-class-view__contacts-panel-email">
                            Email: {{ masterClass.contacts.email }}
                        </div>
                        <v-button class="master-class-view__contacts-panel-btn">
                            Написать
                        </v-button>
                    </div>
                </div>
            </div>
        </section>

        <section
            v-if="masterclassBanners && masterclassBanners.length > 0"
            class="section master-class-view__masterclass"
        >
            <div class="container master-class-view__masterclass-container">
                <h2 class="master-class-view__section-hl master-class-view__masterclass-hl">
                    Похожие мастер-классы
                </h2>
                <ul class="master-class-view__masterclass-list">
                    <master-class-banner-card
                        class="master-class-view__masterclass-item"
                        v-for="item in masterclassBanners"
                        :key="item.id"
                        :name="item.name"
                        :image="item.image"
                        :price="item.price"
                        :author="item.author"
                        :description="item.date"
                        :to="generateMasterclassUrl(item.code)"
                    />
                </ul>
                <v-button class="btn--outline master-class-view__section-link master-class-view__masterclass-link">
                    {{ $t('product.showAll') }}
                </v-button>
            </div>
        </section>

        <section class="section master-class-view__section master-class-view__instagram">
            <div class="container master-class-view__instagram-container">
                <h2 class="master-class-view__section-hl master-class-view__instagram-hl">
                    INSTABEAUTY Владимира Соколова
                </h2>

                <v-slider
                    v-if="isTabletLg"
                    class="master-class-view__instagram-slider"
                    name="instagram"
                    :options="sliderOptions"
                >
                    <instagram-card
                        class="swiper-slide master-class-view__instagram-card"
                        v-for="item in instagramItems"
                        :key="item.id"
                        :instagram-card-id="item.id"
                        :image="item.image"
                    />
                </v-slider>

                <div
                    v-if="!isTabletLg"
                    class="master-class-view__instagram-grid master-class-view__instagram-grid--initialized"
                >
                    <instagram-card
                        class="master-class-view__instagram-card"
                        v-for="item in instagramItems"
                        :key="item.id"
                        :instagram-card-id="item.id"
                        :image="item.image"
                    />
                </div>
            </div>
        </section>

        <transition name="slide-bottom" appear>
            <div class="master-class-view__price-panel" v-if="isPanelVisible && isTablet">
                <div class="container">
                    <v-button class="master-class-view__price-panel-btn" @click.prevent="onBuyBtnClick">
                        Купить билет
                    </v-button>
                </div>
            </div>
        </transition>
    </section>
</template>

<script>
import { yandexMap, ymapMarker } from 'vue-yandex-maps';

import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';
import VHtml from '@controls/VHtml/VHtml.vue';
import VSlider from '@controls/VSlider/VSlider.vue';
import VPicture from '@controls/VPicture/VPicture.vue';
import VExpander from '@controls/VExpander/VExpander.vue';

import Price from '@components/Price/Price.vue';
import TicketCard from '@components/TicketCard/TicketCard.vue';
import AuthorCard from '@components/AuthorCard/AuthorCard.vue';
import BannerCard from '@components/BannerCard/BannerCard.vue';
import InstagramCard from '@components/InstagramCard/InstagramCard.vue';
import MasterClassBannerCard from '@components/MasterClassBannerCard/MasterClassBannerCard.vue';

import AttentionPanel from '@components/AttentionPanel/AttentionPanel.vue';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '@components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';

import { $store, $progress, $logger } from '@services';

import { mapState, mapActions, mapGetters } from 'vuex';
import { SCROLL } from '@store';

import masterClassModule, {
    NAME as MASTERCLASS_MODULE,
    MASTERCLASS,
    FEATURED_MASTERCLASSES,
    INSTAGRAM_ITEMS,
} from '@store/modules/Masterclass';
import { FETCH_MASTERCLASS_DATA } from '@store/modules/Masterclass/actions';

import { NAME as CART_MODULE } from '@store/modules/Cart';
import { ADD_CART_ITEM } from '@store/modules/Cart/actions';

import { NAME as GEO_MODULE, SELECTED_CITY } from '@store/modules/Geolocation';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import _debounce from 'lodash/debounce';
import { registerModuleIfNotExists } from '@util/store';
import { generatePictureSourcePath } from '@util/file';
import { generateMasterclassUrl } from '@util/catalog';
import { yaMapSettings } from '@settings';
import { breakpoints } from '@enums';
import { productGroupTypes } from '@enums/product';

import '@images/sprites/socials/vkontakte-bw.svg';
import '@images/sprites/socials/facebook-bw.svg';
import '@images/sprites/socials/telegram-bw.svg';
import '@images/sprites/socials/ok-bw.svg';
import '@images/sprites/socials/twitter-bw.svg';

import '@images/sprites/link.svg';
import '@images/sprites/cart-empty.svg';
import '@images/sprites/star-empty-small.svg';
import '@images/sprites/star-small.svg';
import '@images/sprites/arrow-small.svg';
import '@images/sprites/wishlist-middle.svg';
import pin from '@images/icons/pin-filled.svg';
import './Masterclass.css';

import profileMasterClassImg1 from '@images/mock/profileMasterClass1.png';
import profileMasterClassImg2 from '@images/mock/profileMasterClass2.png';
import profileMasterClassImg3 from '@images/mock/profileMasterClass3.png';
import profileMasterClassImg4 from '@images/mock/profileMasterClass4.png';

const sliderOptions = {
    spaceBetween: 24,
    slidesOffsetBefore: 24,
    slidesOffsetAfter: 24,
    slidesPerView: 2.5,
    grabCursor: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
    },

    breakpoints: {
        [breakpoints.tablet - 1]: {
            slidesPerView: 1.2,
            spaceBetween: 16,
            slidesOffsetBefore: 16,
            slidesOffsetAfter: 16,
        },
    },
};

const panelScrollOffset = 24;

export default {
    name: 'master-class',

    components: {
        yandexMap,
        ymapMarker,

        VSvg,
        VButton,
        VLink,
        VHtml,
        VSlider,
        VPicture,
        VExpander,

        Breadcrumbs,
        BreadcrumbItem,

        Price,
        TicketCard,
        BannerCard,
        AuthorCard,
        InstagramCard,
        MasterClassBannerCard,
        AttentionPanel,
    },

    data() {
        return {
            showMap: false,
            isPanelVisible: false,

            markerIcon: {
                layout: 'default#image',
                imageHref: pin,
                imageSize: [24, 24],
                imageOffset: [0, 0],
            },

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
            ],

            inCart: [], // мок корзина
        };
    },

    computed: {
        ...mapState([SCROLL]),
        ...mapState('route', { code: state => state.params.code }),
        ...mapState(MASTERCLASS_MODULE, [MASTERCLASS, FEATURED_MASTERCLASSES, INSTAGRAM_ITEMS]),
        ...mapState(GEO_MODULE, [SELECTED_CITY]),
        ...mapState(MODAL_MODULE, {}),

        rootTitle() {
            return this.$t('masterclasses.title');
        },

        mapSettings() {
            return { ...yaMapSettings };
        },

        sliderOptions() {
            return sliderOptions;
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        ...mapActions(MASTERCLASS_MODULE, [FETCH_MASTERCLASS_DATA]),
        ...mapActions(CART_MODULE, [ADD_CART_ITEM]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        generateSourcePath(x, y, id, ext) {
            return generatePictureSourcePath(x, y, id, ext);
        },

        generateMasterclassUrl(code) {
            return generateMasterclassUrl(code);
        },

        onAddToCart(id, count) {
            if (!this.inCart.some(i => i.id === id)) this.inCart.push({ id, count });
        },

        isInCart(id) {
            return this.inCart.some(i => i.id === id);
        },

        onPanelVisibilityChanged(isVisible) {
            this.isPanelVisible = !isVisible;
        },

        onBuyBtnClick() {
            const { panel } = this.$refs;
            window.scrollTo({ top: panel.offsetTop - panelScrollOffset, behavior: 'smooth' });
        },

        onShowMap() {
            const { map } = this.$refs;
            window.scrollTo({ top: map.offsetTop - panelScrollOffset, behavior: 'smooth' });
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
        registerModuleIfNotExists($store, MASTERCLASS_MODULE, masterClassModule);
        const { masterClassCode } = $store.state[MASTERCLASS_MODULE];

        // если все загружено, пропускаем
        if (masterClassCode === code) next();
        else {
            $progress.start();
            $store
                .dispatch(`${MASTERCLASS_MODULE}/${FETCH_MASTERCLASS_DATA}`, { code })
                .then(() => next(vm => $progress.finish()))
                .catch(error => {
                    $progress.fail();
                    next();
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

        const { fias_id } = this.selectedCity;

        const {
            params: { code },
        } = to;

        this.debounce_fetchProduct(code);
        next();
    },

    beforeMount() {
        this.debounce_fetchProduct = _debounce(async code => {
            try {
                const { masterClassCode } = this;

                if (masterClassCode !== code) {
                    this.$progress.start();
                    await this[FETCH_MASTERCLASS_DATA]({ code });
                    this.$progress.finish();
                }
            } catch (error) {
                this.$progress.fail();
                this.$progress.finish();
            }
        }, 500);
    },

    mounted() {
        setTimeout(() => (this.showMap = true), 300);
    },
};
</script>
