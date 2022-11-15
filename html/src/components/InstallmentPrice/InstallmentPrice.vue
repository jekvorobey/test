<template>
    <div class="installment-price">
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
                type: [Number, String],
                required: true
            },
            installmentPeriod: {
                type: [Number, String],
                required: true
            }
        },
        computed: {
            priceForPerioud() {
                return Math.ceil(+this.value / +this.installmentPeriod)
            },
            numberWithSpaces() {
                return this.priceForPerioud.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }
        }
    }
</script>
