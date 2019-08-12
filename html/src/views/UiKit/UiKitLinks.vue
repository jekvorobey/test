<template>
    <section class="section ui-kit-section">
        <h2 class="ui-kit-section__hl">
            Ссылки
        </h2>

        <v-link>В избранное</v-link>
        <br />
        <br />
        <v-link class="link--sm">В избранное</v-link>
    </section>
</template>
<script>
import VLink from '../../components/controls/VLink/VLink.vue';

export default {
    name: 'ui-kit-links',
    components: {
        VLink,
    },
};
</script>