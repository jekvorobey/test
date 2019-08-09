<template>
    <div ref="ratingEl" class="vue-stars" :class="{ readonly: readonly, notouch: notouch }" :style="mapCssProps">
        <input :id="`vue-stars-${_uid}-0`" type="radio" :checked="valueInt === 0" :name="name" value="0" />
        <span :key="x" v-for="x in max">
            <label :for="`vue-stars-${_uid}-${x}`">
                <span v-if="valueInt >= x">
                    <slot name="activeLabel">{{ getActiveLabel(x) }}</slot>
                </span>
                <span v-if="valueInt < x">
                    <slot name="inactiveLabel">{{ getInactiveLabel(x) }}</slot>
                </span>
            </label>
            <input
                v-if="!readonly"
                ref="input"
                :id="`vue-stars-${_uid}-${x}`"
                type="radio"
                :checked="valueInt === x"
                :name="name"
                :value="x"
                @change="updateInput(x)"
            />
            <input
                v-if="readonly"
                ref="input"
                :id="`vue-stars-${_uid}-${x}`"
                type="radio"
                :checked="valueInt === x"
                :name="name"
                :value="x"
                disabled
            />
        </span>
    </div>
</template>
<script>
import './rating.css';

export default {
    name: 'vue-stars',
    props: {
        max: { type: Number, required: false, default: 5 },
        value: { type: Number, required: false, default: 0 },
        name: { type: String, required: false, default: 'rating' },
        char: { type: String, required: false, default: '★' },
        inactiveChar: { type: String, required: false, default: null },
        readonly: { type: Boolean, required: false, default: false },
        activeColor: { type: String, required: false, default: '#FD0' },
        inactiveColor: { type: String, required: false, default: '#999' },
        shadowColor: { type: String, required: false, default: '#FF0' },
        hoverColor: { type: String, required: false, default: '#DD0' },
    },
    computed: {
        valueInt() {
            return parseInt(this.value);
        },
        ratingChars() {
            return Array.from(this.char);
        },
        inactiveRatingChars() {
            /* Default to ratingChars if no inactive characters have been provided */
            return this.inactiveChar ? Array.from(this.inactiveChar) : this.ratingChars;
        },
        notouch() {
            /* For iPhone specifically but really any touch device, there is no true hover state, disabled any pseudo-hover activity. */
            return !('ontouchstart' in document.documentElement);
        },
        mapCssProps() {
            return {
                '--active-color': this.activeColor,
                '--inactive-color': this.inactiveColor,
                '--shadow-color': this.shadowColor,
                '--hover-color': this.hoverColor,
            };
        },
    },
    methods: {
        updateInput(v) {
            this.$emit('input', parseInt(v, 10));
        },
        getActiveLabel(x) {
            const s = this.ratingChars;
            return s[Math.min(s.length - 1, x - 1)];
        },
        getInactiveLabel(x) {
            const s = this.inactiveRatingChars;
            return s[Math.min(s.length - 1, x - 1)];
        },
    },
};
</script>
