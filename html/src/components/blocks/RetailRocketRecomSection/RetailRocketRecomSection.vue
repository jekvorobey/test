<template>
    <section class="section retail-rocket-recom-section">
        <div class="container retail-rocket-recom-section__container">
            <retail-rocket-container
                data-retailrocket-markup-block="5efda0f797a5253518ebbf18"
                :data-auth="hasSession ? 'true' : 'false'"
                :data-user-moderation="canBuy ? 'true' : 'false'"
            />
        </div>
    </section>
</template>

<script>
import './RetailRocketRecomSection.css';
import {NAME as AUTH_MODULE, HAS_SESSION, CAN_BUY, USER} from '@store/modules/Auth';
import { mapState } from 'vuex';
import RetailRocketContainer from '@components/RetailRocketContainer/RetailRocketContainer.vue';

export default {
    name: 'retail-rocket-recom-section',
    components: { RetailRocketContainer },
    computed: {
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapState(AUTH_MODULE, {
            [CAN_BUY]: (state) => (state[USER] && state[USER][CAN_BUY]) || false,
        }),
    },
};
</script>
