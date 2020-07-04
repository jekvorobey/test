<template>
    <component :is="tag" class="product-review-card">
        <div class="product-review-card__header">
            <h4 class="product-review-card__header-name">
                {{ name }} <span class="text-grey text-sm product-review-card__header-date">{{ computedDate }}</span>
            </h4>
            <v-rating class="product-review-card__header-rating" :value="rating" readonly>
                <template v-slot:activeLabel>
                    <v-svg name="star-small" width="16" height="16" />
                </template>
                <template v-slot:inactiveLabel>
                    <v-svg name="star-empty-small" width="16" height="16" />
                </template>
            </v-rating>
            <div class="product-review-card__header-options">
                {{ options && `${options[0].title}: ${options[0].value}` }}
            </div>
        </div>
        <div class="product-review-card__body">
            <div class="product-review-card__body-item">
                <div class="text-bold product-review-card__body-item-title">Достоинства</div>
                <div class="product-review-card__body-item-value">{{ advantage }}</div>
            </div>
            <div class="product-review-card__body-item">
                <div class="text-bold product-review-card__body-item-title">Недостатки</div>
                <div class="product-review-card__body-item-value">{{ disadvantage }}</div>
            </div>
            <div class="product-review-card__body-item">
                <div class="text-bold product-review-card__body-item-title">Комментарий</div>
                <div class="product-review-card__body-item-value">{{ comment }}</div>
            </div>
            <!-- <div v-if="images && images.length > 0" class="product-review-card__body-item">
                <div class="text-bold product-review-card__body-item-title">Фото</div>
                <div class="product-review-card__body-item-value">
                    <div class="product-review-card__body-item-img" v-for="item in images" :key="item.id">
                        <img class="blur-up lazyload" :data-src="item.image" alt="" />
                    </div>
                </div>
            </div> -->
        </div>
        <div class="product-review-card__controls">
            <button class="product-review-card__controls-btn">
                <v-svg id="product-review-card-like" name="like" width="22" height="21" />
                &nbsp;{{ likes }}
            </button>
            <button class="product-review-card__controls-btn">
                <v-svg id="product-review-card-dislike" name="dislike" width="22" height="21" />
                &nbsp;{{ dislikes }}
            </button>
        </div>
    </component>
</template>

<script>
import VLink from '@controls/VLink/VLink.vue';
import VSvg from '@controls/VSvg/VSvg.vue';
import VRating from '@controls/VRating/VRating.vue';

import { monthLongDateSettings } from '@settings';
import '@images/sprites/star-empty-small.svg';
import '@images/sprites/star-small.svg';
import '@images/sprites/like.svg';
import '@images/sprites/dislike.svg';
import './ProductReviewCard.css';

export default {
    name: 'product-review-card',

    components: {
        VSvg,
        VLink,
        VRating,
    },

    props: {
        tag: { type: String, default: 'div' },
        name: { type: String },
        date: { type: String },
        rating: { type: Number },
        likes: { type: Number },
        dislikes: { type: Number },
        advantage: { type: String },
        disadvantage: { type: String },
        locale: { type: String },
        comment: { type: String, default: 'ru' },
        images: { type: Array },
        options: { type: Array },
    },

    computed: {
        computedDate() {
            const date = new Date(this.date);
            return date.toLocaleString(this.locale, monthLongDateSettings);
        },
    },
};
</script>

