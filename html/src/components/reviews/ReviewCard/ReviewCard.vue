<template>
    <component :is="tag" class="review-card">
        <div class="review-card__header">
            <h4 class="review-card__header-name">
                {{ name }} <span class="text-grey text-sm review-card__header-date">{{ formatDate(created_at) }}</span>
            </h4>
            <v-rating class="review-card__header-rating" :value="rating" readonly>
                <template v-slot:activeLabel>
                    <v-svg name="star-small" width="16" height="16"/>
                </template>
                <template v-slot:inactiveLabel>
                    <v-svg name="star-empty-small" width="16" height="16"/>
                </template>
            </v-rating>
            <!-- #62705 -->
            <!-- <div class="review-card__header-options">
                {{ options && `${options[0].title}: ${options[0].value}` }}
            </div> -->
        </div>
        <div class="review-card__body">
            <div v-if="advantage" class="review-card__body-item">
                <div class="text-bold review-card__body-item-title">Достоинства</div>
                <div class="review-card__body-item-value">{{ advantage }}</div>
            </div>
            <div v-if="disadvantage" class="review-card__body-item">
                <div class="text-bold review-card__body-item-title">Недостатки</div>
                <div class="review-card__body-item-value">{{ disadvantage }}</div>
            </div>
            <div class="review-card__body-item">
                <div class="text-bold review-card__body-item-title">Комментарий</div>
                <div class="review-card__body-item-value">{{ comment }}</div>
            </div>
            <div v-if="images && images.length > 0" class="review-card__body-item">
                <div class="text-bold review-card__body-item-title">Фото</div>
                <div class="review-card__body-item-value review-card__body-item-value--media">
                    <div
                        class="review-card__body-item-img"
                        v-for="item in reviewImages"
                        :key="item.id"
                        @click="onShowReviewModal(item.id)"
                    >
                        <v-picture class="v-picture">
                            <img class="blur-up lazyload v-picture__img" :data-src="item.defaultImg"/>
                        </v-picture>
                    </div>
                </div>
            </div>
        </div>
        <!--        <div class="review-card__controls">-->
        <!-- Оценки отзыва(лайки дазлайки) пока убираем (не готов функционал на бэкенде) -->
        <!--            <session-check-button-->
        <!--                component="button"-->
        <!--                class="btn&#45;&#45;transparent review-card__controls-btn"-->
        <!--                :class="{ 'review-card__controls-btn&#45;&#45;like': vote === reviewOpinion.LIKE }"-->
        <!--                @click="onChangeVote(reviewOpinion.LIKE)"-->
        <!--            >-->
        <!--                <v-svg id="review-card-like" name="like" width="22" height="21" />-->
        <!--                &nbsp;{{ computedLikes }}-->
        <!--            </session-check-button>-->
        <!--            <session-check-button-->
        <!--                component="button"-->
        <!--                class="btn&#45;&#45;transparent review-card__controls-btn"-->
        <!--                :class="{ 'review-card__controls-btn&#45;&#45;dislike': vote === reviewOpinion.DISLIKE }"-->
        <!--                @click="onChangeVote(reviewOpinion.DISLIKE)"-->
        <!--            >-->
        <!--                <v-svg id="review-card-dislike" name="dislike" width="22" height="21" />-->
        <!--                &nbsp;{{ computedDislikes }}-->
        <!--            </session-check-button>-->
        <!-- Оценки отзыва(лайки дазлайки) пока убираем (не готов функционал на бэкенде) -->
        <!--        </div>-->
        <template v-if="answers.length > 0">
            <div class="review-card__answer" :key="answer.id" v-for="answer in answers">
                <div class="review-card__answer-container">
                    <div class="review-card__answer-title">
                        <div class="review-card__answer-title-icon">
                            <v-svg name="bonus" width="24" height="24"/>
                        </div>
                        <div class="review-card__answer-title-text">{{ getDefaultAnswerAuthor() }}</div>
                        <div class="review-card__answer-title-date">{{ formatDate(answer.created_at) }}</div>
                    </div>
                    <div class="review-card__body-item-value">{{ answer.answer }}</div>
                </div>
            </div>
        </template>
    </component>
</template>

<script>
import VLink from '@controls/VLink/VLink.vue';
import VSvg from '@controls/VSvg/VSvg.vue';
import VRating from '@controls/VRating/VRating.vue';
import VPicture from '@controls/VPicture/VPicture.vue';

import SessionCheckButton from '@components/SessionCheckButton/SessionCheckButton.vue';
import ReviewModal from '@components/reviews/ReviewModal/ReviewModal.vue';

import {mapActions, mapState} from 'vuex';
import {LOCALE} from '@store';
import {NAME as REVIEWS_MODULE} from '@store/modules/Reviews';
import {CHANGE_REVIEW_VOTE} from '@store/modules/Reviews/actions';
import {NAME as MODAL_MODULE} from '@store/modules/Modal';
import {CHANGE_MODAL_STATE} from '@store/modules/Modal/actions';

import {getDate} from '@util';
import {reviewOpinion, modalName} from '@enums';
import {generatePictureSourcePath} from '@util/file';
import {monthLongDateSettings} from '@settings';
import '@images/sprites/star-empty-small.svg';
import '@images/sprites/star-small.svg';
import '@images/sprites/like.svg';
import '@images/sprites/dislike.svg';
import '@images/sprites/payment/bonus.svg';
import './ReviewCard.css';

const ANSWER_AUTHOR = 'Бессовестно Талантливый';

export default {
    name: 'review-card',

    components: {
        VSvg,
        VLink,
        VRating,
        VPicture,
        ReviewModal,

        SessionCheckButton,
    },

    props: {
        id: {
            type: [String, Number],
        },

        tag: {
            type: String,
            default: 'div',
        },

        name: {
            type: String,
        },

        created_at: {
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

        answers: {
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
            openedImage: {},
        };
    },

    computed: {
        ...mapState([LOCALE]),

        reviewImages() {
            const images = this.images || [];
            return images.map((i) => ({
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

        reviewModalName() {
            return modalName.product.REVIEW;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        ...mapActions(REVIEWS_MODULE, [CHANGE_REVIEW_VOTE]),

        onShowReviewModal(id) {
            const openedImage = this.reviewImages.find((image) => image.id === id);

            this[CHANGE_MODAL_STATE]({
                name: this.reviewModalName,
                open: true,
                state: {
                    image: openedImage,
                },
            });
        },

        async onChangeVote(opinion) {
            if (this.vote || this.disableVote) return;

            try {
                const {id} = this;
                this.disableVote = true;
                await this[CHANGE_REVIEW_VOTE]({id, opinion});
                this.vote = opinion;
                this.disableVote = false;
            } catch (error) {
                this.disableVote = false;
            }
        },

        formatDate(date) {
            return date && getDate(date).toLocaleString(this[LOCALE], monthLongDateSettings);
        },

        getDefaultAnswerAuthor() {
            return ANSWER_AUTHOR;
        },
    },

    created() {
        this.reviewOpinion = reviewOpinion;
    },
};
</script>
