<template>
    <div id="frisbuy-widget"></div>
</template>
<script>
export default {
    name: 'frisbuy-product-container',

    props: {
        offerId: {
            type: Number,
        },
    },

    methods: {
        init(offerId) {
            window.frisbuy.loadScript(
                `https://www.frisbuy.ru/fb/widget?embed_id=e9575241-9f3d-11ea-ba01-0242ac150002&sku=${offerId}`
            );
        },
    },

    mounted() {
        this.init(this.offerId);
    },
};
</script>