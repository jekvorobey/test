<template>
    <div class="product-offer-variants">
        <button class="product-offer-variants__btn-new"
                :class="{'product-offer-variants__btn-new-disabled': isNoNew.length === 0,
                'product-offer-variants__btn-new-current': isThisNewMainProduct && isNoNew.length !== 0}"
                :disabled="isThisNewMainProduct || isNoNew.length === 0"
                @click="getNewProduct"
        >Новый
        </button>
        <offer-variants-select
                :newProductID="newProductID"
                :productID="productID"
                :offerVariants="offerVariants"
                @offerVariantSelected="offerVariantSelected"
                @emitDescription="emitDescription"
        />
        <div class="aselect-bottom-description">
            {{ description }}
        </div>
    </div>
</template>

<script>
    import './ProductOfferVariants.css'
    import OfferVariantsSelect from '@controls/OfferVariantsSelect/OfferVariantsSelect.vue';

    export default {
        name: "ProductOfferVariants",
        emits: ['offerVariantChoosen'],
        props: {
            productID: {
                type: [String, Number],
                required: false,
                default: null
            },
            offerVariants: {
                type: Array,
                required: false,
                default: null
            }
        },
        components: {OfferVariantsSelect},
        data() {
            return {
                description: 'no descr',
                newProductID: null,
            }
        },
        computed: {
            isThisNewMainProduct() {
                return +this.newProductID === +this.productID
            },
            isNoNew() {
                return this.offerVariants.filter(offer => !offer.options)
            }
        },
        methods: {
            emitDescription(descr) {
                this.description = descr

            },
            offerVariantSelected(offerID) {
                this.$emit('offerVariantChoosen', offerID)
            },
            getNewProduct() {
                this.$emit('offerVariantChoosen', this.newProductID)
            },
            checkIsNewProduct() {
                try {
                    this.offerVariants.forEach(offer => {
                        if (!offer.options) {
                            this.newProductID = offer.offerId;
                        }
                    })
                    return +this.newProductID === +this.productId
                } catch (e) {
                    console.log(e)
                }
            }
        },
        mounted() {
            this.checkIsNewProduct()
        },
        updated() {
            this.checkIsNewProduct()
        },
    }
</script>