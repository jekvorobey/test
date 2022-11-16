<template>
    <div class="installment-price">
        <span v-if="isValueObject" class="installment-price__before">от</span>
        <span class="installment-price__price">{{ numberWithSpaces }} </span>
        <span class="installment-price__ruble"> ₽ </span>
        <span class="installment-price__period">x {{ installmentPeriod }} мес</span>
    </div>
</template>

<script>
    import './InstallmentPrice.css';

    export default {
        name: "installment-price",
        props: {
            value: {
                type: [Number, String, Object],
                required: true
            },
            installmentPeriod: {
                type: [Number, String],
                required: true
            }
        },
        computed: {
            isValueObject(){
                return typeof this.value === 'object' && this.value.from
            },
            priceForPeriod() {
                if (this.isValueObject) {
                    return Math.ceil(+this.value.from / +this.installmentPeriod)
                } else {
                    return Math.ceil(+this.value / +this.installmentPeriod)
                }
            },
            numberWithSpaces() {
                return this.priceForPeriod.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }
        }
    }
</script>
