<template>
    <section class="section documents-view">
        <h2 class="documents-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>
    </section>
</template>

<script>
import VLink from '../../../components/controls/VLink/VLink.vue';
import VButton from '../../../components/controls/VButton/VButton.vue';
import VInput from '../../../components/controls/VInput/VInput.vue';

import './Documents.css';

export default {
    name: 'documents',

    components: {
        VLink,
        VButton,
        VInput,
    },

    data() {
        return {};
    },

    computed: {},

    watch: {},

    methods: {},
};
</script>
