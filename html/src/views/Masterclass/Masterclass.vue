<template>
    <section class="section master-class-view">
        <div class="container master-class-view__header">
            <breadcrumbs class="container container--tablet-lg master-class-view__breadcrumbs">
                <breadcrumb-item key="main" to="/">
                    Главная
                </breadcrumb-item>
                <breadcrumb-item key="root" :to="rootUrl">
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
                    <div class="container container--tablet master-class-view__panel-right">
                        <div class="master-class-view__panel-right-section">
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
                        <div class="master-class-view__panel-right-section">
                            <p class="text-bold master-class-view__panel-right-hl">
                                Дата и время
                            </p>
                            <p>{{ masterClass.date }}</p>
                            <p><a>Задать вопрос организатору</a></p>
                        </div>
                        <div class="master-class-view__panel-right-section">
                            <p class="text-bold master-class-view__panel-right-hl">
                                Место проведения
                            </p>
                            <p>{{ masterClass.address }}</p>
                            <p><a>Задать вопрос организатору</a></p>
                        </div>
                        <div class="master-class-view__panel-right-section">
                            <p class="text-bold master-class-view__panel-right-hl">
                                Поделиться
                            </p>
                            <v-svg name="vkontakte-bw" width="24" height="24" />
                            <v-svg name="facebook-bw" width="24" height="24" />
                            <v-svg name="instagram-bw" width="24" height="24" />
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- <section class="section master-class-view__section">
            <div class="container master-class-view__socials">
                <div class="master-class-view__socials-inner">
                    <div class="master-class-view__socials-statistics">
                        <div>
                            <v-svg name="cart-empty" width="24" height="24" />
                        </div>
                        <div>
                            <div>32 человека уже купили это товар</div>
                            <div class="text-grey">за последние 2 месяца</div>
                        </div>
                    </div>
                    <div class="master-class-view__socials-share">
                        <span class="text-bold">Поделиться</span>&nbsp;
                        <v-svg name="vkontakte-bw" width="24" height="24" />
                        <v-svg name="facebook-bw" width="24" height="24" />
                        <v-svg name="instagram-bw" width="24" height="24" />
                    </div>
                </div>
            </div>
        </section> -->

        <section
            v-if="masterclassBanners && masterclassBanners.length > 0"
            class="section master-class-view__masterclass"
        >
            <div class="container master-class-view__masterclass-container">
                <h2 class="master-class-view__section-hl master-class-view__masterclass-hl">
                    {{ $t('product.title.masterClasses') }}
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
                    :options="instagramOptions"
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
                <v-button class="btn--outline master-class-view__section-link master-class-view__instagram-link">
                    {{ $t('landing.subscribe') }}
                </v-button>
            </div>
        </section>

        <transition :name="pricePanelAnimation" appear> </transition>

        <transition name="fade"> </transition>
    </section>
</template>

<script>
import VSvg from '../../components/controls/VSvg/VSvg.vue';
import VLink from '../../components/controls/VLink/VLink.vue';
import VButton from '../../components/controls/VButton/VButton.vue';
import VHtml from '../../components/controls/VHtml/VHtml.vue';
import VSlider from '../../components/controls/VSlider/VSlider.vue';
import VPicture from '../../components/controls/VPicture/VPicture.vue';
import VExpander from '../../components/VExpander/VExpander.vue';

import Price from '../../components/Price/Price.vue';
import AuthorCard from '../../components/AuthorCard/AuthorCard.vue';
import BannerCard from '../../components/BannerCard/BannerCard.vue';
import InstagramCard from '../../components/InstagramCard/InstagramCard.vue';
import MasterClassBannerCard from '../../components/MasterClassBannerCard/MasterClassBannerCard.vue';

import AttentionPanel from '../../components/AttentionPanel/AttentionPanel.vue';

import Breadcrumbs from '../../components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '../../components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';

import { $store, $progress, $logger } from '../../services/ServiceLocator';

import { mapState, mapActions, mapGetters } from 'vuex';
import { SCROLL } from '../../store';

import masterClassModule, {
    NAME as MASTERCLASS_MODULE,
    MASTERCLASS,
    FEATURED_MASTERCLASSES,
    INSTAGRAM_ITEMS,
} from '../../store/modules/Masterclass';
import { FETCH_MASTERCLASS_DATA } from '../../store/modules/Masterclass/actions';

import { NAME as CART_MODULE } from '../../store/modules/Cart';
import { ADD_CART_ITEM } from '../../store/modules/Cart/actions';

import { NAME as GEO_MODULE, SELECTED_CITY } from '../../store/modules/Geolocation';

import { NAME as MODAL_MODULE, MODALS } from '../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../store/modules/Modal/actions';

import _debounce from 'lodash/debounce';
import { registerModuleIfNotExists } from '../../util/store';
import { generatePictureSourcePath } from '../../util/images';
import { generateCategoryUrl } from '../../util/catalog';
import { breakpoints, productGroupTypes } from '../../assets/scripts/enums';
import productBrand1 from '../../assets/images/mock/brandProduct1.png';

import '../../assets/images/sprites/socials/vkontakte-bw.svg';
import '../../assets/images/sprites/socials/facebook-bw.svg';
import '../../assets/images/sprites/socials/instagram-bw.svg';

import '../../assets/images/sprites/cart-empty.svg';
import '../../assets/images/sprites/star-empty-small.svg';
import '../../assets/images/sprites/star-small.svg';
import '../../assets/images/sprites/arrow-small.svg';
import '../../assets/images/sprites/wishlist-middle.svg';
import './Masterclass.css';

import profileMasterClassImg1 from '../../assets/images/mock/profileMasterClass1.png';
import profileMasterClassImg2 from '../../assets/images/mock/profileMasterClass2.png';
import profileMasterClassImg3 from '../../assets/images/mock/profileMasterClass3.png';
import profileMasterClassImg4 from '../../assets/images/mock/profileMasterClass4.png';

const productGalleryOptions = {
    spaceBetween: 8,
    slidesPerView: 1.5,
    slidesOffsetBefore: 24,
    slidesOffsetAfter: 24,
    grabCursor: true,

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    breakpoints: {
        [breakpoints.tablet - 1]: {
            slidesPerView: 1,
            spaceBetween: 0,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
            },
        },
    },
};

const sliderOptions = {
    spaceBetween: 24,
    slidesPerView: 4,
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
        [breakpoints.tabletLg - 1]: {
            slidesPerView: 3.5,
            slidesOffsetBefore: 24,
            slidesOffsetAfter: 24,
        },

        [breakpoints.tablet - 1]: {
            slidesPerView: 2,
            spaceBetween: 12,
            slidesOffsetBefore: 0,
            slidesOffsetAfter: 0,
        },
    },
};

const instagramOptions = {
    spaceBetween: 24,
    slidesOffsetBefore: 24,
    slidesOffsetAfter: 24,
    slidesPerView: 3.5,
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
            slidesPerView: 1.5,
            spaceBetween: 16,
            slidesOffsetBefore: 16,
            slidesOffsetAfter: 16,
        },
    },
};

export default {
    name: 'master-class',

    components: {
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
        BannerCard,
        AuthorCard,
        InstagramCard,
        MasterClassBannerCard,
        AttentionPanel,
    },

    data() {
        return {
            isPriceVisible: true,
            mockImg: productBrand1,

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
        };
    },

    computed: {
        ...mapState([SCROLL]),
        ...mapState('route', { code: state => state.params.code }),
        ...mapState(MASTERCLASS_MODULE, [MASTERCLASS, FEATURED_MASTERCLASSES, INSTAGRAM_ITEMS]),
        ...mapState(GEO_MODULE, [SELECTED_CITY]),
        ...mapState(MODAL_MODULE, {}),

        rootUrl() {
            return generateCategoryUrl(productGroupTypes.MASTERCLASSES);
        },

        rootTitle() {
            return this.$t(`productGroups.title.${productGroupTypes.MASTERCLASSES}`);
        },

        productGalleryOptions() {
            return productGalleryOptions;
        },

        sliderOptions() {
            return sliderOptions;
        },

        instagramOptions() {
            return instagramOptions;
        },

        pricePanelAnimation() {
            return this.isTablet ? 'slide-bottom' : 'slide-top';
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    watch: {
        [SELECTED_CITY](value) {
            // const { productCode } = this.product;
            // const { fias_id } = value;categoryCodes
            // this.debounce_fetchProduct(to, from);
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
            return generateCategoryUrl(productGroupTypes.MASTERCLASSES, code);
        },

        onPreview(code) {
            this[CHANGE_MODAL_STATE]({ name: QUICK_VIEW_MODAL_NAME, open: true, state: { code } });
        },

        onShowGallery() {
            this[CHANGE_MODAL_STATE]({ name: GALLERY_MODAL_NAME, open: true });
        },

        onAddToCart(item) {
            this[CHANGE_MODAL_STATE]({
                name: ADD_TO_CART_MODAL_NAME,
                open: true,
                state: { offerId: item.id, type: item.type },
            });
        },

        onPriceVisibilityChanged(isVisible) {
            this.isPriceVisible = isVisible;
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
};
</script>
