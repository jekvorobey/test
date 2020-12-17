<template>
    <button
        class="card-design-tag"
        :class="[{ ['card-design-tag--selected']: selected }, { ['card-design-tag--light']: isLightColor }]"
        :disabled="disabled"
        :style="buttonStyle"
        v-on="$listeners"
    >
        <div class="card-design-tag__square" :style="innerStyle" />
    </button>
</template>

<script>
import { isLightColor } from '@util';
import './CardDesignTag.css';

export default {
    name: 'card-design-tag',

    props: {
        preview: {
            type: String,
        },

        selected: {
            type: Boolean,
            default: false,
        },

        disabled: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        innerColor() {
            const { color } = this;
            return `#${color}`;
        },

        innerStyle() {
            const { preview } = this;
            return {
                backgroundImage: 'url(' + preview + ')',
            };
        },

        buttonStyle() {
            const { innerColor, selected } = this;
            return {
                borderColor: selected ? innerColor : null,
            };
        },

        isLightColor() {
            const { innerColor } = this;
            return isLightColor(innerColor);
        },
    },
};
</script>
