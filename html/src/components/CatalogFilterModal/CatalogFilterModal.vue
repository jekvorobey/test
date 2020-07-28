<template>
    <modal v-if="isOpen" class="catalog-view__modal-filter" :show-close-btn="false" type="fullscreen">
        <template v-slot:body>
            <v-sticky class="catalog-view__modal-filter-sticky">
                <template v-slot:sticky>
                    <div class="catalog-view__modal-filter-header">
                        <button class="catalog-view__modal-filter-header-btn" @click="onClose">
                            <v-svg name="cross-small" width="14" height="14" />Фильтр
                        </button>
                    </div>
                </template>

                <div class="catalog-view__modal-filter-sort">
                    <div class="catalog-view__modal-filter-sort-title">Сортировка</div>
                    <ul class="catalog-view__modal-filter-sort-list">
                        <li
                            class="catalog-view__modal-filter-sort-item"
                            :class="{ 'catalog-view__modal-filter-sort-item--active': item === sortValue }"
                            v-for="item in sortOptions"
                            :key="item.title"
                        >
                            <button class="catalog-view__modal-filter-sort-btn" @click="sortValue = item">
                                {{ item.title }}
                            </button>
                        </li>
                    </ul>
                </div>

                <catalog-filter-mobile class="catalog-view__modal-filter-panel" v-model="routeSegments" />

                <div class="catalog-view__modal-filter-controls">
                    <v-button class="btn--outline catalog-view__modal-filter-clear-btn" @click="onClearFilter">
                        Очистить
                    </v-button>

                    <v-button class="catalog-view__modal-filter-close-btn" @click="onApplyFilter">
                        Показать
                    </v-button>
                </div>
            </v-sticky>
        </template>
    </modal>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VSticky from '@controls/VSticky/VSticky.vue';
import VButton from '@controls/VButton/VButton.vue';
import Modal from '@controls/modal/modal.vue';

import CatalogFilterMobile from '@components/CatalogFilter/CatalogFilterMobile.vue';

import { mapState, mapActions } from 'vuex';

import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { modalName, sortDirections } from '@enums';
import { sortFields } from '@enums/catalog';
import { concatCatalogRoutePath, generateCategoryUrl } from '@util/catalog';

const NAME = modalName.catalog.FILTER;

export default {
    name: NAME,

    components: {
        VButton,
        VSticky,
        Modal,
        CatalogFilterMobile,
    },

    props: {
        sortOptions: {
            type: Array,
            default() {
                return [];
            },
        },
    },

    data() {
        return {
            sortValue: null,
            routeSegments: [],
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: state => state[MODALS][NAME] && state[MODALS][NAME].open,
        }),
        ...mapState('route', {
            type: state => state.params.type,
            code: state => state.params.code,
            entityCode: state => state.params.entityCode,
        }),

        computedRoutePath() {
            const { type, entityCode, code, routeSegments } = this;
            return concatCatalogRoutePath(type, entityCode, code, routeSegments);
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        setSortValue(field, direction) {
            this.sortValue =
                this.sortOptions.find(o => o.field === field && o.direction === direction) || this.sortOptions[0];
        },

        onApplyFilter() {
            const { field: orderField, direction: orderDirection } = this.sortValue || {};

            this.onClose();
            this.$router.replace({
                path: this.computedRoutePath,
                query: {
                    search_string: this.$route.query.search_string,
                    orderField,
                    orderDirection,
                },
            });
        },

        onClearFilter() {
            const { type, entityCode, code } = this;

            this.onClose();
            this.$router.replace({
                path: generateCategoryUrl(type, entityCode, code),
                query: { ...this.$route.query },
            });
        },

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },

    created() {
        const {
            query: { orderField = sortFields.PRICE, orderDirection = sortDirections.DESC },
        } = this.$route;
        this.setSortValue(orderField, orderDirection);
    },
};
</script>