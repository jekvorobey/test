<template>
    <component :is="renderComponent" />
</template>

<script>
import PublicOffer from './PublicOffer.vue';
import PersonalPolicy from './PersonalPolicy.vue';
import BonusProgram from './BonusProgram.vue';

import { mapState } from 'vuex';
import { agreementTypes } from '@enums';
import './Agreements.css';

export default {
    name: 'agreements',

    computed: {
        ...mapState('route', {
            type: (state) => state.params.type,
        }),

        renderComponent() {
            const { type } = this;

            switch (type) {
                case agreementTypes.BONUS_PROGRAM:
                    return BonusProgram;
                case agreementTypes.PERSONAL_POLICY:
                    return PersonalPolicy;
                case agreementTypes.PUBLIC_OFFER:
                default:
                    return PublicOffer;
            }
        },
    },
};
</script>
