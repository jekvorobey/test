<template>
    <div v-if="accordionFilters && accordionFilters.length > 0" class="catalog-filter">
        <v-accordion
            class="catalog-filter__filters"
            key-field="name"
            :items="accordionFilters"
            :item-show-header="(item) => !!item.title"
            :item-expanded="(item) => item.isExpanded"
            :item-toggled="(item) => onIsExpandedClick(item)"
        >
            <template v-slot:content="{ item: filter }">
                <div class="catalog-filter__filters-range" v-if="filter.type === 'range'">
                    <v-range
                        :key="`${filter.min}-${filter.max}`"
                        :initialValue="[filter.min, filter.max]"
                        :value="filterSegments[filter.name] || [filter.min, filter.max]"
                        :max="filter.max"
                        :min="filter.min"
                        :format="format"
                        @input="onRangeChange($event, filter.name)"
                    />
                </div>
                <div class="catalog-filter__filters-check" v-else-if="filter.type === 'check'">
                    <v-check
                        v-for="option in filter.items"
                        :id="`${filter.name}-${option.id}`"
                        :key="option.id"
                        :name="filter.name"
                        :checked="filterSegments[filter.name] && filterSegments[filter.name][option.code]"
                        :disabled="!!option.disabled"
                        @change="onCheckChange($event, `${filter.name}-${option.code}`)"
                    >
                        {{ option.name }}
                    </v-check>
                    <button
                        class="catalog-filter__filters-more"
                        @click="onShowMoreClick(filter)"
                        v-if="filter.isOverflow"
                    >
                        {{ filter.showMore ? 'Свернуть' : 'Показать все' }}
                    </button>
                </div>
                <div class="catalog-filter__filters-check" v-else-if="filter.type === 'radio'">
                    <v-check
                        v-for="option in filter.items"
                        :id="`${filter.name}-${option.id}`"
                        type="radio"
                        :key="option.id"
                        :name="filter.name"
                        :checked="filterSegments[filter.name] && filterSegments[filter.name][option.code]"
                        @change="onRadioChange($event, `${filter.name}-${option.code}`)"
                    >
                        {{ option.name }}
                    </v-check>
                </div>
            </template>
        </v-accordion>
    </div>
</template>

<script>
import VButton from '@controls/VButton/VButton.vue';
import VRange from '@controls/VRange/VRange.vue';
import VCheck from '@controls/VCheck/VCheck.vue';
import VAccordion from '@controls/VAccordion/VAccordion.vue';
import VLink from '@controls/VLink/VLink.vue';

import { NAME as CATALOG_MODULE, FILTERS, FILTERS_STATE_MAP } from '@store/modules/Catalog';
import { CHANGE_FILTER_STATE } from '@store/modules/Catalog/actions';
import { FILTER_SEGMENTS, ROUTE_SEGMENTS } from '@store/modules/Catalog/getters';

import _debounce from 'lodash/debounce';
import { concatCatalogRoutePath, generateCategoryUrl } from '@util/catalog';
import { mapState, mapGetters, mapActions } from 'vuex';
import './CatalogFilter.css';

export default {
    name: 'catalog-filter',

    components: { VButton, VCheck, VRange, VAccordion, VLink },

    data() {
        return {
            format: {
                // 'to' the formatted value. Receives a number.
                to(value) {
                    return Math.round(value);
                },
                // 'from' the formatted value.
                // Receives a string, should return a number.
                from(value) {
                    return Number(value);
                },
            },
            maxCountFilters: 8,
        };
    },

    computed: {
        ...mapGetters(CATALOG_MODULE, [FILTER_SEGMENTS, ROUTE_SEGMENTS]),
        ...mapState(CATALOG_MODULE, [FILTERS, FILTERS_STATE_MAP]),
        ...mapState('route', {
            type: state => state.params.type,
            code: state => state.params.code,
            entityCode: state => state.params.entityCode,
        }),

        accordionFilters() {
            const filters = this[FILTERS] || [];
            const map = this[FILTERS_STATE_MAP] || {};

            return filters.map(f => {
                const isOverflow = f.items ? f.items.length > this.maxCountFilters : false;
                const isExpanded = map[f.name]['isExpanded'];
                const showMore = map[f.name]['showMore'];
                const items = isOverflow && !showMore ? [...f.items.slice(0, this.maxCountFilters)] : f.items;

                return {
                    ...f,
                    items,
                    isExpanded,
                    isOverflow,
                    showMore,
                };
            });
        },
    },

    watch: {
        sortValue(value, oldValue) {
            if (value !== oldValue) {
                this.$router.replace({
                    path: this.$route.path,
                    query: {
                        orderField: value.field,
                        orderDirection: value.direction,
                        search_string: this.$route.query.search_string,
                    },
                });
            }
        },
    },

    methods: {
        ...mapActions(CATALOG_MODULE, [CHANGE_FILTER_STATE]),

        onRadioChange(e, value) {
            const { type, entityCode, code, routeSegments } = this;

            if (!routeSegments.includes(value)) routeSegments.push(value);
            routeSegments = routeSegments.filter(s => s === value);

            const path = concatCatalogRoutePath(type, entityCode, code, routeSegments);
            this.$router.replace({ path, query: { search_string: this.$route.query.search_string } });
        },

        onCheckChange(e, value) {
            const { type, entityCode, code, routeSegments } = this;

            if (e) {
                if (routeSegments.includes(value)) return;
                else routeSegments.push(value);
            } else {
                if (!routeSegments.includes(value)) return;
                else {
                    const index = routeSegments.indexOf(value);
                    if (index !== -1) routeSegments.splice(index, 1);
                }
            }

            const path = concatCatalogRoutePath(type, entityCode, code, routeSegments);
            this.$router.replace({ path, query: { search_string: this.$route.query.search_string } });
        },

        onShowMoreClick({ name }) {
            const map = this[FILTERS_STATE_MAP] || {};
            this[CHANGE_FILTER_STATE]({ name, value: { ...map[name], showMore: !map[name].showMore } });
        },

        onIsExpandedClick({ name }) {
            const map = this[FILTERS_STATE_MAP] || {};
            this[CHANGE_FILTER_STATE]({ name, value: { ...map[name], isExpanded: !map[name].isExpanded } });
        },

        onRangeChange(e, name) {
            this.debounce_rangeChange(e, name);
        },
    },

    beforeMount() {
        this.debounce_rangeChange = _debounce((e, name) => {
            const { type, entityCode, code, routeSegments } = this;
            const segment = `${name}-from_${e[0]}_to_${e[1]}`;
            const rangeRegex = new RegExp(`^${name}-`);

            let currentIndex = -1;
            for (let i = 0; i < routeSegments.length; i++) {
                if (routeSegments[i].match(rangeRegex)) {
                    currentIndex = i;
                    break;
                }
            }

            if (currentIndex !== -1) {
                if (routeSegments[currentIndex] === segment) return;
                routeSegments.splice(currentIndex, 1, segment);
            } else routeSegments.push(segment);

            const path = concatCatalogRoutePath(type, entityCode, code, routeSegments);
            this.$router.replace({
                path,
                query: {
                    search_string: this.$route.query.search_string,
                },
            });
        }, 500);
    },
};
</script>
