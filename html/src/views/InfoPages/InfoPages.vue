<template>
    <component :is="renderComponent" />
</template>

<script>
import Vacancies from './Vacancies.vue';
import Feedback from './Feedback.vue';
import DeliveryAndPayment from './DeliveryAndPayment.vue';
import PurchaseReturns from './PurchaseReturns.vue';
import Bonuses from './Bonuses.vue';
import CertificateRules from './CertificateRules.vue';

import { mapState } from 'vuex';
import { infoPages } from '@enums';
import './InfoPages.css';

export default {
    name: 'agreements',

    computed: {
        ...mapState('route', {
            page: (state) => state.params.page,
        }),

        renderComponent() {
            const { page } = this;

            switch (page) {
                case infoPages.FEEDBACK:
                    return Feedback;
                case infoPages.DELIVERY_AND_PAYMENT:
                    return DeliveryAndPayment;
                case infoPages.PURCHASE_RETURNS:
                    return PurchaseReturns;
                case infoPages.BONUSES:
                    return Bonuses;
                case infoPages.CERTIFICATE_RULES:
                    return CertificateRules;
                case infoPages.VACANCIES:
                default:
                    return Vacancies;
            }
        },
    },
};
</script>
