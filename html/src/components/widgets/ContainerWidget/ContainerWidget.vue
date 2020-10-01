<template>
    <div class="container-widget">
        <div :class="{ 'container container--tablet-lg': !noContainer }">
            <component
                class="container-widget__child"
                v-for="child in children"
                :key="child.id"
                :is="child.component"
                v-bind="child.data"
            />
        </div>
    </div>
</template>

<script>
import './ContainerWidget.css';

export default {
    name: 'container-widget',

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
