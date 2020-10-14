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
                autocomplete="off"
            />
            <div class="v-datepicker__icon" />
        </div>
        <div v-if="showError" :id="`${inputId}-alert`" class="error-message v-datepicker__error" role="alert">
            <slot name="error" :error="error">
                {{ error }}
            </slot>
        </div>
        <div v-show="!disabled" ref="datepicker"></div>
    </div>
</template>
<script>
import flatpickr from 'flatpickr';
import inputMixin from '@controls/VInput/inputMixin';
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
            default: false,
        },

        showError: {
            type: Boolean,
            default: true,
        },

        error: {
            type: [String, Boolean],
            default: null,
        },

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

        altInput: {
            type: Boolean,
            default: false,
        },

        altFormat: {
            type: String,
            default: null,
        },

        dateFormat: {
            type: String,
            default: null,
        },

        monthSelectorType: {
            type: String,
            default: 'dropdown',
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
                monthSelectorType: this.monthSelectorType,

                // eslint-disable-next-line no-unused-vars
                onChange(selectedDates, dateStr, instance) {
                    that.internal_value = [...dateStr.split(', ')];
                },

                onOpen() {
                    that.open = true;
                },

                onClose(selectedDates, dateStr, instance) {
                    const event = new KeyboardEvent('keydown', {
                        bubbles: true,
                        cancelable: true,
                        keyCode: 13,
                    });

                    if (instance.config.altInput) instance.altInput.dispatchEvent(event);
                    else instance.input.dispatchEvent(event);

                    that.open = false;
                },

                onReady() {
                    that.initialized = true;
                },
            };
            if (this.altInput) {
                config.altInput = this.altInput;
                config.altFormat = this.altFormat;
            }
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
