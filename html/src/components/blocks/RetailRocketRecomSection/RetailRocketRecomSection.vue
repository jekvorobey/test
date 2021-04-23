<template>
    <section class="section retail-rocket-recom-section">
        <div class="container retail-rocket-recom-section__container">
            <div data-retailrocket-markup-block="5efda0f797a5253518ebbf18" v-bind:data-auth="hasSession"></div>
        </div>
    </section>
</template>

<script>
import './RetailRocketRecomSection.css';
import { NAME as AUTH_MODULE, HAS_SESSION } from '@store/modules/Auth';
import { mapState } from 'vuex';

export default {
    name: 'retail-rocket-recom-section',
    computed: {
        ...mapState(AUTH_MODULE, [HAS_SESSION]),
    },
};
</script>
