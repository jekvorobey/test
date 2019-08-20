<template>
    <div class="v-check">
        <input
            class="v-check__input"
            v-bind="$attrs"
            :id="id"
            :type="type"
            :checked="shouldBeChecked"
            :value="value"
            :name="name"
            @change="updateInput"
        />
        <label class="v-check__label" :for="id">
            <slot />
        </label>
    </div>
</template>

<script>
import './VCheck.css';

export default {
    serverCacheKey: props => `${props.id}-${props.type}-${props.name}-${props.value}`,
    name: 'v-check',
    inheritAttrs: false,
    model: {
        prop: 'modelValue',
        event: 'change',
    },
    props: {
        modelValue: {},
        checked: {},
        id: {
            type: [Number, String],
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        value: {
            type: [Number, String],
            required: true,
        },
        type: {
            type: String,
            default: 'checkbox',
            validator(value) {
                // Значение должно соответствовать одной из этих строк
                return ['checkbox', 'radio'].indexOf(value) !== -1;
            },
        },
    },
    data() {
        return {
            m_checked: undefined,
        };
    },
    computed: {
        shouldBeChecked() {
            if (this.modelValue !== undefined) {
                // radio
                if (this.type === 'radio') return this.modelValue === this.value;
                // checkbox
                else if (this.modelValue instanceof Array) return this.modelValue.includes(this.value);
                return typeof this.modelValue === 'string' ? true : !!this.modelValue;
            }
            // this.modelValue === undefined
            if (this.m_checked === undefined)
                return (this.m_checked = typeof this.checked === 'string' ? true : !!this.checked);
            else return this.m_checked;
        },
    },
    watch: {
        checked(v) {
            this.m_checked = v;
        },
    },
    methods: {
        updateInput(event) {
            if (this.type === 'radio') {
                this.$emit('change', this.value);
                return;
            }
            let isChecked = event.target.checked;
            this.m_checked = isChecked;
            if (this.modelValue instanceof Array) {
                let newValue = [...this.modelValue];
                if (isChecked) newValue.push(this.value);
                else newValue.splice(newValue.indexOf(this.value), 1);

                this.$emit('change', newValue);
            } else this.$emit('change', isChecked);
        },
    },
};
</script>


<style lang="postcss">
input[type='checkbox'],
input[type='radio'] {
    position: absolute;
    clip: rect(0, 0, 0, 0);

    & + label {
        position: relative;
        display: block;
        margin-bottom: calc(var(--gs) * 2);
        padding-left: 28px;
        font-size: 14px;
        line-height: 1.2;
        cursor: pointer;

        &::before,
        &::after {
            content: '';
            position: absolute;
            display: block;
            box-sizing: border-box;
            transition: opacity var(--time) ease;
        }

        &::before {
            content: '';
            top: 0;
            left: 0;
            width: 17px;
            height: 17px;
            border: 2px solid var(--cl-global);
            background: var(--cl-white);
        }

        &:last-of-type {
            margin-bottom: calc(var(--gs) * 3);
        }

        &.is-invalid {
            &:last-of-type {
                margin-bottom: var(--gs);
            }
        }
    }

    &:disabled {
        & + label {
            color: var(--cl-grey);
            cursor: default;

            &::before {
                border-color: var(--cl-global);
            }
        }
    }

    &:checked {
        & + label::after {
            transform: scale(1);
        }

        & + label::before {
            border-color: var(--cl-global);
        }
    }
}

input[type='checkbox'] {
    & + label {
        &::after {
            top: 0;
            left: 0;
            width: 17px;
            height: 17px;
            transition: all var(--time) ease;
            background-repeat: no-repeat;
            background-position: 50% 50%;
            background-size: 12px 9px;
            background-image: svg-load('../../../assets/images/sprites/check-small.svg', 'fill: #fff');
            background-color: var(--cl-blue);
            transform: scale(0);
        }
    }

    &:disabled + label {
        color: var(--cl-grey);
        cursor: default;

        &::after,
        &::before {
            opacity: 0.4;
        }
    }
}

input[type='radio'] {
    & + label {
        &::before,
        &::after {
            border-radius: 50%;
        }

        &::after {
            top: 4.5px;
            left: 4.5px;
            width: 8px;
            height: 8px;
            background: var(--cl-global);
            transform: scale(0);
            transition: all var(--time) ease;
        }
    }

    &:disabled + label {
        color: var(--cl-grey);
        cursor: default;

        &::after,
        &::before {
            opacity: 0.4;
        }
    }
}
</style>
