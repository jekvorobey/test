<template>
    <div class="v-range">
        <div ref="body" class="v-range__body" />
        <div class="v-range__container">
            <span :key="index" v-for="(value, index) in value_internal">
                <label class="v-range__label">
                    <slot name="label" :index="index">{{ isSingle ? '' : index === 0 ? 'от' : 'до' }}</slot>
                </label>
                <input class="v-range__input" type="number" :value="value" @change="onInput($event, index)" />
            </span>
        </div>
    </div>
</template>

<script>
import noUiSlider from 'nouislider';
import './VRange.css';
import { setTimeout } from 'timers';

export default {
    name: 'v-range',
    props: {
        value: {
            type: Array,
            default() {
                return [0];
            },
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
    },
    data() {
        const isSingle = this.value.length < 2;
        return {
            isSingle,
            value_internal: this.value,
            options: {
                start: this.value,
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
        value_internal(value) {
            this.$emit('input', value);
        },

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
        onInput(e, index) {
            this.value_internal[index] = Number(e.target.value);
            this.slider.set(this.value_internal);
        },
        onChange(values, handle, unencoded, tap, positions) {
            this.value_internal = values;
        },
    },
    mounted() {
        const { body } = this.$refs;
        this.slider = noUiSlider.create(body, this.options);
        this.slider.on('update', this.onChange);
        this.slider.on('change', this.onChange);
    },

    destroyed() {
        setTimeout(() => {
            this.slider.off('update');
            this.slider.off('change');
            this.slider.destroy();
            this.slider = null;
        }, 250);
    },
};
</script>
