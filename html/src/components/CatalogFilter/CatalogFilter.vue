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
    </div>
</template>

<script>
import CategoryTreeItem from './CategoryTreeItem/CategoryTreeItem.vue';

import './CatalogFilter.css';
import { mapState } from 'vuex';

export default {
    name: 'catalog-filter',

    components: { CategoryTreeItem },

    props: {},

    computed: {
        ...mapState('catalog', ['categories']),
    },
};
</script>

