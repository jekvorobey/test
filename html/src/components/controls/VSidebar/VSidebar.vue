<template>
    <div class="v-sidebar" v-sticky="options" ref="sidebar">
        <div class="v-sidebar__inner" :class="{ fill: fill }" ref="inner" data-v-sticky-inner>
            <slot name="sticky" />
        </div>
        <slot />
    </div>
</template>

<script>
import _debounce from 'lodash/debounce';
import './VSidebar.css';

export default {
    name: 'v-sidebar',

    props: {
        top: {
            type: [Number, String],
            default: 0,
        },

        bottom: {
            type: [Number, String],
            default: 0,
        },

        routeTitle: {
            type: String,
            default: ''
        },
    },

    data() {
        return {
            sHeight: 0,
            iHeight: 0,
        };
    },

    computed: {
        fill() {
            return this.sHeight <= this.iHeight;
        },

        options() {
            return {
                topSpacing: Number(this.top),
                bottomSpacing: Number(this.bottom),
                containerSelector: '[data-v-sticky-container]',
                innerWrapperSelector: '[data-v-sticky-inner]',
            };
        },
    },

    watch: {
        routeTitle() {
            this.sidebarСalc();
        },
    },

    methods: {
        sidebarСalc() {
            const { sidebar, inner } = this.$refs;

            const handler = _debounce((entries) => {
                for (const entry of entries) {
                    if (entry.contentRect) {
                        if (sidebar.parentNode && sidebar.parentNode.offsetHeight >= sidebar.offsetHeight)
                            this.sHeight = sidebar.parentNode.offsetHeight;
                        else if (entry.contentRect.height >= sidebar.offsetHeight) this.sHeight = entry.contentRect.height;
                        else this.sHeight = sidebar.offsetHeight;
                        this.iHeight = entry.contentRect.height;
                    }
                }
            }, 100);

            this.observer = new ResizeObserver(handler);
            this.observer.observe(inner);

            this.$nextTick(() => {
                this.sHeight = sidebar.offsetHeight;
                this.iHeight = inner.offsetHeight;
            });
        }
    },

    mounted() {
        this.sidebarСalc();
    },

    beforeDestroy() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    },
};
</script>
