<template>
    <div
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
            <slot name="after" />
        </div>
        <div :id="`${inputId}-alert`" class="error-message v-datepicker__error" role="alert">
            <slot name="error" :error="error">
                {{ error }}
            </slot>
        </div>

        <div ref="datepicker"></div>
    </div>
</template>
<script>
import flatpickr from 'flatpickr';
import inputMixin from '../VInput/inputMixin';
import './VDatepicker.css';

const validModes = ['single', 'multiple', 'range'];

export default {
    name: 'v-input',
    inheritAttrs: false,
    mixins: [inputMixin],
    props: {
        value: {},
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
    },
    data() {
        return {
            inputId: `v-input-id-${this._uid}`,
            internal_value: this.value,
            focus: false,
            open: false,
        };
    },
    watch: {
        value(value) {
            this.internal_value = value;
        },

        internal_value(value) {
            this.$emit('input', value);
        },

        mode(value) {
            this.engine.set('mode', value);
        },
    },
    computed: {
        active() {
            return this.focus || this.open || (this.internal_value && this.internal_value.length > 0);
        },
    },
    methods: {
        setFocus(bool) {
            this.focus = bool;
        },
    },
    mounted() {
        const { input, datepicker } = this.$refs;
        const that = this;
        const config = {
            defaultDate: this.internal_value,
            mode: this.mode,
            disableMobile: true,
            allowInput: this.allowInput,
            inline: this.inline,

            onChange(selectedDates, dateStr, instance) {
                that.internal_value = selectedDates;
            },
            onOpen() {
                that.open = true;
            },
            onClose() {
                that.open = false;
            },
        };

        if (this.inline) config.appendTo = datepicker;
        this.engine = flatpickr(input, config);
    },
    beforeDestroy() {
        this.engine.destroy();
    },
};
</script>