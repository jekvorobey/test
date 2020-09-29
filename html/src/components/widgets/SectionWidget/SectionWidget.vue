<template>
    <section class="section section-widget">
        <div :class="{ 'container container--tablet': !noContainer }">
            <component
                class="section-widget__child"
                v-for="child in children"
                :key="child.id"
                :is="child.component"
                v-bind="child.data"
            />
        </div>
    </section>
</template>

<script>
import './SectionWidget.css';

export default {
    name: 'section-widget',

    props: {
        noContainer: {
            type: Boolean,
            default: false,
        },

        children: {
            type: Array,
            default: () => [],
        },
    },
};
</script>
