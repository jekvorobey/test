<template>
    <div class="catalog-product-card">
        <v-link class="catalog-product-card__img" :to="href">
            <img class="blur-up lazyload" :data-src="image" alt="" />
        </v-link>
        <div class="catalog-product-card__body">
            <div class="catalog-product-card__body-top">
                <div>
                    <div class="catalog-product-card__controls">
                        <v-svg name="eye" width="18" height="18" />
                        <v-svg name="wishlist-middle" width="18" height="18" />
                    </div>
                    <div class="catalog-product-card__prices">
                        <div class="catalog-product-card__price">{{ oldPrice ? `от ${price}` : price }}</div>
                        <div v-show="oldPrice" class="text-sm text-grey text-strike catalog-product-card__price">
                            от {{ oldPrice }}
                        </div>
                    </div>
                </div>

                <button class="catalog-product-card__btn">
                    <v-svg name="add-to-cart-small" width="27" height="18" />
                </button>
            </div>
            <div class="catalog-product-card__body-bottom">
                <v-rating class="catalog-product-card__rating" :value="rating" readonly>
                    <template v-slot:activeLabel>
                        <v-svg name="star-small" width="12" height="12" />
                    </template>
                    <template v-slot:inactiveLabel>
                        <v-svg name="star-empty-small" width="12" height="12" />
                    </template>
                </v-rating>
                <v-link class="link--sm catalog-product-card__link" :to="href">{{ name }}</v-link>
            </div>
        </div>
    </div>
</template>

<script>
import VSvg from '../controls/VSvg/VSvg.vue';
import VLink from '../controls/VLink/VLink.vue';
import VRating from '../controls/VRating/VRating.vue';
import Tag from '../Tag/Tag.vue';

import '../../assets/images/sprites/star-empty-small.svg';
import '../../assets/images/sprites/star-small.svg';
import '../../assets/images/sprites/add-to-cart-small.svg';
import '../../assets/images/sprites/wishlist-middle.svg';
import '../../assets/images/sprites/eye.svg';
import './CatalogProductCard.css';

export default {
    name: 'catalog-product-card',

    components: {
        VSvg,
        VLink,
        VRating,

        Tag,
    },

    props: {
        tags: {
            type: Array,
            default() {
                return [];
            },
        },

        productId: {
            type: [String, Number],
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        href: {
            type: String,
        },

        image: {
            type: String,
        },

        rating: {
            type: Number,
            default: 0,
        },

        price: {
            type: [String, Number],
            default: null,
        },

        oldPrice: {
            type: [String, Number],
            default: null,
        },
    },
};
</script>

