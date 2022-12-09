<template>
    <div>
        <h2>selected: {{ selected }}</h2>
        <select v-model="selected" @change="onChange">
            <option disabled value="" v-if="selectedIsEmpty">Выгодно</option>
            <option v-for="option in offerVariantsOptions" :value="option.offerId">
                {{ option.defect }} - {{ option.price }} - {{ option.currency}}
            </option>
        </select>
    </div>
</template>

<script>
    import './OfferVariantsSelect.css'

    export default {
        name: "OfferVariantsSelect",
        emits: ['offerVariantSelected'],
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
        data() {
            return {
                selected: '',
            }
        },
        computed: {
            offerVariantsOptions() {
                let total = []

                this.offerVariants.forEach(offer => {
                    let item = {};

                    if (offer.offerId == this.productID) this.selected = this.productID

                    item['offerId'] = offer.offerId;
                    item['price'] = offer.price.value;
                    item['currency'] = offer.price.currency;
                    item['defect'] = offer.options[0].values[0].value

                    total.push(item)
                })

                return total;
            },
            selectedIsEmpty() {
                return this.select === ''
            }
        },
        methods: {
            onChange() {
                this.$emit('offerVariantSelected', this.selected)
            }
        }
    }
</script>
