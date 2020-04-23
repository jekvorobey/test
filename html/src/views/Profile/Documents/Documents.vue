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
import VSelect from '@controls/VSelect/VSelect.vue';
import DocumentCard from '@components/DocumentCard/DocumentCard.vue';

import { $store, $progress, $logger } from '@services';
import { mapState, mapActions, mapGetters } from 'vuex';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';

import { NAME as DOCUMENTS_MODULE, ITEMS, FILTERS } from '@store/modules/Profile/modules/Documents';
import { SET_LOAD_PATH, FETCH_DOCUMENTS, FETCH_DOCUMENTS_DATA } from '@store/modules/Profile/modules/Documents/actions';

import { formatFileSize } from '@util/file';

const DOCUMENTS_MODULE_PATH = `${PROFILE_MODULE}/${DOCUMENTS_MODULE}`;

import './Documents.css';

export default {
    name: 'documents',

    components: {
        VSelect,

        DocumentCard,
    },

    data() {
        const sortTypes = ['Все типы'];

        return {
            selectedSortType: sortTypes[0],
            sortTypes,
        };
    },

    computed: {
        ...mapState(DOCUMENTS_MODULE_PATH, [ITEMS, FILTERS]),

        documents() {
            return this.items.map(item => {
                return {
                    id: item.id,
                    type: this.filters.types[item.type],
                    name: item.name.replace(/\.[0-9a-z]{1,6}/g, ''),
                    ext: item.ext,
                    size: formatFileSize(item.size),
                };
            });
        },
    },

    watch: {},

    methods: {
        ...mapActions(DOCUMENTS_MODULE_PATH, [FETCH_DOCUMENTS_DATA, FETCH_DOCUMENTS]),
    },

    beforeRouteEnter(to, from, next) {
        const { fullPath } = to;

        const { loadPath } = $store.state[PROFILE_MODULE][DOCUMENTS_MODULE];

        // если все загружено, пропускаем
        if (fullPath === loadPath) next();
        else {
            $progress.start();
            $store
                .dispatch(`${DOCUMENTS_MODULE_PATH}/${FETCH_DOCUMENTS_DATA}`)
                .then(() => {
                    $store.dispatch(`${DOCUMENTS_MODULE_PATH}/${SET_LOAD_PATH}`, fullPath);
                    next(vm => $progress.finish());
                })
                .catch(error => {
                    next(vm => $progress.fail());
                    $logger.error(error);
                });
        }
    },
};
</script>
