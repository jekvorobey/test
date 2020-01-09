<template>
    <li
        class="category-tree-item"
        :class="[{ 'category-tree-item--root': depth === 0 }, { 'category-tree-item--active': isActive }]"
        @mouseover="onMouseOver(true)"
        @mouseleave="onMouseOver(false)"
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
        <transition name="slide-right">
            <ul class="category-tree-item__list" v-if="hasChildren && (isHover || isActive)">
                <category-tree-item
                    class="category-tree-item__item"
                    v-for="(item, index) in item.items"
                    :key="item.id || index"
                    :item="item"
                    :depth="depth + 1"
                />
            </ul>
        </transition>
    </li>
</template>

<script>
import { NAME as CATALOG_MODULE } from '../../store/modules/Catalog';
import { ACTIVE_CATEGORIES } from '../../store/modules/Catalog/getters';
import { mapState, mapGetters } from 'vuex';
import { generateCategoryUrl } from '../../util/catalog';

import './CategoryTreeItem.css';

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
            isHover: false,
        };
    },

    computed: {
        ...mapGetters(CATALOG_MODULE, [ACTIVE_CATEGORIES]),
        ...mapState('route', {
            brandCode: state => state.params.brandCode,
        }),

        isActive() {
            return this[ACTIVE_CATEGORIES].includes(this.item);
        },

        url() {
            const { brandCode } = this;
            return this.item && { path: generateCategoryUrl(brandCode, this.item.code) };
        },

        hasChildren() {
            return this.item && Array.isArray(this.item.items);
        },
    },

    methods: {
        onMouseOver(value) {
            this.isHover = value;
        },
    },
};
</script>
