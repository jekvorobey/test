<template>
    <li
        class="category-tree-item"
        :class="[
            { 'category-tree-item--root': depth === 0 },
            { 'category-tree-item--active': isInteractive && isActive },
            { 'category-tree-item--disabled': !isInteractive },
        ]"
        @mouseover="depth > 0 ? onMouseOver(true) : ''"
        @mouseleave="depth > 0 ? onMouseOver(false) : ''"
    >
        <div class="category-tree-item__label">
            <self-router-link class="category-tree-item__link" :to="url" :disabled="!isInteractive" same-disabled>
                {{ item.name }}
            </self-router-link>
        </div>
        <transition name="slide-right">
            <ul class="category-tree-item__list" v-if="hasChildren && (!isInteractive || isHover || isActive)">
                <category-tree-item
                    class="category-tree-item__item"
                    v-for="(item, index) in item.items"
                    :key="item.id || index"
                    :item="item"
                    :depth="depth + 1"
                    :isHover="false"
                />
            </ul>
        </transition>
    </li>
</template>

<script>
import SelfRouterLink from '@controls/VLink/SelfRouterLink.vue';

import { mapState, mapGetters } from 'vuex';
import { NAME as CATALOG_MODULE } from '@store/modules/Catalog';
import { ROOT_CATEGORY, ACTIVE_CATEGORIES } from '@store/modules/Catalog/getters';

import { generateCategoryUrl } from '@util/catalog';
import './CategoryTreeItem.css';

export default {
    name: 'category-tree-item',

    components: {
        SelfRouterLink,
    },

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

        isHover: {
            type: Boolean,
            default: true
        },
    },

    data() {
        return {
            timer: null,
        };
    },

    computed: {
        ...mapState('route', {
            type: (state) => state.params.type,
            entityCode: (state) => state.params.entityCode,
        }),
        ...mapGetters(CATALOG_MODULE, [ROOT_CATEGORY, ACTIVE_CATEGORIES]),

        isActive() {
            const activeCategories = this[ACTIVE_CATEGORIES] || [];
            return activeCategories.some((c) => c.code === this.item.code);
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
                item: { disabled },
            } = this;
            return !disabled;
        },

        url() {
            const {
                entityCode,
                type,
                item: { code },
                isRoot,
                rootCategory,
            } = this;

            const query = { ...this.$route.query };
            delete query.page;

            return {
                path: generateCategoryUrl(type, entityCode, rootCategory ? !isRoot && code : code),
                query,
            };
        },

        hasChildren() {
            const {
                item: { items },
            } = this;
            return Array.isArray(items);
        },
    },

    methods: {
        onMouseOver(value, oldValue) {
            if (value !== oldValue) {
                if (value) {
                    clearTimeout(this.timer);
                    this.timer = setTimeout(() => {
                        this.changeHover(true);
                    }, 600);
                } else {
                    clearTimeout(this.timer);
                    this.timer = null;
                    this.changeHover(false);
                }
            }
        },

        changeHover(flag) {
            // eslint-disable-next-line vue/no-mutating-props
            this.isHover = flag;
        }
    },
};
</script>
