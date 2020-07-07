<template>
    <component :is="renderComponent" />
</template>
<script>
import PublicOffer from './PublicOffer.vue';
import PersonalPolicy from './PersonalPolicy.vue';

import { agreementTypes } from '@enums';
import './Agreements.css';

export default {
    name: 'agreements',

    data() {
        return {
            selected: null,
        };
    },

    computed: {
        renderComponent() {
            switch (this.selected) {
                case agreementTypes.PUBLIC_OFFER:
                    return PublicOffer;
                case agreementTypes.PERSONAL_POLICY:
                    return PersonalPolicy;
                default:
                    return PublicOffer;
            }
        },
    },

    methods: {
        init() {
            const { query } = this.$route;
            if (query.type) {
                this.selected = query.type;
            }
        },
    },

    beforeMount() {
        this.init();
    },

    beforeRouteEnter(to, from, next) {
        const { query } = to;
        if (!query.type) {
            next(`agreements?type=${agreementTypes.PUBLIC_OFFER}`);
        }
        next();
    },

    beforeRouteUpdate(to, from, next) {
        const { query } = to;
        if (query.type) {
            this.selected = query.type;
        } else {
            this.selected = agreementTypes.PUBLIC_OFFER;
        }
    }
};
</script>