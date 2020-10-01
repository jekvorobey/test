<template>
    <div class="grid-widget" :style="gridStyle">
        <component
            class="grid-widget__item"
            v-for="child in children"
            :key="child.id"
            :is="child.component"
            v-bind="child.data"
        />
    </div>
</template>

<script>
import { breakpoints } from '@enums';
import './GridWidget.css';

const defaultGridGap = 24;
const defaultColumns = 1;

export default {
    name: 'grid-widget',

    props: {
        columns: {
            type: Number,
            default: defaultColumns,
        },

        gap: {
            type: [Number, Array],
            default: defaultGridGap,
        },

        breakpoints: {
            type: Object,
            default: () => {},
        },

        children: {
            type: Array,
            default: () => [],
        },
    },

    computed: {
        defaultSettings() {
            const { gap, columns } = this;
            return { gap, columns };
        },

        settings() {
            const { isTablet, isTabletLg, isDesktop } = this;
            const { defaultSettings, breakpoints: cBreakpoints } = this;
            let finalSettings = { ...defaultSettings };

            if (isDesktop) finalSettings = { ...finalSettings, ...(cBreakpoints[breakpoints.desktop] || {}) };
            if (isTabletLg) finalSettings = { ...finalSettings, ...(cBreakpoints[breakpoints.tabletLg] || {}) };
            if (isTablet) finalSettings = { ...finalSettings, ...(cBreakpoints[breakpoints.tablet] || {}) };
            return finalSettings;
        },

        gridStyle() {
            const { settings, children } = this;
            const { columns, gap } = settings;
            const rows = Math.round(children.length / columns);

            return {
                'grid-template-columns': this.repeat('1fr', columns),
                'grid-template-rows': this.repeat('1fr', rows),
                gap: Array.isArray(gap) ? `${gap[0] || defaultGridGap}px ${gap[1] || defaultGridGap}px` : `${gap}px`,
            };
        },

        isDesktop() {
            return this.$mq.desktop;
        },

        isTabletLg() {
            return this.$mq.tabletLg;
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        repeat(str, count) {
            const array = [];
            for (let i = 0; i < count; ) array[i++] = str;
            return count > 0 ? array.join(' ') : undefined;
        },
    },
};
</script>
