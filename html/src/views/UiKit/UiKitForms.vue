<template>
    <section class="section ui-kit-section">
        <h2 class="ui-kit-section__hl">Формы</h2>
        <form @submit.prevent="submit">
            <v-input v-model="form.name" :error="name_error">
                Имя <span>*</span>
                <template v-slot:error="{ error }">
                    <transition name="slide-in-bottom" mode="out-in">
                        <div :key="error" v-if="error">{{ error }}</div>
                    </transition>
                </template>
            </v-input>
            <br />
            <v-input v-model="form.email" :error="email_error">
                E-mail <span>*</span>
                <template v-slot:error="{ error }">
                    <transition name="slide-in-bottom" mode="out-in">
                        <div :key="error" v-if="error">{{ error }}</div>
                    </transition>
                </template>
            </v-input>
            <br />
            <v-input v-model="form.email" :error="email_error" disabled>
                E-mail <span>*</span>
                <template v-slot:error="{ error }">
                    <transition name="slide-in-bottom" mode="out-in">
                        <div :key="error" v-if="error">{{ error }}</div>
                    </transition>
                </template>
            </v-input>
            <br />
            <v-input v-model="form.description" tag="textarea"> Description </v-input>
            <br />
            <v-button type="submit">submit</v-button>
        </form>
    </section>
</template>
<script>
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import validationMixin, { required, password, email, minLength, sameAs, tel } from '@plugins/validation';

export default {
    name: 'ui-kit-forms',
    mixins: [validationMixin],
    components: {
        VButton,
        VInput,
    },
    validations: {
        form: {
            name: {
                required,
            },
            email: {
                required,
                email,
            },
        },
    },
    data() {
        return {
            form: {
                name: null,
                email: null,
                description: null,
            },
        };
    },
    methods: {
        submit() {
            this.$v.$touch();
        },
    },
    computed: {
        name_error() {
            return this.$v.form.name.$dirty && !this.$v.form.name.required
                ? this.$t('validation.errors.required')
                : null;
        },

        email_error() {
            if (this.$v.form.email.$dirty) {
                if (!this.$v.form.email.required) return this.$t('validation.errors.required');
                if (!this.$v.form.email.email) return this.$t('validation.errors.email');
            }
        },
    },
};
</script>
