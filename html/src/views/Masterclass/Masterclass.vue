<template>
    <section class="section master-class-view">
        <div class="container master-class-view__header">
            <breadcrumbs class="container container--tablet-lg master-class-view__breadcrumbs">
                <breadcrumb-item key="main" to="/">
                    <v-svg v-if="isTablet" name="home" width="10" height="10" />
                    <span v-else>Главная</span>
                </breadcrumb-item>
                <breadcrumb-item key="root" to="/masterclasses">
                    {{ rootTitle }}
                </breadcrumb-item>
                <breadcrumb-item :key="masterClass.code" :to="{ path: $route.path }">
                    {{ masterClass.title }}
                </breadcrumb-item>
            </breadcrumbs>

            <master-class-banner-card
                class="master-class-view__banner"
                :image="bannerImage"
                :name="masterClass.title"
                :price="masterClass.price"
                btn-text="Купить билет"
                show-btn
                @btnClick="onScrollTo($refs.panel)"
            >
                <source :data-srcset="bannerImage.desktopImg.webp" type="image/webp" media="(min-width: 768px)" />
                <source :data-srcset="bannerImage.desktopImg.orig" media="(min-width: 768px)" />
                <source :data-srcset="bannerImage.mobileImg.webp" type="image/webp" media="(min-width: 320px)" />
                <source :data-srcset="bannerImage.mobileImg.orig" media="(min-width: 320px)" />
                <img class="blur-up lazyload v-picture__img" :data-src="bannerImage.defaultImg" alt="" />
            </master-class-banner-card>
        </div>

        <section class="section master-class-view__section master-class-view__panel">
            <div class="container master-class-view__panel-container">
                <div class="master-class-view__panel-body">
                    <div class="container container--tablet master-class-view__panel-left">
                        <attention-panel v-if="anotherCities && anotherCities.length > 0">
                            <span>
                                <strong>Внимание!</strong> Событие проходит в другом городе<br />
                                ({{ anotherCities.join(', ') }})
                            </span>
                        </attention-panel>
                    </div>

                    <div class="master-class-view__panel-middle">
                        <p class="container container--tablet text-bold master-class-view__section-hl">
                            Описание
                        </p>

                        <v-html
                            class="container container--tablet master-class-view__panel-middle-desc"
                            v-html="masterClass.description.content"
                        />

                        <div v-for="image in descriptionGallery" :key="image.value.id">
                            <v-picture>
                                <source :data-srcset="image.desktopImg.webp" type="image/webp" />
                                <source :data-srcset="image.desktopImg.orig" />
                                <img class="blur-up lazyload v-picture__img" :data-src="image.defaultImg" alt="" />
                            </v-picture>
                        </div>
                    </div>

                    <div class="master-class-view__panel-right">
                        <div class="container container--tablet master-class-view__panel-right-section">
                            <p class="text-bold master-class-view__panel-right-hl">
                                Спикеры
                            </p>

                            <v-expander v-if="speakers && speakers.length > 2" :min-height="160">
                                <ul>
                                    <author-card
                                        class="master-class-view__panel-right-card"
                                        v-for="speaker in speakers"
                                        :key="speaker.id"
                                        :first-name="speaker.firstName"
                                        :last-name="speaker.lastName"
                                        :nick-name="speaker.profession"
                                        :image="speaker.avatar.defaultImg"
                                        :description="speaker.description"
                                        @show="onShowSpeaker(speaker)"
                                    />
                                </ul>

                                <template v-slot:btn="{ isExpanded }">
                                    {{ isExpanded ? 'Скрыть' : 'Все спикеры' }}
                                </template>
                            </v-expander>
                            <ul v-else>
                                <author-card
                                    class="master-class-view__panel-right-card"
                                    v-for="speaker in speakers"
                                    :key="speaker.id"
                                    :first-name="speaker.firstName"
                                    :last-name="speaker.lastName"
                                    :nick-name="speaker.profession"
                                    :image="speaker.avatar.defaultImg"
                                    :description="speaker.description"
                                    @show="onShowSpeaker(speaker)"
                                />
                            </ul>
                        </div>

                        <div class="container container--tablet master-class-view__panel-right-section">
                            <p class="text-bold master-class-view__panel-right-hl">
                                Дата и время
                            </p>

                            <ul>
                                <li v-for="date in dates" :key="date">
                                    <span>{{ date }}</span>
                                </li>
                            </ul>

                            <v-link
                                class="master-class-view__panel-right-link"
                                tag="button"
                                @click="onScrollTo($refs.contacts)"
                            >
                                Задать вопрос организатору
                            </v-link>
                        </div>

                        <div class="container container--tablet master-class-view__panel-right-section">
                            <p class="text-bold master-class-view__panel-right-hl">
                                Место проведения
                            </p>

                            <ol :class="{ list: places.length > 1 }">
                                <li v-for="place in places" :key="place.id">
                                    <span>{{ place.name }}, {{ place.address }}</span>
                                </li>
                            </ol>

                            <v-link
                                class="master-class-view__panel-right-link"
                                tag="button"
                                @click="onScrollTo($refs.map)"
                            >
                                Посмотреть на карте
                            </v-link>
                        </div>

                        <div
                            class="container container--tablet master-class-view__panel-right-section"
                            v-for="document in documents"
                            :key="document.id"
                        >
                            <p class="text-bold master-class-view__panel-right-hl">
                                {{ document.name }}
                            </p>
                            <div>{{ document.description }} (<a :href="document.file.url" download>ссылка</a>)</div>
                        </div>

                        <div
                            v-if="!isTablet"
                            class="container container--tablet master-class-view__panel-right-section master-class-view__panel-right-social"
                        >
                            <p class="text-bold master-class-view__panel-right-hl">
                                Поделиться
                            </p>

                            <div class="master-class-view__panel-right-social-container">
                                <social-sharing v-bind="socialSharing" inline-template>
                                    <div :style="{ display: 'flex' }">
                                        <network class="network" network="vk">
                                            <v-svg name="vkontakte-bw" width="24" height="24" />
                                        </network>
                                        <network class="network" network="facebook">
                                            <v-svg name="facebook-bw" width="24" height="24" />
                                        </network>
                                    </div>
                                </social-sharing>

                                <button class="network" @click="onCopyToClipboard">
                                    <v-svg name="link" width="24" height="24" />
                                </button>
                            </div>

                            <!-- <v-svg name="facebook-bw" width="24" height="24" />
                            <v-svg name="vkontakte-bw" width="24" height="24" />
                            <v-svg name="ok-bw" width="24" height="24" />
                            <v-svg name="twitter-bw" width="24" height="24" />
                            <v-svg name="telegram-bw" width="24" height="24" />
                            <v-svg name="link" width="24" height="24" /> -->
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section master-class-view__section">
            <div class="container master-class-view__panel-container">
                <div class="master-class-view__panel">
                    <div class="master-class-view__panel-body master-class-view__panel-body--accordion">
                        <div class="master-class-view__panel-left"></div>
                        <div class="master-class-view__panel-middle master-class-view__panel-middle--no-padding">
                            <p class="container container--tablet text-bold master-class-view__section-hl">
                                Программа
                            </p>

                            <v-accordion class="master-class-view__accordion" :items="stages" key-field="id">
                                <template v-slot:header="{ item }">
                                    <div class="master-class-view__accordion-header">
                                        <div class="master-class-view__accordion-header-info">
                                            <h4 class="master-class-view__accordion-header-name">
                                                {{ item.name }}
                                            </h4>
                                            <div class="text-sm text-grey">{{ item.date }}</div>
                                            <div>{{ item.address }}</div>
                                        </div>

                                        <ul class="master-class-view__accordion-header-speakers">
                                            <author-card
                                                class="master-class-view__panel-right-card"
                                                v-for="speaker in item.stageSpeakers"
                                                :key="speaker.id"
                                                :first-name="speaker.firstName"
                                                :last-name="speaker.lastName"
                                                :nick-name="speaker.profession"
                                                :image="speaker.avatar.defaultImg"
                                            />
                                        </ul>
                                    </div>
                                </template>

                                <template v-slot:content="{ item }">
                                    <div class="master-class-view__accordion-content">
                                        <div class="master-class-view__panel">
                                            <div
                                                class="container container--tablet master-class-view__panel-body master-class-view__panel-body--accordion"
                                            >
                                                <v-html
                                                    class="master-class-view__panel-middle"
                                                    :style="{ order: 0 }"
                                                    v-html="item.description"
                                                />

                                                <div class="master-class-view__panel-right" :style="{ order: 1 }">
                                                    <p class="text-bold master-class-view__panel-right-hl">
                                                        Что взять с собой
                                                    </p>
                                                    <v-html v-html="item.raider" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </template>
                            </v-accordion>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section
            class="section master-class-view__section master-class-view__gallery"
            v-if="gallery && gallery.length > 0"
        >
            <div class="container" v-if="!isTablet">
                <ul class="master-class-view__gallery-list">
                    <li
                        class="master-class-view__gallery-item"
                        v-for="media in gallery"
                        :key="media.value.id || media.id"
                    >
                        <v-picture v-if="media.type === mediaType.IMAGE">
                            <source :data-srcset="media.desktopImg.webp" type="image/webp" />
                            <source :data-srcset="media.desktopImg.orig" />
                            <img class="blur-up lazyload v-picture__img" :data-src="media.defaultImg" alt="" />
                        </v-picture>
                        <v-youtube :code="media.value" v-else-if="media.type === mediaType.YOUTUBE" />
                        <v-video controls v-else-if="media.type === mediaType.VIDEO">
                            <source :src="media.src" :type="media.mimeType" />
                        </v-video>
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
                    v-for="media in gallery"
                    :key="media.value.id || media.id"
                >
                    <v-picture v-if="media.type === 'image'">
                        <source :data-srcset="media.desktopImg.webp" type="image/webp" />
                        <source :data-srcset="media.desktopImg.orig" />
                        <img class="blur-up lazyload v-picture__img" :data-src="media.defaultImg" alt="" />
                    </v-picture>
                    <v-youtube :code="media.value" v-else-if="media.type === 'youtube'" />
                    <v-video controls v-else-if="media.type === 'video'">
                        <source :src="media.src" :type="media.mimeType" />
                    </v-video>
                </div>
            </v-slider>
        </section>

        <div
            v-if="isTablet"
            class="container container--tablet master-class-view__panel-right-section master-class-view__panel-right-social"
        >
            <p class="text-bold master-class-view__panel-right-hl">
                Поделиться
            </p>

            <div class="master-class-view__panel-right-social-container">
                <social-sharing v-bind="socialSharing" inline-template>
                    <div :style="{ display: 'flex' }">
                        <network class="network" network="vk">
                            <v-svg name="vkontakte-bw" width="24" height="24" />
                        </network>
                        <network class="network" network="facebook">
                            <v-svg name="facebook-bw" width="24" height="24" />
                        </network>
                    </div>
                </social-sharing>

                <button class="network" @click="onCopyToClipboard">
                    <v-svg name="link" width="24" height="24" />
                </button>
            </div>
            <!-- <v-svg name="facebook-bw" width="24" height="24" />
            <v-svg name="vkontakte-bw" width="24" height="24" />
            <v-svg name="ok-bw" width="24" height="24" />
            <v-svg name="twitter-bw" width="24" height="24" />
            <v-svg name="telegram-bw" width="24" height="24" />
            <v-svg name="link" width="24" height="24" /> -->
        </div>

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
                        v-for="ticket in masterClass.ticketTypes"
                        :key="ticket.id"
                        :name="ticket.name"
                        :description="ticket.description"
                        :max="ticket.qty - ticket.qtyOccupied"
                        :price="ticket.price"
                        :old-price="ticket.oldPrice"
                        :disabled="isInCart(ticket.offerId) || inProcess[ticket.offerId]"
                        :in-process="!!inProcess[ticket.offerId]"
                        :show-count="!masterClass.hideTicketTypesQtyFree"
                        @btnClick="onAddToCart(ticket.offerId, $event)"
                    >
                        <template v-if="!isTablet">
                            {{ isInCart(ticket.offerId) ? 'Перейти в корзину' : 'Добавить в корзину' }}
                        </template>
                        <template v-else>
                            {{ isInCart(ticket.offerId) ? 'В корзину' : 'Добавить' }}
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
                <div
                    class="container container--tablet master-class-view__map-info"
                    v-for="(place, index) in places"
                    :key="place.id"
                >
                    <div v-if="isTabletLg" class="master-class-view__map-desc">
                        <div>
                            <template v-if="places.length > 1">{{ index + 1 }}.</template> {{ place.name }},
                            {{ place.address }}
                        </div>
                    </div>
                    <template v-else>
                        <div class="master-class-view__map-desc">
                            <div
                                :class="{
                                    'text-bold': places.length > 1 || (!!place.address && place.gallery.length > 0),
                                }"
                            >
                                <template v-if="places.length > 1">{{ index + 1 }}.</template> {{ place.name }},
                                {{ place.address }}
                            </div>
                            <div>{{ place.description }}</div>
                        </div>

                        <ul class="master-class-view__map-gallery">
                            <li
                                class="master-class-view__map-gallery-item"
                                v-for="image in place.gallery"
                                :key="image.value.id"
                            >
                                <v-picture>
                                    <source :data-srcset="image.desktopImg.webp" type="image/webp" />
                                    <source :data-srcset="image.desktopImg.orig" />
                                    <img class="blur-up lazyload v-picture__img" :data-src="image.defaultImg" alt="" />
                                </v-picture>
                            </li>
                        </ul>
                    </template>
                </div>

                <yandex-map
                    v-if="showMap && mapCoords"
                    :coords="mapCoords"
                    :controls="[]"
                    :options="{ yandexMapDisablePoiInteractivity: true }"
                    :settings="mapSettings"
                    :show-all-markers="places && places.length > 1"
                >
                    <ymap-marker
                        v-for="place in places"
                        :key="`masterclass-point-${place.id}`"
                        :marker-id="`masterclass-point-${place.id}`"
                        :coords="place.coords"
                        :icon="markerIcon"
                    />
                </yandex-map>
            </div>
        </section>

        <section
            class="section master-class-view__section master-class-view__contacts"
            ref="contacts"
            v-if="masterClass.organizer"
        >
            <div class="container master-class-view__contacts-container">
                <h2 class="container container--tablet master-class-view__section-hl">
                    Контакты организатора
                </h2>
                <div class="master-class-view__contacts-panel">
                    <p class="master-class-view__contacts-panel-hl">
                        По всем вопросам и предложениям обращаться к организатору
                    </p>
                    <p class="text-bold master-class-view__contacts-panel-name">
                        {{ masterClass.organizer.name }}
                    </p>
                    <p class="text-grey master-class-view__contacts-panel-desc">
                        {{ masterClass.organizer.description }}
                    </p>
                    <div class="master-class-view__contacts-panel-bottom">
                        <info-row
                            class="master-class-view__contacts-panel-row"
                            name="Телефон"
                            :value="masterClass.organizer.phone"
                        />
                        <info-row
                            class="master-class-view__contacts-panel-row"
                            name="Email"
                            :value="masterClass.organizer.email"
                        />
                        <info-row
                            class="master-class-view__contacts-panel-row"
                            name="WhatsApp, Viber, Telegram"
                            :value="masterClass.organizer.phone"
                        />
                        <info-row
                            class="master-class-view__contacts-panel-row"
                            name="Сайт"
                            :value="masterClass.organizer.site"
                        />

                        <v-button
                            class="master-class-view__contacts-panel-btn"
                            :href="`mailto:${masterClass.organizer.email}`"
                        >
                            Написать
                        </v-button>
                    </div>
                </div>
            </div>
        </section>

        <!-- <section
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
        </section> -->

        <section class="section master-class-view__section master-class-view__instagram">
            <div class="container master-class-view__instagram-container">
                <frisbuy-product-container :script="frisbuyScript" />
            </div>
        </section>

        <section class="section product-view__section">
            <div class="container">
                <reviews-panel
                    :key="masterClass.code"
                    :code="masterClass.code"
                    :type="productType"
                    :can-add="masterClass.canWriteReview"
                />
            </div>
        </section>

        <transition :name="pricePanelAnimation" appear>
            <masterclass-price-panel
                class="master-class-view__top-panel"
                v-if="(scroll && !isPanelVisible) || isTablet"
                :name="masterClass.title"
                :price-to="masterClass.priceTo"
                :price-from="masterClass.priceFrom"
                @add-item="onScrollTo($refs.panel)"
            >
                {{ buyBtnText }}
            </masterclass-price-panel>
        </transition>

        <transition name="fade-in">
            <author-modal v-if="$isServer || isAuthorOpen" />
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
import VRating from '@controls/VRating/VRating.vue';
import VAccordion from '@controls/VAccordion/VAccordion.vue';
import VVideo from '@controls/VVideo/VVideo.vue';
import VYoutube from '@controls/VYoutube/VYoutube.vue';

import FrisbuyProductContainer from '@components/FrisbuyProductContainer/FrisbuyProductContainer.vue';

import Price from '@components/Price/Price.vue';
import TicketCard from '@components/TicketCard/TicketCard.vue';
import AuthorCard from '@components/AuthorCard/AuthorCard.vue';
import BannerCard from '@components/BannerCard/BannerCard.vue';
import InstagramCard from '@components/InstagramCard/InstagramCard.vue';
import MasterClassBannerCard from '@components/MasterClassBannerCard/MasterClassBannerCard.vue';

import InfoRow from '@components/profile/InfoRow/InfoRow.vue';
import AttentionPanel from '@components/AttentionPanel/AttentionPanel.vue';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '@components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';

import ReviewsPanel from '@components/reviews/ReviewsPanel/ReviewsPanel.vue';
import MasterclassPricePanel from '@components/MasterclassPricePanel/MasterclassPricePanel.vue';

import AuthorModal from '@components/AuthorModal/AuthorModal.vue';

import { $store, $progress, $logger } from '@services';

import { mapState, mapActions, mapGetters } from 'vuex';
import { SCROLL, LOCALE } from '@store';

import {
    NAME as MASTERCLASS_MODULE,
    MASTERCLASS,
    FEATURED_MASTERCLASSES,
    INSTAGRAM_ITEMS,
} from '@store/modules/Masterclass';
import { FETCH_MASTERCLASS_DATA } from '@store/modules/Masterclass/actions';

import { NAME as CART_MODULE } from '@store/modules/Cart';
import { IS_IN_CART } from '@store/modules/Cart/getters';
import { ADD_MASTERCLASS_ITEM } from '@store/modules/Cart/actions';

import { NAME as GEO_MODULE, SELECTED_CITY } from '@store/modules/Geolocation';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import _debounce from 'lodash/debounce';
import { saveToClipboard, getDate } from '@util';
import { registerModuleIfNotExists } from '@util/store';
import { generatePictureSourcePath, generateFileOriginalPath } from '@util/file';
import { getInstagramUserNameFromUrl } from '@util/socials';
import { generateAbsoluteMasterclassUrl } from '@util/catalog';
import { yaMapSettings, dayMonthLongDateSettings, hourMinuteTimeSettings } from '@settings';
import { breakpoints, fileExtension, modalName, mediaType } from '@enums';
import { productGroupTypes, cartItemTypes } from '@enums/product';

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
import '@images/sprites/info-middle.svg';
import '@images/sprites/home.svg';
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
        clickable: true,
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
        VAccordion,
        VVideo,
        VYoutube,

        Breadcrumbs,
        BreadcrumbItem,
        Price,

        InfoRow,
        AttentionPanel,
        ReviewsPanel,
        MasterclassPricePanel,
        AuthorModal,

        TicketCard,
        BannerCard,
        AuthorCard,
        InstagramCard,
        MasterClassBannerCard,

        FrisbuyProductContainer,
    },

    data() {
        return {
            showMap: false,
            isPanelVisible: false,
            inProcess: {},

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
        };
    },

    computed: {
        ...mapState([SCROLL, LOCALE]),
        ...mapState('route', { code: state => state.params.code }),
        ...mapState(MASTERCLASS_MODULE, [MASTERCLASS, FEATURED_MASTERCLASSES, INSTAGRAM_ITEMS]),
        ...mapState(GEO_MODULE, [SELECTED_CITY]),
        ...mapGetters(CART_MODULE, [IS_IN_CART]),
        ...mapState(MODAL_MODULE, {
            isAuthorOpen: state =>
                state[MODALS][modalName.masterclass.AUTHOR] && state[MODALS][modalName.masterclass.AUTHOR].open,
        }),

        absoluteUrl() {
            const { code } = this;
            return code && generateAbsoluteMasterclassUrl(code);
        },

        socialSharing() {
            const { absoluteUrl, masterClass = {} } = this;
            const { description = {} } = masterClass;

            return {
                url: absoluteUrl,
                title: masterClass.title,
                description: description.content,
            };
        },

        documents() {
            const { documents = [] } = this[MASTERCLASS] || {};
            return documents.map(d => ({
                ...d,
                file: {
                    ...d.file,
                    url: generateFileOriginalPath(d.file.id),
                },
            }));
        },

        pricePanelAnimation() {
            return this.isTablet ? 'slide-bottom' : 'slide-top';
        },

        buyBtnText() {
            return this.isTablet ? 'Купить билет' : 'Купить';
        },

        frisbuyScript() {
            const { speakers = [] } = this[MASTERCLASS] || {};
            const instagramSpeaker = speakers.find(s => !!s.instagram);

            return (
                instagramSpeaker &&
                `https://www.frisbuy.ru/fb/widget?embed_id=aebd8bf5-9f42-11ea-ba01-0242ac150002&author=${getInstagramUserNameFromUrl(
                    instagramSpeaker.instagram
                )}`
            );
        },

        mapCoords() {
            const { places } = this;
            return places.length > 1 ? [0, 0] : (places[0] && places[0].coords) || null;
        },

        bannerImage() {
            const { detailImage } = this[MASTERCLASS] || {};

            if (detailImage)
                return {
                    desktopImg: {
                        webp: generatePictureSourcePath(1224, 360, detailImage.id, fileExtension.image.WEBP),
                        orig: generatePictureSourcePath(1224, 360, detailImage.id),
                    },

                    mobileImg: {
                        webp: generatePictureSourcePath(320, 240, detailImage.id, fileExtension.image.WEBP),
                        orig: generatePictureSourcePath(320, 240, detailImage.id),
                    },

                    defaultImg: generatePictureSourcePath(1224, 360, detailImage.id),
                };
        },

        descriptionGallery() {
            const {
                description: { gallery = [] },
            } = this[MASTERCLASS] || { description: {} };

            return gallery.map(i => {
                const desktopImg = {
                    webp: generatePictureSourcePath(600, 320, i.value.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(600, 320, i.value.id),
                };
                const defaultImg = generatePictureSourcePath(600, 320, i.value.id);

                return {
                    ...i,
                    desktopImg,
                    defaultImg,
                };
            });
        },

        stages() {
            const { stages = [] } = this[MASTERCLASS] || {};
            const { speakers = [], places = [], dates = [] } = this;

            return stages.map((s, index) => {
                const stageSpeakers = speakers.filter(sp => s.speakerIds && s.speakerIds.includes(sp.id));
                const place = places.find(p => p.id === s.placeId);
                const date = dates[index];
                return { ...s, stageSpeakers, date, address: place && place.address };
            });
        },

        dates() {
            const { stages = [] } = this[MASTERCLASS] || {};

            return stages.map(s => {
                const dateObj = getDate(s.date);
                const dateFrom = getDate(`${s.date} ${s.timeFrom}`);
                const dateTo = getDate(`${s.date} ${s.timeTo}`);

                return `${dateObj.toLocaleDateString(
                    this[LOCALE],
                    dayMonthLongDateSettings
                )}, ${dateFrom.toLocaleTimeString(this[LOCALE], hourMinuteTimeSettings)} - ${dateTo.toLocaleTimeString(
                    this[LOCALE],
                    hourMinuteTimeSettings
                )}`;
            });
        },

        gallery() {
            const { gallery = [] } = this[MASTERCLASS] || {};

            return gallery.map(i => {
                switch (i.type) {
                    case mediaType.IMAGE: {
                        const desktopImg = {
                            webp: generatePictureSourcePath(500, 500, i.value.id, fileExtension.image.WEBP),
                            orig: generatePictureSourcePath(500, 500, i.value.id),
                        };
                        const defaultImg = generatePictureSourcePath(500, 500, i.value.id);

                        return {
                            ...i,
                            desktopImg,
                            defaultImg,
                        };
                    }
                    case mediaType.VIDEO: {
                        return {
                            ...i,
                            src: generateFileOriginalPath(i.value.id),
                            mimeType: `video/${i.value.sourceExt}`,
                        };
                    }
                    case mediaType.YOUTUBE:
                        return {
                            ...i,
                            id: i.value,
                        };
                    default:
                        return i;
                }
            });
        },

        speakers() {
            const { speakers = [] } = this[MASTERCLASS] || {};

            return speakers.map(s => {
                if (s.avatar) s.avatar.defaultImg = generatePictureSourcePath(null, null, s.avatar.id);
                return s;
            });
        },

        places() {
            const { places = [] } = this[MASTERCLASS] || {};

            return places.map(p => ({
                ...p,
                coords: [Number(p.latitude), Number(p.longitude)],
                gallery: p.gallery.map(i => {
                    const desktopImg = {
                        webp: generatePictureSourcePath(200, 140, i.value.id, fileExtension.image.WEBP),
                        orig: generatePictureSourcePath(200, 140, i.value.id),
                    };
                    const defaultImg = generatePictureSourcePath(200, 140, i.value.id);
                    return { ...i, desktopImg, defaultImg };
                }),
            }));
        },

        anotherCities() {
            const selectedCity = this[SELECTED_CITY] || {};
            const { places = [] } = this[MASTERCLASS] || {};
            const cities = places.filter(p => p.fiasId !== selectedCity.fias_id).map(p => p.cityName);
            return [...new Set(cities)];
        },

        productType() {
            return cartItemTypes.MASTERCLASS;
        },

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
        ...mapActions(CART_MODULE, [ADD_MASTERCLASS_ITEM]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        generateMasterclassUrl(code) {
            return generateMasterclassUrl(code);
        },

        onCopyToClipboard(e) {
            const { absoluteUrl } = this;
            const result = saveToClipboard(absoluteUrl);
            const message = result ? 'Успешно скопировано' : 'Не удается скопировать';
            this[CHANGE_MODAL_STATE]({ name: modalName.general.NOTIFICATION, open: true, state: { message } });
            e.target.focus();
        },

        isInCart(id) {
            return this[IS_IN_CART](cartItemTypes.MASTERCLASS, id);
        },

        async onAddToCart(id, count) {
            const inCart = this.isInCart(id);
            if (inCart) this.$router.push({ name: 'Cart' });
            else {
                this.inProcess = { ...this.inProcess, [id]: true };
                await this[ADD_MASTERCLASS_ITEM]({ offerId: id, count });
                this.inProcess[id] = false;
            }
        },

        onPanelVisibilityChanged(isVisible) {
            this.isPanelVisible = isVisible;
        },

        onScrollTo(ref) {
            window.scrollTo({ top: ref.offsetTop - panelScrollOffset, behavior: 'smooth' });
        },

        onShowSpeaker(speaker) {
            this[CHANGE_MODAL_STATE]({ name: modalName.masterclass.AUTHOR, open: true, state: { author: speaker } });
        },
    },

    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        const {
            params: { code },
        } = to;

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

    created() {
        this.mediaType = mediaType;
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
