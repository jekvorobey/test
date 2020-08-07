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
    },

    computed: {
        src() {
            const { code } = this;
            return generateYoutubeVideoSourcePath(code);
        },
    },
};
</script>
