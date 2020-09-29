<template>
    <button v-if="isTablet" class="nav-widget nav-widget--btn">
        {{ currentName }}<v-svg name="arrow-updown" width="16" height="16" />
    </button>
    <nav v-else class="nav-widget nav-widget--panel">
        <router-link class="nav-widget__link" v-for="item in items" :key="item.url" :to="item.url">
            {{ item.name }}
        </router-link>
    </nav>
</template>

<script>
import VSvg from '@controls/VSvg/VSvg.vue';

import '@images/sprites/arrow-updown.svg';
import './NavWidget.css';

export default {
    name: 'nav-widget',

    components: {
        VSvg,
    },

    props: {
        items: {
            type: Array,
            default: () => [],
        },
    },

    computed: {
        isTablet() {
            return this.$mq.tablet;
        },

        currentName() {
            const {
                params: { pathMatch },
            } = this.$route;

            const { items = [] } = this;
            const currentItem = items && items.find(i => i.url === pathMatch);
            return currentItem && currentItem.name;
        },
    },
};
</script>
