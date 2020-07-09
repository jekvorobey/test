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
            <!-- #62705 -->
            <!-- <div class="product-review-card__header-options">
                {{ options && `${options[0].title}: ${options[0].value}` }}
            </div> -->
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
            <div v-if="images && images.length > 0" class="product-review-card__body-item">
                <div class="text-bold product-review-card__body-item-title">Фото</div>
                <div class="product-review-card__body-item-value product-review-card__body-item-value--media">
                    <div class="product-review-card__body-item-img" v-for="item in reviewImages" :key="item.id">
                        <v-picture>
                            <img class="blur-up lazyload v-picture__img" :data-src="item.defaultImg" />
                        </v-picture>
                    </div>
                </div>
            </div>
        </div>
        <div class="product-review-card__controls">
            <session-check-button
                component="button"
                class="btn--transparent product-review-card__controls-btn"
                :class="{ 'product-review-card__controls-btn--like': vote === reviewOpinion.LIKE }"
                @click="onChangeVote(reviewOpinion.LIKE)"
            >
                <v-svg id="product-review-card-like" name="like" width="22" height="21" />
                &nbsp;{{ computedLikes }}
            </session-check-button>
            <session-check-button
                component="button"
                class="btn--transparent product-review-card__controls-btn"
                :class="{ 'product-review-card__controls-btn--dislike': vote === reviewOpinion.DISLIKE }"
                @click="onChangeVote(reviewOpinion.DISLIKE)"
            >
                <v-svg id="product-review-card-dislike" name="dislike" width="22" height="21" />
                &nbsp;{{ computedDislikes }}
            </session-check-button>
        </div>
    </component>
</template>

<script>
import VLink from '@controls/VLink/VLink.vue';
import VSvg from '@controls/VSvg/VSvg.vue';
import VRating from '@controls/VRating/VRating.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import SessionCheckButton from '@components/SessionCheckButton/SessionCheckButton.vue';

import { mapActions } from 'vuex';
import { NAME as PRODUCT_MODULE } from '@store/modules/Product';
import { CHANGE_REVIEW_VOTE } from '@store/modules/Product/actions';

import { reviewOpinion } from '@enums';
import { generatePictureSourcePath } from '@util/file';
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
        VPicture,

        SessionCheckButton,
    },

    props: {
        id: {
            type: String,
        },

        tag: {
            type: String,
            default: 'div',
        },

        name: {
            type: String,
        },

        date: {
            type: String,
        },

        rating: {
            type: Number,
        },

        likes: {
            type: Number,
        },

        dislikes: {
            type: Number,
        },

        advantage: {
            type: String,
        },

        disadvantage: {
            type: String,
        },

        locale: {
            type: String,
        },

        comment: {
            type: String,
            default: 'ru',
        },

        options: {
            type: Array,
            default() {
                return [];
            },
        },

        images: {
            type: Array,
            default() {
                return [];
            },
        },
    },

    data() {
        return {
            disableVote: false,
            vote: null,
        };
    },

    computed: {
        computedDate() {
            const date = new Date(this.date);
            return date.toLocaleString(this.locale, monthLongDateSettings);
        },

        reviewImages() {
            const images = this.images || [];
            return images.map(i => ({
                id: i,
                defaultImg: generatePictureSourcePath(null, null, i),
            }));
        },

        computedLikes() {
            switch (this.vote) {
                case reviewOpinion.LIKE:
                    return this.likes + 1;
                default:
                    return this.likes;
            }
        },

        computedDislikes() {
            switch (this.vote) {
                case reviewOpinion.DISLIKE:
                    return this.dislikes + 1;
                default:
                    return this.dislikes;
            }
        },
    },

    methods: {
        ...mapActions(PRODUCT_MODULE, [CHANGE_REVIEW_VOTE]),

        async onChangeVote(opinion) {
            if (this.vote || this.disableVote) return;

            try {
                const { id } = this;
                this.disableVote = true;
                await this[CHANGE_REVIEW_VOTE]({ id, opinion });
                this.vote = opinion;
                this.disableVote = false;
            } catch (error) {
                this.disableVote = false;
            }
        },
    },

    created() {
        this.reviewOpinion = reviewOpinion;
    },
};
</script>

