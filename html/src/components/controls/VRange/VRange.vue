<template>
    <div class="v-range">
        <div ref="body" class="v-range__body" />
        <div class="v-range__container">
            <span :key="index" v-for="(value, index) in value_internal">
                <label class="v-range__label">
                    <slot name="label" :index="index">{{ isSingle ? '' : index === 0 ? 'от' : 'до' }}</slot>
                </label>
                <input
                    class="v-range__input"
                    type="number"
                    :value="value"
                    :name="name"
                    @change="onInputChange($event, index)"
                    @input="onInput($event, index)"
                />
            </span>
        </div>
    </div>
</template>

<script>
import noUiSlider from 'nouislider';
import './VRange.css';
import { setTimeout } from 'timers';
import _debounce from 'lodash/debounce';

const INPUT_DEBOUNCE_TIME = 500; // 0.5 seconds

export default {
    name: 'v-range',
    props: {
        initialValue: {
            type: Array,
        },
        value: {
            type: Array,
        },
        min: {
            type: Number,
            default: 0,
        },
        max: {
            type: Number,
            default: 100,
        },
        step: {
            type: Number,
            default: 1,
        },
        format: {
            type: Object,
            default() {
                return undefined;
            },
        },
        name: {
            type: String,
            default: undefined,
        },
    },
    data() {
        const value = this.value || this.initialValue || [];
        const isSingle = value.length < 2;
        return {
            isSingle,
            value_internal: null,
            options: {
                start: value,
                connect: isSingle ? 'lower' : true,
                step: this.step,
                range: {
                    min: this.min,
                    max: this.max,
                },
                format: this.format,
            },
        };
    },
    watch: {
        value() {
            for (let i = 0; i < this.value.length; i++) {
                if (this.value_internal[i] !== this.value[i]) {
                    this.value_internal = this.value;
                    this.slider.set(this.value_internal);
                    return;
                }
            }
        },

        min(value) {
            this.options.range.min = value;
        },

        max(value) {
            this.options.range.max = value;
        },

        step(value) {
            this.options.step = value;
        },

        format(value) {
            this.options.format = value;
        },

        options: {
            handler(value) {
                this.slider.updateOptions(this.value, true);
            },
            deep: true,
        },
    },
    methods: {
        maxLength (index) {
            let vl = this.value[1].toString().length
            let ml = this.max.toString().length
            return index == 1 ? ml : Math.min(vl < this.min.toString().length ? ml : vl, ml)
        },
        isInputCompleted(e, index) {
            let v = Number(e.target.value)
            return v > this.min && (index == 1 ? (v >= this.value[0]) : true)
        },
        onInputChange(e, index) {
            if (this.debounce_onInput) {
                this.debounce_onInput.cancel()
            }
            this.value_internal[index] = Number(e.target.value);
            this.slider.set(this.value_internal);
            this.$emit('input', this.value_internal);
        },
        onInput(e, index) {
            if (this.debounce_onInput) {
                this.debounce_onInput.cancel()
            }
            if (index == 0 && this.value[1] >= this.min) {
                // ограничение поля "от" в максимульную сторону значением из второго поля "до"
                e.target.value = Math.min(Number(e.target.value), Math.min(this.value[1], this.max)).toString()
            }
            if (Number(e.target.value).toString().length > this.maxLength(index)) {
                // ограничение по кол-ву символов вводимых в поле, т.к. maxlength у input-а в данном случае не работает
                e.target.value = Number(e.target.value).toString().slice(0, this.maxLength(index))
            }
            this.debounce_onInput = _debounce(function(e, index) {
                if (this.isInputCompleted(e, index)) {
                    this.value_internal[index] = Number(e.target.value)
                    this.slider.set(this.value_internal)
                    this.$emit('input', this.value_internal)
                }
            }, INPUT_DEBOUNCE_TIME)
            this.debounce_onInput(e, index)
        },

        onUpdate(values, handle, unencoded, tap, positions) {
            this.value_internal = values;
        },

        onChange(values, handle, unencoded, tap, positions) {
            if (this.debounce_onInput) {
                this.debounce_onInput.cancel()
            }
            this.debounce_onInput = _debounce(function(values) {
                this.value_internal = values;
                this.$emit('input', this.value_internal);
            }, INPUT_DEBOUNCE_TIME)
            this.debounce_onInput(values)
        },
    },

    mounted() {
        const { body } = this.$refs;
        this.slider = noUiSlider.create(body, this.options);
        this.slider.on('update', this.onUpdate);
        this.slider.on('change', this.onChange);
    },

    beforeDestroy() {
        if (this.slider) this.slider.off();
    },

    destroyed() {
        setTimeout(() => {
            if (this.slider) {
                this.slider.destroy();
                this.slider = null;
            }
        }, 250);
    },
};
</script>
