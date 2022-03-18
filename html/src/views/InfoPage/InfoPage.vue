<template>
    <div class="container info-pages-block">
        <h1 class="info-pages-block__title">
            {{ landing.name }}
        </h1>

        <div class="info-pages-block__content">
            <div v-html="landing.content"></div>
        </div>
    </div>
</template>

<script>
import metaMixin from '@plugins/meta';
import { mapState } from 'vuex';
import { getLanding } from '@api';

export default {
    name: 'info-page',
    mixins: [metaMixin],
    props: {
        page: String,
        draft: Boolean,
    },
    data() {
        return {
            landing: {},
        };
    },
    computed: {
        ...mapState('route', {
            page: (state) => state.params.page,
            draft: (state) => state.query.draft,
        }),
    },
    beforeMount() {
        getLanding(this.page, this.draft).then((response) => {
            this.landing = response;
        });
    },
};
</script>
