<template>
    <iframe class="v-youtube" :src="src" />
</template>

<script>
import { generateYoutubeVideoSourcePath } from '@util/file';
import './VYoutube.css';

export default {
    name: 'v-youtube',

    props: {
        code: {
            type: String,
            required: true,
        },

        autoplay: {
            type: Boolean,
            default: false,
        },

        loop: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        src() {
            const { code, autoplay, loop } = this;
            return generateYoutubeVideoSourcePath(code, autoplay, loop);
        },
    },
};
</script>
