<template>
    <component :is="component">
        <component :is="child" v-for="(child, index) in children" :key="index" />
    </component>
</template>

<script>
export default {
    name: 'custom-component',
    props: {
        component: {
            type: [String, Object],
        },
    },

    data() {
        return {
            children: [],
        };
    },

    methods: {
        addChild(child) {
            this.children.push(child);
        },

        removeChild(child) {
            const index = this.children.indexOf(child);
            if (index < 0) return;
            this.children.splice(index, 1);
        },
    },
};
</script>