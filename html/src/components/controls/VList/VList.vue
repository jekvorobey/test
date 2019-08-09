<template>
    <transition-group v-if="name" class="v-list" :tag="tag" :name="name" :appear="appear">
        <li class="v-list__item" v-for="(item, index) in items" :key="item[keyField] || index">
            <slot name="item" :item="item" :index="index" />
        </li>
    </transition-group>
    <ul v-else-if="tag === 'ul'" class="v-list">
        <li class="v-list__item" v-for="(item, index) in items" :key="item[keyField] || index">
            <slot name="item" :item="item" :index="index" />
        </li>
    </ul>
    <ol v-else-if="tag === 'ol'" class="v-list">
        <li class="v-list__item" v-for="(item, index) in items" :key="item[keyField] || index">
            <slot name="item" :item="item" :index="index" />
        </li>
    </ol>
</template>

<script>
import './VList.css';
const validTags = ['ul', 'ol'];

export default {
    name: 'v-list',
    props: {
        tag: {
            type: String,
            default: 'ul',
            validator(value) {
                return validTags.indexOf(value) !== -1;
            },
        },
        keyField: {
            type: String,
        },
        items: {
            type: Array,
            default: () => [],
        },
        name: {
            type: String,
        },
        appear: {
            type: Boolean,
            default: false,
        },
    },
};
</script>
