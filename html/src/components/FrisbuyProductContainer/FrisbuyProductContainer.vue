<template>
    <div :id="id"></div>
</template>
<script>
import { $store } from '@services';
import { CAN_BUY, NAME as AUTH_MODULE, USER } from '@store/modules/Auth';

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

    computed: {
        user() {
            return $store.state[AUTH_MODULE][USER];
        },
        canBuy() {
            return this.user && this.user[CAN_BUY];
        },
    },

    mounted() {
        if (typeof window.frisbuy.updateGalleryData === 'function') {
            if (this.skuId) {
                window.frisbuy.updateGalleryData(
                    { sku: this.skuId, custom_param_is_auth: this.user ? 1 : 0, custom_param_is_user_moderated: this.canBuy ? 1 : 0 },
                    'e9575241-9f3d-11ea-ba01-0242ac150002'
                );
            } else if (this.author) {
                window.frisbuy.updateGalleryData(
                    { author: this.author, custom_param_is_auth: this.user ? 1 : 0, custom_param_is_user_moderated: this.canBuy ? 1 : 0 },
                    'aebd8bf5-9f42-11ea-ba01-0242ac150002'
                );
            }
        }
    },
};
</script>
