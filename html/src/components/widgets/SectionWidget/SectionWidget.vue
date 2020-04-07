<template>
    <section class="section section-widget">
        <div class="container">
            <component class="section-widget__title" :is="tag">
                {{ title }}
            </component>
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
export default {
    name: 'section-widget',

    props: {
        tag: {
            type: String,
            default:'h1'
        },

        title: {
            type: String,
            default: 'Title'
        },

        children: {
            type: Array,
            default: () => [],
        },
    },
}
</script>
