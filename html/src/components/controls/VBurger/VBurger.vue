<template>
    <button class="v-burger" :class="{ 'is-open': isOpen }" @click="onClick">
        <div class="v-burger__line" />
    </button>
</template>

<script>
import './VBurger.critical.css';

export default {
    name: 'burger',
    props: {
        isOpen: {
            type: Boolean,
        },
    },
    methods: {
        onClick() {
            this.$emit('update:isOpen', !this.isOpen);
            this.$emit('isOpenChanged', !this.isOpen);
        },
    },
};
</script>
