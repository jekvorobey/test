<template>
    <v-button class="filter-button" v-on="$listeners" v-bind="$attrs">
        <span>
            <slot />
        </span>
        <v-svg id="filter-button-icon" name="filter" width="24" height="24" />
    </v-button>
</template>

<script>
import VSvg from '../controls/VSvg/VSvg.vue';
import VButton from '../controls/VButton/VButton.vue';

import '../../assets/images/sprites/filter.svg';
import './FilterButton.css';

export default {
    name: 'filter-button',
    inheritAttrs: false,

    components: {
        VSvg,
        VButton,
    },
};
</script>