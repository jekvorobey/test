<template>
    <section class="section ui-kit-section">
        <h2 class="ui-kit-section__hl">Пагинация</h2>
        <p class="text-grey">Мастер пагинация</p>
        <v-pagination v-model="page" :page-count="pagesCount" />
        <p>Выбрана страница: {{ page }}</p>
    </section>
</template>
<script>
import VPagination from '@controls/VPagination/VPagination.vue';

export default {
    name: 'ui-kit-paginations',
    components: {
        VPagination,
    },
    data() {
        return {
            page: 1,
            pagesCount: 20,
        };
    },
};
</script>
