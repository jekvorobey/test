<template>
    <general-modal class="portfolio-modal" header="Портфолио" @close="onClose" :is-mobile="isTablet">
        <template v-slot:content>
            <h4 class="portfolio-modal__hl">Портфолио</h4>
            <ul
                v-if="editablePortfolios && editablePortfolios.length > 0"
                class="container container--tablet portfolio-modal__list"
            >
                <li class="portfolio-modal__list-row" v-for="(v, index) in computedItems" :key="index">
                    <v-input class="portfolio-modal__list-column" v-model="v.name.$model" :error="nameError(v.name)">
                        Название
                    </v-input>

                    <v-input class="portfolio-modal__list-column" v-model="v.ref.$model" :error="refError(v.ref)">
                        Ссылка на портфолио
                    </v-input>

                    <button class="portfolio-modal__list-row-btn" type="button" @click.stop="onDeletePortfolio(index)">
                        <v-svg name="cross" width="24" height="24" />
                    </button>
                </li>
            </ul>
            <div
                class="container container--tablet portfolio-modal__list"
                v-if="!editablePortfolios || editablePortfolios.length === 0"
            >
                Добавьте портфолио
                <br />
                <br />
            </div>

            <div class="portfolio-modal__submit">
                <v-button class="portfolio-modal__submit-btn" @click="onAddPortfolio">
                    Добавить
                </v-button>

                <v-button class="portfolio-modal__submit-btn" type="submit" @click="onSubmit">
                    Сохранить
                </v-button>
            </div>
        </template>
    </general-modal>
</template>
<script>
import VSvg from '../../controls/VSvg/VSvg.vue';
import VButton from '../../controls/VButton/VButton.vue';
import VInput from '../../controls/VInput/VInput.vue';
import GeneralModal from '../../GeneralModal/GeneralModal.vue';
import validationMixin, { required, minLength } from '../../../plugins/validation';

import { mapActions, mapGetters } from 'vuex';
import { NAME as MODAL_MODULE, MODALS } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '../../../store/modules/Profile';
import { UPDATE_PORTFOLIOS } from '../../../store/modules/Profile/actions';
import { PORTFOLIOS } from '../../../store/modules/Profile/getters';

import { getRandomInt } from '../../../util/helpers';
import _cloneDeep from 'lodash/cloneDeep';
import '../../../assets/images/sprites/cross.svg';
import './PortfolioModal.css';

export const NAME = 'portfolio-modal';

export default {
    name: NAME,
    mixins: [validationMixin],

    components: {
        VSvg,
        VButton,
        VInput,
        GeneralModal,
    },

    validations: {
        editablePortfolios: {
            minLength: minLength(1),

            $each: {
                name: {
                    required,
                },

                ref: {
                    required,
                },
            },
        },
    },

    data() {
        return {
            editablePortfolios: [],
        };
    },

    computed: {
        ...mapGetters(PROFILE_MODULE, [PORTFOLIOS]),

        isTablet() {
            return this.$mq.tablet;
        },

        computedItems() {
            return this.$v.editablePortfolios.$each.$iter;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(PROFILE_MODULE, [UPDATE_PORTFOLIOS]),

        nameError(name) {
            if (name.$dirty && !name.required) return 'Обязательное поле';
        },

        refError(ref) {
            if (ref.$dirty && !ref.required) return 'Обязательное поле';
        },

        onAddPortfolio() {
            this.editablePortfolios.push({ id: getRandomInt(0, 10000000), name: null, ref: null });
        },

        onDeletePortfolio(index) {
            this.editablePortfolios.splice(index, 1);
        },

        onSubmit() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                this[UPDATE_PORTFOLIOS](this.editablePortfolios);
                this.onClose();
            }
        },

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },

    beforeMount() {
        this.editablePortfolios = _cloneDeep(this[PORTFOLIOS]);
    },
};
</script>
