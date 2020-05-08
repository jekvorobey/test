<template>
    <section class="section return-view">
        <div class="container container--tablet-lg">
            <v-link class="return-view__back-link" :to="backUrl">
                <v-svg modifier="icon--rotate-deg90" name="arrow-small" width="24" height="24" />&nbsp;Назад
            </v-link>
        </div>
        <h2 class="return-view__title">Возврат Заказа №124589524</h2>
        <component :is="currentStep" />
    </section>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';
import VLink from '@controls/VLink/VLink.vue';

import ReturnProductSelection from '@components/profile/ReturnProductSelection/ReturnProductSelection.vue';
import ReturnCheckProducts from '@components/profile/ReturnCheckProducts/ReturnCheckProducts.vue';

import { mapState, mapActions } from 'vuex';

import { NAME as PROFILE_MODULE } from '@store/modules/Profile';

import { NAME as RETURN_MODULE, STEP } from '@store/modules/Profile/modules/ReturnPage';
import { SET_STEP } from '@store/modules/Profile/modules/ReturnPage/actions';

import { returnFormSteps } from '@enums/profile';

import './Return.css';

const RETURN_PAGE_PATH = `${PROFILE_MODULE}/${RETURN_MODULE}`;

export default {
    name: 'return',

    components: {
        VSvg,
        VLink,
    },

    computed: {
        ...mapState(RETURN_PAGE_PATH, [STEP]),

        backUrl() {
            return { name: '' };
        },

        currentStep() {
            switch (this.step) {
                case returnFormSteps.SELECT:
                    return ReturnProductSelection;
                case returnFormSteps.CHECK:
                    return ReturnCheckProducts;
                default:
                    return ReturnProductSelection;
            }
        },
    },

    methods: {
        ...mapActions(RETURN_PAGE_PATH, [SET_STEP]),
    },

    beforeMount() {
        if (!this.step) {
            this[SET_STEP](returnFormSteps.SELECT);
        }
    },
};
</script>
