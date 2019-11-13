<template>
    <div class="v-tabs">
        <div class="v-tabs__header" role="tablist" :aria-orientation="orientation" :aria-label="ariaLabel">
            <button
                class="v-tabs__header-item"
                type="button"
                role="tab"
                v-for="(item, index) in items"
                :class="{ 'is-active': internal_active_tab === index, 'is-disabled': item.disabled === true }"
                :aria-selected="internal_active_tab === index"
                :aria-disabled="item.disabled === true"
                :aria-controls="`v-tab-${item[keyField] || index}`"
                :ref="`v-tab-${item[keyField] || index}`"
                :id="`v-tab-${item[keyField] || index}`"
                :key="item[keyField] || index"
                :tabindex="internal_active_tab === index ? 0 : -1"
                @click="onTabClick(index)"
                @keydown="onTabKeyDown"
                @keyup="onTabKeyUp"
                @focus="e => onTabFocus(e, index)"
                :disabled="item.disabled === true"
            >
                <slot name="header" :item="item" :index="index" :active="internal_active_tab === index">
                    {{ item.title }}
                </slot>
            </button>
        </div>
        <div
            class="v-tabs__panel"
            role="tabpanel"
            v-if="selectedItem"
            :id="`v-tab--panel${selectedItem[keyField] || internal_active_tab}`"
            :aria-labelledby="`v-tab-${selectedItem[keyField] || internal_active_tab}`"
        >
            <slot name="panel" :item="selectedItem" :index="internal_active_tab">
                {{ selectedItem[keyValue] }}
            </slot>
        </div>
    </div>
</template>

<script>
import './VTabs.css';

const keys = {
    end: 35,
    home: 36,
    left: 37,
    up: 38,
    right: 39,
    down: 40,
    delete: 46,
};

const orientation = {
    horizontal: 'horizontal',
    vertical: 'vertical',
};

export default {
    name: 'v-tabs',

    props: {
        ariaLabel: {
            type: String,
        },

        keyField: {
            type: String,
        },

        keyValue: {
            type: String,
        },

        items: {
            type: Array,
            default: [],
        },

        activeTab: {
            type: Number,
            default: 0,
        },

        orientation: {
            type: String,
            default: orientation.horizontal,
            validator(val) {
                return Object.values(orientation).indexOf(val) !== -1;
            },
        },
    },

    data() {
        return {
            internal_active_tab: this.activeTab,
        };
    },

    computed: {
        selectedItem() {
            if (this.items.length > 0 && !this.items[this.internal_active_tab]) this.activateTab(0, true);
            return this.items[this.internal_active_tab];
        },
    },

    watch: {
        activeTab(val) {
            this.activateTab(val, false);
        },
    },

    methods: {
        getTab(item) {
            return this.$refs[`v-tab-${item[this.keyField] || this.items.indexOf(item)}`][0];
        },

        activateTab(index, focus) {
            if (this.internal_active_tab !== index) {
                this.internal_active_tab = index;
                this.$emit('update:activeTab', this.internal_active_tab);
            }

            // Set focus when required
            if (focus) {
                const selectedTab = this.getTab(this.selectedItem);
                if (selectedTab && selectedTab !== document.activeElement) selectedTab.focus();
            }
        },

        onTabClick(index) {
            this.activateTab(index, false);
        },

        onTabFocus(e, index) {
            const { target } = e;
            const delay = 300;
            if (target !== document.activeElement) setTimeout(this.checkTabFocus, delay, target, index);
        },

        // Handle keydown on tabs
        onTabKeyDown(e) {
            const { keyCode } = e;

            switch (keyCode) {
                case keys.end:
                    e.preventDefault();
                    // Activate last tab
                    this.activateTab(this.items.length - 1);
                    break;
                case keys.home:
                    e.preventDefault();
                    // Activate first tab
                    this.activateTab(0);
                    break;

                // Up and down are in keydown
                // because we need to prevent page scroll >:)
                case keys.up:
                case keys.down:
                    this.determineOrientation(e);
                    break;
            }
        },

        // Handle keyup on tabs
        onTabKeyUp(e) {
            const { keyCode } = e;

            switch (keyCode) {
                case keys.left:
                case keys.right:
                    this.determineOrientation(e);
                    break;
                case keys.delete:
                    this.determineDeletable(e);
                    break;
            }
        },

        // When a tablistвЂ™s aria-orientation is set to vertical,
        // only up and down arrow should function.
        // In all other cases only left and right arrow function.
        determineOrientation(e) {
            const { keyCode } = e;
            let proceed = false;

            if (this.orientation === orientation.vertical) {
                switch (keyCode) {
                    case keys.up:
                    case keys.down:
                        e.preventDefault();
                        proceed = true;
                        break;
                }
            } else {
                switch (keyCode) {
                    case keys.left:
                    case keys.right:
                        proceed = true;
                        break;
                }
            }

            if (proceed) this.switchTabOnArrowPress(e);
        },

        // Either focus the next, previous, first, or last tab
        // depening on key pressed
        switchTabOnArrowPress(e) {
            const { keyCode } = e;
            let nextItem = null;
            switch (keyCode) {
                case keys.up:
                case keys.left:
                    if (this.internal_active_tab > 0) {
                        for (let i = this.internal_active_tab; i >= 0; --i) {
                            nextItem = this.items[i];
                            if (nextItem.disabled) continue;
                            else this.activateTab(i, true);
                        }
                    } else this.focusFirstTab();
                    break;
                case keys.down:
                case keys.right:
                    if (this.internal_active_tab > this.items.length - 1) {
                        for (let i = this.internal_active_tab; i < this.items.length; ++i) {
                            nextItem = this.items[i];
                            if (nextItem.disabled) continue;
                            else this.activateTab(i, true);
                        }
                    } else this.focusLastTab();
                    break;
            }
        },

        // Only activate tab on focus if it still has focus after the delay
        checkTabFocus(target, index) {
            if (target === document.activeElement) this.activateTab(index, false);
        },

        focusFirstTab() {
            this.activateTab(0, true);
        },

        focusLastTab() {
            this.activateTab(this.items.length - 1, true);
        },
    },
};
</script>
