<template>
    <div class="links-switch">
        <div
            class="links-switch__link"
            :class="{ 'links-switch__link--checked': item.code === internalValue }"
            v-for="(item, index) in items"
            :id="`links-switch-${id}-${index}`"
            :key="item[keyField]"
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
import './LinksSwitch.css';

export default {
    name: 'links-switch',

    components: {
        VLink,
    },

    props: {
        id: {
            type: [String, Number],
        },

        keyField: {
            type: String,
            default: 'value',
        },

        value: {
            type: [String, Number, Boolean],
        },

        name: {
            type: String,
            default: 'links-switch',
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
            const { filters } = this.linkSegments;
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
