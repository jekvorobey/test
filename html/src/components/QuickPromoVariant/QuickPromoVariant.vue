<template>
    <pin-modal class="quick-variant-add-to-card-modal" :loading="isLoading" @close="onClose" :style="{'align-items': this.isTablet ? '' : 'center'}">
        <div class="quick-variant-add-to-card-modal__inner">
            <h3>Добавить в промо</h3>
            <template v-if="productPreview && referralPartner">
                <product-option-panel
                        class="quick-variant-add-to-card-modal__characteristic"
                        v-for="characteristic in characteristics"
                        :key="characteristic.code"
                        :header="isLocalSelected(characteristic.code) ? characteristic.name : `Выберите ${characteristic.name}`"
                >
                    <div class="quick-variant-add-to-card-modal__options quick-variant-add-to-card-modal__options-promo">
                        <product-option-tag
                                class="quick-variant-add-to-card-modal__option-promo"
                                :class="{'quick-variant-add-to-card-modal__option-promo__inPromo': referralPartner && alreadyInPromo(productOptions.combinations[index].id)}"
                                v-for="(option, index) in characteristic.options"
                                :key="`${characteristic.code}-${option.value}`"
                                :disabled="option.isDisabled"
                                @click.stop="onSelectOption(index)"
                        >
                            {{ option.name }}
                            <span class="quick-variant-add-to-card-modal__option-promo__plus">
                                {{ alreadyInPromo(productOptions.combinations[index].id) ? '-' : '+'}}
                            </span>
                        </product-option-tag>
                    </div>
                    <buy-button @click="toggleAllToPromo">{{ gluingText }}</buy-button>
                </product-option-panel>
            </template>
        </div>
    </pin-modal>
</template>

<script>
    import {modalName} from "@enums";
    import {MODALS, NAME as MODAL_MODULE} from "@store/modules/Modal";
    import {NAME as PREVIEW_MODULE, PRODUCT_OPTIONS, PRODUCT_PREVIEW,} from "@store/modules/Preview";
    import {NAME as CATALOG_MODULE} from "@store/modules/Catalog";
    import {FETCH_PRODUCT_PREVIEW} from "@store/modules/Preview/actions";
    import {CHANGE_MODAL_STATE} from "@store/modules/Modal/actions";
    import {CHARACTERISTICS} from "@store/modules/Preview/getters";
    import {NAME as AUTH_MODULE, REFERRAL_PARTNER, USER} from "@store/modules/Auth";
    import {
        FETCH_ITEMS_REFERRER_PROMO,
        TOGGLE_ALL_ITEMS_REFERRER_PROMO,
        TOGGLE_ITEM_REFERRER_PROMO
    } from "@store/modules/Catalog/actions";
    import {IS_GLUING_IN_PROMO, IS_IN_PROMO} from "@store/modules/Catalog/getters";
    import {mapActions, mapState, mapGetters} from 'vuex';
    import PinModal from "@components/PinModal/PinModal.vue";
    import BuyButton from "@components/BuyButton/BuyButton.vue";
    import ProductOptionPanel from "@components/product/ProductOptionPanel/ProductOptionPanel.vue";
    import ProductOptionTag from "@components/product/ProductOptionTag/ProductOptionTag.vue";

    const NAME = modalName.general.QUICK_PROMO_VARIANT;

    export default {
        name: "quick-promo-variant",
        components: {PinModal, BuyButton, ProductOptionPanel, ProductOptionTag},
        data() {
            return {
                isLoading: true,
                localSelectedState: {},
            }
        },
        computed: {
            ...mapState(MODAL_MODULE, {
                isOpen: (state) => state[MODALS][NAME] && state[MODALS][NAME].open,
                modalState: (state) => (state[MODALS][NAME] && state[MODALS][NAME].state) || {},
            }),
            ...mapState(AUTH_MODULE, {
                [REFERRAL_PARTNER]: (state) => (state[USER] && state[USER][REFERRAL_PARTNER]) || false
            }),
            ...mapState(PREVIEW_MODULE, {productPreview: PRODUCT_PREVIEW,}),
            ...mapGetters(PREVIEW_MODULE, {characteristics: CHARACTERISTICS,}),
            ...mapGetters(CATALOG_MODULE, [IS_IN_PROMO, IS_GLUING_IN_PROMO]),
            ...mapState(PREVIEW_MODULE, {
                productOptions: PRODUCT_OPTIONS,
            }),
            inPromo() {
                const {productId} = this[PRODUCT_PREVIEW];
                return this[IS_IN_PROMO](productId);
            },
            gluingInPromo() {
                let res = []
                this.productOptions.combinations.forEach(item => res.push(item.id))

                return this[IS_GLUING_IN_PROMO](res)
            },
            gluingText() {
                return this.gluingInPromo ? 'Удалить всю склейку' : 'Добавить всю склейку'
            },
            isTablet() {
                return this.$mq.tablet;
            },
        },

        methods: {
            ...mapActions(MODAL_MODULE, [CHANGE_MODAL_STATE]),
            ...mapActions(PREVIEW_MODULE, {FETCH_PRODUCT_PREVIEW,}),
            ...mapActions(CATALOG_MODULE, [FETCH_ITEMS_REFERRER_PROMO, TOGGLE_ITEM_REFERRER_PROMO, TOGGLE_ALL_ITEMS_REFERRER_PROMO]),
            onClose() {
                this[CHANGE_MODAL_STATE]({name: NAME, open: false, state: null});
            },
            isLocalSelected(charCode) {
                return typeof this.localSelectedState[charCode] !== 'undefined';
            },
            alreadyInPromo(id) {
                return this[IS_IN_PROMO](id);
            },
            onSelectOption(index) {
                this[TOGGLE_ITEM_REFERRER_PROMO](this.productOptions.combinations[index].id)
            },
            async toggleAllToPromo() {
                this.isLoading = true;
                let res = []
                this.productOptions.combinations.forEach(item => res.push(item.id))
                await this[TOGGLE_ALL_ITEMS_REFERRER_PROMO](res)
                this.isLoading = false;
            },
        },
        async beforeMount() {
            const {offerId, code} = this.modalState || {};
            try {
                await this[FETCH_PRODUCT_PREVIEW]({
                    offerId,
                    code,
                    clear: true,
                });
            } catch (e) {
                console.log(e)
            } finally {
                this.isLoading = false;
            }
        },
    }
</script>

<style scoped>

</style>