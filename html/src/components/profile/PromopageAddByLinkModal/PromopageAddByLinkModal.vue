<template>
    <general-modal
        class="promopage-add-by-link-modal"
        header="Добавить продукт по ссылке"
        @close="onClose"
        :is-mobile="isTablet"
    >
        <template v-slot:content>
            <h4 class="promopage-add-by-link-modal__hl">Добавить продукт по ссылке</h4>
            <ul v-if="links && links.length > 0" class="container container--tablet promopage-add-by-link-modal__list">
                <li class="promopage-add-by-link-modal__list-row" v-for="(v, index) in computedItems" :key="index">
                    <v-input
                        class="promopage-add-by-link-modal__list-column"
                        v-model="v.ref.$model"
                        :error="refError(v.ref)"
                    />
                </li>
            </ul>

            <div class="promopage-add-by-link-modal__submit">
                <v-button class="promopage-add-by-link-modal__submit-btn" @click="onSubmit" :disabled="hasErrors">
                    Добавить продукт
                </v-button>

                <v-button class="btn--outline promopage-add-by-link-modal__submit-btn" type="submit" @click="onAddLink">
                    Добавить eще ссылку
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
import validationMixin, { required } from '../../../plugins/validation';

import { mapActions, mapGetters } from 'vuex';
import { NAME as MODAL_MODULE, MODALS } from '../../../store/modules/Modal';
import { CHANGE_MODAL_STATE } from '../../../store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '../../../store/modules/Profile';
import { UPDATE_PORTFOLIOS } from '../../../store/modules/Profile/actions';
import { PORTFOLIOS } from '../../../store/modules/Profile/getters';

import { getRandomInt } from '../../../util/helpers';
import _cloneDeep from 'lodash/cloneDeep';
import '../../../assets/images/sprites/cross.svg';
import './PromopageAddByLinkModal.css';

export const NAME = 'promopage-add-by-link-modal';

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
        links: {
            $each: {
                ref: {
                    required,
                },
            },
        },
    },

    data() {
        return {
            links: [{ id: getRandomInt(0, 10000000), ref: null }],
        };
    },

    computed: {
        ...mapGetters(PROFILE_MODULE, [PORTFOLIOS]),

        isTablet() {
            return this.$mq.tablet;
        },

        hasErrors() {
            return this.$v.$anyError;
        },

        computedItems() {
            return this.$v.links.$each.$iter;
        },
    },

    methods: {
        ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),

        refError(ref) {
            if (ref.$dirty && !ref.required) return 'Обязательное поле';
        },

        onAddLink() {
            this.links.push({ id: getRandomInt(0, 10000000), ref: null });
        },

        onSubmit() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                this.onClose();
            }
        },

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },
};
</script>