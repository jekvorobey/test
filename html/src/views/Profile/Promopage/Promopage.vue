<template>
    <section class="section promopage-view">
        <div class="promopage-view__header">
            <h2 class="promopage-view__hl">
                Моя промостраница
            </h2>
            <span class="text-grey text-sm">5 продуктов</span>
        </div>

        <info-panel class="promopage-view__panel" :header="headerText">
            <template v-slot:controls>
                <v-link class="promopage-view__panel-link" tag="button">
                    <v-svg name="edit" width="16" height="16" />
                </v-link>

                <v-link class="promopage-view__panel-link" tag="button">
                    <v-svg name="plus-small" width="16" height="16" />
                    &nbsp;&nbsp;Добавить
                </v-link>

                <v-link class="promopage-view__panel-link" tag="button">
                    <v-svg name="link-add" width="16" height="16" />
                    &nbsp;&nbsp;Добавить по ссылке
                </v-link>

                <v-link class="promopage-view__panel-link" tag="button">
                    <v-svg name="link" width="16" height="16" />
                    &nbsp;&nbsp;Скопировать ссылку
                </v-link>
            </template>

            <ul class="promopage-view__panel-list">
                <li class="promopage-view__panel-item">
                    <catalog-product-card
                        class="promopage-view__panel-card"
                        :product-id="123"
                        :name="'Smith & Cult Блеск для губ Her Name Bubbles'"
                        :type="'product'"
                        :href="`/catalog`"
                        :price="'1 920 ₽'"
                        :old-price="'2 590 ₽'"
                        :rating="4"
                        :show-wishlist-btn="false"
                    />
                    <button class="promopage-view__panel-item-btn" @click.prevent>
                        <v-svg name="cross" width="24" height="24" />
                    </button>
                </li>
                <li class="promopage-view__panel-item">
                    <catalog-product-card
                        class="promopage-view__panel-card"
                        :product-id="123"
                        :name="'Smith & Cult Блеск для губ Her Name Bubbles'"
                        :type="'product'"
                        :href="`/catalog`"
                        :price="'1 920 ₽'"
                        :old-price="'2 590 ₽'"
                        :rating="4"
                        :show-wishlist-btn="false"
                    />
                    <button class="promopage-view__panel-item-btn" @click.prevent>
                        <v-svg name="cross" width="24" height="24" />
                    </button>
                </li>
                <li class="promopage-view__panel-item">
                    <catalog-product-card
                        class="promopage-view__panel-card"
                        :product-id="123"
                        :name="'Smith & Cult Блеск для губ Her Name Bubbles'"
                        :type="'product'"
                        :href="`/catalog`"
                        :price="'1 920 ₽'"
                        :old-price="'2 590 ₽'"
                        :rating="4"
                        :show-wishlist-btn="false"
                    />
                    <button class="promopage-view__panel-item-btn" @click.prevent>
                        <v-svg name="cross" width="24" height="24" />
                    </button>
                </li>
                <li class="promopage-view__panel-item">
                    <catalog-product-card
                        class="promopage-view__panel-card"
                        :product-id="123"
                        :name="'Smith & Cult Блеск для губ Her Name Bubbles'"
                        :type="'product'"
                        :href="`/catalog`"
                        :price="'1 920 ₽'"
                        :old-price="'2 590 ₽'"
                        :rating="4"
                        :show-wishlist-btn="false"
                    />
                    <button class="promopage-view__panel-item-btn" @click.prevent>
                        <v-svg name="cross" width="24" height="24" />
                    </button>
                </li>
                <li class="promopage-view__panel-item">
                    <catalog-product-card
                        class="promopage-view__panel-card"
                        :product-id="123"
                        :name="'Smith & Cult Блеск для губ Her Name Bubbles'"
                        :type="'product'"
                        :href="`/catalog`"
                        :price="'1 920 ₽'"
                        :old-price="'2 590 ₽'"
                        :rating="4"
                        :show-wishlist-btn="false"
                    />
                    <button class="promopage-view__panel-item-btn" @click.prevent>
                        <v-svg name="cross" width="24" height="24" />
                    </button>
                </li>
            </ul>
        </info-panel>
    </section>
</template>

<script>
import VSvg from '../../../components/controls/VSvg/VSvg.vue';
import VLink from '../../../components/controls/VLink/VLink.vue';

import InfoPanel from '../../../components/profile/InfoPanel/InfoPanel.vue';
import CatalogProductCard from '../../../components/CatalogProductCard/CatalogProductCard.vue';

import '../../../assets/images/sprites/cross.svg';
import '../../../assets/images/sprites/copy.svg';
import '../../../assets/images/sprites/edit.svg';
import '../../../assets/images/sprites/link.svg';
import '../../../assets/images/sprites/link-add.svg';
import '../../../assets/images/sprites/plus-small.svg';
import './Promopage.css';

export default {
    name: 'promopage',

    components: {
        VSvg,
        VLink,

        InfoPanel,
        CatalogProductCard,
    },

    data() {
        return {
            headerText: 'Я рекомендую',
        };
    },

    computed: {},

    watch: {},

    methods: {},

    beforeRouteEnter(to, from, next) {
        next();
    },

    beforeRouteUpdate(to, from, next) {
        next();
    },

    beforeMount() {},
};
</script>
