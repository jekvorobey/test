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
                <div v-if="item.type === 'range'">
                    <!-- <v-range
                        :initialValue="[item.min, item.max]"
                        :value="filterSegments[item.name]"
                        :max="item.max"
                        :min="item.min"
                        :format="item.format"
                        @input="onRangeChange($event, item.name)"
                    /> -->
                </div>
                <div v-else-if="item.type === 'check'">
                    <v-check
                        v-for="option in item.items"
                        :id="item.name + option.id"
                        :value="option.code"
                        :key="option.id"
                        :name="item.name"
                        :checked="filterSegments.includes(option.code)"
                        @change="onCheckChange($event, item.name, option.code)"
                    >
                        {{ option.name }}
                    </v-check>
                </div>
            </template>
        </v-accordion>
        <v-button class="btn--outline catalog-filter__clear-btn">Очистить фильтры</v-button>
    </div>
</template>

<script>
import VButton from '../controls/VButton/VButton.vue';
import VCheck from '../controls/VCheck/VCheck.vue';
import VRange from '../controls/VRange/VRange.vue';
import VAccordion from '../controls/VAccordion/VAccordion.vue';
import CategoryTreeItem from './CategoryTreeItem/CategoryTreeItem.vue';

import './CatalogFilter.css';
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'catalog-filter',

    components: { VButton, VCheck, VRange, VAccordion, CategoryTreeItem },

    props: {},

    data() {
        return {};
    },

    methods: {
        onCheckChange(e, name, value) {
            let {
                path,
                params: { pathMatch },
            } = this.$route;
            const filterSegment = 'filters';
            const segments = pathMatch ? pathMatch.split('/') : [];

            if (e) {
                if (segments.includes(value)) return;
                else {
                    if (segments.length === 0) segments.push(filterSegment);
                    segments.push(value);
                }
            } else {
                if (!path.includes(value)) return;
                else {
                    const index = segments.indexOf(value);
                    if (index !== -1) segments.splice(index, 1);
                    if (segments.length === 1) segments.splice(0, 1);
                }
            }

            path = `/catalog/${this.code}`.concat(...segments.map(s => `/${s}`));
            this.$router.replace({ path });
        },

        onRangeChange(e, name) {
            this.values[name] = e;
        },
    },

    computed: {
        ...mapGetters('catalog', ['filterSegments']),
        ...mapState('catalog', ['categories', 'filters']),
        ...mapState('route', {
            code: state => state.params.code,
        }),
    },
};
</script>

