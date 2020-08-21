<template>
    <div class="product-detail-panel">
        <component :is="headerTag" class="product-detail-panel__hl">
            {{ title }}
        </component>

        <div class="product-detail-panel__info">
            <button class="product-detail-panel__info-btn" @click.stop="onRatingClick">
                <v-rating class="product-detail-panel__info-rating" :value="rating || 0" readonly>
                    <template v-slot:activeLabel>
                        <v-svg name="star-small" width="16" height="16" />
                    </template>
                    <template v-slot:inactiveLabel>
                        <v-svg name="star-empty-small" width="16" height="16" />
                    </template>
                </v-rating>
                <div class="text-grey product-detail-panel__info-review">
                    {{ $t('product.review', { n: reviewsCount || 0 }) }}
                </div>
            </button>

            <div class="text-grey product-detail-panel__info-code">
                {{ $t('product.vendorCode', { code: vendorCode }) }}
            </div>
        </div>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VRating from '@controls/VRating/VRating.vue';

import '@images/sprites/star-small.svg';
import '@images/sprites/star-empty-small.svg';
import './ProductDetailPanel.css';

export default {
    name: 'product-detail-panel',
    components: {
        VSvg,
        VRating,
    },

    props: {
        headerTag: {
            type: String,
            default: 'h1',
        },

        reviewsCount: {
            type: Number,
            default: 0,
        },

        rating: {
            type: Number,
            default: 0,
        },

        vendorCode: {
            type: String,
        },

        title: {
            type: String,
            default: 'Title',
        },
    },

    methods: {
        onRatingClick() {
            this.$emit('rating-click');
        },
    },
};
</script>