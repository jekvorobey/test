<template>
    <router-link :to="to" :exact="exact" v-slot="{ href, navigate, isActive, isExactActive }">
        <a
            v-bind="$attrs"
            v-if="!isExactActive"
            :class="[{ 'router-link-active': isActive }, { 'router-link-exact-active': isExactActive }]"
            :href="href"
            v-on="{ ...handlers, click: navigate }"
        >
            <slot />
        </a>
        <a
            v-bind="$attrs"
            :class="[{ 'router-link-active': isActive }, { 'router-link-exact-active': isExactActive }]"
            :href="href"
            v-else-if="isExactActive && !sameDisabled && !disabled"
            v-on="{ ...handlers, click: onClick }"
        >
            <slot />
        </a>
        <span
            v-bind="$attrs"
            :class="[{ 'router-link-active': isActive }, { 'router-link-exact-active': isExactActive }]"
            v-else-if="(isExactActive && sameDisabled) || disabled"
        >
            <slot />
        </span>
    </router-link>
</template>

<script>
export default {
    name: 'self-router-link',
    inheritAttrs: false,

    props: {
        to: {
            type: [String, Object],
            default: '/',
        },

        exact: {
            type: Boolean,
            default: false,
        },

        disabled: {
            type: Boolean,
            default: false,
        },

        sameDisabled: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        url() {
            const { $router, to } = this;
            const { href } = $router.resolve(to);
            return href;
        },

        handlers() {
            const keys = Object.keys(this.$listeners);
            const handlers = {};
            keys.forEach((k) => {
                handlers[k] = (e) => this.$emit(k, e);
            });
            return handlers;
        },
    },

    methods: {
        onClick(e) {
            if (!e.shiftKey && !e.ctrlKey) {
                e.preventDefault();
                this.$emit('click', e);
            }
        },
    },
};
</script>
