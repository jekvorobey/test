<template>
    <section class="section ui-kit-section">
        <!-- <custom-component component="div" ref="root" />
        <v-button @click="addComponent">Добавить</v-button>
        <input v-model="content" />
        <input v-model="component" /> -->
        <!-- <canvas-component /> -->
    </section>
</template>
<script>
// import Vue from 'vue';
// import VButton from '@controls/VButton/VButton.vue';
// import CustomComponent from '@components/blocks/CustomComponent/CustomComponent.vue';
// import CanvasComponent from '@components/blocks/CanvasComponent/CanvasComponent.vue';

// Vue.component(VButton.name, VButton);

export default {
    name: 'ui-kit-custom-component',

    components: {
        // VButton,
        // CustomComponent,
        // CanvasComponent,
    },

    data() {
        return {
            content: '',
            component: '',
        };
    },

    methods: {
        addComponent() {
            const { root } = this.$refs;
            root.addChild(this.component);
        },
    },
};
</script>
