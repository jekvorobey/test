<template>
    <div v-if="accordionFilters && accordionFilters.length > 0" class="catalog-filter">
        <v-accordion
            class="catalog-filter__filters"
            key-field="id"
            :items="accordionFilters"
            :item-expanded="item => item.isExpanded"
            :item-toggled="item => (item.isExpanded = !!!item.isExpanded)"
        >
            <template v-slot:content="{ item: filter }">
                <div class="catalog-filter__filters-range" v-if="filter.item.type === 'range'">
                    <v-range
                        :initialValue="[filter.item.min, filter.item.max]"
                        :value="filterSegments[filter.item.name] || [filter.item.min, filter.item.max]"
                        :max="filter.item.max"
                        :min="filter.item.min"
                        :format="format"
                        @input="onRangeChange($event, filter.item.name)"
                    />
                </div>
                <div class="catalog-filter__filters-check" v-else-if="filter.item.type === 'check'">
                    <v-check
                        v-for="option in filter.item.items"
                        :id="`${filter.item.name}-${option.id}`"
                        :key="option.id"
                        :name="filter.item.name"
                        :checked="filterSegments[filter.item.name] && filterSegments[filter.item.name][option.code]"
                        @change="onCheckChange($event, `${filter.item.name}-${option.code}`)"
                    >
                        {{ option.name }}
                    </v-check>
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
        <v-button class="btn--outline catalog-filter__clear-btn" :to="clearFilterUrl" replace>
            {{ btnText }}
        </v-button>
    </div>
</template>

<script>
import VButton from '../controls/VButton/VButton.vue';
import VRange from '../controls/VRange/VRange.vue';
import VCheck from '../controls/VCheck/VCheck.vue';
import VAccordion from '../controls/VAccordion/VAccordion.vue';

import { NAME as CATALOG_MODULE, FILTERS } from '../../store/modules/Catalog';
import { FILTER_SEGMENTS, ROUTE_SEGMENTS } from '../../store/modules/Catalog/getters';

import _debounce from 'lodash/debounce';
import { concatCatalogRoutePath, concatBrandRoutePath } from '../../util/catalog';
import { mapState, mapGetters } from 'vuex';
import './CatalogFilter.css';

export default {
    name: 'catalog-filter',

    components: { VButton, VCheck, VRange, VAccordion },

    props: {
        btnText: {
            type: String,
            default: 'Очистить фильтры',
        },
    },

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
        };
    },

    computed: {
        ...mapGetters(CATALOG_MODULE, [FILTER_SEGMENTS, ROUTE_SEGMENTS]),
        ...mapState(CATALOG_MODULE, [FILTERS]),
        ...mapState('route', {
            code: state => state.params.code,
            brandCode: state => state.params.brandCode,
        }),

        accordionFilters() {
            return this.filters
                ? this.filters.map(f => {
                      return { id: f.id, item: f, title: f.title, isExpanded: true };
                  })
                : [];
        },

        clearFilterUrl() {
            const { code, brandCode } = this;
            if (brandCode) return { path: code ? `/brand/${brandCode}/${code}` : `/brand/${brandCode}` };
            return { path: code ? `/catalog/${code}` : '/catalog' };
        },
    },

    methods: {
        onRadioChange(e, value) {
            let { routeSegments, code, brandCode } = this;

            if (!routeSegments.includes(value)) routeSegments.push(value);
            routeSegments = routeSegments.filter(s => s === value);

            const path = brandCode
                ? concatBrandRoutePath(brandCode, code, routeSegments)
                : concatCatalogRoutePath(code, routeSegments);

            this.$router.replace({ path });
        },

        onCheckChange(e, value) {
            let { routeSegments, code, brandCode } = this;

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

            const path = brandCode
                ? concatBrandRoutePath(brandCode, code, routeSegments)
                : concatCatalogRoutePath(code, routeSegments);

            this.$router.replace({ path });
        },

        onRangeChange(e, name) {
            this.debounce_rangeChange(e, name);
        },
    },

    beforeMount() {
        this.debounce_rangeChange = _debounce((e, name) => {
            let { routeSegments, brandCode, code } = this;
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

            const path = brandCode
                ? concatBrandRoutePath(brandCode, code, routeSegments)
                : concatCatalogRoutePath(code, routeSegments);

            this.$router.replace({ path });
        }, 500);
    },
};
</script>
