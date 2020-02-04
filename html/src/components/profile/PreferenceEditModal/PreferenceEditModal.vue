<template>
    <general-modal type="sm" class="preference-edit-modal" :header="header" @close="onClose" :is-mobile="isTablet">
        <template v-slot:content>
            <h3 class="preference-edit-modal__hl">{{ header }}</h3>
            <v-input class="preference-edit-modal__input" @input="debounce_onFilterChange">
                <template v-slot:after>
                    <v-svg name="search-middle" width="24" height="24" />
                </template>
            </v-input>

            <h6 class="preference-edit-modal__title">{{ title }}</h6>
            <ul class="preference-edit-modal__list">
                <li class="preference-edit-modal__list-item" v-for="entity in filteredEntities" :key="entity.id">
                    <v-check
                        class="preference-edit-modal__list-check"
                        :name="type"
                        :id="`${type}-${entity.id}`"
                        :key="entity.id"
                        :value="entity.id"
                        :checked="isChecked(entity.id)"
                        @change="onCheckedChanged($event, entity)"
                    >
                        {{ entity.name }}
                    </v-check>
                </li>
            </ul>

            <div class="preference-edit-modal__submit">
                <v-button class="preference-edit-modal__submit-btn" @click="onSubmit">
                    Добавить
                </v-button>
            </div>
        </template>
    </general-modal>
</template>

<script>
import VSvg from '../../controls/VSvg/VSvg.vue';
import VButton from '../../controls/VButton/VButton.vue';
import VCheck from '../../controls/VCheck/VCheck.vue';
import VInput from '../../controls/VInput/VInput.vue';
import GeneralModal from '../../GeneralModal/GeneralModal.vue';

import { mapActions, mapState } from 'vuex';
import { NAME as MODAL_MODULE, MODALS } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '../../../store/modules/Profile';
import { UPDATE_ENTITIES } from '../../../store/modules/Profile/actions';
import _debounce from 'lodash/debounce';
import './PreferenceEditModal.css';

export const NAME = 'preference-edit-modal';

export default {
    name: NAME,

    components: {
        VSvg,
        VButton,
        VCheck,
        VInput,
        GeneralModal,
    },

    data() {
        return {
            filterString: '',
            selectedEntities: [],
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            modalState: state =>
                (state[MODALS][NAME] && state[MODALS][NAME].state) || { availableEntities: [], entities: [] },
        }),

        type() {
            return this.modalState.type;
        },

        data() {
            return this.modalState.data;
        },

        filteredEntities() {
            return this.modalState.availableEntities.filter(
                e => !this.entities.some(se => se.id === e.id) && e.name.includes(this.filterString)
            );
        },

        entities() {
            return this.modalState.entities;
        },

        header() {
            switch (this.type) {
                case 'brands':
                    return 'Добавить бренды';
                case 'categories':
                    return 'Добавить категории';
                default:
                    return 'Добавить сущности';
            }
        },

        title() {
            switch (this.type) {
                case 'brands':
                    return 'Выберите бренды';
                case 'categories':
                    return 'Выберите категории';
                default:
                    return 'Выберите сущности';
            }
        },

        isTablet() {
            return this.$mq.tablet;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(PROFILE_MODULE, [UPDATE_ENTITIES]),

        isChecked(id) {
            return this.selectedEntities.some(e => e.id === id);
        },

        onFilterChange(filterString) {
            this.filterString = filterString;
        },

        onCheckedChanged(checked, entity) {
            if (checked) this.selectedEntities.push(entity);
            else {
                const index = this.selectedEntities.indexOf(entity);
                if (index !== -1) this.selectedEntities.splice(index, 1);
            }
        },

        onSubmit() {
            const newEntities = [...this.entities, ...this.selectedEntities];
            this[UPDATE_ENTITIES]({ type: this.type, items: newEntities, data: this.data });
            this.onClose();
        },

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },

    beforeMount() {
        this.debounce_onFilterChange = _debounce(this.onFilterChange, 300);
    },
};
</script>