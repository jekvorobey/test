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

        skuId: {
            type: Number,
        },
    },

    mounted() {
        if (this.script) window.frisbuy.loadScript(this.script);
        if (this.skuId && typeof window.frisbuy.updateGalleryData === 'function') window.frisbuy.updateGalleryData({ sku: this.skuId }, 'e9575241-9f3d-11ea-ba01-0242ac150002')
    },
};
</script>
