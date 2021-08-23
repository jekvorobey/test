<template>
    <section class="section retail-rocket-hits-section">
        <div class="container retail-rocket-hits-section__container">
            <retail-rocket-container
                data-retailrocket-markup-block="5efda0ff97a5253518ebbf19"
                :data-auth="hasSession ? 'true' : 'false'"
                :data-user-moderation="canBuy ? 'true' : 'false'"
            />
        </div>
    </section>
</template>

<script>
import './RetailRocketHitsSection.css';
import { NAME as AUTH_MODULE, HAS_SESSION, CAN_BUY, USER } from '@store/modules/Auth';
import { mapState } from 'vuex';
import RetailRocketContainer from '@components/RetailRocketContainer/RetailRocketContainer.vue';

export default {
    name: 'retail-rocket-hits-section',
    components: { RetailRocketContainer },
    computed: {
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
        ...mapState(AUTH_MODULE, {
            [CAN_BUY]: (state) => (state[USER] && state[USER][CAN_BUY]) || false,
        }),
    },
};
</script>
