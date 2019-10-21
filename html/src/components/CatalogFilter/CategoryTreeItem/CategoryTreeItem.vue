<template>
    <li
        class="category-tree-item"
        :class="[{ 'category-tree-item--root': depth === 0 }, { 'category-tree-item--active': isActive }]"
    >
        <div class="category-tree-item__label">
            <router-link
                v-if="item.code !== undefined"
                :to="url"
                class="category-tree-item__link"
                :exact="item.code === ''"
            >
                {{ item.name }}
            </router-link>
            <span v-else class="category-tree-item__link">
                {{ item.name }}
            </span>
        </div>
        <ul class="category-tree-item__list" v-if="hasChildren" v-show="isOpen">
            <category-tree-item
                class="category-tree-item__item"
                v-for="(item, index) in item.items"
                :key="item.id || index"
                :item="item"
                :depth="depth + 1"
            />
        </ul>
    </li>
</template>

<script>
import './CategoryTreeItem.css';
import { ACTIVE_CATEGORIES } from '../../../store/modules/Catalog/getters';
import { mapGetters } from 'vuex';

export default {
    name: 'category-tree-item',
    components: {},
    props: {
        item: {
            type: Object,
            required: true,
        },

        depth: {
            type: Number,
            default: 0,
        },
    },

    data() {
        return {
            isOpen: true,
        };
    },

    computed: {
        ...mapGetters('catalog', [ACTIVE_CATEGORIES]),

        isActive() {
            return this[ACTIVE_CATEGORIES].includes(this.item);
        },

        url() {
            return this.item.code ? `/catalog/${this.item.code}` : '/catalog';
        },

        hasChildren() {
            return this.item && Array.isArray(this.item.items);
        },
    },
};
</script>

