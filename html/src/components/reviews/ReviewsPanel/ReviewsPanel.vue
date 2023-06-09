<template>
    <div class="reviews-panel">
        <div class="reviews-panel__inner" v-if="!isAddingReview">
            <div class="reviews-panel__header">
                <h2 class="reviews-panel__header-hl">
                    {{ $t('product.title.reviews') }}
                    <span class="text-grey reviews-panel__header-hl-count" v-if="range">
                        {{ range }}&nbsp;<v-spinner width="24" height="24" :show="!mounted"/>
                    </span>

                    <session-check-button class="btn--outline reviews-panel__link" @click="onShowPanel">
                        {{ $t('product.reviews.makeReview') }}
                    </session-check-button>
                </h2>

                <template v-if="reviews && reviews.length > 0">
                    <div class="reviews-panel__header-rating">
                        <span class="reviews-panel__header-rating-count">
                            {{ $t('product.reviews.averageRating') }}&nbsp;
                            <span class="text-bold">
                                {{ rating && rating.toLocaleString() }}
                            </span>
                        </span>

                        <v-rating :value="rating" readonly>
                            <template v-slot:activeLabel>
                                <v-svg name="star-small" width="16" height="16"/>
                            </template>
                            <template v-slot:inactiveLabel>
                                <v-svg name="star-empty-small" width="16" height="16"/>
                            </template>
                        </v-rating>
                    </div>

                    <div class="reviews-panel__header-sort">
                        <v-select
                            class="reviews-panel__header-sort-select"
                            label="title"
                            track-by="id"
                            :searchable="false"
                            :allow-empty="false"
                            :show-labels="false"
                            v-model="selectedSortDirection"
                            :options="reviewsSortDirections"
                        >
                            <template v-slot:singleLabel="{ option }">
                                <template v-if="isTablet">{{ option.tabletTitle }}</template>
                                <template v-else>{{ option.title }}</template>
                            </template>
                        </v-select>
                    </div>
                </template>
            </div>

            <template v-if="reviews && reviews.length > 0">
                <transition-group class="reviews-panel__list" tag="ul" name="slide-in-bottom">
                    <review-card
                        class="reviews-panel__list-item"
                        tag="li"
                        v-for="item in reviews"
                        :key="item.id"
                        v-bind="item"
                    />
                </transition-group>

                <div class="reviews-panel__show-more" v-if="activePage < pagesCount">
                    <show-more-button
                        btn-class="btn--outline reviews-panel__show-more-btn"
                        preloader-class="reviews-panel__show-more-btn"
                        @click="onShowMoreReviews"
                        :show-preloader="isLoadingMoreReviews"
                    >
                        {{ $t('product.reviews.showAll') }}
                    </show-more-button>
                </div>
            </template>
        </div>

        <create-review-panel v-else :code="code" :type="type" @create-review="onCreateReview"/>

        <transition name="fade-in">
            <review-modal v-if="reviewModalIsOpen"/>
        </transition>
    </div>
</template>

<script>
import VRating from '@controls/VRating/VRating.vue';
import VSelect from '@controls/VSelect/VSelect.vue';
import VSpinner from '@controls/VSpinner/VSpinner.vue';

import ReviewModal from '@components/reviews/ReviewModal/ReviewModal.vue';

import ShowMoreButton from '@components/ShowMoreButton/ShowMoreButton.vue';
import SessionCheckButton from '@components/SessionCheckButton/SessionCheckButton.vue';

import CreateReviewPanel from '@components/reviews/CreateReviewPanel/CreateReviewPanel.vue';
import ReviewCard from '@components/reviews/ReviewCard/ReviewCard.vue';

import {mapActions, mapState, mapGetters} from 'vuex';

import {MODALS, NAME as MODAL_MODULE} from '@store/modules/Modal';
import {CHANGE_MODAL_STATE} from '@store/modules/Modal/actions';

import {NAME as REVIEWS_MODULE, RANGE, REVIEWS, RATING, ACTIVE_PAGE} from '@store/modules/Reviews';
import {PAGES_COUNT} from '@store/modules/Reviews/getters';
import {FETCH_REVIEWS_DATA, CREATE_REVIEW} from '@store/modules/Reviews/actions';

import {NAME as PRODUCT_MODULE, PRODUCT} from '@store/modules/Product';

import {sortDirections, modalName} from '@enums';
import './ReviewsPanel.css';

export default {
    name: 'reviews-panel',

    components: {
        VRating,
        VSelect,
        VSpinner,

        ShowMoreButton,
        SessionCheckButton,

        ReviewCard,
        CreateReviewPanel,

        ReviewModal,
    },

    props: {
        type: {
            type: String,
            required: true,
        },

        code: {
            type: String,
            required: true,
        },

        canAdd: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        const reviewsSortDirections = [
            {
                id: 1,
                title: 'Cначала новые',
                tabletTitle: 'Новые',
                value: sortDirections.DESC,
            },
            {
                id: 2,
                title: 'Cначала старые',
                tabletTitle: 'Cтарые',
                value: sortDirections.ASC,
            },
        ];

        return {
            mounted: false,
            isAddingReview: false,
            isLoadingMoreReviews: false,
            selectedSortDirection: reviewsSortDirections[0],
            reviewsSortDirections,
        };
    },

    computed: {
        ...mapState(PRODUCT_MODULE, [PRODUCT]),
        ...mapState(REVIEWS_MODULE, [REVIEWS, RANGE, ACTIVE_PAGE, RATING]),
        ...mapGetters(REVIEWS_MODULE, [PAGES_COUNT]),

        ...mapState(MODAL_MODULE, {
            reviewModalIsOpen: (state) => {
                return state[MODALS][modalName.product.REVIEW] && state[MODALS][modalName.product.REVIEW].open
                    ? state[MODALS][modalName.product.REVIEW].open
                    : false;
            },
        }),

        isTablet() {
            return this.$mq.tablet;
        },
    },

    watch: {
        selectedSortDirection(newValue) {
            const productId = this[PRODUCT].productId;

            this[FETCH_REVIEWS_DATA]({product_id: productId, sortDirection: newValue.value});
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(REVIEWS_MODULE, [FETCH_REVIEWS_DATA, CREATE_REVIEW]),

        async onShowMoreReviews() {
            try {
                const {activePage, selectedSortDirection} = this;
                const productId = this[PRODUCT].productId;
                this.isLoadingMoreReviews = true;
                await this[FETCH_REVIEWS_DATA]({
                    product_id: productId,
                    page: activePage + 1,
                    sortDirection: selectedSortDirection.value,
                    showMore: true,
                });
                this.isLoadingMoreReviews = false;
            } catch (error) {
                this.isLoadingMoreReviews = false;
            }
        },

        async onCreateReview(formData) {
            formData.append('product_id', this[PRODUCT].productId);
            let message = null;

            try {
                this.isAddingReview = false;
                await this[CREATE_REVIEW]({formData, product_id: this[PRODUCT].productId});
                message = 'Спасибо за ваш отзыв! Будет размещен после проверки';
            } catch (error) {
                message = 'Не удалось отправить отзыв.';
            }

            this[CHANGE_MODAL_STATE]({
                name: modalName.general.NOTIFICATION,
                open: true,
                state: {
                    message,
                },
            });
        },

        onShowPanel() {
            if (this.canAdd) this.isAddingReview = true;
            if (this.canAdd) this.isAddingReview = true;
            else
                this[CHANGE_MODAL_STATE]({
                    name: modalName.general.NOTIFICATION,
                    open: true,
                    state: {
                        message: 'Оставить отзыв можно после покупки и получения товара',
                    },
                });
        },
    },

    async mounted() {
        try {
            const productId = this[PRODUCT].productId;
            await this[FETCH_REVIEWS_DATA]({product_id: productId});
        } catch (error) {
        }
        this.mounted = true;
    },
};
</script>