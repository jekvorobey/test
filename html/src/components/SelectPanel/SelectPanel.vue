<template>
    <div class="select-panel">
        <v-check
            class="select-panel__radio"
            type="radio"
            v-for="(item, index) in items"
            v-model="internalValue"
            :id="`select-panel-${id}-${index}`"
            :key="item.value"
            :value="item.value"
            :name="name"
        >
            <slot name="content" :item="item" :index="index">
                {{ item.title }}
            </slot>
        </v-check>
    </div>
</template>

<script>
import VCheck from '@controls/VCheck/VCheck.vue';
import './SelectPanel.css';

export default {
    name: 'select-panel',

    components: {
        VCheck,
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
    },

    data() {
        return {
            internalValue: this.value,
        };
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
