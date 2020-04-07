<template>
    <v-picture class="picture-widget" v-if="content" :image="content" />
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
        }
    }
}
</script>
