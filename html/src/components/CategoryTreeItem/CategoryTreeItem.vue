<template>
    <li
        class="category-tree-item"
        :class="[{ 'category-tree-item--root': depth === 0 }, { 'category-tree-item--active': isActive }]"
        @mouseover="onMouseOver(true)"
        @mouseleave="onMouseOver(false)"
    >
        <div class="category-tree-item__label">
            <router-link v-if="isInteractive" :to="url" class="category-tree-item__link" :exact="item.code === ''">
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
                    :disabled="!isInteractive"
                />
            </ul>
        </transition>
    </li>
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import { NAME as CATALOG_MODULE } from '@store/modules/Catalog';
import { ROOT_CATEGORY, ACTIVE_CATEGORIES } from '@store/modules/Catalog/getters';

import { generateCategoryUrl } from '@util/catalog';
import './CategoryTreeItem.css';

export default {
    name: 'category-tree-item',

    props: {
        item: {
            type: Object,
            required: true,
        },

        depth: {
            type: Number,
            default: 0,
        },

        disabled: {
            type: Boolean,
            default: true,
        },
    },

    data() {
        return {
            isHover: false,
            timer: null,
        };
    },

    computed: {
        ...mapState('route', {
            type: state => state.params.type,
            entityCode: state => state.params.entityCode,
        }),
        ...mapGetters(CATALOG_MODULE, [ROOT_CATEGORY, ACTIVE_CATEGORIES]),

        isActive() {
            const activeCategories = this[ACTIVE_CATEGORIES] || [];
            return activeCategories.some(c => c.code === this.item.code);
        },

        isRoot() {
            const {
                item: { code },
                depth,
                rootCategory,
            } = this;

            return rootCategory ? code === rootCategory.code : depth === 0;
        },

        isInteractive() {
            const {
                type,
                item: { code },
                rootCategory,
                isRoot,
                disabled,
            } = this;

            return rootCategory ? code && (isRoot || !disabled) : code;
        },

        url() {
            const {
                entityCode,
                type,
                item: { code },
                isRoot,
                disabled,
                rootCategory,
            } = this;

            return {
                path: generateCategoryUrl(type, entityCode, rootCategory ? !isRoot && code : code),
                query: { ...this.$route.query, page: undefined },
            };
        },

        hasChildren() {
            const {
                entityCode,
                type,
                item: { items },
            } = this;
            return Array.isArray(this.item.items);
        },
    },

    methods: {
        onMouseOver(value, oldValue) {
            if (value !== oldValue) {
                if (value) {
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        this.isHover = true;
                    }, 600);
                } else {
                    clearTimeout(this.timer);
                    this.timer = null;
                    this.isHover = false;
                }
            }
        },
    },
};
</script>
