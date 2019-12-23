<template>
    <div class="v-suggestions">
        <label class="v-suggestions__label">
            <slot />
        </label>
        <input
            ref="input"
            v-bind="$attrs"
            v-model="query"
            type="text"
            autocomplete="false"
            class="v-suggestions-input"
            :class="extendedOptions.inputClass"
            :placeholder="extendedOptions.placeholder"
            @keydown="onKeyDown"
            @blur="hideItems"
            @focus="showItems = true"
        />
        <div class="error-message error" role="alert">
            <slot name="error" :error="error">
                {{ error }}
            </slot>
        </div>
        <div class="suggestions" v-if="items && items.length > 0 && showItems === true" @mousedown.prevent>
            <ul class="items">
                <li
                    class="item"
                    ref="item"
                    v-for="(item, index) in items"
                    :key="item[keyField] || index"
                    :class="{ 'is-active': index === activeItemIndex }"
                    @click.stop.prevent="selectItem(index)"
                >
                    <slot name="item" :item="item">
                        {{ item }}
                    </slot>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
import _debounce from 'lodash/debounce';
import './VSuggestion.css';

export default {
    name: 'v-suggestion',
    inheritAttributes: true,
    props: {
        options: {
            type: Object,
            default: {},
        },

        onInputChange: {
            type: Function,
            required: true,
        },

        onItemSelected: {
            type: Function,
        },

        selectedItem: {},

        value: {
            type: String,
            default: '',
        },

        sync: {
            type: Boolean,
            default: true,
        },

        keyField: {
            type: String,
        },

        selectedValuePath: {
            type: [String, Function],
            default: null,
        },

        error: String,
    },
    data() {
        const defaultOptions = {
            debounce: 0,
            placeholder: '',
            inputClass: 'input',
        };

        const extendedOptions = Object.assign({}, defaultOptions, this.options);

        return {
            extendedOptions,
            query: this.value,
            lastSetQuery: null,
            items: [],
            activeItemIndex: -1,
            showItems: false,
            internalSelectedItem: this.selectedItem,
        };
    },

    watch: {
        query(newValue, oldValue) {
            if (newValue === this.lastSetQuery) {
                this.lastSetQuery = null;
                return;
            }
            this.onQueryChanged(newValue);
            this.$emit('input', newValue);
        },

        value(newValue, oldValue) {
            this.setInputQuery(newValue);
        },

        selectedItem(value) {
            this.internalSelectedItem = value;
            this.onItemSelectedDefault(this.internalSelectedItem);
            if (!this.internalSelectedItem) this.onQueryChanged('');
        },
    },

    methods: {
        onItemSelectedDefault(item) {
            let value = '';
            if (item instanceof String) value = item;
            else {
                if (this.selectedValuePath instanceof String) value = item && item[this.selectedValuePath];
                else if (this.selectedValuePath instanceof Function) value = item && this.selectedValuePath(item);
            }

            this.$emit('input', value);
            this.setInputQuery(value);
            this.showItems = false;
        },

        hideItems() {
            setTimeout(() => {
                this.showItems = false;
                if (this.sync) this.onItemSelectedDefault(this.internalSelectedItem);
            }, 300);
        },

        showResults() {
            this.showItems = true;
        },

        setInputQuery(value) {
            this.lastSetQuery = value;
            this.query = value;
        },

        onKeyDown(e) {
            this.$emit('keyDown', e.keyCode);
            switch (e.keyCode) {
                case 40:
                    this.highlightItem('down');
                    e.preventDefault();
                    break;
                case 38:
                    this.highlightItem('up');
                    e.preventDefault();
                    break;
                case 13:
                    this.selectItem();
                    e.preventDefault();
                    break;
                case 27:
                    this.showItems = false;
                    e.preventDefault();
                    break;
                default:
                    return true;
            }
        },

        selectItem(index) {
            let item = null;
            if (typeof index === 'undefined') {
                if (this.activeItemIndex === -1) return;
                item = this.items[this.activeItemIndex];
            } else item = this.items[index];

            if (!item) return;
            this.internalSelectedItem = item;
            this.$emit('selected', this.internalSelectedItem);
            this.onItemSelectedDefault(this.internalSelectedItem);

            this.showItems = false;
        },

        highlightItem(direction) {
            if (this.items.length === 0) return;

            let selectedIndex = this.items.findIndex((item, index) => index === this.activeItemIndex);
            if (selectedIndex === -1) {
                // nothing selected
                if (direction === 'down') selectedIndex = 0;
                else selectedIndex = this.items.length - 1;
            } else {
                this.activeIndexItem = 0;
                if (direction === 'down') {
                    selectedIndex += 1;
                    if (selectedIndex === this.items.length) selectedIndex = 0;
                } else {
                    selectedIndex -= 1;
                    if (selectedIndex < 0) selectedIndex = this.items.length - 1;
                }
            }
            this.activeItemIndex = selectedIndex;
            const element = this.$refs.item[this.activeItemIndex];
            if (element) element.scrollIntoView();
        },

        setItems(items) {
            this.items = items;
            this.activeItemIndex = -1;
            this.showItems = true;
        },

        onQueryChanged(value) {
            const result = this.onInputChange(value);
            this.items = [];
            if (typeof result === 'undefined' || typeof result === 'boolean' || result === null) return;
            if (result instanceof Array) this.setItems(result);
            else if (typeof result.then === 'function') result.then(items => this.setItems(items));
        },

        onSuggestionClick() {
            this.showItems = true;
            this.$nextTick(() => this.$refs.input.focus());
        },
    },

    beforeMount() {
        this.onItemSelectedDefault(this.internalSelectedItem);
        if (this.extendedOptions.debounce !== 0)
            this.onQueryChanged = _debounce(this.onQueryChanged, this.extendedOptions.debounce);
    },
};
</script>
