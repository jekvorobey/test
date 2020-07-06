<template>
    <div :id="id"></div>
</template>
<script>
export default {
    name: 'frisbuy-product-container',

    props: {
        id: {
            type: String,
            default: 'frisbuy-widget',
        },

        script: {
            type: String,
        },
    },

    mounted() {
        if (this.script) window.frisbuy.loadScript(this.script);
    },
};
</script>