<template>
    <section class="section product-view">
        <div class="container">
            <transition-group tag="ol" class="section product-view__breadcrumbs" name="fade-in">
                <li class="product-view__breadcrumbs-item" key="main">
                    <router-link class="product-view__breadcrumbs-link" to="/">
                        Главная
                    </router-link>
                </li>

                <li class="product-view__breadcrumbs-item" key="all">
                    <router-link class="product-view__breadcrumbs-link" to="/catalog">
                        Каталог
                    </router-link>
                </li>

                <li
                    class="product-view__breadcrumbs-item"
                    v-for="category in product.categoryCodes"
                    :key="category.code"
                >
                    <router-link class="product-view__breadcrumbs-link" :to="`/catalog/${category.code}`">
                        {{ category.name }}
                    </router-link>
                </li>
            </transition-group>
        </div>
        <section class="section">
            <div class="container product-view__header">
                <v-sticky class="product-view__header-sticky">
                    <template v-slot:sticky>
                        <div v-if="!isTabletLg" class="product-view__header-gallery">
                            <div
                                class="product-view__header-gallery-item"
                                v-for="image in product.media"
                                :key="image.id"
                            >
                                <v-picture v-if="image && image.id" :image="image" alt="">
                                    <template v-slot:source="{ image, lazy }">
                                        <source
                                            :data-srcset="generateSourcePath(300, 300, image.id, 'webp')"
                                            type="image/webp"
                                            media="(min-width: 480px)"
                                        />
                                        <source
                                            :data-srcset="generateSourcePath(200, 200, image.id, 'webp')"
                                            type="image/webp"
                                            media="(max-width: 479px)"
                                        />
                                    </template>
                                    <template v-slot:fallback="{ image, lazy, alt }">
                                        <img
                                            class="blur-up lazyload v-picture__img"
                                            :data-src="generateSourcePath(300, 300, image.id, image.sourceExt)"
                                            :alt="alt"
                                        />
                                    </template>
                                </v-picture>
                            </div>
                        </div>
                        <v-slider
                            v-else
                            class="product-view__header-gallery"
                            name="gallery"
                            :options="productGalleryOptions"
                        >
                            <div
                                class="swiper-slide product-view__header-gallery-item"
                                v-for="image in product.media"
                                :key="image.id"
                            >
                                <v-picture v-if="image && image.id" :image="image" alt="">
                                    <template v-slot:source="{ image, lazy }">
                                        <source
                                            :data-srcset="generateSourcePath(300, 300, image.id, 'webp')"
                                            type="image/webp"
                                            media="(min-width: 480px)"
                                        />
                                        <source
                                            :data-srcset="generateSourcePath(200, 200, image.id, 'webp')"
                                            type="image/webp"
                                            media="(max-width: 479px)"
                                        />
                                    </template>
                                    <template v-slot:fallback="{ image, lazy, alt }">
                                        <img
                                            class="blur-up lazyload v-picture__img"
                                            :data-src="generateSourcePath(300, 300, image.id, image.sourceExt)"
                                            :alt="alt"
                                        />
                                    </template>
                                </v-picture>
                            </div>
                        </v-slider>
                    </template>
                </v-sticky>
                <div class="product-view__header-detail">
                    <h1 class="product-view__header-detail-hl">
                        {{ product.title }}
                    </h1>
                    <div class="product-view__header-detail-info">
                        <v-rating class="product-view__header-detail-info-rating" :value="product.rating" readonly>
                            <template v-slot:activeLabel>
                                <v-svg name="star-small" width="16" height="16" />
                            </template>
                            <template v-slot:inactiveLabel>
                                <v-svg name="star-empty-small" width="16" height="16" />
                            </template>
                        </v-rating>
                        <div class="text-grey product-view__header-detail-info-review">
                            {{ $t('product.review', { n: product.reviewsCount }) }}
                        </div>
                        <div class="text-grey product-view__header-detail-info-code">
                            {{ $t('product.vendorCode', { code: product.vendorCode }) }}
                        </div>
                    </div>

                    <!-- <div class="product-view__header-detail-section product-view__header-detail-options">
                        <div class="product-view__header-detail-options-selected">
                            <div>{{ product.option.title }}</div>
                            <div class="text-grey text-sm">16 оттенков</div>
                        </div>
                        <div class="product-view__header-detail-options-list">
                            <div
                                class="product-view__header-detail-options-item"
                                :class="{
                                    'product-view__header-detail-options-item--selected':
                                        option.value === product.option.value,
                                }"
                                v-for="option in product.options"
                                :key="option.id"
                            >
                                <div
                                    class="product-view__header-detail-options-item-square"
                                    :style="[{ backgroundColor: option.value, outlineColor: option.value }]"
                                />
                            </div>
                        </div>
                    </div> -->

                    <div
                        class="product-view__header-detail-section product-view__header-detail-panels"
                        v-observe-visibility="onPriceVisibilityChanged"
                    >
                        <div class="product-view__header-detail-price-panel">
                            <div class="product-view__header-detail-price-panel-prices">
                                <price
                                    class="text-bold product-view__header-detail-price-panel-current"
                                    :value="product.price.value"
                                    :currency="product.price.currency"
                                />
                                <price
                                    v-if="product.oldPrice"
                                    class="text-grey text-strike product-view__header-detail-price-panel-old"
                                    :value="product.oldPrice.value"
                                    :currency="product.oldPrice.currency"
                                />
                            </div>
                            <div class="text-grey product-view__header-detail-price-panel-bonus">
                                +{{ $t('product.bonus', { n: product.bonus }) }}
                            </div>
                        </div>
                        <div class="product-view__header-detail-control-panel">
                            <v-button
                                class="product-view__header-detail-control-panel-btn"
                                @click.prevent="ADD_CART_ITEM({ offerId: product.id })"
                            >
                                Добавить в корзину
                            </v-button>
                            <v-link class="product-view__header-detail-control-panel-wishlist">
                                <v-svg id="product-wishlist" name="wishlist-middle" width="20" height="18" />
                                &nbsp;В избранное
                            </v-link>
                        </div>
                    </div>

                    <div class="product-view__header-detail-section">
                        <p>
                            Получить в
                            <a href="#">г. Москва&nbsp;<v-svg name="arrow-down" width="12" height="12"/></a>
                        </p>
                        <p>
                            Экспресс доставка курьером — 550 ₽,
                            <span class="text-grey">сегодня,&nbsp;21&nbsp;июня</span>
                        </p>
                        <p>Доставка курьером — 350 ₽, <span class="text-grey">завтра,&nbsp;22&nbsp;июня</span></p>
                        <p>
                            Из пунктов <a href="#">выдачи</a> или <a href="#">постаматов</a> — бесплатно,
                            <span class="text-grey">23&nbsp;июня</span>
                        </p>
                    </div>

                    <div class="product-view__header-detail-section">
                        <p class="text-bold product-view__header-detail-section-hl">
                            Описание и характеристики
                        </p>
                        <p>
                            Двадцать три насыщенных, ярких оттенка помады воплощают в себе современную интерпретацию
                            классики от Тома Форда. Редкое экзотическое масло муру-муру из Бразилии и масло цветков
                            ромашки создают кремовую текстуру и обеспечивают...
                        </p>
                        <a href="#">Подробнее</a>
                    </div>
                    <div class="product-view__header-detail-section">
                        <div class="product-view__header-detail-brand">
                            <img class="product-view__header-detail-brand-img" :src="mockImg" />
                            <router-link class="product-view__header-detail-brand-link" to="/">
                                На страницу бренда
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section product-view__section">
            <div class="container product-view__socials">
                <div class="product-view__socials-inner">
                    <div class="product-view__socials-statistics">
                        <div>
                            <v-svg name="cart-empty" width="24" height="24" />
                        </div>
                        <div>
                            <div>32 человека уже купили это товар</div>
                            <div class="text-grey">за последние 2 месяца</div>
                        </div>
                    </div>
                    <div class="product-view__socials-share">
                        <span class="text-bold">Поделиться</span>&nbsp;
                        <v-svg name="vkontakte-bw" width="24" height="24" />
                        <v-svg name="facebook-bw" width="24" height="24" />
                        <v-svg name="instagram-bw" width="24" height="24" />
                    </div>
                </div>
            </div>
        </section>

        <section v-if="product.profitable" class="section product-view__section">
            <div class="container product-view__profitable">
                <h2 class="product-view__section-hl product-view__profitable-hl">
                    {{ $t('product.title.profitable') }}
                </h2>
                <div class="product-view__profitable-grid">
                    <ul class="product-view__profitable-list">
                        <li
                            class="product-view__profitable-list-item"
                            v-for="item in product.profitable.items"
                            :key="item.id"
                        >
                            <catalog-product-card
                                class="product-view__profitable-card"
                                :product-id="item.id"
                                :name="item.name"
                                :href="`/catalog/${item.categoryCodes[item.categoryCodes.length - 1]}/${item.code}`"
                                :image="item.image"
                                :price="item.price"
                                :old-price="item.oldPrice"
                                :tags="item.tags"
                                :rating="item.rating"
                                :isSmall="isTabletLg"
                            />
                        </li>
                    </ul>
                    <div class="product-view__profitable-total" />
                    <div class="product-view__profitable-price-panel">
                        <div class="product-view__profitable-price-panel-prices">
                            <div class="text-bold product-view__profitable-price-panel-price">
                                {{ product.profitable.price }}&nbsp;₽
                            </div>
                            <div class="text-grey text-strike product-view__profitable-price-panel-old">
                                {{ product.profitable.oldPrice }}&nbsp;₽
                            </div>
                        </div>
                        <div class="text-grey product-view__profitable-price-panel-profit">
                            Вы сэкономите&nbsp;{{ product.profitable.oldPrice - product.profitable.price }}&nbsp;₽
                        </div>
                        <v-button class="product-view__profitable-price-panel-btn">Добавить в корзину</v-button>
                    </div>
                </div>
            </div>
        </section>

        <section v-if="product.description" class="section product-view__section product-view__info">
            <div class="container product-view__info-container">
                <div class="product-view__info-header">
                    <h2 class="product-view__section-hl">{{ $t('product.title.description') }}</h2>
                    <v-html class="product-view__info-text" v-html="product.description.content" />
                </div>
                <!-- <div class="product-view__info-media">
                    <v-picture
                        v-if="product.description.image && product.description.image.id"
                        :image="product.description.image"
                        alt=""
                    >
                        <template v-slot:source="{ image, lazy }">
                            <source
                                :data-srcset="generateSourcePath(600, 600, image.id, 'webp')"
                                type="image/webp"
                                media="(min-width: 480px)"
                            />
                            <source
                                :data-srcset="generateSourcePath(200, 200, image.id, 'webp')"
                                type="image/webp"
                                media="(max-width: 479px)"
                            />
                        </template>
                        <template v-slot:fallback="{ image, lazy, alt }">
                            <img
                                class="blur-up lazyload v-picture__img"
                                :data-src="generateSourcePath(600, 600, image.id, image.sourceExt)"
                                :alt="alt"
                            />
                        </template>
                    </v-picture>
                </div> -->
            </div>
        </section>

        <section v-if="product.howto" class="section product-view__info">
            <div class="container product-view__info-container">
                <div class="product-view__info-header">
                    <h2 class="product-view__section-hl">{{ $t('product.title.method') }}</h2>
                    <v-html class="product-view__info-text" v-html="product.howto.content" />
                </div>
                <!-- <div class="product-view__info-media">
                    <v-picture v-if="product.howto.image && product.howto.image.id" :image="product.howto.image" alt="">
                        <template v-slot:source="{ image, lazy }">
                            <source
                                :data-srcset="generateSourcePath(600, 600, image.id, 'webp')"
                                type="image/webp"
                                media="(min-width: 480px)"
                            />
                            <source
                                :data-srcset="generateSourcePath(200, 200, image.id, 'webp')"
                                type="image/webp"
                                media="(max-width: 479px)"
                            />
                        </template>
                        <template v-slot:fallback="{ image, lazy, alt }">
                            <img
                                class="blur-up lazyload v-picture__img"
                                :data-src="generateSourcePath(600, 600, image.id, image.sourceExt)"
                                :alt="alt"
                            />
                        </template>
                    </v-picture>
                </div> -->
            </div>
        </section>

        <section
            v-if="product.characteristics && product.characteristics.length > 0"
            class="section product-view__section product-view__characteristics"
        >
            <div class="container">
                <h2 class="product-view__section-hl">{{ $t('product.title.characteristics') }}</h2>
                <ul class="product-view__characteristics-list">
                    <li
                        class="product-view__characteristics-item"
                        v-for="item in product.characteristics"
                        :key="item.id"
                    >
                        <div class="product-view__characteristics-item-title">{{ item.title }}</div>
                        <div class="product-view__characteristics-item-value">
                            {{ Array.isArray(item.value) ? item.value.join(', ') : item.value }}
                        </div>
                    </li>
                </ul>
            </div>
        </section>

        <section v-if="masterClasses && masterClasses.length > 0" class="section product-view__masterclass">
            <div class="container product-view__masterclass-container">
                <h2 class="product-view__section-hl product-view__masterclass-hl">
                    {{ $t('product.title.masterClasses') }}
                </h2>
                <ul class="product-view__masterclass-list">
                    <li class="product-view__masterclass-item" v-for="item in masterClasses" :key="item.id">
                        <div class="product-view__masterclass-card">
                            <v-picture class="product-view__masterclass-card-img" :image="item.image" />
                            <div class="product-view__masterclass-card-panel">
                                <div class="text-bold product-view__masterclass-card-info">
                                    <div class="text-bold product-view__masterclass-card-name">
                                        {{ item.name }}
                                    </div>
                                    <div class="product-view__masterclass-card-author" v-if="item.author">
                                        {{ item.author }}
                                    </div>
                                    <div class="product-view__masterclass-card-description" v-if="item.description">
                                        {{ item.description }}
                                    </div>
                                </div>
                                <div class="text-bold product-view__masterclass-card-price" v-if="item.price">
                                    {{ item.price }}
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
                <v-button class="btn--outline product-view__section-link product-view__masterclass-link">
                    {{ $t('product.showAll') }}
                </v-button>
            </div>
        </section>

        <section class="section product-view__section">
            <div class="container product-view__reviews">
                <div class="product-view__reviews-inner">
                    <div class="product-view__reviews-header">
                        <h2 class="product-view__section-hl product-view__reviews-header-hl">
                            {{ $t('product.title.reviews') }}
                            <span class="text-grey product-view__reviews-header-hl-count">12</span>
                            <v-button class="btn--outline product-view__section-link product-view__reviews-link">
                                {{ $t('product.reviews.makeReview') }}
                            </v-button>
                        </h2>
                        <div class="product-view__reviews-header-rating">
                            <span class="product-view__reviews-header-rating-count">
                                {{ $t('product.reviews.averageRating') }}&nbsp;
                                {{ product.reviews.middleRating }}
                            </span>
                            <v-rating :value="product.reviews.middleRating" readonly>
                                <template v-slot:activeLabel>
                                    <v-svg name="star-small" width="16" height="16" />
                                </template>
                                <template v-slot:inactiveLabel>
                                    <v-svg name="star-empty-small" width="16" height="16" />
                                </template>
                            </v-rating>
                        </div>
                        <div class="product-view__reviews-header-sort">
                            <span class="product-view__reviews-header-sort-text">Сначала новые</span>
                            <v-svg name="arrow-down" width="16" height="16" />
                        </div>
                    </div>

                    <ul class="product-view__reviews-list">
                        <product-review-card
                            class="product-view__reviews-list-item"
                            tag="li"
                            v-for="item in product.reviews.items"
                            :key="item.id"
                            v-bind="item"
                        />
                    </ul>
                    <div class="product-view__reviews-show-more">
                        <v-button class="btn--outline product-view__reviews-show-more-btn">
                            {{ $t('product.reviews.showAll') }}
                        </v-button>
                    </div>
                </div>
            </div>
        </section>

        <section class="section product-view__section product-view__banners">
            <div class="container product-view__banners-container">
                <h2 class="product-view__section-hl product-view__banners-hl">
                    {{ $t('product.title.compilations') }}
                </h2>
                <div class="product-view__banners-grid">
                    <banner-card
                        class="product-view__banners-card"
                        v-for="banner in banners"
                        :key="banner.id"
                        :image="banner.image"
                        :title="banner.title"
                        :button-text="banner.btnText"
                    />
                </div>
            </div>
        </section>

        <section class="section product-view__section product-view__like">
            <div class="container product-view__like-container">
                <h2 class="product-view__section-hl product-view__like-hl">{{ $t('product.title.like') }}</h2>
                <v-slider class="product-view__like-slider" name="also-like" :options="sliderOptions">
                    <catalog-product-card
                        class="swiper-slide product-view__like-card"
                        v-for="product in featuredProducts.items"
                        :key="product.id"
                        :product-id="product.id"
                        :name="product.name"
                        :type="product.type"
                        :href="`/catalog/${product.categoryCodes[product.categoryCodes.length - 1]}/${product.code}`"
                        :image="product.image"
                        :price="product.price"
                        :old-price="product.oldPrice"
                        :tags="product.tags"
                        :rating="product.rating"
                        @addItem="onAddToCart(product)"
                        @preview="onPreview(product.code)"
                    />
                </v-slider>
            </div>
        </section>

        <section class="section product-view__section product-view__instagram">
            <div class="container product-view__instagram-container">
                <h2 class="product-view__section-hl product-view__instagram-hl">{{ $t('product.title.instagram') }}</h2>

                <v-slider
                    v-if="isTabletLg"
                    class="product-view__instagram-slider"
                    name="instagram"
                    :options="instagramOptions"
                >
                    <instagram-card
                        class="swiper-slide product-view__instagram-card"
                        v-for="item in instagramItems"
                        :key="item.id"
                        :instagram-card-id="item.id"
                        :image="item.image"
                    />
                </v-slider>

                <div v-if="!isTabletLg" class="product-view__instagram-grid product-view__instagram-grid--initialized">
                    <instagram-card
                        class="product-view__instagram-card"
                        v-for="item in instagramItems"
                        :key="item.id"
                        :instagram-card-id="item.id"
                        :image="item.image"
                    />
                </div>
                <div class="text-grey product-view__instagram-note">
                    Добавь тег @bessovestnotalantlivy в Instagram и, возможно, мы опубликуем твою фотографию
                </div>
                <v-button class="btn--outline product-view__section-link product-view__instagram-link">
                    {{ $t('landing.subscribe') }}
                </v-button>
            </div>
        </section>

        <section class="section product-view__section product-view__history">
            <div class="container product-view__history-container">
                <h2 class="product-view__section-hl">{{ $t('product.title.history') }}</h2>
                <div class="product-view__history-grid">
                    <catalog-product-card
                        class="product-view__history-card"
                        v-for="product in featuredProducts.items.slice(0, 6)"
                        :key="product.id"
                        :product-id="product.id"
                        :type="product.type"
                        :name="product.name"
                        :href="`/catalog/${product.categoryCodes[product.categoryCodes.length - 1]}/${product.code}`"
                        :image="product.image"
                        :tags="product.tags"
                        :rating="product.rating"
                        @addItem="onAddToCart(product)"
                        @preview="onPreview(product.code)"
                    />
                </div>
            </div>
        </section>

        <transition :name="pricePanelAnimation" appear>
            <product-price-panel
                class="product-view__top-panel"
                v-if="(scroll && !isPriceVisible) || isTablet"
                :name="product.title"
                :image="product.media && product.media.length > 0 ? product.media[0] : null"
                :price="product.price"
                :old-price="product.oldPrice"
                :bonus="product.bonus"
                @addItem="ADD_CART_ITEM({ offerId: product.id })"
            />
        </transition>

        <transition name="fade-in">
            <quick-view-modal v-if="isQuickViewOpen && !isTabletLg" />
            <add-to-cart-modal v-else-if="isAddToCartOpen" />
        </transition>
    </section>
</template>

<script>
import VSvg from '../../components/controls/VSvg/VSvg.vue';
import VLink from '../../components/controls/VLink/VLink.vue';
import VButton from '../../components/controls/VButton/VButton.vue';
import VSticky from '../../components/controls/VSticky/VSticky.vue';
import VHtml from '../../components/controls/VHtml/VHtml.vue';
import VSlider from '../../components/controls/VSlider/VSlider.vue';
import VPicture from '../../components/controls/VPicture/VPicture.vue';

import Price from '../../components/Price/Price.vue';
import BannerCard from '../../components/BannerCard/BannerCard.vue';
import InstagramCard from '../../components/InstagramCard/InstagramCard.vue';
import VRating from '../../components/controls/VRating/VRating.vue';
import Tag from '../../components/Tag/Tag.vue';

import CatalogProductCard from '../../components/CatalogProductCard/CatalogProductCard.vue';
import CatalogBannerCard from '../../components/CatalogBannerCard/CatalogBannerCard.vue';
import ProductReviewCard from '../../components/ProductReviewCard/ProductReviewCard.vue';
import ProductPricePanel from '../../components/ProductPricePanel/ProductPricePanel.vue';
import ProductCartPanel from '../../components/ProductCartPanel/ProductCartPanel.vue';
import ProductDetailPanel from '../../components/ProductDetailPanel/ProductDetailPanel.vue';

import QuickViewModal, { NAME as QUICK_VIEW_MODAL_NAME } from '../../components/QuickViewModal/QuickViewModal.vue';
import AddToCartModal, { NAME as ADD_TO_CART_MODAL_NAME } from '../../components/AddToCartModal/AddToCartModal.vue';

import '../../plugins/observer';
import { $store, $progress, $logger } from '../../services/ServiceLocator';
import { mapState, mapActions, mapGetters } from 'vuex';

import { SCROLL } from '../../store';

import productModule, {
    NAME as PRODUCT_MODULE,
    PRODUCT,
    BANNERS,
    MASTERCLASSES,
    FEATURED_PRODUCTS,
    INSTAGRAM_ITEMS,
} from '../../store/modules/Product';
import { FETCH_PRODUCT_DATA } from '../../store/modules/Product/actions';

import { NAME as CART_MODULE } from '../../store/modules/Cart';
import { ADD_CART_ITEM } from '../../store/modules/Cart/actions';

import { NAME as GEO_MODULE, SELECTED_CITY } from '../../store/modules/Geolocation';

import { NAME as MODAL_MODULE, MODALS } from '../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../store/modules/Modal/actions';

import _debounce from 'lodash/debounce';
import { generatePictureSourcePath } from '../../util/images';
import { breakpoints } from '../../assets/scripts/constants';
import productBrand1 from '../../assets/images/mock/brandProduct1.png';

import '../../assets/images/sprites/socials/vkontakte-bw.svg';
import '../../assets/images/sprites/socials/facebook-bw.svg';
import '../../assets/images/sprites/socials/instagram-bw.svg';

import '../../assets/images/sprites/cart-empty.svg';
import '../../assets/images/sprites/star-empty-small.svg';
import '../../assets/images/sprites/star-small.svg';
import '../../assets/images/sprites/arrow-small.svg';
import '../../assets/images/sprites/wishlist-middle.svg';
import './Product.css';

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
    name: 'product',
    components: {
        VSvg,
        VButton,
        VLink,
        VRating,
        VSticky,
        VHtml,
        VSlider,
        VPicture,

        Price,
        CatalogProductCard,
        ProductReviewCard,
        BannerCard,
        InstagramCard,

        ProductCartPanel,
        ProductPricePanel,
        ProductDetailPanel,

        QuickViewModal,
        AddToCartModal,
    },

    data() {
        return {
            isPriceVisible: true,
            mockImg: productBrand1,
        };
    },

    computed: {
        ...mapState([SCROLL]),
        ...mapState('route', { code: state => state.params.code }),
        ...mapState(PRODUCT_MODULE, [PRODUCT, MASTERCLASSES, BANNERS, FEATURED_PRODUCTS, INSTAGRAM_ITEMS]),
        ...mapState(GEO_MODULE, [SELECTED_CITY]),
        ...mapState(MODAL_MODULE, {
            isQuickViewOpen: state => state[MODALS][QUICK_VIEW_MODAL_NAME] && state[MODALS][QUICK_VIEW_MODAL_NAME].open,
            isAddToCartOpen: state =>
                state[MODALS][ADD_TO_CART_MODAL_NAME] && state[MODALS][ADD_TO_CART_MODAL_NAME].open,
        }),

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
            // const { fias_id } = value;
            // this.debounce_fetchProduct(to, from);
        },
    },

    methods: {
        ...mapActions(PRODUCT_MODULE, [FETCH_PRODUCT_DATA]),
        ...mapActions(CART_MODULE, [ADD_CART_ITEM]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        generateSourcePath(x, y, id, ext) {
            return generatePictureSourcePath(x, y, id, ext);
        },

        onPreview(code) {
            this[CHANGE_MODAL_STATE]({ name: QUICK_VIEW_MODAL_NAME, open: true, state: { code } });
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
        const register = !!$store._modulesNamespaceMap[`${productModule.name}/`];
        if (!register)
            $store.registerModule(productModule.name, productModule, {
                preserveState: !!$store.state.product,
            });

        const { productCode } = $store.state.product;
        const {
            selectedCity: { fias_id },
        } = $store.state.geolocation;

        // если все загружено, пропускаем
        if (productCode === code) next();
        else {
            $progress.start();
            $store
                .dispatch(`${PRODUCT_MODULE}/${FETCH_PRODUCT_DATA}`, { code, city: fias_id })
                .then(() => next(vm => $progress.finish()))
                .catch(error => {
                    $progress.fail();
                    $logger.error(error);
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
        this.debounce_fetchProduct(code, fias_id, next);
    },

    beforeMount() {
        this.debounce_fetchProduct = _debounce(async (code, city, next) => {
            try {
                const { productCode } = this.product;
                this.$progress.start();
                if (productCode !== code) {
                    await this[FETCH_PRODUCT_DATA]({ code, city });
                } else await Promise.resolve();
                next();
                this.$progress.finish();
            } catch (error) {
                $logger.error('debounce_fetchProduct', error);
                next(false);
                this.$progress.fail();
            }
        }, 500);
    },
};
</script>
