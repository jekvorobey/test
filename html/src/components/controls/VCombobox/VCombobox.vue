<template>
    <div
        ref="root"
        class="v-combobox"
        :class="[{ 'is-disabled': disabled }, { 'is-open': shown }, { 'is-focus': isFocused }]"
    >
        <select class="v-combobox__select" :disabled="disabled" :name="name">
            <option selected v-if="selectedItem_internal" :value="getValue(selectedItem_internal)">
                {{ getDisplayValue(selectedItem_internal) }}
            </option>
        </select>
        <label :id="`v-combobox-label${_uid}`" :for="`v-combobox__input${_uid}`" class="v-combobox__label">
            <slot />
        </label>
        <div
            role="combobox"
            class="v-combobox__container"
            :class="[{ 'is-open': shown }, { 'is-focus': isFocused }]"
            :id="`v-combobox${_uid}`"
            :aria-expanded="false"
            :aria-owns="`v-combobox-listbox${_uid}`"
            aria-haspopup="listbox"
        >
            <input
                ref="input"
                class="v-combobox__input"
                v-model="text"
                :class="[{ 'is-open': shown }, { 'is-focus': isFocused }, { 'is-invalid': error }]"
                :id="`v-combobox__input${_uid}`"
                :aria-activedescendant="activeIndex !== -1 ? `v-combobox__item${activeIndex}` : ''"
                :aria-describedby="`v-combobox__input${_uid}-alert`"
                :disabled="disabled"
                :placeholder="placeholder"
                @focus="onFilterFocus"
                @keydown="onFilterKeydown"
                @keyup="onFilterKeyup"
            />
            <v-button
                tabindex="-1"
                class="btn--transparent v-combobox__btn"
                :class="{ 'is-open': shown }"
                :disabled="disabled"
                @click="onBtnClick"
                @mousedown.prevent
            >
                <v-svg name="arrow-down" />
            </v-button>
            <transition :name="animation">
                <div class="v-combobox__popup" v-show="shown" :class="{ 'is-invalid': error }">
                    <transition name="fade" mode="out-in">
                        <div v-if="!items || items.length === 0" class="v-combobox__listbox v-combobox__listbox--empty">
                            <slot name="empty" />
                        </div>
                        <transition-group
                            v-else
                            role="listbox"
                            ref="listbox"
                            tag="ul"
                            class="v-combobox__listbox"
                            :id="`v-combobox__listbox${_uid}`"
                            :class="{ 'is-hidden': !shown }"
                            :aria-labelledby="`v-combobox-label${_uid}`"
                            name="fade"
                        >
                            <li
                                class="v-combobox__item"
                                v-for="(item, index) in items"
                                ref="item"
                                :id="`v-combobox__item${index}`"
                                :key="item[keyField] || index"
                                :class="{
                                    'is-selected': selectedItem_internal === item,
                                    'is-active': index === activeIndex,
                                }"
                                :aria-selected="selectedItem_internal === item"
                                @mousedown.prevent
                                @click="onItemClick(item)"
                            >
                                <slot
                                    name="item"
                                    :item="item"
                                    :displayValue="getDisplayValue(item)"
                                    :filter="text || ''"
                                >
                                    <!-- Содержимое по умолчанию -->
                                    <div>{{ getDisplayValue(item) }}</div>
                                </slot>
                            </li>
                        </transition-group>
                    </transition>
                </div>
            </transition>
        </div>
        <div :id="`v-combobox__input${_uid}-alert`" class="error-message v-combobox__error" role="alert">
            <slot name="error" :error="error">
                {{ error }}
            </slot>
        </div>
    </div>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VButton from '@controls/VButton/VButton.vue';

import '@images/sprite/arrow-down.svg';
import './VCombobox.css';

const keys = {
    BACKSPACE: 8,
    TAB: 9,
    ENTER: 13,
    ESC: 27,
    END: 35,
    HOME: 36,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    DELETE: 46,
    RETURN: 176,
};

export default {
    name: 'v-combobox',
    components: {
        VSvg,
        VButton,
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
        emptyValue: { default: '' },
        keyField: {
            type: String,
        },
        keyValuePath: {
            type: String,
        },
        displayValuePath: {
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
        isSyncronized: {
            type: Boolean,
            default: false,
        },
        error: String,
    },
    data() {
        return {
            isFocused: false,
            shown: false,
            selectedItem_internal: this.selectedItem,
            text: this.value,
            activeIndex: this.items.indexOf(this.selectedItem),
        };
    },
    watch: {
        value(value) {
            this.text = value;
        },
        text(value) {
            this.$emit('filter', value);
        },
    },
    methods: {
        getValueByPath(path, item) {
            if (path && item) {
                const choices = path.split('|');
                for (let c = 0; c < choices.length; c++) {
                    const pathArray = choices[c].split('.');
                    let value = item;
                    try {
                        for (let i = 0; i < pathArray.length; i++) value = value[pathArray[i]];
                        if (!value) continue;
                        return value;
                    } catch (error) {
                        console.error(error);
                        continue;
                    }
                }
            }
            return item;
        },

        getDisplayValue(item) {
            return this.getValueByPath(this.displayValuePath, item);
        },

        getValue(item) {
            if (!item) return this.emptyValue;
            return this.getValueByPath(this.keyValuePath, item);
        },

        selectItem(item) {
            const value = this.getValue(item);
            this.selectedItem_internal = item;
            this.text = value;
            this.$emit('change', value);
            this.$emit('selectionChanged', this.selectedItem_internal);
            this.hideListbox();
        },

        revert() {
            if (this.isSyncronized) this.text = this.getValue(this.selectedItem_internal);
        },

        onFilterKeyup(e) {
            let key = e.which || e.keyCode;

            switch (key) {
                case keys.UP:
                case keys.DOWN:
                case keys.ESC:
                case keys.RETURN:
                    e.preventDefault();
                    return;
            }

            if (this.hasInlineAutocomplete) {
                switch (key) {
                    case keys.BACKSPACE:
                        return;
                    default:
                        this.autocompleteItem();
                }
            }
        },

        onFilterKeydown(e) {
            this.setActiveItem(e);
        },

        onFilterFocus(e) {
            this.isFocused = true;
        },

        onItemClick(item) {
            this.selectItem(item);
            this.$refs.input.focus();
        },

        onBtnClick(e) {
            this.shown = !this.shown;
            this.$refs.input.focus();
        },

        setActiveItem(e) {
            let key = e.which || e.keyCode;
            let { activeIndex } = this;

            let activeItem = null;

            switch (key) {
                case keys.ESC:
                    e.stopPropagation();
                    this.hideListbox();
                    return;
                case keys.UP:
                    {
                        if (!this.shown) return;
                        if (activeIndex <= 0) activeIndex = this.items.length - 1;
                        else activeIndex -= 1;

                        if (this.$refs.item && this.$refs.item[activeIndex])
                            this.$refs.listbox.$el.scrollTop = this.$refs.item[activeIndex].offsetTop;
                    }
                    break;
                case keys.DOWN:
                    {
                        if (!this.shown) this.shown = true;
                        if (activeIndex === -1 || activeIndex >= this.items.length - 1) activeIndex = 0;
                        else activeIndex += 1;

                        if (this.$refs.item && this.$refs.item[activeIndex])
                            this.$refs.listbox.$el.scrollTop = this.$refs.item[activeIndex].offsetTop;
                    }
                    break;
                case keys.RETURN:
                case keys.ENTER:
                    e.preventDefault();
                    activeItem = this.getItemAt(activeIndex);
                    this.selectItem(activeItem);
                    return;
                case keys.TAB:
                    this.checkSelection();
                    this.hideListbox();
                    this.isFocused = false;
                    return;
                default:
                    if (!this.shown) this.shown = true;
                    return;
            }
            e.preventDefault();
            this.activeIndex = activeIndex;
        },

        getItemAt(index) {
            return this.items[index];
        },

        checkHide(e) {
            if (e.target === this.$refs.root || this.$refs.root.contains(e.target)) return;
            this.isFocused = false;
            this.hideListbox();
        },

        hideListbox() {
            this.shown = false;
        },

        checkSelection() {
            if (this.activeIndex < 0 || this.text) return;

            const activeItem = this.getItemAt(this.activeIndex);
            this.selectItem(activeItem);
        },

        autocompleteItem() {
            const autocompletedItem = this.getItemAt(this.activeIndex);

            if (!autocompletedItem || !this.text) {
                return;
            }

            const autocomplete = this.getDisplayValue(autocompletedItem);
            if (this.text !== autocomplete) {
                const { length } = this.text;
                this.text = autocomplete;
                this.$refs.input.setSelectionRange(length, autocomplete.length);
            }
        },
    },

    mounted() {
        document.addEventListener('click', this.checkHide);
    },
    beforeDestroy() {
        document.removeEventListener('click', this.checkHide);
    },
};
</script>
