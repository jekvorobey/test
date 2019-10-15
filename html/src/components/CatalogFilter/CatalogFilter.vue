<template>
    <div class="catalog-filter">
        <ul class="catalog-filter__categories">
            <category-tree-item
                class="catalog-filter__categories-item"
                :item="category"
                v-for="(category, index) in categories"
                :key="category.id || index"
            />
        </ul>
        <v-accordion
            class="catalog-filter__filters"
            key-value="id"
            :items="filters"
            :item-expanded="item => item.isExpanded"
            :item-toggled="item => (item.isExpanded = !item.isExpanded)"
        >
            <template v-slot:content="{ item }">
                <div class="catalog-filter__filters-range" v-if="item.type === 'range'">
                    <v-range
                        :initialValue="[item.min, item.max]"
                        :value="filterSegments[item.name] || [item.min, item.max]"
                        :max="item.max"
                        :min="item.min"
                        :format="format"
                        @input="onRangeChange($event, item.name)"
                    />
                </div>
                <div class="catalog-filter__filters-check" v-else-if="item.type === 'check'">
                    <v-check
                        v-for="option in item.items"
                        :id="`${item.name}-${option.id}`"
                        :value="option.code"
                        :key="option.id"
                        :name="item.name"
                        :checked="filterSegments[item.name] && filterSegments[item.name][option.code]"
                        @change="onCheckChange($event, item.name, option.code)"
                    >
                        {{ option.name }}
                    </v-check>
                </div>
                <div class="catalog-filter__filters-check" v-else-if="item.type === 'radio'">
                    <v-check
                        v-for="option in item.items"
                        :id="`${item.name}-${option.id}`"
                        type="radio"
                        :value="option.code"
                        :key="option.id"
                        :name="item.name"
                        :checked="filterSegments[item.name] && filterSegments[item.name][option.code]"
                        @change="onRadioChange($event, item.name, option.code)"
                    >
                        {{ option.name }}
                    </v-check>
                </div>
            </template>
        </v-accordion>
        <v-button class="btn--outline catalog-filter__clear-btn" :to="{ path: code ? `/catalog/${code}` : '/' }">
            Очистить фильтры
        </v-button>
    </div>
</template>

<script>
import VButton from '../controls/VButton/VButton.vue';
import VRange from '../controls/VRange/VRange.vue';
import VCheck from '../controls/VCheck/VCheck.vue';
import VAccordion from '../controls/VAccordion/VAccordion.vue';
import CategoryTreeItem from './CategoryTreeItem/CategoryTreeItem.vue';

import _debounce from 'lodash/debounce';
import { mapState, mapGetters } from 'vuex';
import './CatalogFilter.css';

export default {
    name: 'catalog-filter',

    components: { VButton, VCheck, VRange, VAccordion, CategoryTreeItem },

    props: {},

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

    methods: {
        onRadioChange(e, name, value) {
            let { path } = this.$route;
            let segments = path.split('/').slice(4);
            if (!segments.includes(value)) segments.push(value);
            const radioRegexp = new RegExp(`^${name}-`);
            segments = segments.filter(s => s === value || !s.match(radioRegexp));

            const basePath = segments.length > 0 ? `/catalog/${this.code}/filters` : `/catalog/${this.code}`;
            this.$router.replace({ path: basePath.concat(...segments.map(s => `/${s}`)) });
        },

        onCheckChange(e, name, value) {
            let { path } = this.$route;
            const segments = path.split('/').slice(4);

            if (e) {
                if (segments.includes(value)) return;
                else segments.push(value);
            } else {
                if (!segments.includes(value)) return;
                else {
                    const index = segments.indexOf(value);
                    if (index !== -1) segments.splice(index, 1);
                }
            }

            const basePath = segments.length > 0 ? `/catalog/${this.code}/filters` : `/catalog/${this.code}`;
            this.$router.replace({ path: basePath.concat(...segments.map(s => `/${s}`)) });
        },

        onRangeChange(e, name) {
            this.debounce_rangeChange(e, name);
        },
    },

    computed: {
        ...mapGetters('catalog', ['filterSegments']),
        ...mapState('catalog', ['categories', 'filters']),
        ...mapState('route', {
            code: state => state.params.code,
        }),
    },

    beforeMount() {
        this.debounce_rangeChange = _debounce((e, name) => {
            let { path } = this.$route;
            const segments = path.split('/').slice(4);
            const segment = `${name}-from_${e[0]}_to_${e[1]}`;
            const rangeRegex = new RegExp(`^${name}-`);

            let currentIndex = -1;
            for (let i = 0; i < segments.length; i++) {
                if (segments[i].match(rangeRegex)) {
                    currentIndex = i;
                    break;
                }
            }

            if (currentIndex !== -1) {
                if (segments[currentIndex] === segment) return;
                segments.splice(currentIndex, 1, segment);
            } else segments.push(segment);

            const basePath = segments.length > 0 ? `/catalog/${this.code}/filters` : `/catalog/${this.code}`;
            this.$router.replace({ path: basePath.concat(...segments.map(s => `/${s}`)) });
        }, 500);
    },
};
</script>

