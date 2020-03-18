<template>
    <section class="section product-view">
        <div class="container">
            <breadcrumbs class="product-view__breadcrumbs">
                <breadcrumb-item key="main" to="/">
                    Главная
                </breadcrumb-item>
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
                <v-sticky class="product-view__header-sticky">
                    <template v-slot:sticky>
                        <div v-if="!isTabletLg" class="product-view__header-gallery" @click.prevent="onShowGallery">
                            <div
                                class="product-view__header-gallery-item"
                                v-for="image in product.media"
                                :key="image.id"
                            >
                                <v-picture v-if="image && image.id" :image="image" alt="">
                                    <template v-slot:source="{ image }">
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
                                    <template v-slot:source="{ image }">
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

                    <product-option-panel
                        class="product-view__header-detail-section product-view__header-detail-options"
                        :key="char.code"
                        v-for="char in characteristics"
                        :header="char.name"
                        :note="char.note"
                    >
                        <template v-if="char.type === 'radio'">
                            <product-option-tag
                                class="product-view__header-detail-options-item"
                                v-for="option in char.options"
                                :key="option.code"
                                :selected="isOptionSelected(char.code, option.value)"
                                :disabled="isOptionDisabled(char.code, option.value)"
                                @click="onSelectOption(char.code, option.value)"
                            >
                                {{ option.name }}
                            </product-option-tag>
                        </template>
                    </product-option-panel>

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
                                :disabled="!canBuy"
                                @click.prevent="
                                    ADD_CART_ITEM({
                                        offerId: product.id,
                                        storeId: product.stock.storeId,
                                    })
                                "
                            >
                                {{ canBuy ? 'Добавить в корзину' : 'Нет в наличии' }}
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
                        <v-html v-html="product.description.content" />
                        <a class="product-view__header-detail-brand-link" href="#description">
                            Подробнее
                        </a>
                    </div>
                    <div v-if="productImages.brand" class="product-view__header-detail-section">
                        <div class="product-view__header-detail-brand">
                            <v-picture :key="productImages.brand.id" class="product-view__header-detail-brand-img">
                                <source :data-src="productImages.brand.desktop" type="image/webp" />
                                <img
                                    class="blur-up lazyload v-picture__img"
                                    :data-src="productImages.brand.default"
                                    :alt="productImages.brand.alt"
                                />
                            </v-picture>

                            <router-link class="product-view__header-detail-brand-link" :to="brandUrl">
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

        <section
            id="description"
            v-if="product.description && (product.description.content || product.description.image)"
            class="section product-view__section product-view__info"
        >
            <div class="container product-view__info-container">
                <div class="product-view__info-header">
                    <h2 class="product-view__section-hl">{{ $t('product.title.description') }}</h2>
                    <v-html class="product-view__info-text" v-html="product.description.content" />
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
                    <v-picture :key="productImages.howto.id" v-if="productImages.howto">
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
                        class="lazyload"
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
                        :show-buy-btn="product.stock.qty > 0"
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
                        :show-buy-btn="product.stock.qty > 0"
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
                :can-buy="canBuy"
                @addItem="
                    ADD_CART_ITEM({
                        offerId: product.id,
                        storeId: product.stock.storeId,
                    })
                "
            />
        </transition>

        <transition name="fade-in">
            <quick-view-modal v-if="isQuickViewOpen && !isTabletLg" />
            <add-to-cart-modal v-else-if="isAddToCartOpen" />
            <gallery-modal v-else-if="isGalleryOpen && !isTabletLg" />
        </transition>
    </section>
</template>

<script>
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

import CatalogProductCard from '@components/CatalogProductCard/CatalogProductCard.vue';
import CatalogBannerCard from '@components/CatalogBannerCard/CatalogBannerCard.vue';

import ProductTipCard from '@components/product/ProductTipCard/ProductTipCard.vue';
import ProductFileCard from '@components/product/ProductFileCard/ProductFileCard.vue';
import ProductCartPanel from '@components/product/ProductCartPanel/ProductCartPanel.vue';
import ProductReviewCard from '@components/product/ProductReviewCard/ProductReviewCard.vue';
import ProductPricePanel from '@components/product/ProductPricePanel/ProductPricePanel.vue';
import ProductDetailPanel from '@components/product/ProductDetailPanel/ProductDetailPanel.vue';
import ProductOptionPanel from '@components/product/ProductOptionPanel/ProductOptionPanel.vue';
import ProductOptionTag from '@components/product/ProductOptionTag/ProductOptionTag.vue';

import QuickViewModal, { NAME as QUICK_VIEW_MODAL_NAME } from '@components/QuickViewModal/QuickViewModal.vue';
import AddToCartModal, { NAME as ADD_TO_CART_MODAL_NAME } from '@components/AddToCartModal/AddToCartModal.vue';
import GalleryModal, { NAME as GALLERY_MODAL_NAME } from '@components/GalleryModal/GalleryModal.vue';

import { $store, $progress, $logger } from '@services';
import { mapState, mapActions, mapGetters } from 'vuex';

import { SCROLL } from '@store';

import productModule, {
    NAME as PRODUCT_MODULE,
    PRODUCT,
    BANNERS,
    MASTERCLASSES,
    FEATURED_PRODUCTS,
    INSTAGRAM_ITEMS,
    PRODUCT_OPTIONS,
} from '@store/modules/Product';
import {
    COMBINATIONS,
    CHARACTERISTICS,
    SELECTED_COMBINATION,
    IS_SELECTED,
    IS_DISABLED,
    GET_NEXT_COMBINATION,
} from '../../store/modules/Product/getters';
import { FETCH_PRODUCT_DATA } from '@store/modules/Product/actions';

import { NAME as CART_MODULE } from '@store/modules/Cart';
import { ADD_CART_ITEM } from '@store/modules/Cart/actions';

import { NAME as GEO_MODULE, SELECTED_CITY } from '@store/modules/Geolocation';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import _debounce from 'lodash/debounce';
import { registerModuleIfNotExists } from '@util/store';
import {
    generatePictureSourcePath,
    generateYoutubeImagePlaceholderPath,
    generateYoutubeVideoSourcePath,
} from '@util/file';
import { breakpoints } from '@enums';
import { productGroupTypes } from '@enums/product';
import { generateCategoryUrl, generateProductUrl } from '@util/catalog';

import '@images/sprites/socials/vkontakte-bw.svg';
import '@images/sprites/socials/facebook-bw.svg';
import '@images/sprites/socials/instagram-bw.svg';

import '@images/sprites/cart-empty.svg';
import '@images/sprites/star-empty-small.svg';
import '@images/sprites/star-small.svg';
import '@images/sprites/arrow-small.svg';
import '@images/sprites/wishlist-middle.svg';
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

        Breadcrumbs,
        BreadcrumbItem,

        Price,
        CatalogProductCard,
        BannerCard,
        InstagramCard,

        ProductTipCard,
        ProductFileCard,
        ProductReviewCard,

        ProductCartPanel,
        ProductPricePanel,
        ProductDetailPanel,

        ProductOptionTag,
        ProductOptionPanel,

        QuickViewModal,
        AddToCartModal,
        GalleryModal,
    },

    data() {
        return {
            isPriceVisible: true,
        };
    },

    computed: {
        ...mapState([SCROLL]),
        ...mapState('route', {
            code: state => state.params.code,
            categoryCode: state => state.params.categoryCode,
        }),
        ...mapState(GEO_MODULE, [SELECTED_CITY]),

        ...mapState(MODAL_MODULE, {
            isQuickViewOpen: state => state[MODALS][QUICK_VIEW_MODAL_NAME] && state[MODALS][QUICK_VIEW_MODAL_NAME].open,
            isAddToCartOpen: state =>
                state[MODALS][ADD_TO_CART_MODAL_NAME] && state[MODALS][ADD_TO_CART_MODAL_NAME].open,
            isGalleryOpen: state => state[MODALS][GALLERY_MODAL_NAME] && state[MODALS][GALLERY_MODAL_NAME].open,
        }),

        ...mapGetters(PRODUCT_MODULE, [IS_SELECTED, IS_DISABLED, GET_NEXT_COMBINATION]),
        ...mapGetters(PRODUCT_MODULE, [CHARACTERISTICS, COMBINATIONS, SELECTED_COMBINATION]),
        ...mapState(PRODUCT_MODULE, [
            PRODUCT,
            PRODUCT_OPTIONS,
            MASTERCLASSES,
            BANNERS,
            FEATURED_PRODUCTS,
            INSTAGRAM_ITEMS,
        ]),

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
            const { brand, howto, description } = this.product;

            if (brand && brand.image) {
                imageMap.brand = {
                    id: brand.image.id,
                    desktop: generatePictureSourcePath(null, null, brand.image.id, 'webp'),
                    default: generatePictureSourcePath(null, null, brand.image.id, brand.image.sourceExt),
                    alt: brand.name,
                };
            }

            if (howto && howto.image) {
                imageMap.howto = {
                    id: howto.image.id,
                    desktop: generatePictureSourcePath(null, null, howto.image.id, 'webp'),
                    tablet: generatePictureSourcePath(320, 240, howto.image.id, 'webp'),
                    default: generatePictureSourcePath(null, null, howto.image.id, howto.image.sourceExt),
                };
            }

            if (description && description.image) {
                imageMap.description = {
                    id: description.image.id,
                    desktop: generatePictureSourcePath(null, null, description.image.id, 'webp'),
                    tablet: generatePictureSourcePath(320, 240, description.image.id, 'webp'),
                    default: generatePictureSourcePath(null, null, description.image.id, description.image.sourceExt),
                };
            }

            return imageMap;
        },

        canBuy() {
            return this.product.stock.qty > 0;
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
            // const { fias_id } = value;
            // this.debounce_fetchProduct(to, from);
        },
    },

    methods: {
        ...mapActions(PRODUCT_MODULE, [FETCH_PRODUCT_DATA]),
        ...mapActions(CART_MODULE, [ADD_CART_ITEM]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        isOptionSelected(code, value) {
            return this[IS_SELECTED](code, value);
        },

        isOptionDisabled(code, value) {
            return this[IS_DISABLED](code, value);
        },

        generateSourcePath(x, y, id, ext) {
            return generatePictureSourcePath(x, y, id, ext);
        },

        generateBreadcrumbUrl(code) {
            return { path: generateCategoryUrl(productGroupTypes.CATALOG, null, code) };
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
                state: { offerId: item.id, storeId: item.stock.storeId, type: item.type },
            });
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
            hash,
            params: { code },
        } = to;

        // регистрируем модуль, если такого нет
        registerModuleIfNotExists($store, PRODUCT_MODULE, productModule);
        const { productCode } = $store.state[PRODUCT_MODULE];
        const {
            selectedCity: { fias_id },
        } = $store.state[GEO_MODULE];

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

        const {
            params: { code: fromCode },
        } = from;

        if (code !== fromCode) this.debounce_fetchProduct(code, fias_id, next);
        else next();
    },

    beforeMount() {
        this.debounce_fetchProduct = _debounce(async (code, city, next) => {
            try {
                const { productCode } = this.product;
                this.$progress.start();
                await this[FETCH_PRODUCT_DATA]({ code, city });
                next();
                this.$progress.finish();
            } catch (error) {
                this.$progress.fail();
                next(false);
            }
        }, 500);
    },
};
</script>
