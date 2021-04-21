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

        author: {
            type: String,
        },
    },

    mounted() {
        if (typeof window.frisbuy.updateGalleryData === 'function') {
            if (this.skuId) {
                window.frisbuy.updateGalleryData({ sku: this.skuId }, 'e9575241-9f3d-11ea-ba01-0242ac150002');
            } else if (this.author) {
                window.frisbuy.updateGalleryData({ author: this.author }, 'aebd8bf5-9f42-11ea-ba01-0242ac150002');
            }
        }
    },
};
</script>
