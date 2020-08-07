import { storeErrorHandler } from '@util/store';
import { getReviews, addReview, changeReviewVote } from '@api';
import { DEFAULT_REVIEWS_PAGE_SIZE, DEFAULT_PAGE } from '@constants';
import { SET_REVIEWS_DATA, SET_REVIEWS_MORE } from './mutations';

export const FETCH_REVIEWS_DATA = 'FETCH_REVIEWS_DATA';
export const CREATE_REVIEW = 'CREATE_REVIEW';
export const CHANGE_REVIEW_VOTE = 'CHANGE_REVIEW_VOTE';

export default {
    async [FETCH_REVIEWS_DATA](
        { commit },
        {
            type,
            code,
            sortField,
            sortDirection,
            page = DEFAULT_PAGE,
            perPage = DEFAULT_REVIEWS_PAGE_SIZE,
            showMore = false,
        }
    ) {
        try {
            const { rating, reviewsCount: range, reviews: items } = await getReviews(
                type,
                code,
                sortField,
                sortDirection,
                page,
                perPage
            );

            if (showMore) commit(SET_REVIEWS_MORE, { items, page });
            else commit(SET_REVIEWS_DATA, { items, range, rating, page });
        } catch (error) {
            storeErrorHandler(FETCH_REVIEWS_DATA, true)(error);
        }
    },

    async [CREATE_REVIEW]({ dispatch }, { type, code, formData }) {
        try {
            await addReview(formData);
            dispatch(FETCH_REVIEWS_DATA, { type, code });
        } catch (error) {
            storeErrorHandler(CREATE_REVIEW, true)(error);
        }
    },

    async [CHANGE_REVIEW_VOTE](context, { id, opinion }) {
        try {
            await changeReviewVote(id, opinion);
        } catch (error) {
            storeErrorHandler(CHANGE_REVIEW_VOTE, true)(error);
        }
    },
};
