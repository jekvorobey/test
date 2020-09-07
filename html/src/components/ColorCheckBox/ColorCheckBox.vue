<template>
    <v-check class="color-check-box" v-bind="$attrs" v-on="$listeners" :name="name">
        <div class="color-check-box__square" :style="innerStyle" :title="title" />
    </v-check>
</template>

<script>
import VCheck from '@controls/VCheck/VCheck.vue';
import './ColorCheckBox.css';

export default {
    name: 'color-check-box',
    inheritAttrs: false,

    components: {
        VCheck,
    },

    props: {
        title: {
            type: String,
        },

        name: {
            type: String,
            default: 'color',
        },

        color: {
            type: String,
        },

        disabled: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        innerStyle() {
            const { color, disabled } = this;

            return {
                // backgroundColor: disabled ? 'lightgrey' : `#${color}`,
                backgroundColor: `#${color}`,
            };
        },
    },
};
</script>
