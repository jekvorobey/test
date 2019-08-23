<template>
    <transition-group tag="div" class="v-accordion" :name="name" :appear="appear">
        <div
            v-for="(item, index) in items"
            class="v-accordion__item"
            :class="[
                { 'v-accordion__item--expanded': isExpanded(item) },
                { 'v-accordion__item--disabled': isDisabled(item) },
            ]"
            :key="item[keyField] || index"
        >
            <button
                class="v-accordion__item-btn"
                :id="`v-accordion-header${index}`"
                :aria-controls="`v-accordion-panel${index}`"
                :aria-expanded="isExpanded(item)"
                ref="header"
                @click="toggleSelection(item)"
                @keydown="headerKeyDown"
                :disabled="isDisabled(item)"
            >
                <slot
                    name="header"
                    :item="item"
                    :index="index"
                    :isExpanded="isExpanded(item)"
                    :isDisabled="isDisabled(item)"
                >
                    {{ item.title }}
                </slot>
                <v-svg :class="{ 'icon--rotate-deg180': isExpanded(item) }" name="arrow-down" width="24" height="24" />
            </button>
            <transition @before-enter="beforeEnter" @enter="enter" @leave="leave" :css="false">
                <div
                    class="v-accordion__item-panel"
                    role="region"
                    :id="`v-accordion-panel${index}`"
                    :aria-labelledby="`v-accordion-header${index}`"
                    :aria-hidden="!isExpanded(item)"
                    v-show="isExpanded(item)"
                >
                    <slot
                        name="content"
                        :item="item"
                        :index="index"
                        :isExpanded="isExpanded(item)"
                        :isDisabled="isDisabled(item)"
                        :toggleSelection="toggleSelection"
                    >
                        <span>{{ item.content }}</span>
                    </slot>
                </div>
            </transition>
        </div>
    </transition-group>
</template>

<script>
import VSvg from '../VSvg/VSvg.vue';
import './VAccordion.css';

export default {
    name: 'v-accordion',
    components: {
        VSvg,
    },
    props: {
        keyField: String,
        isSingle: {
            type: Boolean,
            default: true,
        },
        items: {
            type: Array,
            default() {
                return [];
            },
        },
        itemDisabled: {
            type: Function,
            default: null,
        },
        itemExpanded: {
            type: Function,
            default: null,
        },
        itemToggled: {
            type: Function,
            default: null,
        },
        name: {
            type: String,
        },
        appear: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            internal_expanded: this.items.find(item => item.isExpanded),
        };
    },
    methods: {
        beforeEnter(el) {
            el.style.height = 0;
        },

        enter(el, done) {
            el.style.height = el.scrollHeight + 'px';
            setTimeout(done, 250);
        },

        leave(el, done) {
            el.style.height = 0;
            setTimeout(done, 150);
        },

        toggleSelection(item) {
            if (this.itemToggled) {
                this.itemToggled(item);
                this.$forceUpdate();
                return;
            }
            this.internal_expanded = this.internal_expanded !== item ? item : null;
        },

        isExpanded(item) {
            return this.itemExpanded ? this.itemExpanded(item) : this.internal_expanded === item;
        },

        isDisabled(item) {
            return this.itemDisabled ? this.itemDisabled(item) : false;
        },

        headerKeyDown(e) {
            const { target, ctrlKey } = e;
            const { length } = this.$refs.header;
            const key = e.which.toString();

            // Up/ Down arrow and Control + Page Up/ Page Down keyboard operations
            // 33 = Page Up, 34 = Page Down
            // 38 = Up, 40 = Down
            if (key.match(/38|40/) || (key.match(/33|34/) && ctrlKey)) {
                const index = this.$refs.header.indexOf(target);
                const direction = key.match(/34|40/) ? 1 : -1;
                const newIndex = (index + length + direction) % length;
                this.$refs.header[newIndex].focus();
                e.preventDefault();
            } else if (key.match(/35|36/)) {
                // 35 = End, 36 = Home keyboard operations
                switch (key) {
                    // Go to first accordion
                    case '36':
                        this.$refs.header[0].focus();
                        break;
                    // Go to last accordion
                    case '35':
                        this.$refs.header[length - 1].focus();
                        break;
                }
                e.preventDefault();
            }
        },
    },
};
</script>
