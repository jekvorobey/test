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
                v-if="tag === 'input'"
                v-bind="$attrs"
                v-on="handlers"
                class="v-input__input"
                :id="inputId"
                :value="internal_value"
                :type="type"
                :disabled="disabled"
                :aria-describedby="`${inputId}-alert`"
                @focus="focus = true"
                @blur="focus = false"
            />
            <textarea
                ref="textarea"
                v-if="tag === 'textarea'"
                v-bind="$attrs"
                v-on="handlers"
                class="v-input__input"
                rows="1"
                :id="inputId"
                :value="internal_value"
                :disabled="disabled"
                :aria-describedby="`${inputId}-alert`"
                autoresize
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
        <div v-if="showSuccess" :id="`${inputId}-success-alert`" class="success-message v-input__success" role="alert">
            <slot name="success" :error="success">
                {{ success }}
            </slot>
        </div>
    </div>
</template>

<script>
import inputMixin from './inputMixin';
import './VInput.css';

const inputTypes = { text: 'text', number: 'number' };
const validTags = ['input', 'textarea'];

export default {
    name: 'v-input',
    inheritAttrs: false,
    mixins: [inputMixin],
    props: {
        value: {},

        type: { type: String, default: inputTypes.text },

        tag: {
            type: String,
            default: 'input',
            validator(value) {
                return validTags.indexOf(value) !== -1;
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

        maxHeight: {
            type: [Number, String],
        },

        autoHeight: {
            type: Boolean,
            default: true,
        },

        showError: {
            type: Boolean,
            default: true,
        },

        showSuccess: {
            type: Boolean,
            default: false,
        },

        error: {
            type: [String, Boolean],
            default: null,
        },

        success: {
            type: [String, Boolean],
            default: null,
        },
    },
    data() {
        return {
            inputId: `v-input-id-${this._uid}`,
            internal_value: this.value,
            focus: false,
            internalMaxHeight: Number(this.maxHeight),
        };
    },
    watch: {
        value(value) {
            this.internal_value = value;
            const { textarea } = this.$refs;
            if (textarea && this.autoHeight) this.adjustHeight();
        },
    },
    computed: {
        active() {
            return this.focus || this.internal_value;
        },

        handlers() {
            const keys = Object.keys(this.$listeners);
            const handlers = {};
            keys.forEach((k) => {
                handlers[k] = (e) => this.$emit(k, e);
            });
            handlers.input = (e) => {
                let { value } = e.target;
                const maxLength = Number(e.target.maxLength);
                if (!Number.isNaN(maxLength) && maxLength > -1 && e.target.value.length > maxLength) {
                    e.target.value = e.target.value.slice(0, maxLength);
                    return;
                }

                if (this.type === inputTypes.number) {
                    value = Number(value);
                    const max = e.target.max ? Number(e.target.max) : Number.POSITIVE_INFINITY;
                    const min = e.target.min ? Number(e.target.min) : Number.NEGATIVE_INFINITY;
                    if (value < min) this.internal_value = min;
                    else if (value > max) this.internal_value = max;
                    else this.internal_value = value;
                } else this.internal_value = value;

                this.$emit('input', this.internal_value);
            };
            return handlers;
        },
    },

    methods: {
        adjustHeight() {
            const { textarea } = this.$refs;
            if (!textarea) return;
            if (textarea.offsetHeight === this.internalMaxHeight) return;

            if (textarea && textarea.scrollHeight < this.internalMaxHeight) {
                textarea.style.overflow = 'hidden';
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + 'px';
            } else {
                textarea.style.height = this.internalMaxHeight + 'px';
                textarea.style.overflow = 'auto';
            }
        },
    },

    mounted() {
        this.adjustHeight();
    },
};
</script>
