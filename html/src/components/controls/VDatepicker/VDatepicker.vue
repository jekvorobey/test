<template>
    <div
        v-show="initialized"
        class="v-datepicker"
        :class="[
            { 'v-datepicker--float': float },
            { 'v-datepicker--active': active },
            { 'v-datepicker--invalid': error },
            { 'v-datepicker--disabled': disabled },
        ]"
    >
        <label class="v-datepicker__label" :for="inputId">
            <slot />
        </label>
        <div class="v-datepicker__container">
            <input
                ref="input"
                v-bind="$attrs"
                class="v-datepicker__input"
                :id="inputId"
                :disabled="disabled"
                :aria-describedby="`${inputId}-alert`"
                @focus="setFocus(true)"
                @blur="setFocus(false)"
                autocomplete="off"
            />
            <div class="v-datepicker__icon" />
        </div>
        <div :id="`${inputId}-alert`" class="error-message v-datepicker__error" role="alert">
            <slot name="error" :error="error">
                {{ error }}
            </slot>
        </div>
        <div v-show="!disabled" ref="datepicker"></div>
    </div>
</template>
<script>
import flatpickr from 'flatpickr';
import inputMixin from '../VInput/inputMixin';
import './VDatepicker.css';

const validModes = ['single', 'multiple', 'range'];

export default {
    name: 'v-datepicker',
    inheritAttrs: false,
    mixins: [inputMixin],
    props: {
        value: {
            type: Array,
            default() {
                return [];
            },
        },

        disable: {
            type: Array,
            default() {
                return [];
            },
        },

        enable: {
            type: Array,
            default() {
                return [];
            },
        },

        disabled: {
            type: Boolean,
            default: false,
        },

        float: {
            type: Boolean,
            default: true,
        },

        error: String,

        allowInput: {
            type: Boolean,
            default: false,
        },

        inline: {
            type: Boolean,
            default: false,
        },

        mode: {
            type: String,
            default: 'single',
            validator(value) {
                return validModes.indexOf(value) !== -1;
            },
        },

        locale: {
            type: Object,
        },

        maxDate: {
            type: [String, Date],
        },

        minDate: {
            type: [String, Date],
        },

        dateFormat: {
            type: String,
            default: null,
        },
    },
    data() {
        return {
            inputId: `v-input-id-${this._uid}`,
            initialized: false,
            internal_value: this.value,
            focus: false,
            open: false,
        };
    },
    watch: {
        value(value) {
            this.internal_value = value;
        },

        internal_value(value, oldValue) {
            if (value !== oldValue) this.$emit('input', value);
        },

        mode(value) {
            this.engine.set('mode', value);
        },

        locale(value) {
            if (value) {
                flatpickr.localize(value);
                this.reinit();
            }
        },

        disable(value) {
            this.engine.set('disable', value);
        },

        enable(value) {
            this.engine.set('enable', value);
        },

        minDate(value) {
            this.engine.set('minDate', value);
        },

        maxDate(value) {
            this.engine.set('maxDate', value);
        },
    },
    computed: {
        active() {
            return this.focus || this.open || (this.internal_value && this.internal_value.length > 0);
        },
    },
    methods: {
        setFocus(value) {
            this.focus = value;
        },

        reinit() {
            const config = Object.assign({}, this.engine.config);
            this.destroy();
            this.init();
        },

        init() {
            const { input, datepicker } = this.$refs;
            const that = this;
            const config = {
                defaultDate: this.internal_value,
                mode: this.mode,
                disableMobile: true,
                allowInput: this.allowInput,
                inline: this.inline,
                minDate: this.minDate,
                maxDate: this.maxDate,
                nextArrow: '<svg class="icon"><use xlink:href="#icon-arrow-small"></use></svg>',
                prevArrow: '<svg class="icon"><use xlink:href="#icon-arrow-small"></use></svg>',
                onChange(selectedDates, dateStr, instance) {
                    that.internal_value = [...dateStr.split(', ')];
                },
                onOpen() {
                    that.open = true;
                },
                onClose() {
                    that.open = false;
                },
                onReady() {
                    that.initialized = true;
                },
            };
            if (this.dateFormat) config.dateFormat = this.dateFormat;
            if (this.inline) config.appendTo = datepicker;
            if (this.disable && this.disable.length > 0) config.disable = this.disable;
            if (this.enable && this.enable.length > 0) config.enable = this.enable;
            if (this.locale) flatpickr.localize(this.locale);
            this.engine = flatpickr(input, config);
        },

        destroy() {
            if (!this.engine) return;
            this.initialized = false;
            this.engine.destroy();
            this.engine = null;
        },
    },

    mounted() {
        this.init();
    },
    beforeDestroy() {
        this.destroy();
    },
};
</script>