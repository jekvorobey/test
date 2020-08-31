<template>
    <div class="v-counter">
        <button
            class="v-counter__btn"
            ref="decrement"
            type="button"
            @click="onBtnClick($event, 'decrement')"
            :disabled="isMinDisabled"
        >
            <slot name="decrement">
                <v-svg name="minus-small" width="16" height="16" />
            </slot>
        </button>
        <input
            ref="input"
            class="v-counter__input"
            type="number"
            :min="min"
            :max="max"
            :value="value_internal"
            :step="step"
            v-bind="$attrs"
            @change="onChange"
            :disabled="disabled"
        />
        <button
            class="v-counter__btn"
            ref="increment"
            type="button"
            @click="onBtnClick($event, 'increment')"
            :disabled="isMaxDisabled"
        >
            <slot name="increment">
                <v-svg name="plus-small" width="16" height="16" />
            </slot>
        </button>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';

import '@images/sprites/minus-small.svg';
import '@images/sprites/plus-small.svg';
import './VCounter.css';

const actionType = {
    DECREMENT: 'decrement',
    INCREMENT: 'increment',
};

let pressHoldEvent = null;
if (typeof document !== 'undefined') pressHoldEvent = new CustomEvent('pressHold');

export default {
    name: 'v-counter',
    inheritAttrs: false,

    components: {
        VSvg,
    },

    model: {
        prop: 'value',
        event: 'input',
    },

    props: {
        value: {
            type: [Number, String],
            default: 0,
        },

        step: {
            type: [Number, String],
            default: 1,
        },

        min: {
            type: [Number, String],
            default: -999,
        },

        max: {
            type: [Number, String],
            default: 999,
        },

        delay: {
            type: Number,
            default: 200,
        },

        disabled: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        const value = this.value < this.max ? this.value : this.max;
        return {
            pressHoldDuration: 20,
            currentActionType: null,
            timerID: null,
            counter: 0,
            value_internal: Number(value),
        };
    },

    computed: {
        isMinDisabled() {
            const { disabled } = this;
            return disabled || Number(this.value_internal) === Number(this.min);
        },

        isMaxDisabled() {
            const { disabled } = this;
            return disabled || Number(this.value_internal) === Number(this.max);
        },
    },

    watch: {
        value(value) {
            this.value_internal = Number(value);
        },

        isMinDisabled(value) {
            if (value && this.currentActionType === actionType.DECREMENT) this.onNotPressingDown();
        },

        isMaxDisabled(value) {
            if (value && this.currentActionType === actionType.INCREMENT) this.onNotPressingDown();
        },
    },

    methods: {
        updateValue(action) {
            const { input } = this.$refs;
            if (input && action) {
                const step = Number(this.step);
                const max = Number(input.max);
                const min = Number(input.min);
                let nextValue = 0;
                switch (action) {
                    case actionType.DECREMENT:
                        nextValue = this.value_internal - step;
                        if (nextValue >= min) this.value_internal = nextValue;
                        break;
                    case actionType.INCREMENT:
                        nextValue = this.value_internal + step;
                        if (nextValue <= max) this.value_internal = nextValue;
                        break;
                }
                this.$emit('input', this.value_internal);
            }
        },

        onChange({ currentTarget }) {
            const max = Number(currentTarget.max);
            const min = Number(currentTarget.min);
            const value = Number(currentTarget.value);

            if (value <= min) this.value_internal = min;
            else if (value >= max) this.value_internal = max;
            else this.value_internal = value;
            this.$forceUpdate();
            this.$emit('input', this.value_internal);
        },

        onBtnClick(e, action) {
            this.updateValue(action);
        },

        onPressingDown(e) {
            // Start the timer
            requestAnimationFrame(this.timer);
            this.target = e.target;
        },

        onNotPressingDown(e) {
            // Stop the timer
            cancelAnimationFrame(this.timerID);
            if (this.timeout) clearInterval(this.timeout);
            this.currentActionType = null;
            this.timeout = null;
            this.timerID = null;
            this.counter = 0;
            this.target = null;
        },

        timer() {
            if (this.counter < this.pressHoldDuration) {
                this.timerID = requestAnimationFrame(this.timer);
                this.counter += 1;
            } else if (this.target) this.target.dispatchEvent(pressHoldEvent);
        },

        bindEvents(btn, action) {
            // Listening for the mouse and touch events
            btn.addEventListener('mousedown', this.onPressingDown, false);
            btn.addEventListener('mouseup', this.onNotPressingDown, false);
            btn.addEventListener('mouseleave', this.onNotPressingDown, false);

            btn.addEventListener('touchstart', this.onPressingDown, false);
            btn.addEventListener('touchend', this.onNotPressingDown, false);

            // Listening for our custom pressHold event
            btn.addEventListener('pressHold', action, false);

            //cleanup
            this.$once('hook:beforeDestroy', () => {
                btn.removeEventListener('mousedown', this.onPressingDown);
                btn.removeEventListener('mouseup', this.onNotPressingDown);
                btn.removeEventListener('mouseleave', this.onNotPressingDown);

                btn.removeEventListener('touchstart', this.onPressingDown);
                btn.removeEventListener('touchend', this.onNotPressingDown);

                // Listening for our custom pressHold event
                btn.removeEventListener('pressHold', action);
            });
        },

        onHold(action) {
            if (this.timeout) clearInterval(this.timeout);
            this.currentActionType = action;
            this.timeout = setInterval(this.updateValue.bind(this, action), this.delay);
        },
    },

    mounted() {
        const { increment, decrement } = this.$refs;
        this.bindEvents(increment, this.onHold.bind(this, actionType.INCREMENT));
        this.bindEvents(decrement, this.onHold.bind(this, actionType.DECREMENT));
    },

    beforeDestroy() {
        cancelAnimationFrame(this.timerID);
        clearInterval(this.timeout);
        this.timeout = null;
        this.timerID = null;
        this.target = null;
    },
};
</script>
