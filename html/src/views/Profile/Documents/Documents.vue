<template>
    <section class="section documents-view">
        <div class="container container--tablet-lg">
            <div class="documents-view__header">
                <h2 class="documents-view__hl">{{ $t(`profile.routes.${$route.name}`) }}</h2>
                <v-select
                    class="documents-view__sort"
                    v-model="selectedSortType"
                    :options="sortTypes"
                    :searchable="false"
                    :show-labels="false"
                />
            </div>

            <ul class="documents-view__list">
                <document-card
                    class="documents-view__list-item"
                    v-for="document in documents"
                    :key="document.id"
                    :type="document.type"
                    :name="document.name"
                    :size="document.size"
                    :ext="document.ext"
                />
            </ul>
        </div>
    </section>
</template>

<script>
import VSelect from '../../../components/controls/VSelect/VSelect.vue';
import DocumentCard from '../../../components/DocumentCard/DocumentCard.vue';

import './Documents.css';

export default {
    name: 'documents',

    components: {
        VSelect,

        DocumentCard,
    },

    data() {
        const sortTypes = ['Всё время'];

        return {
            selectedSortType: sortTypes[0],
            sortTypes,

            documents: [
                {
                    id: 1,
                    type: 'Контракт',
                    name: 'Контракт от 03.09.2019 — Соколов Владимир Аркадьевич',
                    ext: 'docx',
                    size: '1,6 Мб',
                },
                {
                    id: 2,
                    type: 'Акт',
                    name: 'Акт №4587-568722',
                    ext: 'docx',
                    size: '1,3 Мб',
                },
                {
                    id: 3,
                    type: 'Отчет',
                    name: 'Отчет по зачислению/списанию средств на счет амбассадора',
                    ext: 'docx',
                    size: '1,6 Мб',
                },
                {
                    id: 4,
                    type: 'Акт',
                    name: 'Акт №4587-568722',
                    ext: 'docx',
                    size: '3,6 Мб',
                },
                {
                    id: 5,
                    type: 'Отчет',
                    name: 'Отчет по зачислению/списанию средств на счет амбассадора',
                    ext: 'docx',
                    size: '1,6 Мб',
                },
            ],
        };
    },

    computed: {},

    watch: {},

    methods: {},
};
</script>
