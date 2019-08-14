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
        <div :id="`${inputId}-alert`" class="error-message v-input__error" role="alert">
            <slot name="error" :error="error">
                {{ error }}
            </slot>
        </div>
    </div>
</template>

<script>
import inputMixin from './inputMixin';
import autosize from 'autosize';

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
        disabled: {
            type: Boolean,
            default: false,
        },
        float: {
            type: Boolean,
            default: true,
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
            const { textarea } = this.$refs;
            if (textarea) {
                textarea.style.height = 'auto';
                textarea.style.height = textarea.scrollHeight + 5 + 'px';
            }
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
            handlers.input = e => {
                this.internal_value = e.target.value;
                this.$emit('input', this.internal_value);
            };
            return handlers;
        },
    },
};
</script>

<style lang="postcss">
.v-input {
    position: relative;
    padding-top: calc(var(--gs) * 2);

    &--float &__label {
        position: absolute;
        top: 16px;
        left: 16px;
        line-height: 2.5rem;
        -webkit-transition: all 0.2s ease;
        transition: all 0.2s ease;
    }

    &--active &__label {
        top: 0;
        color: var(--cl-global);
        font-size: 0.75rem;
        line-height: 1rem;
    }

    &--active &__input {
        border-bottom-color: var(--cl-global);
    }

    &--invalid &__input {
        border-bottom-color: var(--cl-red);
    }

    &--disabled &__input {
        color: var(--cl-divider-grey);
        border-bottom-color: var(--cl-divider-grey);
    }

    &--disabled &__label {
        color: var(--cl-divider-grey);
    }

    &--disabled &__error {
        display: none;
    }

    &__label {
        cursor: text;
        color: var(--cl-grey);
    }

    &__input {
        width: 100%;
        min-height: 40px;
        padding: 8px 16px;
        border: none;
        border-bottom: 2px solid var(--cl-grey);
        color: var(--cl-global);
        font-size: 0.875rem;
        line-height: 1.375rem;
        background-color: transparent;
        transition: all var(--time) var(--timing-function);
        overflow: hidden;

        &:focus {
            outline: none;
        }
    }

    &__container {
        position: relative;
        display: flex;
    }

    &__error {
        position: relative;
        min-height: calc(var(--gs) * 3);
        padding: 0 16px;
        font-size: 12px;
        line-height: calc(var(--gs) * 3);
        color: var(--cl-red);
        overflow: hidden;
    }
}
</style>
