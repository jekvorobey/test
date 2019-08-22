<template>
    <div class="v-check" :class="{ 'is-switch': isSwitch }">
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
        isSwitch: {
            type: Boolean,
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
