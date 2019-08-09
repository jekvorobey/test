<template>
    <div class="v-password" :class="{ 'is-disabled': $attrs.disabled }">
        <label class="v-password__label" :for="inputId">
            <slot />
        </label>
        <div class="v-password__container">
            <input
                ref="input"
                v-bind="$attrs"
                v-on="inputListeners"
                class="v-password__input"
                :class="{ 'is-invalid': error }"
                :id="inputId"
                :value="value"
                :type="type"
                :autocomplete="autocomplete"
                :aria-describedby="`${inputId}-alert`"
                @keydown.enter.prevent
            />
            <v-button
                v-if="!$attrs.disabled"
                class="btn--transparent v-password__btn-show"
                :iconName="showPassword ? 'eye-crossed' : 'eye'"
                @click.prevent="changePasswordState"
            />
        </div>

        <div :id="`${inputId}-alert`" class="error-message v-password__error" role="alert">
            <slot name="error" :error="error">
                {{ error }}
            </slot>
        </div>
    </div>
</template>

<script>
import inputMixin from '../VInput/inputMixin';
import VButton from '../VButton/VButton.vue';
import './VPassword.css';
import '../../../../images/sprite/eye.svg';
import '../../../../images/sprite/eye-crossed.svg';

export default {
    name: 'v-password',
    inheritAttrs: false,
    mixins: [inputMixin],
    components: {
        VButton,
    },
    props: {
        value: {},
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
