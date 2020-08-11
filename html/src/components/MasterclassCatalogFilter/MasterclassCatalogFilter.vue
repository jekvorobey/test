<template>
    <div class="masterclass-catalog-filter">
        <div class="container masterclass-catalog-filter__filters">
            <v-select
                class="masterclass-catalog-filter__select"
                v-for="filter in filters"
                v-bind="selectOptions"
                :value="selectedValueMap[filter.name] || filter.items[0]"
                :key="filter.id"
                :options="filter.items"
                :placeholder="filter.title"
                @input="
                    onChangeFilter(
                        filter,
                        $event && $event.code,
                        selectedValueMap[filter.name] && selectedValueMap[filter.name].code
                    )
                "
            >
                {{ filter.title }}
            </v-select>
        </div>
    </div>
</template>

<script>
import VSelect from '@controls/VSelect/VSelect.vue';

import { mapGetters } from 'vuex';

import { NAME as MASTERCLASSES_MODULE } from '@store/modules/Masterclass';
import { ROUTE_SEGMENTS, FILTER_SEGMENTS, NULLABLE_FILTERS, ACTIVE_TAGS } from '@store/modules/Masterclass/getters';

import { concatMasterclassesRoutePath } from '@util/catalog';
import './MasterclassCatalogFilter.css';

export default {
    name: 'masterclass-catalog-filter',

    components: {
        VSelect,
    },

    computed: {
        ...mapGetters(MASTERCLASSES_MODULE, [ROUTE_SEGMENTS, FILTER_SEGMENTS, NULLABLE_FILTERS]),

        selectOptions() {
            return {
                trackBy: 'id',
                label: 'name',
                searchable: false,
                allowEmpty: false,
                showLabels: false,
                maxHeight: 160,
            };
        },

        filters() {
            return this[NULLABLE_FILTERS] || [];
        },

        selectedValueMap() {
            const { filterSegments } = this;
            const map = {};

            for (const key in filterSegments) {
                const filter = this[NULLABLE_FILTERS].find(f => f.name === key);
                const keys = Object.keys(filterSegments[key]);
                map[key] = filter.items.find(i => i.code === filterSegments[key][keys[0]]) || filter.items[0];
            }
            return map;
        },
    },

    methods: {
        onChangeFilter(filter, value, oldValue) {
            const { routeSegments } = this;

            const oldSegment = `${filter.name}-${oldValue}`;
            const newSegment = `${filter.name}-${value}`;

            if (oldValue && routeSegments.includes(oldSegment)) {
                const index = routeSegments.indexOf(oldSegment);
                routeSegments.splice(index, 1);
            }

            if (value && !routeSegments.includes(newSegment)) {
                routeSegments.push(newSegment);
            }

            const path = concatMasterclassesRoutePath(routeSegments);
            this.$router.replace({ path });
        },
    },
};
</script>
