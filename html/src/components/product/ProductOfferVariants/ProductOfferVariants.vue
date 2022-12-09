<template>
    <div>
        <button
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
                newProductID: null
            }
        },
        computed: {
            isThisNewMainProduct() {
                this.offerVariants.forEach(item => {
                    if (item.options.length === 0) {
                        this.newProductID = this.offerId
                        return item.offerId == this.productID
                    }
                })

                return true
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