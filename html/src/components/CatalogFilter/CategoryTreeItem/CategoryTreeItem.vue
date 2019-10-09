<template>
    <li class="category-tree-item">
        <div class="category-tree-item__label">
            <router-link
                v-if="item.code"
                :to="url"
                class="category-tree-item__link"
                :class="{ 'category-tree-item__link--active': isActive }"
            >
                {{ item.name }}
            </router-link>
            <span v-else class="category-tree-item__link" :class="{ 'category-tree-item__link--active': isActive }">
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

function isActive(code, item) {
    return item.code === code || (Array.isArray(item.items) && item.items.some(i => isActive(code, i)));
}

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
        isActive() {
            return isActive(this.$route.params.code, this.item);
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

