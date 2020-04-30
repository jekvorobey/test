<template>
    <vuescroll class="v-scroll">
        <slot />
    </vuescroll>
</template>

<script>
import Vuescroll from 'vuescroll';

import './VScroll.css';

export default {
    name: 'v-scroll',
    components: {
        Vuescroll,
    },
};
</script>
