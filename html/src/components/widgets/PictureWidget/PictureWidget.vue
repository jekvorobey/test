<template>
    <div class="picture-widget">
        <v-picture class="picture-widget__picture" v-if="content" :image="content" />
    </div>
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
