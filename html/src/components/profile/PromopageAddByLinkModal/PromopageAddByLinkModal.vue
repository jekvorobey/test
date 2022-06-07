<template>
    <general-modal
        v-if="isOpen"
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
import VSvg from '@controls/VSvg/VSvg.vue';
import VButton from '@controls/VButton/VButton.vue';
import VInput from '@controls/VInput/VInput.vue';
import GeneralModal from '@components/GeneralModal/GeneralModal.vue';
import validationMixin, { required, productUrl } from '@plugins/validation';

import { mapActions, mapState } from 'vuex';
import { NAME as MODAL_MODULE, MODALS } from '@store/modules/Modal';
import { CHANGE_MODAL_STATE } from '@store/modules/Modal/actions';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';
import { NAME as PROMOPAGE_MODULE } from '@store/modules/Profile/modules/Promopage';
import { SEARCH_PRODUCTS, ADD_PRODUCTS } from '@store/modules/Profile/modules/Promopage/actions';

import _cloneDeep from 'lodash/cloneDeep';
import { getRandomInt } from '@util';
import { modalName } from '@enums';
import './PromopageAddByLinkModal.css';

const PROMOPAGE_MODULE_PATH = `${PROFILE_MODULE}/${PROMOPAGE_MODULE}`;
const NAME = modalName.profile.PROMO_ADD_BY_LINK;

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
                    productUrl,
                },
            },
        },
    },

    data() {
        return {
            links: [{ ref: null }],
        };
    },

    computed: {
        ...mapState(MODAL_MODULE, {
            isOpen: (state) => (state[MODALS][NAME] && state[MODALS][NAME].open) || false,
        }),

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
        ...mapActions(PROMOPAGE_MODULE_PATH, [ADD_PRODUCTS]),

        refError(ref) {
            if (ref.$dirty && !ref.required) return this.$t('validation.errors.required');
            if (ref.$dirty && !ref.productUrl) return 'Не похоже на нашу ссылку';
        },

        onAddLink() {
            this.links.push({ ref: null });
        },

        handleErrorLinks(errorLinks) {
            if (Array.isArray(errorLinks) && errorLinks.length > 0)
                this[CHANGE_MODAL_STATE]({
                    name: modalName.general.NOTIFICATION,
                    open: true,
                    state: {
                        title: 'Не удалось добавить товар',
                        message: `Не удалось добавить товары по указанным ссылкам:\n\n${errorLinks
                            .map((l, index) => `${index + 1}) ${l}`)
                            .join('\n')}`,
                    },
                });
        },

        async onSubmit() {
            this.$v.$touch();
            if (!this.$v.$invalid) {
                try {
                    await this[ADD_PRODUCTS]({ links: this.links, refresh: true });
                    this.onClose();
                } catch (error) {
                    this.onClose();
                    const { errorLinks } = error;
                    this.handleErrorLinks(errorLinks);
                }
            }
        },

        onClose() {
            this[CHANGE_MODAL_STATE]({ name: NAME, open: false });
        },
    },
};
</script>
