<template>
    <section class="section ui-kit-section">
        <h2 class="ui-kit-section__hl">
            Ссылки
        </h2>

        <p class="text-grey">Обычная ссылка</p>
        <a href="#">Обычная ссылка</a>
        <br />
        <br />
        <p class="text-grey">Компонент VLink</p>
        <v-link href="#">В избранное</v-link>
        <br />
        <br />
        <p class="text-grey">.link.link--sm</p>
        <v-link class="link--sm" href="#">В избранное</v-link>
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