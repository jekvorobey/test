<template>
    <v-picture class="picture-widget" v-if="content" :image="content" width="600" height="320" />
</template>

<script>
import VPicture from '@controls/VPicture/VPicture.vue';
import './PictureWidget.css';

export default {
    name: 'picture-widget',

    components: {
        VPicture,
    },

    props: {
        content: {
            type: String,
            default: '',
        },
    },
};
</script>
