<template>
    <li class="tag-item">
        {{ text }}&nbsp;
        <button class="tag-item__btn" @click="onBtnClick" :disabled="disabled">
            <v-svg name="cross-small" width="10" height="10" />
        </button>
    </li>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';

import '@images/sprites/cross-small.svg';
import './TagItem.css';

export default {
    name: 'tag-item',

    components: {
        VSvg,
    },

    props: {
        text: {
            type: String,
            default: '',
        },

        disabled: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
        onBtnClick() {
            this.$emit('delete');
        },
    },
};
</script>
