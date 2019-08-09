<template>
    <div ref="root" class="v-select" :class="[{ 'is-disabled': disabled }, { 'v-select--open': isOpen }]" tabindex="0">
        <select class="v-select__select" :disabled="disabled" :name="name">
            <option selected v-if="selectedItem" :value="getValue(selectedItem)">
                {{ getDisplayValue(selectedItem) }}
            </option>
        </select>

        <div
            class="v-select__container"
            @click="open"
            :class="{
                'v-select__container--open': isOpen,
            }"
        >
            <div class="v-select__item v-select__item--content">
                <div v-if="!selectedItem" class="v-select__label v-select__placeholder">
                    {{ placeholder }}
                </div>
                <slot v-if="selectedItem" :item="selectedItem" name="selected-option">
                    <!-- Содержимое по умолчанию -->
                    <div class="v-select__label">{{ getDisplayValue(selectedItem) }}</div>
                </slot>
            </div>
            <v-svg class="v-select__icon" :class="{ 'v-select__icon--is-open': isOpen }" name="arrow-down" />
        </div>
        <transition :name="animation">
            <ul v-if="isOpen" class="v-select__dropdown">
                <li
                    class="v-select__item"
                    v-for="(item, index) in items"
                    :key="item[keyField] || index"
                    :class="{ 'v-select__item--selected': getValue(selectedItem) === getValue(item) }"
                    @click="selectOption(item)"
                >
                    <slot :item="item" name="option">
                        <!-- Содержимое по умолчанию -->
                        <div>{{ getDisplayValue(item) }}</div>
                    </slot>
                </li>
            </ul>
        </transition>
    </div>
</template>

<script>
import VSvg from '../VSvg/VSvg.vue';

import '../../../../images/sprite/arrow-down.svg';
import './VSelect.css';

export default {
    name: 'v-select',
    components: {
        VSvg,
    },
    model: {
        prop: 'value',
        event: 'change',
    },
    props: {
        value: {},
        name: {
            type: String,
        },
        items: {
            type: Array,
            default() {
                return [];
            },
        },
        keyField: {
            type: String,
        },
        valueKey: {
            type: String,
        },
        displayValue: {
            type: String,
        },
        placeholder: {
            type: String,
        },
        animation: {
            type: String,
            default: 'fade',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            isOpen: false,
            selectedItem: this.value !== null ? this.items.find(i => this.getValue(i) === this.value) : null,
        };
    },
    methods: {
        open() {
            if (this.disabled) {
                this.isOpen = false;
                return;
            }
            this.isOpen = !this.isOpen;
        },

        getDisplayValue(item) {
            return this.displayValue && item ? item[this.displayValue] : item;
        },

        getValue(item) {
            return this.valueKey && item ? item[this.valueKey] : item;
        },

        selectOption(item) {
            if (!this.isOpen || this.selectedItem === item) return;
            this.selectedItem = item;
            this.$emit('change', this.getValue(item));
            this.isOpen = false;
        },

        documentClick({ target }) {
            const { root } = this.$refs;
            if (root !== target && !root.contains(target)) this.isOpen = false;
        },
    },
    mounted() {
        document.addEventListener('click', this.documentClick);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.documentClick);
    },
};
</script>
