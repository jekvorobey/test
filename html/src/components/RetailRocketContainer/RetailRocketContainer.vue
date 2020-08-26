<template>
    <div class="retail-rocket-container" />
</template>

<script>
export default {
    name: 'retail-rocket-container',

    props: {
        forceRender: {
            type: Boolean,
            default: false,
        },
    },

    mounted() {
        const { forceRender } = this;
        if (forceRender && typeof retailrocket !== 'undefined') retailrocket.markup.render();
    },
};
</script>
