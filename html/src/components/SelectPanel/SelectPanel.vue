<template>
    <div class="select-panel">
        <div
            class="select-panel__link"
            :class="{ 'select-panel__link--checked': item.code === internalValue }"
            v-for="(item, index) in items"
            :id="`select-panel-${id}-${index}`"
            :key="item.code"
        >
            <v-link :to="generateHref(item.code)" @click.stop.prevent="onSelect(item.code)">
                <slot name="content" :item="item" :index="index">
                    {{ item.title }}
                </slot>
            </v-link>
        </div>
    </div>
</template>

<script>
import VLink from '@controls/VLink/VLink.vue';
import './SelectPanel.css';

export default {
    name: 'select-panel',

    components: {
        VLink,
    },

    props: {
        id: {
            type: [String, Number],
        },

        value: {
            type: [String, Number, Boolean],
        },

        name: {
            type: String,
            default: 'select-panel',
            required: true,
        },

        items: {
            type: Array,
            default() {
                return [];
            },
        },

        linkSegments: {
            type: Object,
            default() {
                return {};
            },
        },
    },

    data() {
        return {
            internalValue: this.value,
        };
    },

    methods: {
        onSelect(newValue) {
            this.internalValue = newValue;
        },

        generateHref(value) {
            const { noFilters, filters } = this.linkSegments;
            if (!value) return noFilters ? noFilters : '';
            return filters ? filters + `${value}/` : '';
        },
    },

    watch: {
        internalValue(value) {
            this.$emit('input', value);
        },

        value(value) {
            this.internalValue = value;
        },
    },
};
</script>
