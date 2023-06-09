<template>
    <div class="v-password" :class="[{ 'is-disabled': $attrs.disabled }, { 'v-password--invalid': error || phoneError}]">
        <label class="v-password__label" :for="inputId">
            <slot />
        </label>
        <div class="v-password__container">
            <input
                ref="input"
                v-bind="$attrs"
                v-on="inputListeners"
                class="v-password__input"
                :id="inputId"
                :value="value"
                :type="type"
                :autocomplete="autocomplete"
                :aria-describedby="`${inputId}-alert`"
            />
            <div
                v-if="!$attrs.disabled"
                class="v-password__btn-show"
                @mousedown.prevent
                @click.prevent="changePasswordState"
            >
                <v-svg :name="showPassword ? 'eye-crossed' : 'eye'" width="16" height="16" />
            </div>
        </div>

        <div v-if="showError" :id="`${inputId}-alert`" class="error-message v-password__error" role="alert">
            <slot name="error" :error="error">
                {{ error }}
            </slot>
        </div>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VButton from '@controls/VButton/VButton.vue';

import inputMixin from '@controls/VInput/inputMixin';
import '@images/sprites/eye.svg';
import '@images/sprites/eye-crossed.svg';
import './VPassword.css';

export default {
    name: 'v-password',
    inheritAttrs: false,
    mixins: [inputMixin],

    components: {
        VButton,
        VSvg,
    },

    props: {
        value: {},
        phoneError: {
            type: String,
            required: false,
        },
    },

    data() {
        return {
            showPassword: false,
            autocomplete: 'off',
            inputId: `v-password-id-${this._uid}`,
        };
    },

    computed: {
        type() {
            return this.showPassword ? 'text' : 'password';
        },
    },

    methods: {
        changePasswordState(e) {
            this.showPassword = !this.showPassword;
        },
    },
};
</script>
