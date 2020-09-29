<template>
    <v-html class="html-text-widget" v-html="content" />
</template>

<script>
import VHtml from '@controls/VHtml/VHtml.vue';
import './HtmlTextWidget.css';

export default {
    name: 'html-text-widget',

    components: {
        VHtml,
    },

    props: {
        content: {
            type: String,
            default: '',
        },
    },
};
</script>
