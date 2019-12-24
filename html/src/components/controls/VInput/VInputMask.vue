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
                v-bind="$attrs"
                v-on="handlers"
                class="v-input__input"
                :id="inputId"
                :value="display"
                :type="type"
                :disabled="disabled"
                :aria-describedby="`${inputId}-alert`"
                @focus="focus = true"
                @blur="focus = false"
            />
            <slot name="after" />
        </div>
        <div :id="`${inputId}-alert`" class="error-message v-input__error" role="alert">
            <slot name="error" :error="error">
                {{ error }}
            </slot>
        </div>
    </div>
</template>

<script>
import maskMixin from './maskMixin';
import inputMixin from './inputMixin';
import './VInput.css';

const inputTypes = { text: 'text', number: 'number' };
const validTags = ['input'];

export default {
    name: 'v-input',
    inheritAttrs: false,
    mixins: [inputMixin, maskMixin],
    props: {
        value: {},

        type: { type: String, default: inputTypes.text },

        disabled: {
            type: Boolean,
            default: false,
        },

        float: {
            type: Boolean,
            default: false,
        },

        error: String,
    },
    data() {
        return {
            inputId: `v-input-id-${this._uid}`,
            internal_value: this.value,
            focus: false,
        };
    },
    watch: {
        value(value) {
            this.internal_value = value;
        },
    },
    computed: {
        active() {
            return this.focus || this.internal_value;
        },

        handlers() {
            const keys = Object.keys(this.$listeners);
            const handlers = {};
            keys.forEach(k => {
                handlers[k] = e => this.$emit(k, e);
            });
            handlers.input = this.input;
            return handlers;
        },
    },
};
</script>
