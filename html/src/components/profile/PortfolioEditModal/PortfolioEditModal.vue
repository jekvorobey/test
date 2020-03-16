<template>
    <general-modal class="portfolio-edit-modal" header="Портфолио" @close="onClose" :is-mobile="isTablet">
        <template v-slot:content>
            <h4 class="portfolio-edit-modal__hl">Портфолио</h4>
            <ul
                v-if="editablePortfolio && editablePortfolio.length > 0"
                class="container container--tablet portfolio-edit-modal__list"
            >
                <li class="portfolio-edit-modal__list-row" v-for="(v, index) in computedItems" :key="index">
                    <v-input
                        class="portfolio-edit-modal__list-column"
                        v-model="v.name.$model"
                        :error="nameError(v.name)"
                    >
                        Название
                        <template v-slot:error="{ error }">
                            <transition name="slide-in-bottom" mode="out-in">
                                <div :key="error" v-if="error">{{ error }}</div>
                            </transition>
                        </template>
                    </v-input>

                    <v-input
                        class="portfolio-edit-modal__list-column"
                        v-model="v.link.$model"
                        :error="linkError(v.link)"
                    >
                        Ссылка на портфолио
                        <template v-slot:error="{ error }">
                            <transition name="slide-in-bottom" mode="out-in">
                                <div :key="error" v-if="error">{{ error }}</div>
                            </transition>
                        </template>
                    </v-input>

                    <button
                        class="portfolio-edit-modal__list-row-btn"
                        type="button"
                        @click.stop="onDeletePortfolio(index)"
                    >
                        <v-svg name="cross" width="24" height="24" />
                    </button>
                </li>
            </ul>
            <div
                class="container container--tablet portfolio-edit-modal__list"
                v-if="!editablePortfolio || editablePortfolio.length === 0"
            >
                Добавьте портфолио
                <br />
                <br />
            </div>

            <div class="portfolio-edit-modal__submit">
                <v-button class="portfolio-edit-modal__submit-btn" @click="onAddPortfolio">
                    Добавить
                </v-button>

                <v-button class="portfolio-edit-modal__submit-btn" @click="onSubmit">
                    Сохранить
                </v-button>
            </div>
        </template>
    </general-modal>
</template>
<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';
import validationMixin, { required, minLength } from '@plugins/validation';

import { mapState, mapActions } from 'vuex';
import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as CABINET_MODULE, PORTFOLIO } from '@store/modules/Profile/modules/Cabinet';
import { UPDATE_PORTFOLIO } from '@store/modules/Profile/modules/Cabinet/actions';

import { getRandomInt } from '@util/helpers';
import '@images/sprites/cross.svg';
import './PortfolioEditModal.css';

const CABINET_MODULE_PATH = `${PROFILE_MODULE}/${CABINET_MODULE}`;

export const NAME = 'portfolio-edit-modal';

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
        editablePortfolio: {
            $each: {
                name: {
                    required,
                },

                link: {
                    required,
                },
            },
        },
    },

    data() {
        return {
            editablePortfolio: [],
        };
    },

    computed: {
        ...mapState(CABINET_MODULE_PATH, [PORTFOLIO]),

        isTablet() {
            return this.$mq.tablet;
        },

        computedItems() {
            return this.$v.editablePortfolio.$each.$iter;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
        ...mapActions(CABINET_MODULE_PATH, [UPDATE_PORTFOLIO]),

        nameError(name) {
            if (name.$dirty && !name.required) return 'Обязательное поле';
        },

        linkError(link) {
            if (link.$dirty && !link.required) return 'Обязательное поле';
        },

        onAddPortfolio() {
            this.editablePortfolio.push({ id: getRandomInt(0, 10000000), name: null, link: null });
        },

        onDeletePortfolio(index) {
            this.editablePortfolio.splice(index, 1);
        },

        onSubmit() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                this[UPDATE_PORTFOLIO](this.editablePortfolio);
                this.onClose();
            }
        },

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },

    beforeMount() {
        this.editablePortfolio = this[PORTFOLIO].map(p => {
            return { ...p };
        });
    },
};
</script>
