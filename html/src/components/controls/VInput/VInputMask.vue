<template>
    <div
        class="v-input"
        :class="[
            { 'v-input--float': float },
            { 'v-input--active': active },
            { 'v-input--invalid': error },
            { 'v-input--disabled': disabled },
        ]"
    >
        <label class="v-input__label" :for="inputId">
            <slot />
        </label>
        <div class="v-input__container">
            <input
                ref="input"
                v-bind="$attrs"
                class="v-input__input"
                type="text"
                :id="inputId"
                :disabled="disabled"
                :aria-describedby="`${inputId}-alert`"
                @focus="focus = true"
                @blur="focus = false"
            />
            <slot name="after" />
        </div>
        <div v-if="showError" :id="`${inputId}-alert`" class="error-message v-input__error" role="alert">
            <slot name="error" :error="error">
                {{ error }}
            </slot>
        </div>
        <slot name="after-error" />
    </div>
</template>

<script>
import Cleave from 'cleave.js';
import inputMixin from './inputMixin';
import telPaste from '@plugins/validation';
import './VInput.css';

export default {
    name: 'v-input',
    inheritAttrs: false,
    mixins: [inputMixin],

    props: {
        value: {
            default: null,
            required: true,
            validator(value) {
                return (
                    value === null || typeof value === 'string' || value instanceof String || typeof value === 'number'
                );
            },
        },

        // https://github.com/nosir/cleave.js/blob/master/doc/options.md
        options: {
            type: Object,
            default: () => ({}),
        },

        // Set this prop to false to emit masked value
        raw: {
            type: Boolean,
            default: true,
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
        autofocus: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            inputId: `v-input-id-${this._uid}`,
            focus: false,
            engine: null,
            isInitialized: false,
        };
    },

    computed: {
        active() {
            return this.focus || this.value;
        },

        handlers() {
            const keys = Object.keys(this.$listeners);
            const handlers = {};
            keys.forEach((k) => {
                handlers[k] = (e) => this.$emit(k, e);
            });
            handlers.input = this.input;
            return handlers;
        },
    },

    watch: {
        /**
         * Watch for any changes in options and redraw
         *
         * @param newOptions Object
         */
        options: {
            deep: true,
            handler(newOptions) {
                if (this.engine) this.engine.destroy();
                this.engine = new Cleave(this.$refs.input, this.getOptions(newOptions));
                this.engine.setRawValue(this.value);
            },
        },

        /**
         * Watch for changes from parent component and notify cleave instance
         *
         * @param newValue
         */
        value(newValue) {

            let cleanValue = '+7' + newValue.slice(0, newValue.length).replace(/^[+,7,8]+/, '');
            
            /* istanbul ignore if */
            if (!this.engine) return;

            // when v-model is not masked (raw)
            if (this.raw && cleanValue === this.engine.getRawValue()) return;
            //  when v-model is masked (NOT raw)
            if (!this.raw && cleanValue === this.$refs.input.value) return;

            // Lastly set newValue
            this.engine.setRawValue(cleanValue);
        },
    },

    methods: {
        getOptions(options) {
            // Preserve original callback
            this.onValueChangedFn = options.onValueChanged;

            return Object.assign({}, options, {
                onValueChanged: this.onValueChanged,
            });
        },

        /**
         * Watch for value changed by cleave and notify parent component
         *
         * @param event
         */
        onValueChanged(event) {
            if (!this.isInitialized) return;
            let value = this.raw ? event.target.rawValue: event.target.value;

            // this.$emit('input', '+7' + value.slice(0, value.length).replace(/^[+,7,8]+/, ''));
            this.$emit('input', value)

            // Call original callback method
            if (typeof this.onValueChangedFn === 'function') this.onValueChangedFn.call(this, event);
        },
    },

    mounted() {
        /* istanbul ignore if */
        if (this.engine) return;
        this.engine = new Cleave(this.$refs.input, this.getOptions(this.options));
        this.engine.setRawValue(this.value);
        this.isInitialized = true;

        // setTimeout необходим для предовращения ситуаций, когда автофокус перебивает каким-нибудь tabindex в модальном окне
        if (this.autofocus) {
            setTimeout(() => {
                this.$refs.input.focus();
            }, 400);
        }
    },

    /**
     * Free up memory
     */
    beforeDestroy() {
        /* istanbul ignore if */
        if (!this.engine) return;

        this.engine.destroy();
        this.engine = null;
        this.onValueChangedFn = null;
    },
};
</script>
