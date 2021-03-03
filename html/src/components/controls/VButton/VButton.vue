<template>
    <a class="btn" v-if="href" :href="href" v-on="handlers">
        <slot />
    </a>
    <router-link class="btn" v-else-if="to" :to="to" v-on="handlers">
        <slot />
    </router-link>
    <button class="btn" v-else :type="type" v-on="handlers">
        <slot />
    </button>
</template>

<script>
// import './VButton.css';

const types = ['button', 'reset', 'submit'];

/**
 * Базовый класс для кнопки, поддерживает SVG
 */
export default {
    name: 'v-button',

    props: {
        type: {
            type: String,
            default: 'button',
            validator(value) {
                return types.indexOf(value) !== -1;
            },
        },

        href: {
            type: String,
        },

        to: {
            type: [String, Object],
        },
    },

    computed: {
        handlers() {
            const keys = Object.keys(this.$listeners);
            const handlers = {};
            keys.forEach((k) => (handlers[k] = (e) => this.$emit(k, e)));
            return handlers;
        },
    },
};
</script>
