<template>
    <div class="product-offer-variants">
        <button class="product-offer-variants__btn-new"
                :class="{'product-offer-variants__btn-new-disabled': isThisNewMainProduct || newProductID, 'product-offer-variants__btn-new-current': currentProductIsNew}"
                :disabled="isThisNewMainProduct || newProductID"
                @click="getNewProduct"
        >Новый
        </button>
        <offer-variants-select
                :productID="productID"
                :offerVariants="offerVariants"
                @offerVariantSelected="offerVariantSelected"
        />
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
                newProductID: null,
            }
        },
        computed: {
            isThisNewMainProduct() {
                try {
                    this.offerVariants.forEach(offer => {
                        if (offer.options && offer.options.length === 0) {
                            this.newProductID = this.offerId
                            return offer.offerId == this.productID
                        }
                    })

                    return true
                } catch (e) {
                    console.log(e)
                }
            },
            currentProductIsNew() {
                return this.newProductID == this.productID
            }
        },
        methods: {
            offerVariantSelected(offerID) {
                console.log('offerVariantSelected ', offerID)
                this.$emit('offerVariantChoosen', offerID)
            },
            getNewProduct() {
                this.$emit('offerVariantChoosen', this.newProductID)
            }
        }
    }
</script>