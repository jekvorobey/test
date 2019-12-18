<template>
    <section class="section promopage-view">
        <div class="promopage-view__header">
            <h2 class="promopage-view__hl">
                Моя промостраница
            </h2>
            <span class="text-grey text-sm">{{ products.length }} продуктов</span>
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
                <li class="promopage-view__panel-item" v-for="item in products" :key="item.id">
                    <catalog-product-card
                        class="promopage-view__panel-card"
                        :product-id="item.id"
                        :name="item.name"
                        :type="item.type"
                        :href="`/catalog/${item.categoryCodes[item.categoryCodes.length - 1]}/${item.code}`"
                        :image="item.image"
                        :price="item.price"
                        :old-price="item.oldPrice"
                        :tags="item.tags"
                        :rating="item.rating"
                        :show-wishlist-btn="false"
                        @addItem="ADD_CART_ITEM({ offerId: item.id })"
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

import { $store, $progress, $logger } from '../../../services/ServiceLocator';

import { NAME as PROFILE_MODULE, PROMO_DATA } from '../../../store/modules/Profile';
import { FETCH_PROMO_DATA } from '../../../store/modules/Profile/actions';

import { NAME as CART_MODULE } from '../../../store/modules/Cart';
import { ADD_CART_ITEM } from '../../../store/modules/Cart/actions';

import '../../../assets/images/sprites/cross.svg';
import '../../../assets/images/sprites/copy.svg';
import '../../../assets/images/sprites/edit.svg';
import '../../../assets/images/sprites/link.svg';
import '../../../assets/images/sprites/link-add.svg';
import '../../../assets/images/sprites/plus-small.svg';
import './Promopage.css';
import { mapState, mapActions } from 'vuex';

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

    computed: {
        ...mapState(PROFILE_MODULE, {
            products: state => (state[PROMO_DATA] ? state[PROMO_DATA].products : []),
        }),
    },

    methods: {
        ...mapActions(CART_MODULE, [ADD_CART_ITEM]),
    },

    beforeRouteEnter(to, from, next) {
        const { promoData } = $store.state.profile;

        // если все загружено, пропускаем
        if (promoData) next();
        else {
            $progress.start();
            $store
                .dispatch(`${PROFILE_MODULE}/${FETCH_PROMO_DATA}`)
                .then(() => {
                    next(vm => $progress.finish());
                })
                .catch(error => {
                    next(vm => $progress.fail());
                    $logger.error(error);
                });
        }
    },

    beforeMount() {},
};
</script>
