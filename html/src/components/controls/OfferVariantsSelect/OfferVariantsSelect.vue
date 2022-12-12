<template>
    <div>
        <div class="aselect" :data-value="value" v-if="moreThenOne">
            <div class="selector" @click="toggle()">
                <div class="label" :class="{'non-target-label': isNewSelected}">
                    <span class="label-text">{{ value }}</span>
                    <v-svg class="label-svg" :class="{ expanded : visible, 'non-target-svg': isNewSelected}"
                           name="arrow-down" width="20" height="20"/>
                </div>
            </div>
            <div :class="{ hidden : !visible, visible }">
                <ul>
                    <li
                            v-for="(option, index) in offerVariantsOptions"
                            @click="select(index)"
                            :key="option.defect"
                            v-if="value !== offerVariantsOptions[index].defect"
                    >
                        {{ option.defect }} {{ option.price }} {{ option.currency === 'RUB' ? '₽' : ''}}
                    </li>
                </ul>
            </div>
        </div>
        <button v-else
                class="product-offer-variants__btn-new"
                :class="{'product-offer-variants__btn-new-current': isCurrentItem}"
                @click="getOffer"
        > Выгодно: {{ value }} {{ currentPrice }} ₽
        </button>
    </div>

</template>

<script>
    import VSvg from '@controls/VSvg/VSvg.vue';
    import '@images/sprites/arrow-down.svg';
    import './OfferVariantsSelect.css'

    export default {
        name: "OfferVariantsSelect",
        emits: ['offerVariantSelected'],
        components: {VSvg},
        props: {
            newProductID: {
                type: [String, Number],
                required: false,
                default: null
            },
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
                selected: null,
                value: 'Выгодно',
                visible: false
            }
        },
        computed: {
            offerVariantsOptions() {
                let total = []

                this.offerVariants.forEach(offer => {

                    if (!offer.options || !offer.options[0].values) return;

                    if (+offer.offerId === +this.productID) {
                        this.selected = this.productID
                        this.value = offer.options[0].values[0].value
                    }

                    let item = {};
                    item['offerId'] = offer.offerId;
                    item['price'] = offer.price.value;
                    item['currency'] = offer.price.currency;
                    item['defect'] = offer.options[0].values[0].value

                    total.push(item)
                })

                return total;
            },
            moreThenOne() {
                return this.offerVariantsOptions.length > 1
            },
            firstItemID() {
                return this.offerVariantsOptions[0].offerId;
            },
            isCurrentItem() {
                return +this.selected === +this.productID
            },
            currentPrice() {
                return this.offerVariantsOptions[0].price.toLocaleString();
            },
            isNewSelected() {
                return +this.newProductID === +this.productID
            }
        },
        methods: {
            onChange() {
                this.$emit('offerVariantSelected', this.selected)
            },
            toggle() {
                this.visible = !this.visible;
            },
            select(index) {
                this.value = this.offerVariantsOptions[index].defect;
                this.selected = this.offerVariantsOptions[index].offerId;

                this.$emit('offerVariantSelected', this.selected)
            },
            getOffer() {
                if (!this.isCurrentItem) this.$emit('offerVariantSelected', this.firstItemID)
            }
        },
        created() {
            const onClickOutside = e => this.visible = this.$el.contains(e.target) && this.visible;
            document.addEventListener('click', onClickOutside);
            this.$on('hook:beforeDestroy', () => document.removeEventListener('click', onClickOutside));
        },
    }
</script>
