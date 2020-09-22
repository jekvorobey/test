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
                />
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
        onInputChange(e, index) {
            this.value_internal[index] = Number(e.target.value);
            this.slider.set(this.value_internal);
        },

        onUpdate(values, handle, unencoded, tap, positions) {
            this.value_internal = values;
        },

        onChange(values, handle, unencoded, tap, positions) {
            this.value_internal = values;
            this.$emit('input', this.value_internal);
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
