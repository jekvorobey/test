<template>
    <div class="v-input">
        <label class="v-input__label" :for="inputId">
            <slot />
        </label>
        <div class="v-input__container">
            <input
                v-if="tag === 'input'"
                v-bind="$attrs"
                v-on="inputListeners"
                class="v-input__input"
                :class="{ 'is-invalid': error }"
                :id="inputId"
                :value="value"
                :type="type"
                :aria-describedby="`${inputId}-alert`"
            />
            <textarea
                v-if="tag === 'textarea'"
                v-bind="$attrs"
                v-on="inputListeners"
                class="v-input__input"
                :class="{ 'is-invalid': error }"
                :id="inputId"
                :value="value"
                :type="type"
                :aria-describedby="`${inputId}-alert`"
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
import inputMixin from './inputMixin';
import './VInput.css';

const validTags = ['input', 'textarea'];

export default {
    name: 'v-input',
    inheritAttrs: false,
    mixins: [inputMixin],
    props: {
        value: {},
        type: { type: String, default: 'text' },
        tag: {
            type: String,
            default: 'input',
            validator(value) {
                return validTags.indexOf(value) !== -1;
            },
        },
    },
    data() {
        return {
            inputId: `v-input-id-${this._uid}`,
        };
    },
};
</script>
