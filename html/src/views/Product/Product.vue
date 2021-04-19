<template>
    <section class="section product-view" :class="{ 'product-view--scroll': scroll }">
        <breadcrumbs class="container product-view__breadcrumbs">
            <breadcrumb-item key="main" to="/">
                <v-svg v-if="isTablet" name="home" width="10" height="10" />
                <span v-else>Главная</span></breadcrumb-item
            >
            <breadcrumb-item key="Catalog" :to="rootUrl">Каталог</breadcrumb-item>
            <breadcrumb-item v-for="category in categoryBreadcrumbs" :key="category.code" :to="category.url">{{
                category.name
            }}</breadcrumb-item>
            <breadcrumb-item :key="product.id" :to="$route.path">{{ product.title }}</breadcrumb-item>
        </breadcrumbs>

        <section class="section">
            <div class="container product-view__header" itemscope itemtype="https://schema.org/Product">
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
                        <div class="product-view__header-container">
                            <div v-if="!isTabletLg" class="product-view__header-gallery" @click.prevent="onShowGallery">
                                <div
                                    v-if="!currentGalleryImages || currentGalleryImages.length === 0"
                                    class="product-view__header-gallery-item product-view__header-gallery-item--empty"
                                >
                                    <v-svg name="logo" width="56" height="56" />
                                </div>
                                <div
                                    class="product-view__header-gallery-item"
                                    v-for="(image) in currentGalleryImages"
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
                                        <img
                                            class="v-picture__img"
                                            :itemprop="image"
                                            :data-src="image.default"
                                            :src="image.default"
                                            alt=""
                                        />
                                    </v-picture>
                                </div>
                            </div>
                            <v-slider
                                v-else
                                class="product-view__header-gallery"
                                name="gallery"
                                :key="code"
                                :options="productGalleryOptions"
                                :controls="productImages.media.length > 1"
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
                                    :class="
                                        productImages.media.length == 1
                                            ? 'product-view__header-gallery-item--alone'
                                            : ''
                                    ">

                                    <v-picture>
                                        <source
                                            :data-srcset="image.desktop.webp"
                                            type="image/webp"
                                            media="(min-width: 480px)"
                                        />
                                        <source :data-srcset="image.desktop.orig" media="(min-width: 480px)"/>
                                        <source
                                            :data-srcset="image.tablet.webp"
                                            type="image/webp"
                                            media="(max-width: 479px)"
                                        />
                                        <source :data-srcset="image.tablet.orig" media="(max-width: 479px)" />
                                        <img class="v-picture__img" :data-src="image.default" :src="image.default" alt="" />
                                    </v-picture>
                                </div>
                            </v-slider>

                            <div class="product-view__header-tags">
                                <tag
                                    class="product-view__header-tags-item"
                                    v-for="badge in badges"
                                    :key="badge"
                                    :text="badge"
                                />
                            </div>
                        </div>
                    </template>
                </v-sticky>

                <v-sticky class="product-view__header-detail">
                    <template v-slot:sticky>
                        <product-detail-panel
                            class="product-view__header-detail-info"
                            :title="product.title"
                            :reviews-count="product.reviewsCount"
                            :vendor-code="product.vendorCode"
                            :rating="product.rating"
                            @rating-click="onScrollTo($refs.reviews, !isTabletLg ? 64 : isTablet ? -24 : -48)"
                            item-prop
                        />

                        <span v-if="product.description" v-show="false" itemprop="description">
                            {{ product.description.content }}
                        </span>

                        <product-option-panel
                            class="product-view__header-detail-section product-view__header-detail-options"
                            :key="char.code"
                            v-for="char in characteristics"
                            :header="char.name"
                            :selected-option="char.selectedOption && char.selectedOption.name"
                            :measurement="char.measurement_unit"
                            :note="char.note"
                        >
                            <div class="product-view__header-detail-options-tags" v-if="char.type === 'radio'">
                                <product-option-tag
                                    class="product-view__header-detail-options-item"
                                    v-for="option in char.options"
                                    :key="`radio_${char.code}-${option.value}`"
                                    :selected="option.isSelected"
                                    :disabled="option.isDisabled"
                                    @click="onSelectOption(char.code, option.value)"
                                    @mouseover="onShowOption(char.code, !option.isSelected ? option.value : null)"
                                    @mouseleave="onHideOption"
                                >
                                    {{ option.name }} {{ char.measurement_unit ? char.measurement_unit : '' }}
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
                                    @mouseover="onShowOption(char.code, option.value)"
                                    @mouseleave="onHideOption"
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
                            item-prop
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

                        <div class="product-view__header-detail-section" v-if="product.description || product.brand">
                            <template v-if="product.description && product.description.content">
                                <p class="text-bold product-view__header-detail-section-hl">
                                    Описание и характеристики
                                </p>
                                <v-clamp tag="p" :max-lines="maxDescriptionLines" :autoresize="true">
                                    {{ product.description.content }}
                                </v-clamp>
                                <a class="product-view__header-detail-brand-link" href="#description">Подробнее</a>
                            </template>

                            <div v-if="product.brand" class="product-view__header-detail-brand">
                                <router-link :to="brandUrl || null" class="link">
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
                                </router-link>

                                <router-link
                                    v-if="product.brand.hasDetail"
                                    class="product-view__header-detail-brand-link"
                                    :to="brandUrl"
                                >
                                    На страницу бренда
                                </router-link>
                            </div>
                        </div>
                    </template>
                </v-sticky>
            </div>
        </section>

        <section class="section product-view__section product-view__instagram">
            <div class="container product-view__instagram-container">
                <frisbuy-product-container v-if="product && product.id" :key="product.id" :script="frisbuyUrl" :skuId="product.id" />
            </div>
        </section>

        <!-- #66085 -->
        <section class="section product-view__section">
            <div class="container product-view__socials">
                <div class="product-view__socials-inner">
                    <div class="product-view__socials-statistics">
                        <!-- <div>
                            <v-svg name="cart-empty" width="24" height="24" />
                        </div>
                        <div>
                            <div>32 человека уже купили это товар</div>
                            <div class="text-grey">за последние 2 месяца</div>
                        </div> -->
                    </div>
                    <div class="product-view__socials-share">
                        <span class="text-bold">Поделиться</span>&nbsp;
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
                    </div>
                </div>
            </div>
        </section>

        <section class="section product-view__section">
            <div class="container">
                <div
                    data-retailrocket-markup-block="5efda11097a5253518ebbf1d"
                    :data-product-id="featuredProducts && featuredProducts.items.map((i) => i.productId).join(',')"
                ></div>
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
                                :badges="item.badges"
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
            class="section product-view__section product-view__info"
            v-if="
                (product.description && (product.description.content || product.description.image)) ||
                (product.howto && (product.howto.content || product.howto.image))
            "
        >
            <div class="container product-view__info-container">
                <div id="description" class="hook" />
                <div
                    v-if="product.description && (product.description.content || product.description.image)"
                    class="product-view__info-part"
                    :class="{
                        'product-view__info-part--50':
                            product.howto &&
                            (product.howto.content || product.howto.image) &&
                            !productImages.description &&
                            !productVideos.description,
                    }"
                >
                    <div class="product-view__info-header">
                        <h2 class="product-view__section-hl">{{ $t('product.title.description') }}</h2>
                        <div class="product-view__info-content">
                          <p class="product-view__info-text">{{ product.description.content }}</p>
                          <div class="product-view__info-media" v-if="productImages.description || productVideos.description">
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
                            <div class="video-container">
                              <iframe
                                  v-if="productVideos.description"
                                  class="lazyload"
                                  :data-src="productVideos.description.videoUrl + '&controls=0&showinfo=0'"
                                  :key="productVideos.description.id"
                                  frameborder="0"
                                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; autoplay"
                                  allowfullscreen="false"
                              />
                            </div>
                          </div>
                        </div>
                    </div>
                </div>

                <div
                    v-if="product.howto && (product.howto.content || product.howto.image)"
                    class="product-view__info-part"
                    :class="{
                        'product-view__info-part--50':
                            product.description &&
                            product.description.content &&
                            !productImages.description &&
                            !productVideos.description,
                    }"
                >
                    <div class="product-view__info-header">
                        <h2 class="product-view__section-hl">{{ $t('product.title.method') }}</h2>
                        <div class="product-view__info-content">
                          <p class="product-view__info-text">
                            <ol class="list" v-if="howToList.length > 1">
                              <li v-for="(item, index) in howToList" :key="index">
                                {{ item }}
                              </li>
                            </ol>
                            <span v-else >{{ howToList[0] }}</span>
                          </p>
                          <div class="product-view__info-media" v-if="productImages.howto || productVideos.howto">
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
                              <img
                                  class="blur-up lazyload v-picture__img"
                                  :data-src="productImages.howto.default"
                                  alt=""
                              />
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
                    </div>
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
            v-if="
                (productCharacteristics && productCharacteristics.length > 0) ||
                (productIngredients && productIngredients.length > 0)
            "
            class="section product-view__section product-view__characteristics"
        >
            <div class="container">
                <template v-if="productCharacteristics && productCharacteristics.length > 0">
                    <h2 class="product-view__section-hl">{{ $t('product.title.characteristics') }}</h2>
                    <ul class="product-view__characteristics-list">
                        <li
                            class="product-view__characteristics-item"
                            v-for="item in productCharacteristics"
                            :key="item.id"
                        >
                            <div class="product-view__characteristics-item-title">{{ item.title }}</div>
                            <div class="product-view__characteristics-item-value">
                                {{ Array.isArray(item.value) ? item.value.join(', ') : item.value }}
                            </div>
                        </li>
                    </ul>
                </template>

                <template v-if="productIngredients && productIngredients.length > 0">
                    <h2 class="product-view__section-hl">{{ $t('product.title.ingredients') }}</h2>
                    <div class="product-view__characteristics-list">
                        {{ productIngredients.join(', ') }}
                    </div>
                </template>
            </div>
        </section>

        <!-- #58437 -->
        <section
            v-if="productMasterclasses && productMasterclasses.length > 0"
            class="section product-view__masterclass"
        >
            <div class="container product-view__masterclass-container">
                <h2 class="product-view__section-hl product-view__masterclass-hl">
                    {{ $t('product.title.masterClasses') }}
                </h2>
                <ul class="product-view__masterclass-list">
                    <product-masterclass-card
                        class="product-view__masterclass-item"
                        v-for="item in productMasterclasses"
                        :key="item.id"
                        :name="item.name"
                        :image="item.image"
                        :note="item.speaker"
                        :date="item.dateTime"
                        :price="item.price"
                        :href="item.url"
                    >
                        <template v-if="item.mobileImg">
                            <source :data-srcset="item.mobileImg.webp" type="image/webp" media="(max-width: 425px)" />
                            <source :data-srcset="item.mobileImg.orig" media="(max-width: 425px)" />
                        </template>

                        <template v-if="item.tabletImg">
                            <source :data-srcset="item.tabletImg.webp" type="image/webp" media="(max-width: 768px)" />
                            <source :data-srcset="item.tabletImg.orig" media="(max-width: 768px)" />
                        </template>
                        <template v-if="item.desktopImg">
                            <source :data-srcset="item.desktopImg.webp" type="image/webp" />
                            <source :data-srcset="item.desktopImg.orig" />
                        </template>
                        <img
                            v-if="item.defaultImg"
                            class="blur-up lazyload v-picture__img"
                            :data-src="item.defaultImg"
                            alt
                        />
                    </product-masterclass-card>
                </ul>
                <v-button
                    class="btn--outline product-view__section-link product-view__masterclass-link"
                    :to="{ name: 'CatalogMasterclasses' }"
                >
                    {{ $t('product.showAll') }}
                </v-button>
            </div>
        </section>

        <!-- #58437 -->
        <section ref="reviews" class="section product-view__section product-view__reviews">
            <div class="container">
                <reviews-panel
                    class="product-view__reviews-panel"
                    :key="product.code"
                    :code="product.code"
                    :type="productType"
                    :can-add="product.canWriteReview"
                />
            </div>
        </section>

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

        <section class="section product-view__section">
            <div class="container">
                <div
                    data-retailrocket-markup-block="5efda11697a52833a0d006e6"
                    :data-product-id="featuredProducts && featuredProducts.items.map((i) => i.productId).join(',')"
                ></div>
            </div>
        </section>

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
                        :badges="item.badges"
                        :rating="item.rating"
                        :show-buy-btn="item.stock.qty > 0"
                        @add-item="onAddToCart(item)"
                        @preview="onPreview(item.code)"
                        @toggle-favorite-item="onToggleFavorite(item.productId)"
                    />
                </v-slider>
            </div>
        </section>

        <section
            class="section product-view__section product-view__history"
            v-if="recentlyViewed && recentlyViewed.length > 0"
        >
            <div class="container product-view__history-container">
                <h2 class="container container--tablet-lg product-view__section-hl product-view__history-hl">
                    {{ $t('product.title.history') }}
                </h2>

                <history-panel class="product-view__history-panel" :items="recentlyViewed" />
            </div>
        </section>

        <template v-if="isMounted">
            <transition v-if="!isTablet" name="slide-top">
                <product-price-panel
                    class="product-view__top-panel"
                    v-if="scroll && !isPriceVisible"
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
            <section class="section" :style="{ height: isTablet ? '56px' : 0 }" v-else>
                <product-price-panel
                    class="product-view__top-panel"
                    :class="{ 'product-view__top-panel--static': !isPanelSticky }"
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
                <div v-observe-visibility="onEndReached" />
            </section>

            <transition name="fade-in">
                <gallery-modal v-if="!isTabletLg && isGalleryOpen" :images="productImages.gallery">
                    <template v-slot:image="{ image }">
                        <source :data-srcset="image.desktop.webp" type="image/webp" />
                        <source :data-srcset="image.desktop.orig" />
                        <img class="blur-up lazyload v-picture__img" :data-src="image.default" alt="" />
                    </template>
                </gallery-modal>
            </transition>

            <transition name="fade-in">
                <product-map-modal v-if="isModalOpen" />
            </transition>
        </template>
    </section>
</template>

<script>
import VClamp from 'vue-clamp';
import VSvg from '@controls/VSvg/VSvg.vue';
import VButton from '@controls/VButton/VButton.vue';
import VSticky from '@controls/VSticky/VSticky.vue';
import VPicture from '@controls/VPicture/VPicture.vue';
import GalleryModal from '@components/GalleryModal/GalleryModal.vue';
import VSlider from '@controls/VSlider/VSlider.vue';
import SocialSharing from 'vue-social-sharing';

import Tag from '@components/Tag/Tag.vue';

import Breadcrumbs from '@components/Breadcrumbs/Breadcrumbs.vue';
import BreadcrumbItem from '@components/Breadcrumbs/BreadcrumbItem/BreadcrumbItem.vue';

import FavoritesButton from '@components/FavoritesButton/FavoritesButton.vue';
import FrisbuyProductContainer from '@components/FrisbuyProductContainer/FrisbuyProductContainer.vue';

import CatalogProductCard from '@components/CatalogProductCard/CatalogProductCard.vue';

import ProductMasterclassCard from '@components/product/ProductMasterclassCard/ProductMasterclassCard.vue';
import ProductTipCard from '@components/product/ProductTipCard/ProductTipCard.vue';
import ProductFileCard from '@components/product/ProductFileCard/ProductFileCard.vue';
import ProductCartPanel from '@components/product/ProductCartPanel/ProductCartPanel.vue';
import ProductPricePanel from '@components/product/ProductPricePanel/ProductPricePanel.vue';
import ProductDetailPanel from '@components/product/ProductDetailPanel/ProductDetailPanel.vue';
import ProductDeliveryPanel from '@components/product/ProductDeliveryPanel/ProductDeliveryPanel.vue';
import ProductOptionPanel from '@components/product/ProductOptionPanel/ProductOptionPanel.vue';
import ProductOptionTag from '@components/product/ProductOptionTag/ProductOptionTag.vue';
import ProductColorTag from '@components/product/ProductColorTag/ProductColorTag.vue';
import ProductBundlePanel from '@components/product/ProductBundlePanel/ProductBundlePanel.vue';
import ProductMapModal, { NAME as MAP_MODAL_NAME } from '@components/product/ProductMapModal/ProductMapModal.vue';

import HistoryPanel from '@components/HistoryPanel/HistoryPanel.vue';
import ReviewsPanel from '@components/reviews/ReviewsPanel/ReviewsPanel.vue';

import { mapState, mapActions, mapGetters } from 'vuex';
import { SCROLL, RECENTLY_VIEWED_PRODUCTS, LOCALE } from '@store';
import { FETCH_RECENTLY_VIEWED_PRODUCTS } from '@store/actions';

import { NAME as AUTH_MODULE } from '@store/modules/Auth';
import { SET_SESSION_REFERRAL_CODE } from '@store/modules/Auth/actions';

import {
    NAME as PRODUCT_MODULE,
    PRODUCT,
    BANNERS,
    FEATURED_PRODUCTS,
    PRODUCT_OPTIONS,
    PRODUCT_BUNDLES,
    MASTERCLASSES,
} from '@store/modules/Product';
import { COMBINATIONS, CHARACTERISTICS, GET_NEXT_COMBINATION } from '@store/modules/Product/getters';
import {
    FETCH_PRODUCT_DATA,
    FETCH_PRODUCT_MASTERCLASSES,
    FETCH_PRODUCT_PICKUP_POINTS,
} from '@store/modules/Product/actions';

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
import metaMixin from '@plugins/meta';
import { $store, $progress, $retailRocket } from '@services';
import {
    generateFileOriginalPath,
    generatePictureSourcePath,
    generateYoutubeImagePlaceholderPath,
    generateYoutubeVideoSourcePath,
} from '@util/file';
import { createNotFoundRoute, createNotFoundProductRoute } from '@util/router';
import { breakpoints, fileExtension, httpCodes, modalName } from '@enums';
import { productGroupTypes, cartItemTypes } from '@enums/product';
import {
    generateCategoryUrl,
    generateProductUrl,
    prepareProductImage,
    generateProductGroupUrl,
    generateAbsoluteProductUrl,
    generateMasterclassUrl,
    prepareMasterclassSpeakers,
} from '@util/catalog';

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
import { getDate } from '@util';
import { dayMonthLongDateSettings, hourMinuteTimeSettings } from '@settings';

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
    autoHeight: true,

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

const gallerySize = 800;
const desktopSize = 600;
const tabletSize = 400;

export default {
    name: 'product',
    mixins: [metaMixin],

    components: {
        VSvg,
        VButton,
        VClamp,
        VSticky,
        VSlider,
        VPicture,
        SocialSharing,

        Breadcrumbs,
        BreadcrumbItem,

        Tag,
        CatalogProductCard,

        FavoritesButton,

        ProductTipCard,
        ProductFileCard,

        ProductCartPanel,
        ProductPricePanel,
        ProductDetailPanel,
        ProductDeliveryPanel,
        ProductOptionPanel,
        ProductBundlePanel,
        ProductMasterclassCard,

        ProductColorTag,
        ProductOptionTag,

        ProductMapModal,
        GalleryModal,

        FrisbuyProductContainer,

        ReviewsPanel,
        HistoryPanel,
    },

    metaInfo() {
        const { metaData } = this;
        const { title, url, image } = metaData;

        return {
            title,
            meta: [
                {
                    property: 'og:title',
                    content: title,
                },
                {
                    property: 'og:type',
                    content: 'webpage',
                },
                {
                    property: 'og:url',
                    content: url,
                },
                {
                    property: 'og:image',
                    content: image,
                },
                {
                    property: 'og:image:url',
                    content: image,
                },
            ],
        };
    },

    data() {
        return {
            isMounted: false,
            isPriceVisible: true,
            isPanelSticky: true,
            optionImage: null,
        };
    },

    computed: {
        ...mapState([LOCALE]),
        ...mapState([SCROLL, RECENTLY_VIEWED_PRODUCTS]),

        ...mapState(GEO_MODULE, [SELECTED_CITY]),
        ...mapGetters(CART_MODULE, [IS_IN_CART]),
        ...mapGetters(FAVORITES_MODULE, [IS_IN_FAVORITES]),

        ...mapGetters(PRODUCT_MODULE, [CHARACTERISTICS, COMBINATIONS, GET_NEXT_COMBINATION]),
        ...mapState(PRODUCT_MODULE, [
            PRODUCT,
            PRODUCT_OPTIONS,
            BANNERS,
            FEATURED_PRODUCTS,
            PRODUCT_BUNDLES,
            MASTERCLASSES,
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

        badges() {
            const { product } = this;
            const { badges } = product || {};
            return badges || [];
        },

        howToList() {
            const { howto } = this[PRODUCT] || {};
            return howto && howto.content && howto.content.split('|');
        },

        brandUrl() {
            const { brand } = this.product;
            return generateCategoryUrl(productGroupTypes.BRANDS, brand.code);
        },

        frisbuyUrl() {
            const { id } = this[PRODUCT];
            return `https://www.frisbuy.ru/fb/widget?embed_id=e9575241-9f3d-11ea-ba01-0242ac150002&sku=${id}`;
        },

        productCharacteristics() {
            const { characteristics = [] } = this[PRODUCT] || {};
            return characteristics && characteristics.filter((c) => !!c.value);
        },

        productIngredients() {
            const { ingredients = [] } = this[PRODUCT] || {};
            return ingredients && ingredients.filter((i) => !!i);
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

        productMasterclasses() {
            const items = this[MASTERCLASSES] || [];

            return items.map((i) => {
                const { nearestDate, nearestTimeFrom, code, speakers, image } = i;
                const dateObj = getDate(`${nearestDate} ${nearestTimeFrom}`);
                const date = dateObj.toLocaleString(this[LOCALE], dayMonthLongDateSettings);
                const time = dateObj.toLocaleString(this[LOCALE], hourMinuteTimeSettings);
                const dateTime = `${date} (${this.$t(`weekdays.short.${dateObj.getDay()}`)}), ${time}`;
                const url = generateMasterclassUrl(code);
                const speaker = prepareMasterclassSpeakers(speakers);

                const defaultImg = image && generatePictureSourcePath(null, null, image.id);
                const desktopImg = image && {
                    webp: generatePictureSourcePath(null, null, image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(null, null, image.id),
                };

                const tabletImg = image && {
                    webp: generatePictureSourcePath(425, 320, image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(425, 320, image.id),
                };

                const mobileImg = image && {
                    webp: generatePictureSourcePath(320, 200, image.id, fileExtension.image.WEBP),
                    orig: generatePictureSourcePath(320, 200, image.id),
                };

                return {
                    ...i,
                    url,
                    speaker,
                    dateTime,
                    desktopImg,
                    tabletImg,
                    mobileImg,
                    defaultImg,
                };
            });
        },

        productImages() {
            const imageMap = {};
            const { brand, howto, description, media } = this[PRODUCT] || {};

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
                imageMap.media = media.map((image) => prepareProductImage(image, desktopSize, tabletSize));
                imageMap.gallery = media.map((image) => prepareProductImage(image, gallerySize));
            } else {
                imageMap.media = [];
                imageMap.gallery = [];
            }

            return imageMap;
        },

        currentGalleryImages() {
            const { productImages, optionImage } = this;
            const { media } = productImages;

            const mainImage = optionImage && prepareProductImage(optionImage, desktopSize, tabletSize);
            return mainImage ? [mainImage, ...media.slice(1)] : media;
        },

        categoryBreadcrumbs() {
            const { categoryCodes = [] } = this[PRODUCT] || {};
            return categoryCodes.map((c) => ({
                ...c,
                url: generateCategoryUrl(productGroupTypes.CATALOG, null, c.code),
            }));
        },

        rootUrl() {
            return generateProductGroupUrl(productGroupTypes.CATALOG);
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

        pricePanelAnimation() {
            return this.isTablet ? 'slide-bottom' : 'slide-top';
        },

        productType() {
            return cartItemTypes.PRODUCT;
        },

        canBuy() {
            return this.product.stock.qty > 0;
        },

        canWriteReview() {
            return this[PRODUCT] && this[PRODUCT].canWriteReview;
        },

        metaData() {
            const { title, code, categoryCodes = [], media } = this[PRODUCT] || {};
            const url =
                categoryCodes &&
                categoryCodes.length > 0 &&
                generateAbsoluteProductUrl(categoryCodes[categoryCodes.length - 1].code, code);

            const image = Array.isArray(media) && media.length > 0 ? generateFileOriginalPath(media[0].id) : null;

            return {
                title,
                url,
                image,
            };
        },

        socialSharing() {
            const { metaData } = this;
            const { title, url } = metaData;

            return {
                url,
                title,
            };
        },

        inCart() {
            const { id } = this[PRODUCT];
            return this[IS_IN_CART](cartItemTypes.PRODUCT, id);
        },

        inFavorites() {
            const { productId } = this[PRODUCT];
            return this[IS_IN_FAVORITES](productId);
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
            this.onSelectedCityChanged(value);
        },

        code(value) {
            if (value) {
                this.setRetailRocketProductView();
                this[FETCH_RECENTLY_VIEWED_PRODUCTS]();
                this[FETCH_PRODUCT_MASTERCLASSES](value);
            }
        },

        modal(value) {
            this.handleModalQuery(value);
        },
    },

    methods: {
        ...mapActions([FETCH_RECENTLY_VIEWED_PRODUCTS]),
        ...mapActions(AUTH_MODULE, [SET_SESSION_REFERRAL_CODE]),
        ...mapActions(PRODUCT_MODULE, [FETCH_PRODUCT_DATA, FETCH_PRODUCT_PICKUP_POINTS, FETCH_PRODUCT_MASTERCLASSES]),
        ...mapActions(CART_MODULE, [ADD_CART_ITEM, ADD_CART_BUNDLE]),
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(FAVORITES_MODULE, [TOGGLE_FAVORITES_ITEM]),

        async fetchProduct(to, from, next) {
            const {
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
            const { code, type, stock, id, variantGroups } = item;

            if (variantGroups) this.onPreview(code);
            else
                this[CHANGE_MODAL_STATE]({
                    name: modalName.general.ADD_TO_CART,
                    open: true,
                    state: { offerId: id, storeId: stock && stock.storeId, type },
                });
        },

        onPreview(code) {
            this[CHANGE_MODAL_STATE]({
                name: modalName.general.QUICK_VIEW,
                open: true,
                state: { code },
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
                state: { message: 'Комплект добавлен в корзину' },
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
            const { code } = this[GET_NEXT_COMBINATION](charCode, optValue);
            this.$router.push({
                path: generateProductUrl(categoryCode, code),
            });
        },

        onShowOption(charCode, optValue) {
            if (!optValue) {
                return;
            }

            const { images } = this[GET_NEXT_COMBINATION](charCode, optValue);
            this.productImages.media = [];
            if (Array.isArray(images) && images.length) {
                this.optionImage = images[0];
                this.productImages.media = images.map((image) => prepareProductImage(image, desktopSize, tabletSize));
            }
            else {
                this.optionImage = null;
                this.productImages.media = [];
            }
        },

        onHideOption() {
            this.optionImage = null;
            const { media } = this[PRODUCT] || {};
            this.productImages.media = [];
            if (Array.isArray(media) && media.length > 0) {
                this.productImages.media = media.map((image) => prepareProductImage(image, desktopSize, tabletSize));
                this.productImages.gallery = media.map((image) => prepareProductImage(image, gallerySize));
            } else {
                this.productImages.media = [];
                this.productImages.gallery = [];
            }
        },

        onPriceVisibilityChanged(isVisible) {
            this.isPriceVisible = isVisible;
        },

        onEndReached(isVisible) {
            const { isTablet } = this;
            this.isPanelSticky = !isTablet || !isVisible;
        },

        onScrollTo(ref, offset = 0) {
            window.scrollTo({ top: ref.offsetTop + offset, behavior: 'smooth' });
        },

        setRetailRocketProductView() {
            const { productId } = this[PRODUCT] || {};
            const productIds = [];
            if (this[PRODUCT_OPTIONS] && this[PRODUCT_OPTIONS].combinations.length > 1) {
                this[PRODUCT_OPTIONS].combinations.map((combination) => {
                    productIds.push(combination.id);
                });
            } else productIds.push(productId);
            $retailRocket.addProductView(productIds);
        },
    },

    beforeRouteEnter(to, from, next) {
        // вызывается до подтверждения пути, соответствующего этому компоненту.
        // НЕ ИМЕЕТ доступа к контексту экземпляра компонента `this`,
        // так как к моменту вызова экземпляр ещё не создан!

        const {
            params: { code },
            query: { refCode = null, modal },
        } = to;

        function proceed() {
            if ($store.state[PRODUCT_MODULE]) {
                const { productCode, referrerCode } = $store.state[PRODUCT_MODULE];

                // если все загружено, пропускаем
                if (productCode === code && referrerCode === refCode) next((vm) => vm.handleModalQuery(modal));
                else {
                    $progress.start();
                    $store
                        .dispatch(`${PRODUCT_MODULE}/${FETCH_PRODUCT_DATA}`, { code, referrerCode: refCode })
                        .then(() => {
                            next((vm) => {
                                $progress.finish();
                                vm.handleModalQuery(modal);
                            });
                        })
                        .catch((error) => {
                            $progress.fail();
                            if (error.status === httpCodes.NOT_FOUND) next(createNotFoundProductRoute(to));
                            else next(new Error(error.message));
                            $progress.finish();
                        });
                }
            }
        }

        if ($store.state[PRODUCT_MODULE]) proceed();
        else {
            $store.watch(
                (state) => state[PRODUCT_MODULE],
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

        const {
            params: { code },
            query: { refCode },
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
        this.debounce_fetchProduct = _debounce(this.fetchProduct, 500);
        const { code } = this[PRODUCT] || {};
        this.setRetailRocketProductView();

        this[FETCH_RECENTLY_VIEWED_PRODUCTS]();
        this[FETCH_PRODUCT_MASTERCLASSES](code);
    },

    mounted() {
        window.frisbuy.loadScript(this.frisbuyUrl);
        this.$nextTick(() => (this.isMounted = true));
    },
};
</script>
