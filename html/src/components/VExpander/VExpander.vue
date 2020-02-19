<template>
    <div class="v-expander" :class="[{ 'v-expander--expanded': isExpanded }, { 'v-expander--masked': hasMask }]">
        <div class="v-expander__content" ref="content" :style="{ height: contentHeight }">
            <slot />
        </div>

        <v-link class="v-expander__btn" tag="button" @click="isExpanded = !isExpanded">
            <slot name="btn" :isExpanded="isExpanded">
                {{ isExpanded ? 'Скрыть' : 'Показать' }}
            </slot>
        </v-link>
    </div>
</template>

<script>
import VLink from '../controls/VLink/VLink.vue';

import './VExpander.css';

export default {
    name: 'v-expander',

    components: {
        VLink,
    },

    props: {
        minHeight: {
            type: Number,
            default: 50,
        },

        hasMask: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            isExpanded: false,
            contentHeight: `${this.minHeight}px`,
        };
    },

    watch: {
        isExpanded(value) {
            const { content } = this.$refs;
            this.contentHeight = value ? `${content ? `${content.scrollHeight}px` : 'auto'}` : `${this.minHeight}px`;
        },
    },
};
</script>
