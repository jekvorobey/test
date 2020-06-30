<template>
    <section class="section product-view" :class="{ 'product-view--scroll': scroll }">
        <div class="container">
            <breadcrumbs class="product-view__breadcrumbs">
                <breadcrumb-item key="main" to="/">
                    <v-svg v-if="isTablet" name="home" width="10" height="10" />
                    <span v-else>Главная</span></breadcrumb-item
                >
                <breadcrumb-item key="Catalog" :to="{ name: 'Catalog' }">
                    Каталог
                </breadcrumb-item>
                <breadcrumb-item
                    v-for="category in product.categoryCodes"
                    :key="category.code"
                    :to="generateBreadcrumbUrl(category.code)"
                >
                    {{ category.name }}
                </breadcrumb-item>
                <breadcrumb-item :key="product.id" :to="{ path: $route.path }">
                    {{ product.title }}
                </breadcrumb-item>
            </breadcrumbs>
        </div>
        <section class="section">
            <div class="container product-view__header">
                <div class="product-view__header-mobile-controls" v-if="isTablet">
                    <favorites-button
                        class="product-view__wishlist-btn"
                        :class="{ 'product-view__wishlist-btn--active': inFavorites }"
                        :isActive="inFavorites"
                        @click.prevent="onToggleFavorite(product.productId)"
                    />
                </div>
                <v-sticky class="product-view__header-sticky">
                    <template v-slot:sticky>
                        <div v-if="!isTabletLg" class="product-view__header-gallery" @click.prevent="onShowGallery">
                            <div
                                v-if="!productImages.media || !productImages.media.length"
                                class="product-view__header-gallery-item product-view__header-gallery-item--empty"
                            >
                                <v-svg name="logo" width="56" height="56" />
                            </div>
                            <div
                                class="product-view__header-gallery-item"
                                :class="image.length === 1 ? 'product-view__header-gallery-item--alone' : ''"
                                v-for="image in productImages.media"
                                :key="image.id"
                            >
                                <v-picture v-if="image && image.id">
                                    <source
                                        :data-srcset="image.desktop.webp"
                                        type="image/webp"
                                        media="(min-width: 480px)"
                                    />
                                    <source :data-srcset="image.desktop.orig" media="(min-width: 480px)" />
                                    <source
                                        :data-srcset="image.tablet.webp"
                                        type="image/webp"
                                        media="(max-width: 479px)"
                                    />
                                    <source :data-srcset="image.tablet.orig" media="(max-width: 479px)" />
                                    <img class="blur-up lazyload v-picture__img" :data-src="image.desktop.orig" alt="" />
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
                                v-if="!productImages.media || !productImages.media.length"
                                class="swiper-slide product-view__header-gallery-item product-view__header-gallery-item--empty"
                            >
                                <v-svg name="logo" width="56" height="56" />
                            </div>
                            <div
                                class="swiper-slide product-view__header-gallery-item"
                                v-for="image in productImages.media"
                                :key="image.id"
                            >
                                <v-picture>
                                    <source
                                        :data-srcset="image.desktop.webp"
                                        type="image/webp"
                                        media="(min-width: 480px)"
                                    />
                                    <source :data-srcset="image.desktop.orig" media="(min-width: 480px)" />
                                    <source
                                        :data-srcset="image.tablet.webp"
                                        type="image/webp"
                                        media="(max-width: 479px)"
                                    />
                                    <source :data-srcset="image.tablet.orig" media="(max-width: 479px)" />
                                    <img class="blur-up lazyload v-picture__img" :data-src="image.default" alt="" />
                                </v-picture>
                            </div>
                        </v-slider>
                    </template>
                </v-sticky>

                <div class="product-view__header-detail">
                    <product-detail-panel
                        class="product-view__header-detail-info"
                        :title="product.title"
                        :reviews-count="product.reviewsCount"
                        :vendor-code="product.vendorCode"
                        :rating="product.rating"
                    />

                    <product-option-panel
                        class="product-view__header-detail-section product-view__header-detail-options"
                        :key="char.code"
                        v-for="char in characteristics"
                        :header="char.name"
                        :note="$tc('product.variants', char.options.length)"
                    >
                        <div class="product-view__header-detail-options-tags" v-if="char.type === 'radio'">
                            <product-option-tag
                                class="product-view__header-detail-options-item"
                                v-for="option in char.options"
                                :key="`${char.code}-${option.value}`"
                                :selected="option.isSelected"
                                :disabled="option.isDisabled"
                                @click="onSelectOption(char.code, option.value)"
                            >
                                {{ option.name }}
                            </product-option-tag>
                        </div>

                        <div class="product-view__header-detail-options-colors" v-if="char.type === 'color'">
                            <product-color-tag
                                class="product-view__header-detail-options-item"
                                v-for="option in char.options"
                                :key="`${char.code}-${option.value}`"
                                :color="option.value"
                                :selected="option.isSelected"
                                :disabled="option.isDisabled"
                                @click="onSelectOption(char.code, option.value)"
                            />
                        </div>
                    </product-option-panel>

                    <product-cart-panel
                        v-observe-visibility="onPriceVisibilityChanged"
                        class="product-view__header-detail-section product-view__header-detail-cart product-view__header-detail-panels"
                        :product-id="product.productId"
                        :price="product.price"
                        :old-price="product.oldPrice"
                        :bonus="product.bonus"
                        :disabled="!canBuy"
                        @cart="onBuyProduct"
                        @wishlist="onToggleFavorite(product.productId)"
                    >
                        {{ buyBtnText }}
                    </product-cart-panel>

                    <product-delivery-panel
                        class="product-view__header-detail-section"
                        :delivery-methods="product.deliveryMethods"
                        @pickup-points="onShowPickupPoints"
                    />

                    <div
                        v-if="product.description && product.description.content"
                        class="product-view__header-detail-section"
                    >
                        <p class="text-bold product-view__header-detail-section-hl">
                            Описание и характеристики
                        </p>
                        <v-clamp tag="p" :max-lines="maxDescriptionLines" :autoresize="true">
                            {{ product.description.content }}
                        </v-clamp>
                        <a class="product-view__header-detail-brand-link" href="#description">
                            Подробнее
                        </a>
                    </div>
                    <div v-if="product.brand" class="product-view__header-detail-section">
                        <div class="product-view__header-detail-brand">
                            <v-picture
                                v-if="productImages.brand"
                                :key="productImages.brand.id"
                                class="product-view__header-detail-brand-img"
                            >
                                <source :data-src="productImages.brand.desktop" type="image/webp" />
                                <img
                                    class="blur-up lazyload v-picture__img"
                                    :data-src="productImages.brand.default"
                                    :alt="productImages.brand.alt"
                                />
                            </v-picture>

                            <router-link
                                v-if="product.brand.hasDetail"
                                class="product-view__header-detail-brand-link"
                                :to="brandUrl"
                            >
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
                                :offer-id="item.id"
                                :product-id="item.productId"
                                :name="item.name"
                                :href="`/catalog/${item.categoryCodes[item.categoryCodes.length - 1]}/${item.code}`"
                                :image="item.image"
                                :price="item.price"
                                :old-price="item.oldPrice"
                                :tags="item.tags"
                                :rating="item.rating"
                                :isSmall="isTabletLg"
                                :show-buy-btn="item.stock.qty > 0"
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

        <section class="product-view__section product-view__bundles" v-if="productBundles">
            <div class="container product-view__bundles">
                <product-bundle-panel
                    v-for="bundle in productBundles"
                    :key="bundle.id"
                    :bundle-id="bundle.id"
                    :items="bundle.items"
                    :price="bundle.price"
                    :old-price="bundle.oldPrice"
                    @add-bundle="onAddCartBundle"
                />
            </div>
        </section>

        <section
            v-if="product.description && (product.description.content || product.description.image)"
            class="section product-view__section product-view__info"
        >
            <div class="container product-view__info-container">
                <div id="description" class="hook" />
                <div class="product-view__info-header">
                    <h2 class="product-view__section-hl">{{ $t('product.title.description') }}</h2>
                    <p class="product-view__info-text">{{ product.description.content }}</p>
                </div>
                <div class="product-view__info-media">
                    <v-picture
                        class="product-view__info-media-item product-view__info-media-item--img"
                        :key="productImages.description.id"
                        v-if="productImages.description"
                    >
                        <source
                            :data-srcset="productImages.description.tablet"
                            type="image/webp"
                            media="(max-width: 479px)"
                        />
                        <source :data-srcset="productImages.description.desktop" type="image/webp" />
                        <img
                            class="blur-up lazyload v-picture__img"
                            :data-src="productImages.description.default"
                            alt=""
                        />
                    </v-picture>
                    <iframe
                        v-if="productVideos.description"
                        class="lazyload product-view__info-media-item product-view__info-media-item--video"
                        :data-src="productVideos.description.videoUrl"
                        :key="productVideos.description.id"
                        frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; autoplay"
                        allowfullscreen="false"
                    />
                </div>
            </div>
        </section>

        <section v-if="product.instruction" class="section product-view__section product-view__instruction">
            <div class="container">
                <ul class="product-view__instruction-list">
                    <product-file-card
                        class="product-view__instruction-item"
                        file-name="Инструкция по применению"
                        :key="product.instruction.id"
                        :file-id="product.instruction.id"
                        :size="product.instruction.size"
                        :ext="product.instruction.ext"
                    />
                </ul>
            </div>
        </section>

        <section
            v-if="product.tips && product.tips.length > 0"
            class="section product-view__section product-view__tips"
        >
            <div class="container">
                <ul class="product-view__tips-list">
                    <product-tip-card
                        class="product-view__tips-item"
                        v-for="tip in product.tips"
                        :key="tip.id"
                        :image="tip.image"
                        :text="tip.text"
                    />
                </ul>
            </div>
        </section>

        <section
            v-if="product.howto && (product.howto.content || product.howto.image)"
            class="section product-view__info"
        >
            <div class="container product-view__info-container">
                <div class="product-view__info-header">
                    <h2 class="product-view__section-hl">{{ $t('product.title.method') }}</h2>
                    <v-html class="product-view__info-text" v-html="product.howto.content" />
                </div>
                <div class="product-view__info-media">
                    <v-picture
                        class="product-view__info-media-item product-view__info-media-item--img"
                        :key="productImages.howto.id"
                        v-if="productImages.howto"
                    >
                        <source
                            :data-srcset="productImages.howto.tablet"
                            type="image/webp"
                            media="(max-width: 479px)"
                        />
                        <source :data-srcset="productImages.howto.desktop" type="image/webp" />
                        <img class="blur-up lazyload v-picture__img" :data-src="productImages.howto.default" alt="" />
                    </v-picture>
                    <iframe
                        v-if="productVideos.howto"
                        class="lazyload product-view__info-media-item product-view__info-media-item--video"
                        :data-src="productVideos.howto.videoUrl"
                        :key="productVideos.howto.id"
                        frameborder="0"
                        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; autoplay"
                        allowfullscreen="false"
                    />
                </div>
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

        <!-- #58437 -->
        <!-- <section v-if="masterClasses && masterClasses.length > 0" class="section product-view__masterclass">
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
        </section> -->

        <!-- #58437 -->
        <!-- <section class="section product-view__section">
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
        </section> -->

        <!-- #58437 -->
        <!-- <section class="section product-view__section product-view__banners">
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
        </section> -->

        <section class="section product-view__section product-view__like">
            <div class="container product-view__like-container">
                <h2 class="product-view__section-hl product-view__like-hl">{{ $t('product.title.like') }}</h2>
                <v-slider class="product-view__like-slider" name="also-like" :options="sliderOptions">
                    <catalog-product-card
                        class="swiper-slide product-view__like-card"
                        v-for="item in featuredProducts.items"
                        :key="item.id"
                        :offer-id="item.id"
                        :product-id="item.productId"
                        :name="item.name"
                        :type="item.type"
                        :href="`/catalog/${item.categoryCodes[item.categoryCodes.length - 1]}/${item.code}`"
                        :image="item.image"
                        :price="item.price"
                        :old-price="item.oldPrice"
                        :tags="item.tags"
                        :rating="item.rating"
                        :show-buy-btn="item.stock.qty > 0"
                        @add-item="onAddToCart(item)"
                        @preview="onPreview(item.code)"
                        @toggle-favorite-item="onToggleFavorite(item.productId)"
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
                <!-- #58437 -->
                <v-button
                    tag="a"
                    class="btn--outline product-view__section-link product-view__instagram-link"
                    :href="btnLink"
                    target="_blank"
                >
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
                        v-for="item in featuredProducts.items.slice(0, 6)"
                        :key="item.id"
                        :offer-id="item.id"
                        :product-id="item.productId"
                        :type="item.type"
                        :name="item.name"
                        :href="`/catalog/${item.categoryCodes[item.categoryCodes.length - 1]}/${item.code}`"
                        :image="item.image"
                        :tags="item.tags"
                        :rating="item.rating"
                        :show-buy-btn="item.stock.qty > 0"
                        @add-item="onAddToCart(item)"
                        @preview="onPreview(item.code)"
                        @toggle-favorite-item="onToggleFavorite(item.productId)"
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
                :disabled="!canBuy"
                @add-item="onBuyProduct"
            >
                {{ buyBtnText }}
            </product-price-panel>
        </transition>

        <transition name="fade-in">
            <gallery-modal v-if="$isServer || (isGalleryOpen && !isTabletLg)" :images="productImages.gallery">
                <template v-slot:image="{ image }">
                    <source :data-srcset="image.desktop.webp" type="image/webp" />
                    <source :data-srcset="image.desktop.orig" />
                    <img class="blur-up lazyload v-picture__img" :data-src="image.default" alt="" />
                </template>
            </gallery-modal>
        </transition>

        <transition name="fade-in">
            <map-modal v-if="$isServer || isModalOpen">
                <template v-slot:map>
                    <product-pickup-points-map />
                </template>
                <template v-slot:filter>
                    <product-pickup-points-panel />
                </template>
            </map-modal>
        </transition>
    </section>
</template>

<script>
import VClamp from 'vue-clamp';
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';
import VButton from '@controls/VButton/VButton.vue';
import VSticky from '@controls/VSticky/VSticky.vue';
import VHtml from '@controls/VHtml/VHtml.vue';
import VSlider from '@controls/VSlider/VSlider.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import Price from '@components/Price/Price.vue';
import BannerCard from '@components/BannerCard/BannerCard.vue';
import InstagramCard from '@components/InstagramCard/InstagramCard.vue';
import VRating from '@controls/VRating/VRating.vue';
import Tag from '@components/Tag/Tag.vue';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '@components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';

import FavoritesButton from '@components/FavoritesButton/FavoritesButton.vue';

import CatalogProductCard from '@components/CatalogProductCard/CatalogProductCard.vue';
import CatalogBannerCard from '@components/CatalogBannerCard/CatalogBannerCard.vue';

import ProductTipCard from '@components/product/ProductTipCard/ProductTipCard.vue';
import ProductFileCard from '@components/product/ProductFileCard/ProductFileCard.vue';
import ProductCartPanel from '@components/product/ProductCartPanel/ProductCartPanel.vue';
import ProductReviewCard from '@components/product/ProductReviewCard/ProductReviewCard.vue';
import ProductPricePanel from '@components/product/ProductPricePanel/ProductPricePanel.vue';
import ProductDetailPanel from '@components/product/ProductDetailPanel/ProductDetailPanel.vue';
import ProductDeliveryPanel from '@components/product/ProductDeliveryPanel/ProductDeliveryPanel.vue';
import ProductOptionPanel from '@components/product/ProductOptionPanel/ProductOptionPanel.vue';
import ProductOptionTag from '@components/product/ProductOptionTag/ProductOptionTag.vue';
import ProductColorTag from '@components/product/ProductColorTag/ProductColorTag.vue';
import ProductBundlePanel from '@components/product/ProductBundlePanel/ProductBundlePanel.vue';

import ProductPickupPointsMap from '@components/product/ProductPickupPointsMap/ProductPickupPointsMap.vue';
import ProductPickupPointsPanel from '@components/product/ProductPickupPointsPanel/ProductPickupPointsPanel.vue';

import CheckoutOptionCard from '@components/checkout/CheckoutOptionCard/CheckoutOptionCard.vue';

import MapModal, { NAME as MAP_MODAL_NAME } from '@components/MapModal/MapModal.vue';
import GalleryModal from '@components/GalleryModal/GalleryModal.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { $store, $progress, $logger, $retailRocket } from '@services';
import { SCROLL } from '@store';

import { NAME as AUTH_MODULE, USER, REFERRAL_PARTNER } from '@store/modules/Auth';
import { SET_SESSION_REFERRAL_CODE } from '@store/modules/Auth/actions';

import {
    NAME as PRODUCT_MODULE,
    PRODUCT,
    BANNERS,
    MASTERCLASSES,
    FEATURED_PRODUCTS,
    INSTAGRAM_ITEMS,
    PRODUCT_OPTIONS,
    PRODUCT_BUNDLES,
} from '@store/modules/Product';
import { COMBINATIONS, CHARACTERISTICS, GET_NEXT_COMBINATION } from '@store/modules/Product/getters';
import { FETCH_PRODUCT_DATA, FETCH_PRODUCT_PICKUP_POINTS } from '@store/modules/Product/actions';

import { NAME as CART_MODULE } from '@store/modules/Cart';
import { IS_IN_CART } from '@store/modules/Cart/getters';
import { ADD_CART_ITEM, ADD_CART_BUNDLE } from '@store/modules/Cart/actions';

import { NAME as GEO_MODULE, SELECTED_CITY } from '@store/modules/Geolocation';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as FAVORITES_MODULE } from '@store/modules/Favorites';
import { TOGGLE_FAVORITES_ITEM } from '@store/modules/Favorites/actions';
import { IS_IN_FAVORITES } from '@store/modules/Favorites/getters';

import _debounce from 'lodash/debounce';
import {
    generatePictureSourcePath,
    generateYoutubeImagePlaceholderPath,
    generateYoutubeVideoSourcePath,
} from '@util/file';
import { createNotFoundRoute } from '@util/router';
import { breakpoints, fileExtension, httpCodes, modalName } from '@enums';
import { productGroupTypes, cartItemTypes } from '@enums/product';
import { generateCategoryUrl, generateProductUrl, prepareProductImage } from '@util/catalog';

import '@images/sprites/socials/vkontakte-bw.svg';
import '@images/sprites/socials/facebook-bw.svg';
import '@images/sprites/socials/instagram-bw.svg';

import '@images/sprites/cart-empty.svg';
import '@images/sprites/star-empty-small.svg';
import '@images/sprites/star-small.svg';
import '@images/sprites/arrow-small.svg';
import '@images/sprites/wishlist-middle.svg';
import '@images/sprites/logo.svg';
import '@images/sprites/home.svg';

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
        VClamp,
        VRating,
        VSticky,
        VHtml,
        VSlider,
        VPicture,

        Breadcrumbs,
        BreadcrumbItem,

        Price,
        CatalogProductCard,
        BannerCard,
        InstagramCard,

        FavoritesButton,

        ProductTipCard,
        ProductFileCard,
        ProductReviewCard,

        ProductCartPanel,
        ProductPricePanel,
        ProductDetailPanel,
        ProductDeliveryPanel,

        ProductColorTag,
        ProductOptionTag,
        ProductOptionPanel,

        ProductPickupPointsMap,
        ProductPickupPointsPanel,

        ProductBundlePanel,

        MapModal,
        GalleryModal,
    },

    data() {
        return {
            isPriceVisible: true,
            btnLink: 'https://www.instagram.com/bessovestnotalantlivy/',
        };
    },

    computed: {
        ...mapState([SCROLL]),
        ...mapState(GEO_MODULE, [SELECTED_CITY]),
        ...mapGetters(CART_MODULE, [IS_IN_CART]),
        ...mapGetters(FAVORITES_MODULE, [IS_IN_FAVORITES]),

        ...mapGetters(PRODUCT_MODULE, [CHARACTERISTICS, COMBINATIONS, GET_NEXT_COMBINATION]),
        ...mapState(PRODUCT_MODULE, [
            PRODUCT,
            PRODUCT_OPTIONS,
            MASTERCLASSES,
            BANNERS,
            FEATURED_PRODUCTS,
            INSTAGRAM_ITEMS,
            PRODUCT_BUNDLES,
        ]),

        ...mapState(MODAL_MODULE, {
            isGalleryOpen: (state) =>
                state[MODALS][modalName.product.GALLERY] && state[MODALS][modalName.product.GALLERY].open,
            isModalOpen: (state) => state[MODALS][MAP_MODAL_NAME] && state[MODALS][MAP_MODAL_NAME].open,
        }),

        ...mapState('route', {
            code: (state) => state.params.code,
            categoryCode: (state) => state.params.categoryCode,
            refCode: (state) => state.query.refCode,
            modal: (state) => state.query.modal,
        }),

        inCart() {
            const { id } = this[PRODUCT];
            return this[IS_IN_CART](cartItemTypes.PRODUCT, id);
        },

        inFavorites() {
            const { productId } = this[PRODUCT];
            return this[IS_IN_FAVORITES](productId);
        },

        canBuy() {
            return this.product.stock.qty > 0;
        },

        brandUrl() {
            const { brand } = this.product;
            return generateCategoryUrl(productGroupTypes.BRANDS, brand.code);
        },

        productVideos() {
            const videoMap = {};
            const { howto, description } = this.product;

            if (howto && howto.video) {
                videoMap.howto = {
                    id: howto.video,
                    imageUrl: generateYoutubeImagePlaceholderPath(howto.video),
                    videoUrl: generateYoutubeVideoSourcePath(howto.video),
                };
            }

            if (description && description.video) {
                videoMap.description = {
                    id: description.video,
                    imageUrl: generateYoutubeImagePlaceholderPath(description.video),
                    videoUrl: generateYoutubeVideoSourcePath(description.video),
                };
            }

            return videoMap;
        },

        productImages() {
            const imageMap = {};
            const { brand, howto, description, media } = this.product;

            if (brand && brand.image) {
                imageMap.brand = {
                    id: brand.image.id,
                    desktop: generatePictureSourcePath(null, null, brand.image.id, fileExtension.image.WEBP),
                    default: generatePictureSourcePath(null, null, brand.image.id),
                    alt: brand.name,
                };
            }

            if (howto && howto.image) {
                imageMap.howto = {
                    id: howto.image.id,
                    desktop: generatePictureSourcePath(null, null, howto.image.id, fileExtension.image.WEBP),
                    tablet: generatePictureSourcePath(320, 240, howto.image.id, fileExtension.image.WEBP),
                    default: generatePictureSourcePath(null, null, howto.image.id),
                };
            }

            if (description && description.image) {
                imageMap.description = {
                    id: description.image.id,
                    desktop: generatePictureSourcePath(null, null, description.image.id, fileExtension.image.WEBP),
                    tablet: generatePictureSourcePath(320, 240, description.image.id, fileExtension.image.WEBP),
                    default: generatePictureSourcePath(null, null, description.image.id),
                };
            }

            if (Array.isArray(media) && media.length > 0) {
                const desktopSize = 504;
                const gallerySize = 744;
                const tabletSize = 400;
                const mobileSize = 200;

                imageMap.media = media.map((image) => prepareProductImage(image, desktopSize, tabletSize, mobileSize));
                imageMap.gallery = media.map((image) => prepareProductImage(image, gallerySize));
            } else {
                imageMap.media = [];
                imageMap.gallery = [];
            }

            return imageMap;
        },

        maxDescriptionLines() {
            return 5;
        },

        buyBtnText() {
            if (!this.canBuy) return 'Нет в наличии';
            return this.inCart ? 'В корзине' : 'Купить';
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
        [PRODUCT](value) {
            const product = this[PRODUCT] || {};
            $retailRocket.addProductView([product.id]);
        },

        [SELECTED_CITY](value) {
            this.onSelectedCityChanged(value);
        },

        modal(value) {
            this.handleModalQuery(value);
        },
    },

    methods: {
        ...mapActions(AUTH_MODULE, [SET_SESSION_REFERRAL_CODE]),
        ...mapActions(PRODUCT_MODULE, [FETCH_PRODUCT_DATA, FETCH_PRODUCT_PICKUP_POINTS]),
        ...mapActions(CART_MODULE, [ADD_CART_ITEM, ADD_CART_BUNDLE]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(FAVORITES_MODULE, [TOGGLE_FAVORITES_ITEM]),

        async fetchProduct(to, from, next) {
            const {
                path,
                params: { code },
                query: { refCode: referrerCode },
            } = to;

            try {
                this.$progress.start();
                await this[FETCH_PRODUCT_DATA]({ code, referrerCode });
                this.$progress.finish();
                next();
            } catch (error) {
                this.$progress.fail();
                if (error.status === httpCodes.NOT_FOUND) next(createNotFoundRoute(to));
                else next(false);
                this.$progress.finish();
            }
        },

        generateBreadcrumbUrl(code) {
            return { path: generateCategoryUrl(productGroupTypes.CATALOG, null, code) };
        },

        handleModalQuery(value) {
            if (!value) return;

            switch (value) {
                case 'pickup':
                    this.onShowPickupPoints();
                    break;
                case 'gallery':
                    this.onShowGallery();
                    break;
                default:
                    break;
            }

            this.$router.replace({
                path: this.$route.path,
                params: { ...this.$route.params },
                query: { ...this.$route.query, modal: undefined },
                hash: this.$route.hash,
            });
        },

        async onSelectedCityChanged() {
            try {
                const { code, refCode: referrerCode } = this;
                this.$progress.start();
                await this[FETCH_PRODUCT_DATA]({ code, referrerCode });
                this.$progress.finish();
            } catch (error) {
                this.$progress.fail();
            }
        },

        onToggleFavorite(productId) {
            this[TOGGLE_FAVORITES_ITEM](productId);
        },

        onPreview(code) {
            this[CHANGE_MODAL_STATE]({ name: modalName.general.QUICK_VIEW, open: true, state: { code } });
        },

        onShowGallery() {
            const { gallery } = this.productImages;
            if (!gallery || !gallery.length) return;
            this[CHANGE_MODAL_STATE]({ name: modalName.product.GALLERY, open: true });
        },

        onBuyProduct() {
            if (this.inCart) {
                this.$router.push({ name: 'Cart' });
                return;
            }

            const {
                refCode: referrerCode,
                product: {
                    id: offerId,
                    stock: { storeId },
                    referralCodeAllowed = false,
                },
            } = this;

            if (referrerCode)
                if (referralCodeAllowed) this[ADD_CART_ITEM]({ offerId, storeId, referrerCode, cookieName: null });
                else this[ADD_CART_ITEM]({ offerId, storeId, cookieName: null });
            else this[ADD_CART_ITEM]({ offerId, storeId });
        },

        onAddToCart(item) {
            this[CHANGE_MODAL_STATE]({
                name: modalName.general.ADD_TO_CART,
                open: true,
                state: { offerId: item.id, storeId: item.stock.storeId, type: item.type },
            });
        },

        onAddCartBundle(item) {
            const { bundleId, count } = item;
            const { referrerCode: referrerCode } = this;

            if (referrerCode) this[ADD_CART_BUNDLE]({ bundleId, count, referrerCode });
            else this[ADD_CART_BUNDLE]({ bundleId, count });

            this[CHANGE_MODAL_STATE]({
                name: modalName.general.NOTIFICATION,
                open: true,
                state: { message: 'Комлпект добавлен в корзину' },
            });
        },

        async onShowPickupPoints() {
            try {
                await this[FETCH_PRODUCT_PICKUP_POINTS](this[PRODUCT]);
                this[CHANGE_MODAL_STATE]({
                    name: MAP_MODAL_NAME,
                    open: true,
                });
            } catch (error) {
                alert('Произошла ошибка');
            }
        },

        onSelectOption(charCode, optValue) {
            const { categoryCode } = this;
            const nextCombination = this[GET_NEXT_COMBINATION](charCode, optValue);
            this.$router.push({
                path: generateProductUrl(categoryCode, nextCombination.code),
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
            path,
            hash,
            params: { code },
            query: { refCode = null, modal },
        } = to;

        const { productCode, referrerCode } = $store.state[PRODUCT_MODULE];

        // если все загружено, пропускаем
        if (productCode === code && referrerCode === refCode) next((vm) => vm.handleModalQuery(modal));
        else {
            $progress.start();
            $store
                .dispatch(`${PRODUCT_MODULE}/${FETCH_PRODUCT_DATA}`, { code, referrerCode: refCode })
                .then(() =>
                    next((vm) => {
                        $progress.finish();
                        vm.handleModalQuery(modal);
                    })
                )
                .catch((error) => {
                    $progress.fail();
                    if (error.status === httpCodes.NOT_FOUND) next(createNotFoundRoute(to));
                    else next(new Error(error.message));
                    $progress.finish();
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

        const {
            params: { code },
            query: { refCode, modal },
        } = to;

        const {
            params: { code: fromCode },
            query: { refCode: fromRefCode },
        } = from;

        if (code === fromCode && refCode === fromRefCode) next();
        else this.debounce_fetchProduct(to, from, next);
    },

    created() {
        // Если перезошел переход со страницы реферального партнера,
        // записываем его код в сессию для регистрации
        if (this.refCode) this[SET_SESSION_REFERRAL_CODE](this.refCode);
    },

    beforeMount() {
        const product = this[PRODUCT] || {};
        $retailRocket.addProductView([product.id]);
        this.debounce_fetchProduct = _debounce(this.fetchProduct, 500);
    },
};
</script>
