<template>
    <div class="container info-pages-block">
        <h1 class="info-pages-block__title">
            {{ landing.title }}
        </h1>

        <div v-html="landing.widgets"></div>
    </div>
</template>

<script>
import metaMixin from '@plugins/meta';

export default {
    name: 'info-page',
    mixins: [metaMixin],
    props: {
        landing: Object,
    },
};
</script>
