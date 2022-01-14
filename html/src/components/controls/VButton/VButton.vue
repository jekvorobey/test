<template>
    <component :is="component" v-bind="componentAttrs" v-on="handlers">
        <div class="btn__slot">
            <slot />
        </div>
        <div v-if="loading" class="btn__loader">
            <svg viewBox="0 0 29 30" shape-rendering="geometricPrecision" text-rendering="geometricPrecision">
                <path
                    d="M26.238100,24.740300L11.836700,30L0,20.259700L2.761890,5.259740L17.163300,0L29,9.740260L26.238100,24.740300ZM12.224600,27.729100L2.180190,19.463700L4.521820,6.746190L16.775400,2.270890L26.819800,10.536300L24.478200,23.253800L12.224600,27.729100Z"
                />
            </svg>
        </div>
    </component>
</template>

<script>
// import './VButton.css';

const types = ['button', 'reset', 'submit'];

/**
 * Базовый класс для кнопки, поддерживает SVG
 */
export default {
    name: 'v-button',

    props: {
        type: {
            type: String,
            default: 'button',
            validator(value) {
                return types.indexOf(value) !== -1;
            },
        },

        href: {
            type: String,
        },

        to: {
            type: [String, Object],
        },

        loading: {
            type: Boolean,
            default: false,
        },

        disabled: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        component() {
            if (this.href) {
                return 'a';
            }

            if (this.to) {
                return 'router-link';
            }

            return 'button';
        },

        componentAttrs() {
            let attrs = {
                class: {
                    btn: true,
                    'btn--loading': this.loading,
                },
                disabled: this.disabled,
            };

            switch (this.component) {
                case 'a':
                    attrs['href'] = this.href;

                    break;
                case 'router-link':
                    attrs['to'] = this.to;

                    break;
                case 'button':
                    attrs['type'] = this.type;

                    break;
            }

            return attrs;
        },

        handlers() {
            const keys = Object.keys(this.$listeners);
            const handlers = {};
            keys.forEach((k) => (handlers[k] = (e) => this.$emit(k, e)));
            return handlers;
        },
    },
};
</script>
