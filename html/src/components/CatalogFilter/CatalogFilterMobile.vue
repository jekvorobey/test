<template>
    <div v-if="accordionFilters && accordionFilters.length > 0" class="catalog-filter">
        <v-accordion
            class="catalog-filter__filters"
            key-field="id"
            :items="accordionFilters"
            :item-show-header="(item) => !!item.title"
            :item-expanded="(item) => item.isExpanded"
            :item-toggled="(item) => onIsExpandedClick(item.id)"
        >
            <template v-slot:content="{ item: filter }">
                <div class="catalog-filter__filters-range" v-if="filter.item.type === 'range'">
                    <v-range
                        :key="`${filter.item.min}-${filter.item.max}`"
                        :initialValue="[filter.item.min, filter.item.max]"
                        :value="filterSegments[filter.item.name] || [filter.item.min, filter.item.max]"
                        :max="filter.item.max"
                        :min="filter.item.min"
                        :format="format"
                        @input="onRangeChange($event, filter.item.name)"
                    />
                </div>
                <div
                    class="catalog-filter__filters-check"
                    v-else-if="filter.item.type === 'check'"
                    :ref="'check' + filter.item.id"
                >
                    <v-check
                        v-for="option in (filter.showMore ? filter.item.items.filter((i, key) => key < maxCountFilters) : filter.item.items)"
                        :id="`${filter.item.name}-${option.id}`"
                        :key="option.id"
                        :name="filter.item.name"
                        :checked="filterSegments[filter.item.name] && filterSegments[filter.item.name][option.code]"
                        :disabled="!!option.disabled"
                        @change="onCheckChange($event, `${filter.item.name}-${option.code}`)"
                    >
                        {{ option.name }}
                    </v-check>
                    <button
                        class="catalog-filter__filters-more"
                        @click="() => onShowMoreClick(filter.item.id)"
                        v-if="filter.moreMax"
                    >
                        {{ filter.showMore ? 'Показать все' : 'Свернуть' }}
                    </button>
                </div>
                <div class="catalog-filter__filters-check" v-else-if="filter.item.type === 'radio'">
                    <v-check
                        v-for="option in filter.item.items"
                        :id="`${filter.item.name}-${option.id}`"
                        type="radio"
                        :key="option.id"
                        :name="filter.item.name"
                        :checked="filterSegments[filter.item.name] && filterSegments[filter.item.name][option.code]"
                        @change="onRadioChange($event, `${filter.item.name}-${option.code}`)"
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

import { NAME as CATALOG_MODULE, FILTERS } from '@store/modules/Catalog';
import { FILTER_SEGMENTS, ROUTE_SEGMENTS } from '@store/modules/Catalog/getters';

import _debounce from 'lodash/debounce';
import { generateCategoryUrl, mapFilterSegments, concatCatalogSegments } from '@util/catalog';
import { mapState, mapGetters } from 'vuex';
import './CatalogFilter.css';
import { sortFields } from '../../assets/scripts/enums/catalog';
import { sortDirections } from '../../assets/scripts/enums';

export default {
    name: 'catalog-filter-mobile',

    components: {
        VButton,
        VCheck,
        VRange,
        VAccordion,
        VLink,
    },

    props: {
        value: {
            type: Array,
            default() {
                return [];
            },
        },
    },

    data() {
        return {
            routeString: null,

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
            showMore: [],
            isExpanded: [],
        };
    },

    computed: {
        ...mapState(CATALOG_MODULE, [FILTERS]),
        ...mapState('route', {
            pathMatch: state => state.params.pathMatch,
        }),

        routeSegments() {
            const { routeString } = this;
            return routeString ? routeString.split('/') : [];
        },

        filterSegments() {
            const { routeSegments } = this;
            return mapFilterSegments(routeSegments);
        },

        accordionFilters() {
            const filters = this[FILTERS] || [];
            return this.filters.map((f, key) => ({
                id: f.id,
                item: f,
                title: f.title,
                isExpanded: this.isExpanded.find(({ id }) => id === f.id).state,
                showMore: this.showMore.find(({ id }) => id === f.id).state,
                moreMax: f.items ? f.items.length >= this.maxCountFilters : false,
            }));
        },
    },

    watch: {
        pathMatch(value) {
            this.routeString = value;
        },

        routeSegments(value) {
            this.$emit('input', value);
        },

        filters() {
            this.initFiltersOptions();
        },

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
        initFiltersOptions() {
            this.showMore = [
                ...this.filters.map(({ type, items, id }) => {
                    return {
                        id,
                        state: type === 'check' && items && items.length >= this.maxCountFilters ? true : false,
                    };
                }),
            ];
            this.isExpanded = [
                ...this.filters.map(({ id }) => {
                    return {
                        id,
                        state: true,
                    };
                }),
            ];
            this.isExpanded.forEach(({ id }) => {
                if (this.$refs['check' + id]) {
                    const el = this.$refs['check' + id].parentNode;
                    el.removeAttribute('style');
                }
            });
        },

        onRadioChange(e, value) {
            const { type, entityCode, code, routeSegments } = this;

            if (!routeSegments.includes(value)) routeSegments.push(value);
            routeSegments = routeSegments.filter(s => s === value);

            this.routeString = concatCatalogSegments(routeSegments);
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

            this.routeString = concatCatalogSegments(routeSegments);
        },

        onShowMoreClick(id) {
            const moreIndex = this.showMore.findIndex(el => el.id === id);
            const moreItem = this.showMore.find(el => el.id === id);
            this.showMore.splice(moreIndex, 1, {
                ...moreItem,
                state: !moreItem.state,
            });

            const el = this.$refs['check' + id].parentNode;
            el.removeAttribute('style');
        },

        onIsExpandedClick(id) {
            const moreIndex = this.isExpanded.findIndex(el => el.id === id);
            const moreItem = this.isExpanded.find(el => el.id === id);
            this.isExpanded.splice(moreIndex, 1, {
                ...moreItem,
                state: !moreItem.state,
            });
        },

        onRangeChange(e, name) {
            this.debounce_rangeChange(e, name);
        },
    },

    created() {
        this.routeString = this.pathMatch;
        this.initFiltersOptions();
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

            this.routeString = concatCatalogSegments(routeSegments);
        }, 500);
    },
};
</script>
