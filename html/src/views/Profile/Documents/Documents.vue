<template>
    <section class="section documents-view">
        <div class="container container--tablet-lg">
            <div class="documents-view__header">
                <h2 class="documents-view__hl">
                    {{ pageTitle }}
                </h2>

                <v-select
                    class="documents-view__sort"
                    label="title"
                    track-by="id"
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
                    :href="document.href"
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

import { generateFileOriginalPath, formatFileSize } from '@util/file';
import { documentsTypes } from '@enums/documents';
import metaMixin from '@plugins/meta';
import './Documents.css';

const DOCUMENTS_MODULE_PATH = `${PROFILE_MODULE}/${DOCUMENTS_MODULE}`;

export default {
    name: 'documents',
    mixins: [metaMixin],
    
    components: {
        VSelect,

        DocumentCard,
    },

    metaInfo() {
        const { pageTitle } = this;
        return {
            title: pageTitle,
        };
    },

    data() {
        const sortTypes = [
            { id: 1, title: 'Все типы' },
            { id: 2, title: 'Контракты', field: documentsTypes.CONTRACT },
            { id: 3, title: 'Отчеты', field: documentsTypes.REPORT },
            { id: 4, title: 'Акты', field: documentsTypes.ACT },
        ];

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
                    href: generateFileOriginalPath(item.file_id),
                };
            });
        },

        pageTitle() {
            return this.$t(`profile.routes.${this.$route.name}`);
        },
    },

    watch: {
        selectedSortType(value, oldValue) {
            if (value !== oldValue) {
                this.$router.replace({
                    path: this.$route.path,
                    query: { sortType: value.field },
                });
            }
        },
    },

    methods: {
        ...mapActions(DOCUMENTS_MODULE_PATH, [FETCH_DOCUMENTS_DATA, FETCH_DOCUMENTS]),

        setSortType(field) {
            const fieldCode = Number(field);
            this.selectedSortType = this.sortTypes.find(o => o.field === fieldCode) || this.sortTypes[0];
        },
    },

    beforeRouteEnter(to, from, next) {
        const {
            fullPath,
            query: { sortType },
        } = to;

        const { loadPath } = $store.state[PROFILE_MODULE][DOCUMENTS_MODULE];

        // если все загружено, пропускаем
        if (fullPath === loadPath) next(vm => vm.setSortType(sortType));
        else {
            $progress.start();
            $store
                .dispatch(`${DOCUMENTS_MODULE_PATH}/${FETCH_DOCUMENTS_DATA}`, { type: sortType })
                .then(() => {
                    $store.dispatch(`${DOCUMENTS_MODULE_PATH}/${SET_LOAD_PATH}`, fullPath);
                    next(vm => {
                        vm.setSortType(sortType);
                        $progress.finish();
                    });
                })
                .catch(error => {
                    next(vm => $progress.fail());
                    $logger.error(error);
                });
        }
    },

    async beforeRouteUpdate(to, from, next) {
        const {
            query: { sortType = null },
        } = to;

        try {
            this.$progress.start();

            await this[FETCH_DOCUMENTS]({ type: sortType });

            this.setSortType(sortType);
            this.$progress.finish();
            next();
        } catch (error) {
            this.$progress.fail();
            next(false);
        }
    },
};
</script>
