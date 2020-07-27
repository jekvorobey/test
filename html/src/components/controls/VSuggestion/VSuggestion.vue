<template>
    <div class="v-suggestions" :class="{ 'v-suggestions--invalid': error, 'v-suggestions--disabled': disabled }">
        <label class="v-suggestions__label">
            <slot />
        </label>
        <input
            ref="input"
            v-bind="$attrs"
            v-model="query"
            type="text"
            autocomplete="false"
            class="v-suggestions__input"
            :class="extendedOptions.inputClass"
            :placeholder="extendedOptions.placeholder"
            :disabled="disabled"
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
            default() {
                return {};
            },
        },

        items: {
            type: Array,
            default() {
                return [];
            },
        },

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

        disabled: {
            type: Boolean,
            default: false,
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
            activeItemIndex: -1,
            showItems: false,
        };
    },

    watch: {
        query(newValue, oldValue) {
            if (newValue === this.lastSetQuery) {
                this.lastSetQuery = null;
                return;
            }
            this.$emit('input', newValue);
        },

        value(newValue, oldValue) {
            this.setInputQuery(newValue);
        },

        items() {
            this.activeItemIndex = -1;
            this.showItems = true;
        },
    },

    methods: {
        hideItems() {
            setTimeout(() => {
                this.showItems = false;
                if (this.sync) this.setInputQuery(this.value);
            }, 0);
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
            this.$emit('selected', item);
            this.hideItems();
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

        onSuggestionClick() {
            this.showItems = true;
            this.$nextTick(() => this.$refs.input.focus());
        },
    },

    beforeMount() {
        // if (this.extendedOptions.debounce !== 0)
        //     this.onQueryChanged = _debounce(this.onQueryChanged, this.extendedOptions.debounce);
    },
};
</script>
