<template>
    <transition-group tag="div" class="v-accordion" :name="name" :appear="appear">
        <div
            v-for="(item, index) in items"
            class="v-accordion__item"
            :class="[
                { 'v-accordion__item--expanded': internal_expanded === item },
                { 'v-accordion__item--disabled': itemDisabled(item) },
            ]"
            :key="item[keyField] || index"
        >
            <button
                class="v-accordion__item-btn"
                :id="`v-accordion-header${index}`"
                :aria-controls="`v-accordion-panel${index}`"
                :aria-expanded="internal_expanded === item"
                ref="header"
                @click="toggleSelection(item)"
                @keydown="headerKeyDown"
                :disabled="itemDisabled(item)"
            >
                <slot
                    name="header"
                    :item="item"
                    :index="index"
                    :isExpanded="internal_expanded === item"
                    :isDisabled="itemDisabled(item)"
                >
                    {{ item.title }}
                </slot>
                <v-svg
                    :class="{ 'icon--rotate-deg180': internal_expanded === item }"
                    name="arrow-down"
                    width="24"
                    height="24"
                />
            </button>
            <transition @before-enter="beforeEnter" @enter="enter" @leave="leave" :css="false">
                <div
                    class="v-accordion__item-panel"
                    role="region"
                    :id="`v-accordion-panel${index}`"
                    :aria-labelledby="`v-accordion-header${index}`"
                    :aria-hidden="internal_expanded !== item"
                    v-show="internal_expanded === item"
                >
                    <slot
                        name="content"
                        :item="item"
                        :index="index"
                        :isExpanded="internal_expanded === item"
                        :isDisabled="itemDisabled(item)"
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
import { setTimeout } from 'timers';

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
            default: () => false,
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
            internal_expanded: null,
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
            this.internal_expanded = this.internal_expanded !== item ? item : null;
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
