<template>
    <div class="product-detail-panel">
        <component class="product-detail-panel__hl" :is="headerTag" v-bind="itemPropSettings.name">
            {{ title }}
        </component>

        <div class="product-detail-panel__info">
            <button
                class="product-detail-panel__info-btn"
                v-bind="itemPropSettings.aggregateRating"
                @click.stop="onRatingClick"
            >
                <v-rating class="product-detail-panel__info-rating" :value="rating || 0" readonly>
                    <template v-slot:activeLabel>
                        <v-svg name="star-small" width="16" height="16" />
                    </template>
                    <template v-slot:inactiveLabel>
                        <v-svg name="star-empty-small" width="16" height="16" />
                    </template>
                </v-rating>

                <span v-show="false" v-bind="itemPropSettings.rating">{{ rating }}</span>
                <div class="text-grey product-detail-panel__info-review">
                    {{ $t('product.review') }} <span v-bind="itemPropSettings.review">{{ reviewsCount || 0 }}</span>
                </div>
            </button>

            <div class="text-grey product-detail-panel__info-code">
                {{ $t('product.vendorCode') }} <span v-bind="itemPropSettings.sku">{{ vendorCode }}</span>
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

        itemProp: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        itemPropSettings() {
            const { itemProp, rating, reviewsCount } = this;

            return itemProp
                ? {
                      name: {
                          itemprop: 'name',
                      },
                      aggregateRating: {
                          general:
                              rating > 0 && reviewsCount > 0
                                  ? {
                                        itemprop: 'aggregateRating',
                                        itemscope: true,
                                        itemtype: 'https://schema.org/AggregateRating',
                                    }
                                  : {},
                          rating:
                              rating > 0 && reviewsCount > 0
                                  ? {
                                        itemprop: 'ratingValue',
                                    }
                                  : {},
                          review:
                              rating > 0 && reviewsCount > 0
                                  ? {
                                        itemprop: 'reviewCount',
                                    }
                                  : {},
                      },
                      sku: {
                          itemprop: 'sku',
                      },
                  }
                : {
                      title: {},
                      aggregateRating: {
                          general: {
                              itemprop: 'aggregateRating',
                              itemscope: true,
                              itemtype: 'https://schema.org/AggregateRating',
                          },
                          rating: {},
                          review: {},
                      },
                      sku: {},
                  };
        },
    },

    methods: {
        onRatingClick() {
            this.$emit('rating-click');
        },
    },
};
</script>
