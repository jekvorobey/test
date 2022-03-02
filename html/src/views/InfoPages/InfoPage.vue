<template>
    <div class="container info-pages-block">
        <h1 class="info-pages-block__title">
            {{ landing.name }}
        </h1>

        <div class="info-pages-block__content">
            <div v-html="landing.widgets"></div>
        </div>
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
