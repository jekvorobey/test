<template>
    <button class="v-burger" :class="{ 'is-open': isOpen }" @click="onClick">
        <div class="v-burger__line" />
        <span v-if="btnText" class="v-burger__btn-text">{{ btnText }}</span>
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

        btnText: {
            type: String,
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
