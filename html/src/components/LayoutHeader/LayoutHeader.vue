<template>
    <header class="header">
        <div class="header__top">
            <div class="container header__top-container">
                <div class="text-medium header__top-city">
                    Москва&nbsp;<v-svg name="arrow-down" width="20" height="20" />
                </div>
                <div class="header__top-middle">
                    <span class="header__top-middle-item">
                        <v-svg name="truck" width="16" height="16" />&nbsp;&nbsp;Доставка по всей России
                    </span>
                    <span class="header__top-middle-item">
                        <v-svg name="box" width="16" height="16" />&nbsp;&nbsp;Более 1000 товаров для профессионалов
                    </span>
                    <span class="header__top-middle-item">
                        <v-svg name="gift" width="16" height="16" />&nbsp;&nbsp;Бонусы с каждой покупки
                    </span>
                </div>
                <div class="text-medium header__top-help">
                    Помощь&nbsp;<v-svg name="arrow-down" width="20" height="20" />
                </div>
            </div>
        </div>
        <div class="header__middle">
            <div class="container header__middle-container">
                <div class="text-grey header__middle-search">
                    <v-svg name="search-middle" width="20" height="20" />&nbsp;Искать...
                </div>
                <div class="text-sm text-grey header__middle-middle">
                    <span class="header__middle-middle-item">Онлайн-платформа</span>
                    &nbsp;
                    <span class="header__middle-middle-item">
                        <v-svg name="logo-text" width="115" height="42" />
                    </span>
                    &nbsp;
                    <span class="header__middle-middle-item">
                        Для профессионалов<br />
                        бьюти-индустрии
                    </span>
                </div>
                <div class="header__middle-cart">
                    <div>
                        <v-svg name="account-middle" width="20" height="20" />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <v-svg name="wishlist-middle" width="20" height="20" style="fill: #ffffff;" />
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span class="text-medium">15 780 ₽</span>&nbsp;
                        <v-svg name="cart-middle" width="20" height="20" style="fill: #ffffff;" />
                    </div>
                    <div class="text-sm text-grey header__middle-cart-discount">До бесплатной доставки — 890 ₽</div>
                </div>
            </div>
        </div>
        <div class="header__bottom">
            <div class="container">
                <nav class="header__bottom-inner">
                    <v-link class="header__bottom-link" to="/top">{{ $t('header.links.new') }}</v-link>
                    <v-link class="header__bottom-link" to="/new">{{ $t('header.links.stocks') }}</v-link>
                    <v-link class="header__bottom-link" to="/show">{{ $t('header.links.collections') }}</v-link>
                    <v-link class="header__bottom-link" to="/ask">{{ $t('header.links.brands') }}</v-link>
                    <v-link class="header__bottom-link" to="/job">{{ $t('header.links.classes') }}</v-link>
                    <v-link class="header__bottom-link" to="/ui-kit">ui-kit</v-link>
                </nav>
            </div>
        </div>
    </header>
</template>

<script>
import VSvg from '../controls/VSvg/VSvg.vue';
import VLink from '../controls/VLink/VLink.vue';

import '../../assets/images/sprites/logo-text.svg';

import '../../assets/images/sprites/cart-middle.svg';
import '../../assets/images/sprites/wishlist-middle.svg';
import '../../assets/images/sprites/account-middle.svg';
import '../../assets/images/sprites/search-middle.svg';

import '../../assets/images/sprites/gift.svg';
import '../../assets/images/sprites/box.svg';
import '../../assets/images/sprites/truck.svg';
import '../../assets/images/sprites/arrow-down.svg';

import './LayoutHeader.critical.css';
import './LayoutHeader.css';

export default {
    name: 'layout-header',
    components: {
        VSvg,
        VLink,
    },
};
</script>

