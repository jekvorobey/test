<template>
    <div class="v-increment">
        <button class="v-increment__btn"  
                ref="decrement"
                type="button"
                @click="onBtnClick($event, 'decrement')"
        >
            <slot name="decrement">&minus;</slot>
        </button>
        <input ref="input" 
               class="v-increment__input" 
               type="number" 
               :min="min"
               :max="max"
               :value="value_internal"
               v-bind="$attrs"
               @change="onChange"/>
        <button class="v-increment__btn" 
                ref="increment"  
                type="button"
                @click="onBtnClick($event, 'increment')"
        >
            <slot name="increment">&plus;</slot>
        </button>
    </div>
</template>

<script>
import './VIncrement.css';

const actionType = {
    decrement: 'decrement',
    increment: 'increment',
};

const pressHoldEvent = new CustomEvent('pressHold');

export default {
    name: 'v-increment',
    inheritAttrs: false,
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
    },
    data() {
        return {
            pressHoldDuration: 20,
            timerID: null,
            counter: 0,
            value_internal: Number(this.value),
        };
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
                    case actionType.decrement:
                        nextValue = this.value_internal - step;
                        if (nextValue >= min) this.value_internal = nextValue;
                        break;
                    case actionType.increment:
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
            this.timeout = setInterval(this.updateValue.bind(this, action), this.delay);
        },
    },

    mounted() {
        const { increment, decrement } = this.$refs;
        this.bindEvents(increment, this.onHold.bind(this, actionType.increment));
        this.bindEvents(decrement, this.onHold.bind(this, actionType.decrement));
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


